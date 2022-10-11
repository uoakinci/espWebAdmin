#include <espWebAdminFSHandler.h>
#include <FS.h>
#if defined(ESP32)
#include <Update.h>
#define __IF_32(...) __VA_ARGS__
#define __IF_8266(...)
#elif defined(ESP8266)
#include <Updater.h>
#define __IF_32(...)
#define __IF_8266(...) __VA_ARGS__
#endif

#include <StreamString.h>

#if defined(EWA_DEBUG_SOURCE_ARDUINO_LOG)
    #include <ArduinoLog.h>
    #define ewa_verbose_ln(...) Log.verboseln(__VA_ARGS__);
    #define ewa_warning_ln(...) Log.warningln(__VA_ARGS__);
    #define ewa_info_ln(...)    Log.infoln(__VA_ARGS__);
    #define ewa_error_ln(...)   Log.errorln(__VA_ARGS__);
#elif defined(EWA_DEBUG_SOURCE_SERIAL)
    #include <stdarg.h>
    #include <HardwareSerial.h>
    void ewa_serial_ln(const String& level, char *fmt, ... )
    {
        char buf[128];
        va_list args;
        va_start (args, fmt );
        vsnprintf(buf, 128, fmt, args);
        va_end (args);
        Serial.println(level+buf);
    }
    void ewa_serial_ln(const String& level,const __FlashStringHelper *fmt, ... )
    {
        char buf[128];
        va_list args;
        va_start (args, fmt);
        vsnprintf_P(buf, sizeof(buf), (const char *)fmt, args);
        va_end(args);
        Serial.println(level+buf);
    }
    #define ewa_verbose_ln(...) ewa_serial_ln(F("[VERBOSE] "),__VA_ARGS__)
    #define ewa_warning_ln(...) ewa_serial_ln(F("[WARNING] "),__VA_ARGS__)
    #define ewa_error_ln(...)   ewa_serial_ln(F("[ERROR] "),__VA_ARGS__)
    #define ewa_info_ln(...)    ewa_serial_ln(F("[INFO] "),__VA_ARGS__)
#else
    #define ewa_verbose_ln(...)
    #define ewa_warning_ln(...)
    #define ewa_error_ln(...)
    #define ewa_info_ln(...)
#endif


#define authCheck   if(username.length() && password.length() && !request->authenticate(username.c_str(), password.c_str())) return request->requestAuthentication();
#define vPUT        request->method() == HTTP_PUT
#define vGET        request->method() == HTTP_GET
#define vDELETE     request->method() == HTTP_DELETE
#define isINDEX     request->url().equals(webDir) || request->url().equals(webDir.substring(0,webDir.length()-1))
#define isFILE      request->url().equals(webDir+F("file"))
#define isLIST      request->url().equals(webDir+F("list"))
#define isDISK      request->url().equals(webDir+F("disk"))
#define isFOLDER    request->url().equals(webDir+F("folder"))
#define isINFO      request->url().equals(webDir+F("info"))
#define isAPP       request->url().equals(webDir+F("APP"))
#define isFS        request->url().equals(webDir+F("FS"))

bool espWebFsHandler_impl::isExcluded(const String& s)
{
    return false;
}
String espWebFsHandler_impl::chip()
{
    String speed;
	#if defined(ESP8266)
    char tmp[15];
	sprintf(tmp, "ESP8266_%06x", ESP.getChipId());
    speed+=tmp;
	#elif defined(ESP32)
    speed+="ESP32_";
	uint64_t i=ESP.getEfuseMac();
    uint8_t* p=(uint8_t*)&i;
    for(int k=0;k<8;k++)
    {
        speed+=String(p[k],HEX);
    }
	#endif
    speed+=(F(" @ "));
    speed+=String(ESP.getCpuFreqMHz());
    speed+=F(" MHz. Flash @ ");
    speed+=String(ESP.getFlashChipSpeed()/1000000);
    speed+=F(" MHz");
	return speed;
}
String espWebFsHandler_impl::heap()
{
	#if defined(ESP8266)
    return String(double(ESP.getFreeHeap())/1024.0d)+String(" KB Free - ")
            +String(ESP.getHeapFragmentation())
            +String(" % Fragmantion.");
	#elif defined(ESP32)
	return String(double(ESP.getMinFreeHeap())/1024.0d)+String(" KB Min / ")
            +String(double(ESP.getFreeHeap())/1024.0d)
            +String(" KB Free / ")+String(double(ESP.getHeapSize())/1024.0d)
            +String(" KB Max");
	#endif
}
bool espWebFsHandler_impl::canHandle(AsyncWebServerRequest *request)
{
    if      (vGET)
    {
        if      (isFILE)
        {
            request->_tempFile = fs.open(request->arg(F("path")), "r");
            if(!request->_tempFile)
            {
                return false;
            }
            #ifdef ESP32
            if(request->_tempFile.isDirectory())
            {
                request->_tempFile.close();
                return false;
            }
            #endif
            return true;
        }
        else if (isLIST)
        {
            return true;
        }
        else if (isDISK)
        {
            return true;
        }
        else if (isINFO)
        {
            return true;
        }
        else if (isINDEX)
        {
            if(indexFile.length())
                return true;
            else
            {
                ewa_error_ln(F("[espWebFsHandler] Index.html file couldn't found."));
            }
        }
    }
    else if (vPUT)
    {
        if(isAPP || isFS || isFILE || isFOLDER || isDISK)
        {
            isBinaryUpload=false;
            return true;
        }
    }
    else if (vDELETE)
    {
        if( isFILE || isFOLDER || isDISK)
        {
            return true;
        }
    }
    ewa_verbose_ln(F("[espWebFsHandler<%s>] CAN'T Handle %d with %s "),webDir.c_str(),request->method(),request->url().c_str());
    return false;
}
void espWebFsHandler_impl::handleRequest(AsyncWebServerRequest *request)
{
    authCheck;
    if(vGET)
    {
        if      (isLIST)
        {
            String path = request->getParam("path")->value();
            __IF_32(File mdir);
            __IF_8266(Dir mdir);
            __IF_32(mdir=fs.open(path));
            __IF_8266(mdir=fs.openDir(path));
            String output = F("[");
            #if defined(ESP32)
            File entry = mdir.openNextFile();
            while(entry)
            {
                if(isExcluded(entry.name()))
                {
                    entry = mdir.openNextFile();
                    continue;
                }
                if (output != "[") output += ',';
                output += "{\"type\":\"";
                output += (entry.isDirectory()?"DIR":"FILE");
                output += "\",\"name\":\"";
                output += String(entry.name());
                output += "\",\"size\":";
                output += String(entry.size());
                output += "}";
                entry = mdir.openNextFile();
            }
            mdir.close();
            #elif defined(ESP8266)
            while(mdir.next())
            {
                if (isExcluded(mdir.fileName()))
                {
                    continue;
                }
                if (output != F("[")) output += ',';
                output += F("{\"type\":\"");
                output += ( mdir.isFile() ? F("FILE") : ( mdir.isDirectory() ? F("DIR"): F("NA") ) );
                output +=F("\",\"name\":\"");
                output += mdir.fileName();
                output += F("\",\"size\":");
                output += String(mdir.fileSize());
                output += F(",\"access\":");
                output += String(mdir.fileTime());
                output += F(",\"creation\":");
                output += String(mdir.fileCreationTime());
                output += F("}");
            }
            #endif
            output += F("]");
            return request->send(200, F("application/json"), output);
        }
        else if (isINFO)
        {
            if(deviceInfo.isEmpty())
            {
                deviceInfo=chip();
            }
            String output=F("{\"Device\":\"");
            output+=deviceInfo;
            output+=F("\",\"Memory\":\"");
            output+=heap();
            if(fsinfo)
            {
                output+=F("\",\"Filesystem\":\"");
                output+=fsinfo();
            }
            output+=F("\"}");
            return request->send(200, F("application/json"), output);
        }
        else if (isFILE)
        {
           return request->send(request->_tempFile, request->_tempFile.name(), String(), true);
        }
        else if (isDISK)
        {
            return  request->send(200,F("text/plain"), (fs.exists(F("/"))? F("MOUNTED") : F("UNMOUNTED") ));
        }
        else if (isINDEX)
        {
            std::shared_ptr<File> indexF(new File(fs.open(indexFile,"r")));
            if((*indexF)&&indexF->size())
            {
                AsyncWebServerResponse* response=request->beginChunkedResponse(String(F("text/html")),
                [indexF](unsigned char* buffer, unsigned int maxLen, unsigned int k)->unsigned int
                {
                    return indexF->readBytes((char*)buffer,maxLen);
                });
                response->setCode(200);
                if(indexGzipped)
                {
                    response->addHeader(F("Content-Encoding"), F("gzip"));
                }
                return request->send(response);
            }
            return request->send(404,F("text/plain") ,F("Index.html can't be found in filesystem."));
        }
    }
    if(vDELETE)
    {
        if      (isFILE)
        {
            String path=request->getParam(F("path"), true)->value();
            if(fs.remove(path))
            return request->send(200, F("text/plain"), F("FILE DELETED"));
            else
            {
                ewa_warning_ln(F("[espWebFsHandler] File deletion error for %s"),path.c_str());
                return request->send(500,F("text/plain"),F("File couldn't deleted."));
            }
        }
        else if (isFOLDER)
        {
            String path=request->getParam(F("path"), true)->value();
            if(fs.rmdir(path))
            return request->send(200, F("text/plain"), F("Folder deleted.") );
            else
            {
                ewa_warning_ln(F("[espWebFsHandler] Folder deletion error for %s"),path.c_str());
                return request->send(500,F("text/plain"),F("Folder couldn't deleted."));
            }
        }
        else if (isDISK)
        {
            if(umounter)
            {
                umounter();
                return request->send(200, F("text/plain"), F("UMOUNTED") );
            }
            return request->send(500, F("text/plain"), F("CAN'T UMOUNT") );
        }
    }
    if(vPUT)
    {
        if      (isAPP)
        {
           return request->send(200);
        }
        else if (isFS)
        {
            return request->send(200);
        }
        else if (isFILE)
        {

            return request->send(200,F("text/plain"),F("Uploaded."));
        }
        else if (isFOLDER)
        {
            String path = request->getParam(F("path"), true)->value();
            if(path.endsWith("/"))
            {
                path=path.substring(0,path.lastIndexOf("/"));
            }
            if(fs.exists(path))
                return request->send(200,F("text/plain"),F("Already exist."));
            else
            {
                if(fs.mkdir(path))
                return request->send(200,F("text/plain"),F("Folder created."));
                else
                {
                    ewa_warning_ln(F("[espWebFsHandler] Folder creation error for %s"),path.c_str());
                    return request->send(500,F("text/plain"),F("Folder couldn't created."));
                }
            }
        }
        else if (isDISK)
        {
            if(mounter)
            {
                mounter();
                return request->send(200, F("text/plain"), F("MOUNTED") );
            }
            return request->send(500, F("text/plain"), F("CAN'T MOUNT") );
        }
    }
    request->send(400);
}
void espWebFsHandler_impl::handleUpload(AsyncWebServerRequest *request, const String& filename, size_t index, uint8_t *data, size_t len, bool final)
{
    if(!index)
    {
        if(!_username.length() || request->authenticate(_username.c_str(),_password.c_str()))
        {
            auth=true;
            if(isAPP || isFS )
            {
                isBinaryUpload=true;
                StreamString error;
                int cmd =  U_FLASH;
                if(isFS)
                {
                    __IF_32(cmd= U_SPIFFS);
                    __IF_8266(cmd=U_FS);
                    if(umounter)
                    {
                        umounter();
                    }
                    else
                    {
                        return request->send(500, F("text/plain"), F("Unable to unmount filesystem."));
                    }
                }
                if (!Update.begin(0xFFFFFFFF, cmd))
                {
                    Update.printError(error);
                    ewa_error_ln(F("[espWebFsHandler] update begin error: %s"),error.c_str());
                    return request->send(500, F("text/plain"), F("OTA could not begin"));
                }
                ewa_info_ln(F("[espWebFsHandler] Binary update begin %d ->  %s"),cmd,filename.c_str());
            }
            else
            {
                String path=request->getParam(F("path"), true)->value();
                if(!path.endsWith(F("/")))
                {
                    path+=F("/");
                }
                path+=filename;
                ewa_info_ln(F("[espWebFsHandler] File upload handling for %s"),path.c_str());
                request->_tempFile = fs.open(path, "w");
                if(!request->_tempFile)
                {
                    return request->send(500, F("text/plain"), F("Unable to open file for write."));
                }
            }
        }
    }
    if(isBinaryUpload&&auth)
    {
        StreamString error;
        if(len)
        {
            if (Update.write(data, len) != len)
            {
                Update.printError(error);
                ewa_error_ln(F("[espWebFsHandler] update write error: %s"),error.c_str());
                return request->send(400, F("text/plain"), F("OTA unable to write"));
            }
        }
        if (final)
        {
            auth=false;
            isBinaryUpload=false;
            if(!Update.end(true))
            {
                Update.printError(error);
                ewa_error_ln(F("[espWebFsHandler] update end error: %s"),error.c_str());
                return request->send(400, F("text/plain"), F("Could not end OTA"));
            }
            ewa_info_ln(F("[espWebFsHandler] Binary update finished %s"),filename.c_str());
        }
    }
    else if(auth && request->_tempFile)
    {
        if(len)
        {
            ///ESPAsyncWebServer doesn't count 0 length data as file in put request
            ///even if multipart form data describes it as file.
            ///So a null char is being added in javascript and we have to ignore it.
            if(len!=1||(*data)!='\0')
            {
                request->_tempFile.write(data,len);
            }
        }
        if(final)
        {
            request->_tempFile.close();
            auth=false;
        }
    }
}

espWebFsHandler_impl::~espWebFsHandler_impl(){};