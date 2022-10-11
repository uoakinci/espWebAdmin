/*
VERB/TARGET	|	    file	|	folder	|	disk	|	list	|	APP		|	FS		|   info    |
-----------------------------------------------------------------------------------------------------
GET			|	    path	|	------	|	NoParam	|	path	|	------	|	------	|   NoParam |
-----------------------------------------------------------------------------------------------------
DELETE		|	    path	|	path	|	NoParam	|	-------	|	------	|	------	|   ------  |
-----------------------------------------------------------------------------------------------------
PUT			|	    path   |	path	|	NoParam	|	-------	|	NoParam	|	NoParam	|   ------  |
-----------------------------------------------------------------------------------------------------
*/
#define INDEX_FILE_NAME "ewa.min.html"
#define DEFAULT_WEB_DIRECTORY "ewa"
//#define EWA_DEBUG_SOURCE_ARDUINO_LOG
//#define EWA_DEBUG_SOURCE_SERIAL
//NO Definition so NO DEBUG


#ifndef ESP_WEB_ADMIN_FS_HANDLER_HEADER_INCLUDED
#define ESP_WEB_ADMIN_FS_HANDLER_HEADER_INCLUDED

/**
 * @brief if member function exists in given class execute on object, if not exists do nothing.
 * Modified to getting return value by passing reference to call and void returning versions.
 * Modified from source;
 * https://stackoverflow.com/questions/257288/templated-check-for-the-existence-of-a-class-member-function/23996349#23996349
 */
#include <type_traits>
template<class> struct type_sink { typedef void type; };
template<class T> using type_sink_t = typename type_sink<T>::type;
#define MAKE_MEMBER_EXIST_CHECKER(FUNCTIONNAME,...) \
template<class T, class=void> struct FUNCTIONNAME##_trait : std::false_type {}; \
template<class T> struct FUNCTIONNAME##_trait< T, type_sink_t< decltype( std::declval<T>().FUNCTIONNAME(__VA_ARGS__ ) ) > >: std::true_type {};\
namespace _ewp_type_trait_detail_ {\
    template<class T,class ...Args> void FUNCTIONNAME##_call_helper_void(T& obj, std::true_type,Args&& ...args)\
    { obj.FUNCTIONNAME(args...);}\
    template<class T,class R,class ...Args> void FUNCTIONNAME##_call_helper(T& obj, std::true_type,R& r,Args&& ...args)\
    { r=obj.FUNCTIONNAME(args...);}\
    template<class T,class ...Args> void FUNCTIONNAME##_call_helper_void(T& obj, std::false_type,Args&& ...args)\
    {}\
    template<class T,class R,class ...Args> void FUNCTIONNAME##_call_helper(T& obj, std::false_type,R& r,Args&& ...args)\
    {}}\
template<class T,class ...Args> void call_##FUNCTIONNAME##_on(T& obj,Args&& ...args)\
{ return _ewp_type_trait_detail_::FUNCTIONNAME##_call_helper_void(obj, FUNCTIONNAME##_trait<T>{}, args...);}\
template<class T,class R,class ...Args> void call_##FUNCTIONNAME##_on_return(T& obj,R& r,Args&& ...args)\
{ return _ewp_type_trait_detail_::FUNCTIONNAME##_call_helper(obj, FUNCTIONNAME##_trait<T>{}, r ,args...);}


#include <FS.h>
#include <ESPAsyncWebServer.h>
MAKE_MEMBER_EXIST_CHECKER(begin);
MAKE_MEMBER_EXIST_CHECKER(end);
#ifdef ESP8266
/** NEVER EVER dereference nullptr
 *  Yet...
 * */
MAKE_MEMBER_EXIST_CHECKER(info, *((FSInfo*)nullptr));
#endif
MAKE_MEMBER_EXIST_CHECKER(usedBytes);
MAKE_MEMBER_EXIST_CHECKER(totalBytes);

struct espWebAdminServer;

class espWebFsHandler_impl : public AsyncWebHandler
{
    private:
    fs::FS& fs;
    String username;
    String password;
    String deviceInfo;
    String indexFile;
    bool auth,isBinaryUpload,indexGzipped;
    std::function<void()> mounter,umounter;
    std::function<String()> fsinfo;
    protected:
    friend espWebAdminServer;
    String webDir;
    virtual bool isExcluded(const String&);

    public:
    virtual ~espWebFsHandler_impl();
    virtual bool canHandle(AsyncWebServerRequest *request) override final;
    virtual void handleRequest(AsyncWebServerRequest *request) override final;
    virtual void handleUpload(AsyncWebServerRequest *request, const String& filename, size_t index, uint8_t *data, size_t len, bool final) override final;
    virtual bool isRequestHandlerTrivial() override final {return false;}
    static String chip();
    static String heap();

    template<class _FS>
    espWebFsHandler_impl ( _FS& _fs, const String& http_dir=String(),const String& user=String(),const String& pass=String())
    :fs(_fs),username(user),password(pass),auth(false),isBinaryUpload(false),indexGzipped(false),webDir(http_dir)
    {
        if constexpr( begin_trait<_FS>::value )
        {
            _fs.begin();
            mounter=[&_fs](){_fs.begin();};
        }
        if constexpr (end_trait<_FS>::value )
        {
            umounter=[&_fs](){_fs.end();};
        }
        if(!webDir.length())
        {
            webDir=F("/" DEFAULT_WEB_DIRECTORY "/");
        }
        if(!webDir.endsWith("/"))
        {
            webDir+=F("/");
        }
        if(!webDir.startsWith("/"))
        {
            webDir=String(F("/"))+webDir;
        }
        if(fs.exists(F("/ewa/" INDEX_FILE_NAME ".gz")))
        {
            indexFile=F("/ewa/" INDEX_FILE_NAME ".gz");
            indexGzipped=true;
        }
        else if(fs.exists(F("/ewa/" INDEX_FILE_NAME)))
        {
            indexFile=F("/ewa/" INDEX_FILE_NAME);
        }
        else if(fs.exists(F("/www/" INDEX_FILE_NAME ".gz")))
        {
            indexFile=F("/www/" INDEX_FILE_NAME ".gz");
            indexGzipped=true;
        }
        else if(fs.exists(F("/www/" INDEX_FILE_NAME )))
        {
            indexFile=F("/www/" INDEX_FILE_NAME );
        }
        #ifdef ESP8266 ///FSInfo headeache
        if constexpr(info_trait<_FS>::value )
        {
            fsinfo=[&_fs]()->String
            {
                FSInfo i;
                bool infoR=false;
                call_info_on_return(_fs,infoR,i);
                if(infoR)
                {
                    return String(double(i.usedBytes)/1024.0d)+String(F(" KB / "))
                        +String(double(i.totalBytes)/1024.0d)+String(F(" KB. Flash: "))
                        +String(ESP.getFlashChipRealSize()/1024.0d)
                        +String(F(" KB"));
                }
                return String(F("Not mounted. Flash: "))
                        +String(ESP.getFlashChipRealSize()/1024.0d)
                        +String(F(" KB"));
            };
        }
        #endif
        if constexpr(usedBytes_trait<_FS>::value && totalBytes_trait<_FS>::value )
        {
            fsinfo=[&_fs]()
            {
                if(_fs.exists("/"))
                {
                    size_t used=0;
                    size_t total=0;
                    call_totalBytes_on_return(_fs,total);
                    call_usedBytes_on_return(_fs,used);
                    return String(double(used)/1024.0d)
                    +String(F(" KB / "))
                    +String(double(total)/1024.0d)
                    +String(F(" KB. Flash: "))
                    +String(ESP.getFlashChipSize()/1024.0d)
                    +String(F(" KB"));
                }
                return String("Not mounted. Flash: ")+String(ESP.getFlashChipSize()/1024.0d)+String(F(" KB"));
            };
        }
    }
};
#endif