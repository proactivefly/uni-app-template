(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"343f":function(t,n,a){"use strict";a.r(n);var o=a("d0d8"),e=a.n(o);for(var u in o)"default"!==u&&function(t){a.d(n,t,(function(){return o[t]}))}(u);n["default"]=e.a},"682a":function(t,n,a){"use strict";var o,e=function(){var t=this,n=t.$createElement;t._self._c},u=[];a.d(n,"b",(function(){return e})),a.d(n,"c",(function(){return u})),a.d(n,"a",(function(){return o}))},c7c0:function(t,n,a){"use strict";a.r(n);var o=a("682a"),e=a("343f");for(var u in e)"default"!==u&&function(t){a.d(n,t,(function(){return e[t]}))}(u);var c,i=a("f0c5"),r=Object(i["a"])(e["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=r.exports},d0d8:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,a=this.bgImage,o="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(o="".concat(o,"background-image:url(").concat(a,");")),o}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""},titlePosition:{type:String,defalut:"center"}},onShow:function(){console.log("ssss")},methods:{BackPage:function(){t.navigateBack({delta:1})}},onLoad:function(){console.log(this.titlePosition)}};n.default=a}).call(this,a("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c7c0"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
