(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["raumstart"],{3055:function(o,t,i){},"7ce2":function(o,t,i){"use strict";var n=i("3055"),e=i.n(n);e.a},ddf0:function(o,t,i){"use strict";i.r(t);var n=function(){var o=this,t=o.$createElement,i=o._self._c||t;return i("div",{staticClass:"parentBackground"},[i("div",{ref:"mouseEvent",staticClass:"backgroundGradient",style:{"background-image":"linear-gradient(0deg,"+o.color1+" "+o.color1Position+"%, "+o.color2+" "+o.color2Position+"%)"}},[i("div",{staticClass:"boog",style:{"background-image":"linear-gradient(0deg,"+o.color2+" "+o.color1BoogPosition+"%, "+o.color1+" "+o.color2BoogPosition+"%)"},on:{mouseover:function(t){o.hover=!0},mouseleave:function(t){o.hover=!1}}}),o._m(0)])])},e=[function(){var o=this,t=o.$createElement,i=o._self._c||t;return i("div",{staticClass:"tekst"},[i("h1",{attrs:{id:"info-title"}},[o._v(" HARMONIE")]),i("p",[o._v("Living apart together installation")]),i("p",[o._v("Enter the experience")])])}],s=i("f28c"),r=i.n(s),a=new r.a.WebSocketPort({url:"wss://circusfamilyprojects.nl:8084"});a.open();var c={data:function(){return{color1:"rgb(35,100,233)",color2:"rgba(202,26,47)",color1Position:0,color2Position:60,color1BoogPosition:0,color2BoogPosition:60,desktopXpostion:null,windowWidth:null,hover:!1}},created:function(){this.OSCMessage()},mounted:function(){var o=this;this.$refs.mouseEvent.addEventListener("mousemove",(function(t){o.mousePC(t)}))},methods:{OSCMessage:function(){var o=this;a.on("message",(function(t){o.OSCMessages(t)}))},OSCMessages:function(o){"/raumcolors"==o.address&&(this.color1="rgb("+o.args[0]+","+o.args[1]+","+o.args[2]+")",this.color2="rgb("+o.args[3]+","+o.args[4]+","+o.args[5]+")")},mousePC:function(o){this.desktopXpostion=o.x;var t=o.x/window.innerWidth;console.log(this.hover),t>=0&&t<=.5?(this.color2Position=o.x/window.innerWidth*200,this.color2BoogPosition=o.x/window.innerWidth*-200+100):(this.color2Position=200+o.x/window.innerWidth*-200,this.color2BoogPosition=o.x/window.innerWidth*200-300+200)}}},l=c,d=(i("7ce2"),i("2877")),u=Object(d["a"])(l,n,e,!1,null,"78f31d27",null);t["default"]=u.exports}}]);
//# sourceMappingURL=raumstart.709865ab.js.map