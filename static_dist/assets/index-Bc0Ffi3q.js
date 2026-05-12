import{u as Ne,g as Re,i as Ue,a as st,b as Ut,c as nt,d as Be,e as Bt,f as Ft,h as Fe,j as lr}from"./echarts-BoxcKMSb.js";import{s as Wt,l as kt,a as cr,f as St,b as dr,c as pr,m as ur}from"./d3-xQscTK8j.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pe=globalThis,ot=Pe.ShadowRoot&&(Pe.ShadyCSS===void 0||Pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lt=Symbol(),Ct=new WeakMap;let Vt=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==lt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(ot&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=Ct.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ct.set(r,e))}return e}toString(){return this.cssText}};const hr=t=>new Vt(typeof t=="string"?t:t+"",void 0,lt),E=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((i,a,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[s+1],t[0]);return new Vt(r,t,lt)},mr=(t,e)=>{if(ot)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const i=document.createElement("style"),a=Pe.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=r.cssText,t.appendChild(i)}},Et=ot?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return hr(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:fr,defineProperty:vr,getOwnPropertyDescriptor:gr,getOwnPropertyNames:xr,getOwnPropertySymbols:br,getPrototypeOf:yr}=Object,We=globalThis,At=We.trustedTypes,wr=At?At.emptyScript:"",$r=We.reactiveElementPolyfillSupport,de=(t,e)=>t,Le={toAttribute(t,e){switch(e){case Boolean:t=t?wr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},ct=(t,e)=>!fr(t,e),Tt={attribute:!0,type:String,converter:Le,reflect:!1,useDefault:!1,hasChanged:ct};Symbol.metadata??=Symbol("metadata"),We.litPropertyMetadata??=new WeakMap;let Y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Tt){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,r);a!==void 0&&vr(this.prototype,e,a)}}static getPropertyDescriptor(e,r,i){const{get:a,set:s}=gr(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:a,set(n){const c=a?.call(this);s?.call(this,n),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Tt}static _$Ei(){if(this.hasOwnProperty(de("elementProperties")))return;const e=yr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(de("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(de("properties"))){const r=this.properties,i=[...xr(r),...br(r)];for(const a of i)this.createProperty(a,r[a])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[i,a]of r)this.elementProperties.set(i,a)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const a=this._$Eu(r,i);a!==void 0&&this._$Eh.set(a,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const a of i)r.unshift(Et(a))}else e!==void 0&&r.push(Et(e));return r}static _$Eu(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$ET(e,r){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:Le).toAttribute(r,i.type);this._$Em=e,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,r){const i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const s=i.getPropertyOptions(a),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Le;this._$Em=a;const c=n.fromAttribute(r,s.type);this[a]=c??this._$Ej?.get(a)??c,this._$Em=null}}requestUpdate(e,r,i,a=!1,s){if(e!==void 0){const n=this.constructor;if(a===!1&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??ct)(s,r)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:i,reflect:a,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(r=void 0),this._$AL.set(e,r)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,s]of i){const{wrapped:n}=s,c=this[a];n!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,s,c)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(r)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(e){}firstUpdated(e){}};Y.elementStyles=[],Y.shadowRootOptions={mode:"open"},Y[de("elementProperties")]=new Map,Y[de("finalized")]=new Map,$r?.({ReactiveElement:Y}),(We.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=globalThis,zt=t=>t,qe=dt.trustedTypes,Ot=qe?qe.createPolicy("lit-html",{createHTML:t=>t}):void 0,Xt="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Kt="?"+L,_r=`<${Kt}>`,B=document,me=()=>B.createComment(""),fe=t=>t===null||typeof t!="object"&&typeof t!="function",pt=Array.isArray,kr=t=>pt(t)||typeof t?.[Symbol.iterator]=="function",Je=`[ 	
\f\r]`,ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mt=/-->/g,Pt=/>/g,j=RegExp(`>|${Je}(?:([^\\s"'>=/]+)(${Je}*=${Je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Lt=/'/g,qt=/"/g,Yt=/^(?:script|style|textarea|title)$/i,Sr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),v=Sr(1),J=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Dt=new WeakMap,R=B.createTreeWalker(B,129);function Gt(t,e){if(!pt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ot!==void 0?Ot.createHTML(e):e}const Cr=(t,e)=>{const r=t.length-1,i=[];let a,s=e===2?"<svg>":e===3?"<math>":"",n=ne;for(let c=0;c<r;c++){const o=t[c];let l,p,d=-1,h=0;for(;h<o.length&&(n.lastIndex=h,p=n.exec(o),p!==null);)h=n.lastIndex,n===ne?p[1]==="!--"?n=Mt:p[1]!==void 0?n=Pt:p[2]!==void 0?(Yt.test(p[2])&&(a=RegExp("</"+p[2],"g")),n=j):p[3]!==void 0&&(n=j):n===j?p[0]===">"?(n=a??ne,d=-1):p[1]===void 0?d=-2:(d=n.lastIndex-p[2].length,l=p[1],n=p[3]===void 0?j:p[3]==='"'?qt:Lt):n===qt||n===Lt?n=j:n===Mt||n===Pt?n=ne:(n=j,a=void 0);const u=n===j&&t[c+1].startsWith("/>")?" ":"";s+=n===ne?o+_r:d>=0?(i.push(l),o.slice(0,d)+Xt+o.slice(d)+L+u):o+L+(d===-2?c:u)}return[Gt(t,s+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class ve{constructor({strings:e,_$litType$:r},i){let a;this.parts=[];let s=0,n=0;const c=e.length-1,o=this.parts,[l,p]=Cr(e,r);if(this.el=ve.createElement(l,i),R.currentNode=this.el.content,r===2||r===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(a=R.nextNode())!==null&&o.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(const d of a.getAttributeNames())if(d.endsWith(Xt)){const h=p[n++],u=a.getAttribute(d).split(L),b=/([.?@])?(.*)/.exec(h);o.push({type:1,index:s,name:b[2],strings:u,ctor:b[1]==="."?Ar:b[1]==="?"?Tr:b[1]==="@"?zr:Ve}),a.removeAttribute(d)}else d.startsWith(L)&&(o.push({type:6,index:s}),a.removeAttribute(d));if(Yt.test(a.tagName)){const d=a.textContent.split(L),h=d.length-1;if(h>0){a.textContent=qe?qe.emptyScript:"";for(let u=0;u<h;u++)a.append(d[u],me()),R.nextNode(),o.push({type:2,index:++s});a.append(d[h],me())}}}else if(a.nodeType===8)if(a.data===Kt)o.push({type:2,index:s});else{let d=-1;for(;(d=a.data.indexOf(L,d+1))!==-1;)o.push({type:7,index:s}),d+=L.length-1}s++}}static createElement(e,r){const i=B.createElement("template");return i.innerHTML=e,i}}function Z(t,e,r=t,i){if(e===J)return e;let a=i!==void 0?r._$Co?.[i]:r._$Cl;const s=fe(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(t),a._$AT(t,r,i)),i!==void 0?(r._$Co??=[])[i]=a:r._$Cl=a),a!==void 0&&(e=Z(t,a._$AS(t,e.values),a,i)),e}class Er{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:i}=this._$AD,a=(e?.creationScope??B).importNode(r,!0);R.currentNode=a;let s=R.nextNode(),n=0,c=0,o=i[0];for(;o!==void 0;){if(n===o.index){let l;o.type===2?l=new $e(s,s.nextSibling,this,e):o.type===1?l=new o.ctor(s,o.name,o.strings,this,e):o.type===6&&(l=new Or(s,this,e)),this._$AV.push(l),o=i[++c]}n!==o?.index&&(s=R.nextNode(),n++)}return R.currentNode=B,a}p(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}class $e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,i,a){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Z(this,e,r),fe(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==J&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):kr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&fe(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ve.createElement(Gt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(r);else{const s=new Er(a,this),n=s.u(this.options);s.p(r),this.T(n),this._$AH=s}}_$AC(e){let r=Dt.get(e.strings);return r===void 0&&Dt.set(e.strings,r=new ve(e)),r}k(e){pt(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,a=0;for(const s of e)a===r.length?r.push(i=new $e(this.O(me()),this.O(me()),this,this.options)):i=r[a],i._$AI(s),a++;a<r.length&&(this._$AR(i&&i._$AB.nextSibling,a),r.length=a)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){const i=zt(e).nextSibling;zt(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Ve{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,a,s){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=r,this._$AM=a,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}_$AI(e,r=this,i,a){const s=this.strings;let n=!1;if(s===void 0)e=Z(this,e,r,0),n=!fe(e)||e!==this._$AH&&e!==J,n&&(this._$AH=e);else{const c=e;let o,l;for(e=s[0],o=0;o<s.length-1;o++)l=Z(this,c[i+o],r,o),l===J&&(l=this._$AH[o]),n||=!fe(l)||l!==this._$AH[o],l===S?e=S:e!==S&&(e+=(l??"")+s[o+1]),this._$AH[o]=l}n&&!a&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ar extends Ve{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}}class Tr extends Ve{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}}class zr extends Ve{constructor(e,r,i,a,s){super(e,r,i,a,s),this.type=5}_$AI(e,r=this){if((e=Z(this,e,r,0)??S)===J)return;const i=this._$AH,a=e===S&&i!==S||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==S&&(i===S||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Or{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const Mr=dt.litHtmlPolyfillSupport;Mr?.(ve,$e),(dt.litHtmlVersions??=[]).push("3.3.2");const Pr=(t,e,r)=>{const i=r?.renderBefore??e;let a=i._$litPart$;if(a===void 0){const s=r?.renderBefore??null;i._$litPart$=a=new $e(e.insertBefore(me(),s),s,void 0,r??{})}return a._$AI(t),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=globalThis;class k extends Y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pr(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}k._$litElement$=!0,k.finalized=!0,ut.litElementHydrateSupport?.({LitElement:k});const Lr=ut.litElementPolyfillSupport;Lr?.({LitElement:k});(ut.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qr={attribute:!0,type:String,converter:Le,reflect:!1,hasChanged:ct},Dr=(t=qr,e,r)=>{const{kind:i,metadata:a}=r;let s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),i==="accessor"){const{name:n}=r;return{set(c){const o=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,o,t,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(i==="setter"){const{name:n}=r;return function(c){const o=this[n];e.call(this,c),this.requestUpdate(n,o,t,!0,c)}}throw Error("Unsupported decorator location: "+i)};function f(t){return(e,r)=>typeof r=="object"?Dr(t,e,r):((i,a,s)=>{const n=a.hasOwnProperty(s);return a.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(a,s):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function M(t){return f({...t,state:!0,attribute:!1})}var Hr=Object.defineProperty,Ir=Object.getOwnPropertyDescriptor,ht=(t,e,r,i)=>{for(var a=i>1?void 0:i?Ir(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Hr(e,r,a),a};const jr=[{href:"/app",label:"看板"},{href:"/app/predictions",label:"预测中心"},{href:"/app/chat",label:"Hermes"},{href:"/app/records",label:"历史记录"},{href:"/app/insights",label:"洞察"},{href:"/app/settings",label:"设置"}];let ge=class extends k{constructor(){super(...arguments),this.current="/",this.theme="auto",this._onNav=()=>{this.current=window.location.pathname||"/"},this._toggleTheme=()=>{const t=this.theme==="dark"?"light":this.theme==="light"?"auto":"dark";this.theme=t,t==="auto"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",t);try{localStorage.setItem("aurum.theme",t)}catch{}this.dispatchEvent(new CustomEvent("theme-change",{bubbles:!0,composed:!0,detail:{theme:t}}))}}connectedCallback(){super.connectedCallback(),this.theme=document.documentElement.getAttribute("data-theme")||"auto",window.addEventListener("popstate",this._onNav),this.current=window.location.pathname||"/"}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._onNav)}updated(t){this.current=window.location.pathname||"/"}render(){const t=this.theme==="dark"?"🌙":this.theme==="light"?"☀️":"⚙️";return v`
      <header class="topbar">
        <div class="inner">
          <a class="brand" href="/" data-route>
            <span class="mark">Au</span>
            <span class="brand-name">Aurum</span>
            <span class="brand-tag">· 黄金市场结构化预测</span>
          </a>
          <nav>
            ${jr.map(e=>v`
              <a
                data-route
                href="${e.href}"
                class="${this.current===e.href||e.href!=="/app"&&this.current.startsWith(e.href)?"active":""}"
              >${e.label}</a>
            `)}
          </nav>
          <div class="right">
            <button class="icon-btn" @click=${this._toggleTheme} title="切换主题（auto / light / dark）">${t}</button>
          </div>
        </div>
      </header>
      <main>
        <slot></slot>
      </main>
    `}};ge.styles=E`
    :host {
      display: block;
      min-height: 100vh;
    }
    .topbar {
      position: sticky;
      top: 0;
      z-index: 30;
      background: color-mix(in srgb, var(--c-bg) 86%, transparent);
      backdrop-filter: saturate(160%) blur(14px);
      -webkit-backdrop-filter: saturate(160%) blur(14px);
      border-bottom: 1px solid var(--c-border);
    }
    .inner {
      width: min(1240px, calc(100% - 48px));
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 0;
      gap: 16px;
    }
    a.brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      color: inherit;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .mark {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: var(--gradient-mark);
      box-shadow: var(--shadow-xs), inset 0 1px 0 rgba(255, 255, 255, 0.18);
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0;
    }
    .mark::after {
      content: "";
      position: absolute;
      inset: 6px;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.34);
      border-bottom-color: transparent;
      border-left-color: transparent;
      pointer-events: none;
    }
    .brand-name { font-size: 15px; }
    .brand-tag {
      font-size: 12px;
      color: var(--c-text-mute);
      letter-spacing: 0.04em;
    }
    nav {
      display: flex;
      gap: 4px;
    }
    nav a {
      padding: 8px 12px;
      font-size: 14px;
      color: var(--c-text-soft);
      border-radius: 6px;
      transition: background var(--dur-fast) var(--ease-out),
                  color var(--dur-fast) var(--ease-out);
    }
    nav a:hover { color: var(--c-text); background: var(--c-accent-soft); }
    nav a.active { color: var(--c-text); background: var(--c-accent-soft); }
    .right {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .icon-btn {
      width: 34px; height: 34px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      color: var(--c-text-soft);
      border: 1px solid transparent;
      transition: background var(--dur-fast) var(--ease-out),
                  border-color var(--dur-fast) var(--ease-out),
                  color var(--dur-fast) var(--ease-out);
    }
    .icon-btn:hover {
      color: var(--c-text);
      background: var(--c-surface);
      border-color: var(--c-border);
    }
    @media (max-width: 760px) {
      .inner { flex-wrap: wrap; padding: 10px 0; }
      nav { order: 3; width: 100%; overflow-x: auto; padding-bottom: 4px; }
      .brand-tag { display: none; }
    }
  `;ht([f()],ge.prototype,"current",2);ht([M()],ge.prototype,"theme",2);ge=ht([A("aurum-shell")],ge);var Nr=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor,V=(t,e,r,i)=>{for(var a=i>1?void 0:i?Rr(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Nr(e,r,a),a};let z=class extends k{constructor(){super(...arguments),this.label="",this.value="—",this.suffix="",this.foot="",this.delta=NaN,this.deltaUnit=""}get deltaDisplay(){return Number.isFinite(this.delta)?this.delta>0?{class:"delta-up",text:`+${this.delta.toFixed(2)}${this.deltaUnit}`}:this.delta<0?{class:"delta-down",text:`${this.delta.toFixed(2)}${this.deltaUnit}`}:{class:"delta-flat",text:`±0${this.deltaUnit}`}:null}render(){const t=this.deltaDisplay;return v`
      <div class="card">
        <div class="label">${this.label}</div>
        <div class="value">
          ${this.value}<span class="suffix">${this.suffix}</span>
        </div>
        <div class="foot">
          ${t?v`<span class="delta ${t.class}">${t.text}</span>`:null}
          <span>${this.foot}</span>
        </div>
      </div>
    `}};z.styles=E`
    :host {
      display: block;
    }
    .card {
      background: var(--c-surface);
      border: 1px solid var(--c-border);
      border-radius: var(--r-md);
      padding: 18px 20px;
      box-shadow: var(--shadow-sm);
      transition: transform var(--dur-base) var(--ease-spring),
                  box-shadow var(--dur-base) var(--ease-out),
                  border-color var(--dur-fast) var(--ease-out);
      position: relative;
      overflow: hidden;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      border-color: var(--c-border-strong);
    }
    .label {
      font-size: 11px;
      color: var(--c-text-mute);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .value {
      margin-top: 10px;
      font-size: 30px;
      font-weight: 600;
      letter-spacing: -0.03em;
      line-height: 1.05;
      color: var(--c-text);
      font-family: var(--font-mono);
      font-variant-numeric: tabular-nums;
    }
    .suffix {
      margin-left: 4px;
      font-size: 16px;
      color: var(--c-text-mute);
      font-weight: 500;
    }
    .foot {
      margin-top: 12px;
      font-size: 12px;
      color: var(--c-text-mute);
      display: flex;
      gap: 6px;
      align-items: center;
      min-height: 14px;
    }
    .delta {
      font-family: var(--font-mono);
      font-variant-numeric: tabular-nums;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .delta-up { color: var(--c-up); background: var(--c-up-soft); }
    .delta-down { color: var(--c-down); background: var(--c-down-soft); }
    .delta-flat { color: var(--c-text-mute); background: var(--c-bg-soft); }
  `;V([f()],z.prototype,"label",2);V([f()],z.prototype,"value",2);V([f()],z.prototype,"suffix",2);V([f()],z.prototype,"foot",2);V([f({type:Number})],z.prototype,"delta",2);V([f()],z.prototype,"deltaUnit",2);z=V([A("aurum-kpi")],z);var Ur=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,mt=(t,e,r,i)=>{for(var a=i>1?void 0:i?Br(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Ur(e,r,a),a};const Fr={上涨:"chip-up",下跌:"chip-down",震荡:"chip-flat",未知:"chip-unknown",success:"chip-up",partial:"chip-flat",failed:"chip-down"};let xe=class extends k{constructor(){super(...arguments),this.label="",this.variant=""}render(){const t=Fr[this.label]||(this.variant?`chip-${this.variant}`:"chip-unknown");return v`<span class="chip ${t}">${this.label||"—"}</span>`}};xe.styles=E`
    :host { display: inline-flex; }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid transparent;
      letter-spacing: 0.01em;
      line-height: 1.2;
    }
    .chip::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.85;
    }
    .chip-up      { color: var(--c-up);      background: var(--c-up-soft);      border-color: var(--c-up-soft); }
    .chip-down    { color: var(--c-down);    background: var(--c-down-soft);    border-color: var(--c-down-soft); }
    .chip-flat    { color: var(--c-flat);    background: var(--c-flat-soft);    border-color: var(--c-flat-soft); }
    .chip-unknown { color: var(--c-unknown); background: var(--c-unknown-soft); border-color: var(--c-unknown-soft); }
    .chip-accent  { color: var(--c-accent);  background: var(--c-accent-soft);  border-color: var(--c-accent-line); }
    .chip-strong  { color: #fff; background: var(--c-text); border-color: var(--c-text); }
  `;mt([f()],xe.prototype,"label",2);mt([f()],xe.prototype,"variant",2);xe=mt([A("aurum-chip")],xe);var Wr=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,Xe=(t,e,r,i)=>{for(var a=i>1?void 0:i?Vr(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Wr(e,r,a),a};let Q=class extends k{constructor(){super(...arguments),this.options=[],this.value="",this.label=""}_select(t){this.value=t,this.dispatchEvent(new CustomEvent("range-change",{detail:{value:t},bubbles:!0,composed:!0}))}render(){return v`
      <div class="group" role="group" aria-label="${this.label}">
        ${this.options.map(t=>v`
          <button
            class="${t.key===this.value?"active":""}"
            aria-pressed="${t.key===this.value?"true":"false"}"
            @click=${()=>this._select(t.key)}
          >${t.label}</button>
        `)}
      </div>
    `}};Q.styles=E`
    :host { display: inline-flex; }
    .group {
      display: inline-flex;
      background: var(--c-surface);
      border: 1px solid var(--c-border);
      border-radius: 8px;
      padding: 2px;
      gap: 0;
    }
    button {
      padding: 6px 12px;
      font-size: 12px;
      color: var(--c-text-mute);
      border-radius: 6px;
      transition: background var(--dur-fast) var(--ease-out),
                  color var(--dur-fast) var(--ease-out);
      font-variant-numeric: tabular-nums;
      line-height: 1.2;
    }
    button:hover { color: var(--c-text); }
    button.active {
      background: var(--c-text);
      color: var(--c-bg);
    }
  `;Xe([f({type:Array})],Q.prototype,"options",2);Xe([f()],Q.prototype,"value",2);Xe([f()],Q.prototype,"label",2);Q=Xe([A("aurum-range-toggle")],Q);var Xr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,ft=(t,e,r,i)=>{for(var a=i>1?void 0:i?Kr(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Xr(e,r,a),a};let be=class extends k{constructor(){super(...arguments),this.open=!1,this.titleText="",this._onKey=t=>{t.key==="Escape"&&this.open&&this._close()},this._close=()=>{this.open=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._onKey)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._onKey)}render(){return v`
      <div class="backdrop" @click=${this._close}></div>
      <aside class="panel" role="dialog" aria-hidden=${!this.open}>
        <div class="head">
          <slot name="title">${this.titleText}</slot>
          <button class="close-btn" @click=${this._close} aria-label="关闭">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <slot></slot>
      </aside>
    `}};be.styles=E`
    :host { display: contents; }
    .backdrop {
      position: fixed; inset: 0;
      background: rgba(15, 12, 8, 0.34);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--dur-base) var(--ease-out);
      z-index: 90;
      backdrop-filter: blur(2px);
    }
    .panel {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: min(620px, 100%);
      background: var(--c-bg);
      border-left: 1px solid var(--c-border);
      box-shadow: var(--shadow-lg);
      transform: translateX(100%);
      transition: transform var(--dur-slow) var(--ease-spring);
      z-index: 100;
      overflow-y: auto;
      padding: 24px 28px 64px;
    }
    :host([open]) .panel { transform: translateX(0); }
    :host([open]) .backdrop { opacity: 1; pointer-events: auto; }
    .head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--c-border);
    }
    .close-btn {
      width: 32px; height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--c-text-mute);
      border-radius: 6px;
      transition: background var(--dur-fast) var(--ease-out),
                  color var(--dur-fast) var(--ease-out);
    }
    .close-btn:hover { color: var(--c-text); background: var(--c-surface); }
    @media (max-width: 540px) {
      .panel { padding: 18px 16px 36px; }
    }
  `;ft([f({type:Boolean,reflect:!0})],be.prototype,"open",2);ft([f()],be.prototype,"titleText",2);be=ft([A("aurum-drawer")],be);var Yr=Object.defineProperty,Gr=Object.getOwnPropertyDescriptor,Jt=(t,e,r,i)=>{for(var a=i>1?void 0:i?Gr(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Yr(e,r,a),a};let De=class extends k{constructor(){super(...arguments),this.entries=[],this.nextId=1,this._onToast=t=>{const e=this.nextId++,r={id:e,message:t.detail.message,variant:t.detail.variant||"info"};this.entries=[...this.entries,r],setTimeout(()=>{this.entries=this.entries.filter(i=>i.id!==e)},2400)}}connectedCallback(){super.connectedCallback(),window.addEventListener("aurum:toast",this._onToast)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("aurum:toast",this._onToast)}render(){return v`
      ${this.entries.map(t=>v`
        <div class="toast ${t.variant}" role="status">
          <span class="dot"></span><span>${t.message}</span>
        </div>
      `)}
    `}};De.styles=E`
    :host {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 200;
      pointer-events: none;
    }
    .toast {
      pointer-events: auto;
      background: var(--c-text);
      color: var(--c-bg);
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      box-shadow: var(--shadow-lg);
      opacity: 0;
      transform: translateY(8px);
      animation: enter 360ms var(--ease-spring) forwards,
                 leave 280ms var(--ease-out) forwards 1.6s;
      max-width: min(560px, calc(100vw - 24px));
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    @keyframes enter {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes leave {
      to { opacity: 0; transform: translateY(-6px); }
    }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--c-accent-bright);
    }
    .toast.info .dot     { background: var(--c-accent-bright); }
    .toast.success .dot  { background: var(--c-up); }
    .toast.warn .dot     { background: var(--c-flat); }
    .toast.error .dot    { background: var(--c-down); }
  `;Jt([M()],De.prototype,"entries",2);De=Jt([A("aurum-toast-stack")],De);function x(t,e="info"){window.dispatchEvent(new CustomEvent("aurum:toast",{detail:{message:t,variant:e}}))}var Jr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,Zt=(t,e,r,i)=>{for(var a=i>1?void 0:i?Zr(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&Jr(e,r,a),a};let He=class extends k{constructor(){super(...arguments),this.h="16px"}render(){return v`<div class="bar" style="--h:${this.h}"></div>`}};He.styles=E`
    :host { display: block; }
    .bar {
      width: 100%;
      height: var(--h, 16px);
      border-radius: 6px;
      background: linear-gradient(
        110deg,
        var(--c-bg-soft) 35%,
        color-mix(in srgb, var(--c-bg-soft) 70%, var(--c-text-faint) 30%) 50%,
        var(--c-bg-soft) 65%
      );
      background-size: 220% 100%;
      animation: shimmer 1.6s ease-in-out infinite;
    }
    @keyframes shimmer {
      0% { background-position: -120% 0; }
      100% { background-position: 220% 0; }
    }
  `;Zt([f()],He.prototype,"h",2);He=Zt([A("aurum-skeleton")],He);var Qr=Object.getOwnPropertyDescriptor,ea=(t,e,r,i)=>{for(var a=i>1?void 0:i?Qr(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=n(a)||a);return a};let tt=class extends k{constructor(){super(...arguments),this._raf=0,this._onMove=t=>{const e=this.getBoundingClientRect(),r=(t.clientX-e.left)/e.width-.5,i=(t.clientY-e.top)/e.height-.5,a=this.renderRoot.querySelector(".orb"),s=this.renderRoot.querySelector(".orb-2");a&&(a.style.transform=`translate(${r*32}px, ${i*24}px)`),s&&(s.style.transform=`translate(${r*-22}px, ${i*-18}px)`)}}connectedCallback(){super.connectedCallback(),window.addEventListener("mousemove",this._onMove)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousemove",this._onMove),this._raf&&cancelAnimationFrame(this._raf)}firstUpdated(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=this.renderRoot.querySelector("canvas");if(!t)return;const e=t.getContext("2d");if(!e)return;const r=Math.min(window.devicePixelRatio||1,2),i=()=>{const l=t.getBoundingClientRect();t.width=Math.max(1,Math.floor(l.width*r)),t.height=Math.max(1,Math.floor(l.height*r))};i(),new ResizeObserver(i).observe(t);const s=[],n=70;(()=>{s.length=0;for(let l=0;l<n;l+=1)s.push({x:Math.random()*t.width,y:Math.random()*t.height,vx:(Math.random()-.5)*.18*r,vy:-Math.random()*.3*r-.05,r:(Math.random()*1.6+.4)*r,alpha:Math.random()*.5+.2})})();const o=()=>{e.clearRect(0,0,t.width,t.height);for(const l of s){l.x+=l.vx,l.y+=l.vy,(l.y<-8||l.x<-8||l.x>t.width+8)&&(l.x=Math.random()*t.width,l.y=t.height+Math.random()*24,l.alpha=Math.random()*.5+.2),e.beginPath();const p=e.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*4);p.addColorStop(0,`rgba(244, 203, 86, ${l.alpha})`),p.addColorStop(1,"rgba(244, 203, 86, 0)"),e.fillStyle=p,e.arc(l.x,l.y,l.r*4,0,Math.PI*2),e.fill()}this._raf=requestAnimationFrame(o)};this._raf=requestAnimationFrame(o)}render(){return v`
      <div class="orb"></div>
      <div class="orb-2"></div>
      <canvas></canvas>
    `}};tt.styles=E`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }
    .orb {
      position: absolute;
      width: 720px;
      height: 720px;
      top: -260px;
      right: -200px;
      border-radius: 50%;
      filter: blur(120px);
      background: radial-gradient(
        circle at 30% 30%,
        rgba(244, 203, 86, 0.55),
        rgba(184, 134, 11, 0.18) 40%,
        transparent 70%
      );
      will-change: transform;
      transition: transform 320ms var(--ease-out);
    }
    .orb-2 {
      position: absolute;
      width: 540px;
      height: 540px;
      bottom: -240px;
      left: -180px;
      border-radius: 50%;
      filter: blur(140px);
      background: radial-gradient(
        circle at 60% 40%,
        rgba(212, 165, 45, 0.30),
        transparent 70%
      );
      will-change: transform;
      transition: transform 480ms var(--ease-out);
    }
    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      mix-blend-mode: screen;
      opacity: 0.55;
    }
    @media (prefers-reduced-motion: reduce) {
      canvas { display: none; }
      .orb, .orb-2 { transition: none; }
    }
  `;tt=ea([A("aurum-orb")],tt);class pe extends Error{constructor(e,r){super(e),this.status=r,this.name="ApiError"}}function ta(){try{const t=localStorage.getItem("aurum.adminToken");return t&&t.trim()?t.trim():null}catch{return null}}async function $(t,e={},r=1){let i;for(let a=0;a<r;a+=1)try{const s={"Content-Type":"application/json",...e.headers||{}},n=ta();n&&!s["X-Admin-Token"]&&(s["X-Admin-Token"]=n);const c=await fetch(t,{...e,headers:s});let o=null;try{o=await c.json()}catch{o=null}if(!c.ok){const l=o&&"error"in o&&o.error?o.error:`HTTP ${c.status}`;throw new pe(l,c.status)}if(!o||o.success===!1)throw new pe(o&&"error"in o&&o.error?o.error:"请求失败",c.status);return o.data}catch(s){if(i=s,a===r-1)break;await new Promise(n=>setTimeout(n,200*(a+1)))}throw i instanceof Error?i:new pe("请求失败")}const y={price:()=>$("/api/price"),runAnalysis:()=>$("/api/analysis/run",{method:"POST"},1),records:()=>$("/api/records"),recordsLatest:(t=30)=>$(`/api/records/latest?n=${t}`),deleteRecord:t=>$(`/api/records/${encodeURIComponent(t)}`,{method:"DELETE"}),timeseries:(t="24h")=>$(`/api/analytics/timeseries?range=${t}`),distribution:(t="24h")=>$(`/api/analytics/distribution?range=${t}`),kpis:(t="24h")=>$(`/api/analytics/kpis?range=${t}`),dashboard:(t=24)=>$(`/api/dashboard/summary?limit=${t}`),runDaily:t=>$(`/api/predictions/daily/run${t?`?date=${t}`:""}`,{method:"POST"}),verifyDaily:t=>$(`/api/predictions/daily/verify${t?`?date=${t}`:""}`,{method:"POST"}),todayPrediction:()=>$("/api/predictions/today"),dailyPredictions:(t="30d")=>$(`/api/predictions/daily?range=${t}`),accuracy:(t="30d")=>$(`/api/predictions/accuracy?window=${t}`),calibration:(t="30d",e=5)=>$(`/api/predictions/calibration?window=${t}&buckets=${e}`),metricsDetailed:(t="90d",e=!0,r=!1,i=!1,a=!1)=>$(`/api/predictions/metrics/detailed?window=${t}&include_synthetic=${e}&include_synthetic_v1=${r}&include_reconstructed=${i}&include_raw=${a}`),channels:()=>$("/api/notifications/channels"),testNotification:t=>$("/api/notifications/test",{method:"POST",headers:{"X-Admin-Token":t}}),chat:{greeting:()=>$("/api/chat/greeting"),listSessions:t=>$("/api/chat/sessions",{headers:{"X-Aurum-Client-Id":t}}),createSession:(t,e)=>$("/api/chat/sessions",{method:"POST",headers:{"X-Aurum-Client-Id":t},body:JSON.stringify({title:e})}),deleteSession:(t,e)=>$(`/api/chat/sessions/${encodeURIComponent(t)}`,{method:"DELETE",headers:{"X-Aurum-Client-Id":e}}),listMessages:(t,e)=>$(`/api/chat/sessions/${encodeURIComponent(t)}/messages`,{headers:{"X-Aurum-Client-Id":e}}),streamMessage:async function*(t,e,r){const i=`/api/chat/sessions/${encodeURIComponent(t)}/message`,a=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json","X-Aurum-Client-Id":e},body:JSON.stringify({content:r})});if(!a.ok){let o=`HTTP ${a.status}`;try{const l=await a.json();l&&typeof l=="object"&&"detail"in l?o=String(l.detail):l&&typeof l=="object"&&"error"in l&&(o=String(l.error))}catch{}throw new pe(o,a.status)}const s=a.body?.getReader();if(!s)return;const n=new TextDecoder;for(;;){const{done:o,value:l}=await s.read();if(o)break;if(l){const p=n.decode(l,{stream:!0});p&&(yield p)}}const c=n.decode();c&&(yield c)}}};let Te=null;const ra=/^[A-Za-z0-9_-]{16,128}$/;function Ht(t){return typeof t=="string"&&ra.test(t)}function aa(){try{if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID()}catch{}return`c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,12)}_${Math.random().toString(36).slice(2,10)}`}function ia(){if(Ht(Te))return Te;try{const e=localStorage.getItem("aurum.clientId");if(Ht(e))return Te=e,e}catch{}const t=aa();Te=t;try{localStorage.setItem("aurum.clientId",t)}catch{}return t}function sa(t){if(typeof EventSource>"u")return()=>{};const e=new EventSource("/api/stream");for(const[r,i]of Object.entries(t))i&&e.addEventListener(r,a=>{try{const s=a.data?JSON.parse(a.data):null;i(s)}catch{}});return e.onerror=()=>{},()=>e.close()}var na=Object.defineProperty,oa=Object.getOwnPropertyDescriptor,te=(t,e,r,i)=>{for(var a=i>1?void 0:i?oa(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&na(e,r,a),a};let D=class extends k{constructor(){super(...arguments),this.price="—",this.delta=null,this.label="实时金价",this.comexOpen=null,this.dataTime=null,this._timer=0,this._previous=null}connectedCallback(){super.connectedCallback(),this._poll(),this._timer=window.setInterval(()=>void this._poll(),15e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}async _poll(){try{const t=await y.price(),e=typeof t.price_value=="number"?t.price_value:null;e!==null?(this.price=e.toFixed(2),this._previous!==null&&(this.delta=Number((e-this._previous).toFixed(2))),this._previous=e):this.price=t.price_raw||"—",this.comexOpen=t.comex_open,this.dataTime=t.data_timestamp||null,t.comex_open===!1?this.label="周末/休市":t.comex_open===!0?this.label="实时金价":this.label=t.data_label||"金价"}catch{}}render(){let t="",e="";this.comexOpen!==!1&&this.delta!==null&&Math.abs(this.delta)>.001&&(t=this.delta>0?"delta-up":"delta-down",e=`${this.delta>0?"+":""}${this.delta}`);const r=this.comexOpen===!1&&this.dataTime?v`<span class="label-meta">截至 ${this.dataTime}</span>`:null;return v`
      <span class="pulse ${this.comexOpen===!1?"closed":""}" aria-hidden="true"></span>
      <span>${this.label}</span>
      <span class="num">${this.price}</span>
      ${e?v`<span class="delta ${t}">${e}</span>`:null}
      ${r}
    `}};D.styles=E`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      border-radius: 999px;
      background: var(--c-surface);
      border: 1px solid var(--c-border);
      box-shadow: var(--shadow-sm);
      font-size: 13px;
      color: var(--c-text-soft);
    }
    .pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--c-up);
      box-shadow: 0 0 0 0 rgba(21, 128, 61, 0.42);
      animation: pulse 1.6s ease-out infinite;
    }
    .pulse.closed {
      background: var(--c-text-mute);
      animation: none;
      box-shadow: none;
    }
    @keyframes pulse {
      0%   { box-shadow: 0 0 0 0 rgba(21, 128, 61, 0.45); }
      80%  { box-shadow: 0 0 0 10px rgba(21, 128, 61, 0); }
      100% { box-shadow: 0 0 0 0 rgba(21, 128, 61, 0); }
    }
    .num {
      font-family: var(--font-mono);
      font-variant-numeric: tabular-nums;
      color: var(--c-text);
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .delta {
      font-family: var(--font-mono);
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .delta-up { color: var(--c-up); background: var(--c-up-soft); }
    .delta-down { color: var(--c-down); background: var(--c-down-soft); }
    .label-meta {
      font-size: 11px;
      color: var(--c-text-mute);
      letter-spacing: 0.04em;
    }
  `;te([M()],D.prototype,"price",2);te([M()],D.prototype,"delta",2);te([M()],D.prototype,"label",2);te([M()],D.prototype,"comexOpen",2);te([M()],D.prototype,"dataTime",2);D=te([A("aurum-live-ticker")],D);var la=Object.defineProperty,ca=Object.getOwnPropertyDescriptor,_e=(t,e,r,i)=>{for(var a=i>1?void 0:i?ca(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&la(e,r,a),a};function Ze(t){return t.toString().padStart(2,"0")}function da(t,e){const i=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(new Date),a=b=>Number(i.find(g=>g.type===b)?.value??"0"),s=a("year"),n=a("month"),c=a("day"),o=a("hour"),l=a("minute"),p=a("second"),d=Date.UTC(s,n-1,c,t-8,e,0),h=Date.UTC(s,n-1,c,o-8,l,p);let u=d;return u<=h&&(u+=24*60*60*1e3),new Date(u)}let F=class extends k{constructor(){super(...arguments),this.hour=2,this.minute=50,this.label="距下一次 02:50 北京时间预测",this.remainingMs=0,this._timer=0}connectedCallback(){super.connectedCallback(),this._tick(),this._timer=window.setInterval(()=>this._tick(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}_tick(){const t=da(this.hour,this.minute);this.remainingMs=Math.max(0,t.getTime()-Date.now())}render(){const t=Math.floor(this.remainingMs/1e3),e=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return v`
      <span class="label">${this.label}</span>
      <span class="display">
        <span>${Ze(e)}</span><span class="unit">h</span>
        <span>${Ze(r)}</span><span class="unit">m</span>
        <span>${Ze(i)}</span><span class="unit">s</span>
      </span>
    `}};F.styles=E`
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: 4px;
    }
    .label {
      font-size: 11px;
      color: var(--c-text-mute);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .display {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      font-family: var(--font-mono);
      font-variant-numeric: tabular-nums;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--c-text);
    }
    .unit { font-size: 13px; color: var(--c-text-mute); font-weight: 400; }
  `;_e([f({type:Number})],F.prototype,"hour",2);_e([f({type:Number})],F.prototype,"minute",2);_e([f()],F.prototype,"label",2);_e([M()],F.prototype,"remainingMs",2);F=_e([A("aurum-countdown")],F);var pa=Object.defineProperty,ua=Object.getOwnPropertyDescriptor,Ke=(t,e,r,i)=>{for(var a=i>1?void 0:i?ua(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&pa(e,r,a),a};let ee=class extends k{constructor(){super(...arguments),this.eyebrow="",this.titleText="",this.desc=""}render(){return v`
      <div class="left">
        ${this.eyebrow?v`<span class="eyebrow">${this.eyebrow}</span>`:null}
        <span class="title">${this.titleText}</span>
        ${this.desc?v`<span class="desc">${this.desc}</span>`:null}
      </div>
      <div class="right">
        <slot></slot>
      </div>
    `}};ee.styles=E`
    :host {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 16px;
    }
    .left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .eyebrow {
      font-size: 11px;
      color: var(--c-text-mute);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: var(--c-text);
    }
    .desc {
      font-size: 13px;
      color: var(--c-text-mute);
    }
  `;Ke([f()],ee.prototype,"eyebrow",2);Ke([f()],ee.prototype,"titleText",2);Ke([f()],ee.prototype,"desc",2);ee=Ke([A("aurum-section-header")],ee);var ha=Object.defineProperty,ma=Object.getOwnPropertyDescriptor,re=(t,e,r,i)=>{for(var a=i>1?void 0:i?ma(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&ha(e,r,a),a};let H=class extends k{constructor(){super(...arguments),this.label="",this.value="—",this.delta="",this.tone="neutral",this.hint=""}render(){return v`
      <div class="badge">
        <div class="label">${this.label}</div>
        <div class="value-row">
          <span class="value">${this.value}</span>
          ${this.delta?v`<span class="delta">${this.delta}</span>`:null}
        </div>
        ${this.hint?v`<div class="hint">${this.hint}</div>`:null}
      </div>
    `}};H.styles=E`
    :host {
      display: block;
    }
    .badge {
      background: var(--c-surface);
      border: 1px solid var(--c-border);
      border-radius: var(--r-md);
      padding: 12px 14px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: border-color var(--dur-fast) var(--ease-out);
      min-height: 76px;
    }
    .badge:hover { border-color: var(--c-border-strong); }
    .label {
      font-size: 10px;
      color: var(--c-text-mute);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .value-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }
    .value {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.02em;
      font-family: var(--font-mono);
      font-variant-numeric: tabular-nums;
      line-height: 1.1;
      color: var(--c-text);
    }
    .delta {
      font-family: var(--font-mono);
      font-variant-numeric: tabular-nums;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .hint {
      font-size: 10px;
      color: var(--c-text-mute);
      margin-top: auto;
    }
    /* tone color rails */
    :host([tone="up"]) .badge,
    :host([tone="oversold"]) .badge { border-left: 2px solid var(--c-up); }
    :host([tone="down"]) .badge,
    :host([tone="overbought"]) .badge { border-left: 2px solid var(--c-down); }
    :host([tone="neutral"]) .badge { border-left: 2px solid var(--c-accent); }

    :host([tone="up"]) .delta,
    :host([tone="oversold"]) .delta { color: var(--c-up); background: var(--c-up-soft); }
    :host([tone="down"]) .delta,
    :host([tone="overbought"]) .delta { color: var(--c-down); background: var(--c-down-soft); }
    :host([tone="neutral"]) .delta { color: var(--c-text-mute); background: var(--c-bg-soft); }
  `;re([f()],H.prototype,"label",2);re([f()],H.prototype,"value",2);re([f()],H.prototype,"delta",2);re([f({reflect:!0})],H.prototype,"tone",2);re([f()],H.prototype,"hint",2);H=re([A("aurum-signal-badge")],H);var fa=Object.defineProperty,va=Object.getOwnPropertyDescriptor,ke=(t,e,r,i)=>{for(var a=i>1?void 0:i?va(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&fa(e,r,a),a};let W=class extends k{constructor(){super(...arguments),this.variant="assistant",this.content="",this.typing=!1,this.meta=""}render(){return v`
      <div class="stack">
        <div class="bubble">${this.content}${this.typing?v`<span class="typing"><span></span><span></span><span></span></span>`:null}</div>
        ${this.meta?v`<div class="meta">${this.meta}</div>`:null}
      </div>
    `}};W.styles=E`
    :host {
      display: flex;
      width: 100%;
      margin-bottom: 14px;
    }
    :host([variant="user"]) {
      justify-content: flex-end;
    }
    :host([variant="assistant"]) {
      justify-content: flex-start;
    }
    .bubble {
      max-width: min(720px, 88%);
      padding: 12px 16px;
      border-radius: 14px;
      line-height: 1.65;
      font-size: 15px;
      white-space: pre-wrap;
      word-break: break-word;
      box-shadow: var(--shadow-xs);
      border: 1px solid transparent;
    }
    :host([variant="user"]) .bubble {
      background: var(--c-text);
      color: var(--c-bg);
      border-bottom-right-radius: 4px;
    }
    :host([variant="assistant"]) .bubble {
      background: var(--c-surface);
      color: var(--c-text);
      border-color: var(--c-border);
      border-bottom-left-radius: 4px;
    }
    .meta {
      font-size: 11px;
      color: var(--c-text-mute);
      margin-top: 6px;
      letter-spacing: 0.04em;
    }
    :host([variant="user"]) .meta { text-align: right; }
    .typing {
      display: inline-flex;
      gap: 4px;
      vertical-align: middle;
      margin-left: 2px;
    }
    .typing span {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.5;
      animation: blink 1.2s infinite ease-in-out;
    }
    .typing span:nth-child(2) { animation-delay: 0.15s; }
    .typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes blink {
      0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
      40% { opacity: 0.95; transform: translateY(-1px); }
    }
    .stack {
      display: flex;
      flex-direction: column;
      max-width: 100%;
    }
  `;ke([f({reflect:!0})],W.prototype,"variant",2);ke([f()],W.prototype,"content",2);ke([f({type:Boolean})],W.prototype,"typing",2);ke([f()],W.prototype,"meta",2);W=ke([A("aurum-chat-bubble")],W);var ga=Object.defineProperty,xa=Object.getOwnPropertyDescriptor,vt=(t,e,r,i)=>{for(var a=i>1?void 0:i?xa(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&ga(e,r,a),a};let ye=class extends k{constructor(){super(...arguments),this.disabled=!1,this.value=""}get charCount(){return this.value.length}_onInput(t){const e=t.target;this.value=e.value,e.style.height="auto",e.style.height=`${Math.min(e.scrollHeight,220)}px`}_onKeyDown(t){t.key==="Enter"&&!t.shiftKey&&!t.isComposing&&(t.preventDefault(),this._submit())}_submit(){const t=this.value.trim();if(!t||this.disabled||t.length>4e3)return;this.dispatchEvent(new CustomEvent("send",{detail:{content:t},bubbles:!0,composed:!0})),this.value="";const e=this.renderRoot.querySelector("textarea");e&&(e.style.height="auto")}render(){const t=this.charCount>4e3;return v`
      <div class="wrap">
        <textarea
          rows="1"
          placeholder="问问 Hermes 关于黄金行情或网站使用… (Enter 发送 / Shift+Enter 换行)"
          .value=${this.value}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
          ?disabled=${this.disabled}
        ></textarea>
        <button class="send" @click=${this._submit} ?disabled=${this.disabled||!this.value.trim()||t} aria-label="发送">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div class="meta">
        <span>Hermes 只能聊黄金与网站使用，不会触碰代码 / 部署 / 服务器</span>
        <span class=${t?"warn":""}>${this.charCount} / 4000</span>
      </div>
    `}};ye.styles=E`
    :host {
      display: block;
      position: sticky;
      bottom: 0;
      background: linear-gradient(to top, var(--c-bg) 70%, transparent);
      padding: 12px 8px 16px;
    }
    .wrap {
      display: flex;
      gap: 10px;
      align-items: flex-end;
      border: 1px solid var(--c-border);
      background: var(--c-surface);
      border-radius: 16px;
      padding: 8px 10px 8px 14px;
      box-shadow: var(--shadow-sm);
      transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
    }
    .wrap:focus-within {
      border-color: var(--c-accent-line);
      box-shadow: var(--shadow-md);
    }
    textarea {
      flex: 1;
      resize: none;
      outline: none;
      border: 0;
      background: transparent;
      color: var(--c-text);
      font: inherit;
      font-size: 15px;
      line-height: 1.55;
      max-height: 220px;
      min-height: 24px;
      padding: 6px 0;
      font-family: var(--font-sans);
    }
    button.send {
      align-self: flex-end;
      background: var(--c-text);
      color: var(--c-bg);
      border-radius: 12px;
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
    }
    button.send[disabled] { opacity: 0.4; cursor: not-allowed; }
    button.send:hover:not([disabled]) { transform: translateY(-1px); }
    .meta {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--c-text-mute);
      margin-top: 6px;
      padding: 0 4px;
    }
    .meta .warn { color: var(--c-down); }
  `;vt([f({type:Boolean})],ye.prototype,"disabled",2);vt([M()],ye.prototype,"value",2);ye=vt([A("aurum-chat-input")],ye);var ba=Object.defineProperty,ya=Object.getOwnPropertyDescriptor,gt=(t,e,r,i)=>{for(var a=i>1?void 0:i?ya(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&ba(e,r,a),a};let we=class extends k{constructor(){super(...arguments),this.sessions=[],this.activeId=""}_select(t){this.dispatchEvent(new CustomEvent("session-select",{detail:{id:t},bubbles:!0,composed:!0}))}_delete(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("session-delete",{detail:{id:e},bubbles:!0,composed:!0}))}_newSession(){this.dispatchEvent(new CustomEvent("session-create",{bubbles:!0,composed:!0}))}_formatRelative(t){if(!t)return"";const e=Date.parse(t.replace(" ","T"));if(!Number.isFinite(e))return t.slice(5,16);const r=(Date.now()-e)/1e3;return r<60?"刚刚":r<3600?`${Math.floor(r/60)} 分钟前`:r<86400?`${Math.floor(r/3600)} 小时前`:r<86400*7?`${Math.floor(r/86400)} 天前`:t.slice(5,10)}render(){return v`
      <div class="head">
        <h3>历史对话</h3>
        <button class="new-btn" @click=${this._newSession}>+ 新对话</button>
      </div>
      <div class="list">
        ${this.sessions.length===0?v`<div class="empty">还没有任何对话<br/>点上方「+ 新对话」开始</div>`:this.sessions.map(t=>v`
            <div class="item ${t.id===this.activeId?"active":""}" @click=${()=>this._select(t.id)}>
              <div class="text">
                <div class="title">${t.title||"新对话"}</div>
                <div class="meta">${t.message_count} 条消息 · ${this._formatRelative(t.updated_at)}</div>
              </div>
              <button class="del-btn" @click=${e=>this._delete(e,t.id)} aria-label="删除">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                </svg>
              </button>
            </div>
          `)}
      </div>
    `}};we.styles=E`
    :host {
      display: block;
      width: 100%;
    }
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 4px 10px;
    }
    .head h3 {
      margin: 0;
      font-size: 11px;
      font-weight: 500;
      color: var(--c-text-mute);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    button.new-btn {
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      color: var(--c-bg);
      background: var(--c-text);
      border-radius: 8px;
      transition: opacity var(--dur-fast) var(--ease-out);
    }
    button.new-btn:hover { opacity: 0.85; }
    .list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      max-height: calc(100vh - 220px);
      overflow-y: auto;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background var(--dur-fast) var(--ease-out);
    }
    .item:hover { background: var(--c-surface-2); }
    .item.active {
      background: var(--c-accent-soft);
      border: 1px solid var(--c-accent-line);
    }
    .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .title {
      font-size: 13px;
      color: var(--c-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .meta {
      font-size: 11px;
      color: var(--c-text-mute);
    }
    button.del-btn {
      width: 26px;
      height: 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      color: var(--c-text-mute);
      opacity: 0;
      transition: opacity var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
    }
    .item:hover button.del-btn,
    .item.active button.del-btn { opacity: 1; }
    button.del-btn:hover { color: var(--c-down); background: var(--c-down-soft); }
    .empty {
      color: var(--c-text-mute);
      font-size: 13px;
      padding: 12px;
      text-align: center;
    }
  `;gt([f({type:Array})],we.prototype,"sessions",2);gt([f()],we.prototype,"activeId",2);we=gt([A("aurum-chat-session-list")],we);var wa=Object.defineProperty,$a=Object.getOwnPropertyDescriptor,Qt=(t,e,r,i)=>{for(var a=i>1?void 0:i?$a(e,r):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(i?n(e,r,a):n(a))||a);return i&&a&&wa(e,r,a),a};let Ie=class extends k{constructor(){super(...arguments),this.greeting=null}_select(t){this.dispatchEvent(new CustomEvent("suggestion-select",{detail:{question:t},bubbles:!0,composed:!0}))}render(){return this.greeting?v`
      <div class="card">
        <div class="greet">${this.greeting.opening_message}</div>
        <div class="suggestions">
          ${(this.greeting.suggested_questions||[]).map(t=>v`
            <button class="suggestion" @click=${()=>this._select(t)}>${t}</button>
          `)}
        </div>
      </div>
    `:v`<div class="card"><div class="greet">Hermes 正在准备你今天的金价摘要…</div></div>`}};Ie.styles=E`
    :host {
      display: block;
      margin-bottom: 16px;
    }
    .card {
      background:
        radial-gradient(420px 220px at 100% 0%, color-mix(in srgb, var(--c-accent) 12%, transparent), transparent 70%),
        var(--c-surface);
      border: 1px solid var(--c-border);
      border-radius: 14px;
      padding: 20px 22px;
      box-shadow: var(--shadow-sm);
    }
    .greet {
      font-size: 15px;
      line-height: 1.7;
      color: var(--c-text);
      white-space: pre-wrap;
    }
    .suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }
    .suggestion {
      padding: 8px 14px;
      border-radius: 999px;
      background: var(--c-surface-2);
      border: 1px solid var(--c-border);
      font-size: 13px;
      color: var(--c-text);
      cursor: pointer;
      transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
    }
    .suggestion:hover {
      background: var(--c-accent-soft);
      border-color: var(--c-accent-line);
      transform: translateY(-1px);
    }
  `;Qt([f({attribute:!1})],Ie.prototype,"greeting",2);Ie=Qt([A("aurum-chat-greeting-card")],Ie);class _a{constructor(){this.routes=[],this.fallback=null,this.mount=null,this.currentEl=null}on(e,r){return this.routes.push({prefix:e,render:r}),this.routes.sort((i,a)=>a.prefix.length-i.prefix.length),this}setFallback(e){return this.fallback=e,this}bind(e){this.mount=e,window.addEventListener("popstate",()=>this.render()),document.addEventListener("click",r=>{const i=r.target?.closest("a[data-route]");if(!i)return;const a=i.getAttribute("href");!a||a.startsWith("http")||(r.preventDefault(),this.navigate(a))}),this.render()}navigate(e){window.location.pathname+window.location.search!==e&&(history.pushState({},"",e),this.render())}render(){if(!this.mount)return;const e=window.location.pathname||"/";let i=this.routes.find(s=>e===s.prefix||e.startsWith(s.prefix==="/"?"//never-match":s.prefix))?.render;if(!i&&e==="/"&&(i=this.routes.find(n=>n.prefix==="/")?.render),i||(i=this.fallback||void 0),!i)return;const a=i({path:e});a.dataset.routeMount="true",this.currentEl&&this.currentEl.parentElement===this.mount?this.mount.replaceChild(a,this.currentEl):this.mount.replaceChildren(a),this.currentEl=a,window.scrollTo({top:0,behavior:"instant"}),document.title=a.dataset.title?`${a.dataset.title} · Aurum`:"Aurum · 黄金市场结构化预测"}}const er=new _a;function w(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function tr(t){const e=String(t||"").trim();return e?/^(https?:|mailto:)/i.test(e)?e:e.startsWith("//")?`https:${e}`:e.startsWith("/")||e.startsWith("#")?e:"#":"#"}function T(t,e=2,r="—"){return t==null||!Number.isFinite(t)?r:t.toFixed(e)}function O(t,e=0,r="—"){return t==null||!Number.isFinite(t)?r:`${(t*100).toFixed(e)}%`}function rr(t,e=160){return t?t.length<=e?t:`${t.slice(0,e-1)}…`:""}function q(t,e,r){if(t&&(t.dataset.state=e,typeof r=="string")){const i=t.querySelector("[data-label]");i&&(i.textContent=r)}}const ka=`
.landing { position: relative; }
.hero {
  position: relative;
  padding: 80px 0 64px;
  isolation: isolate;
}
.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
  align-items: center;
}
.hero h1 {
  margin: 0 0 18px;
  font-size: clamp(48px, 6.4vw, 78px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.025em;
  background: linear-gradient(180deg, var(--c-text) 0%, color-mix(in srgb, var(--c-text) 70%, var(--c-bg-soft)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero h1 .gold {
  background: linear-gradient(135deg, #d4a52d 0%, #6b4f0a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero p.lead {
  margin: 0 0 30px;
  color: var(--c-text-soft);
  font-size: 17px;
  line-height: 1.65;
  max-width: 56ch;
}
.hero-cta { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.hero-side {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.hero-card {
  background: color-mix(in srgb, var(--c-surface) 88%, transparent);
  backdrop-filter: blur(12px);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: var(--shadow-md);
}
.hero-card .label {
  font-size: 11px;
  color: var(--c-text-mute);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.hero-card .pred-direction {
  font-size: 56px;
  font-weight: 600;
  letter-spacing: -0.04em;
  font-family: var(--font-mono);
  color: var(--c-text);
  line-height: 1.05;
  margin-bottom: 6px;
}
.hero-card .pred-meta {
  color: var(--c-text-mute);
  font-size: 13px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.hero-card .pred-summary {
  margin-top: 14px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--c-text-soft);
}
.hero-pill { padding: 4px 10px; border-radius: 999px; font-size: 12px; }

.value-row {
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.value-row .vc {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  padding: 24px;
  transition: transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base);
}
.value-row .vc:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.value-row .icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: var(--c-accent-soft);
  color: var(--c-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}
.value-row h3 { margin: 0 0 8px; font-size: 16px; font-weight: 600; letter-spacing: -0.01em; }
.value-row p { margin: 0; color: var(--c-text-mute); font-size: 14px; line-height: 1.6; }

.flow {
  margin-top: 96px;
  text-align: left;
  position: relative;
}
.flow .grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;
}
.flow .step {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 22px 22px 24px;
  position: relative;
}
.flow .step::before {
  content: counter(step);
  counter-increment: step;
  position: absolute;
  top: 18px; right: 20px;
  font-family: var(--font-mono);
  color: var(--c-accent);
  font-size: 12px;
  letter-spacing: 0.04em;
}
.flow .grid { counter-reset: step; }
.flow .step h4 { margin: 0 0 8px; font-size: 15px; font-weight: 600; }
.flow .step p { margin: 0; font-size: 13px; color: var(--c-text-mute); line-height: 1.6; }

.cta-band {
  margin-top: 96px;
  padding: 56px 48px;
  border-radius: 18px;
  background:
    radial-gradient(800px 360px at 80% 0%, rgba(212, 165, 45, 0.32), transparent 60%),
    var(--c-text);
  color: var(--c-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  box-shadow: var(--shadow-lg);
}
.cta-band h2 {
  margin: 0;
  font-size: clamp(22px, 2.4vw, 30px);
  font-weight: 600;
  letter-spacing: -0.02em;
  max-width: 30ch;
}
.cta-band a {
  background: var(--c-bg);
  color: var(--c-text);
  padding: 12px 22px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  transition: transform var(--dur-fast) var(--ease-out);
}
.cta-band a:hover { transform: translateY(-1px); }

@media (max-width: 960px) {
  .hero { padding: 56px 0 32px; }
  .hero-inner { grid-template-columns: 1fr; gap: 28px; }
  .value-row { grid-template-columns: 1fr; }
  .flow .grid { grid-template-columns: 1fr 1fr; }
  .cta-band { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
}
@media (max-width: 540px) {
  .flow .grid { grid-template-columns: 1fr; }
}
`;function It(){const t=document.createElement("div");return t.dataset.title="封面",t.innerHTML=`
    <style>${ka}</style>
    <aurum-shell>
      <div class="landing shell">
        <section class="hero">
          <aurum-orb></aurum-orb>
          <div class="hero-inner">
            <div data-anim="0">
              <h1>把行情、新闻、历史预测，<br/>翻译成一份<span class="gold">可校准</span>的判断。</h1>
              <p class="lead">Aurum 每日 02:50 北京时间自动产出今日金价定性与次日方向预测，过去命中率与置信度校准全程留痕，新闻面 + 多源行情双轨输入，模型输出可追溯、可比对、可订正。</p>
              <div class="hero-cta">
                <a href="/app" class="btn btn-primary" data-route>进入应用</a>
                <a href="/app/chat" class="btn btn-ghost" data-route>和 Hermes 聊聊金价</a>
                <a href="/app/predictions" class="btn btn-ghost" data-route>明日预测</a>
                <aurum-live-ticker></aurum-live-ticker>
              </div>
            </div>
            <div class="hero-side" data-anim="2">
              <div class="hero-card">
                <div class="label">下一份预测</div>
                <div class="pred-direction" id="hero-pred">—</div>
                <div class="pred-meta" id="hero-meta">等待 02:50 调度</div>
                <div class="pred-summary" id="hero-summary">系统初始化中…</div>
              </div>
              <aurum-countdown></aurum-countdown>
            </div>
          </div>
        </section>

        <section class="value-row">
          <div class="vc" data-anim="3">
            <div class="icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3>双源收盘交叉验证</h3>
            <p>SGE 上海黄金交易所夜场收盘 + COMEX 国际黄金期货收盘，双轨拉取互为校验，单源失效自动降级。</p>
          </div>
          <div class="vc" data-anim="4">
            <div class="icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3>02:50 北京时间自动定调</h3>
            <p>每日固定时点产出今日定性 + 次日方向，调度由 Hermes 框架托管，挂钟触发不漂移、Cron 重试不重复。</p>
          </div>
          <div class="vc" data-anim="5">
            <div class="icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6"/><path d="M6 20V10"/><path d="M18 20V4"/></svg>
            </div>
            <h3>历史命中率持续校准</h3>
            <p>每条预测次日自动比对实际收盘，命中/未中持久化，置信度桶分布与失误模式回灌进 prompt，让模型主动调档。</p>
          </div>
        </section>

        <section class="flow">
          <span class="section-eyebrow">运转节奏</span>
          <h2 class="h-display h-display-md">从抓数到推送，全自动闭环。</h2>
          <div class="grid">
            <div class="step" data-anim="3">
              <h4>采集</h4>
              <p>30 分钟轮询金价/新闻 + SGE 夜场 + COMEX 日 K，多源去抖。</p>
            </div>
            <div class="step" data-anim="4">
              <h4>分析</h4>
              <p>LangChain 编排 LLM，输出结构化趋势、置信度、原因 3 条、操作建议。</p>
            </div>
            <div class="step" data-anim="5">
              <h4>校准</h4>
              <p>每日 03:10 用次日实际收盘比对，回填命中率与失误模式。</p>
            </div>
            <div class="step" data-anim="6">
              <h4>推送</h4>
              <p>Webhook / Telegram / 飞书 / 企业微信 / 邮件全通道留接口，配齐即用。</p>
            </div>
          </div>
        </section>

        <section class="cta-band" data-anim="6">
          <h2>把模型的每次判断都留痕、可比、可订正。</h2>
          <a href="/app" data-route>进入看板 →</a>
        </section>
      </div>
      <aurum-toast-stack></aurum-toast-stack>
    </aurum-shell>
  `,Sa(t),t}async function Sa(t){try{const e=await y.todayPrediction(),r=t.querySelector("#hero-pred"),i=t.querySelector("#hero-meta"),a=t.querySelector("#hero-summary");if(!r||!i||!a)return;if(!e){r.textContent="—",i.textContent="等待首次 02:50 触发",a.textContent="服务正在持续抓取数据中。";return}r.textContent=e.tomorrow_direction;const n=e.is_today!==!1?`${e.prediction_date} 预测次日`:`${e.prediction_date} 旧版预测（待今日 02:50 刷新）`;i.innerHTML=`
      <span class="hero-pill chip-accent">${w(n)}</span>
      <span>置信 ${O(e.tomorrow_confidence)}</span>
      <span>近 30 天准确率 ${O(e.accuracy_window_30d)}</span>
    `,a.textContent=e.tomorrow_advice||e.reasoning_summary||"—"}catch{}}Ne([st,Ut,nt,Be,Bt,Ft,Fe]);const jt={上涨:"#15803d",下跌:"#b91c1c",震荡:"#a16207",未知:"#6b7280"};function oe(t,e){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()||e}function ze(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function ar(t,e){const r=Re(t)||Ue(t,void 0,{renderer:"canvas"}),i=e.filter(u=>Number.isFinite(u.price)),a=oe("--c-accent","#b8860b"),s=oe("--c-text","#0a0a0a"),n=oe("--c-text-mute","#7e7a76"),c=oe("--c-surface","#fff"),o=oe("--c-border","#e7e5e4");if(i.length===0)return r.clear(),r.setOption({graphic:{type:"text",left:"center",top:"middle",style:{text:"暂无数据 · 等待首次分析",fill:n,font:"13px -apple-system"}}}),r;const l=i.map(u=>u.time),p=i.map(u=>u.price),d=Ca(p,7),h=i.map(u=>({value:[u.time,u.price],itemStyle:{color:jt[u.trend]||"#6b7280"},meta:u}));return r.setOption({grid:{left:56,right:24,top:28,bottom:36},animationDuration:720,animationEasing:"cubicOut",tooltip:{trigger:"axis",axisPointer:{type:"line",lineStyle:{color:o}},backgroundColor:c,borderColor:o,borderWidth:1,padding:12,textStyle:{color:s,fontSize:12},formatter:u=>{const b=Array.isArray(u)?u:[u];if(b.length===0)return"";const g=b.find(ae=>ae.seriesName==="price")||b[0],m=b.find(ae=>ae.seriesName==="trend-points")?.data?.meta,X=g.axisValueLabel||g.axisValue||m?.time||"";let C=null;Array.isArray(g.value)?C=g.value[1]:typeof g.value=="number"&&(C=g.value);const I=typeof C=="number"&&Number.isFinite(C)?C.toFixed(2):"—",K=m?.trend||"",Ye=m?.status||"",Ce=m?.summary||"",Ge=jt[K]||n;return`
          <div style="font-family:-apple-system,sans-serif;color:${s}">
            <div style="font-size:11px;color:${n};letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px">${ze(X)}</div>
            <div style="font-size:22px;font-weight:600;letter-spacing:-.02em;font-feature-settings:'tnum'">${I}</div>
            <div style="margin-top:4px;font-size:12px;color:${n}">
              <span style="color:${Ge}">●</span> ${ze(K||"—")} · ${ze(Ye||"—")}
            </div>
            ${Ce?`<div style="margin-top:8px;max-width:280px;font-size:12px;line-height:1.5;color:${s}">${ze(Ce)}</div>`:""}
          </div>`}},xAxis:{type:"category",data:l,boundaryGap:!1,axisLine:{show:!1},axisTick:{show:!1},axisLabel:{color:n,fontSize:11,hideOverlap:!0,formatter:u=>u.slice(11,16)}},yAxis:{type:"value",scale:!0,axisLine:{show:!1},axisTick:{show:!1},splitLine:{lineStyle:{color:o,type:"dashed"}},axisLabel:{color:n,fontSize:11,fontFamily:"ui-monospace, SF Mono",formatter:u=>u.toFixed(0)}},series:[{name:"price",type:"line",data:p,smooth:.3,showSymbol:!1,lineStyle:{width:1.5,color:a},areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"rgba(184, 134, 11, 0.20)"},{offset:1,color:"rgba(184, 134, 11, 0)"}]}},z:1},{name:"ma7",type:"line",data:d,smooth:.3,showSymbol:!1,lineStyle:{width:1,color:n,type:"dashed",opacity:.6},z:2},{name:"trend-points",type:"scatter",data:h,symbolSize:6,z:3,emphasis:{scale:1.6,itemStyle:{borderColor:c,borderWidth:2}}}]},!0),r}function Ca(t,e){const r=[];for(let i=0;i<t.length;i+=1){if(i<e-1){r.push(null);continue}const a=t.slice(i-e+1,i+1);r.push(a.reduce((s,n)=>s+n,0)/a.length)}return r}Ne([lr,Be,Bt,Fe]);const Ea={上涨:"#15803d",下跌:"#b91c1c",震荡:"#a16207",未知:"#6b7280"};function Oe(t,e){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()||e}function Aa(t,e){const r=Re(t)||Ue(t,void 0,{renderer:"canvas"}),i=["上涨","震荡","下跌","未知"].map(o=>({name:o,value:e?.[o]??0,itemStyle:{color:Ea[o]}})).filter(o=>o.value>0),a=Oe("--c-text","#0a0a0a"),s=Oe("--c-text-mute","#7e7a76"),n=Oe("--c-surface","#fff"),c=Oe("--c-border","#e7e5e4");return i.length===0?(r.clear(),r.setOption({graphic:{type:"text",left:"center",top:"middle",style:{text:"暂无数据",fill:s,font:"13px -apple-system"}}}),r):(r.setOption({animationDuration:720,animationEasing:"cubicOut",tooltip:{trigger:"item",backgroundColor:n,borderColor:c,borderWidth:1,padding:10,textStyle:{color:a,fontSize:12},formatter:o=>`${o.name}<br/><span style="font-feature-settings:'tnum';font-weight:600">${o.value}</span> 条 (${o.percent}%)`},legend:{orient:"horizontal",bottom:4,icon:"circle",itemWidth:8,itemHeight:8,textStyle:{color:s,fontSize:12},itemGap:16},series:[{name:"trend",type:"pie",radius:["54%","78%"],center:["50%","44%"],avoidLabelOverlap:!0,label:{show:!1},itemStyle:{borderColor:n,borderWidth:2,borderRadius:2},emphasis:{scale:!0,scaleSize:6,label:{show:!0,formatter:`{b}
{d}%`,color:a,fontSize:13,fontWeight:600}},data:i}]},!0),r)}let G=[],ue=null;const Ta=[{key:"24h",label:"24 小时"},{key:"7d",label:"7 天"},{key:"30d",label:"30 天"},{key:"all",label:"全部"}],za=`
.dash { padding: 28px 0; }
.dash-hero {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
  margin-bottom: 28px;
}
.dash-hero .left h1 {
  margin: 8px 0 12px;
  font-size: clamp(28px, 3.4vw, 40px);
  font-weight: 600;
  letter-spacing: -0.022em;
}
.dash-hero .left p {
  margin: 0 0 22px;
  font-size: 15px;
  color: var(--c-text-soft);
  max-width: 60ch;
  line-height: 1.6;
}
.dash-hero .actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
.dash-hero .right {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-end;
  text-align: right;
}
.dash-hero .price {
  font-size: 56px;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
.dash-hero .price-meta { color: var(--c-text-mute); font-size: 13px; }

.kpi-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }

.panel-row {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 20px;
}
.panel {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
}
.panel h2 { margin: 0 0 4px; font-size: 16px; font-weight: 600; letter-spacing: -0.01em; }
.panel p.sub { margin: 0 0 18px; font-size: 13px; color: var(--c-text-mute); }
.chart { width: 100%; height: 320px; }
.chart-mini { width: 100%; height: 240px; }

.detail-block {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 20px;
}
.detail-summary {
  font-size: 14px;
  color: var(--c-text);
  line-height: 1.7;
}
.detail-meta {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.detail-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.detail-list li {
  position: relative;
  padding-left: 14px;
  font-size: 14px;
  color: var(--c-text-soft);
  line-height: 1.6;
}
.detail-list li::before {
  content: ""; position: absolute; left: 0; top: 0.7em;
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--c-text-faint);
}
.detail-section h3 {
  margin: 16px 0 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--c-text-mute);
  font-weight: 500;
}
.news-list a {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  color: var(--c-text-soft);
  border-bottom: 1px solid var(--c-border);
  transition: color var(--dur-fast) var(--ease-out);
}
.news-list a:last-child { border-bottom: 0; }
.news-list a:hover { color: var(--c-text); }
.news-list a .num { color: var(--c-text-faint); font-size: 12px; min-width: 18px; }

@media (max-width: 960px) {
  .dash-hero { grid-template-columns: 1fr; }
  .dash-hero .right { align-items: flex-start; text-align: left; }
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .panel-row { grid-template-columns: 1fr; }
  .detail-block { grid-template-columns: 1fr; }
}
@media (max-width: 540px) {
  .kpi-grid { grid-template-columns: 1fr; }
}
`;function Oa(){const t=document.createElement("div");return t.dataset.title="看板",t.innerHTML=`
    <style>${za}</style>
    <aurum-shell>
      <div class="dash shell">
        <section class="dash-hero" data-anim="0">
          <div class="left">
            <span class="section-eyebrow">实时与每日预测</span>
            <h1>把每一个判断<br/>留痕到数据库。</h1>
            <p>30 分钟自动分析维持监控密度，02:50 北京时间凝练成一份正式预测，错对都会留下凭据。</p>
            <div class="actions">
              <button id="run-btn" class="btn btn-primary" data-state="">
                <span class="spinner"></span>
                <svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                <span data-label>立即跑一次分析</span>
              </button>
              <button id="daily-btn" class="btn btn-ghost">
                <span data-label>触发今日预测</span>
              </button>
              <a href="/app/predictions" class="btn btn-ghost" data-route>预测中心</a>
            </div>
          </div>
          <div class="right">
            <aurum-chip id="hero-trend" label="未知"></aurum-chip>
            <div class="price num" id="hero-price">—</div>
            <div class="price-meta" id="hero-time">等待首次分析</div>
            <div class="price-meta" id="hero-market" style="font-size:12px;color:var(--c-text-mute);"></div>
          </div>
        </section>

        <section data-anim="2">
          <aurum-section-header eyebrow="关键指标" titleText="区间快照">
            <aurum-range-toggle id="range-toggle" label="时间范围"></aurum-range-toggle>
          </aurum-section-header>
          <div class="kpi-grid">
            <aurum-kpi id="kpi-price" label="最新金价" value="0" foot="—"></aurum-kpi>
            <aurum-kpi id="kpi-avg" label="区间均价" value="0" foot="—"></aurum-kpi>
            <aurum-kpi id="kpi-vol" label="价格波动率" value="0" foot="—"></aurum-kpi>
            <aurum-kpi id="kpi-acc" label="预测准确率" value="0" suffix="%" foot="近 30 天样本"></aurum-kpi>
          </div>
        </section>

        <section class="panel-row" data-anim="4">
          <div class="panel">
            <aurum-section-header eyebrow="价格与趋势" titleText="价格 + 趋势叠加" desc="深金线为价格走势，散点颜色对应当时模型给出的趋势判断。"></aurum-section-header>
            <div class="chart" id="chart-price"></div>
          </div>
          <div class="panel">
            <aurum-section-header eyebrow="趋势分布" titleText="近窗口趋势占比"></aurum-section-header>
            <div class="chart-mini" id="chart-trend"></div>
          </div>
        </section>

        <section class="detail-block" data-anim="6">
          <div class="panel">
            <aurum-section-header eyebrow="最新分析" titleText="最近一次 30 分钟分析" desc=""></aurum-section-header>
            <div class="detail-meta">
              <aurum-chip id="detail-trend" label="未知"></aurum-chip>
              <aurum-chip id="detail-status" label="—"></aurum-chip>
              <span class="muted" id="detail-meta">等待首次分析</span>
            </div>
            <div class="detail-section">
              <h3>摘要</h3>
              <div class="detail-summary" id="detail-summary">—</div>
            </div>
            <div class="detail-section">
              <h3>原因</h3>
              <ul class="detail-list" id="detail-reasons"></ul>
            </div>
            <div class="detail-section">
              <h3>操作建议</h3>
              <div class="detail-summary" id="detail-advice">—</div>
            </div>
            <div class="detail-section">
              <h3>相关新闻</h3>
              <ul class="news-list" id="detail-news"></ul>
            </div>
          </div>
          <div class="panel">
            <aurum-section-header eyebrow="今日预测" titleText="02:50 调度结果" desc="每日 02:50 北京时间自动产出，未到点显示最近一次。"></aurum-section-header>
            <div id="daily-card">等待数据…</div>
          </div>
        </section>
      </div>
      <aurum-toast-stack></aurum-toast-stack>
    </aurum-shell>
  `,Ma(t),Pa(t),La(t),xt(t,"24h"),Ha(t),t}function Ma(t){const e=t.querySelector("#range-toggle");e&&(e.options=Ta,e.value="24h",e.addEventListener("range-change",r=>{const i=r.detail.value;xt(t,i)}))}function Pa(t){const e=t.querySelector("#run-btn");e&&e.addEventListener("click",async()=>{if(e.dataset.state!=="loading"){q(e,"loading","正在分析");try{const r=await y.runAnalysis();bt(t,r),x("分析完成","success");const i=t.querySelector("#range-toggle")?.value||"24h";xt(t,i)}catch(r){x(r?.message||"分析失败","error")}finally{q(e,"","立即跑一次分析")}}})}function La(t){const e=t.querySelector("#daily-btn");e&&e.addEventListener("click",async()=>{e.disabled=!0,q(e,"","调用中…");try{const r=await y.runDaily();je(t,r),x(`今日预测：明日${r.tomorrow_direction}`,"success")}catch(r){x(r?.message||"调用失败","error")}finally{e.disabled=!1,q(e,"","触发今日预测")}})}async function xt(t,e){try{const[r,i,a,s,n,c,o]=await Promise.all([y.timeseries(e),y.kpis(e),y.distribution(e),y.dashboard(1),y.accuracy("30d"),y.todayPrediction(),y.price()]);qa(t,s?.latest,o),Da(t,i,n),G=r.points||[],ue=t.querySelector("#chart-price"),ue&&ar(ue,G),Aa(t.querySelector("#chart-trend"),a.trend_counts),s?.latest&&bt(t,s.latest),je(t,c)}catch(r){x(r?.message||"数据加载失败","error")}}function qa(t,e,r){const i=t.querySelector("#hero-price"),a=t.querySelector("#hero-time"),s=t.querySelector("#hero-market"),n=t.querySelector("#hero-trend");if(i&&(i.textContent=T(e?.price_value,2,e?.price_raw||"—")),a&&(a.textContent=e?.time||"等待首次分析"),n&&(n.label=e?.trend||"未知"),s)if(!r)s.textContent="";else if(r.comex_open===!1){const c=r.data_timestamp?`（截至 ${r.data_timestamp}）`:"";s.textContent=`周末/休市 · 上次收盘 ${c}`}else r.comex_open===!0?s.textContent=`${r.data_label||"实时"} · COMEX 开盘中`:s.textContent=r.data_label||""}function Da(t,e,r){const i=t.querySelector("#kpi-price"),a=t.querySelector("#kpi-avg"),s=t.querySelector("#kpi-vol"),n=t.querySelector("#kpi-acc");i&&(i.value=T(e.latest_price??e.avg_price),i.foot=e.last_updated?`更新于 ${e.last_updated.slice(11,16)}`:"—"),a&&(a.value=T(e.avg_price),a.foot=e.min_price&&e.max_price?`区间 ${T(e.min_price)} – ${T(e.max_price)}`:"—"),s&&(s.value=T(e.volatility),s.foot=`${e.total_runs??0} 次分析 · 平均 ${(e.avg_latency_ms??0).toFixed(0)}ms`),n&&(n.value=((r.overall_accuracy??0)*100).toFixed(0),n.suffix="%",n.foot=`${r.verified_predictions} / ${r.total_predictions} 已验证 · 当前连命中 ${r.current_streak}`)}function bt(t,e){const r=t.querySelector("#detail-trend"),i=t.querySelector("#detail-status"),a=t.querySelector("#detail-meta"),s=t.querySelector("#detail-summary"),n=t.querySelector("#detail-advice"),c=t.querySelector("#detail-reasons"),o=t.querySelector("#detail-news");if(r&&(r.label=e.trend),i&&(i.label=e.status),a&&(a.textContent=`${e.time} · 模型 ${e.model_name||"—"} · 来源 ${e.source}`),s&&(s.textContent=e.summary||"暂无总结"),n&&(n.textContent=e.advice||"暂无建议"),c){c.innerHTML="";const l=e.reasons.filter(Boolean);if(l.length)for(const p of l){const d=document.createElement("li");d.textContent=p,c.appendChild(d)}else{const p=document.createElement("li");p.textContent="暂无原因分析",c.appendChild(p)}}if(o){o.innerHTML="";const l=e.news||[];if(l.length)l.forEach((p,d)=>{const h=document.createElement("li"),u=document.createElement("a");u.href=tr(p.link),u.target="_blank",u.rel="noopener noreferrer";const b=document.createElement("span");b.className="num",b.textContent=String(d+1).padStart(2,"0");const g=document.createElement("span");g.textContent=p.title||"(无标题)",u.append(b,g),h.appendChild(u),o.appendChild(h)});else{const p=document.createElement("li");p.className="muted",p.textContent="暂无相关新闻",o.appendChild(p)}}}function je(t,e){const r=t.querySelector("#daily-card");if(!r)return;if(!e){r.innerHTML='<div class="muted">尚未生成今日预测，可手动点击触发。</div>';return}const i=e.verified_correct===null?'<aurum-chip label="未验证"></aurum-chip>':e.verified_correct?'<aurum-chip label="命中" variant="up"></aurum-chip>':'<aurum-chip label="未中" variant="down"></aurum-chip>';r.innerHTML=`
    <div class="detail-meta" style="margin-top:0;">
      <aurum-chip label="${w(e.tomorrow_direction)}"></aurum-chip>
      <span class="muted">置信 ${O(e.tomorrow_confidence)}</span>
      ${i}
    </div>
    <div class="detail-section">
      <h3>今日定性</h3>
      <div class="detail-summary">${w(e.today_direction)} · SGE ${T(e.today_close_sge)} · COMEX ${T(e.today_close_comex)}</div>
    </div>
    <div class="detail-section">
      <h3>明日预测理由</h3>
      <div class="detail-summary">${w(e.reasoning_summary||"—")}</div>
    </div>
    <div class="detail-section">
      <h3>操作建议</h3>
      <div class="detail-summary">${w(e.tomorrow_advice||"—")}</div>
    </div>
    <div class="detail-section">
      <h3>校准说明</h3>
      <div class="detail-summary muted">${w(rr(e.calibration_note,280))}</div>
    </div>
  `}function Ha(t){sa({analysis_record_added:e=>{if(!t.isConnected||!e)return;const r=e;bt(t,r),x("收到一条新分析","info"),Ia(r)},daily_prediction_ready:e=>{t.isConnected&&(je(t,e),x("收到今日预测","success"))},prediction_verified:e=>{t.isConnected&&(je(t,e),x("预测已校验","info"))}})}function Ia(t){if(t.price_value==null||!ue)return;const e={id:t.id,time:t.time,price:t.price_value,trend:t.trend,status:t.status,summary:t.summary,confidence:t.confidence??null,source:t.source,model_name:t.model_name},r=G.findIndex(i=>i.id===e.id);r>=0?G[r]=e:G.push(e),ar(ue,G)}function Me(t,e){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()||e}function ja(t,e){t.innerHTML="";const r=t.getBoundingClientRect(),i=Math.max(280,r.width||320),a=Math.max(220,r.height||240),s={top:14,right:14,bottom:32,left:36},n=Wt(t).append("svg").attr("width",i).attr("height",a).attr("viewBox",`0 0 ${i} ${a}`),c=i-s.left-s.right,o=a-s.top-s.bottom,l=Me("--c-accent","#b8860b"),p=Me("--c-text-mute","#7e7a76"),d=Me("--c-text","#0a0a0a"),h=Me("--c-border","#e7e5e4"),u=n.append("g").attr("transform",`translate(${s.left}, ${s.top})`),b=kt().domain([0,1]).range([0,c]),g=kt().domain([0,1]).range([o,0]);if(u.append("g").attr("transform",`translate(0, ${o})`).call(cr(b).ticks(5).tickFormat(St(".0%"))).call(m=>m.selectAll(".domain").attr("stroke",h)).call(m=>m.selectAll("line").attr("stroke",h)).call(m=>m.selectAll("text").attr("fill",p).attr("font-size","11").attr("font-family","ui-monospace, SF Mono, monospace")),u.append("g").call(dr(g).ticks(5).tickFormat(St(".0%"))).call(m=>m.selectAll(".domain").attr("stroke",h)).call(m=>m.selectAll("line").attr("stroke",h)).call(m=>m.selectAll("text").attr("fill",p).attr("font-size","11").attr("font-family","ui-monospace, SF Mono, monospace")),u.append("line").attr("x1",b(0)).attr("y1",g(0)).attr("x2",b(1)).attr("y2",g(1)).attr("stroke",h).attr("stroke-dasharray","4 4").attr("stroke-width",1),u.append("text").attr("x",c/2).attr("y",o+26).attr("text-anchor","middle").attr("fill",p).attr("font-size","11").text("预测置信度"),u.append("text").attr("x",-o/2).attr("y",-28).attr("text-anchor","middle").attr("transform","rotate(-90)").attr("fill",p).attr("font-size","11").text("实际命中率"),e.length===0){u.append("text").attr("x",c/2).attr("y",o/2).attr("text-anchor","middle").attr("fill",p).attr("font-size","12").text("样本不足，等待历史预测累积");return}const _=pr().domain([1,ur(e,m=>m.sample_size)||1]).range([4,14]);u.selectAll("circle").data(e).enter().append("circle").attr("cx",m=>b((m.bucket_low+m.bucket_high)/2)).attr("cy",m=>g(m.hit_rate)).attr("r",m=>_(m.sample_size)).attr("fill",l).attr("opacity",.85).attr("stroke",d).attr("stroke-width",.5).append("title").text(m=>`置信 ${(m.bucket_low*100).toFixed(0)}-${(m.bucket_high*100).toFixed(0)}% · 命中 ${(m.hit_rate*100).toFixed(0)}% · 样本 ${m.sample_size}`)}function Qe(t,e){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()||e}function Na(t,e){t.innerHTML="";const r=t.getBoundingClientRect(),i=Math.max(280,r.width||360),a=Math.max(14,Math.floor((i-36)/7)-4),s=4,n=7,c=Qe("--c-text-mute","#7e7a76"),o=Qe("--c-border","#e7e5e4"),l=Qe("--c-surface","#fff"),p=new Date,d=35,h=new Date(p);h.setDate(p.getDate()-d+1);const u=new Map(e.map(C=>[C.prediction_date,C])),g=Math.ceil(d/n)*(a+s)+28,m=Wt(t).append("svg").attr("width",i).attr("height",g).attr("viewBox",`0 0 ${i} ${g}`).append("g").attr("transform","translate(18, 22)"),X=["日","一","二","三","四","五","六"];m.selectAll("text.weekday").data(X).enter().append("text").attr("class","weekday").attr("x",(C,I)=>I*(a+s)+a/2).attr("y",-8).attr("text-anchor","middle").attr("font-size",10).attr("fill",c).text(C=>C);for(let C=0;C<d;C+=1){const I=new Date(h);I.setDate(h.getDate()+C);const K=I.toISOString().slice(0,10),Ye=C%n,Ce=Math.floor(C/n),Ge=Ye*(a+s),ae=Ce*(a+s),P=u.get(K);let Ee=l,ie=o,se="";P&&(P.verified_correct===!0?(Ee="rgba(21, 128, 61, 0.18)",ie="#15803d",se="✓"):P.verified_correct===!1?(Ee="rgba(185, 28, 28, 0.18)",ie="#b91c1c",se="✗"):(Ee="rgba(184, 134, 11, 0.16)",ie="#a16207",se="·"));const Ae=m.append("g").attr("transform",`translate(${Ge}, ${ae})`);Ae.append("rect").attr("width",a).attr("height",a).attr("rx",3).attr("fill",Ee).attr("stroke",ie).attr("stroke-width",.7),Ae.append("text").attr("x",4).attr("y",11).attr("font-size",9).attr("font-family","ui-monospace, SF Mono, monospace").attr("fill",c).text(I.getDate().toString()),se&&Ae.append("text").attr("x",a/2).attr("y",a-6).attr("text-anchor","middle").attr("font-size",11).attr("font-weight",600).attr("fill",ie).text(se),Ae.append("title").text(P?`${K} · 预测 ${P.tomorrow_direction}（置信 ${P.tomorrow_confidence??0}）${P.verified_correct===null?"· 未验证":P.verified_correct?"· 命中":"· 未中"}`:`${K} · 暂无记录`)}}Ne([st,nt,Be,Fe]);function le(t,e){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()||e}function et(t,e,r={}){const i=Re(t)||Ue(t,void 0,{renderer:"canvas"}),a=e.filter(g=>Number.isFinite(g.value)),s=r.color||le("--c-accent","#b8860b"),n=le("--c-text-mute","#7e7a76"),c=le("--c-surface","#ffffff"),o=le("--c-border","#e7e5e4"),l=le("--c-text","#0a0a0a"),p=r.decimals??2,d=r.unit||"",h=r.showArea??!0;if(a.length<2)return i.clear(),i.setOption({graphic:{type:"text",left:"center",top:"middle",style:{text:r.emptyHint||"样本不足",fill:n,font:"11px -apple-system"}}}),i;const u=a.map(g=>g.date),b=a.map(g=>g.value);return i.setOption({grid:{left:4,right:4,top:6,bottom:4,containLabel:!1},animationDuration:500,animationEasing:"cubicOut",tooltip:{trigger:"axis",axisPointer:{type:"line",lineStyle:{color:o,width:1,type:"solid"}},backgroundColor:c,borderColor:o,borderWidth:1,textStyle:{color:l,fontSize:11},padding:[6,10],formatter:g=>{const _=Array.isArray(g)?g[0]:g;if(!_)return"";const m=_.value.toFixed(p);return`<div style="font-family: var(--font-mono);">
            <div style="color: ${n}; font-size: 10px;">${_.axisValueLabel||_.name}</div>
            <div style="margin-top: 2px;">${m}${d}</div>
          </div>`}},xAxis:{type:"category",data:u,show:!1,boundaryGap:!1},yAxis:{type:"value",show:!1,scale:!0},series:[{type:"line",data:b,showSymbol:!1,smooth:!0,lineStyle:{color:s,width:1.6},areaStyle:h?{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:`${s}30`},{offset:1,color:`${s}00`}]}}:void 0}]},!0),i}const Ra=`
.pred { padding: 28px 0; }
.hero {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 28px;
  margin-bottom: 28px;
}
.hero .panel {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 28px 28px 30px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.hero .panel.headline {
  background:
    radial-gradient(420px 220px at 100% 0%, color-mix(in srgb, var(--c-accent) 14%, transparent), transparent 70%),
    var(--c-surface);
}
.hero h1 { margin: 4px 0 6px; font-size: clamp(22px, 2.4vw, 28px); font-weight: 600; letter-spacing: -0.02em; }
.hero .arrow {
  display: inline-flex;
  align-items: baseline;
  gap: 14px;
  margin: 8px 0 12px;
}
.hero .arrow .dir {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
}
.hero .arrow .conf {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: var(--c-text-mute);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.hero .arrow .conf strong {
  color: var(--c-text);
  font-family: var(--font-mono);
  font-size: 26px;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
.hero .meta-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
.hero .reasoning {
  margin-top: 18px;
  font-size: 14px;
  color: var(--c-text-soft);
  line-height: 1.7;
}
.hero .calibration {
  margin-top: 16px;
  padding: 14px 16px;
  background: var(--c-bg-soft);
  border-left: 2px solid var(--c-accent);
  border-radius: 8px;
  font-size: 13px;
  color: var(--c-text-soft);
  line-height: 1.6;
}
.hero .closes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.close-card {
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 14px;
}
.close-card .lbl {
  font-size: 11px;
  color: var(--c-text-mute);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.close-card .val {
  margin-top: 6px;
  font-size: 24px;
  font-weight: 600;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
.spread-bar {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--c-text-mute);
}

.section { margin-top: 28px; }
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.panel {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
}
.scatter, .calendar {
  width: 100%;
  min-height: 260px;
}

.history table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.history th {
  text-align: left;
  font-weight: 500;
  color: var(--c-text-mute);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 8px;
  border-bottom: 1px solid var(--c-border);
}
.history td {
  padding: 12px 8px;
  border-bottom: 1px solid var(--c-border);
  vertical-align: middle;
}
.history tr:last-child td { border-bottom: 0; }
.history .num { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }

.signal-radar {
  display: grid;
  gap: 18px;
}
.signal-radar .badges {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}
.signal-radar .sparkline-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.signal-radar .sparkline-cell {
  background: var(--c-bg-soft);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 10px 12px 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.signal-radar .sparkline-cell .head {
  display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
}
.signal-radar .sparkline-cell .head .lbl {
  font-size: 10px; color: var(--c-text-mute); letter-spacing: 0.08em; text-transform: uppercase;
}
.signal-radar .sparkline-cell .head .val {
  font-size: 13px; font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--c-text);
}
.signal-radar .sparkline-cell .spark { width: 100%; height: 60px; }
.signal-radar .empty-hint {
  color: var(--c-text-mute);
  font-size: 12px;
  padding: 14px;
  text-align: center;
  border: 1px dashed var(--c-border);
  border-radius: 8px;
}

@media (max-width: 960px) {
  .hero { grid-template-columns: 1fr; }
  .row { grid-template-columns: 1fr; }
  .signal-radar .badges { grid-template-columns: repeat(2, 1fr); }
  .signal-radar .sparkline-strip { grid-template-columns: 1fr; }
}
`;function Ua(){const t=document.createElement("div");return t.dataset.title="预测中心",t.innerHTML=`
    <style>${Ra}</style>
    <aurum-shell>
      <div class="pred shell">
        <section class="hero" data-anim="0">
          <div class="panel headline" id="hero-panel">
            <span class="section-eyebrow" id="hero-eyebrow">明日预测</span>
            <h1 id="hero-title">等待数据…</h1>
            <div class="arrow">
              <span class="dir" id="hero-dir">—</span>
              <span class="conf">
                <span>置信度</span>
                <strong id="hero-conf">—</strong>
              </span>
            </div>
            <div class="meta-row" id="hero-meta"></div>
            <div class="reasoning" id="hero-reason">—</div>
            <div class="calibration" id="hero-calibration"></div>
          </div>
          <div class="panel">
            <span class="section-eyebrow">今日双源收盘</span>
            <div class="closes" style="margin-top: 14px;">
              <div class="close-card">
                <div class="lbl">SGE 上海 · CNY/g</div>
                <div class="val" id="close-sge">—</div>
              </div>
              <div class="close-card">
                <div class="lbl">COMEX · USD/oz</div>
                <div class="val" id="close-comex">—</div>
              </div>
            </div>
            <div class="spread-bar" id="spread-row">数据源 —</div>
            <div style="margin-top: 18px;">
              <aurum-countdown></aurum-countdown>
            </div>
            <div style="margin-top: 18px; display: flex; gap: 10px;">
              <button id="rerun-btn" class="btn btn-primary"><span data-label>立即重跑预测</span></button>
              <button id="verify-btn" class="btn btn-ghost"><span data-label>校验昨日</span></button>
            </div>
          </div>
        </section>

        <section class="section" data-anim="1">
          <div class="panel">
            <aurum-section-header
              eyebrow="宏观 + 技术信号"
              titleText="本日 LLM 决策依据"
              desc="prompt v3 喂给模型的 5 个客观锚点；30 天序列展示市场背景。"
            ></aurum-section-header>
            <div class="signal-radar" id="signal-radar"></div>
          </div>
        </section>

        <section class="section row" data-anim="2">
          <div class="panel">
            <aurum-section-header eyebrow="校准曲线" titleText="置信度 × 实际命中率" desc="对角线为理想；点越靠近对角线，模型越客观自知。"></aurum-section-header>
            <div class="scatter" id="scatter"></div>
          </div>
          <div class="panel">
            <aurum-section-header eyebrow="近 5 周月历" titleText="预测命中矩阵"></aurum-section-header>
            <div class="calendar" id="calendar"></div>
          </div>
        </section>

        <section class="section history" data-anim="4">
          <div class="panel">
            <aurum-section-header eyebrow="预测历史" titleText="近 30 条"></aurum-section-header>
            <table>
              <thead>
                <tr>
                  <th>日期</th>
                  <th>SGE · CNY/g</th>
                  <th>COMEX · USD/oz</th>
                  <th>今日定性</th>
                  <th>明日预测</th>
                  <th>置信</th>
                  <th>结果</th>
                  <th>次日实际</th>
                </tr>
              </thead>
              <tbody id="history-body"></tbody>
            </table>
          </div>
        </section>
      </div>
      <aurum-toast-stack></aurum-toast-stack>
    </aurum-shell>
  `,rt(t),Ba(t),t}function Ba(t){const e=t.querySelector("#rerun-btn"),r=t.querySelector("#verify-btn");e?.addEventListener("click",async()=>{e.disabled=!0,q(e,"","调用中…");try{await y.runDaily(),x("已重跑今日预测","success"),rt(t)}catch(i){x(i?.message||"重跑失败","error")}finally{e.disabled=!1,q(e,"","立即重跑预测")}}),r?.addEventListener("click",async()=>{r.disabled=!0,q(r,"","校验中…");try{const i=new Date(Date.now()-864e5).toISOString().slice(0,10),a=await y.verifyDaily(i);x(a.verified?"已校验昨日预测":"昨日预测尚不可校验",a.verified?"success":"info"),rt(t)}catch(i){x(i?.message||"校验失败","error")}finally{r.disabled=!1,q(r,"","校验昨日")}})}async function rt(t){try{const[e,r,i,a]=await Promise.all([y.todayPrediction(),y.dailyPredictions("30d"),y.accuracy("30d"),y.calibration("30d",5)]);Fa(t,e,i);const s=r.items||[];Ya(t,s),Na(t.querySelector("#calendar"),s),ja(t.querySelector("#scatter"),a),Ka(t,e,s)}catch(e){x(e?.message||"数据加载失败","error")}}function Fa(t,e,r){const i=t.querySelector("#hero-eyebrow"),a=t.querySelector("#hero-title"),s=t.querySelector("#hero-dir"),n=t.querySelector("#hero-conf"),c=t.querySelector("#hero-meta"),o=t.querySelector("#hero-reason"),l=t.querySelector("#hero-calibration"),p=t.querySelector("#close-sge"),d=t.querySelector("#close-comex"),h=t.querySelector("#spread-row");if(!e){a&&(a.textContent="尚无预测"),i&&(i.textContent="等待 02:50 调度"),s&&(s.textContent="—"),n&&(n.textContent="—"),c&&(c.innerHTML=""),o&&(o.textContent="服务正在持续抓取数据，到点后会自动产出。"),l&&(l.textContent="暂无校准说明");return}if(i&&(i.textContent=`${e.prediction_date} 预测次日`),a&&(a.textContent=`${e.today_direction} · 明日 ${e.tomorrow_direction}`),s&&(s.textContent=e.tomorrow_direction),n&&(n.textContent=O(e.tomorrow_confidence)),c&&(c.innerHTML=`
      <aurum-chip label="${w(e.tomorrow_direction)}"></aurum-chip>
      ${e.verified_correct===null?'<aurum-chip label="未验证"></aurum-chip>':e.verified_correct?'<aurum-chip label="命中" variant="up"></aurum-chip>':'<aurum-chip label="未中" variant="down"></aurum-chip>'}
      <span class="muted">模型 ${w(e.model_name||"—")}</span>
      <span class="muted">近 30 天准确率 ${O(r.overall_accuracy)}</span>
      <span class="muted">连续命中 ${r.current_streak}</span>
    `),o&&(o.textContent=e.reasoning_summary||"—"),l&&(l.textContent=rr(e.calibration_note,360)||"暂无校准说明"),p&&(p.textContent=T(e.today_close_sge)),d&&(d.textContent=T(e.today_close_comex)),h){const u={both:"双源齐到",sge_only:"仅 SGE 可用",comex_only:"仅 COMEX 可用",neither:"双源缺失"}[e.today_close_source]||e.today_close_source;h.textContent=`数据源 · ${u}（两市单位不同，不直接相减）`}}function Nt(t,e=2,r=""){return t==null||!Number.isFinite(t)?"—":`${t>0?"+":""}${t.toFixed(e)}${r}`}function N(t,e=2,r=""){return t==null||!Number.isFinite(t)?"—":`${t.toFixed(e)}${r}`}function Wa(t){return t===null?"neutral":t<=-.3?"up":t>=.3?"down":"neutral"}function Va(t){return t===null?"neutral":t<=-.5?"up":t>=.5?"down":"neutral"}function Xa(t){return t===null?"neutral":t>=70?"overbought":t<=30?"oversold":"neutral"}function Ka(t,e,r){const i=t.querySelector("#signal-radar");if(!i)return;if(!e){i.innerHTML='<div class="empty-hint">今日预测尚未生成 — 02:50 北京时间自动产出后再来</div>';return}const a=e.dxy_value,s=e.dxy_5d_change_pct,n=e.us10y_real_yield,c=e.us10y_5d_change_pct,o=e.atr14,l=e.rsi14,p=e.dist_ma20_z;if(a===null&&n===null&&o===null&&l===null&&p===null){i.innerHTML='<div class="empty-hint">今日预测未携带 macro/技术指标（v2 之前的旧记录）</div>';return}i.innerHTML=`
    <div class="badges">
      <aurum-signal-badge
        label="DXY (TWUSD)"
        value="${N(a,2)}"
        delta="${Nt(s,2,"%")} 5d"
        tone="${Wa(s)}"
        hint="贸易加权美元指数（FRED DTWEXBGS）"
      ></aurum-signal-badge>
      <aurum-signal-badge
        label="US10Y real"
        value="${N(n,2,"%")}"
        delta="${Nt(c,2,"%")} 5d"
        tone="${Va(c)}"
        hint="10 年期 TIPS 实际收益率（FRED DFII10）"
      ></aurum-signal-badge>
      <aurum-signal-badge
        label="ATR(14)"
        value="${N(o,2)}"
        tone="neutral"
        hint="SGE Au(T+D) 真实波幅"
      ></aurum-signal-badge>
      <aurum-signal-badge
        label="RSI(14)"
        value="${N(l,1)}"
        tone="${Xa(l)}"
        hint="${l!==null&&l>=70?"超买区":l!==null&&l<=30?"超卖区":"中性区"}"
      ></aurum-signal-badge>
      <aurum-signal-badge
        label="距 MA20 z"
        value="${p===null?"—":`${p.toFixed(2)}σ`}"
        tone="neutral"
        hint="(close − MA20) / σ_20"
      ></aurum-signal-badge>
    </div>
    <div class="sparkline-strip">
      <div class="sparkline-cell">
        <div class="head"><span class="lbl">DXY · 30d</span><span class="val">${N(a,2)}</span></div>
        <div class="spark" id="spark-dxy"></div>
      </div>
      <div class="sparkline-cell">
        <div class="head"><span class="lbl">US10Y real · 30d</span><span class="val">${N(n,2,"%")}</span></div>
        <div class="spark" id="spark-us10y"></div>
      </div>
      <div class="sparkline-cell">
        <div class="head"><span class="lbl">RSI(14) · 30d</span><span class="val">${N(l,1)}</span></div>
        <div class="spark" id="spark-rsi"></div>
      </div>
    </div>
  `;const h=[...r].reverse(),u=h.map(_=>({date:_.prediction_date,value:_.dxy_value})),b=h.map(_=>({date:_.prediction_date,value:_.us10y_real_yield})),g=h.map(_=>({date:_.prediction_date,value:_.rsi14}));requestAnimationFrame(()=>{const _=i.querySelector("#spark-dxy"),m=i.querySelector("#spark-us10y"),X=i.querySelector("#spark-rsi");_&&et(_,u,{unit:"",decimals:2}),m&&et(m,b,{unit:"%",decimals:2}),X&&et(X,g,{unit:"",decimals:1})})}function Ya(t,e){const r=t.querySelector("#history-body");if(r){if(r.innerHTML="",e.length===0){r.innerHTML='<tr><td colspan="8" class="muted" style="text-align:center;padding:24px;">暂无历史预测记录</td></tr>';return}for(const i of e){const a=i.verified_correct===null?'<aurum-chip label="未验证"></aurum-chip>':i.verified_correct?'<aurum-chip label="命中" variant="up"></aurum-chip>':'<aurum-chip label="未中" variant="down"></aurum-chip>',s=document.createElement("tr");s.innerHTML=`
      <td class="num">${w(i.prediction_date)}</td>
      <td class="num">${T(i.today_close_sge)}</td>
      <td class="num">${T(i.today_close_comex)}</td>
      <td><aurum-chip label="${w(i.today_direction)}"></aurum-chip></td>
      <td><aurum-chip label="${w(i.tomorrow_direction)}"></aurum-chip></td>
      <td class="num">${O(i.tomorrow_confidence)}</td>
      <td>${a}</td>
      <td class="num">${T(i.verified_actual_close)}</td>
    `,r.appendChild(s)}}}const Ga=`
.rec { padding: 28px 0; }
.rec h1 { margin: 0 0 4px; font-size: clamp(28px, 3.4vw, 36px); font-weight: 600; letter-spacing: -0.022em; }
.rec p.lead { margin: 0 0 22px; color: var(--c-text-soft); max-width: 60ch; }
.filters { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 18px; }
.search {
  flex: 1 1 240px;
  display: flex; gap: 8px; align-items: center;
  background: var(--c-surface); border: 1px solid var(--c-border);
  border-radius: 8px; padding: 8px 12px;
  transition: border-color var(--dur-fast) var(--ease-out);
}
.search:focus-within { border-color: var(--c-accent-line); }
.search input { flex: 1; border: 0; outline: 0; background: transparent; color: var(--c-text); font: inherit; font-size: 14px; }
.search svg { color: var(--c-text-mute); }

.records-list {
  display: flex; flex-direction: column; gap: 1px;
  background: var(--c-border);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  overflow: hidden;
}
.row {
  background: var(--c-surface);
  padding: 14px 18px;
  display: grid;
  grid-template-columns: 110px 1fr auto auto;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out);
}
.row:hover { background: var(--c-surface-2); }
.time {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text-mute);
  font-variant-numeric: tabular-nums;
  line-height: 1.3;
}
.time strong { display: block; color: var(--c-text); font-size: 13px; font-weight: 500; }
.summary { font-size: 14px; color: var(--c-text); line-height: 1.5; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.row .meta { font-size: 12px; color: var(--c-text-mute); margin-top: 2px; display: flex; gap: 10px; flex-wrap: wrap; }
.row .meta .num { color: var(--c-text-soft); font-family: var(--font-mono); font-variant-numeric: tabular-nums; }

.empty { padding: 32px; text-align: center; color: var(--c-text-mute); border: 1px dashed var(--c-border); border-radius: 12px; }

.detail-section { margin-top: 22px; }
.detail-section h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--c-text-mute); margin: 0 0 10px; font-weight: 500; }
.detail-section ul { display: flex; flex-direction: column; gap: 8px; }
.detail-section ul li { padding-left: 14px; position: relative; color: var(--c-text-soft); line-height: 1.6; }
.detail-section ul li::before { content: ""; position: absolute; left: 0; top: 0.7em; width: 4px; height: 4px; border-radius: 50%; background: var(--c-text-faint); }
.detail-section pre.raw {
  margin: 0;
  padding: 12px 14px;
  background: var(--c-bg-soft);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--c-text-soft);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 280px;
  overflow: auto;
}

@media (max-width: 540px) {
  .row { grid-template-columns: 1fr; }
}
`;function Ja(){const t=document.createElement("div");t.dataset.title="历史记录",t.innerHTML=`
    <style>${Ga}</style>
    <aurum-shell>
      <div class="rec shell">
        <span class="section-eyebrow" data-anim="0">分析记录</span>
        <h1 data-anim="0">历史分析记录</h1>
        <p class="lead" data-anim="1">所有手动 / 调度跑出的 30 分钟分析记录都保留在此，可点击展开任意一行查看完整模型输出与原始新闻。</p>

        <div class="filters" data-anim="2">
          <label class="search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input id="search-input" type="text" placeholder="搜索摘要、新闻、建议、来源…" autocomplete="off" />
          </label>
          <aurum-range-toggle id="range-toggle" label="时间范围"></aurum-range-toggle>
          <aurum-range-toggle id="trend-toggle" label="趋势"></aurum-range-toggle>
          <aurum-range-toggle id="status-toggle" label="状态"></aurum-range-toggle>
        </div>

        <div id="empty" class="empty" style="display:none;">没有匹配的记录。试试放宽筛选条件。</div>
        <div id="list" class="records-list"></div>

        <aurum-drawer id="drawer">
          <div slot="title">
            <span class="section-eyebrow">分析详情</span>
            <h2 id="drawer-title" class="num" style="margin: 4px 0 6px; font-size: 22px; font-weight: 600;">—</h2>
            <div id="drawer-meta" style="font-size: 13px; color: var(--c-text-mute);">—</div>
            <div style="display: flex; gap: 8px; margin-top: 10px;">
              <aurum-chip id="drawer-trend" label="未知"></aurum-chip>
              <aurum-chip id="drawer-status" label="—"></aurum-chip>
            </div>
          </div>
          <div class="detail-section">
            <h3>摘要</h3>
            <p id="drawer-summary" style="margin:0;color:var(--c-text);line-height:1.7;">—</p>
          </div>
          <div class="detail-section">
            <h3>原因</h3>
            <ul id="drawer-reasons"></ul>
          </div>
          <div class="detail-section">
            <h3>操作建议</h3>
            <p id="drawer-advice" style="margin:0;color:var(--c-text);line-height:1.7;">—</p>
          </div>
          <div class="detail-section">
            <h3>相关新闻</h3>
            <ul id="drawer-news"></ul>
          </div>
          <div class="detail-section">
            <h3>原始模型输出</h3>
            <pre class="raw" id="drawer-raw">—</pre>
          </div>
          <div class="detail-section" style="display: flex; justify-content: flex-end;">
            <button id="drawer-delete" class="btn btn-ghost" style="color: var(--c-down); border-color: var(--c-down-soft);">删除该记录</button>
          </div>
        </aurum-drawer>
      </div>
      <aurum-toast-stack></aurum-toast-stack>
    </aurum-shell>
  `;const e={records:[],filtered:[],range:"24h",trend:"all",status:"all",keyword:""};return Za(t,e),Qa(t,e),ei(t),ir(t,e),t}function Za(t,e){const r=t.querySelector("#range-toggle");r&&(r.options=[{key:"24h",label:"24h"},{key:"7d",label:"7d"},{key:"30d",label:"30d"},{key:"all",label:"全部"}],r.value="24h",r.addEventListener("range-change",s=>{e.range=s.detail.value,he(t,e)}));const i=t.querySelector("#trend-toggle");i&&(i.options=[{key:"all",label:"全部"},{key:"上涨",label:"上涨"},{key:"下跌",label:"下跌"},{key:"震荡",label:"震荡"}],i.value="all",i.addEventListener("range-change",s=>{e.trend=s.detail.value,he(t,e)}));const a=t.querySelector("#status-toggle");a&&(a.options=[{key:"all",label:"全部"},{key:"success",label:"成功"},{key:"partial",label:"部分"},{key:"failed",label:"失败"}],a.value="all",a.addEventListener("range-change",s=>{e.status=s.detail.value,he(t,e)}))}function Qa(t,e){const r=t.querySelector("#search-input");r?.addEventListener("input",()=>{e.keyword=r.value,he(t,e)})}function ei(t){const e=t.querySelector("#drawer"),r=t.querySelector("#drawer-delete");r?.addEventListener("click",async()=>{const i=r.dataset.id;if(i&&confirm("确定删除这条记录？"))try{await y.deleteRecord(i),e.open=!1,x("已删除","success");const a=new CustomEvent("records-refresh",{bubbles:!0,composed:!0});t.dispatchEvent(a)}catch(a){x(a?.message||"删除失败","error")}}),t.addEventListener("records-refresh",()=>void ti(t))}async function ti(t){const e=t.querySelector("#range-toggle")?.value||"24h",r=t.querySelector("#trend-toggle")?.value||"all",i=t.querySelector("#status-toggle")?.value||"all",a=t.querySelector("#search-input")?.value||"";await ir(t,{records:[],filtered:[],range:e,trend:r,status:i,keyword:a})}async function ir(t,e){try{const r=await y.recordsLatest(200);e.records=r,he(t,e)}catch(r){x(r?.message||"记录加载失败","error")}}function ri(t,e){if(e==="all")return!0;const i={"24h":24,"7d":24*7,"30d":24*30}[e]??24,a=Date.parse((t.time||"").replace(" ","T"));return Number.isFinite(a)?a>=Date.now()-i*3600*1e3:!0}function he(t,e){const r=e.keyword.trim().toLowerCase();e.filtered=e.records.filter(i=>!(!ri(i,e.range)||e.trend!=="all"&&i.trend!==e.trend||e.status!=="all"&&i.status!==e.status||r&&![i.summary,i.advice,i.source,i.model_name,i.trend,i.status,i.price_raw,(i.reasons||[]).join(" "),(i.news||[]).map(s=>`${s.title} ${s.source}`).join(" ")].join(" ").toLowerCase().includes(r))),ai(t,e)}function ai(t,e){const r=t.querySelector("#empty"),i=t.querySelector("#list");if(!(!r||!i)){if(e.filtered.length===0){i.innerHTML="",r.style.display="";return}r.style.display="none",i.innerHTML="",e.filtered.forEach(a=>{const s=document.createElement("div");s.className="row",s.innerHTML=`
      <div class="time">
        <strong>${w((a.time||"").slice(11,16))}</strong>
        <span class="num">${w((a.time||"").slice(0,10))}</span>
      </div>
      <div>
        <div class="summary">${w(a.summary||"暂无总结")}</div>
        <div class="meta">
          <span class="num">${w(a.price_raw||"—")}</span>
          <span>${w(a.source||"manual")}</span>
          <span>${(a.news||[]).length} 条新闻</span>
        </div>
      </div>
      <aurum-chip label="${w(a.trend)}"></aurum-chip>
      <aurum-chip label="${w(a.status)}"></aurum-chip>
    `,s.addEventListener("click",()=>ii(t,a)),i.appendChild(s)})}}function ii(t,e){const r=t.querySelector("#drawer");if(!r)return;r.titleText=`金价 ${e.price_raw}`,t.querySelector("#drawer-title").textContent=`金价 ${e.price_raw||"—"}`,t.querySelector("#drawer-meta").textContent=`${e.time} · ${e.source} · 模型 ${e.model_name||"—"}`;const i=t.querySelector("#drawer-trend");i&&(i.label=e.trend);const a=t.querySelector("#drawer-status");a&&(a.label=e.status),t.querySelector("#drawer-summary").textContent=e.summary||"暂无总结",t.querySelector("#drawer-advice").textContent=e.advice||"暂无建议";const s=t.querySelector("#drawer-reasons");s&&(s.innerHTML="",(e.reasons.length?e.reasons:["暂无原因"]).forEach(o=>{const l=document.createElement("li");l.textContent=o,s.appendChild(l)}));const n=t.querySelector("#drawer-news");if(n)if(n.innerHTML="",e.news.length)e.news.forEach((o,l)=>{const p=document.createElement("li"),d=document.createElement("a");d.href=tr(o.link),d.target="_blank",d.rel="noopener noreferrer";const h=document.createElement("span");h.textContent=String(l+1).padStart(2,"0"),h.style.cssText="color: var(--c-text-faint); margin-right: 8px; font-family: var(--font-mono);";const u=document.createElement("span");u.textContent=o.title||"(无标题)",d.append(h,u),p.appendChild(d),n.appendChild(p)});else{const o=document.createElement("li");o.textContent="暂无相关新闻",n.appendChild(o)}t.querySelector("#drawer-raw").textContent=e.raw_output||"—";const c=t.querySelector("#drawer-delete");c&&(c.dataset.id=e.id),r.open=!0}Ne([st,Ut,nt,Ft,Be,Fe]);const si=`
.ins { padding: 28px 0; }
.ins h1 { margin: 0 0 4px; font-size: clamp(28px, 3.4vw, 36px); font-weight: 600; letter-spacing: -0.022em; }
.ins p.lead { margin: 0 0 24px; color: var(--c-text-soft); max-width: 60ch; }

.cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
}
.card .label {
  font-size: 11px; color: var(--c-text-mute); letter-spacing: 0.08em;
  text-transform: uppercase; font-weight: 500;
}
.card .value {
  margin-top: 8px;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.03em;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
.card .desc { margin-top: 6px; font-size: 13px; color: var(--c-text-mute); }

.section { margin-top: 28px; }
.panel {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
}
.misses {
  margin-top: 16px;
  padding: 14px 16px;
  background: var(--c-bg-soft);
  border-left: 2px solid var(--c-flat);
  border-radius: 8px;
  font-size: 13px;
  color: var(--c-text-soft);
  line-height: 1.6;
}
.directions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
.direction {
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 14px;
}
.direction .lbl { font-size: 11px; color: var(--c-text-mute); text-transform: uppercase; letter-spacing: 0.1em; }
.direction .val { margin-top: 8px; font-size: 22px; font-weight: 600; font-family: var(--font-mono); letter-spacing: -0.02em; }

.timeline {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.timeline .row {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 14px;
  padding: 12px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  align-items: center;
  font-size: 13px;
}
.timeline .row.correct { border-left: 3px solid var(--c-up); }
.timeline .row.wrong { border-left: 3px solid var(--c-down); }
.timeline .row.pending { border-left: 3px solid var(--c-flat); }
.timeline .date { font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--c-text-mute); }
.timeline .summary { color: var(--c-text); }

.phase2-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 16px; }
.phase2-cards .card .lbl-row {
  display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
}
.phase2-cards .card .label { font-size: 11px; color: var(--c-text-mute); letter-spacing: 0.08em; text-transform: uppercase; }
.phase2-cards .card .pill {
  font-size: 10px; padding: 2px 6px; border-radius: 4px;
  font-family: var(--font-mono); font-variant-numeric: tabular-nums;
}
.phase2-cards .card .pill.good { color: var(--c-up); background: var(--c-up-soft); }
.phase2-cards .card .pill.bad { color: var(--c-down); background: var(--c-down-soft); }
.phase2-cards .card .pill.muted { color: var(--c-text-mute); background: var(--c-bg-soft); }
.phase2-cards .card .desc { margin-top: 8px; font-size: 12px; color: var(--c-text-mute); line-height: 1.5; }

.regime-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 14px; }
.regime-table th, .regime-table td {
  padding: 10px 8px; border-bottom: 1px solid var(--c-border); text-align: left;
}
.regime-table th {
  font-weight: 500; color: var(--c-text-mute);
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
}
.regime-table td.num {
  font-family: var(--font-mono); font-variant-numeric: tabular-nums;
}
.regime-table tr:last-child td { border-bottom: 0; }
.regime-table .regime-tag {
  display: inline-block; padding: 2px 8px; border-radius: 4px;
  font-size: 11px; font-weight: 500;
}
.regime-table .regime-tag.bull { color: var(--c-up); background: var(--c-up-soft); }
.regime-table .regime-tag.bear { color: var(--c-down); background: var(--c-down-soft); }
.regime-table .regime-tag.choppy,
.regime-table .regime-tag.transition,
.regime-table .regime-tag.unknown,
.regime-table .regime-tag.unlabeled { color: var(--c-text-mute); background: var(--c-bg-soft); }

.raw-vs-cal {
  margin-top: 16px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 14px 16px;
  background: var(--c-bg-soft);
}
.raw-vs-cal-title {
  font-size: 11px;
  color: var(--c-text-mute);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.rvs-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.rvs-table th, .rvs-table td {
  padding: 8px 10px;
  border-bottom: 1px solid var(--c-border);
  text-align: right;
}
.rvs-table th:first-child, .rvs-table td:first-child {
  text-align: left;
  color: var(--c-text-mute);
  font-weight: 500;
}
.rvs-table th {
  font-weight: 500; color: var(--c-text-mute); font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.08em;
}
.rvs-table td.num {
  font-family: var(--font-mono); font-variant-numeric: tabular-nums;
}
.rvs-table td.delta.better { color: var(--c-up); }
.rvs-table td.delta.worse { color: var(--c-down); }
.rvs-table td.delta.neutral { color: var(--c-text-mute); }
.rvs-table tr:last-child td { border-bottom: 0; }

.reliability-wrap {
  margin-top: 16px;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 12px 14px;
  background: var(--c-bg-soft);
}
.reliability-wrap .reliability-chart { width: 100%; height: 240px; }
.reliability-wrap .empty {
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-mute);
  font-size: 13px;
}

@media (max-width: 760px) {
  .cards, .phase2-cards { grid-template-columns: 1fr; }
  .directions { grid-template-columns: 1fr; }
  .timeline .row { grid-template-columns: 1fr; }
}
`;function ni(){const t=document.createElement("div");return t.dataset.title="洞察",t.innerHTML=`
    <style>${si}</style>
    <aurum-shell>
      <div class="ins shell">
        <span class="section-eyebrow" data-anim="0">洞察</span>
        <h1 data-anim="0">命中率与失误模式</h1>
        <p class="lead" data-anim="1">查看模型在不同时间窗的总命中率、按方向的偏差，以及最近被识别出的失误模式。所有数据来自系统每日 03:10 自动校验的结果。</p>

        <section class="cards" data-anim="2">
          <div class="card">
            <div class="label">总体准确率</div>
            <div class="value" id="ins-accuracy">—</div>
            <div class="desc" id="ins-accuracy-desc">等待样本</div>
          </div>
          <div class="card">
            <div class="label">已验证 / 总数</div>
            <div class="value" id="ins-verified">—</div>
            <div class="desc" id="ins-verified-desc">最近窗口的覆盖度</div>
          </div>
          <div class="card">
            <div class="label">连续命中</div>
            <div class="value" id="ins-streak">—</div>
            <div class="desc" id="ins-streak-desc">当前连续 / 历史最长</div>
          </div>
        </section>

        <section class="section" data-anim="4">
          <div class="panel">
            <aurum-section-header eyebrow="按方向" titleText="不同预测方向的命中率"></aurum-section-header>
            <div class="directions" id="ins-directions"></div>
          </div>
        </section>

        <section class="section" data-anim="5">
          <div class="panel">
            <aurum-section-header
              eyebrow="概率指标 · 主目标"
              titleText="Brier · log-loss · ECE"
              desc="模型质量的核心三指标；目标是把这三项压下来，方向命中率次之。窗口 90 天。"
            ></aurum-section-header>
            <div class="phase2-cards" id="phase2-cards"></div>
            <div class="raw-vs-cal" id="raw-vs-cal" hidden>
              <div class="raw-vs-cal-title">校准前 vs 校准后</div>
              <table class="rvs-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>校准前（raw）</th>
                    <th>校准后</th>
                    <th>Δ</th>
                  </tr>
                </thead>
                <tbody id="rvs-body"></tbody>
              </table>
            </div>
            <table class="regime-table" id="regime-table">
              <thead><tr><th>Regime</th><th>样本</th><th>命中率</th><th>Brier</th></tr></thead>
              <tbody></tbody>
            </table>
            <div class="reliability-wrap">
              <div class="reliability-chart" id="reliability-chart"></div>
            </div>
          </div>
        </section>

        <section class="section" data-anim="6">
          <div class="panel">
            <aurum-section-header eyebrow="模型自我反思" titleText="近期失误模式 + Hermes 评论"></aurum-section-header>
            <div class="misses" id="ins-misses">暂无失误模式</div>
            <div class="timeline" id="ins-timeline"></div>
          </div>
        </section>
      </div>
      <aurum-toast-stack></aurum-toast-stack>
    </aurum-shell>
  `,oi(t),t}async function oi(t){try{const[e,r]=await Promise.all([y.accuracy("30d"),y.dailyPredictions("30d")]);vi(t,e),gi(t,e),xi(t,r.items,e)}catch(e){x(e?.message||"数据加载失败","error")}try{const e=await y.metricsDetailed("90d",!0,!1,!1,!0);pi(t,e),fi(t,e)}catch(e){console.warn("metrics/detailed load failed",e),mi(t,"Phase 2 指标加载失败")}}function U(t,e,r="—"){return t==null||!Number.isFinite(t)?r:t.toFixed(e)}function li(t){return t===null?{cls:"muted",hint:"样本不足"}:t<=.55?{cls:"good",hint:"优于均匀猜测"}:t>=.7?{cls:"bad",hint:"高于随机猜测"}:{cls:"muted",hint:"接近均匀基线"}}function ci(t){return t===null?{cls:"muted",hint:"样本不足"}:t<=.1?{cls:"good",hint:"校准良好"}:t>=.2?{cls:"bad",hint:"校准偏差较大"}:{cls:"muted",hint:"中等校准"}}function di(t){return t===null?{cls:"muted",hint:"样本不足"}:t<=.85?{cls:"good",hint:"对数损失低"}:t>=1.2?{cls:"bad",hint:"对数损失高"}:{cls:"muted",hint:"中等对数损失"}}function pi(t,e){const r=t.querySelector("#phase2-cards");if(!r)return;const i=e.sample_count_by_source?.synthetic_backtest??e.verified_predictions,a=li(e.brier_multiclass),s=di(e.log_loss),n=ci(e.ece),c=`n=${i} verified`;r.innerHTML=`
    <div class="card">
      <div class="lbl-row">
        <span class="label">Brier (multiclass)</span>
        <span class="pill ${a.cls}">${a.hint}</span>
      </div>
      <div class="value">${U(e.brier_multiclass,3)}</div>
      <div class="desc">越低越好；随机猜≈0.667；理想 0。${c}</div>
    </div>
    <div class="card">
      <div class="lbl-row">
        <span class="label">Log loss</span>
        <span class="pill ${s.cls}">${s.hint}</span>
      </div>
      <div class="value">${U(e.log_loss,3)}</div>
      <div class="desc">3 类对数损失，越低越好。${c}</div>
    </div>
    <div class="card">
      <div class="lbl-row">
        <span class="label">ECE</span>
        <span class="pill ${n.cls}">${n.hint}</span>
      </div>
      <div class="value">${U(e.ece,3)}</div>
      <div class="desc">期望校准误差；目标 ≤ 0.10。${c}</div>
    </div>
  `,ui(t,e),hi(t,e)}function ui(t,e){const r=t.querySelector("#regime-table tbody");if(!r)return;r.innerHTML="";const i=new Set;for(const n of Object.keys(e.accuracy_by_regime||{}))i.add(n);for(const n of Object.keys(e.brier_by_regime||{}))i.add(n);if(i.size===0){r.innerHTML='<tr><td colspan="4" style="text-align:center;color:var(--c-text-mute);padding:18px;">尚无 regime 分层数据</td></tr>';return}const a=["bull","transition","choppy","bear","unknown","unlabeled"],s=Array.from(i).sort((n,c)=>{const o=a.indexOf(n),l=a.indexOf(c);return o===-1&&l===-1?n.localeCompare(c):o===-1?1:l===-1?-1:o-l});for(const n of s){const c=e.accuracy_by_regime[n],o=e.brier_by_regime[n],l=document.createElement("tr");l.innerHTML=`
      <td><span class="regime-tag ${w(n)}">${w(n)}</span></td>
      <td class="num">—</td>
      <td class="num">${c===void 0?"—":O(c)}</td>
      <td class="num">${o===void 0?"—":U(o,3)}</td>
    `,r.appendChild(l)}}function hi(t,e){const r=t.querySelector("#reliability-chart");if(!r)return;const i=e.reliability_diagram||[];if(i.length===0){r.innerHTML='<div class="empty">样本不足，等更多 v2 数据累积</div>';return}r.innerHTML="";const a=ce("--c-text-mute","#7e7a76"),s=ce("--c-surface","#ffffff"),n=ce("--c-border","#e7e5e4"),c=ce("--c-text","#0a0a0a"),o=ce("--c-accent","#b8860b"),l=Re(r)||Ue(r,void 0,{renderer:"canvas"}),p=i.map(d=>({value:[d.avg_confidence,d.hit_rate],sample_size:d.sample_size}));l.setOption({grid:{left:56,right:24,top:18,bottom:36},animationDuration:600,animationEasing:"cubicOut",tooltip:{trigger:"item",backgroundColor:s,borderColor:n,borderWidth:1,textStyle:{color:c,fontSize:12},padding:[8,12],formatter:d=>{const h=d.data;if(!h)return"";const[u,b]=h.value;return`<div style="font-family: var(--font-mono);">
            <div style="color:${a}; font-size:10px; text-transform:uppercase;">置信桶</div>
            <div>avg conf <strong>${u.toFixed(2)}</strong></div>
            <div>hit rate <strong>${b.toFixed(2)}</strong></div>
            <div style="color:${a}; font-size:11px;">n=${h.sample_size}</div>
          </div>`}},xAxis:{type:"value",min:0,max:1,name:"avg confidence",nameGap:22,nameLocation:"middle",nameTextStyle:{color:a,fontSize:11},axisLine:{lineStyle:{color:n}},axisLabel:{color:a,fontSize:11},splitLine:{lineStyle:{color:n,type:"dashed"}}},yAxis:{type:"value",min:0,max:1,name:"hit rate",nameGap:32,nameLocation:"middle",nameRotate:90,nameTextStyle:{color:a,fontSize:11},axisLine:{lineStyle:{color:n}},axisLabel:{color:a,fontSize:11},splitLine:{lineStyle:{color:n,type:"dashed"}}},series:[{name:"perfect calibration",type:"line",data:[[0,0],[1,1]],showSymbol:!1,lineStyle:{color:a,type:"dashed",width:1},tooltip:{show:!1},z:1},{name:"buckets",type:"scatter",data:p,symbolSize:d=>Math.max(8,Math.min(28,Math.sqrt(d?.sample_size||1)*6)),itemStyle:{color:o,borderColor:s,borderWidth:1.5},z:2}]},!0)}function mi(t,e){const r=t.querySelector("#phase2-cards");r&&(r.innerHTML=`<div class="card" style="grid-column: 1 / -1; text-align: center; padding: 24px; color: var(--c-text-mute);">${w(e)}</div>`)}function fi(t,e){const r=t.querySelector("#raw-vs-cal"),i=t.querySelector("#rvs-body");if(!r||!i)return;const a=e.raw_summary;if(!a||a.sample_size===0){r.hidden=!0;return}r.hidden=!1;const s=[{label:"Brier (multiclass)",raw:a.brier_multiclass,cal:e.brier_multiclass,lowerIsBetter:!0,fmt:n=>U(n,3)},{label:"Log loss",raw:a.log_loss,cal:e.log_loss,lowerIsBetter:!0,fmt:n=>U(n,3)},{label:"ECE",raw:a.ece,cal:e.ece,lowerIsBetter:!0,fmt:n=>U(n,3)},{label:"命中率",raw:a.accuracy,cal:e.overall_accuracy,lowerIsBetter:!1,fmt:n=>n===null?"—":`${(n*100).toFixed(1)}%`}];i.innerHTML=s.map(n=>{const c=n.fmt(n.raw),o=n.fmt(n.cal);let l="—",p="neutral";if(n.raw!==null&&n.cal!==null&&Number.isFinite(n.raw)&&Number.isFinite(n.cal)){const d=n.cal-n.raw,h=n.lowerIsBetter?d<0:d>0,u=n.lowerIsBetter?d>0:d<0;Math.abs(d)<1e-6?(l="0",p="neutral"):(n.label==="命中率"?l=`${d>=0?"+":""}${(d*100).toFixed(1)}pp`:l=`${d>=0?"+":""}${d.toFixed(3)}`,p=h?"better":u?"worse":"neutral")}return`
        <tr>
          <td>${w(n.label)}</td>
          <td class="num">${c}</td>
          <td class="num">${o}</td>
          <td class="num delta ${p}">${l}</td>
        </tr>
      `}).join("")}function ce(t,e){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()||e}function vi(t,e){t.querySelector("#ins-accuracy").textContent=O(e.overall_accuracy),t.querySelector("#ins-accuracy-desc").textContent=`${e.correct_predictions} 命中 / ${e.verified_predictions} 已验证`,t.querySelector("#ins-verified").textContent=`${e.verified_predictions} / ${e.total_predictions}`,t.querySelector("#ins-verified-desc").textContent=e.last_updated?`最近 ${e.last_updated.slice(0,10)} 更新`:"等待样本",t.querySelector("#ins-streak").textContent=`${e.current_streak} / ${e.longest_streak}`,t.querySelector("#ins-streak-desc").textContent="当前连续命中 / 历史最长连胜"}function gi(t,e){const r=t.querySelector("#ins-directions");if(!r)return;r.innerHTML="";const i={上涨:"上涨",下跌:"下跌",震荡:"震荡"};for(const a of Object.keys(i)){const s=e.accuracy_by_direction?.[a],n=document.createElement("div");n.className="direction",n.innerHTML=`
      <div class="lbl">预测 ${w(a)}</div>
      <div class="val">${s===void 0?"—":O(s)}</div>
    `,r.appendChild(n)}}function xi(t,e,r){const i=t.querySelector("#ins-misses");i&&(i.textContent=r.recent_miss_pattern||"暂未识别明显失误模式");const a=t.querySelector("#ins-timeline");if(a){if(a.innerHTML="",!e.length){a.innerHTML='<div class="muted" style="padding: 20px; text-align: center;">暂无预测记录</div>';return}for(const s of e.slice(0,20)){const n=s.verified_correct===null?"pending":s.verified_correct?"correct":"wrong",c=s.verified_correct===null?"未验证":s.verified_correct?"命中":"未中",o=document.createElement("div");o.className=`row ${n}`,o.innerHTML=`
      <div class="date">${w(s.prediction_date)}</div>
      <div class="summary">${w(s.reasoning_summary||s.tomorrow_advice||"—")}</div>
      <div><aurum-chip label="${w(s.tomorrow_direction)}"></aurum-chip><span class="muted" style="margin-left:8px;">${c}</span></div>
    `,a.appendChild(o)}}}const yt="aurum.theme";function sr(t){t==="auto"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",t)}function bi(){let t="auto";try{const e=localStorage.getItem(yt);(e==="light"||e==="dark"||e==="auto")&&(t=e)}catch{}sr(t)}function yi(t){try{localStorage.setItem(yt,t)}catch{}sr(t)}function wi(){try{const t=localStorage.getItem(yt);if(t==="light"||t==="dark"||t==="auto")return t}catch{}return"auto"}const $i=`
.settings { padding: 28px 0; }
.settings h1 { margin: 0 0 4px; font-size: clamp(28px, 3.4vw, 36px); font-weight: 600; letter-spacing: -0.022em; }
.settings p.lead { margin: 0 0 24px; color: var(--c-text-soft); max-width: 60ch; }

.section { margin-top: 24px; }
.panel {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--c-border);
}
.row:last-child { border-bottom: 0; }
.row .label { font-weight: 500; color: var(--c-text); font-size: 14px; }
.row .desc { font-size: 12px; color: var(--c-text-mute); margin-top: 4px; }

.theme-toggle {
  display: inline-flex;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 2px;
}
.theme-toggle button {
  padding: 6px 14px;
  font-size: 12px;
  color: var(--c-text-mute);
  border-radius: 6px;
  transition: all var(--dur-fast) var(--ease-out);
}
.theme-toggle button.active {
  background: var(--c-text);
  color: var(--c-bg);
}

.channels {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}
.channel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  gap: 16px;
}
.channel.configured { border-color: var(--c-up-soft); background: color-mix(in srgb, var(--c-up-soft) 60%, transparent); }
.channel-name { font-weight: 500; font-size: 14px; }
.channel-meta { font-size: 12px; color: var(--c-text-mute); margin-top: 2px; }
.channel-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--c-bg-soft);
  color: var(--c-text-mute);
}
.channel.configured .channel-status {
  background: var(--c-up-soft);
  color: var(--c-up);
}

.notice {
  margin-top: 18px;
  font-size: 13px;
  color: var(--c-text-soft);
  background: var(--c-bg-soft);
  border: 1px dashed var(--c-border);
  border-radius: 10px;
  padding: 14px 16px;
}
.notice code {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--c-surface);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--c-border);
}
`,_i={webhook:{label:"Webhook",key:"WEBHOOK_URLS",help:"POST 到任意你给的 URL（多条逗号分隔）"},telegram:{label:"Telegram",key:"TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID",help:"BotFather 创建机器人后填 token 与 chat id"},feishu:{label:"飞书 Lark",key:"FEISHU_WEBHOOK_URL",help:"群机器人 webhook 地址"},wecom:{label:"企业微信",key:"WECOM_KEY",help:"群机器人 key（webhook URL 末段 key 参数）"},email:{label:"邮件 SMTP",key:"EMAIL_SMTP_*",help:"host / port / user / pass / from / to 五件套"}};function ki(){const t=document.createElement("div");return t.dataset.title="设置",t.innerHTML=`
    <style>${$i}</style>
    <aurum-shell>
      <div class="settings shell">
        <span class="section-eyebrow" data-anim="0">设置</span>
        <h1 data-anim="0">个性化与推送</h1>
        <p class="lead" data-anim="1">主题切换即时生效，推送通道由后端 .env 控制；UI 显示哪些通道已配置，未配置时给出占位与对应的环境变量名。</p>

        <section class="section" data-anim="2">
          <div class="panel">
            <aurum-section-header eyebrow="外观" titleText="主题"></aurum-section-header>
            <div class="row">
              <div>
                <div class="label">主题模式</div>
                <div class="desc">auto 跟随系统；手动选择 light / dark 后会持久化在浏览器。</div>
              </div>
              <div class="theme-toggle" id="theme-toggle">
                <button data-mode="auto">系统</button>
                <button data-mode="light">浅色</button>
                <button data-mode="dark">深色</button>
              </div>
            </div>
          </div>
        </section>

        <section class="section" data-anim="3">
          <div class="panel">
            <aurum-section-header eyebrow="管理员" titleText="管理员令牌" desc="保留一些敏感操作（如删除记录）需要服务端配置 ADMIN_TOKEN，这里填入后浏览器会随每次请求自动附带。仅保存在本机 localStorage。"></aurum-section-header>
            <div class="row" style="flex-direction: column; align-items: stretch; gap: 12px;">
              <input id="admin-token" type="password" placeholder="未配置 / 填写后保存" autocomplete="off"
                     style="width: 100%; padding: 10px 14px; border: 1px solid var(--c-border); border-radius: 8px; background: var(--c-surface); color: var(--c-text); font-family: var(--font-mono); font-size: 13px;" />
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button id="admin-clear" class="btn btn-ghost">清除</button>
                <button id="admin-save" class="btn btn-primary">保存</button>
              </div>
            </div>
          </div>
        </section>

        <section class="section" data-anim="4">
          <div class="panel">
            <aurum-section-header eyebrow="消息推送" titleText="通道接入状态" desc="未配置即灰，配置完成且后端读取后变绿。"></aurum-section-header>
            <div class="channels" id="channels"></div>
            <div class="notice">
              <strong>如何启用：</strong>把对应的环境变量写入服务器 <code>/opt/gold-buy/.env</code>，重启 <code>systemctl restart gold-buy</code> 即可生效；测试推送需要将 <code>ALLOW_TEST_NOTIFY=1</code> 与 <code>ADMIN_TOKEN=...</code> 同时配上。
            </div>
          </div>
        </section>
      </div>
      <aurum-toast-stack></aurum-toast-stack>
    </aurum-shell>
  `,Ci(t),Si(t),Ei(t),t}function Si(t){const e=t.querySelector("#admin-token"),r=t.querySelector("#admin-save"),i=t.querySelector("#admin-clear");if(!(!e||!r||!i)){try{const a=localStorage.getItem("aurum.adminToken");a&&(e.value=a)}catch{}r.addEventListener("click",()=>{try{const a=e.value.trim();a?(localStorage.setItem("aurum.adminToken",a),x("已保存管理员令牌","success")):(localStorage.removeItem("aurum.adminToken"),x("已清除管理员令牌","info"))}catch(a){x(a?.message||"无法访问 localStorage","error")}}),i.addEventListener("click",()=>{e.value="";try{localStorage.removeItem("aurum.adminToken")}catch{}x("已清除管理员令牌","info")})}}function Ci(t){const e=wi(),r=t.querySelectorAll("#theme-toggle button");r.forEach(i=>{i.dataset.mode===e&&i.classList.add("active"),i.addEventListener("click",()=>{const a=i.dataset.mode;yi(a),r.forEach(s=>s.classList.toggle("active",s===i)),x(`主题已切换：${a}`,"info")})})}async function Ei(t){try{const e=await y.channels(),r=t.querySelector("#channels");if(!r)return;r.innerHTML="";const i=new Set(e.configured);for(const a of e.available){const s=_i[a]||{label:a,key:a.toUpperCase(),help:""},n=i.has(a),c=document.createElement("div");c.className=`channel ${n?"configured":""}`,c.innerHTML=`
        <div>
          <div class="channel-name">${s.label}</div>
          <div class="channel-meta">${s.help} · 环境变量：<code style="font-family:var(--font-mono);font-size:11px;">${s.key}</code></div>
        </div>
        <span class="channel-status">${n?"已配置":"未配置"}</span>
      `,r.appendChild(c)}}catch(e){x(e?.message||"通道状态加载失败","error")}}const Ai=`
.chat-shell {
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
  padding: 18px 0 8px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  height: calc(100vh - 100px);
}
.sidebar {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  padding: 18px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  padding: 18px 22px 0;
  position: relative;
  overflow: hidden;
}
.chat-topbar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--c-border);
}
.chat-topbar h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.banner {
  margin: 12px 0 4px;
  padding: 10px 14px;
  background: var(--c-bg-soft);
  border-left: 2px solid var(--c-accent);
  border-radius: 8px;
  font-size: 12px;
  color: var(--c-text-soft);
  line-height: 1.6;
}
.thread {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
}
.sidebar-backdrop {
  display: none;
}
.mobile-toggle {
  display: none;
}
@media (max-width: 920px) {
  .chat-shell {
    grid-template-columns: 1fr;
    height: calc(100vh - 100px);
    width: calc(100% - 16px);
  }
  .sidebar {
    position: fixed;
    inset: 0 30% 0 0;
    z-index: 60;
    transform: translateX(-100%);
    transition: transform 280ms var(--ease-spring);
    border-radius: 0 14px 14px 0;
    box-shadow: var(--shadow-lg);
  }
  .chat-shell[data-mobile-open="true"] .sidebar {
    transform: translateX(0);
  }
  .mobile-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 8px;
    background: var(--c-surface-2);
    color: var(--c-text);
    font-size: 12px;
    cursor: pointer;
  }
  .sidebar-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(15, 12, 8, 0.34);
    z-index: 55;
    backdrop-filter: blur(2px);
  }
  .chat-shell[data-mobile-open="true"] .sidebar-backdrop {
    display: block;
  }
}
`;function Ti(){const t=document.createElement("div");t.dataset.title="Hermes 对话",t.innerHTML=`
    <style>${Ai}</style>
    <aurum-shell>
      <div class="chat-shell" data-mobile-open="false">
        <div class="sidebar-backdrop"></div>
        <aside class="sidebar">
          <aurum-chat-session-list id="session-list"></aurum-chat-session-list>
        </aside>
        <section class="main">
          <div class="chat-topbar">
            <h1 id="chat-title">Hermes 对话</h1>
            <button class="mobile-toggle" id="mobile-toggle">📋 历史</button>
          </div>
          <div class="banner">
            ✨ Hermes 是 Aurum 的对话助手，只聊黄金行情和网站使用；不会触碰代码 / 部署 / 服务器，也无法执行任何操作。
          </div>
          <div class="thread" id="thread"></div>
          <aurum-chat-input id="chat-input"></aurum-chat-input>
        </section>
      </div>
      <aurum-toast-stack></aurum-toast-stack>
    </aurum-shell>
  `;const e={clientId:ia(),sessions:[],activeId:"",messages:[],greeting:null,streaming:!1};return zi(t),Oi(t,e),Mi(t,e),Pi(t,e),t}function zi(t){const e=t.querySelector(".chat-shell"),r=t.querySelector("#mobile-toggle"),i=t.querySelector(".sidebar-backdrop");!e||!r||(r.addEventListener("click",()=>{e.dataset.mobileOpen=e.dataset.mobileOpen==="true"?"false":"true"}),i?.addEventListener("click",()=>{e.dataset.mobileOpen="false"}))}function Oi(t,e){const r=t.querySelector("#session-list");r&&(r.addEventListener("session-create",()=>void wt(t,e)),r.addEventListener("session-select",i=>{const a=i.detail.id;$t(t,e,a)}),r.addEventListener("session-delete",i=>{const a=i.detail.id;Li(t,e,a)}))}function Mi(t,e){const r=t.querySelector("#chat-input");r&&r.addEventListener("send",async i=>{const a=i.detail.content;await or(t,e,a)})}async function Pi(t,e){try{const[r,i]=await Promise.all([y.chat.greeting(),y.chat.listSessions(e.clientId)]);e.greeting=r,e.sessions=i,Se(t,e),i.length>0?await $t(t,e,i[0].id):await wt(t,e)}catch(r){r instanceof pe?x(r.message||"聊天初始化失败","error"):x("聊天初始化失败","error")}}function Se(t,e){const r=t.querySelector("#session-list");r&&(r.sessions=e.sessions,r.activeId=e.activeId)}async function wt(t,e){try{const r=await y.chat.createSession(e.clientId);e.sessions=[r,...e.sessions],e.activeId=r.id,e.messages=[],Se(t,e),nr(t,e),_t(t,r.title)}catch(r){x(r?.message||"新建对话失败","error")}}async function $t(t,e,r){try{e.activeId=r,Se(t,e),e.messages=await y.chat.listMessages(r,e.clientId);const i=e.sessions.find(a=>a.id===r);_t(t,i?.title||"Hermes 对话"),nr(t,e)}catch(i){x(i?.message||"加载会话失败","error")}}async function Li(t,e,r){if(confirm("删除这个对话？历史消息会被归档但不再显示。"))try{await y.chat.deleteSession(r,e.clientId),e.sessions=e.sessions.filter(i=>i.id!==r),e.activeId===r?e.sessions.length>0?await $t(t,e,e.sessions[0].id):await wt(t,e):Se(t,e),x("对话已删除","info")}catch(i){x(i?.message||"删除失败","error")}}function _t(t,e){const r=t.querySelector("#chat-title");r&&(r.textContent=e||"Hermes 对话")}function nr(t,e){const r=t.querySelector("#thread");if(r){if(r.innerHTML="",e.messages.length===0&&e.greeting){const i=document.createElement("aurum-chat-greeting-card");i.greeting=e.greeting,i.addEventListener("suggestion-select",a=>{const s=a.detail.question;or(t,e,s)}),r.appendChild(i)}for(const i of e.messages)at(r,i.role==="user"?"user":"assistant",i.content);it(r)}}function at(t,e,r,i=!1){const a=document.createElement("aurum-chat-bubble");return a.variant=e,a.content=r,a.typing=i,t.appendChild(a),a}function it(t){requestAnimationFrame(()=>{t.scrollTop=t.scrollHeight})}async function or(t,e,r){if(!e.activeId||e.streaming)return;const i=r.trim();if(!i)return;if(i.length>4e3){x("消息超过 4000 字符上限","warn");return}e.streaming=!0;const a=t.querySelector("#chat-input");a&&(a.disabled=!0);const s=t.querySelector("#thread");if(!s){e.streaming=!1,a&&(a.disabled=!1);return}if(e.messages.length===0){const h=s.querySelector("aurum-chat-greeting-card");h&&h.remove()}at(s,"user",i),it(s);const n=at(s,"assistant","",!0);let c="",o=null,l=!1,p=!1;const d=()=>{n&&(n.content=c||"（暂无回复）"),it(s),o=null};try{for await(const h of y.chat.streamMessage(e.activeId,e.clientId,i))c+=h,l=!0,o===null&&(o=requestAnimationFrame(d));o===null&&(n.content=c||"（暂无回复）"),n.typing=!1,l||(n.content="（模型未返回内容，请稍后重试）"),p=l,setTimeout(()=>{qi(t,e)},1500)}catch(h){n.typing=!1,n.content=`（出错了：${h?.message||"请求失败"}）`,x(h?.message||"发送失败","error"),setTimeout(()=>{n.remove();const u=s.querySelectorAll('aurum-chat-bubble[variant="user"]'),b=u[u.length-1];b&&b.remove()},2400)}finally{e.streaming=!1,a&&(a.disabled=!1),p&&(e.messages=[...e.messages,{id:`tmp-u-${Date.now()}`,session_id:e.activeId,role:"user",content:i,created_at:new Date().toISOString()},{id:`tmp-a-${Date.now()}`,session_id:e.activeId,role:"assistant",content:n.content,created_at:new Date().toISOString()}])}}async function qi(t,e){try{const r=await y.chat.listSessions(e.clientId);e.sessions=r,Se(t,e);const i=r.find(a=>a.id===e.activeId);i&&_t(t,i.title)}catch{}}bi();er.on("/app/predictions",Ua).on("/app/records",Ja).on("/app/insights",ni).on("/app/settings",ki).on("/app/chat",Ti).on("/app",Oa).on("/",It).setFallback(It);const Rt=document.getElementById("app");Rt&&er.bind(Rt);
