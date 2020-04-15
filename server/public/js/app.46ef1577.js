(function(t){function e(e){for(var a,i,o=e[0],c=e[1],l=e[2],d=0,p=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(s.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},r={app:0},s=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("85ec"),r=n.n(a);r.a},1:function(t,e){},2:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],i={name:"app"},o=i,c=(n("034f"),n("2877")),l=Object(c["a"])(o,r,s,!1,null,null,null),u=l.exports,d=n("8c4f"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[t._m(0),t._m(1),n("div",{staticClass:"album py-5 bg-light"},[n("div",{staticClass:"transmit"},[n("h3",[t._v("Transmit OSC data")]),n("a",{staticClass:"btn btn-primary",attrs:{href:"#"}},[t._v("Turn something on")]),n("br"),n("div",{staticClass:"wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],attrs:{type:"range",min:"0",max:"100",step:"1"},domProps:{value:t.value},on:{input:t.sendSlider,__r:function(e){t.value=e.target.value}}}),n("span",{domProps:{textContent:t._s(t.total)}})])]),n("div",{staticClass:"receive"},[n("h3",[t._v("Receive OSC data")]),n("div",{attrs:{id:"messageArea"}},[n("p",{attrs:{id:"messageLabel"}},[t._v("OSC Message:")]),n("p",[t._v(t._s(t.OSCmessage()))]),n("span",{domProps:{textContent:t._s(t.OSCMessage)}}),n("p",[t._v(t._s(t.message))]),n("pre",{attrs:{id:"message"}})])]),n("div",{staticClass:"container"})]),t._m(2),n("button",{on:{click:t.greet}},[t._v("send")])])},f=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navbar navbar-dark bg-dark shadow-sm"},[n("div",{staticClass:"container"},[n("a",{staticClass:"navbar-brand d-flex align-items-center",attrs:{href:"#"}},[n("strong",[t._v("Circus Family")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row py-lg-5"},[n("div",{staticClass:"col-lg-6 col-md-8 mx-auto"},[n("h1",{staticClass:"font-weight-light"},[t._v("Domotica Control")]),n("p",{staticClass:"lead text-muted"},[t._v("Via this page you can transmit and receive OSC data.")]),n("p")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-muted py-5"},[n("div",{staticClass:"container"},[n("p",{staticClass:"mb-1"},[t._v("Domotica control is © Circus family")])])])}],v=n("f28c"),m=n.n(v),g=n("a881"),h=n.n(g),b=new m.a.WebSocketPort({url:"ws://localhost:8083"});b.on("message",(function(t){h()("#message").text(JSON.stringify(t,["args"]))})),b.open();var _={data:function(){return{value:60,message:""}},computed:{OSCMessage:function(){return this.message},total:function(){return this.value}},methods:{greet:function(){b.send({address:"/hello",args:["De slider werkt!"]})},sendSlider:function(){b.send({address:"/hello",args:[this.value]})},OSCmessage:function(){}}},C=_,y=(n("cb66"),Object(c["a"])(C,p,f,!1,null,"04a5741b",null)),O=y.exports;a["a"].use(d["a"]);var w=new d["a"]({routes:[{path:"/",name:"/Home",component:O}]});a["a"].config.productionTip=!1,new a["a"]({router:w,render:function(t){return t(u)}}).$mount("#app")},"85ec":function(t,e,n){},cb66:function(t,e,n){"use strict";var a=n("f744"),r=n.n(a);r.a},f744:function(t,e,n){}});
//# sourceMappingURL=app.46ef1577.js.map