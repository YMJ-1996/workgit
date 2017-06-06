 public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            context.Response.ContentEncoding = System.Text.Encoding.UTF8;
            string ReturnCode = string.Empty;
            string callback = string.Empty;
            string ErrorMsg = "参数错误";
            ToJsonP tojsonp = new ToJsonP();
            NewsBLL bll = new NewsBLL();
            if (!string.IsNullOrEmpty(context.Request["callbackparam"]))
            {
                callback = context.Request["callbackparam"];//跨域-必有项。这个是跨域请求的回调，同前台Ajax的配置项jsonp同名（默认也是callback）。
            }
            string type = context.Request["type"];
            ReturnCode = tojsonp.DataConvert(bll.GetNewsList(type));
            //context.Response.Write(ReturnCode);
            context.Response.Write(callback + "(" + ReturnCode + ")");
            context.ApplicationInstance.CompleteRequest();
           
        }