/* interact.js 1.10.27 | https://raw.github.com/taye/interact.js/main/LICENSE */

import*as domUtils from"../../utils/domUtils.prod.js";import extend from"../../utils/extend.prod.js";import getOriginXY from"../../utils/getOriginXY.prod.js";import is from"../../utils/is.prod.js";import normalizeListeners from"../../utils/normalizeListeners.prod.js";import*as pointerUtils from"../../utils/pointerUtils.prod.js";import drag from"../drag/plugin.prod.js";import{DropEvent}from"./DropEvent.prod.js";import"../../core/BaseEvent.prod.js";import"../../utils/arr.prod.js";function install(e){const{actions:t,interactStatic:o,Interactable:r,defaults:n}=e;e.usePlugin(drag),r.prototype.dropzone=function(e){return dropzoneMethod(this,e)},r.prototype.dropCheck=function(e,t,o,r,n,i){return dropCheckMethod(this,e,t,o,r,n,i)},o.dynamicDrop=function(t){return is.bool(t)?(e.dynamicDrop=t,o):e.dynamicDrop},extend(t.phaselessTypes,{dragenter:!0,dragleave:!0,dropactivate:!0,dropdeactivate:!0,dropmove:!0,drop:!0}),t.methodDict.drop="dropzone",e.dynamicDrop=!1,n.actions.drop=drop.defaults}function collectDropzones(e,t){let{interactables:o}=e;const r=[];for(const e of o.list){if(!e.options.drop.enabled)continue;const o=e.options.drop.accept;if(!(is.element(o)&&o!==t||is.string(o)&&!domUtils.matchesSelector(t,o)||is.func(o)&&!o({dropzone:e,draggableElement:t})))for(const o of e.getAllElements())o!==t&&r.push({dropzone:e,element:o,rect:e.getRect(o)})}return r}function fireActivationEvents(e,t){for(const{dropzone:o,element:r}of e.slice())t.dropzone=o,t.target=r,o.fire(t),t.propagationStopped=t.immediatePropagationStopped=!1}function getActiveDrops(e,t){const o=collectDropzones(e,t);for(const e of o)e.rect=e.dropzone.getRect(e.element);return o}function getDrop(e,t,o){let{dropState:r,interactable:n,element:i}=e;const p=[];for(const{dropzone:e,element:a,rect:d}of r.activeDrops){const r=e.dropCheck(t,o,n,i,a,d);p.push(r?a:null)}const a=domUtils.indexOfDeepestElement(p);return r.activeDrops[a]||null}function getDropEvents(e,t,o){const r=e.dropState,n={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};return"dragstart"===o.type&&(n.activate=new DropEvent(r,o,"dropactivate"),n.activate.target=null,n.activate.dropzone=null),"dragend"===o.type&&(n.deactivate=new DropEvent(r,o,"dropdeactivate"),n.deactivate.target=null,n.deactivate.dropzone=null),r.rejected||(r.cur.element!==r.prev.element&&(r.prev.dropzone&&(n.leave=new DropEvent(r,o,"dragleave"),o.dragLeave=n.leave.target=r.prev.element,o.prevDropzone=n.leave.dropzone=r.prev.dropzone),r.cur.dropzone&&(n.enter=new DropEvent(r,o,"dragenter"),o.dragEnter=r.cur.element,o.dropzone=r.cur.dropzone)),"dragend"===o.type&&r.cur.dropzone&&(n.drop=new DropEvent(r,o,"drop"),o.dropzone=r.cur.dropzone,o.relatedTarget=r.cur.element),"dragmove"===o.type&&r.cur.dropzone&&(n.move=new DropEvent(r,o,"dropmove"),o.dropzone=r.cur.dropzone)),n}function fireDropEvents(e,t){const o=e.dropState,{activeDrops:r,cur:n,prev:i}=o;t.leave&&i.dropzone.fire(t.leave),t.enter&&n.dropzone.fire(t.enter),t.move&&n.dropzone.fire(t.move),t.drop&&n.dropzone.fire(t.drop),t.deactivate&&fireActivationEvents(r,t.deactivate),o.prev.dropzone=n.dropzone,o.prev.element=n.element}function onEventCreated(e,t){let{interaction:o,iEvent:r,event:n}=e;if("dragmove"!==r.type&&"dragend"!==r.type)return;const i=o.dropState;t.dynamicDrop&&(i.activeDrops=getActiveDrops(t,o.element));const p=r,a=getDrop(o,p,n);i.rejected=i.rejected&&!!a&&a.dropzone===i.cur.dropzone&&a.element===i.cur.element,i.cur.dropzone=a&&a.dropzone,i.cur.element=a&&a.element,i.events=getDropEvents(o,n,p)}function dropzoneMethod(e,t){if(is.object(t)){if(e.options.drop.enabled=!1!==t.enabled,t.listeners){const o=normalizeListeners(t.listeners),r=Object.keys(o).reduce(((e,t)=>(e[/^(enter|leave)/.test(t)?"drag"+t:/^(activate|deactivate|move)/.test(t)?"drop"+t:t]=o[t],e)),{}),n=e.options.drop.listeners;n&&e.off(n),e.on(r),e.options.drop.listeners=r}return is.func(t.ondrop)&&e.on("drop",t.ondrop),is.func(t.ondropactivate)&&e.on("dropactivate",t.ondropactivate),is.func(t.ondropdeactivate)&&e.on("dropdeactivate",t.ondropdeactivate),is.func(t.ondragenter)&&e.on("dragenter",t.ondragenter),is.func(t.ondragleave)&&e.on("dragleave",t.ondragleave),is.func(t.ondropmove)&&e.on("dropmove",t.ondropmove),/^(pointer|center)$/.test(t.overlap)?e.options.drop.overlap=t.overlap:is.number(t.overlap)&&(e.options.drop.overlap=Math.max(Math.min(1,t.overlap),0)),"accept"in t&&(e.options.drop.accept=t.accept),"checker"in t&&(e.options.drop.checker=t.checker),e}return is.bool(t)?(e.options.drop.enabled=t,e):e.options.drop}function dropCheckMethod(e,t,o,r,n,i,p){let a=!1;if(!(p=p||e.getRect(i)))return!!e.options.drop.checker&&e.options.drop.checker(t,o,a,e,i,r,n);const d=e.options.drop.overlap;if("pointer"===d){const e=getOriginXY(r,n,"drag"),o=pointerUtils.getPageXY(t);o.x+=e.x,o.y+=e.y;const i=o.x>p.left&&o.x<p.right,d=o.y>p.top&&o.y<p.bottom;a=i&&d}const c=r.getRect(n);if(c&&"center"===d){const e=c.left+c.width/2,t=c.top+c.height/2;a=e>=p.left&&e<=p.right&&t>=p.top&&t<=p.bottom}if(c&&is.number(d)){a=Math.max(0,Math.min(p.right,c.right)-Math.max(p.left,c.left))*Math.max(0,Math.min(p.bottom,c.bottom)-Math.max(p.top,c.top))/(c.width*c.height)>=d}return e.options.drop.checker&&(a=e.options.drop.checker(t,o,a,e,i,r,n)),a}const drop={id:"actions/drop",install:install,listeners:{"interactions:before-action-start"(e){let{interaction:t}=e;"drag"===t.prepared.name&&(t.dropState={cur:{dropzone:null,element:null},prev:{dropzone:null,element:null},rejected:null,events:null,activeDrops:[]})},"interactions:after-action-start"(e,t){let{interaction:o,event:r,iEvent:n}=e;if("drag"!==o.prepared.name)return;const i=o.dropState;i.activeDrops=[],i.events={},i.activeDrops=getActiveDrops(t,o.element),i.events=getDropEvents(o,r,n),i.events.activate&&(fireActivationEvents(i.activeDrops,i.events.activate),t.fire("actions/drop:start",{interaction:o,dragEvent:n}))},"interactions:action-move":onEventCreated,"interactions:after-action-move"(e,t){let{interaction:o,iEvent:r}=e;if("drag"!==o.prepared.name)return;const n=o.dropState;fireDropEvents(o,n.events),t.fire("actions/drop:move",{interaction:o,dragEvent:r}),n.events={}},"interactions:action-end"(e,t){if("drag"!==e.interaction.prepared.name)return;const{interaction:o,iEvent:r}=e;onEventCreated(e,t),fireDropEvents(o,o.dropState.events),t.fire("actions/drop:end",{interaction:o,dragEvent:r})},"interactions:stop"(e){let{interaction:t}=e;if("drag"!==t.prepared.name)return;const{dropState:o}=t;o&&(o.activeDrops=null,o.events=null,o.cur.dropzone=null,o.cur.element=null,o.prev.dropzone=null,o.prev.element=null,o.rejected=!1)}},getActiveDrops:getActiveDrops,getDrop:getDrop,getDropEvents:getDropEvents,fireDropEvents:fireDropEvents,filterEventType(e){return 0===e.search("drag")||0===e.search("drop")},defaults:{enabled:!1,accept:null,overlap:"pointer"}};export{drop as default};
//# sourceMappingURL=plugin.prod.js.map
