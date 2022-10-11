#ifndef ESP_WEB_ADMIN_LOGGER_HEADER_INCLUDED
#define ESP_WEB_ADMIN_LOGGER_HEADER_INCLUDED


#include <Print.h>
#include <AsyncEventSource.h>
#include <WString.h>
class espWebAdminLogger_impl : public Print, public AsyncEventSource
{
    public:
    espWebAdminLogger_impl(const String& url);
    ~espWebAdminLogger_impl();
    virtual size_t write(uint8_t val) override;
    private:
    String buffer;
    size_t idCounter;
};
struct espWebAdminLogger : public std::shared_ptr<espWebAdminLogger_impl>
{
    espWebAdminLogger():std::shared_ptr<espWebAdminLogger_impl>(new espWebAdminLogger_impl(F("/logs"))){};
    espWebAdminLogger(const String& url)
    :std::shared_ptr<espWebAdminLogger_impl>(new espWebAdminLogger_impl(url)){}
    virtual ~espWebAdminLogger(){}
    operator Print*(){return get();};
    operator AsyncEventSource*(){return get();};

};
#endif