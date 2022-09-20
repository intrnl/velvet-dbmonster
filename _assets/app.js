var M=100,le=function(){function n(e,t,i,s){this.min=e,this.max=t,this.mean=i,this.last=s}return n}(),Q=function(){function n(e){this.samples=[],this.maxSamples=e,this._i=-1}return n.prototype.addSample=function(e){this._i=(this._i+1)%this.maxSamples,this.samples[this._i]=e},n.prototype.each=function(e){for(var t=this.samples,i=0;i<t.length;i++)e(t[(this._i+1+i)%t.length],i)},n.prototype.calc=function(){var e=this.samples;if(e.length===0)return new le(0,0,0,0);for(var t=e[(this._i+1)%e.length],i=t,s=0,l=0;l<e.length;l++){var a=e[(this._i+1+l)%e.length];a<t&&(t=a),a>i&&(i=a),s+=a}var o=e[this._i],r=s/e.length;return new le(t,i,r,o)},n}(),Me=function(){function n(){this.value=0,this.onChange=null}return n.prototype.inc=function(e){e>0&&(this.value+=e,this.onChange())},n}(),He=function(){function n(e,t){this.value=t,this.next=null}return n}(),$e=function(){function n(e){var t=this;this._dec=function(){for(var i=performance.now();t._firstTimestamp!==null;){var s=t._firstTimestamp;if(i>=s.value)t.value-=s.value,t._firstTimestamp=t._firstTimestamp.next;else{setTimeout(t._dec,Math.ceil(s.value-i));break}}t._firstTimestamp===null&&(t._lastTimestamp=null),t.onChange()},this.interval=e,this.value=0,this.onChange=null,this._firstTimestamp=null,this._lastTimestamp=null}return n.prototype.inc=function(e){if(e>0){var t=new He(performance.now()+this.interval,e);this._firstTimestamp===null?(this._firstTimestamp=t,setTimeout(this._dec,this.interval)):this._lastTimestamp.next=t,this._lastTimestamp=t,this.value+=e,this.onChange()}},n}(),F=[],re=-1;function Ne(n){F.push(n),re===-1&&requestAnimationFrame(function(e){re=-1;var t=F;F=[];for(var i=0;i<t.length;i++)t[i]()})}var ce=function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(e,t){n(e,t);function i(){this.constructor=e}e.prototype=t===null?Object.create(t):(i.prototype=t.prototype,new i)}}(),k=30,oe=M,ue=function(){function n(e){var t=this;this._sync=function(){t.sync(),t._dirty=!1},this.name=e,this.element=document.createElement("div"),this.element.style.cssText="padding: 2px;background-color: #020;font-family: monospace;font-size: 12px;color: #0f0",this._dirty=!1,this.invalidate()}return n.prototype.invalidate=function(){this._dirty||(this._dirty=!0,Ne(this._sync))},n.prototype.sync=function(){throw new Error("sync method not implemented")},n}(),f;(function(n){n[n.HideMin=1]="HideMin",n[n.HideMax=2]="HideMax",n[n.HideMean=4]="HideMean",n[n.HideLast=8]="HideLast",n[n.HideGraph=16]="HideGraph",n[n.RoundValues=32]="RoundValues"})(f||(f={}));var U=function(n){ce(e,n);function e(t,i,s,l){var a=n.call(this,t)||this;a.flags=i,a.unitName=s,a.samples=l;var o=document.createElement("div");o.style.cssText="text-align: center",o.textContent=a.name;var r=document.createElement("div");return(i&f.HideMin)===0?(a.minText=document.createElement("div"),r.appendChild(a.minText)):a.minText=null,(i&f.HideMax)===0?(a.maxText=document.createElement("div"),r.appendChild(a.maxText)):a.maxText=null,(i&f.HideMean)===0?(a.meanText=document.createElement("div"),r.appendChild(a.meanText)):a.meanText=null,(i&f.HideLast)===0?(a.lastText=document.createElement("div"),r.appendChild(a.lastText)):a.lastText=null,a.element.appendChild(o),a.element.appendChild(r),(i&f.HideGraph)===0?(a.canvas=document.createElement("canvas"),a.canvas.style.cssText="display: block; padding: 0; margin: 0",a.canvas.width=oe,a.canvas.height=k,a.ctx=a.canvas.getContext("2d"),a.element.appendChild(a.canvas)):(a.canvas=null,a.ctx=null),a}return e.prototype.sync=function(){var t=this,i=this.samples.calc(),s=k/(i.max*1.2),l,a,o,r;(this.flags&f.RoundValues)===0?(l=i.min.toFixed(2),a=i.max.toFixed(2),o=i.mean.toFixed(2),r=i.last.toFixed(2)):(l=Math.round(i.min).toString(),a=Math.round(i.max).toString(),o=Math.round(i.mean).toString(),r=Math.round(i.last).toString()),this.minText!==null&&(this.minText.textContent="min: \xA0"+l+this.unitName),this.maxText!==null&&(this.maxText.textContent="max: \xA0"+a+this.unitName),this.meanText!==null&&(this.meanText.textContent="mean: "+o+this.unitName),this.lastText!==null&&(this.lastText.textContent="last: "+r+this.unitName),this.ctx!==null&&(this.ctx.fillStyle="#010",this.ctx.fillRect(0,0,oe,k),this.ctx.fillStyle="#0f0",this.samples.each(function(u,h){t.ctx.fillRect(h,k,1,-(u*s))}))},e}(ue),Ae=function(n){ce(e,n);function e(t,i){var s=n.call(this,t)||this;return s.counter=i,s.text=document.createElement("div"),s.element.appendChild(s.text),s}return e.prototype.sync=function(){this.text.textContent=this.name+": "+this.counter.value},e}(ue),_=null,Pe=!1;function J(){_||(_=document.createElement("div"),_.style.cssText="position: fixed;opacity: 0.9;right: 0;bottom: 0",document.body.appendChild(_)),Pe=!0}function fe(n){n===void 0&&(n=f.HideMin|f.HideMax|f.HideMean|f.RoundValues),J();var e=new Q(M),t=new U("FPS",n,"",e);_.appendChild(t.element);var i=2/121,s=0,l=60;function a(o){s>0&&(l+=i*(1e3/(o-s)-l)),s=o,e.addSample(l),t.invalidate(),requestAnimationFrame(a)}requestAnimationFrame(a)}function he(n){if(n===void 0&&(n=f.HideMin|f.HideMean),J(),performance.memory===void 0)return;var e=new Q(M),t=new U("Memory",n,"MB",e);_.appendChild(t.element);function i(){e.addSample(Math.round(performance.memory.usedJSHeapSize/(1024*1024))),t.invalidate(),setTimeout(i,30)}i()}var Re=function(){function n(e,t,i){this.data=new Q(M),this.widget=new U(e,i,t,this.data),this.startTime=-1}return n}(),E={},Xe=function(){function n(e,t){var i=this;this.data=t===void 0?new Me:new $e(t),this.widget=new Ae(e,this.data),this.data.onChange=function(){i.widget.invalidate()}}return n}();function pe(n,e){e===void 0&&(e=0),J();var t=E[n];t===void 0&&(E[n]=t=new Re(n,"ms",e),_.appendChild(t.widget.element))}function de(n){var e=E[n];e!==void 0&&(e.startTime=performance.now())}function me(n){var e=performance.now(),t=E[n];t!==void 0&&t.startTime!==-1&&(t.data.addSample(e-t.startTime),t.widget.invalidate())}function g(n){let e=document.createElement("template");return e.innerHTML=n,e}function w(n){return n.content.cloneNode(!0)}function d(n,e){let t=n,i=0,s=e.length,l,a;for(;i<s;i++)for(l=e[i],t=t.firstChild,a=0;a<l;a++)t=t.nextSibling;return t}function Z(n,e,t){if(n.replaceWith(e),t){let i=n.childNodes,s=i.length;for(;s--;)e.appendChild(i[0])}}function L(n,e){n.append(e)}function D(n,e){n.after(e)}function X(n,e){let t=n;if(e.nextSibling!==n)for(;t;){let i=t;if(t=t.nextSibling,i.remove(),i===e)break}}function I(n,e,t){n.setAttribute(e,t)}var A=Object,Oe=Symbol,Le=/\B([A-Z])/g;function ve(n){return n.replace(Le,"-$1").toLowerCase()}var _e=A.is,De=A.assign,B=n=>typeof n=="function";var c,$=1<<0,P=1<<1,K=1<<2,We=1<<3,xe=1<<4,H=1<<5,m,p,x,N=0,Y=0,Ie=0;function ye(){N++}function be(){if(N>1){N--;return}let n,e=!1;for(;x;){let t=x;for(x=c,Y++;t;){let i=t.o;t.o=c,t.c&=~K;try{t.s()}catch(s){e||(n=s,e=!0)}t=i}}if(Y=0,N--,e)throw n}function Be(n){let e;if(p)if(e=n.j,!e||e.p!==p)e={d:0,c:0,l:c,g:n,e:p.b,h:c,p,i:c,m:c},p.b=e,n.j=e,p.c&xe&&n.n(e);else if(e.c&P){e.c&=~P;let t=p.b,i=e.h,s=e.e;e!==t&&(i&&(i.e=s),s&&(s.h=i),t&&(t.h=e),e.h=c,e.e=t,p.b=e)}else e=c;try{return n.peek()}finally{e&&(e.d=n.d)}}function Ve(n){for(let e=n.b;e;e=e.e){let t=e.g.j;t&&(e.l=t),e.g.j=e,e.c|=P}}function qe(n){let e=n.b,t;for(;e;){let i=e.e;e.c&P?(e.g.k(e),e.e=c):(t&&(t.h=e),e.h=c,e.e=t,t=e),e.g.j=e.l,e.l&&(e.l=c),e=i}n.b=t}function Ge(n){let e=this;qe(e),p=n,be(),e.c&=~$}var b=class{constructor(e){let t=this;t.d=0,t.a=e,t.j=c,t.f=c}n(e){let t=this;e.c&H||(e.c|=H,e.i=t.f,t.f&&(t.f.m=e),t.f=e)}k(e){let t=this,i=e.m,s=e.i;e.c&H&&(e.c&=~H,i&&(i.i=s,e.m=c),s&&(s.m=i,e.i=c),e===t.f&&(t.f=s))}subscribe(e){return v(()=>e(this.value))}set(e){return this.value=e}peek(){return this.a}get value(){return Be(this)}set value(e){let t=this;if(e!==t.a){if(t.a=e,Y>100)return;t.d++,Ie++,ye();try{for(let i=t.f;i;i=i.i)i.p.q()}finally{be()}}}};var R=class{constructor(e){this.r=e,this.b=c,this.o=c,this.c=xe}s(){let e=this;if(e.c&$)return;let t=e.u();try{e.r()}finally{t()}}u(){let e=this,t=p;return e.c|=$,ye(),p=e,Ve(e),Ge.bind(e,t)}q(){let e=this;e.c&(K|$)||(e.c|=K,e.o=x,x=e)}v(){let e=this;for(let t=e.b;t;t=t.e)t.g.k(t);e.b=c}},j=class{constructor(e){let t=this;t.scopes=[],t.cleanups=[],t.parent=m,!e&&m&&m.scopes.push(t)}run(e){let t=m;try{return m=this,e()}finally{m=t}}clear(){let e=this,t=e.scopes,i=e.cleanups;for(let s of t)s.clear(),s.parent=c;for(let s of i)s();t.length=0,i.length=0}};function V(n){return new j(n)}function q(n){B(n)&&m&&m.cleanups.push(n)}function G(n){return new b(n)}function v(n){let e=new R(n),t=e.v.bind(e);return e.s(),q(t),t}var ze=!1,Fe=1;var y=null,W=Oe(),O=class extends HTMLElement{$m=!1;$c=V(!0);$p={};$h=[];constructor(){super();let e=this,t=e.$p,i=e.constructor.$d;for(let s in i){let l=i[s];t[l]=G(W)}}connectedCallback(){let e=this;if(!e.$m){e.$m=!0;let t=e.constructor.$c,i=e.constructor.$s,s=e.$c,l=e.$h,a=e.shadowRoot,o=!1;a||(a=e.attachShadow({mode:"open"}),o=!0);let r=y;try{if(y=e,s.run(()=>t(a,e)),document.adoptedStyleSheets)o&&(a.adoptedStyleSheets=i);else for(let u of i)L(a,u.cloneNode(!0));for(let u of l){let h=u();B(h)&&s.cleanups.push(h)}l.length=0}finally{y=r}}}disconnectedCallback(){let e=this;e.$m&&(e.$c.clear(),e.shadowRoot.innerHTML="",e.$m=!1)}attributeChangedCallback(e,t,i){let s=this,l=s.constructor.$d;e in l&&(s[l[e]]=i===""?!0:i)}};function ee(n,e,t,i){let s=[],l=A.create(null);class a extends O{static observedAttributes=s;static $c=e;static $a=l;static $d=t;static $s=i}for(let o in t){let r=t[o],u=ve(o);l[u]=o,s.push(u),A.defineProperty(a.prototype,o,{get(){return this.$p[r].a},set(h){this.$p[r].value=h}})}return ze&&(n="velvet-"+Fe++),n&&customElements.define(n,a),a}function te(n,e){let t=y.$p[n];return t.value===W&&(t.value=B(e)?e():e),t}function S(n,e){let t=document.createTextNode("");Z(n,t),v(()=>t.data=e())}function ne(n,e,t){let i=[];v(()=>{let s=t(),l=0,a=s.length,o=i.length;for(;l<a;l++)if(i[l]){let r=i[l][2];r.value=s[l]}else{let r=i[l-1],u=r?r[1]:n,h=G(s[l]),T=V(!0);i[l]=[T,T.run(()=>e(u,h,l)),h]}if(o>a){let r=i[l-1],u=r?r[1]:n,h=i[o-1][1];for(;l<o;l++)i[l][0].clear();Ue(u,h),i.length=a}}),q(()=>{for(let s of i)s[0].clear()})}function Ue(n,e){X(n.nextSibling,e)}var Je=g("<table class='table table-striped latest-data'> <tbody> <!> </tbody> </table>"),Ke=g("<tr> <td class=dbname> <!> </td> <td class=query-count> <span> <!> </span> </td> <!> </tr>"),Ye=g("<td> <!> <div class='popover left'> <div class=popover-content><!></div> <div class=arrow></div> </div> </td>");function Ze(n,e){let t=te(0,()=>[]),i=w(Je),s=d(i,[0,1,1]);ne(s,(a,o)=>{let r=w(Ke),u=d(r,[0,1,1]),h=d(r,[0,3,1,1]),T=d(r,[0,3,1]),we=d(r,[0,5]),Se=d(r,[0]),Te=(Ce,z)=>{let C=w(Ye),ke=d(C,[0,1]),Ee=d(C,[0,3,1,0]),se=d(C,[0]);return S(ke,()=>z.value.formatElapsed),S(Ee,()=>z.value.query),v(()=>I(se,"class",`Query ${z.value.elapsedClassName}`)),D(Ce,C),se};return S(u,()=>o.value.dbname),S(h,()=>o.value.lastSample.nbQueries),v(()=>I(T,"class",o.value.lastSample.countClassName)),ne(we,Te,()=>o.value.lastSample.topFiveQueries),D(a,r),Se},()=>t.value),L(n,i)}var ie=ee("x-app",Ze,{dbs:0},[]);ie.prototype.attachShadow=function(){return this};var ae=new ie;ae.dbs=ENV.generateData().toArray();document.body.appendChild(ae);fe();he();pe("view update");function ge(){de("view update"),ae.dbs=ENV.generateData().toArray(),me("view update"),setTimeout(ge,ENV.timeout)}ge();
//# sourceMappingURL=/_assets/app.js.map