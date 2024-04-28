/* interact.js 1.10.27 | https://raw.github.com/taye/interact.js/main/LICENSE */

import*as arr from"../utils/arr.prod.js";import extend from"../utils/extend.prod.js";import normalize from"../utils/normalizeListeners.prod.js";function fireUntilImmediateStopped(t,e){for(const o of e){if(t.immediatePropagationStopped)break;o(t)}}class Eventable{constructor(t){this.options=void 0,this.types={},this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.global=void 0,this.options=extend({},t||{})}fire(t){let e;const o=this.global;(e=this.types[t.type])&&fireUntilImmediateStopped(t,e),!t.propagationStopped&&o&&(e=o[t.type])&&fireUntilImmediateStopped(t,e)}on(t,e){const o=normalize(t,e);for(t in o)this.types[t]=arr.merge(this.types[t]||[],o[t])}off(t,e){const o=normalize(t,e);for(t in o){const e=this.types[t];if(e&&e.length)for(const i of o[t]){const t=e.indexOf(i);-1!==t&&e.splice(t,1)}}}getRect(t){return null}}export{Eventable};
//# sourceMappingURL=Eventable.prod.js.map
