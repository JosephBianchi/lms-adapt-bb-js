!function(){document.querySelector("script#iframefix");var e=document.querySelector("iframe[data-iframefix]")||document.querySelector("frame[data-iframefix]");window.addEventListener("orientationchange",function(){try{if(!e||!e.contentWindow)return;e.style.width=0,e.style.height=0,e.style.bottom=0,e.style.right=0,e.contentWindow.postMessage({type:"orientationchange"},"*")}catch(t){}},!1),window.addEventListener("resize",function(){try{if(!e||!e.contentWindow)return;e.style.width=0,e.style.height=0,e.style.bottom=0,e.style.right=0,e.contentWindow.postMessage({type:"resize"},"*")}catch(t){}},!1),document.body.style.overflow="hidden"}();