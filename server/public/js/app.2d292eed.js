(function(e){function t(t){for(var i,o,r=t[0],d=t[1],c=t[2],u=0,f=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(i in d)Object.prototype.hasOwnProperty.call(d,i)&&(e[i]=d[i]);l&&l(t);while(f.length)f.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var e,t=0;t<n.length;t++){for(var s=n[t],i=!0,r=1;r<s.length;r++){var d=s[r];0!==a[d]&&(i=!1)}i&&(n.splice(t--,1),e=o(o.s=s[0]))}return e}var i={},a={app:0},n=[];function o(t){if(i[t])return i[t].exports;var s=i[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=i,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(s,i,function(t){return e[t]}.bind(null,i));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],d=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var l=d;n.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"034f":function(e,t,s){"use strict";var i=s("85ec"),a=s.n(i);a.a},"041c":function(e,t,s){e.exports=s.p+"media/WORLD_50fps_1_keyframe.6d819c54.mp4"},1:function(e,t){},"1e2a":function(e,t,s){"use strict";var i=s("8e18"),a=s.n(i);a.a},"1e7c":function(e,t,s){e.exports=s.p+"media/WORLD_50fps.2ef574b9.mp4"},2:function(e,t){},"2cf3":function(e,t,s){"use strict";var i=s("49a7"),a=s.n(i);a.a},3:function(e,t){},"49a7":function(e,t,s){},"505d":function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var i=s("2b0e"),a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},n=[],o={name:"app"},r=o,d=(s("034f"),s("2877")),c=Object(d["a"])(r,a,n,!1,null,null,null),l=c.exports,u=s("8c4f"),f=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"hello"},[e._m(0),e._m(1),i("div",{staticClass:"album py-5 bg-light"},[i("div",{staticClass:"transmit"},[i("h3",[e._v("Transmit OSC data")]),i("a",{staticClass:"btn btn-primary",attrs:{href:"#"}},[e._v("Turn something on")]),i("br"),i("div",{staticClass:"wrapper"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],attrs:{type:"range",min:"0",max:"100",step:"1"},domProps:{value:e.value},on:{input:e.sendSlider,__r:function(t){e.value=t.target.value}}}),i("span",{domProps:{textContent:e._s(e.total)}})])]),i("div",{staticClass:"receive"},[i("h3",[e._v("Receive OSC data")]),i("div",{attrs:{id:"messageArea"}},[i("p",{attrs:{id:"messageLabel"}},[e._v("Remote OSC Message:")]),i("div",{staticClass:"row"},[i("div",{staticClass:"col-2"}),i("div",{staticClass:"col-4"},[i("p",[e._v(e._s(this.address))]),i("div",{staticClass:"color",style:{"background-color":this.message}})]),i("div",{staticClass:"col-4"},[i("p",[e._v(e._s(this.address2))]),i("p",[e._v(e._s(this.message2))])]),i("div",{staticClass:"col-2"})])])]),i("div",{staticClass:"container"},[i("div",{staticClass:"broadcasting"}),i("div",{staticClass:"animation"},[i("video",{ref:"myVideo",attrs:{id:"myVideo",width:"650",height:"360"},on:{mousemove:e.updateCoordinates}},[i("source",{attrs:{src:s("1e7c"),type:"video/mp4"}}),e._v(" Your browser does not support the video tag. ")]),i("p",[e._v(" Coordinates: "+e._s(e.x)+" "),i("br")])])])]),e._m(2),i("button",{on:{click:e.greet}},[e._v("send")])])},m=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"navbar navbar-dark bg-dark shadow-sm"},[s("div",{staticClass:"container"},[s("a",{staticClass:"navbar-brand d-flex align-items-center",attrs:{href:"#"}},[s("strong",[e._v("Circus Family")])])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row py-lg-5"},[s("div",{staticClass:"col-lg-6 col-md-8 mx-auto"},[s("h1",{staticClass:"font-weight-light"},[e._v("Domotica Control")]),s("p",{staticClass:"lead text-muted"},[e._v("Via this page you can transmit and receive OSC data.")]),s("p")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"text-muted py-5"},[s("div",{staticClass:"container"},[s("p",{staticClass:"mb-1"},[e._v("Domotica control is © Circus family")])])])}],h=(s("caad"),s("b680"),s("2532"),s("f28c")),v=s.n(h),p=(s("a881"),new v.a.WebSocketPort({url:"wss://circusfamilyprojects.nl:8084"}));p.open();var g={data:function(){return{value:60,addressen:[],message:"",address:"",message2:"",address2:"",videoTime:30,x:0}},created:function(){this.OSCMessage()},computed:{total:function(){return this.value}},methods:{updateCoordinates:function(e){var t=myVideo.getBoundingClientRect();console.log(t.right,t.left),this.x=(e.clientX-t.left)*(5/(t.right-t.left)),this.x=this.x.toFixed(2),console.log(this.x),this.$refs.myVideo.currentTime=this.x,p.send({address:"/mousePosition ",args:[this.x]})},videoPlayBack:function(){},greet:function(){p.send({address:"/hello",args:["De slider werkt!"]})},sendSlider:function(){p.send({address:"/hello",args:[this.value]})},OSCMessage:function(){var e=this;p.on("message",(function(t){e.OSCMessages(t)}))},OSCMessages:function(e){var t=this.addressen.includes(e.address);0==t&&this.addressen.push(e.address),e.address==this.addressen[0]&&(this.message="rgb("+e.args+")",this.address=e.address),e.address==this.addressen[1]&&(this.message2=e.args,this.address2=e.address)}}},b=g,C=(s("fb5b"),Object(d["a"])(b,f,m,!1,null,"5ddcbe9c",null)),_=C.exports,y=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app",style:{backgroundColor:this.color}})},x=[],w=new v.a.WebSocketPort({url:"wss://circusfamilyprojects.nl:8084"});w.open();var O={data:function(){return{value:60,addressen:[],rood:"",address:"",groen:"",address2:"",blauw:"",color:""}},created:function(){this.OSCMessage()},computed:{total:function(){return this.value}},methods:{greet:function(){w.send({address:"/hello",args:["De slider werkt!"]})},sendSlider:function(){w.send({address:"/hello",args:[this.value]})},OSCMessage:function(){var e=this;w.on("message",(function(t){console.log(t),e.OSCMessages(t)}))},OSCMessages:function(e){"/rood"==e.address&&(this.rood=e.args[0]),"/groen"==e.address&&(this.groen=e.args[0]),"/blauw"==e.address&&(this.blauw=e.args[0]),this.color="rgb("+this.rood+","+this.groen+","+this.blauw+")"}}},V=O,S=(s("ecb2"),Object(d["a"])(V,y,x,!1,null,"9b71f826",null)),k=S.exports,j=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h3",[e._v("Live Video Stream (broadcast)")]),s("video",{attrs:{playsinline:"",autoplay:"",muted:""},domProps:{muted:!0}})])},M=[],P=s("8055"),E=s.n(P),R={data:function(){return{}},mounted:function(){var e={iceServers:[{urls:["stun:stun.l.google.com:19302"]}]},t=document.querySelector("video"),s=E()("circusfamilyprojects.nl:4000");window.onunload=window.onbeforeunload=function(){s.close()};var i={},a={video:!0};function n(e){t.srcObject=e,s.emit("broadcaster")}function o(e){console.log("navigator.getUserMedia error: ",e)}s.on("watcher",(function(a){var n=new RTCPeerConnection(e);i[a]=n,n.addStream(t.srcObject),n.createOffer().then((function(e){return n.setLocalDescription(e)})).then((function(){s.emit("offer",a,n.localDescription)})),n.onicecandidate=function(e){e.candidate&&s.emit("candidate",a,e.candidate)}})),s.on("answer",(function(e,t){i[e].setRemoteDescription(t)})),s.on("candidate",(function(e,t){i[e].addIceCandidate(new RTCIceCandidate(t))})),s.on("bye",(function(e){i[e]&&i[e].close(),delete i[e]})),navigator.mediaDevices.getUserMedia(a).then(n).catch(o)},computed:{},methods:{}},$=R,T=(s("1e2a"),Object(d["a"])($,j,M,!1,null,"13933845",null)),D=T.exports,B=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h3",[e._v("Live Video Stream (receiving)")]),s("video",{attrs:{playsinline:"",autoplay:"",muted:""},domProps:{muted:!0}})])},L=[],F={data:function(){return{}},mounted:function(){},computed:{},methods:{}},W=F,Y=(s("7e75"),Object(d["a"])(W,B,L,!1,null,"15b4edae",null)),X=Y.exports,I=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("br"),e._m(0),i("br"),i("br"),i("transition",{attrs:{name:"fade"}},[e.hideVideo1?e._e():i("video",{ref:"myVideo1",staticClass:"animatieVideo",attrs:{id:"myVideo1"},on:{mousemove:e.updateCoordinates1,click:e.sendtoStudio}},[i("source",{attrs:{src:s("c5c4"),type:"video/mp4"}}),e._v(" Your browser does not support the video tag. ")])]),i("br"),i("br"),i("transition",{attrs:{name:"fade"}},[e.hideVideo2?e._e():i("video",{ref:"myVideo2",staticClass:"animatieVideo",attrs:{id:"myVideo2"},on:{mousemove:e.updateCoordinates2}},[i("source",{attrs:{src:s("041c"),type:"video/mp4"}}),e._v(" Your browser does not support the video tag. ")])]),i("br"),i("br"),i("transition",{attrs:{name:"fade"}},[e.hideVideo3?e._e():i("video",{ref:"myVideo3",staticClass:"animatieVideo",attrs:{id:"myVideo3"},on:{mousemove:e.updateCoordinates3}},[i("source",{attrs:{src:s("9047"),type:"video/mp4"}}),e._v(" Your browser does not support the video tag. ")])])],1)},A=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-2"}),s("div",{staticClass:"col-sm-8"}),s("div",{staticClass:"col-sm-2"})])])}],J=new v.a.WebSocketPort({url:"wss://circusfamilyprojects.nl:8084"});J.open();var U={data:function(){return{value:60,addressen:[],message:"",address:"",message2:"",address2:"",videoTime:30,x1:0,x2:0,x3:0,hideVideo1:!1,hideVideo2:!1,hideVideo3:!1,click:1}},created:function(){this.OSCMessage()},computed:{total:function(){return this.value}},methods:{updateCoordinates1:function(e){var t=myVideo1.getBoundingClientRect();this.x1=(e.clientX-t.left)*(5/(t.right-t.left)),this.x1=this.x1.toFixed(2),console.log(this.x1),this.$refs.myVideo1.currentTime=this.x1,J.send({address:"/mousePosition1",args:[this.x1]})},updateCoordinates2:function(e){var t=myVideo2.getBoundingClientRect();this.x2=(e.clientX-t.left)*(5/(t.right-t.left)),this.x2=this.x2.toFixed(2),console.log(this.x2),this.$refs.myVideo2.currentTime=this.x2},updateCoordinates3:function(e){var t=myVideo3.getBoundingClientRect();this.x3=(e.clientX-t.left)*(1/(t.right-t.left)),this.x3=this.x3.toFixed(2),console.log(this.x3),this.$refs.myVideo3.currentTime=this.x3},OSCMessage:function(){var e=this;J.on("message",(function(t){e.OSCMessages(t)}))},OSCMessages:function(e){"/hideVideo1"==e.address&&1==e.args?this.hideVideo1=!0:"/hideVideo1"==e.address&&0==e.args&&(this.hideVideo1=!1),"/hideVideo2"==e.address&&1==e.args?this.hideVideo2=!0:"/hideVideo2"==e.address&&0==e.args&&(this.hideVideo2=!1),"/hideVideo3"==e.address&&1==e.args?this.hideVideo3=!0:"/hideVideo3"==e.address&&0==e.args&&(this.hideVideo3=!1)},sendtoStudio:function(){return 1==this.click?(J.send({address:"/videoClick",args:[this.click]}),console.log(this.click),void(this.click=0)):0==this.click?(J.send({address:"/videoClick",args:[]}),console.log(this.click),void(this.click=1)):void 0}}},q=U,H=(s("2cf3"),Object(d["a"])(q,I,A,!1,null,"4d21a00c",null)),K=H.exports;i["a"].use(u["a"]);var N=new u["a"]({routes:[{path:"/",name:"/Home",component:_},{path:"/signify",name:"/Sifnify",component:k},{path:"/broadcast",name:"/Broadcast",component:D},{path:"/robeco",name:"/Robeco",component:K},{path:"/livestream",name:"/Livestream",component:X}]});i["a"].config.productionTip=!1,new i["a"]({router:N,render:function(e){return e(l)}}).$mount("#app")},"7e75":function(e,t,s){"use strict";var i=s("505d"),a=s.n(i);a.a},"85ec":function(e,t,s){},"8e18":function(e,t,s){},9047:function(e,t,s){e.exports=s.p+"media/ROBECO_3D_WEBSITE_50FPS_1_KEYFRAME_1.47c90503.mp4"},c542:function(e,t,s){},c5c4:function(e,t,s){e.exports=s.p+"media/SLDER.db44aedd.mp4"},cc58:function(e,t,s){},ecb2:function(e,t,s){"use strict";var i=s("c542"),a=s.n(i);a.a},fb5b:function(e,t,s){"use strict";var i=s("cc58"),a=s.n(i);a.a}});
//# sourceMappingURL=app.2d292eed.js.map