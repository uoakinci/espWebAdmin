document.addEventListener("DOMContentLoaded",()=>{
const editableExtensions = ["txt","js","html","json","css",""];
var sdWhite= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEr0lEQVR4nO2ba6hUVRiGn1VeyAqPZpFJWRoVpCUVaoSYFVSSgkT1oyQORf8kIshAQrpAF4WIiuifRgglRmn4SyUlk8JLQUGZRljmvUJPYR49Tz/2Gs40zZ6ZM7P3bD3OC8PafOs763vXe9Zet71WoAWoAZgHzAemAZcA57ZSZgv4C9gFrAXeDCHsyzWaeqm6ydMTPepjeVZ+jLorBjusPqNOVIfmFrQ+p/PVmeoHZUI8mVewT2KA79UrcgnSAtRu9ZR6Ur0p68KnxsqfUK/LtPAMoS6JPNdkXfDSWPD7mRacMdTR8Z90Qh2Z5ndOE2VPiumG5qi1ByGE34EdwFAgtaUOaaLsi2J6uFqm+ggwrsLcB3wUQtjdir86HZhZJey2EMK6KvaDMb24GtemoG6Nr8CcKnljagxNKzPw35LiezyF6+o0riU00wJqYVhMe4C34/PVwP3A8Az8S8PscmB/fF6Y4psP6rSAy2Le3jLbnGhbnYF/KfbNZTZVU7jWbQHNdIKDCh0BiiZQNDoCFE2gaHQEKJpA0egIUDSBopH1VLiEEeoT8fmGHPznlc8GW0HWApyKaRfwbkpeFv6LKuwnGyVYiWYESH1tQggH1IXAxIqsPuC9Vv2BxSS70JXYWpNxFlCD+qLaFxcYU3MP2iIyWw6r5wHLgAdJmuHTIYSvsqFZLOoKoI4FPgamkqzbHw4h/G+peqaipgDqZGANMB74FZgbQtjRDmLtQqoA6pXAZuBCYAswL4RwoF3E2oVaLWAySeV3A3eEEKruu53paGQm+OdgrTx0psIdAToCFE2gaHQEKJpA0WhkLTBB/bDCdgx4KoRwNAdObUUtAY7EdBTwQJX8VSQHks5opAoQQvhCnQGMrch6BZhAcafBMkXNVyCE8HmlLW5gDBqc9Z1gR4CiCRSNjgBFEygazQgwKIa/EhoWQL1L3QRMiaaefCi1F43sCt8LPAfcGk1/AEuBjTnyahtqbYp2kUx1SxU/DLwOvDUY1gAl1GoBt5FUvgd4AXgnhDAomn05aglQ6h9+CCEsaQeZInDWD4N5nQ+oC3UIyXcHgAD8XcT2e+4CqFeRXKiaBlxD8pltPHBBFd8TwCHgR2An8C3wGfBdCKEvD365CKDeCDwUfxNS3HqA3vjcRyLIcJKj8+OA28t8j6ifkhyS3pilGLUEKAUZyGRpBvA8MKvM/BvJN8ZtwNfAL8CeaiOKOgy4nOTAxLXAdGBGtD0afz+pi4EVebWKEpnS3aA9DfiOVFeVnd8/pL4aywgZcJmkvqT+XBZjuzqpzt+tib73NRN0lNobC0i9GaZer+6MfkfUBeqIAQdsjNNQ9XF1T4x3VJ1bw//L6Det2YAbYgEvp+SPV/dFn3Vq5dWXXKB2qStj3JPq7Co+o9V/rHNpql6ge2KQ4+otVfLXx/z18f1tK9TlMf5BdXRF3msxr7XTLPbfxDxk0smV7LOifW/TCrcIdbj6TeSxqMzeHVtGrzqlVhmNBBlh/x3hU+oKdba6LNqebbkmrfGbH3lsV+/0v53xgqyCDFPfsL9TPN1xTO1upG4DGqJMrsp2A3eTzOa6Bi5nbughmUGuJVmy76/jD8C/8GP8ZiPUO7YAAAAASUVORK5CYII=";
var sdRed= "data:image/png;base64,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";
var diskWhite ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAHuklEQVR4nO2beYhVVRjAv+sy7lFqi+MCZlLqQI7WTJMbZEVRf0hJZIv9EW3g32VGVOKWpLmXYBgGLi1gRlFkReUfRRrk2F7UOKOVtjc1Iy6//jjf6R7v3HvfuffNfWr4weW9d779u2f5znfOEzkNpyEWgCrgcWA/py7sAxYBVXkCsOgEG9+ZsDBPAPYp8+WZmU8SACaqD/vyMANQgF0VhVJ+dKmkMScjZAoAcB3QAjQD1xZlVFYox64gRSgiIkEQBE5bs4gM0Z/NQRAM8zSwi4jUicgVIjJeRC4UkWoR6askrSKyX0S+EJFdIvK2iHwUBMExT/mJdsX54QVxY0cjbGGvh4whwEJ9O1mhGVgADPYJQJJdueeyhABcq8r2Atek8A4AngIOOYZ9A6wGZgC1StNdnwHadguwBvjW4WtXvv4p+hLt6tQAePLdDPys7EeAjWRcSoEAmABsUhkAB4GbcthTmQAA3fStW3gDuDCz4o5yRwHbHbmrgG4Z+IsPANALeEVZ/gHuyqywtI57gTbVsQ3o5clXbAD0zVvnDwCXpNA2AHOBd4AmDVarjt13FXdpCn+dDgUbhJI9oRIBsN3+AHBRCt0I4Bil4RDQM0XOKCcIKzvLj1yMmAnPdvvEN6+03YHlwGLMrD0U6An0BoYB12OWzAcdnv7AuTGy6gmHw/Ry/cjFiFm67Gzf6WNedXwO/AFMjsHd5/S8s1JkFBYA2/XfyCzc34anVcffwJUx+LdKDYVCAoDJ8A5h1uiyl7oUG7o4gX49Bj9abWgHqhNkFBKAhYremENuDbAM2INZAVr1+zKgJoY+AKYDIxLkbVFb5mf1o5ShsYxAV8Lc3jvDw5TYVgNHSYYjwEoylLAIix5NmE2Xlx8+gpMCcJmivgHcnWKAWcfnAEMiPFWE47UdsxrUA330qVfH7d5hu28QVO93yldXiQDMUdTqSPtAwrz9CHC/g1ut7S3AxSk6xzq9a0UGW+1k+YCvHz5CkwLwkqJmxOAmYTYwbcACbashnKgSnXdk1BJOsGM8bb1VbXrB1w8foUkB2KOo2hTebs73ZUq/PIPuVcqz1JN+vNLv9vXDR2hSAH5R1ABPOZ8qfV2kPbGMRTjPNHrqOFvpD/r64SM0KQB2oqqKtD8B7NRnsdP+p9L3jdCnVXH6afufnrb2UPp2Xz8seO+rHbB1uuiSc4uIDNLvA0XkfjkFIE9Z/A/9PDPSXisil+gzzmlv1s/ohHa3iLQo/u4IziZETZ42naGff3nSlwaPSXCsp5wnlT7LsmaXzSWe9BWdBDcr6o4Evksx6/Id+nsM4TJYMmjAOMJlcLSnrbepTRVZBmcrqsMOjDBHAPjQaV+pbS1pQVDn7Znksgy2rlWeiiRCdYpqwkmFFfcBZplcjFPPx6TCtrB5SAPSAPTVpwHT7e0K8ybQ3dPOAPhe+ToUZYoIQICp4QFcFsF14fgkqA8w3AnCCsJ0OQ4OYxInL+dV7iTnhRS/GVKc3Q5vTuE/B2hUh4c77WOApYr7S59GYAmeYz6i53m1ZV5WP0oJTgtANWZSiy2IYMrkjSqiEeid2QA/G2sw2+s2KlkQUfwaJXmTjnOBDVAjcI629QXWY2p8nwFTMht1vI4AU16HlH1GkQHojylIAtwZg69GDy8wRZTXOB5+BfpkNiyUP0vl/MSJKIoqzQwlawPqU+iWK90BTB3va/09LomnhN4G7WEAN5TrR1mMjnM/EDOJEZav2zHlq5GYA5K/gX457BpDWI4vmSuUE4CflDf1fB5zNGa790Gcoy3gKszSBjBT22xqvC6HTQ2O81uBriXoz7M9L6suAV5U5sc8aHuoQXY4zMIcYf2mbfOVro/TllhQiZEfqEzb7bficTgKPKj023x1ucwTnK461IPeHn3Z879/9PNFNEEB7tG2HRnsqCGc7VEdqW9e+aoJaxFTffVFhWxSAZsy8NzsGLsTJwcAdmt7h3piREaAyfCeJyyj/0iJCS8i4znbW3x54oQM1R5wjEjam8KzXhW34CQnwBSnZ0wBztchUYWpKI/H7OrWEpa5wQyp5UC0/pBmQ73a3IaTheYCzEUlgDUetA8obSuRJY4wZfWFJmAeMChJX4odNkl7vBStT0nM1uV6lFA6TUQWiCmZ3R4EwccObrCITBORwyLysoiMFHOtzS6DrWKqQ1+JyE4x1+R2+V6TiwF7v+D3nPwGMNXWXzWaabfCavWtA8yOwc9V3JayDPIEzP0D1PazyxH0jApKPAIHBhFuj5+NwVdhkiSASbmNyQjAq6ozc75hBdTpRNIOjEyg6Q18pIreI+Y8jzBd/iSXITkBuEBtP0rKvaM0AXbSWpCAD4AXlOZbYGAC3Q6liVZ+CwfCCTz70MOsu5CQBOkMDfA7MCqBplZpfqOMnV9ewNw9AvghD7PN6DpcMgYmK/4wcHWKjHUqw+uMLy+QcMymvRQg+2qCHzycwt+fMB0uAnY4unJfli73DxM9iS9EdhORh0TE6zZnTij23yxpkQOm4nfp8SgwsVBD5b91v7K3xTGXEr5MCMRRTN3vxhz+dCoUFoBTBcqZA/argMK7cFFAmHkm/m0ubTO0QURmi8j7/4OOsCEJkRaAR/Rzppg/OJ2KsE+M84+eaENOw8kK/wKQQwwr8AvLMQAAAABJRU5ErkJggg==";
var diskRed = "data:image/png;base64,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";
var selectedFileLine;
var globalLogDiv;
var globalEditorDiv;
var openEditorFile;
var globalEditor;

var _=(a)=>{return document.querySelector(a);}
var __=(a)=>{return document.querySelectorAll(a);}
var ce=(a)=>{return document.createElement(a);}
var xhrDownload=(file,func,blob=false)=>{return xhrGet("file?path="+file,func,null,blob);}
var xhrGet=(target,func,erFunc,blob=false)=>
{
    var xhr = new XMLHttpRequest();
    var path=window.location.pathname;
    if(!path.endsWith("/"))
    {
        path+="/";
    }
    xhr.timeout=60000;
    xhr.open('GET', path+target, true);
    if(blob)
    {
        xhr.responseType = 'blob';
    }
    xhr.onreadystatechange = (e)=>
    {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            func(e);
        }
    };
    xhr.addEventListener("loadend",(event)=>
    {
        if(event.loaded!=event.total||xhr.status!=200)
        {
            if(erFunc)erFunc(event);
            else errorDialog("GET error: xhr:"+xhr.readyState +" http:"+xhr.status );
        }
    },false);
    xhr.addEventListener("error", (event)=>
    {
            if(erFunc)erFunc(event);
            else errorDialog("GET error: xhr:"+xhr.readyState +" http:"+xhr.status);
    }, false);
    xhr.addEventListener("aborted", (event)=>
    { 
            if(erFunc)erFunc(event);
            else  errorDialog("GET aborted: xhr:"+xhr.readyState +" http:"+xhr.status);
    }, false);
    xhr.ontimeout=()=>
    { 
            if(erFunc)erFunc("timeout");
            else errorDialog("GET timeout: xhr:"+xhr.readyState +" http:"+xhr.status);
    };
    xhr.send();
    return xhr;
}
var xhrPut=(target,params,endFunc,progFunc,errorFunc)=>
{
    var path=window.location.pathname;
    if(!path.endsWith("/"))
    {
        path+="/";
    }
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', path+target, true);
    xhr.timeout=60000;
    xhr.onreadystatechange = (e)=>
    {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            endFunc(e);
        }
    };
    xhr.addEventListener("loadend",(event)=>
    {
        if(event.loaded!=event.total||xhr.status!=200)
        {
            errorFunc(event);
        }
    });
    xhr.upload.addEventListener("progress",progFunc);
    xhr.addEventListener("error", errorFunc);
    xhr.addEventListener("aborted", errorFunc);
    xhr.ontimeout=()=>
    { 
        errorDialog("PUT timeout: xhr:"+xhr.readyState +" http:"+xhr.status);
    };
    xhr.send(params);
    return xhr;
}
var xhrDelete=(target,params,endFunc,errorFunc)=>
{
    var path=window.location.pathname;
    if(!path.endsWith("/"))
    {
        path+="/";
    }
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', path+target, true);
    xhr.timeout=60000;
    xhr.onreadystatechange = (e)=>
    {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            endFunc(e);
        }
    };
    xhr.addEventListener("loadend",(event)=>
    {
        if(event.loaded!=event.total||xhr.status!=200)
        {
            errorFunc(event);
        }
    });
    xhr.addEventListener("error", errorFunc);
    xhr.addEventListener("aborted", errorFunc);
    xhr.ontimeout=()=>
    { 
        errorDialog("DELETE timeout: xhr:"+xhr.readyState +" http:"+xhr.status);
    };
    xhr.send(params);
    return xhr;
}
var saveBlob=(blob, fileName)=> 
{
    var a = ce('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.dispatchEvent(new MouseEvent('click'));
}
var errorDialog=(text)=>
{
    _("#generalErrorStatus").innerText=text;
    window.generalError.showModal();
}
var showEditor=(code,type)=>
{
    var itype=type;
    if(type=="json")
    {
        itype="js";
    }
    var inq=_("#explorer");
    if(inq.nextElementSibling.dataset.type!="code")
    {
        inq.parentNode.removeChild( inq.nextElementSibling );
        inq.parentNode.appendChild( globalEditorDiv );
    }
    globalEditor=new CodeFlask(globalEditorDiv, {
        language: itype,
        readonly: false,
        lineNumbers: true,
    });

    globalEditor.updateCode(code);
}
var showLog=()=>
{
    collapsePath("/");
    var ld=_("#log_dir");
    if(ld)
    {
        selectThis(ld);
        ld.firstChild.classList.remove("folder-icon");
        ld.firstChild.classList.add("folder-open-icon");
    }
    var inq=_("#explorer");
    if(inq.nextElementSibling.dataset.type!="log")
    {
        inq.parentNode.removeChild( inq.nextElementSibling );
        inq.parentNode.appendChild( globalLogDiv );
    }
    _("#saveImg").classList.remove("red_blink");
    _("#saveImg").classList.add("hidden");
    document.removeEventListener('keydown',saveKeys);
}
var createFolderDialog=(elem)=>
{
    var path=elem.dataset.path;
    collapsePath(path);
    expandPath(path);
    if(!path.endsWith("/"))path+="/"
    _("#createFolderSelect").value=path+"New_folder";
    window.cerateFolder.showModal();
    console.log("Create folder for "+ elem.dataset.path);
}
var createFileDialog=(elem)=>
{
    var path=elem.dataset.path;
    collapsePath(path);
    expandPath(path);
    if(!path.endsWith("/"))path+="/"
    _("#createFileSelect").value=path+"New_file.txt";
    window.cerateFile.showModal();
    console.log("Create file for "+ elem.dataset.path);
}
var deleteFileDialog=(elem)=>
{
    _("#deleteFileSelect").value=elem.dataset.path;
    window.deleteFile.showModal();
    console.log("Delete file for "+ elem.dataset.path);
}
var deleteFolderDialog=(elem)=>
{
    var path=elem.dataset.path;
    if(!path.endsWith("/"))path+="/"
    _("#deleteFolderSelect").value=path;
    window.deleteFolder.showModal();
    console.log("Delete folder for "+ elem.dataset.path);
}
var editFileDialog=(elem)=>
{
    console.log("Edit for "+ elem.dataset.path);
    var xhr= xhrDownload(elem.dataset.path,(event)=>
    {
        openEditorFile=elem;
        _("#saveImg").classList.remove("hidden");
        document.addEventListener('keydown',saveKeys);
        showEditor(xhr.responseText,elem.dataset.extension);
    });
}
var downloadFileDialog=(elem)=>
{
    var xhr=xhrDownload(elem.dataset.path,(event)=>
    {
        var blob = event.currentTarget.response;
        var contentDispo = event.currentTarget.getResponseHeader('Content-Disposition');
        if(contentDispo)
        {
            var fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
            saveBlob(blob, fileName);
        }
        else
        {
            saveBlob(blob,"unknown.file");
        }
    },true);
}
var uploadFileDialog=(elem)=>
{
    if(elem.dataset.path.endsWith('/'))
    _("#uploadFileDir").value=elem.dataset.path;
    else
    _("#uploadFileDir").value=elem.dataset.path+"/";
    window.uploadFile.showModal();
}
var binaryUploader=(event)=>
{
    var file=_("#binaryFile").files[0];
    if(!file)
    {
        errorDialog("No file selected to upload.");
        return;
    }
    var type=_('input[name="binaryType"]:checked').value;
    var formData = new FormData();
    formData.append("file",file);
    var xhr= xhrPut(type,formData,(event)=>
    {
        if(xhr.status==200)
        {
            _("#binaryProgressBar").value = 0;
            _("#binaryProgressStatus").innerHTML = event.target.responseText;
            closeAllDialogs();
        }
        else
        {
            _("#binaryProgressBar").value = 0;
            _("#binaryProgressStatus").innerHTML = "Unable to upload HTTP Status:"+xhr.status;
        }
    },(event)=>
    {
        var percent = (event.loaded / event.total) * 100;
        _("#binaryProgressBar").value = Math.round(percent);
        _("#binaryProgressStatus").innerHTML = Math.round(percent) + "% uploaded...";
     },
     (event)=>{  _("#binaryProgressStatus").innerHTML ="Error."; }
     );
    console.debug("UploadBinary: "+file.name);
}
var fileUploader=()=>
{
    var dir=_('#uploadFileDir').value;
    if(!dir.endsWith('/'))
    {
        dir+"/";
    }
    var files=_("#uploadFileSelect").files;
    if(!files.length)
    {
        errorDialog("No file selected to upload.");
        return;
    }
    var formData = new FormData();
    formData.append("path",dir);
    for(var file in files)
    {
        formData.append("file", files[file]);
    }
    var xhr=xhrPut("file",formData,(event)=>
    {
        _("#uploadFileprogressBar").value = 0;
        _("#uploadFileProgressStatus").innerHTML = event.target.responseText;
        collapsePath(dir);
        expandPath(dir);
        closeAllDialogs();
    },(event)=>
    {
        var percent = (event.loaded / event.total) * 100;
        _("#uploadFileprogressBar").value = Math.round(percent);
        _("#uploadFileProgressStatus").innerHTML = Math.round(percent) + "% uploaded...";
    },(event)=>
    {
        _("#uploadFileprogressBar").value =0;
        _("#uploadFileProgressStatus").innerHTML ="Unable to upload XHR:"+xhr.status;
    });

    console.debug("UploadFileTo: "+dir);
}
var fileSaver=()=>
{
    _("#saveImg").classList.remove("red_blink");
    var formData = new FormData();
    formData.append("path",openEditorFile.dataset.path.substring(0,openEditorFile.dataset.path.lastIndexOf('/')+1));
    var data=globalEditor.getCode();
    if(!data.length)
    {
        data="\u0000";
    }
    formData.append("file",new File([new Blob([data])], openEditorFile.dataset.name));
    var xhr=xhrPut("file",formData,(event)=>
    {
        console.log("Saved file:"+openEditorFile.dataset.path);
        _("#saveImg").classList.add("red_blink");
    },(event)=>
    {

    },(event)=>
    {
        errorDialog("Unable to save XHR:"+xhr.status);
    });
    console.debug("saveFile"+openEditorFile.dataset.path);
}
var fileDeleter=()=>
{
    var path=_('#deleteFileSelect').value;
    if(!path.length|| path == "/")
    {
        errorDialog("No file selected to delete.");
        return;
    }
    var formData = new FormData();
    formData.append("path",path);
    var xhr=xhrDelete("file",formData,(event)=>
    {
        collapsePath(path.substring(0,path.lastIndexOf("/")+1));
        expandPath(path.substring(0,path.lastIndexOf("/")+1));
        closeAllDialogs();
    },(event)=>
    {
        _("#deleteFileStatus").innerText="Unable to delete file. xhr:"+xhr.readyState+" HTTP status:"+xhr.status;
    });
    console.debug("Delete file: "+path);
}
var folderDeleter=()=>
{
    var path=_('#deleteFolderSelect').value;
    if(!path.length|| !path.endsWith("/"))
    {
        errorDialog("No Folder selected to delete.");
        return;
    }
    var formData = new FormData();
    formData.append("path",path);
    path=path.slice(0,-1);
    var xhr=xhrDelete("folder",formData,(event)=>
    {
        collapsePath(path.substring(0,path.lastIndexOf("/")));
        expandPath(path.substring(0,path.lastIndexOf("/")));
        closeAllDialogs();
    },(event)=>
    {
        _("#deleteFolderStatus").innerText="Unable to delete folder. xhr:"+xhr.readyState+" HTTP status:"+xhr.status;
    });
    console.debug("Delete folder: "+path);
}
var folderCreator=()=>
{
    var path=_('#createFolderSelect').value;
    if(!path.length)
    {
        errorDialog("No Folder selected to create.");
        return;
    }
    if(path.endsWith('/'))
    {
        path=path.slice(0, -1);
    }
    var formData = new FormData();
    formData.append("path",path);
    var xhr=xhrPut("folder",formData,(event)=>
    {
        collapsePath(path.substring(0,path.lastIndexOf("/")));
        expandPath(path.substring(0,path.lastIndexOf("/")));
        closeAllDialogs();
    },null,(event)=>
    {
        _("#createFolderStatus").innerText="Unable to create folder. xhr:"+xhr.readyState+" HTTP status:"+xhr.status;
    });
    console.debug("Create folder: "+path);
}
var fileCreator=()=>
{
    var path=_('#createFileSelect').value;
    if(!path.length||path.endsWith('/'))
    {
        errorDialog("No File selected to create.");
        return;
    }
    var dir=path.substring(0,path.lastIndexOf("/"));
    if(dir.length==0)
    {
        dir="/";
    }
    var elem=createListElement(path.substring(path.lastIndexOf('/')+1, path.length),"FILE",dir);
    _('div.directory.tools[data-path="'+dir+'"]').nextElementSibling.appendChild(elem);
    openEditorFile=elem.querySelector("div.file.tools");
    _("#saveImg").classList.remove("hidden");
    document.addEventListener('keydown',saveKeys);
    showEditor("",openEditorFile.dataset.extension);
    closeAllDialogs();
}
var fileOpener=(fileElem)=>
{
    selectThis(fileElem);
    if(editableExtensions.includes(fileElem.dataset.extension))
    {
        editFileDialog(fileElem);
    }
}
var selectThis=(elem)=>
{
    selectedFileLine=elem;
    var nodeList=__(".selected-file");
    for(i=0;i<nodeList.length;i++)
    {
        nodeList[i].classList.remove("selected-file")
    }
    elem.classList.add("selected-file");
    if(elem.nextElementSibling)
    {
        elem.nextElementSibling.classList.add("selected-file");
    }
    else
    {
        elem.parentNode.firstChild.classList.add("selected-file");
    }
}
var addTools=(toolsDiv)=>
{
    if(toolsDiv.classList.contains("directory"))
    {
        var iElem = ce("i");
        iElem.title="Create File";
        iElem.classList.add("icon");
        iElem.classList.add("create-file-icon");
        iElem.onclick=()=>{createFileDialog(toolsDiv)}
        toolsDiv.appendChild(iElem);
        var iElem = ce("i");
        iElem.title="Create Folder";
        iElem.classList.add("icon");
        iElem.classList.add("create-folder-icon");
        iElem.onclick=()=>{createFolderDialog(toolsDiv)}
        toolsDiv.appendChild(iElem);
        var iElem = ce("i");
        iElem.title="Upload File";
        iElem.classList.add("icon");
        iElem.classList.add("upload-icon");
        iElem.onclick=()=>{uploadFileDialog(toolsDiv)}
        toolsDiv.appendChild(iElem);
        var iElem = ce("i");
        iElem.title="Delete Folder";
        iElem.classList.add("icon");
        iElem.classList.add("delete-folder-icon");
        iElem.onclick=()=>{deleteFolderDialog(toolsDiv)}
        toolsDiv.appendChild(iElem);
    }
    else
    {
        if(editableExtensions.includes(toolsDiv.dataset.extension))
        {
            var iElem = ce("i");
            iElem.title="Edit";
            iElem.classList.add("icon");
            iElem.classList.add("write-icon");
            iElem.onclick=()=>{editFileDialog(toolsDiv)}
            toolsDiv.appendChild(iElem);
        }
        var iElem = ce("i");
        iElem.title="Download";
        iElem.classList.add("icon");
        iElem.classList.add("download-icon");
        iElem.onclick=()=>{downloadFileDialog(toolsDiv)}
        toolsDiv.appendChild(iElem);
        var iElem = ce("i");
        var iElem = ce("i");
        iElem.title="Delete";
        iElem.classList.add("icon");
        iElem.classList.add("delete-icon");
        iElem.onclick=()=>{deleteFileDialog(toolsDiv)}
        toolsDiv.appendChild(iElem);
    }
}
var collapsePath=(path="/")=>
{
    if(path!="/"&&path.endsWith("/"))
    {
        path=path.slice(0, -1);
    }
    var elem=_('div.directory.tools[data-path="'+path+'"]');
    if(!elem)return;
    elem.parentNode.firstChild.firstChild.classList.remove("folder-open-icon");
    elem.parentNode.firstChild.firstChild.classList.add("folder-icon");
    if(!elem.nextElementSibling)return;
    elem.parentNode.removeChild(elem.nextElementSibling);
}
var expandPath=(path="/")=>
{
    if(path!="/"&&path.endsWith("/"))
    {
        path=path.slice(0, -1);
    }
    var elem=_('div.directory[data-path="'+path+'"]:not(.tools)');
    if(!elem)return;
    directoryLister(elem);
}
var createListElement=(name,type,path)=>
{
    var liElem = ce("li");
    var divElem = ce("div");
    var div2Elem = ce("div");
    var iElem = ce("i");
    iElem.classList.add("icon");
    var spanElem = ce("span");
    divElem.classList.add("file-name");
    div2Elem.classList.add("file-name");
    if(path.endsWith("/"))
    {
        divElem.dataset.path=path+name;
        div2Elem.dataset.path=path+name;
    }
    else
    {
        divElem.dataset.path=path+"/"+name;
        div2Elem.dataset.path=path+"/"+name;
    }

    if(type=="DIR")
    {
        iElem.classList.add("folder-icon");
        divElem.classList.add("directory");
        div2Elem.classList.add("directory");
        //spanElem.classList.add("caret");
        divElem.onclick=()=>
        {
            directoryLister(divElem);
        }
    }
    else
    {
        iElem.classList.add("file-icon");
        divElem.classList.add("file");
        div2Elem.classList.add("file");
        if(name.includes('.'))
            divElem.dataset.extension=name.substring(name.lastIndexOf('.')+1, name.length);
        else
            divElem.dataset.extension="";
        div2Elem.dataset.extension=divElem.dataset.extension;
        iElem.classList.add(divElem.dataset.extension+"-icon");
        divElem.onclick=()=>
        {
            fileOpener(divElem);
        }
    }
    spanElem.innerText=name;
    divElem.dataset.name=name;
    div2Elem.dataset.name=name;
    divElem.appendChild(iElem);
    divElem.appendChild(spanElem);
    liElem.appendChild(divElem);
    div2Elem.classList.add("tools");
    addTools(div2Elem);
    liElem.appendChild(div2Elem);
    return liElem;
}
var directoryLister=(dirElem)=>
{
    selectThis(dirElem);
    if(dirElem.nextElementSibling.nextElementSibling)
    {
        dirElem.firstChild.classList.remove("folder-open-icon");
        dirElem.firstChild.classList.add("folder-icon");
        dirElem.parentNode.removeChild(dirElem.nextElementSibling.nextElementSibling);
        return;
    }
    else
    {
        xhr= new XMLHttpRequest();
        xhr.open("GET",window.location.pathname+"/list?path="+dirElem.dataset.path);
        xhr.onreadystatechange = ()=>
        {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
            {
                var list = JSON.parse(xhr.responseText);
                var ulElem =ce("ul");
                list.forEach(element =>
                {
                    ulElem.appendChild(createListElement(element.name,element.type,dirElem.dataset.path));
                });
                ulElem.classList.add("active");
                ulElem.classList.add("nested");
                dirElem.firstChild.classList.add("folder-open-icon");
                dirElem.firstChild.classList.remove("folder-icon");
                dirElem.parentNode.appendChild(ulElem);
            }
            else
            {
                console.log("XHR: "+xhr.status);
            }
        }
        //xhr.open("GET","text.json");
        xhr.send();
        return ;
    }

}
var closeAllDialogs=()=>
{
    var a=_("dialog[open]");
    if(a)
    {
        a.close();
    }
    _("#deleteFileSelect").value=null;
    _("#deleteFolderSelect").value=null;
    _("#createFolderSelect").value=null;
    _("#createFileSelect").value=null;
    _("#binaryFile").value=null;
    _("#uploadFileSelect").value=null;
    _("#uploadFileDir").value=null;
    //_("#uploadFileFilename").value=null;
    _("#sketchImage").checked=true;
    _("#binaryProgressBar").value = 0;
    _("#generalErrorStatus").innerText="";
    _("#deleteFileStatus").innerText="";
    _("#deleteFolderStatus").innerText="";
    _("#createFolderStatus").innerText="";
    _("#createFileStatus").innerText="";
    _("#binaryProgressStatus").innerHTML="Waiting...";
    _("#uploadFileProgressStatus").innerHTML="Waiting...";
}
var logMessage=(l)=>
{
    var log=ce("div");
    log.classList.add("log-text");
    log.innerText=l;
    globalLogDiv.appendChild(log);
    globalLogDiv.scrollTop = globalLogDiv.scrollHeight;
}
var startEventListener=()=>
{
    var path=window.location.pathname;
    if(!path.endsWith("/"))
    {
        path+="/";
    }
    var es = new EventSource(path+'logs');
    var capabilityLogEvents=false;
    es.onopen=(e)=>
    {
        logMessage("Log channel open.");
        capabilityLogEvents=true;
    };
    es.onerror=(e)=>
    {

        if(capabilityLogEvents)
        {
            logMessage("Log channel closed. Start in 10 seconds.");
            setTimeout(startEventListener,10000);
        }
        else
        {
            logMessage("No web logging capability.");
            _("ul#root_list").removeChild(_("#log_dir").parentNode);
        }

    };
    es.onmessage=(e)=>
    {
        logMessage(e.data);
    };
}
var mountDisk=()=>
{
    xhr= new XMLHttpRequest();
    xhr.open("PUT",window.location.pathname+"/disk");
    xhr.onload=(e)=>
    {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            if(xhr.responseText=="MOUNTED")
            {
                _("#diskImg").src=diskWhite;
                _("#diskImg").title="Unmount FS";
                _("#diskImg").onclick=umountDisk;
            }
        }
    };
    xhr.send();
}
var umountDisk=()=>
{
    xhr= new XMLHttpRequest();
    xhr.open("DELETE",window.location.pathname+"/disk");
    xhr.onload=(e)=>
    {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            if(xhr.responseText=="UMOUNTED")
            {
                _("#diskImg").src=diskRed;
                _("#diskImg").title="Mount FS";
                _("#diskImg").onclick=mountDisk;
                showLog();
            }
        }
    };
    xhr.send();
}
var diskState=()=>
{
    var xhr=xhrGet("disk",(e)=>
    {
        if(xhr.responseText=="MOUNTED")
            {
                _("#diskImg").src=diskWhite;
                _("#diskImg").title="Unmount FS";
                _("#diskImg").onclick=umountDisk;
            }
            else if(xhr.responseText=="UNMOUNTED")
            {
                _("#diskImg").src=diskRed;
                _("#diskImg").title="Mount FS";
                _("#diskImg").onclick=mountDisk;
            }
    }, (e)=>
    {
        _("#diskImg").src=diskRed;
        _("#diskImg").title="Mount FS";
        _("#diskImg").onclick=mountDisk;
    });
}
var saveKeys=(e)=> 
{
    if (e.ctrlKey && e.key === 's') 
    {
      e.preventDefault();
      fileSaver();
    }
}
var infoCapability=false;
var infoFetcher=()=>
{
    var xhr=xhrGet("info",(e)=>
    {
        infoCapability=true;
        var list = JSON.parse(xhr.responseText);
        _("table.esp-data").textContent = "";
        for (const key in list)
        {
            var td1=ce("td");
            td1.innerText=key;
            var td2=ce("td");
            td2.innerText=list[key];
            var td3=ce("td");
            td3.innerText=":";
            var tr=ce("tr");
            tr.appendChild(td1);
            tr.appendChild(td3);
            tr.appendChild(td2);
            _("table.esp-data").appendChild(tr);
        }
        setTimeout(infoFetcher,10000);
    },(event)=>
    {
        if(infoCapability)
        {
            setTimeout(infoFetcher,10000);
        }
    });
}
(()=>
{
    var elem=_("img#binImg");
    elem.onclick=()=>{window.uploadBinary.showModal();};
    var elem=_("#root_dir");
    selectedFileLine=elem;
    elem.dataset.path="/";
    elem.nextElementSibling.dataset.path="/";
    addTools(elem.nextElementSibling);
    elem.onclick=()=>
    {
        var a=_("#log_dir");
        if(a)
        {
            a.firstChild.classList.add("folder-icon");
            a.firstChild.classList.remove("folder-open-icon");
        }
        directoryLister(elem);
    };
    _("#log_dir").onclick=showLog;
    _("#clearLogs").onclick=()=>{globalLogDiv.innerText="";};
    var xes=__(".dialogClose");
    for(i=0;i<xes.length;i++){xes[i].onclick=closeAllDialogs;};
    _("#generalError").onclick=()=>{_("#generalError").close();};
    _("#binaryUploadButton").onclick=binaryUploader;
    _("#uploadFileUploadButton").onclick=fileUploader;
    _("#deleteFileButton").onclick=fileDeleter;
    _("#deleteFolderButton").onclick=folderDeleter;
    _("#createFolderButton").onclick=folderCreator;
    _("#createFileButton").onclick=fileCreator;
    _("#saveImg").onclick=fileSaver;
    // _("#uploadFileSelect").onchange=(event)=>{_("#uploadFileFilename").value= _("#uploadFileSelect").files[0].name;};

    globalEditorDiv=ce("div");
    globalEditorDiv.id="editor";
    globalEditorDiv.dataset.type="code";
    globalLogDiv=ce("div");
    globalLogDiv.id="logger";
    globalLogDiv.dataset.type="log";
    _("#explorer").parentNode.appendChild(globalLogDiv);
    infoFetcher();
    diskState();
    startEventListener();
})();
});
