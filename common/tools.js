export function randomArr(arr,count){
	var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function add0(m){return m<10?'0'+m:m }

/**
 * @param {Object} timeStemp
 * @param {Object} noTime 是否需要时分秒
 */
export function formatTime(timeStemp,noTime){
	if(!timeStemp){return null}
	var time = new Date(timeStemp);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	if(noTime){
		return y+'-'+add0(m)+'-'+add0(d);
	}else{
		return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
	}
}

export function dateToms(date){
	if(date){
		return new Date(date).getTime()
	}
	return null
}
/**
 * @param {Object} domId   #domId
 */
export function getViewDomInfo(domId){
	return new Promise((resolve, reject) => {
		try {
			uni.createSelectorQuery().select(domId).boundingClientRect(res => {
				resolve(res)
			}).exec()
		}catch (err) {
			reject(err)
		}
	})
}


export function trimStr(str){
	if(!str){
		return ''
	}
	return str.replace(/^\s+|\s+$/,"")
}


// 替换成https

export function http2Https(url){
	if(!url){return ""};
	let _arr=url.split('//')
	if(_arr[0]){
		var isH=_arr[0].indexOf('https:')
		if(isH>=0){
			return _arr[0]+ "//" +_arr[1]
		}else{
			return _arr[0].replace('http:','https:') + "//" + _arr[1]
		}
	}else{
		return "https://"+_arr[1]
	}
}

export function https2Http(url){
	if(!url){return ""};
	let _arr=url.split('://')
	var isH=_arr[0].indexOf('https')
	if(isH>=0){
		return _arr[0].replace('https','http') + "://" + _arr[1]
	}else{
		return _arr[0]+ "://" +_arr[1]
	}
}
	

// 取两个数组不同元素
export function getArrDifference(arr1, arr2) {
	return arr1.concat(arr2).filter(function(v, i, arr) {
		return arr.indexOf(v) === arr.lastIndexOf(v);
	});
}


// 通过文件url判断文件类型是不是图片,1是图片，2是其他文件
export function getFileType(url){
	if(!url){return ''}
	const imgType=['png','jpg','bmp','jpeg','gif']
	var _dot=url.lastIndexOf('.')
	var _b=url.slice(_dot+1)
	return imgType.indexOf(_b)>=0?1:2
}
// 传入 数组 返回减少的数组,把参数传入反是新增的数组！！！！！！！！！！！！
export function getRuduceArr(oldArr=[],newArr=[]){
	var a=[]
	oldArr.forEach((item,index)=>{
		if(newArr.indexOf(item)<0){
			a.push(item)
		}
	})
	return a
}

// 传入对象 获取删除的id
export function getDeleteId(oldArr=[],newArr=[],Idkey="id"){
	var _olink=[],_nlink=[]
	oldArr.forEach((item)=>{
		_olink.push(item[Idkey])
	})
	newArr.forEach((item)=>{
		_nlink.push(item[Idkey])
	})
	return getRuduceArr(_olink,_nlink)
}

// 验证手机号
export function regTel(str){
	let reg = /^1\d{10}$/;
	return reg.test(str)
}
// 身份证
export function regIdCard(str){
	let reg= /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	return reg.test(str)
}


//优化navigateTo,n
export function perfectNavigateTo(Object){
	let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
	if(pages.length>=9){
		uni.redirectTo(Object)
	}else{
		uni.navigateTo(Object)
	}
	
}

export function hideMobile(tel){
	if(num){
		return tel.substr(0, 3) + '****' + tel.substr(7);
	}else{
		return null
	}
}


// [lon,lat] ,[lon,lat]
export function Tdistance(arr1,arr2) {
	var La1 = parseFloat(arr1[1]) * Math.PI / 180.0;
	var La2 = parseFloat(arr2[1]) * Math.PI / 180.0;
	var La3 = La1 - La2;
	var Lb3 = parseFloat(arr1[0]) * Math.PI / 180.0 - parseFloat(arr2[0])* Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	s = s.toFixed(2);
	return parseFloat(s);
}