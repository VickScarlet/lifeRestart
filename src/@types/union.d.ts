interface CanvasContext {
  /**
   * 创建一个颜色的渐变点。
   */
  addColorStop: () => void;

  /**
   * 画一条弧线。
   */
  arc: () => void;

  /**
   * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
   */
  beginPath: () => void;

  /**
   * 创建三次方贝塞尔曲线路径。
   */
  bezierCurveTo: () => void;

  /**
   * 清空绘图上下文的绘图动作。
   */
  clearActions: () => void;

  /**
   * 清除画布上在该矩形区域内的内容。
   */
  clearRect: () => void;

  /**
   * clip() 方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
   */
  clip: () => void;

  /**
   * 关闭一个路径
   */
  closePath: () => void;

  /**
   * 创建一个圆形的渐变颜色。
   */
  createCircularGradient: () => void;

  /**
   * 创建一个线性的渐变颜色。
   */
  createLinearGradient: () => void;

  /**
   * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
   */
  draw: () => void;

  /**
   * 绘制图像到画布。
   */
  drawImage: () => void;

  /**
   * 对当前路径中的内容进行填充。默认的填充色为黑色。
   */
  fill: () => void;

  /**
   * 填充一个矩形。
   */
  fillRect: () => void;

  /**
   * 在画布上绘制被填充的文本。
   */
  fillText: () => void;

  /**
   * const ctx = wx.createCanvasContext('myCanvas')
   */
  lineTo: () => void;

  /**
   * 把路径移动到画布中的指定点，不创建线条。
   */
  moveTo: () => void;

  /**
   * 创建二次贝塞尔曲线路径。
   */
  quadraticCurveTo: () => void;

  /**
   * 创建一个矩形。
   */
  rect: () => void;

  /**
   * 以原点为中心，原点可以用 [translate](#translate)方法修改。顺时针旋转当前坐标轴。多次调用`rotate`，旋转的角度会叠加。
   */
  rotate: () => void;

  /**
   * 保存当前的绘图上下文。
   */
  save: () => void;

  /**
   * 在调用`scale`方法后，之后创建的路径其横纵坐标会被缩放。多次调用`scale`，倍数会相乘。
   */
  scale: () => void;

  /**
   * 设置填充色。
   */
  setFillStyle: () => void;

  /**
   * 设置字体的字号。
   */
  setFontSize: () => void;

  /**
   * 设置全局画笔透明度。
   */
  setGlobalAlpha: () => void;

  /**
   * 设置线条的端点样式。
   */
  setLineCap: () => void;

  /**
   * 设置线条的宽度。
   */
  setLineDash: () => void;

  /**
   * 设置线条的交点样式。
   */
  setLineJoin: () => void;

  /**
   * 设置线条的宽度。
   */
  setLineWidth: () => void;

  /**
   * 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 `setLineJoin()` 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
   */
  setMiterLimit: () => void;

  /**
   * 设置阴影样式。
   */
  setShadow: () => void;

  /**
   * 设置边框颜色。
   */
  setStrokeStyle: () => void;

  /**
   * 用于设置文字的对齐
   */
  setTextAlign: () => void;

  /**
   * 用于设置文字的水平对齐
   */
  setTextBaseline: () => void;

  /**
   * 画出当前路径的边框。默认颜色色为黑色。
   */
  stroke: () => void;

  /**
   * 画一个矩形(非填充)。
   */
  strokeRect: () => void;

  /**
   * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
   */
  translate: () => void;
}

interface _writeBLECharacteristicValueObject {
  /**
   * 蓝牙设备 id，参考 device 对象
   */
  deviceId: string;

  /**
   * 蓝牙特征值对应服务的 uuid
   */
  serviceId: string;

  /**
   * 蓝牙特征值的 uuid
   */
  characteristicId: string;

  /**
   * 蓝牙设备特征值对应的二进制值
   */
  value: any;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _writeBLECharacteristicValueSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}

interface _writeBLECharacteristicValueSuccessObject {
  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _vibrateShortObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _vibrateLongObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _uploadFileObject {
  /**
   * 开发者服务器 url
   */
  url: string;

  /**
   * 要上传文件资源的路径
   */
  filePath: string;

  /**
   * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
   */
  name: string;

  /**
   * HTTP 请求 Header, header 中不能设置 Referer
   */
  header: object;

  /**
   * HTTP 请求中其他额外的 form data
   */
  formData: object;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _uploadFileSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _uploadFileSuccessObject {
  /**
   * 开发者服务器返回的数据
   */
  data: string;

  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number;
}

interface _updateShareMenuObject {
  /**
   * 是否使用带 shareTicket 的转发[详情](./share.md#获取更多转发信息)
   */
  withShareTicket: boolean;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _switchTabObject {
  /**
   * 需要跳转的 tabBar 页面的路径（需在 app.json 的 [tabBar](../framework/config.md#tabbar) 字段定义的页面），路径后不能带参数
   */
  url: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _stopWifiObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _stopHCEObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _stopHCESuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _stopHCESuccessObject {
  /**
   * 错误信息
   */
  errMsg: string;

  /**
   * 错误码
   */
  errCode: number;
}

interface _stopCompassObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _stopBluetoothDevicesDiscoveryObject {
  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _stopBluetoothDevicesDiscoverySuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _stopBluetoothDevicesDiscoverySuccessObject {
  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _stopBeaconDiscoveryObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _stopBeaconDiscoverySuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _stopBeaconDiscoverySuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _stopAccelerometerObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startWifiObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startSoterAuthenticationObject {
  /**
   * 请求使用的可接受的生物认证方式
   */
  requestAuthModes: any;

  /**
   * 挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键是别信息，将作为result_json的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行授权确认，则可以将订单号填入此参数。
   */
  challenge: string;

  /**
   * 验证描述，即识别过程中显示在界面上的对话框提示内容
   */
  authContent: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _startSoterAuthenticationSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startSoterAuthenticationSuccessObject {
  /**
   * 错误码
   */
  errCode: number;

  /**
   * 生物认证方式
   */
  authMode: string;

  /**
   * 在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）（仅Android支持，本次认证的指纹ID）
   */
  resultJSON: string;

  /**
   * 用SOTER安全密钥对result_json的签名(SHA256withRSA/PSS, saltlen=20)
   */
  resultJSONSignature: string;

  /**
   * 接口调用结果
   */
  errMsg: string;
}

interface _startRecordObject {
  /**
   * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
   */
  success: (result: _startRecordSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startRecordSuccessObject {
  /**
   * 录音文件的临时路径
   */
  tempFilePath: any;
}

interface _startPullDownRefreshObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _startPullDownRefreshSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startPullDownRefreshSuccessObject {
  /**
   * 接口调用结果
   */
  errMsg: string;
}

interface _startHCEObject {
  /**
   * 需要注册到系统的 AID 列表，每个 AID 为 String 类型
   */
  aid_list: any;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _startHCESuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startHCESuccessObject {
  /**
   * 错误信息
   */
  errMsg: string;

  /**
   * 错误码
   */
  errCode: number;
}

interface _startCompassObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startBluetoothDevicesDiscoveryObject {
  /**
   * 蓝牙设备主 service 的 uuid 列表
   */
  services: any;

  /**
   * 是否允许重复上报同一设备， 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
   */
  allowDuplicatesKey: boolean;

  /**
   * 上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
   */
  interval: number;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _startBluetoothDevicesDiscoverySuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startBluetoothDevicesDiscoverySuccessObject {
  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _startBeaconDiscoveryObject {
  /**
   * iBeacon设备广播的 uuids
   */
  uuids: any;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _startBeaconDiscoverySuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _startBeaconDiscoverySuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _startAccelerometerObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _showToastObject {
  /**
   * 提示的内容
   */
  title: string;

  /**
   * 图标，有效值 "success", "loading", "none"
   */
  icon: string;

  /**
   * 自定义图标的本地路径，image 的优先级高于 icon
   */
  image: string;

  /**
   * 提示的延迟时间，单位毫秒，默认：1500
   */
  duration: number;

  /**
   * 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  mask: boolean;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _showTabBarRedDotObject {
  /**
   * tabBar的哪一项，从左边算起
   */
  index: number;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _showTabBarObject {
  /**
   * 是否需要动画效果，默认无
   */
  aniamtion: boolean;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _showShareMenuObject {
  /**
   * 是否使用带 shareTicket 的转发[详情](./share.md#获取更多转发信息)
   */
  withShareTicket: boolean;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _showModalObject {
  /**
   * 提示的标题
   */
  title: string;

  /**
   * 提示的内容
   */
  content: string;

  /**
   * 是否显示取消按钮，默认为 true
   */
  showCancel: boolean;

  /**
   * 取消按钮的文字，默认为"取消"，最多 4 个字符
   */
  cancelText: string;

  /**
   * 取消按钮的文字颜色，默认为"#000000"
   */
  cancelColor: any;

  /**
   * 确定按钮的文字，默认为"确定"，最多 4 个字符
   */
  confirmText: string;

  /**
   * 确定按钮的文字颜色，默认为"#3CC51F"
   */
  confirmColor: any;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _showModalSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _showModalSuccessObject {
  /**
   * 为 true 时，表示用户点击了确定按钮
   */
  confirm: boolean;

  /**
   * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
   */
  cancel: boolean;
}

interface _showLoadingObject {
  /**
   * 提示的内容
   */
  title: string;

  /**
   * 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  mask: boolean;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _showActionSheetObject {
  /**
   * 按钮的文字数组，数组长度最大为6个
   */
  itemList: any;

  /**
   * 按钮的文字颜色，默认为"#000000"
   */
  itemColor: any;

  /**
   * 接口调用成功的回调函数，详见返回参数说明
   */
  success: (result: _showActionSheetSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _showActionSheetSuccessObject {
  /**
   * 用户点击的按钮，从上到下的顺序，从0开始
   */
  tapIndex: number;
}

interface _setWifiListObject {
  /**
   * 提供预设的 Wi-Fi 信息列表
   */
  wifiList: any;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setTopBarTextObject {
  /**
   * 置顶栏文字内容
   */
  text: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setTabBarStyleObject {
  /**
   * tab 上的文字默认颜色
   */
  color: any;

  /**
   * tab 上的文字选中时的颜色
   */
  selectedColor: any;

  /**
   * tab 的背景色
   */
  backgroundColor: any;

  /**
   * tabbar上边框的颜色， 仅支持 black/white
   */
  borderStyle: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setTabBarItemObject {
  /**
   * tabBar 的哪一项，从左边算起
   */
  index: number;

  /**
   * tab 上按钮文字
   */
  text: string;

  /**
   * 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
   */
  iconPath: string;

  /**
   * 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效
   */
  selectedIconPath: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setTabBarBadgeObject {
  /**
   * tabBar的哪一项，从左边算起
   */
  index: number;

  /**
   * 显示的文本，超过 3 个字符则显示成“…”
   */
  text: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setStorageObject {
  /**
   * 本地缓存中的指定的 key
   */
  key: string;

  /**
   * 需要存储的内容
   */
  data: any;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setScreenBrightnessObject {
  /**
   * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
   */
  value: number;

  /**
   * 接口调用成功
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setNavigationBarTitleObject {
  /**
   * 页面标题
   */
  title: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setNavigationBarColorObject {
  /**
   * 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
   */
  frontColor: string;

  /**
   * 背景颜色值，有效值为十六进制颜色
   */
  backgroundColor: string;

  /**
   * 动画效果
   */
  animation: object;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _setNavigationBarColorSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setNavigationBarColorSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _setKeepScreenOnObject {
  /**
   * 是否保持屏幕常亮
   */
  keepScreenOn: boolean;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _setKeepScreenOnSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setKeepScreenOnSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _setEnableDebugObject {
  /**
   * 是否打开调试
   */
  enableDebug: boolean;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _setEnableDebugSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _setEnableDebugSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _setClipboardDataObject {
  /**
   * 需要设置的内容
   */
  data: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _sendSocketMessageObject {
  /**
   * 需要发送的内容
   */
  data: any;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _sendHCEMessageObject {
  /**
   * 二进制数据
   */
  data: any;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _sendHCEMessageSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _sendHCEMessageSuccessObject {
  /**
   * 错误信息
   */
  errMsg: string;

  /**
   * 错误码
   */
  errCode: number;
}

interface _seekBackgroundAudioObject {
  /**
   * 音乐位置，单位：秒
   */
  position: number;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _scanCodeObject {
  /**
   * 是否只能从相机扫码，不允许从相册选择图片
   */
  onlyFromCamera: boolean;

  /**
   * 扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。
   */
  scanType: any;

  /**
   * 接口调用成功的回调函数，返回内容详见返回参数说明。
   */
  success: (result: _scanCodeSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _scanCodeSuccessObject {
  /**
   * 所扫码的内容
   */
  result: any;

  /**
   * 所扫码的类型
   */
  scanType: any;

  /**
   * 所扫码的字符集
   */
  charSet: any;

  /**
   * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
   */
  path: any;
}

interface _saveVideoToPhotosAlbumObject {
  /**
   * 视频文件路径，可以是临时文件路径也可以是永久文件路径
   */
  filePath: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _saveVideoToPhotosAlbumSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _saveVideoToPhotosAlbumSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _saveImageToPhotosAlbumObject {
  /**
   * 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
   */
  filePath: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _saveImageToPhotosAlbumSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _saveImageToPhotosAlbumSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _saveFileObject {
  /**
   * 需要保存的文件的临时路径
   */
  tempFilePath: string;

  /**
   * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
   */
  success: (result: _saveFileSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _saveFileSuccessObject {
  /**
   * 文件的保存路径
   */
  savedFilePath: any;
}

interface _requestPaymentObject {
  /**
   * 平台分配的游戏appId
   */
  appId:number;
  /**
   * 游戏包名
   */
  pkgName:string;
  /**
   * qg.login成功时获得的用户token
   */
  token:string;
  /**
   * 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
   */
  timeStamp: string;
  /**
   * 下单订单号，由统一下单接口返回
   */
  orderNo:string;
  /**
   * 支付签名，CP服务端生成。注：paySign 由 CP 服务端使用 appKey (不是 appId )、orderNo、timestamp 进行签名算法生成返回。签名规则，跟"统一下单接口"的签名规则一致。
   */
  paySign:string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}

interface _requestObject {
  /**
   * 开发者服务器接口地址
   */
  url: string;

  /**
   * 请求的参数
   */
  data: any;

  /**
   * 设置请求的 header，header 中不能设置 Referer。
   */
  header: object;

  /**
   * （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   */
  method: string;

  /**
   * 如果设为json，会尝试对返回的数据做一次 JSON.parse
   */
  dataType: string;

  /**
   * 设置响应的数据类型。合法值：text、arraybuffer
   */
  responseType: string;

  /**
   * 收到开发者服务成功返回的回调函数
   */
  success: (result: _requestSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _requestSuccessObject {
  /**
   * 开发者服务器返回的数据
   */
  data: any;

  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number;

  /**
   * 开发者服务器返回的 HTTP Response Header
   */
  header: object;
}

interface _removeTabBarBadgeObject {
  /**
   * tabBar的哪一项，从左边算起
   */
  index: number;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _removeStorageObject {
  /**
   * 本地缓存中的指定的 key
   */
  key: string;

  /**
   * 接口调用的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _removeSavedFileObject {
  /**
   * 需要删除的文件路径
   */
  filePath: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _redirectToObject {
  /**
   * 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'
   */
  url: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _readBLECharacteristicValueObject {
  /**
   * 蓝牙设备 id，参考 device 对象
   */
  deviceId: string;

  /**
   * 蓝牙特征值对应服务的 uuid
   */
  serviceId: string;

  /**
   * 蓝牙特征值的 uuid
   */
  characteristicId: string;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _readBLECharacteristicValueSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _readBLECharacteristicValueSuccessObject {
  /**
   * 错误码
   */
  errCode: number;

  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _reLaunchObject {
  /**
   * 需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数
   */
  url: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _previewImageObject {
  /**
   * 当前显示图片的链接，不填则默认为 urls 的第一张
   */
  current: string;

  /**
   * 需要预览的图片链接列表
   */
  urls: any;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _playVoiceObject {
  /**
   * 需要播放的语音文件的文件路径
   */
  filePath: string;

  /**
   * 指定录音时长，到达指定的录音时长后会自动停止录音，单位：秒，默认值：60
   */
  duration: number;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _playBackgroundAudioObject {
  /**
   * 音乐链接，目前支持的格式有 m4a, aac, mp3, wav
   */
  dataUrl: string;

  /**
   * 音乐标题
   */
  title: string;

  /**
   * 封面URL
   */
  coverImgUrl: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _pageScrollToObject {
  /**
   * 滚动到页面的目标位置（单位px）
   */
  scrollTop: number;

  /**
   * 滚动动画的时长，默认300ms，单位 ms
   */
  duration: number;
}
interface _openSettingObject {
  /**
   * 接口调用成功的回调函数，返回内容详见返回参数说明。
   */
  success: (result: _openSettingSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _openSettingSuccessObject {
  /**
   * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见 [scope 列表](./authorize-index.md#scope-列表)
   */
  authSetting: object;
}

interface _openLocationObject {
  /**
   * 纬度，范围为-90~90，负数表示南纬
   */
  latitude: any;

  /**
   * 经度，范围为-180~180，负数表示西经
   */
  longitude: any;

  /**
   * 缩放比例，范围5~18，默认为18
   */
  scale: any;

  /**
   * 位置名
   */
  name: string;

  /**
   * 地址的详细说明
   */
  address: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _openDocumentObject {
  /**
   * 文件路径，可通过 downFile 获得
   */
  filePath: any;

  /**
   * 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
   */
  fileType: any;

  /**
   * 接口调用成功的回调函数
   */
  success: any;

  /**
   * 接口调用失败的回调函数
   */
  fail: any;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: any;
}
interface _openCardObject {
  /**
   * 需要打开的卡券列表，列表内参数详见[openCard 请求对象说明](#opencard-请求对象说明)
   */
  cardList: any;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _openBluetoothAdapterObject {
  /**
   * 成功则返回成功初始化信息
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _onWifiConnectedCallbackResult {
  /**
   * Wi-Fi 信息
   */
  wifi: object;
}
interface _onUserCaptureScreenCallbackResult {}
interface _onSocketMessageCallbackResult {
  /**
   * 服务器返回的消息
   */
  data: any;
}
interface _onNetworkStatusChangeCallbackResult {
  /**
   * 当前是否有网络连接
   */
  isConnected: boolean;

  /**
   * 网络类型
   */
  networkType: string;
}
interface _onHCEMessageCallbackResult {
  /**
   * 消息类型
   */
  messageType: number;

  /**
   * 客户端接收到 NFC 设备的指令，此参数当且仅当 `messageType=1` 时有效
   */
  data: any;

  /**
   * 此参数当且仅当 `messageType=2` 时有效
   */
  reason: number;
}
interface _onGetWifiListCallbackResult {
  /**
   * Wi-Fi 列表数据
   */
  wifiList: any;
}
interface _onEvaluateWifiCallbackResult {
  /**
   * Wi-Fi 信息
   */
  wifi: object;
}
interface _onCompassChangeCallbackResult {
  /**
   * 面对的方向度数
   */
  direction: number;
}
interface _onBluetoothDeviceFoundCallbackResult {
  /**
   * 新搜索到的设备列表
   */
  devices: any;
}
interface _onBluetoothAdapterStateChangeCallbackResult {
  /**
   * 蓝牙适配器是否可用
   */
  available: boolean;

  /**
   * 蓝牙适配器是否处于搜索状态
   */
  discovering: boolean;
}
interface _onBeaconUpdateCallbackResult {
  /**
   * 当前搜寻到的所有 iBeacon 设备列表
   */
  beacons: any;
}
interface _onBeaconServiceChangeCallbackResult {
  /**
   * 服务目前是否可用
   */
  available: boolean;

  /**
   * 目前是否处于搜索状态
   */
  discovering: boolean;
}
interface _onBLEConnectionStateChangeCallbackResult {
  /**
   * 蓝牙设备 id，参考 device 对象
   */
  deviceId: string;

  /**
   * 连接目前的状态
   */
  connected: boolean;
}
interface _onBLECharacteristicValueChangeCallbackResult {
  /**
   * 蓝牙设备 id，参考 device 对象
   */
  deviceId: string;

  /**
   * 特征值所属服务 uuid
   */
  serviceId: string;

  /**
   * 特征值 uuid
   */
  characteristicId: string;

  /**
   * 特征值最新的值 **（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**
   */
  value: any;
}
interface _onAccelerometerChangeCallbackResult {
  /**
   * X 轴
   */
  x: number;

  /**
   * Y 轴
   */
  y: number;

  /**
   * Z 轴
   */
  z: number;
}
interface _notifyBLECharacteristicValueChangeObject {
  /**
   * 蓝牙设备 id，参考 device 对象
   */
  deviceId: string;

  /**
   * 蓝牙特征值对应服务的 uuid
   */
  serviceId: string;

  /**
   * 蓝牙特征值的 uuid
   */
  characteristicId: string;

  /**
   * true: 启用 notify; false: 停用 notify
   */
  state: boolean;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _notifyBLECharacteristicValueChangeSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _notifyBLECharacteristicValueChangeSuccessObject {
  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _navigateToMiniProgramObject {
  /**
   * 要打开的小程序 appId
   */
  appId: string;

  /**
   * 打开的页面路径，如果为空则打开首页
   */
  path: string;

  /**
   * 需要传递给目标小程序的数据，目标小程序可在 `App.onLaunch()`，`App.onShow()` 中获取到这份数据。[详情](../framework/app-service/app.md)
   */
  extraData: object;

  /**
   * 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release
   */
  envVersion: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _navigateToMiniProgramSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _navigateToMiniProgramSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _navigateToObject {
  /**
   * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'
   */
  url: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _navigateBackMiniProgramObject {
  /**
   * 需要返回给上一个小程序的数据，上一个小程序可在 `App.onShow()` 中获取到这份数据。[详情](../framework/app-service/app.md)
   */
  extraData: object;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _navigateBackMiniProgramSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _navigateBackMiniProgramSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _navigateBackObject {
  /**
   * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
   */
  delta: number;
}
interface _makeVoIPCallObject {
  /**
   * 是否展示切换按钮以允许用户转换到后置摄像头
   */
  allowBackCamera: boolean;

  /**
   * 是否显示对端视频流
   */
  showOther: boolean;

  /**
   * 客服头像的图像链接
   */
  avatarUrl: string;

  /**
   * 用于区分业务上下文的透传值
   */
  context: string;

  /**
   * 返回用户选择的收货地址信息
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _makePhoneCallObject {
  /**
   * 需要拨打的电话号码
   */
  phoneNumber: string;

  /**
   * 接口调用成功的回调
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _loginObject {
  /**
   * 游戏包名
   */
  pkgName: string;
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _loginSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _loginSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;

  /**
   * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
   */
  code: string;
}

interface _hideTabBarRedDotObject {
  /**
   * tabBar的哪一项，从左边算起
   */
  index: number;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _hideTabBarObject {
  /**
   * 是否需要动画效果，默认无
   */
  aniamtion: boolean;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _hideShareMenuObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getWifiListObject {
  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getWeRunDataObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getWeRunDataSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getWeRunDataSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;

  /**
   * 包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](./signature.md#加密数据解密算法)
   */
  encryptedData: string;

  /**
   * 加密算法的初始向量，详细见[加密数据解密算法](./signature.md#加密数据解密算法)
   */
  iv: string;
}

interface _getUserInfoObject {
  /**
   * 是否带上登录态信息
   */
  withCredentials: boolean;

  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。
   */
  lang: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getUserInfoSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getUserInfoSuccessObject {
  /**
   * 用户信息对象，不包含 openid 等敏感信息
   */
  userInfo: object;

  /**
   * 不包括敏感信息的原始数据字符串，用于计算签名。
   */
  rawData: string;

  /**
   * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档 [signature](./signature.md)。
   */
  signature: string;

  /**
   * 包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](./signature.md#加密数据解密算法)
   */
  encryptedData: string;

  /**
   * 加密算法的初始向量，详细见[加密数据解密算法](./signature.md#加密数据解密算法)
   */
  iv: string;
}

interface _getSystemInfoSyncReturnValue {
  /**
   * 手机品牌
   */
  brand: any;

  /**
   * 手机型号
   */
  model: any;

  /**
   * 设备像素比
   */
  pixelRatio: any;

  /**
   * 屏幕宽度
   */
  screenWidth: any;

  /**
   * 屏幕高度
   */
  screenHeight: any;

  /**
   * 可使用窗口宽度
   */
  windowWidth: any;

  /**
   * 可使用窗口高度
   */
  windowHeight: any;

  /**
   * 状态栏的高度
   */
  statusBarHeight: any;

  /**
   * 微信设置的语言
   */
  language: any;

  /**
   * 微信版本号
   */
  version: any;

  /**
   * 操作系统版本
   */
  system: any;

  /**
   * 客户端平台
   */
  platform: any;

  /**
   * 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
   */
  fontSizeSetting: any;

  /**
   * 客户端基础库版本
   */
  SDKVersion: any;
}

interface _getSystemInfoObject {
  /**
   * 接口调用成功的回调
   */
  success: (result: _getSystemInfoSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getSystemInfoSuccessObject {
  /**
   * 手机品牌
   */
  brand: any;

  /**
   * 手机型号
   */
  model: any;

  /**
   * 设备像素比
   */
  pixelRatio: any;

  /**
   * 屏幕宽度
   */
  screenWidth: any;

  /**
   * 屏幕高度
   */
  screenHeight: any;

  /**
   * 可使用窗口宽度
   */
  windowWidth: any;

  /**
   * 可使用窗口高度
   */
  windowHeight: any;

  /**
   * 状态栏的高度
   */
  statusBarHeight: any;

  /**
   * 微信设置的语言
   */
  language: any;

  /**
   * 微信版本号
   */
  version: any;

  /**
   * 操作系统版本
   */
  system: any;

  /**
   * 客户端平台
   */
  platform: any;

  /**
   * 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
   */
  fontSizeSetting: any;

  /**
   * 客户端基础库版本
   */
  SDKVersion: any;
}

interface _getStorageInfoObject {
  /**
   * 接口调用的回调函数，详见返回参数说明
   */
  success: (result: _getStorageInfoSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getStorageInfoSuccessObject {
  /**
   * 当前storage中所有的key
   */
  keys: any;

  /**
   * 当前占用的空间大小, 单位kb
   */
  currentSize: number;

  /**
   * 限制的空间大小，单位kb
   */
  limitSize: number;
}

interface _getStorageObject {
  /**
   * 本地缓存中的指定的 key
   */
  key: string;

  /**
   * 接口调用的回调函数,res = {data: key对应的内容}
   */
  success: (result: _getStorageSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getStorageSuccessObject {
  /**
   * key对应的内容
   */
  data: string;
}

interface _getShareInfoObject {
  /**
   * shareTicket
   */
  shareTicket: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getShareInfoSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getShareInfoSuccessObject {
  /**
   * 错误信息
   */
  errMsg: string;

  /**
   * 包括敏感数据在内的完整转发信息的加密数据，详细见[加密数据解密算法](./signature.md#加密数据解密算法)
   */
  encryptedData: string;

  /**
   * 加密算法的初始向量，详细见[加密数据解密算法](./signature.md#加密数据解密算法)
   */
  iv: string;
}

interface _getSettingObject {
  /**
   * 接口调用成功的回调函数，返回内容详见返回参数说明。
   */
  success: (result: _getSettingSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getSettingSuccessObject {
  /**
   * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见 [scope 列表](./authorize-index.md#scope-列表)
   */
  authSetting: object;
}

interface _getScreenBrightnessObject {
  /**
   * 接口调用成功
   */
  success: (result: _getScreenBrightnessSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getScreenBrightnessSuccessObject {
  /**
   * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
   */
  value: number;
}

interface _getSavedFileListObject {
  /**
   * 接口调用成功的回调函数，返回结果见`success返回参数说明`
   */
  success: (result: _getSavedFileListSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getSavedFileListSuccessObject {
  /**
   * 接口调用结果
   */
  errMsg: string;

  /**
   * 文件列表
   */
  fileList: any;
}

interface _getSavedFileInfoObject {
  /**
   * 文件路径
   */
  filePath: string;

  /**
   * 接口调用成功的回调函数，返回结果见`success返回参数说明`
   */
  success: (result: _getSavedFileInfoSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getSavedFileInfoSuccessObject {
  /**
   * 接口调用结果
   */
  errMsg: string;

  /**
   * 文件大小，单位B
   */
  size: number;

  /**
   * 文件保存时的时间戳，从1970/01/01 08:00:00 到该时刻的秒数
   */
  createTime: number;
}

interface _getOpenDeviceIdObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getOpenDeviceIdSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getOpenDeviceIdSuccessObject {
  /**
   * 接口调用结果
   */
  errMsg: string;

  /**
   * 包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](./signature.md#加密数据解密算法)
   */
  encryptedData: string;

  /**
   * 加密算法的初始向量，详细见[加密数据解密算法](./signature.md#加密数据解密算法)
   */
  iv: string;
}

interface _getNetworkTypeObject {
  /**
   * 接口调用成功，返回网络类型 networkType
   */
  success: (result: _getNetworkTypeSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getNetworkTypeSuccessObject {
  /**
   * 网络类型
   */
  networkType: any;
}

interface _getLocationObject {
  /**
   * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于`wx.openLocation`的坐标
   */
  type: string;

  /**
   * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
   */
  altitude: boolean;

  /**
   * 接口调用成功的回调函数，返回内容详见返回参数说明。
   */
  success: (result: _getLocationSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getLocationSuccessObject {
  /**
   * 纬度，浮点数，范围为-90~90，负数表示南纬
   */
  latitude: any;

  /**
   * 经度，浮点数，范围为-180~180，负数表示西经
   */
  longitude: any;

  /**
   * 速度，浮点数，单位m/s
   */
  speed: any;

  /**
   * 位置的精确度
   */
  accuracy: any;

  /**
   * 高度，单位 m
   */
  altitude: any;

  /**
   * 垂直精度，单位 m（Android 无法获取，返回 0）
   */
  verticalAccuracy: any;

  /**
   * 水平精度，单位 m
   */
  horizontalAccuracy: any;
}

interface _getImageInfoObject {
  /**
   * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
   */
  src: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getImageInfoSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getImageInfoSuccessObject {
  /**
   * 图片宽度，单位px
   */
  width: number;

  /**
   * 图片高度，单位px
   */
  height: number;

  /**
   * 返回图片的本地路径
   */
  path: string;
}

interface _getHCEStateObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getHCEStateSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getHCEStateSuccessObject {
  /**
   * 错误信息
   */
  errMsg: string;

  /**
   * 错误码
   */
  errCode: number;
}

interface _getFileInfoObject {
  /**
   * 本地文件路径
   */
  filePath: string;

  /**
   * 计算文件摘要的算法，默认值 md5，有效值：md5，sha1
   */
  digestAlgorithm: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getFileInfoSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getFileInfoSuccessObject {
  /**
   * 文件大小，单位：B
   */
  size: number;

  /**
   * 按照传入的 digestAlgorithm 计算得出的的文件摘要
   */
  digest: string;

  /**
   * 调用结果
   */
  errMsg: string;
}

interface _getExtConfigSyncReturnValue {
  /**
   * 第三方平台自定义的数据
   */
  extConfig: object;
}

interface _getExtConfigObject {
  /**
   * 返回第三方平台自定义的数据
   */
  success: (result: _getExtConfigSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getExtConfigSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;

  /**
   * 第三方平台自定义的数据
   */
  extConfig: object;
}

interface _getConnectedWifiObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getConnectedWifiSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getConnectedWifiSuccessObject {
  /**
   * Wi-Fi 信息
   */
  wifi: object;
}

interface _getConnectedBluetoothDevicesObject {
  /**
   * 蓝牙设备主 service 的 uuid 列表
   */
  services: any;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _getConnectedBluetoothDevicesSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getConnectedBluetoothDevicesSuccessObject {
  /**
   * 搜索到的设备列表
   */
  devices: any;

  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _getClipboardDataObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getClipboardDataSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getClipboardDataSuccessObject {
  /**
   * 剪贴板的内容
   */
  data: string;
}

interface _getBluetoothDevicesObject {
  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _getBluetoothDevicesSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getBluetoothDevicesSuccessObject {
  /**
   * uuid 对应的的已连接设备列表
   */
  devices: any;

  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _getBluetoothAdapterStateObject {
  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _getBluetoothAdapterStateSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getBluetoothAdapterStateSuccessObject {
  /**
   * 是否正在搜索设备
   */
  discovering: boolean;

  /**
   * 蓝牙适配器是否可用
   */
  available: boolean;

  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _getBeaconsObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getBeaconsSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getBeaconsSuccessObject {
  /**
   * iBeacon 设备列表
   */
  beacons: any;

  /**
   * 调用结果
   */
  errMsg: string;
}

interface _getBackgroundAudioPlayerStateObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _getBackgroundAudioPlayerStateSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getBackgroundAudioPlayerStateSuccessObject {
  /**
   * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
   */
  duration: any;

  /**
   * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
   */
  currentPosition: any;

  /**
   * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
   */
  status: any;

  /**
   * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
   */
  downloadPercent: any;

  /**
   * 歌曲数据链接，只有在当前有音乐播放时返回
   */
  dataUrl: any;
}

interface _getBackgroundAudioManagerReturnValue {
  /**
   * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
   */
  duration: number;

  /**
   * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
   */
  currentTime: number;

  /**
   * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
   */
  paused: boolean;

  /**
   * 音频的数据源，默认为空字符串，**当设置了新的 src 时，会自动开始播放** ，目前支持的格式有 m4a, aac, mp3, wav
   */
  src: string;

  /**
   * 音频开始播放的位置（单位：s）
   */
  startTime: number;

  /**
   * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
   */
  buffered: number;

  /**
   * 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
   */
  title: string;

  /**
   * 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
   */
  epname: string;

  /**
   * 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
   */
  singer: string;

  /**
   * 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
   */
  coverImgUrl: string;

  /**
   * 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
   */
  webUrl: string;

  /**
   * 播放
   */
  play: () => void;

  /**
   * 暂停
   */
  pause: () => void;

  /**
   * 停止
   */
  stop: () => void;

  /**
   * 跳转到指定位置，单位 s
   */
  seek: () => void;

  /**
   * 背景音频进入可以播放状态，但不保证后面可以流畅播放
   */
  onCanplay: () => void;

  /**
   * 背景音频播放事件
   */
  onPlay: () => void;

  /**
   * 背景音频暂停事件
   */
  onPause: () => void;

  /**
   * 背景音频停止事件
   */
  onStop: () => void;

  /**
   * 背景音频自然播放结束事件
   */
  onEnded: () => void;

  /**
   * 背景音频播放进度更新事件
   */
  onTimeUpdate: () => void;

  /**
   * 用户在系统音乐播放面板点击上一曲事件（iOS only）
   */
  onPrev: () => void;

  /**
   * 用户在系统音乐播放面板点击下一曲事件（iOS only）
   */
  onNext: () => void;

  /**
   * 背景音频播放错误事件
   */
  onError: () => void;

  /**
   * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
   */
  onWaiting: () => void;
}

interface _getBLEDeviceServicesObject {
  /**
   * 蓝牙设备 id，参考 getDevices 接口
   */
  deviceId: string;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _getBLEDeviceServicesSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getBLEDeviceServicesSuccessObject {
  /**
   * 设备服务列表
   */
  services: any;

  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _getBLEDeviceCharacteristicsObject {
  /**
   * 蓝牙设备 id，参考 device 对象
   */
  deviceId: string;

  /**
   * 蓝牙服务 uuid
   */
  serviceId: string;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _getBLEDeviceCharacteristicsSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _getBLEDeviceCharacteristicsSuccessObject {
  /**
   * 设备特征值列表
   */
  characteristics: any;

  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _downloadFileObject {
  /**
   * 下载资源的 url
   */
  url: string;

  /**
   * HTTP 请求的 Header，Header 中不能设置 Referer
   */
  header: object;
  /**
   * 	指定文件下载后存储的路径 
   */
  filePath?:string;
  /**
   * 	接口调用成功的回调函
   */
  success: (result: _downloadFileSuccessObject) => void;

  /**
   * 	接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 	接口调用结束的回调函数
   */
  complete: () => void;
}
interface _downloadFileSuccessObject {
  /**
   * 临时文件路径，下载后的文件会存储到一个临时文件
   */
  tempFilePath: string;

  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number;

  /**
   * 错误码
   */
  errCode:string;

  /**
  * 错误信息
  */
  errMsg:number;
}

interface _createBLEConnectionObject {
  /**
   * 蓝牙设备 id，参考 getDevices 接口
   */
  deviceId: string;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _createBLEConnectionSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _createBLEConnectionSuccessObject {
  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _createAnimationObject {
  /**
   * 动画持续时间，单位ms
   */
  duration: any;

  /**
   * 定义动画的效果
   */
  timingFunction: string;

  /**
   * 动画延迟时间，单位 ms
   */
  delay: any;

  /**
   * 设置transform-origin
   */
  transformOrigin: string;
}
interface _connectWifiObject {
  /**
   * Wi-Fi 设备ssid
   */
  SSID: string;

  /**
   * Wi-Fi 设备bssid
   */
  BSSID: string;

  /**
   * Wi-Fi 设备密码
   */
  password: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _connectSocketObject {
  /**
   * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
   */
  url: string;

  /**
   * HTTP Header , header 中不能设置 Referer
   */
  header: object;

  /**
   * 默认是GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   */
  method: string;

  /**
   * 子协议数组
   */
  protocols: any;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _closeSocketObject {
  /**
   * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
   */
  code: number;

  /**
   * 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
   */
  reason: string;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _closeBluetoothAdapterObject {
  /**
   * 成功则返回成功关闭模块信息
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _closeBLEConnectionObject {
  /**
   * 蓝牙设备 id，参考 getDevices 接口
   */
  deviceId: string;

  /**
   * 成功则返回本机蓝牙适配器状态
   */
  success: (result: _closeBLEConnectionSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _closeBLEConnectionSuccessObject {
  /**
   * 成功：ok，错误：详细信息
   */
  errMsg: string;
}

interface _chooseVideoObject {
  /**
   * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
   */
  sourceType: any;

  /**
   * 是否压缩所选的视频源文件，默认值为true，需要压缩
   */
  compressed: any;

  /**
   * 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
   */
  maxDuration: number;

  /**
   * 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
   */
  success: (result: _chooseVideoSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _chooseVideoSuccessObject {
  /**
   * 选定视频的临时文件路径
   */
  tempFilePath: any;

  /**
   * 选定视频的时间长度
   */
  duration: any;

  /**
   * 选定视频的数据量大小
   */
  size: any;

  /**
   * 返回选定视频的长
   */
  height: any;

  /**
   * 返回选定视频的宽
   */
  width: any;
}

interface _chooseLocationObject {
  /**
   * 接口调用成功的回调函数，返回内容详见返回参数说明。
   */
  success: (result: _chooseLocationSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _chooseLocationSuccessObject {
  /**
   * 位置名称
   */
  name: any;

  /**
   * 详细地址
   */
  address: any;

  /**
   * 纬度，浮点数，范围为-90~90，负数表示南纬
   */
  latitude: any;

  /**
   * 经度，浮点数，范围为-180~180，负数表示西经
   */
  longitude: any;
}

interface _chooseInvoiceTitleObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _chooseInvoiceTitleSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _chooseInvoiceTitleSuccessObject {
  /**
   * 抬头类型（0：单位，1：个人）
   */
  type: string;

  /**
   * 抬头名称
   */
  title: string;

  /**
   * 抬头税号
   */
  taxNumber: string;

  /**
   * 单位地址
   */
  companyAddress: string;

  /**
   * 手机号码
   */
  telephone: string;

  /**
   * 银行名称
   */
  bankName: string;

  /**
   * 银行账号
   */
  bankAccount: string;

  /**
   * 接口调用结果
   */
  errMsg: string;
}

interface _chooseImageObject {
  /**
   * 最多可以选择的图片张数，默认9
   */
  count: number;

  /**
   * original 原图，compressed 压缩图，默认二者都有
   */
  sizeType: any;

  /**
   * album 从相册选图，camera 使用相机，默认二者都有
   */
  sourceType: any;

  /**
   * 成功则返回图片的本地文件路径列表 tempFilePaths
   */
  success: (result: _chooseImageSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _chooseImageSuccessObject {
  /**
   * 图片的本地文件路径列表
   */
  tempFilePaths: any;

  /**
   * 图片的本地文件列表，每一项是一个 File 对象
   */
  tempFiles: any;
}

interface _chooseContactObject {
  /**
   * 返回用户选择的联系人信息
   */
  success: (result: _chooseContactSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _chooseContactSuccessObject {
  /**
   * 电话号码
   */
  phoneNumber: any;

  /**
   * 联系人名称
   */
  displayName: any;
}

interface _chooseAddressObject {
  /**
   * 返回用户选择的收货地址信息
   */
  success: (result: _chooseAddressSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _chooseAddressSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;

  /**
   * 收货人姓名
   */
  userName: string;

  /**
   * 邮编
   */
  postalCode: string;

  /**
   * 国标收货地址第一级地址
   */
  provinceName: string;

  /**
   * 国标收货地址第二级地址
   */
  cityName: string;

  /**
   * 国标收货地址第三级地址
   */
  countyName: string;

  /**
   * 详细收货地址信息
   */
  detailInfo: string;

  /**
   * 收货地址国家码
   */
  nationalCode: string;

  /**
   * 收货人手机号码
   */
  telNumber: string;
}

interface _checkSessionObject {
  /**
   * 接口调用成功的回调函数，登录态未过期
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数，登录态已过期
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _checkIsSupportSoterAuthenticationObject {
  /**
   * 接口调用成功的回调函数
   */
  success: (result: _checkIsSupportSoterAuthenticationSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _checkIsSupportSoterAuthenticationSuccessObject {
  /**
   * 该设备支持的可被SOTER识别的生物识别方式
   */
  supportMode: any;

  /**
   * 接口调用结果
   */
  errMsg: string;
}

interface _checkIsSoterEnrolledInDeviceObject {
  /**
   * 认证方式
   */
  checkAuthMode: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _checkIsSoterEnrolledInDeviceSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _checkIsSoterEnrolledInDeviceSuccessObject {
  /**
   * 是否已录入信息
   */
  isEnrolled: boolean;

  /**
   * 接口调用结果
   */
  errMsg: string;
}

interface _canvasToTempFilePathObject {
  /**
   * 画布x轴起点（默认0）
   */
  x: number;

  /**
   * 画布y轴起点（默认0）
   */
  y: number;

  /**
   * 画布宽度（默认为canvas宽度-x）
   */
  width: number;

  /**
   * 画布高度（默认为canvas高度-y）
   */
  height: number;

  /**
   * 输出图片宽度（默认为width）
   */
  destWidth: number;

  /**
   * 输出图片高度（默认为height）
   */
  destHeight: number;

  /**
   * 画布标识，传入 [`<canvas/>`](../../component/canvas.md) 的 canvas-id
   */
  canvasId: string;

  /**
   * 目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png'
   */
  fileType: string;

  /**
   * 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
   */
  quality: number;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _canvasPutImageDataObject {
  /**
   * 画布标识，传入 [`<canvas />`](../../component/canvas.md) 的 canvas-id
   */
  canvasId: string;

  /**
   * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
   */
  data: any;

  /**
   * 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）
   */
  x: number;

  /**
   * 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）
   */
  y: number;

  /**
   * 源图像数据矩形区域的宽度
   */
  width: number;

  /**
   * 源图像数据矩形区域的高度
   */
  height: number;

  /**
   * 接口调用成功的回调函数
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _canvasGetImageDataObject {
  /**
   * 画布标识，传入 [`<canvas />`](../../component/canvas.md) 的 canvas-id
   */
  canvasId: string;

  /**
   * 将要被提取的图像数据矩形区域的左上角 x 坐标
   */
  x: number;

  /**
   * 将要被提取的图像数据矩形区域的左上角 y 坐标
   */
  y: number;

  /**
   * 将要被提取的图像数据矩形区域的宽度
   */
  width: number;

  /**
   * 将要被提取的图像数据矩形区域的高度
   */
  height: number;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _canvasGetImageDataSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _canvasGetImageDataSuccessObject {
  /**
   *
   */
  errMsg: string;

  /**
   * 图像数据矩形的宽度
   */
  width: number;

  /**
   * 图像数据矩形的高度
   */
  height: number;

  /**
   * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
   */
  data: any;
}

interface _authorizeObject {
  /**
   * 需要获取权限的scope，详见 [scope 列表](./authorize-index.md#scope-列表)
   */
  scope: string;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _authorizeSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _authorizeSuccessObject {
  /**
   * 调用结果
   */
  errMsg: string;
}

interface _addPhoneContactObject {
  /**
   * 头像本地文件路径
   */
  photoFilePath: string;

  /**
   * 昵称
   */
  nickName: string;

  /**
   * 姓氏
   */
  lastName: string;

  /**
   * 中间名
   */
  middleName: string;

  /**
   * 名字
   */
  firstName: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 手机号
   */
  mobilePhoneNumber: string;

  /**
   * 微信号
   */
  weChatNumber: string;

  /**
   * 联系地址国家
   */
  addressCountry: string;

  /**
   * 联系地址省份
   */
  addressState: string;

  /**
   * 联系地址城市
   */
  addressCity: string;

  /**
   * 联系地址街道
   */
  addressStreet: string;

  /**
   * 联系地址邮政编码
   */
  addressPostalCode: string;

  /**
   * 公司
   */
  organization: string;

  /**
   * 职位
   */
  title: string;

  /**
   * 工作传真
   */
  workFaxNumber: string;

  /**
   * 工作电话
   */
  workPhoneNumber: string;

  /**
   * 公司电话
   */
  hostNumber: string;

  /**
   * 电子邮件
   */
  email: string;

  /**
   * 网站
   */
  url: string;

  /**
   * 工作地址国家
   */
  workAddressCountry: string;

  /**
   * 工作地址省份
   */
  workAddressState: string;

  /**
   * 工作地址城市
   */
  workAddressCity: string;

  /**
   * 工作地址街道
   */
  workAddressStreet: string;

  /**
   * 工作地址邮政编码
   */
  workAddressPostalCode: string;

  /**
   * 住宅传真
   */
  homeFaxNumber: string;

  /**
   * 住宅电话
   */
  homePhoneNumber: string;

  /**
   * 住宅地址国家
   */
  homeAddressCountry: string;

  /**
   * 住宅地址省份
   */
  homeAddressState: string;

  /**
   * 住宅地址城市
   */
  homeAddressCity: string;

  /**
   * 住宅地址街道
   */
  homeAddressStreet: string;

  /**
   * 住宅地址邮政编码
   */
  homeAddressPostalCode: string;

  /**
   * 接口调用成功
   */
  success: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _addCardObject {
  /**
   * 需要添加的卡券列表，列表内对象说明请参见[请求对象说明](#请求对象说明)
   */
  cardList: any;

  /**
   * 接口调用成功的回调函数
   */
  success: (result: _addCardSuccessObject) => void;

  /**
   * 接口调用失败的回调函数
   */
  fail: () => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: () => void;
}
interface _addCardSuccessObject {
  /**
   * 卡券添加结果列表，列表内对象说明请详见[返回对象说明](#返回对象说明)
   */
  cardList: any;
}

interface _ShareAppMessageReturnObject {
  /**
   * 分享标题。默认为当前小程序名称。
   */

  title: string;

  /**
   * 分享路径。默认为当前页面 path，必须是以 / 开头的完整路径。
   */

  path: string;
}

interface _AppShowOptions {
  /**
   * 打开小程序的路径
   */
  path: string;

  /**
   * 打开小程序的query
   */
  query: object;

  /**
   * 打开小程序的场景值
   */
  scene: number;

  /**
   * shareTicket
   */
  shareTicket: string;
}

declare interface _AppOptions {
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch?: (options: _AppShowOptions) => void;

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow?: (options: _AppShowOptions) => void;

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide?: () => void;

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError?: (msg: string) => void;
}

interface _BatteryInfo{
  /**
   * 	设备电量，范围 1 - 100
   */
  level:number;
  /**
   * 是否正在充电中
   */
  isCharging:number;
}

interface _FileSystemManager{
  /**
   * 判断文件/目录是否存在
   */
  access:(object:any)=>void;
  /**
   * FileSystemManager.access 的同步版本，判断文件/目录是否存在
   */
  accessSync:(path:string)=>any;
  /**
   * 在文件结尾追加内容
   */
  appendFile:(object:any)=>void;
  /**
   * FileSystemManager.appendFile 的同步版本，在文件结尾追加内容
   * @param 要追加内容的文件路径
   * @param 要追加的文本或二进制数据
   * @param 指定写入文件的字符编码，当前支持：utf8、binary
   */
  appendFileSync:(filePath:string,data:any,encoding?:string)=>any;
  /**
   * 复制文件异步方式
   */
  copyFile:(object:any)=>void;
  /**
   * FileSystemManager.copyFile 的同步版本，拷贝文件
   * @param 源文件路径，只可以是普通文件
   * @param 	目标文件路径
   */
  copyFileSync:(srcPath:string,destPath:string)=>boolean;
  /**
   * 获取本地临时文件或本地用户文件的文件信息
   */
  getFileInfo:(object:any) => void;
  /**
   * 创建目录
   */
  mkdir:(object:any)=>void;
  /**
   * FileSystemManager.mkdir 的同步版本，创建目录
   * @param 创建的目录路径
   * @param 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。
   */
  mkdirSync:(dirPath:string,recursive:string)=>any;
  /**
   * 读取本地文件内容异步方式
   */
  readFile:(object:any)=>void;
  /**
   * FileSystemManager.readFile 的同步版本，读取文件
   * @param 	要读取的文件的路径
   * @param 指定读取文件的字符编码，默认为 binary
   */
  readFileSync:(filePath:string,encoding?:string)=>any;
  /**
   * 重命名文件，可以把文件从 oldPath 移动到 newPath
   */
  rename:(object:any)=>void;
  /**
   * FileSystemManager.rename 的同步版本，重命名文件
   */
  renameSync:(oldPath:string,newPath:string)=>any;
  /**
   * 删除目录
   */
  rmdir:(object:any)=>void;
  /**
   * FileSystemManager.rmdir 的同步版本，移除目录
   * @param 要删除的目录路径
   * @param 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。
   */
  rmdirSync:(dirPath:string,recursive?:boolean)=>void;
  /**
   * 读取目录内文件列表
   */
  readdir:(object:any)=>void;
  /**
   * FileSystemManager.readdir 的同步版本，读取目录
   */
  readdirSync:(dirPath:string)=>Array<any>;
  /**
   * 删除文件
   */
  unlink:(object:any)=>void;
  /**
   * FileSystemManager.unlink 的同步版本，删除文件
   */
  unlinkSync:(filePath:string)=>any;
  /**
   * 解压文件
   */
  unzip:(object:any)=>void;
  /**
   * 写文件异步方式
   */
  writeFile:(object:any)=>void;
  /**
   * FileSystemManager.writeFile 的同步版本，写文件
   * @param 要写入的文件路径
   * @param 要写入的文本或二进制数据
   * @param 指定写入文件的字符编码 utf8 or binary，默认值为 utf8
   * @param 默认为 false，覆盖旧文件
   */
  writeFileSync:(filePath:string, data:any, encoding?:string, append?:boolean)=>boolean;
  /**
   * 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
   */
  saveFile:(object:any)=>void;
  /**
   * FileSystemManager.saveFile 的同步版本，保存临时文件到本地。
   * @param 临时存储文件路径
   * @param 要存储的文件路径
   * @returns	存储后的文件路径
   */
  saveFileSync:(tempFilePath:string, filePath?:string)=>string;
  /**
   * 删除该OPPO小游戏下已保存的本地缓存文件
   */
  removeSavedFile:(object:any )=>void;
  /**
   * 获取文件 Stats 对象
   */
  stat:(object:any)=>void;
 
}

interface _LoadSubpackageTask{
  /**
   * 用于获取分包加载状态
   */
  onProgressUpdate:(callback:Function)=>void;
}

interface _NativeAd{
  /**
   * 获取广告数据，成功回调 onLoad，失败回调 onError
   */
  load:()=>void;
  /**
   * 销毁广告组件，释放资源
   */
  destroy:()=>void;
  /**
   * 上报广告曝光，一个广告只有一次上报有效，adId 为 load 方法获取的广告数据的 adId 字段
   */
  reportAdShow:(callback:Function) => void;
  /**
   * 上报广告点击，一个广告只有一次上报有效，adId 为 load 方法获取的广告数据的 adId 字段
   */
  reportAdClick:(callback:Function) => void;
  /**
   * 设置广告加载成功回调
   */
  onLoad:(callback:Function)=>void;
  /**
   * 移除广告加载成功回调
  */
  offLoad:(callback:Function)=>void;
  /**
   * 设置出错回调
   */
  onError:(callback:Function)=>void;
  /**
   * 移除出错回调
   */
  offError:(callback:Function)=>void;
}

interface _InsertAd{
  /**
   * 拉取插屏广告资源，成功回调 onLoad，失败回调 onError
   */
  load:()=>void;
  /**
   * 展示插屏广告，成功回调 onShow，失败回调 onError
   */
  show:()=>void;
  /**
   * 销毁组件，释放资源
   */
  destroy:()=>void;
  /**
   * 设置插屏广告加载成功回调
   */
  onLoad:(callback:Function)=>void;
  /**
   * 移除插屏广告加载成功回调
   */
  offLoad:(callback:Function)=>void;
  /**
   * 设置插屏广告展示成功回调
   */
  onShow:(callback:Function)=>void;
  /**
   * 移除banner 隐藏回调
   */
  offShow:(callback:Function)=>void;
  /**
   * 设置插屏广告失败回调
   */
  onError:(callback:Function)=>void;
  /**
   * 移除插屏广告失败回调
   */
  offError:(callback:Function)=>void;
}

interface _VideoAd{
  /**
   * 手动拉取广告，成功回调 onLoad，失败回调 onError
   */
  load:()=>void;
  /**
   * 视频广告组件默认是隐藏的，调用 show 方法展示广告，成功回调 onVideoStart，失败回调 onError.
   * 开发者不可控制视频广告的关闭，只有用户主动点击关闭按钮才会关闭广告
   */
  show:()=>void;
  /**
   * 销毁组件，释放资源
   */
  destroy:()=>void;
  /**
   * 设置视频广告加载成功回调
   */
  onLoad:(callback:Function)=>void;
  /**
   * 移除视频广告加载成功回调
   */
  offLoad:(callback:Function)=>void;
  /**
   * 设置视频广告开始播放回调
   */
  onVideoStart:(callback:Function)=>void;
  /**
   * 移除视频广告开始播放回调
   */
  offVideoStart:(callback:Function)=>void;
  /**
   * 设置视频奖励发放回调
   */
  onRewarded:(callback:Function)=>void;
  /**
   * 移除视频奖励发放回调
   */
  offRewarded:(callback:Function)=>void;
  /**
   * 设置视频广告出错回调
   */
  onError:(callback:Function)=>void;
  /**
   * 移除视频广告出错回调
   */
  offError:(callback:Function)=>void;
}

interface _BannerAd{
  /**
   * 调用 load 方法请求展示 banner，成功的时候回调 onShow，出错的时候回调 onError
   */
  show:()=>void;
  /**
   * 隐藏 banner，成功回调 onHide, 出错的时候回调 onError
   */
  hide:()=>void;
  /**
   * 设置 banner 成功展示回调
   */
  onShow:(callback:Function)=>void;
  /**
   * 移除 banner 成功展示回调
   */
  offShow:(callback:Function)=>void;
  /**
   * 设置 banner 隐藏回调
   */
  onHide:(callback:Function)=>void;
  /**
   * 移除banner 隐藏回调
   */
  offHide:(callback:Function)=>void;
  /**
   * 设置失败回调
   */
  onError:(callback:Function)=>void;
  /**
   * 移除失败回调
   */
  offError:(callback:Function)=>void;
}

interface _Battle {
  /**
   * 对战初始化。初始化完成后可以获得对战信息，进行其他操作。（游戏双方都调用该方法后，才能触发success回调）
   */
  init :(object:any) => void;
  /**
   * 发送游戏当前的状态给平台。**注：调用postGameStatus设置游戏状态时，每个状态都只能调用一次，不要重复调用。
   */
  postGameStatus :(object:any) =>void;
  /**
   * 平台通知游戏开始。平台主动调此方法触发开始逻辑。（双方都调用postGameStatus且status为1时，才会触发该方法）
   */
  onGameStart:(callback:Function)=>void;
  /**
   * 弹出确认对话框，提示是否退出对局。**注：该方法用于CP自己实现了退出按钮的通用处理逻辑，一般情况下不需要调用该方法；success回调不代表真正退出，仅将退出请求发送到服务端，退出游戏还是需要通过服务端驱动。
   */
  quit:(object:any)=>void;
  /**
   * 游戏发送消息。
   */
  postMessage:(object:any) =>void;
  /**
   * 游戏接收推送的消息。
   */
   onMessage:(callback:Function)=>void;
   /**
    * 游戏传数据给游戏平台。
    */
   writeBlackboard:(object:any)=>void;
}

interface _DownloadTask {
  /**
   * 中断下载任务
   */
  abort:()=>void;
  /**
   * 监听下载进度变化事件
   */
  onProgressUpdate:(callback:Function)=>void;
}

declare function App(options: _AppOptions): void;

/**
 * 获取到小程序实例
 */
declare function getApp(): object;

declare interface PageOptions {
  /**
   * 页面的初始数据
   */
  data?: any;

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad?: (options?: object) => void;

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady?: () => void;

  /**
   * 生命周期函数--监听页面显示
   */

  onShow?: () => void;

  /**
   * 生命周期函数--监听页面隐藏
   */

  onHide?: () => void;

  /**
   * 生命周期函数--监听页面卸载
   */

  onUnload?: () => void;

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh?: () => void;

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom?: () => void;

  /**
   * 用户点击右上角分享
   */

  onShareAppMessage?: () => _ShareAppMessageReturnObject;
}

declare function Page(page: PageOptions): void;

declare function getCurrentPages(): object[];

declare namespace qg {
  /**
   * 批量添加卡券。
   */
  export function addCard(object: _addCardObject): void;

  /**
   * 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。
   */
  export function addPhoneContact(object: _addPhoneContactObject): void;

  /**
   * 将 ArrayBuffer 数据转成 Base64 字符串
   */
  export function arrayBufferToBase64(): void;

  /**
   * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
   */
  export function authorize(object: _authorizeObject): void;

  /**
   * 将 Base64 字符串转成 ArrayBuffer 数据
   */
  export function base64ToArrayBuffer(base64: string): void;

  /**
   * 判断小程序的API，回调，参数，组件等是否在当前版本可用。
   */
  export function canIUse(string: string): void;

  /**
   * 返回一个数组，用来描述 canvas 区域隐含的像素数据
   */
  export function canvasGetImageData(object: _canvasGetImageDataObject): void;

  /**
   * 将像素数据绘制到画布的方法
   */
  export function canvasPutImageData(object: _canvasPutImageDataObject): void;

  /**
   * 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
   */
  export function canvasToTempFilePath(
    this: string,
    object: _canvasToTempFilePathObject
  ): void;

  /**
   * 获取设备内是否录入如指纹等生物信息的接口
   */
  export function checkIsSoterEnrolledInDevice(
    object: _checkIsSoterEnrolledInDeviceObject
  ): void;

  /**
   * 获取本机支持的 SOTER 生物认证方式
   */
  export function checkIsSupportSoterAuthentication(
    object: _checkIsSupportSoterAuthenticationObject
  ): void;

  /**
   * 通过上述接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用wx.checkSession接口**检测当前用户登录态是否有效**。登录态过期后开发者可以再调用wx.login获取新的用户登录态。
   */
  export function checkSession(object: _checkSessionObject): void;

  /**
   * 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
   */
  export function chooseAddress(object: _chooseAddressObject): void;

  /**
   * 调起选择手机通讯录联系人界面，返回用户选择的联系人信息。
   */
  export function chooseContact(object: _chooseContactObject): void;

  /**
   * 从本地相册选择图片或使用相机拍照。
   */
  export function chooseImage(object: _chooseImageObject): void;

  /**
   * 选择用户的发票抬头。
   */
  export function chooseInvoiceTitle(object: _chooseInvoiceTitleObject): void;

  /**
   * 打开地图选择位置。
   */
  export function chooseLocation(object: _chooseLocationObject): void;

  /**
   * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
   */
  export function chooseVideo(object: _chooseVideoObject): void;

  /**
   * 清理本地数据缓存。
   */
  export function clearStorage(): void;

  /**
   * 同步清理本地数据缓存
   */
  export function clearStorageSync(): void;

  /**
   * 断开与低功耗蓝牙设备的连接
   */
  export function closeBLEConnection(object: _closeBLEConnectionObject): void;

  /**
   * 关闭蓝牙模块，使其进入未初始化状态。调用该方法将断开所有已建立的链接并释放系统资源。建议在使用小程序蓝牙流程后调用，与`wx.openBluetoothAdapter`成对调用。
   */
  export function closeBluetoothAdapter(
    object: _closeBluetoothAdapterObject
  ): void;

  /**
   * 关闭 WebSocket 连接。
   */
  export function closeSocket(object: _closeSocketObject): void;

  /**
   * 创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 连接。**使用前请先阅读[说明](./api-network.md)**。
   */
  export function connectSocket(object: _connectSocketObject): void;

  /**
   * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持。
   */
  export function connectWifi(object: _connectWifiObject): void;

  /**
   * 创建一个动画实例[animation](#animation)。调用实例的方法来描述动画。最后通过动画实例的`export`方法导出动画数据传递给组件的`animation`属性。
   */
  export function createAnimation(object: _createAnimationObject): void;

  /**
   * 创建并返回 audio 上下文 `audioContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<audio/>` 组件
   */
  export function createAudioContext(this: string, audioid: string): void;

  /**
   * 连接低功耗蓝牙设备。
   */
  export function createBLEConnection(object: _createBLEConnectionObject): void;

  /**
   * 创建并返回 camera 上下文 `cameraContext` 对象，`cameraContext` 与页面的 `camera` 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 `<camera/>` 组件。
   */
  export function createCameraContext(this: string): void;

  /**
   * 创建 canvas 绘图上下文（指定 canvasId）。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
   */
  export function createCanvasContext(
    this: string,
    canvasid: string
  ): CanvasContext;

  /**
   * 创建并返回绘图上下文。
   */
  export function createContext(): CanvasContext;

  /**
   * 创建并返回内部 audio 上下文 `innerAudioContext` 对象。
   */
  export function createInnerAudioContext(): void;

  /**
   * 操作对应的 `<live-player/>` 组件。
   */
  export function createLivePlayerContext(this: string, domid: string): void;

  /**
   * 创建并返回 `live-pusher` 上下文 `LivePusherContext` 对象，`LivePusherContext` 与页面的 `<live-pusher />` 组件绑定，一个页面只能有一个 `live-pusher`，通过它可以操作对应的 `<live-pusher/>` 组件。
   */
  export function createLivePusherContext(): void;

  /**
   * 创建并返回 map 上下文 `mapContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<map/>` 组件
   */
  export function createMapContext(this: string, mapid: string): void;

  /**
   * undefined
   */
  export function createSelectorQuery(): void;

  /**
   * 创建并返回 video 上下文 `videoContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<video/>` 组件
   */
  export function createVideoContext(this: string, videoid: string): void;

  /**
   * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
   */
  export function downloadFile(object: _downloadFileObject):_DownloadTask;

  /**
   * 蓝牙设备characteristic(特征值)信息
   */
  export function getBLEDeviceCharacteristics(
    object: _getBLEDeviceCharacteristicsObject
  ): void;

  /**
   * 获取蓝牙设备所有 service（服务）
   */
  export function getBLEDeviceServices(
    object: _getBLEDeviceServicesObject
  ): void;

  /**
   * 获取**全局唯一**的背景音频管理器 `backgroundAudioManager`。
   */
  export function getBackgroundAudioManager(): _getBackgroundAudioManagerReturnValue;

  /**
   * 获取后台音乐播放状态。
   */
  export function getBackgroundAudioPlayerState(
    object: _getBackgroundAudioPlayerStateObject
  ): void;

  /**
   * 获取所有已搜索到的`iBeacon`设备
   */
  export function getBeacons(object: _getBeaconsObject): void;

  /**
   * 获取本机蓝牙适配器状态
   */
  export function getBluetoothAdapterState(
    object: _getBluetoothAdapterStateObject
  ): void;

  /**
   * 获取在小程序蓝牙模块生效期间所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。
   */
  export function getBluetoothDevices(object: _getBluetoothDevicesObject): void;

  /**
   * 获取系统剪贴板内容
   */
  export function getClipboardData(object: _getClipboardDataObject): void;

  /**
   * 根据 uuid 获取处于已连接状态的设备
   */
  export function getConnectedBluetoothDevices(
    object: _getConnectedBluetoothDevicesObject
  ): void;

  /**
   * 获取已连接中的 Wi-Fi 信息
   */
  export function getConnectedWifi(object: _getConnectedWifiObject): void;

  /**
   * 获取第三方平台自定义的数据字段。
   */
  export function getExtConfig(object: _getExtConfigObject): void;

  /**
   * 获取第三方平台自定义的数据字段的同步接口。
   */
  export function getExtConfigSync(): _getExtConfigSyncReturnValue;

  /**
   * 获取文件信息
   */
  export function getFileInfo(object: _getFileInfoObject): void;

  /**
   * 判断当前设备是否支持 HCE 能力。
   */
  export function getHCEState(object: _getHCEStateObject): void;

  /**
   * 获取图片信息
   */
  export function getImageInfo(object: _getImageInfoObject): void;

  /**
   * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
   */
  export function getLocation(object: _getLocationObject): void;

  /**
   * 获取网络类型。
   */
  export function getNetworkType(object: _getNetworkTypeObject): void;

  /**
   * 获取微信替设备生成的唯一标识，用于判断设备是否更换。获取的数据为AES加密数据，需要自行解密。
   */
  export function getOpenDeviceId(object: _getOpenDeviceIdObject): void;

  /**
   * 获取**全局唯一**的录音管理器 `recorderManager`。
   */
  export function getRecorderManager(): void;

  /**
   * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [wx.getFileInfo](./getFileInfo.md) 接口。
   */
  export function getSavedFileInfo(object: _getSavedFileInfoObject): void;

  /**
   * 获取本地已保存的文件列表
   */
  export function getSavedFileList(object: _getSavedFileListObject): void;

  /**
   * 获取屏幕亮度。
   */
  export function getScreenBrightness(object: _getScreenBrightnessObject): void;

  /**
   * 获取用户的当前设置。
   */
  export function getSetting(object: _getSettingObject): void;

  /**
   * 获取转发详细信息
   */
  export function getShareInfo(object: _getShareInfoObject): void;

  /**
   * 从本地缓存中异步获取指定 key 对应的内容。
   */
  export function getStorage(object: _getStorageObject): void;

  /**
   * 异步获取当前storage的相关信息
   */
  export function getStorageInfo(object: _getStorageInfoObject): void;

  /**
   * 同步获取当前storage的相关信息
   */
  export function getStorageInfoSync(): void;

  /**
   * 从本地缓存中同步获取指定 key 对应的内容。
   */
  export function getStorageSync(key: string): void;

  /**
   * 获取系统信息。
   */
  export function getSystemInfo(object: _getSystemInfoObject): void;

  /**
   * 获取系统信息同步接口
   */
  export function getSystemInfoSync(): _getSystemInfoSyncReturnValue;

  /**
   * 获取用户信息，withCredentials 为 true 时需要先调用 [wx.login](./api-login.md#wxloginobject) 接口。
   */
  export function getUserInfo(object: _getUserInfoObject): void;

  /**
   * 获取用户过去三十天微信运动步数，需要先调用 [wx.login](./api-login.md#wxloginobject) 接口。
   */
  export function getWeRunData(object: _getWeRunDataObject): void;

  /**
   * 请求获取 Wi-Fi 列表，在 `onGetWifiList` 注册的回调中返回 wifiList 数据。iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。
   */
  export function getWifiList(object: _getWifiListObject): void;

  /**
   * 隐藏 loading 提示框
   */
  export function hideLoading(): void;

  /**
   * 隐藏导航条加载动画。
   */
  export function hideNavigationBarLoading(): void;

  /**
   * 隐藏转发按钮
   */
  export function hideShareMenu(object: _hideShareMenuObject): void;

  /**
   * 隐藏 tabBar
   */
  export function hideTabBar(object: _hideTabBarObject): void;

  /**
   * 隐藏 tabBar 某一项的右上角的红点
   */
  export function hideTabBarRedDot(object: _hideTabBarRedDotObject): void;

  /**
   * 隐藏消息提示框
   */
  export function hideToast(): void;

  /**
   * 调用接口获取**登录凭证（token）**进而换取用户登录态信息，包括用户的**唯一标识（uid）**等。
   */
  export function login(object: _loginObject): void;

  /**
   * wx.makePhoneCall({
   */
  export function makePhoneCall(object: _makePhoneCallObject): void;

  /**
   * 调起 VoIP 音视频通话界面。
   */
  export function makeVoIPCall(object: _makeVoIPCallObject): void;

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 [`getCurrentPages()`](../framework/app-service/page.md#getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
   */
  export function navigateBack(object: _navigateBackObject): void;

  /**
   * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
   */
  export function navigateBackMiniProgram(
    object: _navigateBackMiniProgramObject
  ): void;

  /**
   * 保留当前页面，跳转到应用内的某个页面，使用`wx.navigateBack`可以返回到原页面。
   */
  export function navigateTo(object: _navigateToObject): void;

  /**
   * 打开同一公众号下关联的另一个小程序。**（注：必须是同一公众号下，而非同个 open 账号下）**
   */
  export function navigateToMiniProgram(
    object: _navigateToMiniProgramObject
  ): void;

  /**
   * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持`notify`或者`indicate`才可以成功调用，具体参照 characteristic 的 properties 属性
   */
  export function notifyBLECharacteristicValueChange(
    object: _notifyBLECharacteristicValueChangeObject
  ): void;

  /**
   * 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 `wx.stopAccelerometer` 停止监听。
   */
  export function onAccelerometerChange(
    callback: (x,y,z) => void
  ): void;

  /**
   * 监听低功耗蓝牙设备的特征值变化。必须先启用`notify`接口才能接收到设备推送的notification。
   */
  export function onBLECharacteristicValueChange(
    callback: (result: _onBLECharacteristicValueChangeCallbackResult) => void
  ): void;

  /**
   * 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
   */
  export function onBLEConnectionStateChange(
    callback: (result: _onBLEConnectionStateChangeCallbackResult) => void
  ): void;

  /**
   * 监听音乐暂停。
   */
  export function onBackgroundAudioPause(callback: string): void;

  /**
   * 监听音乐播放。
   */
  export function onBackgroundAudioPlay(callback: string): void;

  /**
   * 监听音乐停止。
   */
  export function onBackgroundAudioStop(callback: string): void;

  /**
   * 监听 `iBeacon` 服务的状态变化
   */
  export function onBeaconServiceChange(
    callback: (result: _onBeaconServiceChangeCallbackResult) => void
  ): void;

  /**
   * 监听 `iBeacon` 设备的更新事件
   */
  export function onBeaconUpdate(
    callback: (result: _onBeaconUpdateCallbackResult) => void
  ): void;

  /**
   * 监听蓝牙适配器状态变化事件
   */
  export function onBluetoothAdapterStateChange(
    callback: (result: _onBluetoothAdapterStateChangeCallbackResult) => void
  ): void;

  /**
   * 监听寻找到新设备的事件
   */
  export function onBluetoothDeviceFound(
    callback: (result: _onBluetoothDeviceFoundCallbackResult) => void
  ): void;

  /**
   * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用`wx.stopCompass`停止监听。
   */
  export function onCompassChange(
    callback: (result: _onCompassChangeCallbackResult) => void
  ): void;

  /**
   * 监听需要评估连上的 Wi-Fi 的请求，在回调里必须返回 `confidence` 字段
   */
  export function onEvaluateWifi(
    callback: (result: _onEvaluateWifiCallbackResult) => void
  ): void;

  /**
   * 监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList。
   */
  export function onGetWifiList(
    callback: (result: _onGetWifiListCallbackResult) => void
  ): void;

  /**
   * 监听 NFC 设备的消息回调，并在回调中处理。返回参数中 `messageType` 表示消息类型，目前有如下值：
   */
  export function onHCEMessage(
    callback: (result: _onHCEMessageCallbackResult) => void
  ): void;

  /**
   * 监听网络状态变化。
   */
  export function onNetworkStatusChange(
    callback: (result: _onNetworkStatusChangeCallbackResult) => void
  ): void;

  /**
   * 监听WebSocket关闭。
   */
  export function onSocketClose(callback: string): void;

  /**
   * 监听WebSocket错误。
   */
  export function onSocketError(callback: string): void;

  /**
   * 监听WebSocket接受到服务器的消息事件。
   */
  export function onSocketMessage(
    callback: (result: _onSocketMessageCallbackResult) => void
  ): void;

  /**
   * 监听WebSocket连接打开事件。
   */
  export function onSocketOpen(callback: string): void;

  /**
   * 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
   */
  export function onUserCaptureScreen(
    callback: (result: _onUserCaptureScreenCallbackResult) => void
  ): void;

  /**
   * 监听连接上 Wi-Fi 的事件。
   */
  export function onWifiConnected(
    callback: (result: _onWifiConnectedCallbackResult) => void
  ): void;

  /**
   * 初始化小程序蓝牙模块，生效周期为调用`wx.openBluetoothAdapter`至调用`wx.closeBluetoothAdapter`或小程序被销毁为止。
   */
  export function openBluetoothAdapter(
    object: _openBluetoothAdapterObject
  ): void;

  /**
   * 查看微信卡包中的卡券。
   */
  export function openCard(object: _openCardObject): void;

  /**
   * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
   */
  export function openDocument(object: _openDocumentObject): void;

  /**
   * ​使用微信内置地图查看位置。
   */
  export function openLocation(object: _openLocationObject): void;

  /**
   * 调起客户端小程序设置界面，返回用户设置的操作结果。
   */
  export function openSetting(object: _openSettingObject): void;

  /**
   * 将页面滚动到目标位置。
   */
  export function pageScrollTo(object: _pageScrollToObject): void;

  /**
   * 暂停播放音乐。
   */
  export function pauseBackgroundAudio(): void;

  /**
   * 暂停正在播放的语音。再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 wx.stopVoice。
   */
  export function pauseVoice(): void;

  /**
   * 使用后台播放器播放音乐，对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户点击“显示在聊天顶部”时，音乐不会暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。
   */
  export function playBackgroundAudio(object: _playBackgroundAudioObject): void;

  /**
   * 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
   */
  export function playVoice(object: _playVoiceObject): void;

  /**
   * 预览图片。
   */
  export function previewImage(object: _previewImageObject): void;

  /**
   * 关闭所有页面，打开到应用内的某个页面。
   */
  export function reLaunch(object: _reLaunchObject): void;

  /**
   * 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持`read`才可以成功调用，具体参照 characteristic 的 properties 属性
   */
  export function readBLECharacteristicValue(
    object: _readBLECharacteristicValueObject
  ): void;

  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   */
  export function redirectTo(object: _redirectToObject): void;

  /**
   * 删除本地存储的文件
   */
  export function removeSavedFile(object: _removeSavedFileObject): void;

  /**
   * 从本地缓存中异步移除指定 key 。
   */
  export function removeStorage(object: _removeStorageObject): void;

  /**
   * 从本地缓存中同步移除指定 key 。
   */
  export function removeStorageSync(key: string): void;

  /**
   * 移除 tabBar 某一项右上角的文本
   */
  export function removeTabBarBadge(object: _removeTabBarBadgeObject): void;

  /**
   * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。
   */
  export function reportAnalytics(eventname: string, data: string): void;

  /**
   * 发起网络请求。**使用前请先阅读[说明](./api-network.md)**。
   */
  export function request(object: _requestObject): void;


  /**
   * 保存文件到本地。**注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用**
   */
  export function saveFile(object: _saveFileObject): void;

  /**
   * 保存图片到系统相册。需要[用户授权](./authorize-index.md) scope.writePhotosAlbum
   */
  export function saveImageToPhotosAlbum(
    object: _saveImageToPhotosAlbumObject
  ): void;

  /**
   * 保存视频到系统相册。需要[用户授权](./authorize-index.md) scope.writePhotosAlbum
   */
  export function saveVideoToPhotosAlbum(
    object: _saveVideoToPhotosAlbumObject
  ): void;

  /**
   * 调起客户端扫码界面，扫码成功后返回对应的结果
   */
  export function scanCode(object: _scanCodeObject): void;

  /**
   * 控制音乐播放进度。
   */
  export function seekBackgroundAudio(object: _seekBackgroundAudioObject): void;

  /**
   * 发送 NFC 消息。仅在安卓系统下有效。
   */
  export function sendHCEMessage(object: _sendHCEMessageObject): void;

  /**
   * 通过 WebSocket 连接发送数据，需要先 [wx.connectSocket](#wxconnectsocketobject)，并在 [wx.onSocketOpen](#wxonsocketopencallback) 回调之后才能发送。
   */
  export function sendSocketMessage(object: _sendSocketMessageObject): void;

  /**
   * 设置系统剪贴板的内容
   */
  export function setClipboardData(object: _setClipboardDataObject): void;

  /**
   * 设置是否打开调试开关，此开关对正式版也能生效。
   */
  export function setEnableDebug(object: _setEnableDebugObject): void;

  /**
   * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。
   */
  export function setKeepScreenOn(object: _setKeepScreenOnObject): void;

  /**
   * wx.setNavigationBarColor({
   */
  export function setNavigationBarColor(
    object: _setNavigationBarColorObject
  ): void;

  /**
   * 动态设置当前页面的标题。
   */
  export function setNavigationBarTitle(
    object: _setNavigationBarTitleObject
  ): void;

  /**
   * 设置屏幕亮度。
   */
  export function setScreenBrightness(object: _setScreenBrightnessObject): void;

  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
   */
  export function setStorage(object: _setStorageObject): void;

  /**
   * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   */
  export function setStorageSync(key: string): void;

  /**
   * 为 tabBar 某一项的右上角添加文本
   */
  export function setTabBarBadge(object: _setTabBarBadgeObject): void;

  /**
   * 动态设置 tabBar 某一项的内容
   */
  export function setTabBarItem(object: _setTabBarItemObject): void;

  /**
   * 动态设置 tabBar 的整体样式
   */
  export function setTabBarStyle(object: _setTabBarStyleObject): void;

  /**
   * 动态设置置顶栏文字内容，只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容。**注意：调用成功后，需间隔 5s 才能再次调用此接口，如果在 5s 内再次调用此接口，会回调 fail，errMsg："setTopBarText: fail invoke too frequently"**
   */
  export function setTopBarText(object: _setTopBarTextObject): void;

  /**
   * 在 `onGetWifiList` 回调后，利用接口设置 wifiList 中 AP 的相关信息。
   */
  export function setWifiList(object: _setWifiListObject): void;

  /**
   * ​显示操作菜单
   */
  export function showActionSheet(object: _showActionSheetObject): void;

  /**
   * 显示 loading 提示框, 需主动调用 [wx.hideLoading](#wxhideloading) 才能关闭提示框
   */
  export function showLoading(object: _showLoadingObject): void;

  /**
   * ​显示模态弹窗
   */
  export function showModal(object: _showModalObject): void;

  /**
   * 在当前页面显示导航条加载动画。
   */
  export function showNavigationBarLoading(): void;

  /**
   * 显示当前页面的转发按钮
   */
  export function showShareMenu(object: _showShareMenuObject): void;

  /**
   * 显示 tabBar
   */
  export function showTabBar(object: _showTabBarObject): void;

  /**
   * 显示 tabBar 某一项的右上角的红点
   */
  export function showTabBarRedDot(object: _showTabBarRedDotObject): void;

  /**
   * 显示消息提示框
   */
  export function showToast(object: _showToastObject): void;

  /**
   * 开始监听加速度数据。
   */
  export function startAccelerometer(object: _startAccelerometerObject): void;

  /**
   * 开始搜索附近的`iBeacon`设备
   */
  export function startBeaconDiscovery(
    object: _startBeaconDiscoveryObject
  ): void;

  /**
   * 开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
   */
  export function startBluetoothDevicesDiscovery(
    object: _startBluetoothDevicesDiscoveryObject
  ): void;

  /**
   * 开始监听罗盘数据。
   */
  export function startCompass(object: _startCompassObject): void;

  /**
   * 初始化 NFC 模块。
   */
  export function startHCE(object: _startHCEObject): void;

  /**
   * 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
   */
  export function startPullDownRefresh(
    object: _startPullDownRefreshObject
  ): void;

  /**
   * 开始录音。当主动调用`wx.stopRecord`，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开小程序时，此接口无法调用。
   */
  export function startRecord(object: _startRecordObject): void;

  /**
   * 开始 SOTER 生物认证
   */
  export function startSoterAuthentication(
    object: _startSoterAuthenticationObject
  ): void;

  /**
   * 初始化 Wi-Fi 模块。
   */
  export function startWifi(object: _startWifiObject): void;

  /**
   * 停止监听加速度数据。
   */
  export function stopAccelerometer(object: _stopAccelerometerObject): void;

  /**
   * 停止播放音乐。
   */
  export function stopBackgroundAudio(): void;

  /**
   * 停止搜索附近的`iBeacon`设备
   */
  export function stopBeaconDiscovery(object: _stopBeaconDiscoveryObject): void;

  /**
   * 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
   */
  export function stopBluetoothDevicesDiscovery(
    object: _stopBluetoothDevicesDiscoveryObject
  ): void;

  /**
   * 停止监听罗盘数据。
   */
  export function stopCompass(object: _stopCompassObject): void;

  /**
   * 关闭 NFC 模块。仅在安卓系统下有效。
   */
  export function stopHCE(object: _stopHCEObject): void;

  /**
   * 停止当前页面下拉刷新。
   */
  export function stopPullDownRefresh(): void;

  /**
   * ​主动调用停止录音。
   */
  export function stopRecord(): void;

  /**
   * 结束播放语音。
   */
  export function stopVoice(): void;

  /**
   * 关闭 Wi-Fi 模块。
   */
  export function stopWifi(object: _stopWifiObject): void;

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   */
  export function switchTab(object: _switchTabObject): void;

  /**
   * 更新转发属性
   */
  export function updateShareMenu(object: _updateShareMenuObject): void;

  /**
   * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 `content-type` 为 `multipart/form-data` 。**使用前请先阅读[说明](./api-network.md)**。
   */
  export function uploadFile(object: _uploadFileObject): void;

  /**
   * 使手机发生较长时间的振动（400ms）
   */
  export function vibrateLong(object: _vibrateLongObject): void;

  /**
   * 使手机发生较短时间的振动（15ms）
   */
  export function vibrateShort(object: _vibrateShortObject): void;

  /***
   * 监听主域发送的消息
   */
  export function onMessage(callback:Function):void;
  /**
   * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
   */
  export function getFriendCloudStorage(object):void;
  /**
   * 对用户托管数据进行写数据操作。允许同时写多组 KV 数据。
   * @param object 
   */
  export function setUserCloudStorage(object):void;
  /**
   * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持`write`才可以成功调用，具体参照 characteristic 的 properties 属性
   */
  export function writeBLECharacteristicValue(
    object: _writeBLECharacteristicValueObject
  ): void;
  /**
   * 获取一个对战对象
   */
  export function getBattle():_Battle;
  /**
   * 设置游戏加载进度页面。如果游戏加载起来后3秒内没有调用setLoadingProgress，会自动关闭游戏加载进度页面。为了用户体验统一，务必在游戏加载后第一时间调用setLoadingProgress({progress: 0})，随后再传回真实的加载进度。
   */
  export function setLoadingProgress(object:any):void;
  /**
   * 支持最低平台版本号'1031' (minPlatformVersion>='1031')
   * 隐藏游戏加载进度页面
   */
  export function loadingComplete(object:any):void;
  /**
   * 发起微信支付。
   */
  export function requestPayment(object: _requestPaymentObject): void;
  /**
   * 发起支付。
   */
  export function pay(object: _requestPaymentObject): void;
  /**
   * 初始化广告服务，在应用生命周期中，只需要初始化一次，在这里可以指定是否打开广告组件 Log，传入分配的广告 AppId
   */
  export function initAdService(object:any):void;
  /**
   * 创建 Banner 广告组件，如果已经创建过 Banner 广告组件，则会使用已创建的广告组件对象
   */
  export function createBannerAd(object:any):_BannerAd;
  /**
   * **确保广告服务已经初始化完毕**
   * 创建激励视频广告组件，同一个 posId，如果已经创建，并且未 destroy，会复用之前的对象
   */
  export function  createRewardedVideoAd(object:any):_VideoAd;
  /**
   * **确保广告服务已经初始化完毕**
   * 创建插屏广告组件，同一个 posId，如果已经创建，并且未 destroy，会复用之前的对象
   */
  export function createInsertAd(object:any):_InsertAd;
  /**
   * **确保广告服务已经初始化完毕**
   * 原生广告是 cp 通过封装好的接口获取广告数据，根据实际场景自由选择绘制和展示方式的广告，更加灵活。 需要注意的是，每个原生广告组件对象只有一次有效曝光，一次有效点击。 同一个 posId，如果已经创建，并且未 destroy，会复用之前的对象。
   */
  export function createNativeAd(object:any):_NativeAd;
  /**
   * 加载游戏子包。注意：主包或子包不能引用未加载的包中的模块。
   */
  export function loadSubpackage(object:any):_LoadSubpackageTask;
  /**
   * 文件系统是小游戏提供的一套以小游戏和用户维度隔离的存储以及一套相应的管理接口。cp 使用文件系统来保存数据不必关心数据实际保存在硬盘(或者光盘)的地址为多少的数据块上。只需记住这个文件的所属目录和文件名。通过 qg.getFileSystemManager() 获取全局唯一的文件管理器，返回的是 FileSystemManager 文件管理器对象,所有的文件系统的管理操作通过 FileSystemManager (文件管理器对象)来调用。
   */
  export function getFileSystemManager():_FileSystemManager;
  /**
   * 获取设备电量
   */
  export function getBatteryInfo(object:any):void;
  /**
   * getBatteryInfo() 的同步版本，获取设备电量。
   */
  export function getBatteryInfoSync(object:any):_BatteryInfo;
   /**
   * 监听音频中断结束，在收到 onAudioInterruptionBegin 事件之后，OPPO小游戏内所有音频会暂停，收到此事件之后才可再次播放成功
   */
  export function onAudioInterruptionEnd(callback:Function):void;
  /**
   * 取消监听音频中断结束，在收到 onAudioInterruptionBegin 事件之后，OPPO小游戏内所有音频会暂停，收到此事件之后才可再次播放成功
   */
  export function offAudioInterruptionEnd(callback:Function):void;
  /**
   * 监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话。此事件触发后，OPPO小游戏内所有音频会暂停。
   */
  export function onAudioInterruptionBegin(callback:Function):void;
  /**
   * 取消监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话。此事件触发后，OPPO小游戏内所有音频会暂停。
   */
  export function offAudioInterruptionBegin(callback:Function):void;
  /**
   * 监听全局错误事件
   */
  export function onError(callback:Function):void;
  /**
   * 取消监听全局错误事件
   */
  export function offError(callback:Function):void;
  /**
   * 退出当前 OPPO 小游戏
   */
  export function exitApplication(object:any):void;
  /**
   * 返回 OPPO 小游戏启动参数
   */
  export function getLaunchOptionsSync():any;
  /**
   * 监听 OPPO 小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面等操作会触发此事件。
   */
  export function onHide(callback:Function):any;
  /**
   * 取消监听 OPPO 小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
   */
  export function offHide(callback:Function):any;
  /**
   * 监听 OPPO 小游戏回到前台的事件
   */
  export function onShow(callback:Function):any;
  /**
   * 取消监听 OPPO 小游戏回到前台的事件
   */
  export function offShow(callback:Function):any;
  /** 
   * 获取性能管理器
   */
  export function getPerformance():any;
  /**
   * 加快触发 JavaScript VM 进行（垃圾回收），GC 时机是由 JavaScript VM 来控制的，并不能保证调用后马上触发 GC。
   */
  export function triggerGC():void;
  /**
   * 获取一行文本的行高
   */
  export function getTextLineHeight(object:any):void;

}

