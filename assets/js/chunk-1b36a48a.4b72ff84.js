(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b36a48a"],{6840:function(t,e,i){},b4f1:function(t,e,i){"use strict";i("6840")},cd5c:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tag-container"},[t._l(t.dynamicTags,(function(e){return i("el-tag",{key:e,attrs:{"disable-transitions":!0,closable:""},on:{close:function(i){return t.handleClose(e)}}},[t._v(" "+t._s(e)+" ")])})),t.inputVisible?i("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(e)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}):i("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:t.showInput}},[t._v("+")])],2)},s=[],a={name:"tag",data(){return{dynamicTags:["double-click-edit-Title","TAG2"],inputVisible:!1,inputValue:""}},created(){this.initTag()},methods:{initTag(){this.$nextTick(()=>{this.tags=document.querySelectorAll(".el-tag--light"),this.tags.forEach((t,e)=>{t.index=e,t.ondblclick=this.editTag})})},editTag(t){const e=t.target.innerText.replace(/\s*/g,"");window.getSelection?window.getSelection().removeAllRanges():document.selection.empty(),t.target.innerHTML=`<input type="text" value="${e}">`;const i=t.target.children[0];i.select(),i.onblur=t=>{t.target.parentNode.innerHTML=t.target.value+'<i class="el-tag__close el-icon-close"></i>';const i=this.dynamicTags.map(i=>i==e?t.target.value:i);this.dynamicTags=i},i.onkeyup=t=>{13==t.keyCode&&(t.target.parentNode.innerText=t.target.value)}},handleClose(t){this.dynamicTags.splice(this.dynamicTags.indexOf(t),1)},handleInputConfirm(){if(this.dynamicTags.includes(this.inputValue))return this.inputVisible=!1,this.inputValue="",void this.$message({message:"无法增加重复命名",type:"warning"});const t=this.inputValue;t&&this.dynamicTags.push(t),this.inputVisible=!1,this.inputValue="",this.initTag()},handleInputConfirm(){if(this.dynamicTags.includes(this.inputValue))return this.inputVisible=!1,this.inputValue="",void this.$message({message:"无法增加重复命名",type:"warning"});const t=this.inputValue;t&&this.dynamicTags.push(t),this.inputVisible=!1,this.inputValue="",this.initTag()},showInput(){this.inputVisible=!0,this.$nextTick(t=>{this.$refs.saveTagInput.$refs.input.focus()})}}},l=a,u=(i("b4f1"),i("2877")),c=Object(u["a"])(l,n,s,!1,null,"d92ebbd6",null);e["default"]=c.exports}}]);