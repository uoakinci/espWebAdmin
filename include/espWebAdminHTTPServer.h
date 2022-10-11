#ifndef ESP_WEB_ADMIN_HTTP_SERVER_HEADER_INCLUDED
#define ESP_WEB_ADMIN_HTTP_SERVER_HEADER_INCLUDED
#include <espWebAdminLogger.h>
#include <memory>

struct espWebAdminServer;

class espWebAdminHTTPServer_impl 
: public AsyncWebServer,
  public std::enable_shared_from_this<espWebAdminHTTPServer_impl>
{
    public:
    virtual ~espWebAdminHTTPServer_impl();
    espWebAdminLogger& getLogger();
    protected:
    friend espWebAdminServer;
    espWebAdminHTTPServer_impl(uint16_t port=80);
    void beginInternal(const String& logdir,const String& user=String(),const String& pass=String());
    void addAdminHandler(std::shared_ptr<AsyncWebHandler> ewa );
    private:
    std::shared_ptr<AsyncWebHandler> adminHandler;
    espWebAdminLogger logHandler;
};
#endif