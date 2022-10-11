# EspWebAdmin

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

<br>

## About <a name = "about"></a>

Web based administrator tools for ESP32 and ESP8266  micro devices.
<br><br>

## Getting Started <a name = "getting_started"></a>

### Prerequisites

- EspWebAdmin serves on [ESPAsyncWebServer](https://github.com/me-no-dev/ESPAsyncWebServer) from me-no-dev. <br>
- Which requires;
    - [ESPAsyncTCP](https://github.com/me-no-dev/ESPAsyncTCP) on ESP8266 devices.
    - [AsyncTCP](https://github.com/me-no-dev/AsyncTCP) on ESP32 devices.
- Web index file <b>ewa.min.htm.gz</b> must stay in a filesystem like an instance of <b>LittleFS</b>, <b>SPIFFS</b> or any other filesystem(publicly inheriting FS class).

<br>

### Installing


- Arduino

    -  Download repository as ZIP file.
    -  Use Arduino Library Manager -> Add From zip archive or extract contents to your Arduino library directory.
    -  Find more information on [arduino docs](https://docs.arduino.cc/software/ide-v1/tutorials/installing-libraries).
<br>

- Platformio
    -   Add dependency to your platformio.ini file.

            
            -lib_deps =
                https://github.com/uoakinci/espWebAdmin.git
            
    - Or download globally in pio command line interface with git capabilities. (Not recommended by the community)

            pio pkg install -g --library https://github.com/uoakinci/espWebAdmin.git

<br>
<br>


## Usage <a name = "usage"></a>



- Server, Filesystem handler and Logger (espWebAdminServer)

    -   Include header file <b>espWebAdmin.h</b> and create an instance of <b>espWebAdminHTTPServer</b> with desired filesystem object.
    -   Include <b>ewa.min.html.gz</b> file to either <b>"/ewa"</b>, <b>"/www"</b> or root directory of filesystem.

        ```
        #include <espWebAdmin.h>
        #include <LittleFS.h> ///EspWebAdmin needs a filesystem
        espWebAdminServer server;
        void start()
        {
            ...
            //Construct or begin web admin server with variables
            server.begin( LittleFS , "/admin" , "username" , "password" );
            ...
            //ewaServer object can be used as ESPAsyncWebServer pointer
            server->on("/",[](AsyncWebServerRequest *request)
            {
                return request->send(200, "text/plain", "Server Index Page Handler");
            });
            ....
            //Logger object can be obtained from server
            espWebAdminLogger logger=server->getLogger();
            ....
            //logger object can be used as any Print class pointer (eg. Serial pointer)
            logger->println("Start completed.");
        }
        void loop{} //Full Async
        ```
        - Additional note on lifetime of <b>espWebAdminServer</b> object. This object inherits a reference counted pointer (shared_ptr) of <b>espWebAdminHTTPServer_impl</b> class which holds its own reference in ESPWebAsyncServer's "not found" handler. Resetting or changing "not found" handler with <b>onNotFound()</b> member function will release ownership to the outside <b>espWebAdminServer</b> class again. So if "not found" handlers would be set by the user, managing lifetime of <b>espWebAdminServer</b> instance is required. Otherwise, it is acceptable to construct and destruct <b>espWebAdminServer</b> instance.
                
                void start()
                {
                    ...
                    espWebAdminServer srv( LittleFS , "/admin" , "username" , "password" );
                    somePrintPointerUsingFunction(srv->getLogger());
                    ...
                }
                
        - Or even just calling constructor is enough.
            
                void start()
                {
                    ...
                    espWebAdminServer( LittleFS , "/admin" , "username" , "password" );
                    ...
                }
            

    <br>
    <br>


- Filesystem Handler (espWebFsHandler)

    -   Include header file <b>espWebAdmin.h</b> and construct <b>espWebFsHandler</b> with your own ESPAsyncWebServer instance and desired filesystem object.
    -   Include <b>ewa.min.html.gz</b> file to either <b>"/ewa"</b>, <b>"/www"</b> or root directory of filesystem.
    -   Other functions of EspWebAdmin(currently only Logging) will not work when using Filesystem Handler.

        ```
        #include <espWebAdmin.h>
        #include <LittleFS.h> ///EspWebAdmin needs a filesystem

        ESPAsyncWebServer server(80);
        espWebFsHandler webAdminHandler;
        void start()
        {
            ...
            server.on("/",[](AsyncWebServerRequest *request)
            {
                return request->send(200, "text/plain", "Server Index Page Handler");
            });

            //Construct web admin handler
            webAdminHandler.begin( LittleFS, "/admin", "username", "password" );
            server.addHandler(webAdminHandler);
            ...

        }
        void loop{} //Full Async
        ```

<br>
<br>

## Web Interface

Web interface consists of unified and minified versions of following files in directory <b>web</b>
-   index.html
-   script.js
-   style.css
-    [<b>codeflask.js</b>](https://github.com/kazzkiq/CodeFlask) ([minified](https://unpkg.com/codeflask/build/codeflask.min.js))
-   Icons comes from [icon8](https://icons8.com) website

<br>
<br>

## Known Bugs
- Sketch and Filesystem binary updates on ESP8266 chip doesn't work currently. I have worked on the subject for a long time searching on web and in arduino framework libraries, but unable to solve the problem.  Yet it work perfectly on ESP32 chips.

<br>
<br>

## TODO
- EEPROM Manager interface 
- SDCARD Manager interface

<br>
<br>

## License
MIT License