(function(e){function t(t){for(var a,r,i=t[0],c=t[1],d=t[2],l=0,f=[];l<i.length;l++)r=i[l],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&f.push(s[r][0]),s[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(a=!1)}a&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},s={app:0},o=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("85ec"),s=n.n(a);s.a},1:function(e,t){},2:function(e,t){},"2c00":function(e,t,n){"use strict";var a=n("823a"),s=n.n(a);s.a},3:function(e,t){},"345f":function(e,t,n){},"3da1":function(e,t,n){"use strict";var a=n("345f"),s=n.n(a);s.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],r={name:"app"},i=r,c=(n("034f"),n("2877")),d=Object(c["a"])(i,s,o,!1,null,null,null),u=d.exports,l=n("8c4f"),f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[e._m(0),e._m(1),a("div",{staticClass:"album py-5 bg-light"},[a("div",{staticClass:"transmit"},[a("h3",[e._v("Transmit OSC data")]),a("a",{staticClass:"btn btn-primary",attrs:{href:"#"}},[e._v("Turn something on")]),a("br"),a("div",{staticClass:"wrapper"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],attrs:{type:"range",min:"0",max:"100",step:"1"},domProps:{value:e.value},on:{input:e.sendSlider,__r:function(t){e.value=t.target.value}}}),a("span",{domProps:{textContent:e._s(e.total)}})])]),a("div",{staticClass:"receive"},[a("h3",[e._v("Receive OSC data")]),a("div",{attrs:{id:"messageArea"}},[a("p",{attrs:{id:"messageLabel"}},[e._v("Remote OSC Message:")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-2"}),a("div",{staticClass:"col-4"},[a("p",[e._v(e._s(this.address))]),a("div",{staticClass:"color",style:{"background-color":this.message}})]),a("div",{staticClass:"col-4"},[a("p",[e._v(e._s(this.address2))]),a("p",[e._v(e._s(this.message2))])]),a("div",{staticClass:"col-2"})])])]),a("div",{staticClass:"container"},[a("div",{staticClass:"broadcasting"}),a("div",{staticClass:"animation"},[a("video",{ref:"myVideo",attrs:{id:"myVideo",width:"640",height:"360"},on:{mousemove:e.updateCoordinates}},[a("source",{attrs:{src:n("914f"),type:"video/mp4"}}),e._v(" Your browser does not support the video tag. ")]),a("p",[e._v(" Coordinates: "+e._s(e.x)+" "),a("br")])])])]),e._m(2),a("button",{on:{click:e.greet}},[e._v("send")])])},v=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navbar navbar-dark bg-dark shadow-sm"},[n("div",{staticClass:"container"},[n("a",{staticClass:"navbar-brand d-flex align-items-center",attrs:{href:"#"}},[n("strong",[e._v("Circus Family")])])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row py-lg-5"},[n("div",{staticClass:"col-lg-6 col-md-8 mx-auto"},[n("h1",{staticClass:"font-weight-light"},[e._v("Domotica Control")]),n("p",{staticClass:"lead text-muted"},[e._v("Via this page you can transmit and receive OSC data.")]),n("p")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-muted py-5"},[n("div",{staticClass:"container"},[n("p",{staticClass:"mb-1"},[e._v("Domotica control is © Circus family")])])])}],m=(n("caad"),n("b680"),n("2532"),n("f28c")),p=n.n(m),h=(n("a881"),new p.a.WebSocketPort({url:"ws://178.62.209.37:8083"}));h.open();var g={data:function(){return{value:60,addressen:[],message:"",address:"",message2:"",address2:"",videoTime:30,x:0}},created:function(){this.OSCMessage()},computed:{total:function(){return this.value}},methods:{updateCoordinates:function(e){var t=myVideo.getBoundingClientRect();this.x=(e.clientX-t.left)*(52/(t.right-t.left)).toFixed(2),this.x=this.x.toFixed(2),this.$refs.myVideo.currentTime=this.x,h.send({address:"/mousePosition ",args:[this.x]})},videoPlayBack:function(){},greet:function(){h.send({address:"/hello",args:["De slider werkt!"]})},sendSlider:function(){h.send({address:"/hello",args:[this.value]})},OSCMessage:function(){var e=this;h.on("message",(function(t){e.OSCMessages(t)}))},OSCMessages:function(e){var t=this.addressen.includes(e.address);console.log(e),0==t&&this.addressen.push(e.address),e.address==this.addressen[0]&&(this.message="rgb("+e.args+")",this.address=e.address),e.address==this.addressen[1]&&(this.message2=e.args,this.address2=e.address)}}},b=g,C=(n("2c00"),Object(c["a"])(b,f,v,!1,null,"52f139e3",null)),_=C.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app",style:{backgroundColor:this.color}})},y=[],O=new p.a.WebSocketPort({url:"ws://178.62.209.37:8083"});O.open();var S={data:function(){return{value:60,addressen:[],rood:"",address:"",groen:"",address2:"",blauw:"",color:""}},created:function(){this.OSCMessage()},computed:{total:function(){return this.value}},methods:{greet:function(){O.send({address:"/hello",args:["De slider werkt!"]})},sendSlider:function(){O.send({address:"/hello",args:[this.value]})},OSCMessage:function(){var e=this;O.on("message",(function(t){console.log(t),e.OSCMessages(t)}))},OSCMessages:function(e){"/rood"==e.address&&(this.rood=e.args[0]),"/groen"==e.address&&(this.groen=e.args[0]),"/blauw"==e.address&&(this.blauw=e.args[0]),this.color="rgb("+this.rood+","+this.groen+","+this.blauw+")"}}},x=S,j=(n("e5f8"),Object(c["a"])(x,w,y,!1,null,"2b465dd9",null)),M=j.exports,P=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},k=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v("Video Stream")]),n("video",{attrs:{playsinline:"",autoplay:""}})])}],$=n("8055"),D=n.n($),R={data:function(){return{}},mounted:function(){var e={iceServers:[{urls:["stun:stun.l.google.com:19302"]}]},t=document.querySelector("video"),n=D()("localhost:4000");window.onunload=window.onbeforeunload=function(){n.close()};var a={},s={video:!0,audio:!0};function o(e){t.srcObject=e,n.emit("broadcaster")}function r(e){console.log("navigator.getUserMedia error: ",e)}n.on("watcher",(function(s){var o=new RTCPeerConnection(e);a[s]=o,o.addStream(t.srcObject),o.createOffer().then((function(e){return o.setLocalDescription(e)})).then((function(){n.emit("offer",s,o.localDescription)})),o.onicecandidate=function(e){e.candidate&&n.emit("candidate",s,e.candidate)}})),n.on("answer",(function(e,t){a[e].setRemoteDescription(t)})),n.on("candidate",(function(e,t){a[e].addIceCandidate(new RTCIceCandidate(t))})),n.on("bye",(function(e){a[e]&&a[e].close(),delete a[e]})),navigator.mediaDevices.getUserMedia(s).then(o).catch(r)},computed:{},methods:{}},T=R,E=(n("3da1"),Object(c["a"])(T,P,k,!1,null,"af092068",null)),V=E.exports,I=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},B=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v("Robeco live stream")]),n("video",{attrs:{playsinline:"",autoplay:""}})])}],F={data:function(){return{}},mounted:function(){var e,t={iceServers:[{urls:["stun:stun.l.google.com:19302"]}]},n=document.querySelector("video"),a=D()("localhost:4000");window.onunload=window.onbeforeunload=function(){a.close()},a.on("broadcaster",(function(){a.emit("watcher")})),a.on("connect",(function(){a.emit("watcher")})),a.on("offer",(function(s,o){e=new RTCPeerConnection(t),e.setRemoteDescription(o).then((function(){return e.createAnswer()})).then((function(t){return e.setLocalDescription(t)})).then((function(){a.emit("answer",s,e.localDescription)})),e.onaddstream=function(e){n.srcObject=e.stream},e.onicecandidate=function(e){e.candidate&&a.emit("candidate",s,e.candidate)}})),a.on("candidate",(function(t,n){e.addIceCandidate(new RTCIceCandidate(n)).catch((function(e){return console.error(e)}))})),a.on("bye",(function(){e.close()}))},computed:{},methods:{}},L=F,q=(n("630f"),Object(c["a"])(L,I,B,!1,null,"476aaad3",null)),A=q.exports;a["a"].use(l["a"]);var J=new l["a"]({routes:[{path:"/",name:"/Home",component:_},{path:"/signify",name:"/Sifnify",component:M},{path:"/broadcast",name:"/Broadcast",component:V},{path:"/robeco",name:"/Robeco",component:A}]});a["a"].config.productionTip=!1,new a["a"]({router:J,render:function(e){return e(u)}}).$mount("#app")},"630f":function(e,t,n){"use strict";var a=n("88a5"),s=n.n(a);s.a},"72ad":function(e,t,n){},"823a":function(e,t,n){},"85ec":function(e,t,n){},"88a5":function(e,t,n){},"914f":function(e,t,n){e.exports=n.p+"media/testvideo.e4735fa6.mp4"},e5f8:function(e,t,n){"use strict";var a=n("72ad"),s=n.n(a);s.a}});
//# sourceMappingURL=app.cecec3f0.js.map