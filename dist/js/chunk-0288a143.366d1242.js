(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0288a143"],{"6d66":function(e,t,l){"use strict";l.r(t);var n=l("7a23");const c={class:"grid"},a={class:"col-12"},s={class:"card"},r=Object(n["j"])("h5",null,"Tree",-1),d={class:"col-12"},o={class:"card"},u=Object(n["j"])("h5",null,"TreeTable",-1);function i(e,t,l,i,b,j){const T=Object(n["H"])("Tree"),h=Object(n["H"])("Column"),O=Object(n["H"])("TreeTable");return Object(n["z"])(),Object(n["i"])("div",c,[Object(n["j"])("div",a,[Object(n["j"])("div",s,[r,Object(n["n"])(T,{value:b.treeValue,selectionMode:"checkbox",selectionKeys:b.selectedTreeValue,"onUpdate:selectionKeys":t[0]||(t[0]=e=>b.selectedTreeValue=e)},null,8,["value","selectionKeys"])])]),Object(n["j"])("div",d,[Object(n["j"])("div",o,[u,Object(n["n"])(O,{value:b.treeTableValue,selectionMode:"checkbox",selectionKeys:b.selectedTreeTableValue,"onUpdate:selectionKeys":t[1]||(t[1]=e=>b.selectedTreeTableValue=e)},{header:Object(n["S"])(()=>[Object(n["m"])(" FileSystem ")]),default:Object(n["S"])(()=>[Object(n["n"])(h,{field:"name",header:"Name",expander:!0}),Object(n["n"])(h,{field:"size",header:"Size"}),Object(n["n"])(h,{field:"type",header:"Type"})]),_:1},8,["value","selectionKeys"])])])])}var b=l("82f4"),j={data(){return{treeValue:null,selectedTreeValue:null,treeTableValue:null,selectedTreeTableValue:null}},nodeService:null,created(){this.nodeService=new b["a"]},mounted(){this.nodeService.getTreeNodes().then(e=>this.treeValue=e),this.nodeService.getTreeTableNodes().then(e=>this.treeTableValue=e)}},T=l("6b0d"),h=l.n(T);const O=h()(j,[["render",i]]);t["default"]=O},"82f4":function(e,t,l){"use strict";l.d(t,"a",(function(){return n}));class n{getTreeTableNodes(){return fetch("data/treetablenodes.json").then(e=>e.json()).then(e=>e.root)}getTreeNodes(){return fetch("data/treenodes.json").then(e=>e.json()).then(e=>e.root)}}}}]);
//# sourceMappingURL=chunk-0288a143.366d1242.js.map