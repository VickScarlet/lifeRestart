declare module laya.wx.mini {
    import Handler = laya.utils.Handler;
    class MiniAdpter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.bd.mini {
    import Handler = laya.utils.Handler;
    class BMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.mi.mini {
    import Handler = laya.utils.Handler;
    class KGMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.qg.mini {
    import Handler = laya.utils.Handler;
    class QGMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.vv.mini {
    import Handler = laya.utils.Handler;
    class VVMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.bili.mini {
    import Handler = laya.utils.Handler;
    class BLMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.Alipay.mini {
    import Handler = laya.utils.Handler;
    class ALIMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.qq.mini {
    import Handler = laya.utils.Handler;
    class QQMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.tt.mini {
    import Handler = laya.utils.Handler;
    class TTMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.hw.mini {
    import Handler = laya.utils.Handler;
    class HWMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.tb.mini {
    import Handler = laya.utils.Handler;
    class TBMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}
declare module laya.yk.mini {
    import Handler = laya.utils.Handler;
    class YKMiniAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module laya.tbplugin.mini {
    import Handler = laya.utils.Handler;
    class TBPluginAdapter {
        static EnvConfig: any;
        /**全局window对象**/
        static window: any;
        static systemInfo: any;
        static isZiYu: boolean;
        static isPosMsgYu: boolean;
        /**是否自动缓存下载的图片跟声音文件，默认为true**/
        static autoCacheFile: boolean;
        /**50M缓存容量满时每次清理容量值,默认每次清理5M**/
        static minClearSize: number;
        /**本地资源列表**/
        static nativefiles: Array<any>;
        /**本地分包资源表**/
        static subNativeFiles: any;
        /**本地分包文件目录数组**/
        static subNativeheads: Array<any>;
        /**本地分包文件目录映射表**/
        static subMaps: Array<any>;
        static AutoCacheDownFile: boolean;
        static getJson(data: string): any;
        /**激活微信小游戏适配器*/
        static enable(): void;
        /**
         * 初始化回调
         * @param isPosMsg 是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false
         * @param isSon 是否是子域，默认为false
         */
        static init(isPosMsg?: boolean, isSon?: boolean): void;
        /**
         * 获取url对应的encoding值
         * @param url 文件路径
         * @param type 文件类型
         * @return
         */
        static getUrlEncode(url: string, type: string): string;
        /**
         * 下载文件
         * @param fileUrl 文件地址(全路径)
         * @param fileType 文件类型(image、text、json、xml、arraybuffer、sound、atlas、font)
         * @param callBack 文件加载回调,回调内容[errorCode码(0成功,1失败,2加载进度)
         * @param encoding 文件编码默认utf8，非图片文件加载需要设置相应的编码，二进制编码为空字符串
         */
        static downLoadFile(fileUrl: string, fileType?: string, callBack?: Handler, encoding?: string): void;
        /**
         * 从本地删除文件
         * @param fileUrl 文件地址(全路径)
         * @param callBack 回调处理，在存储图片时用到
         */
        static remove(fileUrl: string, callBack?: Handler): void;
        /**
         * 清空缓存空间文件内容
         */
        static removeAll(): void;
        /**
         * 判断是否是4M包文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static hasNativeFile(fileUrl: string): boolean;
        /**
         * 判断缓存里是否存在文件
         * @param fileUrl 文件地址(全路径)
         * @return
         */
        static getFileInfo(fileUrl: string): any;
        /**
         * 获取缓存文件列表
         * @return
         */
        static getFileList(): any;
        static exitMiniProgram(): void;
        static pixelRatio(): number;
        static createElement(type: string): any;
        static createShaderCondition(conditionScript: string): Function;
        /**
         * 传递图集url地址到
         * @param url 为绝对地址
         */
        static sendAtlasToOpenDataContext(url: string): void;
        /**
         * 发送单张图片到开放数据域
         * @param url
         */
        static sendSinglePicToOpenDataContext(url: string): void;
        /**
         * 传递json配置数据到开放数据域
         * @param url 为绝对地址
         */
        static sendJsonDataToDataContext(url: string): void;
    }
}

declare module Laya {
    class MiniAdpter extends laya.wx.mini.MiniAdpter {
    }
    class BMiniAdapter extends laya.bd.mini.BMiniAdapter {
    }
    class KGMiniAdapter extends laya.mi.mini.KGMiniAdapter {
    }
    class QGMiniAdapter extends laya.qg.mini.QGMiniAdapter {
    }
    class VVMiniAdapter extends laya.vv.mini.VVMiniAdapter {
    }
    class BLMiniAdapter extends laya.bili.mini.BLMiniAdapter {
    }
    class ALIMiniAdapter extends laya.Alipay.mini.ALIMiniAdapter {
    }
    class QQMiniAdapter extends laya.qq.mini.QQMiniAdapter {
    }
    class TTMiniAdapter extends laya.tt.mini.TTMiniAdapter {
    }
    class HWMiniAdapter extends laya.hw.mini.HWMiniAdapter {
    }
    class TBMiniAdapter extends laya.tb.mini.TBMiniAdapter {
    }
    class YKMiniAdapter extends laya.yk.mini.YKMiniAdapter {
    }
    class TBPluginAdapter extends laya.tbplugin.mini.TBPluginAdapter {
    }
}