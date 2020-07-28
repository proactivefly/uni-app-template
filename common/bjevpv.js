export default function BJEVPV(pvObj){
	if(!pvObj){
		throw new Error('the constructor need parameter and type is Object');
	};
	if(!pvObj.pf){
		throw new Error('missing parameter "pf" and type is Number');
	};
	if(!pvObj.page){
		throw new Error('missing parameter "page" and type is String');
	};
  // 默认生成一个uid来统计用户uv
  var  _uId=uni.getStorageSync('userSign');
  if(!_uId){ //如果本地没有uId,随机数和时间戳生成一个
    var _tempID=parseInt(Math.random()*(1000000-1+1)+1)+new Date().getTime();
    _uId='uId'+_tempID;
    uni.setStorageSync('userSign',_uId);
  };
  this.pf=pvObj.pf;
  this.page=pvObj.page;
  this.env=pvObj.env?pvObj.env:1;//环境
  this.uid=pvObj.uid?pvObj.uid:_uId;
  this.pageStart=new Date().getTime();
  this.mobile=pvObj.mobile?pvObj.mobile:undefined; //默认值undefined
}	

// 
BJEVPV.prototype.pv=function(log){
  var _params = '';
  for (var key in log) {
      _params += '&' + key + '=' + log[key]
  };
  var domainArr = ['dataimage.qingxiangchuxing.com'];
  var k = Math.floor(Math.random() * domainArr.length); //向下取整 0
  var _protocol='https';
  // if(location.protocol=='file:'){_protocol='https:'};
  var domon_url = _protocol+"://"+domainArr[k]+"/smallpic/";
  var im = "i_" + Math.floor(2147483648 * Math.random()).toString(36);
  var imgArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "w", "v", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var n = Math.floor(Math.random() * imgArr.length + 1) - 1;//0-35 的整数
  var url = domon_url + imgArr[n]+".gif?" + im + "=" + new Date().getTime() + _params;
 return url
};
// 统计点击 ，无须统计停留时间
BJEVPV.prototype.stPv=function(obj){
	if(!obj.pvKey){
		throw new Error('missing parameter and type is Object,and Object mast include "pvKey" field');
	};
	var pageEndTime = new Date().getTime();
  var pageStayTime =pageEndTime - this.pageStart;
  var _obj = {
  	'pf':this.pf,
    'page': this.page,
    'pvtype':obj.pvKey,
    'uid':obj.uId?obj.uId:this.uid,//如果没传进来就用
    'durtime':pageStayTime,
    'mobile':obj.mobile?obj.mobile:this.mobile,
    'env':this.env
  };
  // 新增
  if(obj.otherParams && Object.keys(obj.otherParams).length>0){
    Object.assign(_obj,obj.otherParams)
  }
  return this.pv(_obj)
};