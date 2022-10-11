#ifndef ESP_WEB_ADMIN_HEADER_INCLUDED
#define ESP_WEB_ADMIN_HEADER_INCLUDED
#include <espWebAdminHTTPServer.h>
#include <espWebAdminFSHandler.h>
/**
 * @brief           Create WebAdmin FS handler object. LifeTime controlled by user yet wrapper can be copied around.
 *
 * @tparam _FS      Filesystem type to be auto deducted
 * @param fs        Filesystem object, lifetime is controlled by user.
 * @param srv       AsyncWebServer reference, lifetime is controlled by user.And controls lifetime of handler
 * @param webdir    HTTP target location to reach web admin. default: /ewa
 * @param username  HTTP Auth username field
 * @param password  HTTP Auth password field
 */
struct espWebFsHandler : public std::shared_ptr<espWebFsHandler_impl>
{
    espWebFsHandler(){}
    template<class _FS>
    void begin(_FS& fs,const String& webdir=String(),const String& username=String(),const String& password=String())
    {
        reset(new espWebFsHandler_impl(fs,webdir,username,password) );
    }
    template<class _FS>
    espWebFsHandler(_FS& fs,const String& webdir=String(),const String& username=String(),const String& password=String())
    :std::shared_ptr<espWebFsHandler_impl>(new espWebFsHandler_impl(fs,webdir,username,password)) 
    {}
    virtual ~espWebFsHandler(){};
    operator AsyncWebHandler*(){return get();};
};


/**
     * @brief Create WebAdmin with its own server which holds himself alive until reset on handlers called.
     *        Publicly inherits AsyncWebServer so user can add additional callbacks or features.
     *
     * @tparam _FS      Filesystem type to be auto deducted
     * @param fs        Filesystem object, lifetime is controlled by user.
     * @param port      HTTP port for server to run
     * @param webdir    HTTP target location to reach web admin. default: /ewa
     * @param username  HTTP Auth username field
     * @param password  HTTP Auth password field
     */
struct espWebAdminServer : public std::shared_ptr<espWebAdminHTTPServer_impl>
{
    espWebAdminServer(){};
    template<class _FS>
    void begin(_FS& fs,uint16_t port=80, const String& webdir=String(), const String& username=String(),const String& password=String())
    {
        reset(new espWebAdminHTTPServer_impl(port));
        auto f=std::make_shared<espWebFsHandler_impl>(fs,webdir,username,password);
        get()->addAdminHandler(f);
        get()->beginInternal(f->webDir+F("logs"),username,password);
    }
    template<class _FS>
    espWebAdminServer(_FS& fs,uint16_t port=80, const String& webdir=String(), const String& username=String(),const String& password=String())
    {
        begin(fs,port,webdir,username,password);
    }
    virtual ~espWebAdminServer(){}
};
#endif