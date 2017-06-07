document.scripts[0].src="jquery-1.11.1.min.js"

var words;

var theword;
window.onmouseup=function getwords()
{
	if(navigator.appName=="Microsoft Internet Explorer"){ 
        words=document.selection.createRange().text; 
    }else{ 
        words=window.getSelection().toString(); 
    }
	//document.getSelection().removeAllRanges();
}
//对页面进行划词，并将划得的词放入words中


//对划词进行翻译并显示
window.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];         
             if(e && e.keyCode==18){    //当按下ALT键时，执行函数，对划词进行翻译
				 var ajax=Ajax();
				 var a=(new Date).getTime();    //令a为随机数
				 var m="xxxxxxxxxxxx"+words+a+"hX316cbxWEN_7_CzB_uy"   //连接字符串
				 var mdd=md5(m);       //对字符串进行MD5加密
				 var i;
				 var booling;
				 words=encodeURIComponent(words,"UTF-8");    //字符转为UTF-8编码格式
				 var url="//fanyi-api.baidu.com/api/trans/vip/translate?q="+words+"&from=auto&to=zh&appid=xxxxxxxxxxxxx&salt="+a+"&sign="+mdd;
				   $.ajax({  //获取URL信息
							url: '//fanyi-api.baidu.com/api/trans/vip/translate',
							url: url,
							type: 'get',
							async:false,
							dataType: 'json',

        success:function(result) { 
		var num=window.localStorage.length;//查看本地是否有已保存的翻译
		if (num>1)
		{
		for (i=0;i<num;i+=1)
	{
		var key1=window.localStorage.key(i) ;
		theword=window.localStorage.getItem(key1);
		if (words==theword)   // 若存在已保存的翻译，则显示本地的翻译
		{
			key1=window.localStorage.key(i+1);
			booling=confirm(window.localStorage.getItem(key1));
			if (booling==false)
{
	save();
}

break;
		}
		}
	}
	if (i>=num)   //若本地不存在翻译，则显示通过调用百度翻译API获取的翻译
	{
    booling=confirm(result.trans_result[0].dst,theword);//json name，获取信息为json格式
if (booling==false)
{
	save();
}
	}
        },  
        timeout:3000  
    });  
			 }
}


function save()  //自行翻译并将翻译存储至本地
{
	var transwords = prompt("请输入你的翻译:");   //输入框
	var lo=window.location.herf;
	var num=window.localStorage.length;
	for (var i=0;i<num;i+=1)   //查找本地是否存储过该词汇
	{
		var key1=window.localStorage.key(i) ;
		theword=window.localStorage.getItem(key1);
		if (words==theword)
		{
			var ni=i+11;
			window.localStorage.setItem(ni.toString(), transwords);//存储过，则对翻译进行覆盖
			break;
		}
	}
	if (i>=num)//未存储过，则新建项目
	{	
		var n=num-2+10+1;
		var nu=num-2+10;
		window.localStorage.setItem(nu.toString(), words);
		window.localStorage.setItem(n.toString(), transwords);
	}
//localStorage.address = window.location.href;//设置address为"3"  
//localStorage.setItem("english",words);//设置b为"hello";  
//var transword = prompt("请输入你的翻译:");
//localStorage.gettrans= transword;
//var a1 = localStorage["a"];//获取a的值  
//var a2 = localStorage.a;//获取a的值  
//var b = localStorage.getItem("b");//获取b的值  
//localStorage.removeItem("c");//清除c的值  
}





function Ajax(recvType){

    var aj=new Object();
    aj.recvType=recvType ? recvType.toUpperCase() : 'HTML';  //向形参中传递的文件类型
     aj.targetUrl='';
    aj.sendString='';
    aj.resultHandle=null;

    /*创建XMLHttpRequest对象*/
   aj.createXMLHttpRequest=function(){

        if(window.XMLHttpRequest){ //在非IE中创建XMLHttpRequest对象
            xmlHttp = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            try{
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //按新版IE创建
            }catch(error1){ //创建失败
                try{
                    xmlHttp = new ActiveXobject("Microsoft.XMLHttp"); //按老版IE创建
                }catch(error2){ //创建失败
                    xmlHttp = false;
                }
            }
        }
        return xmlHttp;
    }

    aj.XMLHttpRequest=aj.createXMLHttpRequest();

    /*处理服务器的响应*/
  aj.processHandle=function(){
        if(aj.XMLHttpRequest.readyState == 4){
            if(aj.XMLHttpRequest.status == 200){
                if(aj.recvType=="HTML")
				{
                    aj.resultHandle(aj.XMLHttpRequest.responseText);
					getjosn=XMLHttpRequest.responseText;
				}
                else if(aj.recvType=="XML")
				{
                    aj.resultHandle(aj.XMLHttpRequest.responseXML);
					getjosn=XMLHttpRequest.responseXML;
				}
				aj.resultHandle(aj.XMLHttpRequest.responseText);
				response = xmlHttp.responseText;
    //得到div的节点将数据显示在div上
    var divresult = document.getElementById("result");
			//alert(response);
            }
        }
    }

    /*定义使用get方法传递的方法*/
   aj.get=function(targetUrl, resultHandle){
        aj.targetUrl=targetUrl;    
        
        if(resultHandle!=null){
            aj.XMLHttpRequest.onreadystatechange=aj.processHandle;    
            aj.resultHandle=resultHandle;    
        }
        if(window.XMLHttpRequest){
            aj.XMLHttpRequest.open("GET", aj.targetUrl);
		aj.XMLHttpRequest.setRequestHeader("Accept","application/json"); 
		aj.XMLHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
            aj.XMLHttpRequest.send(null);
        }else{
            aj.XMLHttpRequest.open("GET", aj.targetUrl, true);		
		aj.XMLHttpRequest.setRequestHeader("Accept","application/json"); 
		aj.XMLHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
            aj.XMLHttpRequest.send();
        }
        
    }

    /*定义使用post方法传递的方法*/
   aj.post=function(targetUrl, sendString, resultHandle){
        aj.targetUrl=targetUrl;

        if(typeof(sendString)=="object"){
            var str="";
            for(var pro in sendString){
                str+=pro+"="+sendString[pro]+"&";    
            }
            aj.sendString=str.substr(0, str.length-1);
        }else{
            aj.sendString=sendString;
        }

        if(resultHandle!=null){
            aj.XMLHttpRequest.onreadystatechange=aj.processHandle;    
            aj.resultHandle=resultHandle;    
        }

        aj.XMLHttpRequest.open("post", targetUrl);
        aj.XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        aj.XMLHttpRequest.send(aj.sendString);
        
    }

    return aj;
}


	//md5加密算法	
function md5(string){
                function md5_RotateLeft(lValue, iShiftBits) {
                        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
                }
                function md5_AddUnsigned(lX,lY){
                        var lX4,lY4,lX8,lY8,lResult;
                        lX8 = (lX & 0x80000000);
                        lY8 = (lY & 0x80000000);
                        lX4 = (lX & 0x40000000);
                        lY4 = (lY & 0x40000000);
                        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
                        if (lX4 & lY4) {
                                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                        }
                        if (lX4 | lY4) {
                                if (lResult & 0x40000000) {
                                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                                } else {
                                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                                }
                        } else {
                                return (lResult ^ lX8 ^ lY8);
                        }
                }         
                function md5_F(x,y,z){
                        return (x & y) | ((~x) & z);
                }
                function md5_G(x,y,z){
                        return (x & z) | (y & (~z));
                }
                function md5_H(x,y,z){
                        return (x ^ y ^ z);
                }
                function md5_I(x,y,z){
                        return (y ^ (x | (~z)));
                }
                function md5_FF(a,b,c,d,x,s,ac){
                        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
                        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
                }; 
                function md5_GG(a,b,c,d,x,s,ac){
                        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
                        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
                };
                function md5_HH(a,b,c,d,x,s,ac){
                        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
                        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
                }; 
                function md5_II(a,b,c,d,x,s,ac){
                        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
                        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
                };
                function md5_ConvertToWordArray(string) {
                        var lWordCount;
                        var lMessageLength = string.length;
                        var lNumberOfWords_temp1=lMessageLength + 8;
                        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
                        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
                        var lWordArray=Array(lNumberOfWords-1);
                        var lBytePosition = 0;
                        var lByteCount = 0;
                        while ( lByteCount < lMessageLength ) {
                                lWordCount = (lByteCount-(lByteCount % 4))/4;
                                lBytePosition = (lByteCount % 4)*8;
                                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                                lByteCount++;
                        }
                        lWordCount = (lByteCount-(lByteCount % 4))/4;
                        lBytePosition = (lByteCount % 4)*8;
                        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
                        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
                        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
                        return lWordArray;
                }; 
                function md5_WordToHex(lValue){
                        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
                        for(lCount = 0;lCount<=3;lCount++){
                                lByte = (lValue>>>(lCount*8)) & 255;
                                WordToHexValue_temp = "0" + lByte.toString(16);
                                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
                        }
                        return WordToHexValue;
                };
                function md5_Utf8Encode(string){
                        string = string.replace(/\r\n/g,"\n");
                        var utftext = ""; 
                        for (var n = 0; n < string.length; n++) {
                                var c = string.charCodeAt(n); 
                                if (c < 128) {
                                        utftext += String.fromCharCode(c);
                                }else if((c > 127) && (c < 2048)) {
                                        utftext += String.fromCharCode((c >> 6) | 192);
                                        utftext += String.fromCharCode((c & 63) | 128);
                                } else {
                                        utftext += String.fromCharCode((c >> 12) | 224);
                                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                        utftext += String.fromCharCode((c & 63) | 128);
                                } 
                        } 
                        return utftext;
                }; 
                var x=Array();
                var k,AA,BB,CC,DD,a,b,c,d;
                var S11=7, S12=12, S13=17, S14=22;
                var S21=5, S22=9 , S23=14, S24=20;
                var S31=4, S32=11, S33=16, S34=23;
                var S41=6, S42=10, S43=15, S44=21;
                string = md5_Utf8Encode(string);
                x = md5_ConvertToWordArray(string); 
                a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476; 
                for (k=0;k<x.length;k+=16) {
                        AA=a; BB=b; CC=c; DD=d;
                        a=md5_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
                        d=md5_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
                        c=md5_FF(c,d,a,b,x[k+2], S13,0x242070DB);
                        b=md5_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
                        a=md5_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
                        d=md5_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
                        c=md5_FF(c,d,a,b,x[k+6], S13,0xA8304613);
                        b=md5_FF(b,c,d,a,x[k+7], S14,0xFD469501);
                        a=md5_FF(a,b,c,d,x[k+8], S11,0x698098D8);
                        d=md5_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
                        c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
                        b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
                        a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
                        d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
                        c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
                        b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
                        a=md5_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
                        d=md5_GG(d,a,b,c,x[k+6], S22,0xC040B340);
                        c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
                        b=md5_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
                        a=md5_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
                        d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
                        c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
                        b=md5_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
                        a=md5_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
                        d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
                        c=md5_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
                        b=md5_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
                        a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
                        d=md5_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
                        c=md5_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
                        b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
                        a=md5_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
                        d=md5_HH(d,a,b,c,x[k+8], S32,0x8771F681);
                        c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
                        b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
                        a=md5_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
                        d=md5_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
                        c=md5_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
                        b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
                        a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
                        d=md5_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
                        c=md5_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
                        b=md5_HH(b,c,d,a,x[k+6], S34,0x4881D05);
                        a=md5_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
                        d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
                        c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
                        b=md5_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
                        a=md5_II(a,b,c,d,x[k+0], S41,0xF4292244);
                        d=md5_II(d,a,b,c,x[k+7], S42,0x432AFF97);
                        c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
                        b=md5_II(b,c,d,a,x[k+5], S44,0xFC93A039);
                        a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
                        d=md5_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
                        c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
                        b=md5_II(b,c,d,a,x[k+1], S44,0x85845DD1);
                        a=md5_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
                        d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
                        c=md5_II(c,d,a,b,x[k+6], S43,0xA3014314);
                        b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
                        a=md5_II(a,b,c,d,x[k+4], S41,0xF7537E82);
                        d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
                        c=md5_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
                        b=md5_II(b,c,d,a,x[k+9], S44,0xEB86D391);
                        a=md5_AddUnsigned(a,AA);
                        b=md5_AddUnsigned(b,BB);
                        c=md5_AddUnsigned(c,CC);
                        d=md5_AddUnsigned(d,DD);
                }
        return (md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}