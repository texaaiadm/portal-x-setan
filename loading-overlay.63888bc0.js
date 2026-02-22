var e,t;"function"==typeof(e=globalThis.define)&&(t=e,e=null),function(t,o,n,r,i){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof a[r]&&a[r],d=l.cache||{},m="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function p(e,o){if(!d[e]){if(!t[e]){var n="function"==typeof a[r]&&a[r];if(!o&&n)return n(e,!0);if(l)return l(e,!0);if(m&&"string"==typeof e)return m(e);var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}u.resolve=function(o){var n=t[e][1][o];return null!=n?n:o},u.cache={};var s=d[e]=new p.Module(e);t[e][0].call(s.exports,u,s,s.exports,this)}return d[e].exports;function u(e){var t=u.resolve(e);return!1===t?{}:p(t)}}p.isParcelRequire=!0,p.Module=function(e){this.id=e,this.bundle=p,this.exports={}},p.modules=t,p.cache=d,p.parent=l,p.register=function(e,o){t[e]=[function(e,t){t.exports=o},{}]},Object.defineProperty(p,"root",{get:function(){return a[r]}}),a[r]=p;for(var s=0;s<o.length;s++)p(o[s]);if(n){var u=p(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof e&&e.amd?e(function(){return u}):i&&(this[i]=u)}}({jXtUY:[function(e,t,o){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(o),n.export(o,"showLoadingOverlay",()=>i),n.export(o,"removeLoadingOverlay",()=>a);let r="premium-portal-loading-overlay",i=()=>{try{if(!document.head||!document.body){console.warn("[Plasmo ElementModifier] Document not ready, retrying..."),setTimeout(i,100);return}let e=document.getElementById(r);e&&e.remove();let t=document.createElement("div");t.id=r,t.style.cssText=`
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: #000000 !important;
        z-index: 999999999 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      `;let o=document.createElement("div");o.style.cssText=`
        text-align: center !important;
        animation: fadeIn 0.5s ease-in-out !important;
      `;let n=document.createElement("img");n.src="https://premiumportal.reacteev.id/_next/static/media/logo-premium-putih.59855a2f.svg",n.alt="Premium Portal",n.style.cssText=`
        width: 200px !important;
        height: auto !important;
        max-width: 80vw !important;
        opacity: 1 !important;
        filter: brightness(1) !important;
      `;let a=document.createElement("p");a.textContent="Loading Premium Portal...",a.style.cssText=`
        color: #ffffff !important;
        margin-top: 20px !important;
        font-size: 18px !important;
        font-weight: 500 !important;
        opacity: 0.8 !important;
      `;let l=document.createElement("style");if(l.textContent=`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `,!t||!o||!n||!a||!l){console.error("[Plasmo ElementModifier] Failed to create overlay elements");return}try{o.appendChild(n),o.appendChild(a),t.appendChild(o),document.head.querySelector("style[data-overlay-animation]")||(l.setAttribute("data-overlay-animation","true"),document.head.appendChild(l)),document.body.appendChild(t)}catch(e){console.error("[Plasmo ElementModifier] Error appending overlay elements:",e)}}catch(e){console.error("[Plasmo ElementModifier] Error in showLoadingOverlay:",e)}},a=()=>{let e=document.getElementById(r);e&&(e.style.opacity="0",e.style.transition="opacity 0.3s ease-out",setTimeout(()=>{e.remove()},300))}},{"@parcel/transformer-js/src/esmodule-helpers.js":"cHUbl"}],cHUbl:[function(e,t,o){o.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},o.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.exportAll=function(e,t){return Object.keys(e).forEach(function(o){"default"===o||"__esModule"===o||t.hasOwnProperty(o)||Object.defineProperty(t,o,{enumerable:!0,get:function(){return e[o]}})}),t},o.export=function(e,t,o){Object.defineProperty(e,t,{enumerable:!0,get:o})}},{}]},["jXtUY"],"jXtUY","parcelRequirec395"),globalThis.define=t;