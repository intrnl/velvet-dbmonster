var H=100,re=function(){function n(e,t,i,s){this.min=e,this.max=t,this.mean=i,this.last=s}return n}(),F=function(){function n(e){this.samples=[],this.maxSamples=e,this._i=-1}return n.prototype.addSample=function(e){this._i=(this._i+1)%this.maxSamples,this.samples[this._i]=e},n.prototype.each=function(e){for(var t=this.samples,i=0;i<t.length;i++)e(t[(this._i+1+i)%t.length],i)},n.prototype.calc=function(){var e=this.samples;if(e.length===0)return new re(0,0,0,0);for(var t=e[(this._i+1)%e.length],i=t,s=0,l=0;l<e.length;l++){var a=e[(this._i+1+l)%e.length];a<t&&(t=a),a>i&&(i=a),s+=a}var r=e[this._i],o=s/e.length;return new re(t,i,o,r)},n}(),Me=function(){function n(){this.value=0,this.onChange=null}return n.prototype.inc=function(e){e>0&&(this.value+=e,this.onChange())},n}(),$e=function(){function n(e,t){this.value=t,this.next=null}return n}(),He=function(){function n(e){var t=this;this._dec=function(){for(var i=performance.now();t._firstTimestamp!==null;){var s=t._firstTimestamp;if(i>=s.value)t.value-=s.value,t._firstTimestamp=t._firstTimestamp.next;else{setTimeout(t._dec,Math.ceil(s.value-i));break}}t._firstTimestamp===null&&(t._lastTimestamp=null),t.onChange()},this.interval=e,this.value=0,this.onChange=null,this._firstTimestamp=null,this._lastTimestamp=null}return n.prototype.inc=function(e){if(e>0){var t=new $e(performance.now()+this.interval,e);this._firstTimestamp===null?(this._firstTimestamp=t,setTimeout(this._dec,this.interval)):this._lastTimestamp.next=t,this._lastTimestamp=t,this.value+=e,this.onChange()}},n}(),z=[],oe=-1;function Ne(n){z.push(n),oe===-1&&requestAnimationFrame(function(e){oe=-1;var t=z;z=[];for(var i=0;i<t.length;i++)t[i]()})}var ue=function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(e,t){n(e,t);function i(){this.constructor=e}e.prototype=t===null?Object.create(t):(i.prototype=t.prototype,new i)}}(),M=30,ce=H,fe=function(){function n(e){var t=this;this._sync=function(){t.sync(),t._dirty=!1},this.name=e,this.element=document.createElement("div"),this.element.style.cssText="padding: 2px;background-color: #020;font-family: monospace;font-size: 12px;color: #0f0",this._dirty=!1,this.invalidate()}return n.prototype.invalidate=function(){this._dirty||(this._dirty=!0,Ne(this._sync))},n.prototype.sync=function(){throw new Error("sync method not implemented")},n}(),h;(function(n){n[n.HideMin=1]="HideMin",n[n.HideMax=2]="HideMax",n[n.HideMean=4]="HideMean",n[n.HideLast=8]="HideLast",n[n.HideGraph=16]="HideGraph",n[n.RoundValues=32]="RoundValues"})(h||(h={}));var Q=function(n){ue(e,n);function e(t,i,s,l){var a=n.call(this,t)||this;a.flags=i,a.unitName=s,a.samples=l;var r=document.createElement("div");r.style.cssText="text-align: center",r.textContent=a.name;var o=document.createElement("div");return(i&h.HideMin)===0?(a.minText=document.createElement("div"),o.appendChild(a.minText)):a.minText=null,(i&h.HideMax)===0?(a.maxText=document.createElement("div"),o.appendChild(a.maxText)):a.maxText=null,(i&h.HideMean)===0?(a.meanText=document.createElement("div"),o.appendChild(a.meanText)):a.meanText=null,(i&h.HideLast)===0?(a.lastText=document.createElement("div"),o.appendChild(a.lastText)):a.lastText=null,a.element.appendChild(r),a.element.appendChild(o),(i&h.HideGraph)===0?(a.canvas=document.createElement("canvas"),a.canvas.style.cssText="display: block; padding: 0; margin: 0",a.canvas.width=ce,a.canvas.height=M,a.ctx=a.canvas.getContext("2d"),a.element.appendChild(a.canvas)):(a.canvas=null,a.ctx=null),a}return e.prototype.sync=function(){var t=this,i=this.samples.calc(),s=M/(i.max*1.2),l,a,r,o;(this.flags&h.RoundValues)===0?(l=i.min.toFixed(2),a=i.max.toFixed(2),r=i.mean.toFixed(2),o=i.last.toFixed(2)):(l=Math.round(i.min).toString(),a=Math.round(i.max).toString(),r=Math.round(i.mean).toString(),o=Math.round(i.last).toString()),this.minText!==null&&(this.minText.textContent="min: \xA0"+l+this.unitName),this.maxText!==null&&(this.maxText.textContent="max: \xA0"+a+this.unitName),this.meanText!==null&&(this.meanText.textContent="mean: "+r+this.unitName),this.lastText!==null&&(this.lastText.textContent="last: "+o+this.unitName),this.ctx!==null&&(this.ctx.fillStyle="#010",this.ctx.fillRect(0,0,ce,M),this.ctx.fillStyle="#0f0",this.samples.each(function(c,p){t.ctx.fillRect(p,M,1,-(c*s))}))},e}(fe),Ae=function(n){ue(e,n);function e(t,i){var s=n.call(this,t)||this;return s.counter=i,s.text=document.createElement("div"),s.element.appendChild(s.text),s}return e.prototype.sync=function(){this.text.textContent=this.name+": "+this.counter.value},e}(fe),_=null,Pe=!1;function J(){_||(_=document.createElement("div"),_.style.cssText="position: fixed;opacity: 0.9;right: 0;bottom: 0",document.body.appendChild(_)),Pe=!0}function he(n){n===void 0&&(n=h.HideMin|h.HideMax|h.HideMean|h.RoundValues),J();var e=new F(H),t=new Q("FPS",n,"",e);_.appendChild(t.element);var i=2/121,s=0,l=60;function a(r){s>0&&(l+=i*(1e3/(r-s)-l)),s=r,e.addSample(l),t.invalidate(),requestAnimationFrame(a)}requestAnimationFrame(a)}function pe(n){if(n===void 0&&(n=h.HideMin|h.HideMean),J(),performance.memory===void 0)return;var e=new F(H),t=new Q("Memory",n,"MB",e);_.appendChild(t.element);function i(){e.addSample(Math.round(performance.memory.usedJSHeapSize/(1024*1024))),t.invalidate(),setTimeout(i,30)}i()}var Re=function(){function n(e,t,i){this.data=new F(H),this.widget=new Q(e,i,t,this.data),this.startTime=-1}return n}(),$={},Xe=function(){function n(e,t){var i=this;this.data=t===void 0?new Me:new He(t),this.widget=new Ae(e,this.data),this.data.onChange=function(){i.widget.invalidate()}}return n}();function de(n,e){e===void 0&&(e=0),J();var t=$[n];t===void 0&&($[n]=t=new Re(n,"ms",e),_.appendChild(t.widget.element))}function me(n){var e=$[n];e!==void 0&&(e.startTime=performance.now())}function ve(n){var e=performance.now(),t=$[n];t!==void 0&&t.startTime!==-1&&(t.data.addSample(e-t.startTime),t.widget.invalidate())}function T(n){let e=document.createElement("template");return e.innerHTML=n,e}function C(n){return document.importNode(n.content,!0)}function m(n,e){let t=n,i=0,s=e.length,l,a;for(;i<s;i++)for(l=e[i],t=t.firstChild,a=0;a<l;a++)t=t.nextSibling;return t}function Z(n,e,t){if(n.replaceWith(e),t){let i=n.childNodes,s=i.length;for(;s--;)e.appendChild(i[0])}}function D(n,e){n.append(e)}function I(n,e){n.after(e)}function X(n,e){let t=n;if(e.nextSibling!==n)for(;t;){let i=t;if(t=t.nextSibling,i.remove(),i===e)break}}function B(n,e,t){n.setAttribute(e,t)}var P=Object,Oe=Symbol,Le=/\B([A-Z])/g;function _e(n){return n.replace(Le,"-$1").toLowerCase()}var xe=P.is,De=P.assign,V=n=>typeof n=="function";var u,g=1<<0,R=1<<1,K=1<<2,We=1<<3,ye=1<<4,N=1<<5,f,d,y,A=0,Y=0,Ie=0;function be(){A++}function ge(){if(A>1){A--;return}let n,e=!1;for(;y;){let t=y.sort((i,s)=>i.h-s.h);y=u,Y++;for(let i=0,s=t.length;i<s;i++){let l=t[i];l.c&=~K;try{l.s()}catch(a){e||(n=a,e=!0)}}}if(Y=0,A--,e)throw n}function Be(n){let e;if(d)if(e=n.k,!e||e.p!==d)e={d:0,c:0,m:u,g:n,e:d.b,i:u,p:d,j:u,n:u},d.b=e,n.k=e,d.c&ye&&n.o(e);else if(e.c&R){e.c&=~R;let t=d.b,i=e.i,s=e.e;e!==t&&(i&&(i.e=s),s&&(s.i=i),t&&(t.i=e),e.i=u,e.e=t,d.b=e)}else e=u;try{return n.peek()}finally{e&&(e.d=n.d)}}function Ve(n){for(let e=n.b;e;e=e.e){let t=e.g.k;t&&(e.m=t),e.g.k=e,e.c|=R}}function qe(n){let e=n.b,t;for(;e;){let i=e.e;e.c&R?(e.g.l(e),e.e=u):(t&&(t.i=e),e.i=u,e.e=t,t=e),e.g.k=e.m,e.m&&(e.m=u),e=i}n.b=t}function Ge(n){let e=this;qe(e),d=n,ge(),e.c&=~g}var S=class{constructor(e){let t=this;t.d=0,t.a=e,t.k=u,t.f=u}o(e){let t=this;e.c&N||(e.c|=N,e.j=t.f,t.f&&(t.f.n=e),t.f=e)}l(e){let t=this,i=e.n,s=e.j;e.c&N&&(e.c&=~N,i&&(i.j=s,e.n=u),s&&(s.n=i,e.j=u),e===t.f&&(t.f=s))}subscribe(e){return v(()=>e(this.value))}set(e){return this.value=e}peek(){return this.a}get value(){return Be(this)}set value(e){let t=this;if(e!==t.a){if(t.a=e,Y>100)return;t.d++,Ie++,be();try{for(let i=t.f;i;i=i.j)i.p.q()}finally{ge()}}}};var j=class{constructor(e){this.r=e,this.b=u,this.h=0,this.c=ye}s(){let e=this;if(e.c&g)return;let t=e.u();try{e.r()}finally{t()}}u(){let e=this,t=d;return e.c|=g,be(),d=e,Ve(e),Ge.bind(e,t)}q(){let e=this;e.c&(K|g)||(e.c|=K,y||(y=[]),y.push(e))}v(){let e=this;for(let t=e.b;t;t=t.e)t.g.l(t);e.c|=g,e.b=u}},O=class{constructor(e){let t=this;t.scopes=[],t.cleanups=[],t.parent=u,t.h=0,!e&&f&&(t.parent=f,t.h=f.h+1,f.scopes.push(t))}run(e){let t=f;try{return f=this,e()}finally{f=t}}clear(){let e=this,t=e.scopes,i=e.cleanups;for(let s of t)s.clear(),s.parent=u;for(let s of i)s();t.length=0,i.length=0}};function q(n){return new O(n)}function W(n){V(n)&&f&&f.cleanups.push(n)}function G(n){return new S(n)}function v(n){let e=new j(n),t=e.v.bind(e);try{e.s()}catch(i){throw t(),i}return f&&(e.h=f.h,f.cleanups.push(t)),t}var Ue=!1,ze=1;var w=null,ee=Oe(),L=class extends HTMLElement{$m=!1;$c=q(!0);$p={};$h=[];constructor(){super();let e=this,t=e.$p,i=e.constructor.$d;for(let s in i){let l=i[s];t[l]=G(ee)}}connectedCallback(){let e=this;if(!e.$m){e.$m=!0;let t=e.constructor.$c,i=e.constructor.$s,s=e.$c,l=e.$h,a=e.shadowRoot,r=!1;a||(a=e.attachShadow({mode:"open"}),r=!0);let o=w;try{if(w=e,s.run(()=>t(a,e)),document.adoptedStyleSheets)r&&(a.adoptedStyleSheets=i);else for(let c of i)D(a,c.cloneNode(!0));for(let c of l){let p=c();V(p)&&s.cleanups.push(p)}l.length=0}finally{w=o}}}disconnectedCallback(){let e=this;e.$m&&(e.$c.clear(),e.shadowRoot.innerHTML="",e.$m=!1)}attributeChangedCallback(e,t,i){let s=this,l=s.constructor.$d;e in l&&(s.$p[l[e]].value=i===""?!0:i)}};function te(n,e,t,i){let s=[],l=P.create(null);class a extends L{static observedAttributes=s;static $c=e;static $a=l;static $d=t;static $s=i}for(let r in t){let o=t[r],c=_e(r);l[c]=r,s.push(c),P.defineProperty(a.prototype,r,{get(){return this.$p[o].a},set(p){this.$p[o].value=p}})}return Ue&&(n="velvet-"+ze++),n&&customElements.define(n,a),a}function ne(n,e){let t=w.$p[n];return t.value===ee&&(t.value=V(e)?e():e),t}function k(n,e){let t=document.createTextNode("");Z(n,t),v(()=>t.data=e())}function ie(n,e,t){let i=[],s=f.h+1;v(()=>{let l=t(),a=0,r=l.length,o=i.length;for(;a<r;a++)if(i[a]){let c=i[a][2];c.value=l[a]}else{let c=i[a-1],p=c?c[1]:n,x=G(l[a]),b=q(!0);b.h=s,i[a]=[b,b.run(()=>e(p,x,a)),x]}if(o>r){let c=i[a-1],p=c?c[1]:n,x=i[o-1][1];for(;a<o;a++)i[a][0].clear();Qe(p,x),i.length=r}}),W(()=>{for(let l=0,a=i.length;l<a;l++)i[l][0].clear()})}function Qe(n,e){X(n.nextSibling,e)}var Je=T("<table class='table table-striped latest-data'><tbody><!></tbody></table>"),Ke=T("<tr><td class=dbname><!></td><td class=query-count><span> <!> </span></td></tr>"),Ye=T("<td><!> <div class='popover left'><div class=popover-content><!></div><div class=arrow></div></div></td>");function Ze(n,e){let t=ne(0,()=>[]),i=C(Je),s=m(i,[0,0,0]);ie(s,(a,r)=>{let o=C(Ke),c=m(o,[0,0,0]),p=m(o,[0,1,0,1]),x=m(o,[0,1,0]),b=m(o,[0,1]),Se=m(o,[0]),Te=(Ce,U)=>{let E=C(Ye),ke=m(E,[0,0]),Ee=m(E,[0,2,0,0]),le=m(E,[0]);return k(ke,()=>U.value.formatElapsed),k(Ee,()=>U.value.query),v(()=>B(le,"class",`Query ${U.value.elapsedClassName}`)),I(Ce,E),le};return k(c,()=>r.value.dbname),k(p,()=>r.value.lastSample.nbQueries),v(()=>B(x,"class",r.value.lastSample.countClassName)),ie(b,Te,()=>r.value.lastSample.topFiveQueries),I(a,o),Se},()=>t.value),D(n,i)}var ae=te("x-app",Ze,{dbs:0},[]);ae.prototype.attachShadow=function(){return this};var se=new ae;se.dbs=ENV.generateData().toArray();document.body.appendChild(se);he();pe();de("view update");function we(){let n=ENV.generateData().toArray();me("view update"),se.dbs=n,ve("view update"),setTimeout(we,ENV.timeout)}we();
//# sourceMappingURL=app.js.map