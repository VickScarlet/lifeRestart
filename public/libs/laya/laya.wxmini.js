
(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

	var Browser=laya.utils.Browser,Event=laya.events.Event,EventDispatcher=laya.events.EventDispatcher;
	var HTMLImage=laya.resource.HTMLImage,Handler=laya.utils.Handler,Input=laya.display.Input,Loader=laya.net.Loader;
	var LocalStorage=laya.net.LocalStorage,Matrix=laya.maths.Matrix,Render=laya.renders.Render,RunDriver=laya.utils.RunDriver;
	var Sound=laya.media.Sound,SoundChannel=laya.media.SoundChannel,SoundManager=laya.media.SoundManager,URL=laya.net.URL;
	var Utils=laya.utils.Utils;
//class laya.wx.mini.MiniAdpter
var MiniAdpter=(function(){
	function MiniAdpter(){}
	__class(MiniAdpter,'laya.wx.mini.MiniAdpter');
	MiniAdpter.getJson=function(data){
		return JSON.parse(data);
	}

	MiniAdpter.init=function(isPosMsg,isSon){
		(isPosMsg===void 0)&& (isPosMsg=false);
		(isSon===void 0)&& (isSon=false);
		if (MiniAdpter._inited)return;
		MiniAdpter._inited=true;
		MiniAdpter.window=/*__JS__ */window;
		if(!MiniAdpter.window.hasOwnProperty("wx"))
			return;
		if(MiniAdpter.window.navigator.userAgent.indexOf('MiniGame')<0)return;
		MiniAdpter.isZiYu=isSon;
		MiniAdpter.isPosMsgYu=isPosMsg;
		MiniAdpter.EnvConfig={};
		try{
			/*__JS__ */laya.webgl.resource.WebGLCanvas.premulAlpha=true;
			}catch(e){
		}
		if(!MiniAdpter.isZiYu){
			MiniFileMgr.setNativeFileDir("/layaairGame");
			MiniFileMgr.existDir(MiniFileMgr.fileNativeDir,Handler.create(MiniAdpter,MiniAdpter.onMkdirCallBack));
		}
		MiniAdpter.systemInfo=MiniAdpter.window.wx.getSystemInfoSync();
		if (MiniAdpter.systemInfo.system.toLowerCase()==='ios 10.1.1'){
			try{
				/*__JS__ */laya.webgl.resource.WebGLCharImage.canUseCanvas=false;
				}catch(e){
			}
		}
		MiniAdpter.window.focus=function (){
		};
		Laya['_getUrlPath']=function (){
		};
		Laya['getUrlPath']=function (){
		};
		MiniAdpter.window.logtime=function (str){
		};
		MiniAdpter.window.alertTimeLog=function (str){
		};
		MiniAdpter.window.resetShareInfo=function (){
		};
		MiniAdpter.window.CanvasRenderingContext2D=function (){
		};
		MiniAdpter.window.CanvasRenderingContext2D.prototype=MiniAdpter.window.wx.createCanvas().getContext('2d').__proto__;
		MiniAdpter.window.document.body.appendChild=function (){
		};
		MiniAdpter.EnvConfig.pixelRatioInt=0;
		RunDriver.getPixelRatio=MiniAdpter.pixelRatio;
		MiniAdpter._preCreateElement=Browser.createElement;
		Browser["createElement"]=MiniAdpter.createElement;
		RunDriver.createShaderCondition=MiniAdpter.createShaderCondition;
		Utils['parseXMLFromString']=MiniAdpter.parseXMLFromString;
		Input['_createInputElement']=MiniInput['_createInputElement'];
		MiniAdpter.EnvConfig.load=Loader.prototype.load;
		Loader.prototype.load=MiniLoader.prototype.load;
		Loader.prototype._loadImage=MiniImage.prototype._loadImage;
		LocalStorage._baseClass=MiniLocalStorage;
		MiniLocalStorage.__init__();
		MiniAdpter.onReciveData();
	}

	MiniAdpter.onReciveData=function(){
		if(laya.wx.mini.MiniAdpter.isZiYu){
			MiniAdpter.window.wx.onMessage(function(message){
				if(message['isLoad']=="opendatacontext"){
					if(message.url){
						MiniFileMgr.ziyuFileData[message.url]=message.atlasdata;
						MiniFileMgr.ziyuFileTextureData[message.imgReadyUrl]=message.imgNativeUrl;
					}
					}else if(message['isLoad']=="openJsondatacontext"){
					if(message.url){
						MiniFileMgr.ziyuFileData[message.url]=message.atlasdata;
					}
					}else if(message['isLoad']=="openJsondatacontextPic"){
					MiniFileMgr.ziyuFileTextureData[message.imgReadyUrl]=message.imgNativeUrl;
				}
			});
		}
	}

	MiniAdpter.measureText=function(str){
		var tempObj=MiniAdpter._measureText(str);
		if(!tempObj){
			tempObj={width:16};
			console.warn("-------微信获取文字宽度失败----等待修复---------");
		}
		return tempObj;
	}

	MiniAdpter.getUrlEncode=function(url,type){
		if(type=="arraybuffer")
			return "";
		return "utf8";
	}

	MiniAdpter.downLoadFile=function(fileUrl,fileType,callBack,encoding){
		(fileType===void 0)&& (fileType="");
		(encoding===void 0)&& (encoding="utf8");
		var fileObj=MiniFileMgr.getFileInfo(fileUrl);
		if(!fileObj)
			MiniFileMgr.downLoadFile(fileUrl,fileType,callBack,encoding);
		else{
			callBack !=null && callBack.runWith([0]);
		}
	}

	MiniAdpter.remove=function(fileUrl,callBack){
		MiniFileMgr.deleteFile("",fileUrl,callBack,"",0);
	}

	MiniAdpter.removeAll=function(){
		MiniFileMgr.deleteAll();
	}

	MiniAdpter.hasNativeFile=function(fileUrl){
		return MiniFileMgr.isLocalNativeFile(fileUrl);
	}

	MiniAdpter.getFileInfo=function(fileUrl){
		return MiniFileMgr.getFileInfo(fileUrl);
	}

	MiniAdpter.getFileList=function(){
		return MiniFileMgr.filesListObj;
	}

	MiniAdpter.exitMiniProgram=function(){
		MiniAdpter.window.wx.exitMiniProgram();
	}

	MiniAdpter.onMkdirCallBack=function(errorCode,data){
		if (!errorCode){
			MiniFileMgr.filesListObj=JSON.parse(data.data);
			MiniFileMgr.fakeObj=JSON.parse(data.data);
		}
	}

	MiniAdpter.pixelRatio=function(){
		if (!MiniAdpter.EnvConfig.pixelRatioInt){
			try {
				MiniAdpter.EnvConfig.pixelRatioInt=MiniAdpter.systemInfo.pixelRatio;
				return MiniAdpter.systemInfo.pixelRatio;
			}catch (error){}
		}
		return MiniAdpter.EnvConfig.pixelRatioInt;
	}

	MiniAdpter.createElement=function(type){
		if (type=="canvas"){
			var _source;
			if (MiniAdpter.idx==1){
				if(MiniAdpter.isZiYu){
					_source=MiniAdpter.window.sharedCanvas;
					_source.style={};
					}else{
					_source=MiniAdpter.window.canvas;
				}
				}else {
				_source=MiniAdpter.window.wx.createCanvas();
			}
			MiniAdpter.idx++;
			return _source;
			}else if (type=="textarea" || type=="input"){
			return MiniAdpter.onCreateInput(type);
			}else if (type=="div"){
			var node=MiniAdpter._preCreateElement(type);
			node.contains=function (value){
				return null
			};
			node.removeChild=function (value){
			};
			return node;
		}
		else {
			return MiniAdpter._preCreateElement(type);
		}
	}

	MiniAdpter.onCreateInput=function(type){
		var node=MiniAdpter._preCreateElement(type);
		node.focus=MiniInput.wxinputFocus;
		node.blur=MiniInput.wxinputblur;
		node.style={};
		node.value=0;
		node.parentElement={};
		node.placeholder={};
		node.type={};
		node.setColor=function (value){
		};
		node.setType=function (value){
		};
		node.setFontFace=function (value){
		};
		node.addEventListener=function (value){
		};
		node.contains=function (value){
			return null
		};
		node.removeChild=function (value){
		};
		return node;
	}

	MiniAdpter.createShaderCondition=function(conditionScript){
		var _$this=this;
		var func=function (){
			var abc=conditionScript;
			return _$this[conditionScript.replace("this.","")];
		}
		return func;
	}

	MiniAdpter.sendAtlasToOpenDataContext=function(url){
		if(!laya.wx.mini.MiniAdpter.isZiYu){
			var atlasJson=Loader.getRes(URL.formatURL(url));
			if(atlasJson){
				var textureArr=(atlasJson.meta.image).split(",");
				if (atlasJson.meta && atlasJson.meta.image){
					var toloadPics=atlasJson.meta.image.split(",");
					var split=url.indexOf("/")>=0 ? "/" :"\\";
					var idx=url.lastIndexOf(split);
					var folderPath=idx >=0 ? url.substr(0,idx+1):"";
					for (var i=0,len=toloadPics.length;i < len;i++){
						toloadPics[i]=folderPath+toloadPics[i];
					}
					}else {
					toloadPics=[url.replace(".json",".png")];
				}
				for(i=0;i<toloadPics.length;i++){
					var tempAtlasPngUrl=toloadPics[i];
					MiniAdpter.postInfoToContext(url,tempAtlasPngUrl,atlasJson);
				}
				}else{
				throw "传递的url没有获取到对应的图集数据信息，请确保图集已经过！";
			}
		}
	}

	MiniAdpter.postInfoToContext=function(url,atlaspngUrl,atlasJson){
		var postData={"frames":atlasJson.frames,"meta":atlasJson.meta};
		var textureUrl=atlaspngUrl;
		var fileObj=MiniFileMgr.getFileInfo(URL.formatURL(atlaspngUrl));
		if(fileObj){
			var fileMd5Name=fileObj.md5;
			var fileNativeUrl=MiniFileMgr.getFileNativePath(fileMd5Name);
			}else{
			fileNativeUrl=textureUrl;
		}
		if(fileNativeUrl){
			MiniAdpter.window.wx.postMessage({url:url,atlasdata:postData,imgNativeUrl:fileNativeUrl,imgReadyUrl:textureUrl,isLoad:"opendatacontext"});
			}else{
			throw "获取图集的磁盘url路径不存在！";
		}
	}

	MiniAdpter.sendSinglePicToOpenDataContext=function(url){
		var tempTextureUrl=URL.formatURL(url);
		var fileObj=MiniFileMgr.getFileInfo(tempTextureUrl);
		if(fileObj){
			var fileMd5Name=fileObj.md5;
			var fileNativeUrl=MiniFileMgr.getFileNativePath(fileMd5Name);
			url=tempTextureUrl;
			}else{
			fileNativeUrl=url;
		}
		if(fileNativeUrl){
			MiniAdpter.window.wx.postMessage({url:url,imgNativeUrl:fileNativeUrl,imgReadyUrl:url,isLoad:"openJsondatacontextPic"});
			}else{
			throw "获取图集的磁盘url路径不存在！";
		}
	}

	MiniAdpter.sendJsonDataToDataContext=function(url){
		if(!laya.wx.mini.MiniAdpter.isZiYu){
			var atlasJson=Loader.getRes(url);
			if(atlasJson){
				MiniAdpter.window.wx.postMessage({url:url,atlasdata:atlasJson,isLoad:"openJsondatacontext"});
				}else{
				throw "传递的url没有获取到对应的图集数据信息，请确保图集已经过！";
			}
		}
	}

	MiniAdpter.EnvConfig=null;
	MiniAdpter.window=null;
	MiniAdpter._preCreateElement=null;
	MiniAdpter._inited=false;
	MiniAdpter.systemInfo=null;
	MiniAdpter.isZiYu=false;
	MiniAdpter.isPosMsgYu=false;
	MiniAdpter.autoCacheFile=true;
	MiniAdpter.minClearSize=(5 *1024 *1024);
	MiniAdpter.subNativeFiles=null;
	MiniAdpter.subNativeheads=[];
	MiniAdpter.subMaps=[];
	MiniAdpter.AutoCacheDownFile=false;
	MiniAdpter._measureText=null;
	MiniAdpter.parseXMLFromString=function(value){
		var rst;
		var Parser;
		value=value.replace(/>\s+</g,'><');
		try {
			/*__JS__ */rst=(new window.Parser.DOMParser()).parseFromString(value,'text/xml');
			}catch (error){
			throw "需要引入xml解析库文件";
		}
		return rst;
	}

	MiniAdpter.idx=1;
	__static(MiniAdpter,
	['nativefiles',function(){return this.nativefiles=["layaNativeDir","wxlocal"];}
	]);
	return MiniAdpter;
})()


/**@private **/
//class laya.wx.mini.MiniFileMgr
var MiniFileMgr=(function(){
	function MiniFileMgr(){}
	__class(MiniFileMgr,'laya.wx.mini.MiniFileMgr');
	MiniFileMgr.isLocalNativeFile=function(url){
		for(var i=0,sz=MiniAdpter.nativefiles.length;i<sz;i++){
			if(url.indexOf(MiniAdpter.nativefiles[i])!=-1)
				return true;
		}
		return false;
	}

	MiniFileMgr.getFileInfo=function(fileUrl){
		var fileNativePath=fileUrl;
		var fileObj=MiniFileMgr.fakeObj[fileNativePath];
		if (fileObj==null)
			return null;
		else
		return fileObj;
		return null;
	}

	MiniFileMgr.read=function(filePath,encoding,callBack,readyUrl,isSaveFile,fileType){
		(encoding===void 0)&& (encoding="utf8");
		(readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
		(fileType===void 0)&& (fileType="");
		var fileUrl;
		if(readyUrl!="" && (readyUrl.indexOf("http://")!=-1 || readyUrl.indexOf("https://")!=-1)){
			fileUrl=MiniFileMgr.getFileNativePath(filePath)
			}else{
			fileUrl=filePath;
		}
		MiniFileMgr.fs.readFile({filePath:fileUrl,encoding:encoding,success:function (data){
				callBack !=null && callBack.runWith([0,data]);
				},fail:function (data){
				if (data && readyUrl !="")
					MiniFileMgr.downFiles(readyUrl,encoding,callBack,readyUrl,isSaveFile,fileType);
				else
				callBack !=null && callBack.runWith([1]);
		}});
	}

	MiniFileMgr.downFiles=function(fileUrl,encoding,callBack,readyUrl,isSaveFile,fileType,isAutoClear){
		(encoding===void 0)&& (encoding="ascii");
		(readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
		(fileType===void 0)&& (fileType="");
		(isAutoClear===void 0)&& (isAutoClear=true);
		var downloadTask=MiniFileMgr.wxdown({url:fileUrl,success:function (data){
				if (data.statusCode===200)
					MiniFileMgr.readFile(data.tempFilePath,encoding,callBack,readyUrl,isSaveFile,fileType,isAutoClear);
				else
				if(data.statusCode===403){
					callBack !=null && callBack.runWith([0,fileUrl]);
					}else{
					callBack !=null && callBack.runWith([1,data]);
				}
				},fail:function (data){
				callBack !=null && callBack.runWith([1,data]);
		}});
		downloadTask.onProgressUpdate(function(data){
			callBack !=null && callBack.runWith([2,data.progress]);
		});
	}

	MiniFileMgr.readFile=function(filePath,encoding,callBack,readyUrl,isSaveFile,fileType,isAutoClear){
		(encoding===void 0)&& (encoding="utf8");
		(readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
		(fileType===void 0)&& (fileType="");
		(isAutoClear===void 0)&& (isAutoClear=true);
		MiniFileMgr.fs.readFile({filePath:filePath,encoding:encoding,success:function (data){
				if (filePath.indexOf("http://")!=-1 || filePath.indexOf("https://")!=-1){
					if(MiniAdpter.autoCacheFile || isSaveFile){
						callBack !=null && callBack.runWith([0,data]);
						MiniFileMgr.copyFile(filePath,readyUrl,null,encoding,isAutoClear);
					}
					else
					callBack !=null && callBack.runWith([0,data]);
				}
				else
				callBack !=null && callBack.runWith([0,data]);
				},fail:function (data){
				if (data)
					callBack !=null && callBack.runWith([1,data]);
		}});
	}

	MiniFileMgr.downOtherFiles=function(fileUrl,callBack,readyUrl,isSaveFile,isAutoClear){
		(readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
		(isAutoClear===void 0)&& (isAutoClear=true);
		MiniFileMgr.wxdown({url:fileUrl,success:function (data){
				if (data.statusCode===200){
					if((MiniAdpter.autoCacheFile || isSaveFile)&& readyUrl.indexOf("wx.qlogo.cn")==-1 && readyUrl.indexOf(".php")==-1){
						callBack !=null && callBack.runWith([0,data.tempFilePath]);
						MiniFileMgr.copyFile(data.tempFilePath,readyUrl,null,"",isAutoClear);
					}
					else
					callBack !=null && callBack.runWith([0,data.tempFilePath]);
					}else{
					callBack !=null && callBack.runWith([1,data]);
				}
				},fail:function (data){
				callBack !=null && callBack.runWith([1,data]);
		}});
	}

	MiniFileMgr.downLoadFile=function(fileUrl,fileType,callBack,encoding){
		(fileType===void 0)&& (fileType="");
		(encoding===void 0)&& (encoding="ascii");
		if(MiniAdpter.window.navigator.userAgent.indexOf('MiniGame')<0){
			Laya.loader.load(fileUrl,callBack);
			}else{
			if(fileType==/*laya.net.Loader.IMAGE*/"image" || fileType==/*laya.net.Loader.SOUND*/"sound")
				MiniFileMgr.downOtherFiles(fileUrl,callBack,fileUrl,true,false);
			else
			MiniFileMgr.downFiles(fileUrl,encoding,callBack,fileUrl,true,fileType,false);
		}
	}

	MiniFileMgr.copyFile=function(tempFilePath,readyUrl,callBack,encoding,isAutoClear){
		(encoding===void 0)&& (encoding="");
		(isAutoClear===void 0)&& (isAutoClear=true);
		var temp=tempFilePath.split("/");
		var tempFileName=temp[temp.length-1];
		var fileurlkey=readyUrl;
		var fileObj=MiniFileMgr.getFileInfo(readyUrl);
		var saveFilePath=MiniFileMgr.getFileNativePath(tempFileName);
		MiniFileMgr.fakeObj[readyUrl]={md5:tempFileName,readyUrl:readyUrl,size:0,times:Browser.now(),encoding:encoding};
		var totalSize=50 *1024 *1024;
		var chaSize=4 *1024 *1024;
		var fileUseSize=MiniFileMgr.getCacheUseSize();
		if (fileObj){
			if (fileObj.readyUrl !=readyUrl){
				MiniFileMgr.fs.getFileInfo({
					filePath:tempFilePath,
					success:function (data){
						if((isAutoClear && (fileUseSize+chaSize+data.size)>=totalSize)){
							if(data.size > MiniAdpter.minClearSize)
								MiniAdpter.minClearSize=data.size;
							MiniFileMgr.onClearCacheRes();
						}
						MiniFileMgr.deleteFile(tempFilePath,readyUrl,callBack,encoding,data.size);
					},
					fail:function (data){
						callBack !=null && callBack.runWith([1,data]);
					}
				});
			}
			else
			callBack !=null && callBack.runWith([0]);
			}else{
			MiniFileMgr.fs.getFileInfo({
				filePath:tempFilePath,
				success:function (data){
					if((isAutoClear && (fileUseSize+chaSize+data.size)>=totalSize)){
						if(data.size > MiniAdpter.minClearSize)
							MiniAdpter.minClearSize=data.size;
						MiniFileMgr.onClearCacheRes();
					}
					MiniFileMgr.fs.copyFile({srcPath:tempFilePath,destPath:saveFilePath,success:function (data2){
							MiniFileMgr.onSaveFile(readyUrl,tempFileName,true,encoding,callBack,data.size);
							},fail:function (data){
							callBack !=null && callBack.runWith([1,data]);
					}});
				},
				fail:function (data){
					callBack !=null && callBack.runWith([1,data]);
				}
			});
		}
	}

	MiniFileMgr.onClearCacheRes=function(){
		var memSize=MiniAdpter.minClearSize;
		var tempFileListArr=[];
		for(var key in MiniFileMgr.filesListObj){
			if(key!="fileUsedSize")
				tempFileListArr.push(MiniFileMgr.filesListObj[key]);
		}
		MiniFileMgr.sortOn(tempFileListArr,"times",16);
		var clearSize=0;
		for(var i=1,sz=tempFileListArr.length;i<sz;i++){
			var fileObj=tempFileListArr[i];
			if(clearSize >=memSize)
				break ;
			clearSize+=fileObj.size;
			MiniFileMgr.deleteFile("",fileObj.readyUrl);
		}
	}

	MiniFileMgr.sortOn=function(array,name,options){
		(options===void 0)&& (options=0);
		if (options==16)return array.sort(function(a,b){return a[name]-b[name];});
		if (options==(16 | 2))return array.sort(function(a,b){return b[name]-a[name];});
		return array.sort(function(a,b){return a[name]-b[name] });
	}

	MiniFileMgr.getFileNativePath=function(fileName){
		return laya.wx.mini.MiniFileMgr.fileNativeDir+"/"+fileName;
	}

	MiniFileMgr.deleteFile=function(tempFileName,readyUrl,callBack,encoding,fileSize){
		(readyUrl===void 0)&& (readyUrl="");
		(encoding===void 0)&& (encoding="");
		(fileSize===void 0)&& (fileSize=0);
		var fileObj=MiniFileMgr.getFileInfo(readyUrl);
		var deleteFileUrl=MiniFileMgr.getFileNativePath(fileObj.md5);
		MiniFileMgr.fs.unlink({filePath:deleteFileUrl,success:function (data){
				var isAdd=tempFileName !="" ? true :false;
				if(tempFileName !=""){
					var saveFilePath=MiniFileMgr.getFileNativePath(tempFileName);
					MiniFileMgr.fs.copyFile({srcPath:tempFileName,destPath:saveFilePath,success:function (data){
							MiniFileMgr.onSaveFile(readyUrl,tempFileName,isAdd,encoding,callBack,data.size);
							},fail:function (data){
							callBack !=null && callBack.runWith([1,data]);
					}});
					}else{
					MiniFileMgr.onSaveFile(readyUrl,tempFileName,isAdd,encoding,callBack,fileSize);
				}
				},fail:function (data){
		}});
	}

	MiniFileMgr.deleteAll=function(){
		var tempFileListArr=[];
		for(var key in MiniFileMgr.filesListObj){
			tempFileListArr.push(MiniFileMgr.filesListObj[key]);
		}
		for(var i=1,sz=tempFileListArr.length;i<sz;i++){
			var fileObj=tempFileListArr[i];
			MiniFileMgr.deleteFile("",fileObj.readyUrl);
		}
		if(laya.wx.mini.MiniFileMgr.filesListObj && laya.wx.mini.MiniFileMgr.filesListObj.fileUsedSize){
			laya.wx.mini.MiniFileMgr.filesListObj.fileUsedSize=0;
		}
		laya.wx.mini.MiniFileMgr.writeFilesList("",JSON.stringify({}),false);
	}

	MiniFileMgr.onSaveFile=function(readyUrl,md5Name,isAdd,encoding,callBack,fileSize){
		(isAdd===void 0)&& (isAdd=true);
		(encoding===void 0)&& (encoding="");
		(fileSize===void 0)&& (fileSize=0);
		var fileurlkey=readyUrl;
		if(MiniFileMgr.filesListObj['fileUsedSize']==null)
			MiniFileMgr.filesListObj['fileUsedSize']=0;
		if(isAdd){
			var fileNativeName=MiniFileMgr.getFileNativePath(md5Name);
			MiniFileMgr.filesListObj[fileurlkey]={md5:md5Name,readyUrl:readyUrl,size:fileSize,times:Browser.now(),encoding:encoding};
			MiniFileMgr.filesListObj['fileUsedSize']=parseInt(MiniFileMgr.filesListObj['fileUsedSize'])+fileSize;
			MiniFileMgr.writeFilesList(fileurlkey,JSON.stringify(MiniFileMgr.filesListObj),true);
			callBack !=null && callBack.runWith([0]);
			}else{
			if(MiniFileMgr.filesListObj[fileurlkey]){
				var deletefileSize=parseInt(MiniFileMgr.filesListObj[fileurlkey].size);
				MiniFileMgr.filesListObj['fileUsedSize']=parseInt(MiniFileMgr.filesListObj['fileUsedSize'])-deletefileSize;
				if (MiniFileMgr.fakeObj[fileurlkey].md5==MiniFileMgr.filesListObj[fileurlkey].md5){
					delete MiniFileMgr.fakeObj[fileurlkey];
				}
				delete MiniFileMgr.filesListObj[fileurlkey];
				MiniFileMgr.writeFilesList(fileurlkey,JSON.stringify(MiniFileMgr.filesListObj),false);
				callBack !=null && callBack.runWith([0]);
			}
		}
	}

	MiniFileMgr.writeFilesList=function(fileurlkey,filesListStr,isAdd){
		var listFilesPath=MiniFileMgr.fileNativeDir+"/"+MiniFileMgr.fileListName;
		MiniFileMgr.fs.writeFile({filePath:listFilesPath,encoding:'utf8',data:filesListStr,success:function (data){
				},fail:function (data){
		}});
		if(!MiniAdpter.isZiYu &&MiniAdpter.isPosMsgYu && MiniAdpter.window.wx.postMessage){
			MiniAdpter.window.wx.postMessage({url:fileurlkey,data:MiniFileMgr.filesListObj[fileurlkey],isLoad:"filenative",isAdd:isAdd});
		}
	}

	MiniFileMgr.getCacheUseSize=function(){
		if(MiniFileMgr.filesListObj && MiniFileMgr.filesListObj['fileUsedSize'])
			return MiniFileMgr.filesListObj['fileUsedSize'];
		return 0;
	}

	MiniFileMgr.existDir=function(dirPath,callBack){
		MiniFileMgr.fs.mkdir({dirPath:dirPath,success:function (data){
				callBack !=null && callBack.runWith([0,{data:JSON.stringify({})}]);
				},fail:function (data){
				if (data.errMsg.indexOf("file already exists")!=-1)
					MiniFileMgr.readSync(MiniFileMgr.fileListName,"utf8",callBack);
				else
				callBack !=null && callBack.runWith([1,data]);
		}});
	}

	MiniFileMgr.readSync=function(filePath,encoding,callBack,readyUrl){
		(encoding===void 0)&& (encoding="utf8");
		(readyUrl===void 0)&& (readyUrl="");
		var fileUrl=MiniFileMgr.getFileNativePath(filePath);
		var filesListStr
		try{
			filesListStr=MiniFileMgr.fs.readFileSync(fileUrl,encoding);
			callBack !=null && callBack.runWith([0,{data:filesListStr}]);
		}
		catch(error){
			callBack !=null && callBack.runWith([1]);
		}
	}

	MiniFileMgr.setNativeFileDir=function(value){
		MiniFileMgr.fileNativeDir=MiniAdpter.window.wx.env.USER_DATA_PATH+value;
	}

	MiniFileMgr.filesListObj={};
	MiniFileMgr.fakeObj={};
	MiniFileMgr.fileNativeDir=null;
	MiniFileMgr.fileListName="layaairfiles.txt";
	MiniFileMgr.ziyuFileData={};
	MiniFileMgr.ziyuFileTextureData={};
	MiniFileMgr.loadPath="";
	MiniFileMgr.DESCENDING=2;
	MiniFileMgr.NUMERIC=16;
	__static(MiniFileMgr,
	['fs',function(){return this.fs=MiniAdpter.window.wx.getFileSystemManager();},'wxdown',function(){return this.wxdown=MiniAdpter.window.wx.downloadFile;}
	]);
	return MiniFileMgr;
})()


/**@private **/
//class laya.wx.mini.MiniImage
var MiniImage=(function(){
	function MiniImage(){}
	__class(MiniImage,'laya.wx.mini.MiniImage');
	var __proto=MiniImage.prototype;
	/**@private **/
	__proto._loadImage=function(url){
		var thisLoader=this;
		if (MiniAdpter.isZiYu){
			MiniImage.onCreateImage(url,thisLoader,true);
			return;
		};
		var isTransformUrl=false;
		if (!MiniFileMgr.isLocalNativeFile(url)){
			isTransformUrl=true;
			url=URL.formatURL(url);
			}else{
			if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1){
				if(MiniFileMgr.loadPath !=""){
					url=url.split(MiniFileMgr.loadPath)[1];
					}else{
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=url;
					if(tempStr !="")
						url=url.split(tempStr)[1];
					if(!url){
						url=tempUrl;
					}
				}
			}
			if (MiniAdpter.subNativeFiles && MiniAdpter.subNativeheads.length==0){
				for (var key in MiniAdpter.subNativeFiles){
					var tempArr=MiniAdpter.subNativeFiles[key];
					MiniAdpter.subNativeheads=MiniAdpter.subNativeheads.concat(tempArr);
					for (var aa=0;aa < tempArr.length;aa++){
						MiniAdpter.subMaps[tempArr[aa]]=key+"/"+tempArr[aa];
					}
				}
			}
			if(MiniAdpter.subNativeFiles && url.indexOf("/")!=-1){
				var curfileHead=url.split("/")[0]+"/";
				if(curfileHead && MiniAdpter.subNativeheads.indexOf(curfileHead)!=-1){
					var newfileHead=MiniAdpter.subMaps[curfileHead];
					url=url.replace(curfileHead,newfileHead);
				}
			}
		}
		if (!MiniFileMgr.getFileInfo(url)){
			if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1){
				if(MiniAdpter.isZiYu){
					MiniImage.onCreateImage(url,thisLoader,true);
					}else{
					MiniFileMgr.downOtherFiles(url,new Handler(MiniImage,MiniImage.onDownImgCallBack,[url,thisLoader]),url);
				}
			}
			else
			MiniImage.onCreateImage(url,thisLoader,true);
			}else {
			MiniImage.onCreateImage(url,thisLoader,!isTransformUrl);
		}
	}

	MiniImage.onDownImgCallBack=function(sourceUrl,thisLoader,errorCode,tempFilePath){
		(tempFilePath===void 0)&& (tempFilePath="");
		if (!errorCode)
			MiniImage.onCreateImage(sourceUrl,thisLoader,false,tempFilePath);
		else {
			thisLoader.onError(null);
		}
	}

	MiniImage.onCreateImage=function(sourceUrl,thisLoader,isLocal,tempFilePath){
		(isLocal===void 0)&& (isLocal=false);
		(tempFilePath===void 0)&& (tempFilePath="");
		var fileNativeUrl;
		if(MiniAdpter.autoCacheFile){
			if (!isLocal){
				if(tempFilePath !=""){
					fileNativeUrl=tempFilePath;
					}else{
					var fileObj=MiniFileMgr.getFileInfo(sourceUrl);
					var fileMd5Name=fileObj.md5;
					fileNativeUrl=MiniFileMgr.getFileNativePath(fileMd5Name);
				}
			}else
			if(MiniAdpter.isZiYu){
				var tempUrl=URL.formatURL(sourceUrl);
				if(MiniFileMgr.ziyuFileTextureData[tempUrl]){
					fileNativeUrl=MiniFileMgr.ziyuFileTextureData[tempUrl];
				}else
				fileNativeUrl=sourceUrl;
			}else
			fileNativeUrl=sourceUrl;
			}else{
			if(!isLocal)
				fileNativeUrl=tempFilePath;
			else
			fileNativeUrl=sourceUrl;
		}
		if (thisLoader.imgCache==null)
			thisLoader.imgCache={};
		var image;
		function clear (){
			image.onload=null;
			image.onerror=null;
			delete thisLoader.imgCache[sourceUrl]
		};
		var onload=function (){
			clear();
			thisLoader.onLoaded(image);
		};
		var onerror=function (){
			clear();
			delete MiniFileMgr.filesListObj[sourceUrl];
			delete MiniFileMgr.fakeObj[sourceUrl];
			thisLoader.event(/*laya.events.Event.ERROR*/"error","Load image failed");
		}
		if (thisLoader._type=="nativeimage"){
			image=new Browser.window.Image();
			image.crossOrigin="";
			image.onload=onload;
			image.onerror=onerror;
			image.src=fileNativeUrl;
			thisLoader.imgCache[sourceUrl]=image;
			}else {
			new HTMLImage.create(fileNativeUrl,{onload:onload,onerror:onerror,onCreate:function (img){
					image=img;
					thisLoader.imgCache[sourceUrl]=img;
			}});
		}
	}

	return MiniImage;
})()


/**@private **/
//class laya.wx.mini.MiniInput
var MiniInput=(function(){
	function MiniInput(){}
	__class(MiniInput,'laya.wx.mini.MiniInput');
	MiniInput._createInputElement=function(){
		Input['_initInput'](Input['area']=Browser.createElement("textarea"));
		Input['_initInput'](Input['input']=Browser.createElement("input"));
		Input['inputContainer']=Browser.createElement("div");
		Input['inputContainer'].style.position="absolute";
		Input['inputContainer'].style.zIndex=1E5;
		Browser.container.appendChild(Input['inputContainer']);
		Input['inputContainer'].setPos=function (x,y){Input['inputContainer'].style.left=x+'px';Input['inputContainer'].style.top=y+'px';};
		Laya.stage.on("resize",null,MiniInput._onStageResize);
		/*__JS__ */wx.onWindowResize && /*__JS__ */wx.onWindowResize(function(res){
			/*__JS__ */window.dispatchEvent && /*__JS__ */window.dispatchEvent("resize");
		});
		SoundManager._soundClass=MiniSound;
		SoundManager._musicClass=MiniSound;
		var model=MiniAdpter.systemInfo.model;
		var system=MiniAdpter.systemInfo.system;
		if(model.indexOf("iPhone")!=-1){
			Browser.onIPhone=true;
			Browser.onIOS=true;
			Browser.onIPad=true;
			Browser.onAndroid=false;
		}
		if(system.indexOf("Android")!=-1 || system.indexOf("Adr")!=-1){
			Browser.onAndroid=true;
			Browser.onIPhone=false;
			Browser.onIOS=false;
			Browser.onIPad=false;
		}
	}

	MiniInput._onStageResize=function(){
		var ts=Laya.stage._canvasTransform.identity();
		ts.scale((Browser.width / Render.canvas.width / RunDriver.getPixelRatio()),Browser.height / Render.canvas.height / RunDriver.getPixelRatio());
	}

	MiniInput.wxinputFocus=function(e){
		var _inputTarget=Input['inputElement'].target;
		if (_inputTarget && !_inputTarget.editable){
			return;
		}
		MiniAdpter.window.wx.offKeyboardConfirm();
		MiniAdpter.window.wx.offKeyboardInput();
		MiniAdpter.window.wx.showKeyboard({defaultValue:_inputTarget.text,maxLength:_inputTarget.maxChars,multiple:_inputTarget.multiline,confirmHold:true,confirmType:'done',success:function (res){
				},fail:function (res){
		}});
		MiniAdpter.window.wx.onKeyboardConfirm(function(res){
			var str=res ? res.value :"";
			_inputTarget.text=str;
			_inputTarget.event(/*laya.events.Event.INPUT*/"input");
			laya.wx.mini.MiniInput.inputEnter();
		})
		MiniAdpter.window.wx.onKeyboardInput(function(res){
			var str=res ? res.value :"";
			if (!_inputTarget.multiline){
				if (str.indexOf("\n")!=-1){
					laya.wx.mini.MiniInput.inputEnter();
					return;
				}
			}
			_inputTarget.text=str;
			_inputTarget.event(/*laya.events.Event.INPUT*/"input");
		});
	}

	MiniInput.inputEnter=function(){
		Input['inputElement'].target.focus=false;
	}

	MiniInput.wxinputblur=function(){
		MiniInput.hideKeyboard();
	}

	MiniInput.hideKeyboard=function(){
		MiniAdpter.window.wx.offKeyboardConfirm();
		MiniAdpter.window.wx.offKeyboardInput();
		MiniAdpter.window.wx.hideKeyboard({success:function (res){
				console.log('隐藏键盘')
				},fail:function (res){
				console.log("隐藏键盘出错:"+(res ? res.errMsg :""));
		}});
	}

	return MiniInput;
})()


/**@private **/
//class laya.wx.mini.MiniLocalStorage
var MiniLocalStorage=(function(){
	function MiniLocalStorage(){}
	__class(MiniLocalStorage,'laya.wx.mini.MiniLocalStorage');
	MiniLocalStorage.__init__=function(){
		MiniLocalStorage.items=MiniLocalStorage;
	}

	MiniLocalStorage.setItem=function(key,value){
		try{
			/*__JS__ */wx.setStorageSync(key,value);
		}
		catch(error){
			/*__JS__ */wx.setStorage({
				key:key,
				data:value
			});
		}
	}

	MiniLocalStorage.getItem=function(key){
		return /*__JS__ */wx.getStorageSync(key);
	}

	MiniLocalStorage.setJSON=function(key,value){
		MiniLocalStorage.setItem(key,value);
	}

	MiniLocalStorage.getJSON=function(key){
		return MiniLocalStorage.getItem(key);
	}

	MiniLocalStorage.removeItem=function(key){
		/*__JS__ */wx.removeStorageSync(key);
	}

	MiniLocalStorage.clear=function(){
		/*__JS__ */wx.clearStorageSync();
	}

	MiniLocalStorage.getStorageInfoSync=function(){
		try {
			var res=/*__JS__ */wx.getStorageInfoSync()
			console.log(res.keys)
			console.log(res.currentSize)
			console.log(res.limitSize)
			return res;
		}catch (e){}
		return null;
	}

	MiniLocalStorage.support=true;
	MiniLocalStorage.items=null;
	return MiniLocalStorage;
})()


/**@private **/
//class laya.wx.mini.MiniLocation
var MiniLocation=(function(){
	function MiniLocation(){}
	__class(MiniLocation,'laya.wx.mini.MiniLocation');
	MiniLocation.__init__=function(){
		MiniAdpter.window.navigator.geolocation.getCurrentPosition=MiniLocation.getCurrentPosition;
		MiniAdpter.window.navigator.geolocation.watchPosition=MiniLocation.watchPosition;
		MiniAdpter.window.navigator.geolocation.clearWatch=MiniLocation.clearWatch;
	}

	MiniLocation.getCurrentPosition=function(success,error,options){
		var paramO;
		paramO={};
		paramO.success=getSuccess;
		paramO.fail=error;
		MiniAdpter.window.wx.getLocation(paramO);
		function getSuccess (res){
			if (success !=null){
				success(res);
			}
		}
	}

	MiniLocation.watchPosition=function(success,error,options){
		MiniLocation._curID++;
		var curWatchO;
		curWatchO={};
		curWatchO.success=success;
		curWatchO.error=error;
		MiniLocation._watchDic[MiniLocation._curID]=curWatchO;
		Laya.timer.loop(1000,null,MiniLocation._myLoop);
		return MiniLocation._curID;
	}

	MiniLocation.clearWatch=function(id){
		delete MiniLocation._watchDic[id];
		if (!MiniLocation._hasWatch()){
			Laya.timer.clear(null,MiniLocation._myLoop);
		}
	}

	MiniLocation._hasWatch=function(){
		var key;
		for (key in MiniLocation._watchDic){
			if (MiniLocation._watchDic[key])return true;
		}
		return false;
	}

	MiniLocation._myLoop=function(){
		MiniLocation.getCurrentPosition(MiniLocation._mySuccess,MiniLocation._myError);
	}

	MiniLocation._mySuccess=function(res){
		var rst={};
		rst.coords=res;
		rst.timestamp=Browser.now();
		var key;
		for (key in MiniLocation._watchDic){
			if (MiniLocation._watchDic[key].success){
				MiniLocation._watchDic[key].success(rst);
			}
		}
	}

	MiniLocation._myError=function(res){
		var key;
		for (key in MiniLocation._watchDic){
			if (MiniLocation._watchDic[key].error){
				MiniLocation._watchDic[key].error(res);
			}
		}
	}

	MiniLocation._watchDic={};
	MiniLocation._curID=0;
	return MiniLocation;
})()


/**
*视频类
*@author xiaosong
*@date-2019-04-22
*/
//class laya.wx.mini.MiniVideo
var MiniVideo=(function(){
	function MiniVideo(width,height){
		/**视频是否播放结束**/
		this.videoend=false;
		this.videourl="";
		this.videoElement=null;
		this.onPlayFunc=null;
		this.onEndedFunC=null;
		/**视频的总时⻓长，单位为秒**/
		this._duration=NaN;
		/**视频播放的当前位置**/
		this.position=NaN;
		(width===void 0)&& (width=320);
		(height===void 0)&& (height=240);
		this.videoElement=MiniAdpter.window.wx.createVideo({width:width,height:height,autoplay:true});
	}

	__class(MiniVideo,'laya.wx.mini.MiniVideo');
	var __proto=MiniVideo.prototype;
	__proto.on=function(eventType,ths,callBack){
		if(eventType=="loadedmetadata"){
			this.onPlayFunc=callBack.bind(ths);
			this.videoElement.onPlay=this.onPlayFunction.bind(this);
			}else if(eventType=="ended"){
			this.onEndedFunC=callBack.bind(ths);
			this.videoElement.onEnded=this.onEndedFunction.bind(this);
		}
		this.videoElement.onTimeUpdate=this.onTimeUpdateFunc.bind(this);
	}

	__proto.onTimeUpdateFunc=function(data){
		this.position=data.position;
		this._duration=data.duration;
	}

	__proto.onPlayFunction=function(){
		if(this.videoElement)
			this.videoElement.readyState=200;
		console.log("=====视频加载完成========");
		this.onPlayFunc !=null && this.onPlayFunc();
	}

	__proto.onEndedFunction=function(){
		if(!this.videoElement)
			return;
		this.videoend=true;
		console.log("=====视频播放完毕========");
		this.onEndedFunC !=null && this.onEndedFunC();
	}

	__proto.off=function(eventType,ths,callBack){
		if(eventType=="loadedmetadata"){
			this.onPlayFunc=callBack.bind(ths);
			this.videoElement.offPlay=this.onPlayFunction.bind(this);
			}else if(eventType=="ended"){
			this.onEndedFunC=callBack.bind(ths);
			this.videoElement.offEnded=this.onEndedFunction.bind(this);
		}
	}

	/**
	*设置播放源。
	*@param url 播放源路径。
	*/
	__proto.load=function(url){
		if(!this.videoElement)
			return;
		this.videoElement.src=url;
	}

	/**
	*开始播放视频。
	*/
	__proto.play=function(){
		if(!this.videoElement)
			return;
		this.videoend=false;
		this.videoElement.play();
	}

	/**
	*暂停视频播放。
	*/
	__proto.pause=function(){
		if(!this.videoElement)
			return;
		this.videoend=true;
		this.videoElement.pause();
	}

	/**
	*设置大小
	*@param width
	*@param height
	*/
	__proto.size=function(width,height){
		if(!this.videoElement)
			return;
		this.videoElement.width=width;
		this.videoElement.height=height;
	}

	__proto.destroy=function(){
		if(this.videoElement)
			this.videoElement.destroy();
		this.videoElement=null;
		this.onEndedFunC=null;
		this.onPlayFunc=null;
		this.videoend=false;
		this.videourl=null;
	}

	/**
	*重新加载视频。
	*/
	__proto.reload=function(){
		if(!this.videoElement)
			return;
		this.videoElement.src=this.videourl;
	}

	/**
	*获取视频长度（秒）。ready事件触发后可用。
	*/
	__getset(0,__proto,'duration',function(){
		return this._duration;
	});

	/**
	*返回视频是否暂停
	*/
	__getset(0,__proto,'paused',function(){
		if(!this.videoElement)
			return false;
		return this.videoElement.paused;
	});

	/**
	*设置或返回音频/视频是否应在结束时重新播放。
	*/
	__getset(0,__proto,'loop',function(){
		if(!this.videoElement)
			return false;
		return this.videoElement.loop;
		},function(value){
		if(!this.videoElement)
			return;
		this.videoElement.loop=value;
	});

	/**
	*设置和获取当前播放头位置。
	*/
	__getset(0,__proto,'currentTime',function(){
		if(!this.videoElement)
			return 0;
		return this.videoElement.initialTime;
		},function(value){
		if(!this.videoElement)
			return;
		this.videoElement.initialTime=value;
	});

	/**
	*返回音频/视频的播放是否已结束
	*/
	__getset(0,__proto,'ended',function(){
		return this.videoend;
	});

	/**
	*获取和设置静音状态。
	*/
	__getset(0,__proto,'muted',function(){
		if(!this.videoElement)
			return false;
		return this.videoElement.muted;
		},function(value){
		if(!this.videoElement)
			return;
		this.videoElement.muted=value;
	});

	/**
	*获取视频源尺寸。ready事件触发后可用。
	*/
	__getset(0,__proto,'videoWidth',function(){
		if(!this.videoElement)
			return 0;
		return this.videoElement.width;
	});

	__getset(0,__proto,'videoHeight',function(){
		if(!this.videoElement)
			return 0;
		return this.videoElement.height;
	});

	/**
	*playbackRate 属性设置或返回音频/视频的当前播放速度。如：
	*<ul>
	*<li>1.0 正常速度</li>
	*<li>0.5 半速（更慢）</li>
	*<li>2.0 倍速（更快）</li>
	*<li>-1.0 向后，正常速度</li>
	*<li>-0.5 向后，半速</li>
	*</ul>
	*<p>只有 Google Chrome 和 Safari 支持 playbackRate 属性。</p>
	*/
	__getset(0,__proto,'playbackRate',function(){
		if(!this.videoElement)
			return 0;
		return this.videoElement.playbackRate;
		},function(value){
		if(!this.videoElement)
			return;
		this.videoElement.playbackRate=value;
	});

	__getset(0,__proto,'x',function(){
		if(!this.videoElement)
			return 0;
		return this.videoElement.x;
		},function(value){
		if(!this.videoElement)
			return;
		this.videoElement.x=value;
	});

	__getset(0,__proto,'y',function(){
		if(!this.videoElement)
			return 0;
		return this.videoElement.y;
		},function(value){
		if(!this.videoElement)
			return;
		this.videoElement.y=value;
	});

	/**
	*获取当前播放源路径。
	*/
	__getset(0,__proto,'currentSrc',function(){
		return this.videoElement.src;
	});

	MiniVideo.__init__=function(){
		/*__JS__ */laya.device.media.Video=MiniVideo;
	}

	return MiniVideo;
})()


/**@private **/
//class laya.wx.mini.MiniAccelerator extends laya.events.EventDispatcher
var MiniAccelerator=(function(_super){
	function MiniAccelerator(){
		MiniAccelerator.__super.call(this);
	}

	__class(MiniAccelerator,'laya.wx.mini.MiniAccelerator',_super);
	var __proto=MiniAccelerator.prototype;
	/**
	*侦听加速器运动。
	*@param observer 回调函数接受4个参数，见类说明。
	*/
	__proto.on=function(type,caller,listener,args){
		_super.prototype.on.call(this,type,caller,listener,args);
		MiniAccelerator.startListen(this["onDeviceOrientationChange"]);
		return this;
	}

	/**
	*取消侦听加速器。
	*@param handle 侦听加速器所用处理器。
	*/
	__proto.off=function(type,caller,listener,onceOnly){
		(onceOnly===void 0)&& (onceOnly=false);
		if (!this.hasListener(type))
			MiniAccelerator.stopListen();
		return _super.prototype.off.call(this,type,caller,listener,onceOnly);
	}

	MiniAccelerator.__init__=function(){
		try{
			var Acc;
			Acc=/*__JS__ */laya.device.motion.Accelerator;
			if (!Acc)return;
			Acc["prototype"]["on"]=MiniAccelerator["prototype"]["on"];
			Acc["prototype"]["off"]=MiniAccelerator["prototype"]["off"];
			}catch (e){
		}
	}

	MiniAccelerator.startListen=function(callBack){
		MiniAccelerator._callBack=callBack;
		if (MiniAccelerator._isListening)return;
		MiniAccelerator._isListening=true;
		try{
			MiniAdpter.window.wx.onAccelerometerChange(laya.wx.mini.MiniAccelerator.onAccelerometerChange);
		}catch(e){}
	}

	MiniAccelerator.stopListen=function(){
		MiniAccelerator._isListening=false;
		try{
			MiniAdpter.window.wx.stopAccelerometer({});
		}catch(e){}
	}

	MiniAccelerator.onAccelerometerChange=function(res){
		var e;
		e={};
		e.acceleration=res;
		e.accelerationIncludingGravity=res;
		e.rotationRate={};
		if (MiniAccelerator._callBack !=null){
			MiniAccelerator._callBack(e);
		}
	}

	MiniAccelerator._isListening=false;
	MiniAccelerator._callBack=null;
	return MiniAccelerator;
})(EventDispatcher)


/**@private **/
//class laya.wx.mini.MiniLoader extends laya.events.EventDispatcher
var MiniLoader=(function(_super){
	function MiniLoader(){
		MiniLoader.__super.call(this);
	}

	__class(MiniLoader,'laya.wx.mini.MiniLoader',_super);
	var __proto=MiniLoader.prototype;
	/**
	*@private
	*@param url
	*@param type
	*@param cache
	*@param group
	*@param ignoreCache
	*/
	__proto.load=function(url,type,cache,group,ignoreCache){
		(cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
		var thisLoader=this;
		thisLoader._url=url;
		if (url.indexOf("data:image")===0)thisLoader._type=type=/*laya.net.Loader.IMAGE*/"image";
		else {
			thisLoader._type=type || (type=thisLoader.getTypeFromUrl(url));
		}
		thisLoader._cache=cache;
		thisLoader._data=null;
		if (!ignoreCache && Loader.loadedMap[URL.formatURL(url)]){
			thisLoader._data=Loader.loadedMap[URL.formatURL(url)];
			this.event(/*laya.events.Event.PROGRESS*/"progress",1);
			this.event(/*laya.events.Event.COMPLETE*/"complete",thisLoader._data);
			return;
		}
		if (Loader.parserMap[type] !=null){
			thisLoader._customParse=true;
			if (((Loader.parserMap[type])instanceof laya.utils.Handler ))Loader.parserMap[type].runWith(this);
			else Loader.parserMap[type].call(null,this);
			return;
		};
		var encoding=MiniAdpter.getUrlEncode(url,type);
		var urlType=Utils.getFileExtension(url);
		if ((MiniLoader._fileTypeArr.indexOf(urlType)!=-1)|| type==/*laya.net.Loader.IMAGE*/"image"){
			MiniAdpter.EnvConfig.load.call(this,url,type,cache,group,ignoreCache);
			}else {
			if(MiniAdpter.isZiYu && !MiniFileMgr.ziyuFileData[url]){
				url=URL.formatURL(url);
			}
			if(MiniAdpter.isZiYu && MiniFileMgr.ziyuFileData[url]){
				var tempData=MiniFileMgr.ziyuFileData[url];
				thisLoader.onLoaded(tempData);
				return;
			}
			if (!MiniFileMgr.getFileInfo(URL.formatURL(url))){
				if (MiniFileMgr.isLocalNativeFile(url)){
					if (MiniAdpter.subNativeFiles && MiniAdpter.subNativeheads.length==0){
						for (var key in MiniAdpter.subNativeFiles){
							var tempArr=MiniAdpter.subNativeFiles[key];
							MiniAdpter.subNativeheads=MiniAdpter.subNativeheads.concat(tempArr);
							for (var aa=0;aa < tempArr.length;aa++){
								MiniAdpter.subMaps[tempArr[aa]]=key+"/"+tempArr[aa];
							}
						}
					}
					if(MiniAdpter.subNativeFiles && url.indexOf("/")!=-1){
						var curfileHead=url.split("/")[0]+"/";
						if(curfileHead && MiniAdpter.subNativeheads.indexOf(curfileHead)!=-1){
							var newfileHead=MiniAdpter.subMaps[curfileHead];
							url=url.replace(curfileHead,newfileHead);
						}
					}
					if(type==/*laya.net.Loader.SOUND*/"sound"){
						thisLoader._loadSound(url);
						}else{
						MiniFileMgr.read(url,encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]));
					}
					return;
				};
				var tempUrl=url;
				var tempurl=URL.formatURL(url);
				if (tempurl.indexOf(MiniAdpter.window.wx.env.USER_DATA_PATH)==-1 &&(url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1)&& !MiniAdpter.AutoCacheDownFile){
					if(type==/*laya.net.Loader.SOUND*/"sound"){
						thisLoader._loadSound(url);
						}else{
						MiniAdpter.EnvConfig.load.call(thisLoader,tempUrl,type,cache,group,ignoreCache);
					}
					}else {
					fileObj=MiniFileMgr.getFileInfo(url);
					if(fileObj){
						fileObj.encoding=fileObj.encoding==null ? "utf8" :fileObj.encoding;
						MiniFileMgr.readFile(fileObj.url,encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url);
						}else if (thisLoader.type=="image" || thisLoader.type=="htmlimage"){
						MiniAdpter.EnvConfig.load.call(thisLoader,url,type,cache,group,ignoreCache);
					}
					else{
						url=URL.formatURL(url);
						if(type !=/*laya.net.Loader.IMAGE*/"image" && ((url.indexOf("http://")==-1 && url.indexOf("https://")==-1)|| MiniFileMgr.isLocalNativeFile(url))){
							MiniFileMgr.readFile(url,encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url);
							}else{
							MiniFileMgr.downFiles(url,encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url,true);
						}
					}
				}
				}else {
				var fileObj=MiniFileMgr.getFileInfo(URL.formatURL(url));
				fileObj.encoding=fileObj.encoding==null ? "utf8" :fileObj.encoding;
				var nativepath=MiniFileMgr.getFileNativePath(fileObj.md5);
				MiniFileMgr.readFile(nativepath,fileObj.encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),URL.formatURL(url));
			}
		}
	}

	/**
	*private
	*@param url
	**/
	__proto._loadSound=function(url){
		var thisLoader=this;
		var fileNativeUrl;
		if (MiniFileMgr.isLocalNativeFile(url)){
			var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
			var tempUrl=url;
			if(tempStr !="" && (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1))
				fileNativeUrl=url.split(tempStr)[1];
			if(!fileNativeUrl){
				fileNativeUrl=tempUrl;
			}
			laya.wx.mini.MiniLoader.onDownLoadCallBack(url,thisLoader,0);
			}else{
			var tempurl=URL.formatURL(url);
			if (!MiniFileMgr.isLocalNativeFile(url)&& (tempurl.indexOf("http://")==-1 && tempurl.indexOf("https://")==-1)|| (tempurl.indexOf(MiniAdpter.window.wx.env.USER_DATA_PATH)!=-1)){
				laya.wx.mini.MiniLoader.onDownLoadCallBack(url,thisLoader,0);
				}else{
				MiniFileMgr.downOtherFiles(encodeURI(tempurl),Handler.create(MiniLoader,laya.wx.mini.MiniLoader.onDownLoadCallBack,[tempurl,thisLoader]),tempurl);
			}
		}
	}

	MiniLoader.onDownLoadCallBack=function(sourceUrl,thisLoader,errorCode,tempFilePath){
		if (!errorCode){
			var fileNativeUrl;
			if(MiniAdpter.autoCacheFile){
				if(!tempFilePath){
					if (MiniFileMgr.isLocalNativeFile(sourceUrl)){
						var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
						var tempUrl=sourceUrl;
						if(tempStr !="" && (sourceUrl.indexOf("http://")!=-1 || sourceUrl.indexOf("https://")!=-1))
							fileNativeUrl=sourceUrl.split(tempStr)[1];
						if(!fileNativeUrl){
							fileNativeUrl=tempUrl;
						}
						}else{
						var fileObj=MiniFileMgr.getFileInfo(sourceUrl);
						if(fileObj && fileObj.md5){
							var fileMd5Name=fileObj.md5;
							fileNativeUrl=MiniFileMgr.getFileNativePath(fileMd5Name);
							}else{
							fileNativeUrl=sourceUrl;
						}
					}
					}else{
					fileNativeUrl=tempFilePath;
				}
			}
			sourceUrl=fileNativeUrl;
			var sound=new SoundManager._soundClass();
			sound.load(encodeURI(sourceUrl));
			thisLoader.onLoaded(sound);
			}else{
			thisLoader.event(/*laya.events.Event.ERROR*/"error","Load sound failed");
		}
	}

	MiniLoader.onReadNativeCallBack=function(encoding,url,type,cache,group,ignoreCache,thisLoader,errorCode,data){
		(cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
		(errorCode===void 0)&& (errorCode=0);
		if (!errorCode){
			var tempData;
			if (type==/*laya.net.Loader.JSON*/"json" || type==/*laya.net.Loader.ATLAS*/"atlas"){
				tempData=MiniAdpter.getJson(data.data);
				}else if (type==/*laya.net.Loader.XML*/"xml"){
				tempData=Utils.parseXMLFromString(data.data);
				}else {
				tempData=data.data;
			}
			if(!MiniAdpter.isZiYu &&MiniAdpter.isPosMsgYu && type !=/*laya.net.Loader.BUFFER*/"arraybuffer" && MiniAdpter.window.wx){
				MiniAdpter.window.wx.postMessage({url:url,data:tempData,isLoad:"filedata"});
			}
			thisLoader.onLoaded(tempData);
			}else if (errorCode==1){
			console.log("-----------本地加载失败，尝试外网加载----url:"+url);
			MiniAdpter.EnvConfig.load.call(thisLoader,url,type,cache,group,ignoreCache);
		}
	}

	__static(MiniLoader,
	['_fileTypeArr',function(){return this._fileTypeArr=['png','jpg','bmp','jpeg','gif'];}
	]);
	return MiniLoader;
})(EventDispatcher)


/**@private **/
//class laya.wx.mini.MiniSound extends laya.events.EventDispatcher
var MiniSound=(function(_super){
	function MiniSound(){
		/**@private **/
		this._sound=null;
		/**
		*@private
		*声音URL
		*/
		this.url=null;
		/**
		*@private
		*是否已加载完成
		*/
		this.loaded=false;
		/**@private **/
		this.readyUrl=null;
		MiniSound.__super.call(this);
	}

	__class(MiniSound,'laya.wx.mini.MiniSound',_super);
	var __proto=MiniSound.prototype;
	/**
	*@private
	*加载声音。
	*@param url 地址。
	*
	*/
	__proto.load=function(url){
		if (!MiniFileMgr.isLocalNativeFile(url)){
			url=URL.formatURL(url);
			}else{
			if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1){
				if(MiniFileMgr.loadPath !=""){
					url=url.split(MiniFileMgr.loadPath)[1];
					}else{
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					if(tempStr !="")
						url=url.split(tempStr)[1];
				}
			}
		}
		this.url=url;
		this.readyUrl=url;
		if (MiniSound._audioCache[this.readyUrl]){
			this.event(/*laya.events.Event.COMPLETE*/"complete");
			return;
		}
		if(MiniAdpter.autoCacheFile&&MiniFileMgr.getFileInfo(url)){
			this.onDownLoadCallBack(url,0);
			}else{
			if(!MiniAdpter.autoCacheFile){
				this.onDownLoadCallBack(url,0);
				}else{
				if (MiniFileMgr.isLocalNativeFile(url)){
					tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=url;
					if(tempStr !="")
						url=url.split(tempStr)[1];
					if (!url){
						url=tempUrl;
					}
					if (MiniAdpter.subNativeFiles && MiniAdpter.subNativeheads.length==0){
						for (var key in MiniAdpter.subNativeFiles){
							var tempArr=MiniAdpter.subNativeFiles[key];
							MiniAdpter.subNativeheads=MiniAdpter.subNativeheads.concat(tempArr);
							for (var aa=0;aa < tempArr.length;aa++){
								MiniAdpter.subMaps[tempArr[aa]]=key+"/"+tempArr[aa];
							}
						}
					}
					if(MiniAdpter.subNativeFiles && url.indexOf("/")!=-1){
						var curfileHead=url.split("/")[0]+"/";
						if(curfileHead && MiniAdpter.subNativeheads.indexOf(curfileHead)!=-1){
							var newfileHead=MiniAdpter.subMaps[curfileHead];
							url=url.replace(curfileHead,newfileHead);
						}
					}
					this.onDownLoadCallBack(url,0);
					}else{
					MiniFileMgr.downOtherFiles(encodeURI(url),Handler.create(this,this.onDownLoadCallBack,[url]),url);
				}
			}
		}
	}

	/**@private **/
	__proto.onDownLoadCallBack=function(sourceUrl,errorCode){
		if (!errorCode){
			var fileNativeUrl;
			if(MiniAdpter.autoCacheFile){
				if (MiniFileMgr.isLocalNativeFile(sourceUrl)){
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=sourceUrl;
					if(tempStr !="" && (sourceUrl.indexOf("http://")!=-1 || sourceUrl.indexOf("https://")!=-1))
						fileNativeUrl=sourceUrl.split(tempStr)[1];
					if(!fileNativeUrl){
						fileNativeUrl=tempUrl;
					}
					}else{
					var fileObj=MiniFileMgr.getFileInfo(sourceUrl);
					if(fileObj && fileObj.md5){
						var fileMd5Name=fileObj.md5;
						fileNativeUrl=MiniFileMgr.getFileNativePath(fileMd5Name);
						}else{
						fileNativeUrl=encodeURI(sourceUrl);
					}
				}
				this._sound=MiniSound._createSound();
				this._sound.src=this.url=fileNativeUrl;
				}else{
				this._sound=MiniSound._createSound();
				this._sound.src=encodeURI(sourceUrl);
			}
			this._sound.onCanplay(MiniSound.bindToThis(this.onCanPlay,this));
			this._sound.onError(MiniSound.bindToThis(this.onError,this));
			}else{
			this.event(/*laya.events.Event.ERROR*/"error");
		}
	}

	/**@private **/
	__proto.onError=function(error){
		this.event(/*laya.events.Event.ERROR*/"error");
		this._sound.offError(null);
	}

	/**@private **/
	__proto.onCanPlay=function(){
		this.loaded=true;
		this.event(/*laya.events.Event.COMPLETE*/"complete");
		this._sound.offCanplay(null);
	}

	/**
	*@private
	*播放声音。
	*@param startTime 开始时间,单位秒
	*@param loops 循环次数,0表示一直循环
	*@return 声道 SoundChannel 对象。
	*
	*/
	__proto.play=function(startTime,loops){
		(startTime===void 0)&& (startTime=0);
		(loops===void 0)&& (loops=0);
		var tSound;
		if (this.url==SoundManager._tMusic){
			if (!MiniSound._musicAudio)MiniSound._musicAudio=MiniSound._createSound();
			tSound=MiniSound._musicAudio;
			}else {
			if(MiniSound._audioCache[this.readyUrl]){
				tSound=MiniSound._audioCache[this.readyUrl]._sound;
				}else{
				tSound=MiniSound._createSound();
			}
		}
		if(MiniAdpter.autoCacheFile&&MiniFileMgr.getFileInfo(this.url)){
			var fileNativeUrl;
			var fileObj=MiniFileMgr.getFileInfo(this.url);
			var fileMd5Name=fileObj.md5;
			tSound.src=this.url=MiniFileMgr.getFileNativePath(fileMd5Name);
			}else{
			tSound.src=encodeURI(this.url);
		};
		var channel=new MiniSoundChannel(tSound,this);
		channel.url=this.url;
		channel.loops=loops;
		channel.loop=(loops===0 ? true :false);
		channel.startTime=startTime;
		channel.play();
		SoundManager.addChannel(channel);
		return channel;
	}

	/**
	*@private
	*释放声音资源。
	*
	*/
	__proto.dispose=function(){
		var ad=MiniSound._audioCache[this.readyUrl];
		if (ad){
			ad.src="";
			if(ad._sound){
				ad._sound.destroy();
				ad._sound=null;
				ad=null;
			}
			delete MiniSound._audioCache[this.readyUrl];
		}
		if(this._sound){
			this._sound.destroy();
			this._sound=null;
		}
		this.url=this.readyUrl=null;
	}

	/**
	*@private
	*获取总时间。
	*/
	__getset(0,__proto,'duration',function(){
		return this._sound.duration;
	});

	MiniSound._createSound=function(){
		MiniSound._id++;
		return MiniAdpter.window.wx.createInnerAudioContext();
	}

	MiniSound.bindToThis=function(fun,scope){
		var rst=fun;
		/*__JS__ */rst=fun.bind(scope);;
		return rst;
	}

	MiniSound._musicAudio=null;
	MiniSound._id=0;
	MiniSound._audioCache={};
	return MiniSound;
})(EventDispatcher)


/**@private **/
//class laya.wx.mini.MiniSoundChannel extends laya.media.SoundChannel
var MiniSoundChannel=(function(_super){
	function MiniSoundChannel(audio,miniSound){
		/**@private **/
		this._audio=null;
		/**@private **/
		this._onEnd=null;
		/**@private **/
		this._miniSound=null;
		MiniSoundChannel.__super.call(this);
		this._audio=audio;
		this._miniSound=miniSound;
		this._onEnd=MiniSoundChannel.bindToThis(this.__onEnd,this);
		audio.onEnded(this._onEnd);
	}

	__class(MiniSoundChannel,'laya.wx.mini.MiniSoundChannel',_super);
	var __proto=MiniSoundChannel.prototype;
	/**@private **/
	__proto.__onEnd=function(){
		if (this.loops==1){
			if (this.completeHandler){
				Laya.timer.once(10,this,this.__runComplete,[this.completeHandler],false);
				this.completeHandler=null;
			}
			this.stop();
			this.event(/*laya.events.Event.COMPLETE*/"complete");
			return;
		}
		if (this.loops > 0){
			this.loops--;
		}
		this.startTime=0;
		this.play();
	}

	/**
	*@private
	*播放
	*/
	__proto.play=function(){
		this.isStopped=false;
		SoundManager.addChannel(this);
		this._audio.play();
	}

	/**
	*@private
	*停止播放
	*
	*/
	__proto.stop=function(){
		this.isStopped=true;
		SoundManager.removeChannel(this);
		this.completeHandler=null;
		if (!this._audio)
			return;
		this._audio.stop();
		this._audio.offEnded(null);
		this._audio.destroy();
		this._audio=null;
		this._miniSound=null;
		this._onEnd=null;
	}

	/**@private **/
	__proto.pause=function(){
		this.isStopped=true;
		this._audio.pause();
	}

	/**@private **/
	__proto.resume=function(){
		if (!this._audio)
			return;
		this.isStopped=false;
		SoundManager.addChannel(this);
		this._audio.play();
	}

	/**
	*设置开始时间
	*@param time
	*/
	__getset(0,__proto,'startTime',null,function(time){
		if(this._audio){
			this._audio.startTime=time;
		}
	});

	/**@private **/
	/**
	*@private
	*自动播放
	*@param value
	*/
	__getset(0,__proto,'autoplay',function(){
		return this._audio.autoplay;
		},function(value){
		this._audio.autoplay=value;
	});

	/**
	*@private
	*当前播放到的位置
	*@return
	*
	*/
	__getset(0,__proto,'position',function(){
		if (!this._audio)
			return 0;
		return this._audio.currentTime;
	});

	/**
	*@private
	*获取总时间。
	*/
	__getset(0,__proto,'duration',function(){
		if (!this._audio)
			return 0;
		return this._audio.duration;
	});

	/**@private **/
	/**@private **/
	__getset(0,__proto,'loop',function(){
		return this._audio.loop;
		},function(value){
		this._audio.loop=value;
	});

	/**
	*@private
	*设置音量
	*@param v
	*
	*/
	/**
	*@private
	*获取音量
	*@return
	*/
	__getset(0,__proto,'volume',function(){
		if (!this._audio)return 1;
		return this._audio.volume;
		},function(v){
		if (!this._audio)return;
		this._audio.volume=v;
	});

	MiniSoundChannel.bindToThis=function(fun,scope){
		var rst=fun;
		/*__JS__ */rst=fun.bind(scope);;
		return rst;
	}

	return MiniSoundChannel;
})(SoundChannel)



})(window,document,Laya);

if (typeof define === 'function' && define.amd){
	define('laya.core', ['require', "exports"], function(require, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        for (var i in Laya) {
			var o = Laya[i];
            o && o.__isclass && (exports[i] = o);
        }
    });
}