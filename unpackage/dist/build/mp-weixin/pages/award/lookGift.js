(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/award/lookGift"],{"0b4a":function(t,e,n){"use strict";n.r(e);var a=n("aa43"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},2147:function(t,e,n){"use strict";n.r(e);var a=n("ef26"),i=n("0b4a");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("4ce6");var u,o=n("f0c5"),d=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=d.exports},"4ce6":function(t,e,n){"use strict";var a=n("5ade"),i=n.n(a);i.a},"57d7":function(t,e,n){"use strict";(function(t){n("f318");a(n("66fd"));var e=a(n("2147"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"5ade":function(t,e,n){},aa43:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("ee25"),i={data:function(){return{giftList:[{name:"充电费用（价值500元）",id:1,active:!1,sendState:0},{name:"蓝谷居民积分（价值500元）",id:2,active:!1,sendState:0},{name:"智慧管家A保代金券*3（价值500元）",id:3,active:!1,sendState:0}],orderId:"",giftRuleUrl:""}},methods:{getGiftRule:function(){var t=this;this.request("/common/param",{key:"award_use_desc"}).then((function(e){e.data&&(t.giftRuleUrl=(0,a.http2Https)(e.data))}))},getGift:function(){var e=this;this.request("/orderAward/showAwardByOrderId",{orderId:this.orderId}).then((function(n){if(0==n.resultCode){var a=n.data;a.forEach((function(t){for(var n=0;n<e.giftList.length;n++)t.awardId==e.giftList[n].id&&(e.giftList[n].active=!0,e.giftList[n].sendState=t.sendState)}))}else t.showToast({title:n.resultMsg?n.resultMsg:"网络异常,请稍后重试",icon:"none"})}))},goRule:function(){var e={url:this.giftRuleUrl};t.setStorageSync("webViewInfo",e),this.perfectNavigateTo({url:"/pages/webView/webView"})}},onLoad:function(t){this.orderId=t.orderId,this.getGift(),this.getGiftRule()}};e.default=i}).call(this,n("543d")["default"])},ef26:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))}},[["57d7","common/runtime","common/vendor"]]]);