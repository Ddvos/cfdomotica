(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Raum"],{"0079":function(s,o,a){"use strict";a.r(o);var c=function(){var s=this,o=s.$createElement,a=s._self._c||o;return a("div",{staticClass:"parentBackground"},[s._v(" "+s._s(s.color1Position)+" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-2"}),a("div",{staticClass:"col-2"},[a("div",{staticClass:"paal",on:{mousedown:s.paal1down,mouseup:s.paal1up}},[a("div",{staticClass:"inside",style:{"background-image":"linear-gradient(0deg,"+s.colum1color1+" 0%, "+s.colum1color2+" "+s.column1_postion+"%,"+s.colum1color1+" 100%)"}},[a("div",{staticClass:"colorSelector1",on:{click:s.colorOne}})])])]),a("div",{staticClass:"col-2"},[a("div",{staticClass:"paal",on:{mousedown:s.paal2down,mouseup:s.paal2up}},[a("div",{staticClass:"inside"})])]),s._m(0),s._m(1),a("div",{staticClass:"col-2"})])])},l=[function(){var s=this,o=s.$createElement,a=s._self._c||o;return a("div",{staticClass:"col-2"},[a("div",{staticClass:"paal"},[a("div",{staticClass:"inside"})])])},function(){var s=this,o=s.$createElement,a=s._self._c||o;return a("div",{staticClass:"col-2"},[a("div",{staticClass:"paal"},[a("div",{staticClass:"inside"})])])}],n=a("f28c"),t=a.n(n),i=(a("a881"),new t.a.WebSocketPort({url:"wss://circusfamilyprojects.nl:8084"}));i.open();var r={data:function(){return{value:60,addressen:[],address:"",address2:"",color:"",color1Position:40,color2Position:40,selectColor1:!0,selectColor2:!0}},created:function(){this.OSCMessage()},computed:{},methods:{colorPicker1:function(){},OSCMessage:function(){var s=this;i.on("message",(function(o){s.OSCMessages(o)}))},OSCMessages:function(s){"/color1"==s.address&&(this.color1Position=s.args[0])}}},e=r,u=(a("833c"),a("2877")),d=Object(u["a"])(e,c,l,!1,null,"6b3dcff3",null);o["default"]=d.exports},"364d":function(s,o,a){"use strict";a.r(o);var c=function(){var s=this,o=s.$createElement,a=s._self._c||o;return a("div",{staticClass:"parentBackground"},[a("br"),s._m(0),a("div",{staticClass:"row"},[a("div",{staticClass:"col-2"}),a("div",{staticClass:"col-2"},[a("div",{staticClass:"paal",on:{mousedown:s.paal1down,mouseup:s.paal1up}},[a("div",{staticClass:"inside",style:{"background-image":"linear-gradient(0deg,"+s.column1color1+" 0%, "+s.column1color2+" "+s.column1_postion+"%,"+s.column1color1+" 100%)"}})])]),a("div",{staticClass:"col-2"},[a("div",{staticClass:"paal",on:{mousedown:s.paal2down,mouseup:s.paal2up}},[a("div",{staticClass:"inside",style:{"background-image":"linear-gradient(0deg,"+s.column2color1+" 0%, "+s.column2color2+" "+s.column2_postion+"%,"+s.column2color1+" 100%)"}})])]),a("div",{staticClass:"col-2"},[a("div",{staticClass:"paal",on:{mousedown:s.paal3down,mouseup:s.paal3up}},[a("div",{staticClass:"inside",style:{"background-image":"linear-gradient(0deg,"+s.column3color1+" 0%, "+s.column3color2+" "+s.column3_postion+"%,"+s.column3color1+" 100%)"}})])]),a("div",{staticClass:"col-2"},[a("div",{staticClass:"paal",on:{mousedown:s.paal4down,mouseup:s.paal4up}},[a("div",{staticClass:"inside",style:{"background-image":"linear-gradient(0deg,"+s.column4color1+" 0%, "+s.column4color2+" "+s.column4_postion+"%,"+s.column4color1+" 100%)"}})])]),a("div",{staticClass:"col-2"})])])},l=[function(){var s=this,o=s.$createElement,a=s._self._c||o;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-3"}),a("div",{staticClass:"col-6"},[s._v(" RAUM - living apart together")]),a("div",{staticClass:"col-3"})])}],n=a("f28c"),t=a.n(n),i=(a("a881"),a("8055")),r=a.n(i),e=new t.a.WebSocketPort({url:"wss://circusfamilyprojects.nl:8084"});e.open();var u=r.a.connect("https://circusfamilyprojects.nl:6500"),d={data:function(){return{color1:40,column1color1:"#3f87a6",column1color2:"#ebf8e1",column2color1:"#3f87a6",column2color2:"#ebf8e1",column3color1:"#3f87a6",column3color2:"#ebf8e1",column4color1:"#3f87a6",column4color2:"#ebf8e1",column1_postion:50,column2_postion:50,column3_postion:50,column4_postion:50,color1Position:40}},created:function(){this.OSCMessage(),this.siteVisitor()},methods:{siteVisitor:function(){u.on("welcome",(function(s){console.log(s)}))},OSCMessage:function(){var s=this;e.on("message",(function(o){s.OSCMessages(o)}))},OSCMessages:function(s){"/column1_color1"==s.address&&(this.column1color1="rgb("+s.args[0]+","+s.args[1]+","+s.args[2]+")"),"/column1_color2"==s.address&&(this.column1color2="rgb("+s.args[0]+","+s.args[1]+","+s.args[2]+")"),"/column1_position"==s.address&&(this.column1_postion=s.args[0]),"/column2_color1"==s.address&&(this.column2color1="rgb("+s.args[0]+","+s.args[1]+","+s.args[2]+")"),"/column2_color2"==s.address&&(this.column2color2="rgb("+s.args[0]+","+s.args[1]+","+s.args[2]+")"),"/column2_position"==s.address&&(this.column2_postion=s.args[0]),"/column3_color1"==s.address&&(this.column3color1="rgb("+s.args[0]+","+s.args[1]+","+s.args[2]+")"),"/column3_color2"==s.address&&(this.column3color2="rgb("+s.args[0]+","+s.args[1]+","+s.args[2]+")"),"/column3_position"==s.address&&(this.column3_postion=s.args[0]),"/column4_color1"==s.address&&(this.column4color1="rgb("+s.args[0]+","+s.args[1]+","+s.args[2]+")"),"/column4_color2"==s.address&&(this.column4color2="rgb("+s.args[0]+","+s.args[1]+","+s.args[2]+")"),"/column4_position"==s.address&&(this.column4_postion=s.args[0])},paal1down:function(){e.send({address:"/paal1",args:[1]})},paal1up:function(){e.send({address:"/paal1",args:[0]})},paal2down:function(){e.send({address:"/paal2",args:[1]})},paal2up:function(){e.send({address:"/paal2",args:[0]})},paal3down:function(){e.send({address:"/paal3",args:[1]})},paal3up:function(){e.send({address:"/paal3",args:[0]})},paal4down:function(){e.send({address:"/paal4",args:[1]})},paal4up:function(){e.send({address:"/paal4",args:[0]})}}},m=d,p=(a("fb2f"),a("2877")),g=Object(p["a"])(m,c,l,!1,null,"49c4ed65",null);o["default"]=g.exports},"6fab":function(s,o,a){},"833c":function(s,o,a){"use strict";var c=a("6fab"),l=a.n(c);l.a},"9ca7":function(s,o,a){},fb2f:function(s,o,a){"use strict";var c=a("9ca7"),l=a.n(c);l.a}}]);
//# sourceMappingURL=Raum.874a52b7.js.map