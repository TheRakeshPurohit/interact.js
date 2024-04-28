/* interact.js 1.10.27 | https://raw.github.com/taye/interact.js/main/LICENSE */

import extend from"../../utils/extend.prod.js";import is from"../../utils/is.prod.js";import{makeModifier}from"../base.prod.js";import{snap}from"./pointer.prod.js";import"../Modification.prod.js";import"../../utils/clone.prod.js";import"../../utils/rect.prod.js";import"../../utils/getOriginXY.prod.js";import"../../utils/hypot.prod.js";function start(t){const{state:s,edges:e}=t,{options:o}=s;if(!e)return null;t.state={options:{targets:null,relativePoints:[{x:e.left?0:1,y:e.top?0:1}],offset:o.offset||"self",origin:{x:0,y:0},range:o.range}},s.targetFields=s.targetFields||[["width","height"],["x","y"]],snap.start(t),s.offsets=t.state.offsets,t.state=s}function set(t){const{interaction:s,state:e,coords:o}=t,{options:i,offsets:r}=e,n={x:o.x-r[0].x,y:o.y-r[0].y};e.options=extend({},i),e.options.targets=[];for(const t of i.targets||[]){let o;if(o=is.func(t)?t(n.x,n.y,s):t,o){for(const[t,s]of e.targetFields)if(t in o||s in o){o.x=o[t],o.y=o[s];break}e.options.targets.push(o)}}const a=snap.set(t);return e.options=i,a}const defaults={range:1/0,targets:null,offset:null,endOnly:!1,enabled:!1},snapSize={start:start,set:set,defaults:defaults};var snapSize$1=makeModifier(snapSize,"snapSize");export{snapSize$1 as default,snapSize};
//# sourceMappingURL=size.prod.js.map