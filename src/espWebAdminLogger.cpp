#include <espWebAdminLogger.h>

espWebAdminLogger_impl::espWebAdminLogger_impl(const String& url)
:AsyncEventSource(url),idCounter(0)
{

}
espWebAdminLogger_impl::~espWebAdminLogger_impl()
{

}
size_t espWebAdminLogger_impl::write(uint8_t val)
{
    if(val=='\n')
    {
        send(buffer.c_str(),NULL,++idCounter);
        buffer.clear();
    }
    else if(val!='\r')
    {
        buffer+=char(val);
    }
    return 1;
}
