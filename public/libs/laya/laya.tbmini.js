
(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

	var Browser=laya.utils.Browser,Config=Laya.Config,Event=laya.events.Event,EventDispatcher=laya.events.EventDispatcher;
	var HTMLImage=laya.resource.HTMLImage,Handler=laya.utils.Handler,Input=laya.display.Input,Loader=laya.net.Loader;
	var LocalStorage=laya.net.LocalStorage,Matrix=laya.maths.Matrix,Render=laya.renders.Render,ResourceVersion=laya.net.ResourceVersion;
	var RunDriver=laya.utils.RunDriver,SoundChannel=laya.media.SoundChannel,SoundManager=laya.media.SoundManager;
	var URL=laya.net.URL,Utils=laya.utils.Utils;
/**@private **/
//class laya.tb.mini.MiniFileMgr
var MiniFileMgr$10=(function(){
	function MiniFileMgr(){}
	__class(MiniFileMgr,'laya.tb.mini.MiniFileMgr',null,'MiniFileMgr$10');
	MiniFileMgr.isLocalNativeFile=function(url){
		for(var i=0,sz=TBMiniAdapter.nativefiles.length;i<sz;i++){
			if(url.indexOf(TBMiniAdapter.nativefiles[i])!=-1)
				return true;
		}
		return false;
	}

	MiniFileMgr.isSubNativeFile=function(url){
		for(var i=0,sz=TBMiniAdapter.subNativeheads.length;i<sz;i++){
			if(url.indexOf(TBMiniAdapter.subNativeheads[i])!=-1)
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
		(encoding===void 0)&& (encoding="utf8");
		(readyUrl===void 0)&& (readyUrl="");
		(isSaveFile===void 0)&& (isSaveFile=false);
		(fileType===void 0)&& (fileType="");
		(isAutoClear===void 0)&& (isAutoClear=true);
		var downloadTask=MiniFileMgr.wxdown({url:fileUrl,success:function (data){
				if(!data.hasOwnProperty("statusCode")){
					data.statusCode=200;
				}
				if (data.statusCode===200)
					MiniFileMgr.readFile(data.apFilePath,encoding,callBack,readyUrl,isSaveFile,fileType,isAutoClear);
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
					if(isSaveFile){
						callBack !=null && callBack.runWith([0,data]);
						MiniFileMgr.copyFile(filePath,readyUrl,null,encoding,isAutoClear);
						}else{
						callBack !=null && callBack.runWith([0,data]);
					}
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
				if(!data.hasOwnProperty("statusCode")){
					data.statusCode=200;
				}
				if (data.statusCode===200){
					if (isSaveFile && readyUrl.indexOf(".php")==-1){
						callBack !=null && callBack.runWith([0,data.apFilePath]);
						MiniFileMgr.copyFile(data.apFilePath,readyUrl,null,"",isAutoClear);
					}
					else
					callBack !=null && callBack.runWith([0,data.apFilePath]);
					}else{
					callBack !=null && callBack.runWith([1,data]);
				}
				},fail:function (data){
				callBack !=null && callBack.runWith([1,data]);
		}});
	}

	MiniFileMgr.downLoadFile=function(fileUrl,fileType,callBack,encoding,cacheFile){
		(fileType===void 0)&& (fileType="");
		(encoding===void 0)&& (encoding="utf8");
		(cacheFile===void 0)&& (cacheFile=false);
		if(Browser.window.hasOwnProperty("my")){
			Laya.loader.load(fileUrl,callBack);
			}else{
			if(fileType==/*laya.net.Loader.IMAGE*/"image" || fileType==/*laya.net.Loader.SOUND*/"sound")
				MiniFileMgr.downOtherFiles(fileUrl,callBack,fileUrl,cacheFile,false);
			else
			MiniFileMgr.downFiles(fileUrl,encoding,callBack,fileUrl,true,fileType,cacheFile);
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
							if(data.size > TBMiniAdapter.minClearSize)
								TBMiniAdapter.minClearSize=data.size;
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
						if(data.size > TBMiniAdapter.minClearSize)
							TBMiniAdapter.minClearSize=data.size;
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
		var memSize=TBMiniAdapter.minClearSize;
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
		return laya.tb.mini.MiniFileMgr.fileNativeDir+"/"+fileName;
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
			if(key!="fileUsedSize")
				tempFileListArr.push(MiniFileMgr.filesListObj[key]);
		}
		for(var i=1,sz=tempFileListArr.length;i<sz;i++){
			var fileObj=tempFileListArr[i];
			MiniFileMgr.deleteFile("",fileObj.readyUrl);
		}
		if(laya.tb.mini.MiniFileMgr.filesListObj && laya.tb.mini.MiniFileMgr.filesListObj.fileUsedSize){
			laya.tb.mini.MiniFileMgr.filesListObj.fileUsedSize=0;
		}
		laya.tb.mini.MiniFileMgr.writeFilesList("",JSON.stringify({}),false);
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
				if (MiniFileMgr.filesListObj[fileurlkey].md5==MiniFileMgr.fakeObj[fileurlkey].md5){
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
		if(!TBMiniAdapter.isZiYu &&TBMiniAdapter.isPosMsgYu && TBMiniAdapter.window.my.postMessage){
			TBMiniAdapter.window.my.postMessage({url:fileurlkey,data:MiniFileMgr.filesListObj[fileurlkey],isLoad:"filenative",isAdd:isAdd});
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
				if (data.error==10025)
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
			MiniFileMgr.fs.readFile({
				filePath:fileUrl,
				encoding:encoding,
				success:function (data){
					filesListStr=data.data;
					callBack !=null && callBack.runWith([0,{data:filesListStr}]);
				},
				fail:function (){
					callBack !=null && callBack.runWith([1]);
				}
			});
		}
		catch(error){
			callBack !=null && callBack.runWith([1]);
		}
	}

	MiniFileMgr.setNativeFileDir=function(value){
		MiniFileMgr.fileNativeDir=TBMiniAdapter.window.my.env.USER_DATA_PATH+value;
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
	['fs',function(){return this.fs=TBMiniAdapter.window.my.getFileSystemManager();},'wxdown',function(){return this.wxdown=TBMiniAdapter.window.my.downloadFile;}
	]);
	return MiniFileMgr;
})()


/**@private **/
//class laya.tb.mini.MiniImage
var MiniImage$10=(function(){
	function MiniImage(){}
	__class(MiniImage,'laya.tb.mini.MiniImage',null,'MiniImage$10');
	var __proto=MiniImage.prototype;
	/**@private **/
	__proto._loadImage=function(url){
		var thisLoader=this;
		url=URL.formatURL(url);
		if (MiniFileMgr$10.isLocalNativeFile(url)|| (url.indexOf("http://")==-1 && url.indexOf("https://")==-1)){
			if (url.indexOf(TBMiniAdapter.window.my.env.USER_DATA_PATH)!=-1){
				MiniImage.onCreateImage(url,thisLoader,false,url);
				}else{
				if(MiniFileMgr$10.loadPath !=""){
					url=url.split(MiniFileMgr$10.loadPath)[1];
					}else{
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=url;
					if(tempStr !="")
						url=url.split(tempStr)[1];
					if(!url){
						url=tempUrl;
					}
				}
				MiniImage.onCreateImage(url,thisLoader,true);
			}
			}else{
			MiniImage.onCreateImage(url,thisLoader,false,encodeURI(url));
		}
	}

	MiniImage.onCreateImage=function(sourceUrl,thisLoader,isLocal,tempFilePath){
		(isLocal===void 0)&& (isLocal=false);
		(tempFilePath===void 0)&& (tempFilePath="");
		var fileNativeUrl;
		if (!isLocal){
			if (tempFilePath !=""){
				fileNativeUrl=tempFilePath;
				}else{
				fileNativeUrl=sourceUrl;
			}
		}
		else{
			if (MiniFileMgr$10.isSubNativeFile(sourceUrl)){
				fileNativeUrl=sourceUrl;
			}else
			fileNativeUrl=TBMiniAdapter.baseDir+sourceUrl;
		}
		if (thisLoader.imgCache==null)
			thisLoader.imgCache={};
		var image;
		function clear (){
			image.onload=null;
			image.onerror=null;
			delete thisLoader.imgCache[sourceUrl];
		};
		var onload=function (){
			clear();
			thisLoader.onLoaded(image);
		};
		var onerror=function (){
			clear();
			delete MiniFileMgr$10.filesListObj[sourceUrl];
			delete MiniFileMgr$10.fakeObj[sourceUrl];
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
//class laya.tb.mini.MiniInput
var MiniInput$10=(function(){
	function MiniInput(){}
	__class(MiniInput,'laya.tb.mini.MiniInput',null,'MiniInput$10');
	MiniInput._createInputElement=function(){
		Input['_initInput'](Input['area']=Browser.createElement("textarea"));
		Input['_initInput'](Input['input']=Browser.createElement("input"));
		Input['inputContainer']=Browser.createElement("div");
		Input['inputContainer'].style.position="absolute";
		Input['inputContainer'].style.zIndex=1E5;
		Browser.container.appendChild(Input['inputContainer']);
		Input['inputContainer'].setPos=function (x,y){Input['inputContainer'].style.left=x+'px';Input['inputContainer'].style.top=y+'px';};
		SoundManager._soundClass=MiniSound$10;
		SoundManager._musicClass=MiniSound$10;
		var model=TBMiniAdapter.systemInfo.model;
		var system=TBMiniAdapter.systemInfo.system;
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
		return;
		var _inputTarget=Input['inputElement'].target;
		if (_inputTarget && !_inputTarget.editable){
			return;
		}
		TBMiniAdapter.window.my.showKeyboard({defaultValue:_inputTarget.text,maxLength:_inputTarget.maxChars,multiple:_inputTarget.multiline,confirmHold:true,confirmType:'done',success:function (res){
				},fail:function (res){
		}});
		TBMiniAdapter.window.my.onKeyboardConfirm(function(res){
			var str=res ? res.value :"";
			_inputTarget.text=str;
			_inputTarget.event(/*laya.events.Event.INPUT*/"input");
			laya.tb.mini.MiniInput.inputEnter(true);
		})
		TBMiniAdapter.window.my.onKeyboardInput(function(res){
			var str=res ? res.value :"";
			if (!_inputTarget.multiline){
				if (str.indexOf("\n")!=-1){
					laya.tb.mini.MiniInput.inputEnter(false);
					return;
				}
			}
			_inputTarget.text=str;
			_inputTarget.event(/*laya.events.Event.INPUT*/"input");
		});
	}

	MiniInput.inputEnter=function(isBool){
		return
		if(isBool){
			MiniInput.hideKeyboard();
		}
		if(!Input['inputElement'].target)
			return;
		Input['inputElement'].target.focus=false;
	}

	MiniInput.wxinputblur=function(){}
	MiniInput.hideKeyboard=function(){
		return
		TBMiniAdapter.window.my.hideKeyboard({success:function (res){
				console.log('隐藏键盘')
				},fail:function (res){
				console.log("隐藏键盘出错:"+(res ? res.errMsg :""));
		}});
	}

	return MiniInput;
})()


/**@private **/
//class laya.tb.mini.MiniLocalStorage
var MiniLocalStorage$9=(function(){
	function MiniLocalStorage(){}
	__class(MiniLocalStorage,'laya.tb.mini.MiniLocalStorage',null,'MiniLocalStorage$9');
	MiniLocalStorage.__init__=function(){
		MiniLocalStorage.items=MiniLocalStorage;
	}

	MiniLocalStorage.setItem=function(key,value){
		try{
			TBMiniAdapter.window.my.setStorageSync({
				key:key,
				data:value
			});
		}
		catch(error){
			TBMiniAdapter.window.my.setStorage({
				key:key,
				data:value
			});
		}
	}

	MiniLocalStorage.getItem=function(key){
		var data=TBMiniAdapter.window.my.getStorageSync({"key":key});
		if (data.success)
			return data.data;
		return null;
	}

	MiniLocalStorage.setJSON=function(key,value){
		MiniLocalStorage.setItem(key,value);
	}

	MiniLocalStorage.getJSON=function(key){
		return MiniLocalStorage.getItem(key);
	}

	MiniLocalStorage.removeItem=function(key){
		TBMiniAdapter.window.my.removeStorageSync(key);
	}

	MiniLocalStorage.clear=function(){
		TBMiniAdapter.window.my.clearStorageSync();
	}

	MiniLocalStorage.getStorageInfoSync=function(){
		try {
			var res=TBMiniAdapter.window.my.getStorageInfoSync()
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
//class laya.tb.mini.MiniLocation
var MiniLocation$10=(function(){
	function MiniLocation(){}
	__class(MiniLocation,'laya.tb.mini.MiniLocation',null,'MiniLocation$10');
	MiniLocation.__init__=function(){
		TBMiniAdapter.window.navigator.geolocation.getCurrentPosition=MiniLocation.getCurrentPosition;
		TBMiniAdapter.window.navigator.geolocation.watchPosition=MiniLocation.watchPosition;
		TBMiniAdapter.window.navigator.geolocation.clearWatch=MiniLocation.clearWatch;
	}

	MiniLocation.getCurrentPosition=function(success,error,options){
		var paramO;
		paramO={};
		paramO.success=getSuccess;
		paramO.fail=error;
		TBMiniAdapter.window.my.getLocation(paramO);
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
//class laya.tb.mini.MiniVideo
var MiniVideo$8=(function(){
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
		this.videoElement=TBMiniAdapter.window.my.createVideo({width:width,height:height,autoplay:true});
	}

	__class(MiniVideo,'laya.tb.mini.MiniVideo',null,'MiniVideo$8');
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


//class laya.tb.mini.TBMiniAdapter
var TBMiniAdapter=(function(){
	function TBMiniAdapter(){}
	__class(TBMiniAdapter,'laya.tb.mini.TBMiniAdapter');
	TBMiniAdapter.getJson=function(data){
		return JSON.parse(data);
	}

	TBMiniAdapter.init=function(){
		if (TBMiniAdapter._inited)return;
		TBMiniAdapter._inited=true;
		TBMiniAdapter.window=/*__JS__ */window;
		var u=TBMiniAdapter.window.navigator.userAgent;
		if(!(u.indexOf('TB')>-1 || u.indexOf('Taobao')>-1 || u.indexOf('TM/')>-1))
			return;
		TBMiniAdapter.EnvConfig={};
		MiniFileMgr$10.setNativeFileDir("/layaairGame");
		MiniFileMgr$10.existDir(MiniFileMgr$10.fileNativeDir,Handler.create(TBMiniAdapter,TBMiniAdapter.onMkdirCallBack));
		TBMiniAdapter.systemInfo=TBMiniAdapter.window.my.getSystemInfoSync();
		TBMiniAdapter.window.focus=function (){
		};
		Laya['_getUrlPath']=function (){
		};
		Laya['getUrlPath']=function (){
		};
		TBMiniAdapter.window.logtime=function (str){
		};
		TBMiniAdapter.window.alertTimeLog=function (str){
		};
		TBMiniAdapter.window.resetShareInfo=function (){
		};
		TBMiniAdapter._preCreateElement=Browser.createElement;
		Browser["createElement"]=TBMiniAdapter.createElement;
		TBMiniAdapter.window.CanvasRenderingContext2D=function (){};
		TBMiniAdapter.window.CanvasRenderingContext2D.prototype=TBMiniAdapter._preCreateElement('canvas').getContext('2d').__proto__;
		TBMiniAdapter.window.document.body.appendChild=function (){
		};
		RunDriver.createShaderCondition=TBMiniAdapter.createShaderCondition;
		Utils['parseXMLFromString']=TBMiniAdapter.parseXMLFromString;
		Input['_createInputElement']=MiniInput$10['_createInputElement'];
		TBMiniAdapter.EnvConfig.load=Loader.prototype.load;
		Loader.prototype.load=MiniLoader$10.prototype.load;
		Loader.prototype._loadImage=MiniImage$10.prototype._loadImage;
		LocalStorage._baseClass=MiniLocalStorage$9;
		MiniLocalStorage$9.__init__();
		Config.useRetinalCanvas=true;
	}

	TBMiniAdapter.measureText=function(str){
		var tempObj=TBMiniAdapter._measureText(str);
		if(!tempObj){
			tempObj={width:16};
			console.warn("-------微信获取文字宽度失败----等待修复---------");
		}
		return tempObj;
	}

	TBMiniAdapter.getUrlEncode=function(url,type){
		if(type=="arraybuffer")
			return "";
		return "utf8";
	}

	TBMiniAdapter.downLoadFile=function(fileUrl,fileType,callBack,encoding){
		(fileType===void 0)&& (fileType="");
		(encoding===void 0)&& (encoding="utf8");
		var fileObj=MiniFileMgr$10.getFileInfo(fileUrl);
		if(!fileObj)
			MiniFileMgr$10.downLoadFile(fileUrl,fileType,callBack,encoding);
		else{
			callBack !=null && callBack.runWith([0]);
		}
	}

	TBMiniAdapter.remove=function(fileUrl,callBack){
		MiniFileMgr$10.deleteFile("",fileUrl,callBack,"",0);
	}

	TBMiniAdapter.removeAll=function(){
		MiniFileMgr$10.deleteAll();
	}

	TBMiniAdapter.hasNativeFile=function(fileUrl){
		return MiniFileMgr$10.isLocalNativeFile(fileUrl);
	}

	TBMiniAdapter.getFileInfo=function(fileUrl){
		return MiniFileMgr$10.getFileInfo(fileUrl);
	}

	TBMiniAdapter.getFileList=function(){
		return MiniFileMgr$10.filesListObj;
	}

	TBMiniAdapter.exitMiniProgram=function(){
		TBMiniAdapter.window.my.exitMiniProgram();
	}

	TBMiniAdapter.onMkdirCallBack=function(errorCode,data){
		if (!errorCode){
			MiniFileMgr$10.filesListObj=JSON.parse(data.data);
			MiniFileMgr$10.fakeObj=JSON.parse(data.data);
		}
	}

	TBMiniAdapter.pixelRatio=function(){
		if (!TBMiniAdapter.EnvConfig.pixelRatioInt){
			try {
				TBMiniAdapter.EnvConfig.pixelRatioInt=TBMiniAdapter.systemInfo.pixelRatio;
				return TBMiniAdapter.systemInfo.pixelRatio;
			}catch (error){}
		}
		return TBMiniAdapter.EnvConfig.pixelRatioInt;
	}

	TBMiniAdapter.createElement=function(type){
		if (type=="canvas"){
			var _source;
			if (TBMiniAdapter.idx==1){
				_source=TBMiniAdapter.window.canvas.getRealCanvas();
				}else {
				_source=TBMiniAdapter._preCreateElement(type);
			}
			(!_source.style)&& (_source.style={});
			TBMiniAdapter.idx++;
			return _source;
			}else if (type=="textarea" || type=="input"){
			return TBMiniAdapter.onCreateInput(type);
			}else if (type=="div"){
			var node=TBMiniAdapter._preCreateElement(type);
			node.contains=function (value){
				return null
			};
			node.removeChild=function (value){
			};
			return node;
		}
		else {
			return TBMiniAdapter._preCreateElement(type);
		}
	}

	TBMiniAdapter.onCreateInput=function(type){
		var node=TBMiniAdapter._preCreateElement(type);
		node.focus=MiniInput$10.wxinputFocus;
		node.blur=MiniInput$10.wxinputblur;
		node.value=0;
		node.placeholder={};
		node.type={};
		node.setColor=function (value){
		};
		node.setType=function (value){
		};
		node.setFontFace=function (value){
		};
		node.contains=function (value){
			return null
		};
		return node;
	}

	TBMiniAdapter.createShaderCondition=function(conditionScript){
		var _$this=this;
		var func=function (){
			var abc=conditionScript;
			return _$this[conditionScript.replace("this.","")];
		}
		return func;
	}

	TBMiniAdapter.EnvConfig=null;
	TBMiniAdapter.window=null;
	TBMiniAdapter._preCreateElement=null;
	TBMiniAdapter._inited=false;
	TBMiniAdapter.systemInfo=null;
	TBMiniAdapter.isPosMsgYu=false;
	TBMiniAdapter.autoCacheFile=true;
	TBMiniAdapter.minClearSize=(5 *1024 *1024);
	TBMiniAdapter.subNativeFiles={};
	TBMiniAdapter.subNativeheads=[];
	TBMiniAdapter.subMaps=[];
	TBMiniAdapter.AutoCacheDownFile=false;
	TBMiniAdapter.baseDir="pages/index/";
	TBMiniAdapter._measureText=null;
	TBMiniAdapter.parseXMLFromString=function(value){
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

	TBMiniAdapter.idx=1;
	__static(TBMiniAdapter,
	['nativefiles',function(){return this.nativefiles=["layaNativeDir"];}
	]);
	return TBMiniAdapter;
})()


/**@private **/
//class laya.tb.mini.MiniAccelerator extends laya.events.EventDispatcher
var MiniAccelerator$10=(function(_super){
	function MiniAccelerator(){
		MiniAccelerator.__super.call(this);
	}

	__class(MiniAccelerator,'laya.tb.mini.MiniAccelerator',_super,'MiniAccelerator$10');
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
			TBMiniAdapter.window.my.onAccelerometerChange(laya.tb.mini.MiniAccelerator.onAccelerometerChange);
		}catch(e){}
	}

	MiniAccelerator.stopListen=function(){
		MiniAccelerator._isListening=false;
		try{
			TBMiniAdapter.window.my.stopAccelerometer({});
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
//class laya.tb.mini.MiniLoader extends laya.events.EventDispatcher
var MiniLoader$10=(function(_super){
	function MiniLoader(){
		MiniLoader.__super.call(this);
	}

	__class(MiniLoader,'laya.tb.mini.MiniLoader',_super,'MiniLoader$10');
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
		}
		if (MiniFileMgr$10.isLocalNativeFile(url)&& !MiniFileMgr$10.getFileInfo(url)){
			if (TBMiniAdapter.subNativeFiles && TBMiniAdapter.subNativeheads.length==0){
				for (var key in TBMiniAdapter.subNativeFiles){
					var tempArr=TBMiniAdapter.subNativeFiles[key];
					TBMiniAdapter.subNativeheads=TBMiniAdapter.subNativeheads.concat(tempArr);
					for (var aa=0;aa < tempArr.length;aa++){
						TBMiniAdapter.subMaps[tempArr[aa]]=key+"/"+tempArr[aa];
					}
				}
			}
			if(TBMiniAdapter.subNativeFiles && url.indexOf("/")!=-1){
				var curfileHead=url.split("/")[0]+"/";
				if(curfileHead && TBMiniAdapter.subNativeheads.indexOf(curfileHead)!=-1){
					var newfileHead=TBMiniAdapter.subMaps[curfileHead];
					url=url.replace(curfileHead,newfileHead);
				}
			}
		};
		var encoding=TBMiniAdapter.getUrlEncode(url,type);
		var urlType=Utils.getFileExtension(url);
		if ((MiniLoader._fileTypeArr.indexOf(urlType)!=-1)|| type==/*laya.net.Loader.IMAGE*/"image"){
			TBMiniAdapter.EnvConfig.load.call(this,url,type,cache,group,ignoreCache);
			}else {
			if (!MiniFileMgr$10.getFileInfo(url)){
				if (MiniFileMgr$10.isLocalNativeFile(url)){
					if (MiniFileMgr$10.isSubNativeFile(url)){
						MiniFileMgr$10.readFile(ResourceVersion.addVersionPrefix(url),encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]));
					}else
					MiniFileMgr$10.readFile(TBMiniAdapter.baseDir+ResourceVersion.addVersionPrefix(url),encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]));
					}else{
					var tempUrl=url;
					var tempurl=URL.formatURL(url);
					fileObj=MiniFileMgr$10.getFileInfo(url);
					if(fileObj){
						fileObj.encoding=fileObj.encoding==null ? "utf8" :fileObj.encoding;
						MiniFileMgr$10.readFile(fileObj.url,encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url);
					}
					else{
						url=URL.formatURL(url);
						if(type !=/*laya.net.Loader.IMAGE*/"image" && ((url.indexOf("http://")==-1 && url.indexOf("https://")==-1))){
							MiniFileMgr$10.readFile(TBMiniAdapter.baseDir+url,encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url);
							}else{
							MiniFileMgr$10.downFiles(encodeURI(url),encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url,TBMiniAdapter.AutoCacheDownFile);
						}
					}
				}
				}else {
				var fileObj=MiniFileMgr$10.getFileInfo(URL.formatURL(url));
				fileObj.encoding=fileObj.encoding==null ? "utf8" :fileObj.encoding;
				var nativepath=MiniFileMgr$10.getFileNativePath(fileObj.md5);
				MiniFileMgr$10.readFile(nativepath,fileObj.encoding,new Handler(MiniLoader,MiniLoader.onReadNativeCallBack,[encoding,url,type,cache,group,ignoreCache,thisLoader]),url);
			}
		}
	}

	MiniLoader.onReadNativeCallBack=function(encoding,url,type,cache,group,ignoreCache,thisLoader,errorCode,data){
		(cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
		(errorCode===void 0)&& (errorCode=0);
		if (!errorCode){
			var tempData;
			if (type==/*laya.net.Loader.JSON*/"json" || type==/*laya.net.Loader.ATLAS*/"atlas"){
				tempData=TBMiniAdapter.getJson(data.data);
				}else if (type==/*laya.net.Loader.XML*/"xml"){
				tempData=Utils.parseXMLFromString(data.data);
				}else {
				tempData=data.data;
			}
			thisLoader.onLoaded(tempData);
			}else if (errorCode==1){
			thisLoader.onError && thisLoader.onError(data);
		}
	}

	__static(MiniLoader,
	['_fileTypeArr',function(){return this._fileTypeArr=['png','jpg','bmp','jpeg','gif'];}
	]);
	return MiniLoader;
})(EventDispatcher)


/**@private **/
//class laya.tb.mini.MiniSound extends laya.events.EventDispatcher
var MiniSound$10=(function(_super){
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
		this._sound=MiniSound._createSound();
	}

	__class(MiniSound,'laya.tb.mini.MiniSound',_super,'MiniSound$10');
	var __proto=MiniSound.prototype;
	/**
	*@private
	*加载声音。
	*@param url 地址。
	*
	*/
	__proto.load=function(url){
		if (!MiniFileMgr$10.isLocalNativeFile(url)){
			url=URL.formatURL(url);
			}else{
			if (url.indexOf("http://")!=-1 || url.indexOf("https://")!=-1){
				if(MiniFileMgr$10.loadPath !=""){
					url=url.split(MiniFileMgr$10.loadPath)[1];
					}else{
					var tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					if(tempStr !="")
						url=url.split(tempStr)[1];
				}
			}
		}
		this.url=url;
		this.readyUrl=url;
		if(TBMiniAdapter.autoCacheFile&&MiniFileMgr$10.getFileInfo(url)){
			this.onDownLoadCallBack(url,0);
			}else{
			if(!TBMiniAdapter.autoCacheFile){
				this.onDownLoadCallBack(url,0);
				}else{
				if (MiniFileMgr$10.isLocalNativeFile(url)){
					tempStr=URL.rootPath !="" ? URL.rootPath :URL.basePath;
					var tempUrl=url;
					if(tempStr !="")
						url=url.split(tempStr)[1];
					if (!url){
						url=tempUrl;
					}
					if (TBMiniAdapter.subNativeFiles && TBMiniAdapter.subNativeheads.length==0){
						for (var key in TBMiniAdapter.subNativeFiles){
							var tempArr=TBMiniAdapter.subNativeFiles[key];
							TBMiniAdapter.subNativeheads=TBMiniAdapter.subNativeheads.concat(tempArr);
							for (var aa=0;aa < tempArr.length;aa++){
								TBMiniAdapter.subMaps[tempArr[aa]]=key+"/"+tempArr[aa];
							}
						}
					}
					if(TBMiniAdapter.subNativeFiles && url.indexOf("/")!=-1){
						var curfileHead=url.split("/")[0]+"/";
						if(curfileHead && TBMiniAdapter.subNativeheads.indexOf(curfileHead)!=-1){
							var newfileHead=TBMiniAdapter.subMaps[curfileHead];
							url=url.replace(curfileHead,newfileHead);
						}
					}
					this.onDownLoadCallBack(url,0);
					}else{
					if ((url.indexOf("http://")==-1 && url.indexOf("https://")==-1)
						|| url.indexOf(TBMiniAdapter.window.my.env.USER_DATA_PATH)!=-1){
						this.onDownLoadCallBack(url,0);
						}else{
						MiniFileMgr$10.downOtherFiles(url,Handler.create(this,this.onDownLoadCallBack,[url]),url,TBMiniAdapter.autoCacheFile);
					}
				}
			}
		}
	}

	/**@private **/
	__proto.onDownLoadCallBack=function(sourceUrl,errorCode,tempFilePath){
		(tempFilePath===void 0)&& (tempFilePath="");
		if (!errorCode && this._sound){
			var fileNativeUrl;
			if(TBMiniAdapter.autoCacheFile){
				if(tempFilePath==""){
					if (MiniFileMgr$10.isLocalNativeFile(sourceUrl)){
						var tempStr=URL.rootPath !="" ? URL.rootPath :URL._basePath;
						var tempUrl=sourceUrl;
						if(tempStr !="" && (sourceUrl.indexOf("http://")!=-1 || sourceUrl.indexOf("https://")!=-1))
							fileNativeUrl=sourceUrl.split(tempStr)[1];
						if(!fileNativeUrl){
							fileNativeUrl=tempUrl;
						}
						if (MiniFileMgr$10.isSubNativeFile(fileNativeUrl)){
							fileNativeUrl=fileNativeUrl;
						}else
						fileNativeUrl=TBMiniAdapter.baseDir+fileNativeUrl;
						}else{
						var fileObj=MiniFileMgr$10.getFileInfo(sourceUrl);
						if(fileObj && fileObj.md5){
							var fileMd5Name=fileObj.md5;
							fileNativeUrl=MiniFileMgr$10.getFileNativePath(fileMd5Name);
							}else{
							if (sourceUrl.indexOf("http://")==-1
								&& sourceUrl.indexOf("https://")==-1
							&& sourceUrl.indexOf(TBMiniAdapter.window.my.env.USER_DATA_PATH)==-1){
								fileNativeUrl=TBMiniAdapter.baseDir+sourceUrl;
								}else {
								fileNativeUrl=sourceUrl;
							}
						}
					}
					}else{
					fileNativeUrl=tempFilePath;
				}
				this._sound.src=this.url=fileNativeUrl;
				}else{
				if((MiniFileMgr$10.isLocalNativeFile(sourceUrl)&& !MiniFileMgr$10.isSubNativeFile(sourceUrl))||
					(
				sourceUrl.indexOf("http://")==-1
				&&sourceUrl.indexOf("https://")==-1
				&&sourceUrl.indexOf(TBMiniAdapter.window.my.env.USER_DATA_PATH)==-1)){
					sourceUrl=TBMiniAdapter.baseDir+sourceUrl;
				}
				this._sound.src=sourceUrl;
			}
			}else{
			this.event(/*laya.events.Event.ERROR*/"error");
		}
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
		if(!this.url)return null;
		var channel=new MiniSoundChannel$10(this);
		channel.url=this.url;
		channel.loops=loops;
		channel.loop=(loops===0 ? true :false);
		channel.startTime=startTime;
		channel.isStopped=false;
		SoundManager.addChannel(channel);
		return channel;
	}

	/**
	*@private
	*释放声音资源。
	*
	*/
	__proto.dispose=function(){
		if (this._sound){
			this._sound.src="";
			MiniSound._audioCache.push(this._sound);
			this._sound=null;
			this.readyUrl=this.url=null;
		}
	}

	/**
	*@private
	*获取总时间。
	*/
	__getset(0,__proto,'duration',function(){
		return this._sound.duration;
	});

	MiniSound._createSound=function(){
		if(MiniSound._audioCache.length){
			return MiniSound._audioCache.pop();
			}else{
			MiniSound._id++;
			return TBMiniAdapter.window.my.createInnerAudioContext();
		}
	}

	MiniSound._id=0;
	MiniSound._audioCache=[];
	return MiniSound;
})(EventDispatcher)


/**@private **/
//class laya.tb.mini.MiniSoundChannel extends laya.media.SoundChannel
var MiniSoundChannel$10=(function(_super){
	function MiniSoundChannel(miniSound){
		/**@private **/
		this._audio=null;
		/**@private **/
		this._onEnd=null;
		this._onCanplay=null;
		this._onError=null;
		/**@private **/
		this._miniSound=null;
		MiniSoundChannel.__super.call(this);
		this._audio=miniSound._sound;
		this._miniSound=miniSound;
		this._onEnd=MiniSoundChannel.bindToThis(this.__onEnd,this);
		this._onCanplay=MiniSoundChannel.bindToThis(this.onCanPlay,this);
		this._onError=MiniSoundChannel.bindToThis(this.onError,this);
		this.addEventListener();
	}

	__class(MiniSoundChannel,'laya.tb.mini.MiniSoundChannel',_super,'MiniSoundChannel$10');
	var __proto=MiniSoundChannel.prototype;
	__proto.addEventListener=function(){
		this._audio.onError(this._onError);
		this._audio.onCanplay(this._onCanplay);
	}

	//_audio.onEnded(_onEnd);
	__proto.offEventListener=function(){
		this._audio.offError(this._onError);
		this._audio.offCanplay(this._onCanplay);
		this._audio.offEnded(this._onEnd);
	}

	/**@private **/
	__proto.onError=function(error){
		console.log("-----1---------------minisound-----url:",this.url);
		console.log(error);
		this.event(/*laya.events.Event.ERROR*/"error");
		if(!this._audio)return;
		this._miniSound.dispose();
		this.offEventListener();
		this._audio=this._miniSound=null;
	}

	/**@private **/
	__proto.onCanPlay=function(){
		if(!this._audio)return;
		this.event(/*laya.events.Event.COMPLETE*/"complete");
		this.offEventListener();
		this._audio.onEnded(this._onEnd);
		if (!this.isStopped){
			this.play()
			}else{
			this.stop();
		}
	}

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
		if(!this._audio)return;
		this._audio.play();
	}

	/**
	*@private
	*停止播放
	*
	*/
	__proto.stop=function(){
		_super.prototype.stop.call(this);
		this.isStopped=true;
		SoundManager.removeChannel(this);
		this.completeHandler=null;
		if (!this._audio)
			return;
		this._audio.stop();
		if (!this.loop){
			this.offEventListener();
			this._miniSound.dispose();
			this._miniSound=null;
			this._audio=null;
		}
	}

	/**@private **/
	__proto.pause=function(){
		this.isStopped=true;
		if(!this._audio)return;
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
	/**
	*设置开始时间
	*@param time
	*/
	__getset(0,__proto,'startTime',function(){
		if(!this._audio)return 0;
		return this._audio.startTime;
		},function(time){
		if(!this._audio)return;
		this._audio.startTime=time;
	});

	/**@private **/
	/**
	*@private
	*自动播放
	*@param value
	*/
	__getset(0,__proto,'autoplay',function(){
		if(!this._audio)return false;
		return this._audio.autoplay;
		},function(value){
		if(!this._audio)return;
		this._audio.autoplay=value;
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

	/**@private **/
	/**@private **/
	__getset(0,__proto,'loop',function(){
		if(!this._audio)return false;
		return this._audio.loop;
		},function(value){
		if(!this._audio)return;
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