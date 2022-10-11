#include <espWebAdminHTTPServer.h>

espWebAdminHTTPServer_impl::espWebAdminHTTPServer_impl(uint16_t port):AsyncWebServer(port){}
espWebAdminHTTPServer_impl::~espWebAdminHTTPServer_impl(){}
void espWebAdminHTTPServer_impl::beginInternal(const String& logdir,const String& user,const String& pass)
{
  logHandler.reset(new espWebAdminLogger_impl(logdir));
  addHandler(logHandler);
  onNotFound([_th=shared_from_this()](AsyncWebServerRequest *request){return request->send(404);});
  AsyncWebServer::begin();
}
void espWebAdminHTTPServer_impl::addAdminHandler(std::shared_ptr<AsyncWebHandler> ewa )
{
  adminHandler=ewa;
  addHandler(adminHandler.get());
}
espWebAdminLogger& espWebAdminHTTPServer_impl::getLogger()
{
  return logHandler;
}



