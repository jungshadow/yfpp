/*!

 handlebars v2.0.0

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* jshint ignore:start */
!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.Handlebars=t.Handlebars||e()}(this,function(){var t=function(){"use strict";function t(t){this.string=t}var e;return t.prototype.toString=function(){return""+this.string},e=t}(),e=function(t){"use strict";function e(t){return h[t]}function s(t){for(var e=1;e<arguments.length;e++)for(var s in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],s)&&(t[s]=arguments[e][s]);return t}function i(t){return t instanceof o?t.toString():null==t?"":t?(t=""+t,l.test(t)?t.replace(p,e):t):t+""}function n(t){return t||0===t?f(t)&&0===t.length?!0:!1:!0}function r(t,e){return(t?t+".":"")+e}var a={},o=t,h={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},p=/[&<>"'`]/g,l=/[&<>"'`]/;a.extend=s;var c=Object.prototype.toString;a.toString=c;var u=function(t){return"function"==typeof t};u(/x/)&&(u=function(t){return"function"==typeof t&&"[object Function]"===c.call(t)});var u;a.isFunction=u;var f=Array.isArray||function(t){return t&&"object"==typeof t?"[object Array]"===c.call(t):!1};return a.isArray=f,a.escapeExpression=i,a.isEmpty=n,a.appendContextPath=r,a}(t),s=function(){"use strict";function t(t,e){var i;e&&e.firstLine&&(i=e.firstLine,t+=" - "+i+":"+e.firstColumn);for(var n=Error.prototype.constructor.call(this,t),r=0;r<s.length;r++)this[s[r]]=n[s[r]];i&&(this.lineNumber=i,this.column=e.firstColumn)}var e,s=["description","fileName","lineNumber","message","name","number","stack"];return t.prototype=new Error,e=t}(),i=function(t,e){"use strict";function s(t,e){this.helpers=t||{},this.partials=e||{},i(this)}function i(t){t.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new a("Missing helper: '"+arguments[arguments.length-1].name+"'")}),t.registerHelper("blockHelperMissing",function(e,s){var i=s.inverse,n=s.fn;if(e===!0)return n(this);if(e===!1||null==e)return i(this);if(l(e))return e.length>0?(s.ids&&(s.ids=[s.name]),t.helpers.each(e,s)):i(this);if(s.data&&s.ids){var a=g(s.data);a.contextPath=r.appendContextPath(s.data.contextPath,s.name),s={data:a}}return n(e,s)}),t.registerHelper("each",function(t,e){if(!e)throw new a("Must pass iterator to #each");var s=e.fn,i=e.inverse,n=0,o="",h,p;if(e.data&&e.ids&&(p=r.appendContextPath(e.data.contextPath,e.ids[0])+"."),c(t)&&(t=t.call(this)),e.data&&(h=g(e.data)),t&&"object"==typeof t)if(l(t))for(var u=t.length;u>n;n++)h&&(h.index=n,h.first=0===n,h.last=n===t.length-1,p&&(h.contextPath=p+n)),o+=s(t[n],{data:h});else for(var f in t)t.hasOwnProperty(f)&&(h&&(h.key=f,h.index=n,h.first=0===n,p&&(h.contextPath=p+f)),o+=s(t[f],{data:h}),n++);return 0===n&&(o=i(this)),o}),t.registerHelper("if",function(t,e){return c(t)&&(t=t.call(this)),!e.hash.includeZero&&!t||r.isEmpty(t)?e.inverse(this):e.fn(this)}),t.registerHelper("unless",function(e,s){return t.helpers["if"].call(this,e,{fn:s.inverse,inverse:s.fn,hash:s.hash})}),t.registerHelper("with",function(t,e){c(t)&&(t=t.call(this));var s=e.fn;if(r.isEmpty(t))return e.inverse(this);if(e.data&&e.ids){var i=g(e.data);i.contextPath=r.appendContextPath(e.data.contextPath,e.ids[0]),e={data:i}}return s(t,e)}),t.registerHelper("log",function(e,s){var i=s.data&&null!=s.data.level?parseInt(s.data.level,10):1;t.log(i,e)}),t.registerHelper("lookup",function(t,e){return t&&t[e]})}var n={},r=t,a=e,o="2.0.0";n.VERSION=o;var h=6;n.COMPILER_REVISION=h;var p={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};n.REVISION_CHANGES=p;var l=r.isArray,c=r.isFunction,u=r.toString,f="[object Object]";n.HandlebarsEnvironment=s,s.prototype={constructor:s,logger:d,log:m,registerHelper:function(t,e){if(u.call(t)===f){if(e)throw new a("Arg not supported with multiple helpers");r.extend(this.helpers,t)}else this.helpers[t]=e},unregisterHelper:function(t){delete this.helpers[t]},registerPartial:function(t,e){u.call(t)===f?r.extend(this.partials,t):this.partials[t]=e},unregisterPartial:function(t){delete this.partials[t]}};var d={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(t,e){if(d.level<=t){var s=d.methodMap[t];"undefined"!=typeof console&&console[s]&&console[s].call(console,e)}}};n.logger=d;var m=d.log;n.log=m;var g=function(t){var e=r.extend({},t);return e._parent=t,e};return n.createFrame=g,n}(e,s),n=function(t,e,s){"use strict";function i(t){var e=t&&t[0]||1,s=u;if(e!==s){if(s>e){var i=f[s],n=f[e];throw new c("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+i+") or downgrade your runtime to an older version ("+n+").")}throw new c("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+t[1]+").")}}function n(t,e){if(!e)throw new c("No environment passed to template");if(!t||!t.main)throw new c("Unknown template object: "+typeof t);e.VM.checkRevision(t.compiler);var s=function(s,i,n,r,a,o,h,p,u){a&&(r=l.extend({},r,a));var f=e.VM.invokePartial.call(this,s,n,r,o,h,p,u);if(null==f&&e.compile){var d={helpers:o,partials:h,data:p,depths:u};h[n]=e.compile(s,{data:void 0!==p,compat:t.compat},e),f=h[n](r,d)}if(null!=f){if(i){for(var m=f.split("\n"),g=0,k=m.length;k>g&&(m[g]||g+1!==k);g++)m[g]=i+m[g];f=m.join("\n")}return f}throw new c("The partial "+n+" could not be compiled when running in runtime-only mode")},i={lookup:function(t,e){for(var s=t.length,i=0;s>i;i++)if(t[i]&&null!=t[i][e])return t[i][e]},lambda:function(t,e){return"function"==typeof t?t.call(e):t},escapeExpression:l.escapeExpression,invokePartial:s,fn:function(e){return t[e]},programs:[],program:function(t,e,s){var i=this.programs[t],n=this.fn(t);return e||s?i=r(this,t,n,e,s):i||(i=this.programs[t]=r(this,t,n)),i},data:function(t,e){for(;t&&e--;)t=t._parent;return t},merge:function(t,e){var s=t||e;return t&&e&&t!==e&&(s=l.extend({},e,t)),s},noop:e.VM.noop,compilerInfo:t.compiler},n=function(e,s){s=s||{};var r=s.data;n._setup(s),!s.partial&&t.useData&&(r=h(e,r));var a;return t.useDepths&&(a=s.depths?[e].concat(s.depths):[e]),t.main.call(i,e,i.helpers,i.partials,r,a)};return n.isTop=!0,n._setup=function(s){s.partial?(i.helpers=s.helpers,i.partials=s.partials):(i.helpers=i.merge(s.helpers,e.helpers),t.usePartial&&(i.partials=i.merge(s.partials,e.partials)))},n._child=function(e,s,n){if(t.useDepths&&!n)throw new c("must pass parent depths");return r(i,e,t[e],s,n)},n}function r(t,e,s,i,n){var r=function(e,r){return r=r||{},s.call(t,e,t.helpers,t.partials,r.data||i,n&&[e].concat(n))};return r.program=e,r.depth=n?n.length:0,r}function a(t,e,s,i,n,r,a){var o={partial:!0,helpers:i,partials:n,data:r,depths:a};if(void 0===t)throw new c("The partial "+e+" could not be found");return t instanceof Function?t(s,o):void 0}function o(){return""}function h(t,e){return e&&"root"in e||(e=e?d(e):{},e.root=t),e}var p={},l=t,c=e,u=s.COMPILER_REVISION,f=s.REVISION_CHANGES,d=s.createFrame;return p.checkRevision=i,p.template=n,p.program=r,p.invokePartial=a,p.noop=o,p}(e,s,i),r=function(t,e,s,i,n){"use strict";var r,a=t,o=e,h=s,p=i,l=n,c=function(){var t=new a.HandlebarsEnvironment;return p.extend(t,a),t.SafeString=o,t.Exception=h,t.Utils=p,t.escapeExpression=p.escapeExpression,t.VM=l,t.template=function(e){return l.template(e,t)},t},u=c();return u.create=c,u["default"]=u,r=u}(i,t,s,e,n),a=function(t){"use strict";function e(t){t=t||{},this.firstLine=t.first_line,this.firstColumn=t.first_column,this.lastColumn=t.last_column,this.lastLine=t.last_line}var s,i=t,n={ProgramNode:function(t,s,i){e.call(this,i),this.type="program",this.statements=t,this.strip=s},MustacheNode:function(t,s,i,r,a){if(e.call(this,a),this.type="mustache",this.strip=r,null!=i&&i.charAt){var o=i.charAt(3)||i.charAt(2);this.escaped="{"!==o&&"&"!==o}else this.escaped=!!i;this.sexpr=t instanceof n.SexprNode?t:new n.SexprNode(t,s),this.id=this.sexpr.id,this.params=this.sexpr.params,this.hash=this.sexpr.hash,this.eligibleHelper=this.sexpr.eligibleHelper,this.isHelper=this.sexpr.isHelper},SexprNode:function(t,s,i){e.call(this,i),this.type="sexpr",this.hash=s;var n=this.id=t[0],r=this.params=t.slice(1);this.isHelper=!(!r.length&&!s),this.eligibleHelper=this.isHelper||n.isSimple},PartialNode:function(t,s,i,n,r){e.call(this,r),this.type="partial",this.partialName=t,this.context=s,this.hash=i,this.strip=n,this.strip.inlineStandalone=!0},BlockNode:function(t,s,i,n,r){e.call(this,r),this.type="block",this.mustache=t,this.program=s,this.inverse=i,this.strip=n,i&&!s&&(this.isInverse=!0)},RawBlockNode:function(t,s,r,a){if(e.call(this,a),t.sexpr.id.original!==r)throw new i(t.sexpr.id.original+" doesn't match "+r,this);s=new n.ContentNode(s,a),this.type="block",this.mustache=t,this.program=new n.ProgramNode([s],{},a)},ContentNode:function(t,s){e.call(this,s),this.type="content",this.original=this.string=t},HashNode:function(t,s){e.call(this,s),this.type="hash",this.pairs=t},IdNode:function(t,s){e.call(this,s),this.type="ID";for(var n="",r=[],a=0,o="",h=0,p=t.length;p>h;h++){var l=t[h].part;if(n+=(t[h].separator||"")+l,".."===l||"."===l||"this"===l){if(r.length>0)throw new i("Invalid path: "+n,this);".."===l?(a++,o+="../"):this.isScoped=!0}else r.push(l)}this.original=n,this.parts=r,this.string=r.join("."),this.depth=a,this.idName=o+this.string,this.isSimple=1===t.length&&!this.isScoped&&0===a,this.stringModeValue=this.string},PartialNameNode:function(t,s){e.call(this,s),this.type="PARTIAL_NAME",this.name=t.original},DataNode:function(t,s){e.call(this,s),this.type="DATA",this.id=t,this.stringModeValue=t.stringModeValue,this.idName="@"+t.stringModeValue},StringNode:function(t,s){e.call(this,s),this.type="STRING",this.original=this.string=this.stringModeValue=t},NumberNode:function(t,s){e.call(this,s),this.type="NUMBER",this.original=this.number=t,this.stringModeValue=Number(t)},BooleanNode:function(t,s){e.call(this,s),this.type="BOOLEAN",this.bool=t,this.stringModeValue="true"===t},CommentNode:function(t,s){e.call(this,s),this.type="comment",this.comment=t,this.strip={inlineStandalone:!0}}};return s=n}(s),o=function(){"use strict";var t,e=function(){function t(){this.yy={}}var e={trace:function i(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,CONTENT:12,COMMENT:13,openRawBlock:14,END_RAW_BLOCK:15,OPEN_RAW_BLOCK:16,sexpr:17,CLOSE_RAW_BLOCK:18,openBlock:19,block_option0:20,closeBlock:21,openInverse:22,block_option1:23,OPEN_BLOCK:24,CLOSE:25,OPEN_INVERSE:26,inverseAndProgram:27,INVERSE:28,OPEN_ENDBLOCK:29,path:30,OPEN:31,OPEN_UNESCAPED:32,CLOSE_UNESCAPED:33,OPEN_PARTIAL:34,partialName:35,param:36,partial_option0:37,partial_option1:38,sexpr_repetition0:39,sexpr_option0:40,dataName:41,STRING:42,NUMBER:43,BOOLEAN:44,OPEN_SEXPR:45,CLOSE_SEXPR:46,hash:47,hash_repetition_plus0:48,hashSegment:49,ID:50,EQUALS:51,DATA:52,pathSegments:53,SEP:54,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",12:"CONTENT",13:"COMMENT",15:"END_RAW_BLOCK",16:"OPEN_RAW_BLOCK",18:"CLOSE_RAW_BLOCK",24:"OPEN_BLOCK",25:"CLOSE",26:"OPEN_INVERSE",28:"INVERSE",29:"OPEN_ENDBLOCK",31:"OPEN",32:"OPEN_UNESCAPED",33:"CLOSE_UNESCAPED",34:"OPEN_PARTIAL",42:"STRING",43:"NUMBER",44:"BOOLEAN",45:"OPEN_SEXPR",46:"CLOSE_SEXPR",50:"ID",51:"EQUALS",52:"DATA",54:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[10,3],[14,3],[9,4],[9,4],[19,3],[22,3],[27,2],[21,3],[8,3],[8,3],[11,5],[11,4],[17,3],[17,1],[36,1],[36,1],[36,1],[36,1],[36,1],[36,3],[47,1],[49,3],[35,1],[35,1],[35,1],[41,2],[30,1],[53,3],[53,1],[6,0],[6,2],[20,0],[20,1],[23,0],[23,1],[37,0],[37,1],[38,0],[38,1],[39,0],[39,2],[40,0],[40,1],[48,1],[48,2]],performAction:function n(t,e,s,i,r,a,o){var h=a.length-1;switch(r){case 1:return i.prepareProgram(a[h-1].statements,!0),a[h-1];break;case 2:this.$=new i.ProgramNode(i.prepareProgram(a[h]),{},this._$);break;case 3:this.$=a[h];break;case 4:this.$=a[h];break;case 5:this.$=a[h];break;case 6:this.$=a[h];break;case 7:this.$=new i.ContentNode(a[h],this._$);break;case 8:this.$=new i.CommentNode(a[h],this._$);break;case 9:this.$=new i.RawBlockNode(a[h-2],a[h-1],a[h],this._$);break;case 10:this.$=new i.MustacheNode(a[h-1],null,"","",this._$);break;case 11:this.$=i.prepareBlock(a[h-3],a[h-2],a[h-1],a[h],!1,this._$);break;case 12:this.$=i.prepareBlock(a[h-3],a[h-2],a[h-1],a[h],!0,this._$);break;case 13:this.$=new i.MustacheNode(a[h-1],null,a[h-2],i.stripFlags(a[h-2],a[h]),this._$);break;case 14:this.$=new i.MustacheNode(a[h-1],null,a[h-2],i.stripFlags(a[h-2],a[h]),this._$);break;case 15:this.$={strip:i.stripFlags(a[h-1],a[h-1]),program:a[h]};break;case 16:this.$={path:a[h-1],strip:i.stripFlags(a[h-2],a[h])};break;case 17:this.$=new i.MustacheNode(a[h-1],null,a[h-2],i.stripFlags(a[h-2],a[h]),this._$);break;case 18:this.$=new i.MustacheNode(a[h-1],null,a[h-2],i.stripFlags(a[h-2],a[h]),this._$);break;case 19:this.$=new i.PartialNode(a[h-3],a[h-2],a[h-1],i.stripFlags(a[h-4],a[h]),this._$);break;case 20:this.$=new i.PartialNode(a[h-2],void 0,a[h-1],i.stripFlags(a[h-3],a[h]),this._$);break;case 21:this.$=new i.SexprNode([a[h-2]].concat(a[h-1]),a[h],this._$);break;case 22:this.$=new i.SexprNode([a[h]],null,this._$);break;case 23:this.$=a[h];break;case 24:this.$=new i.StringNode(a[h],this._$);break;case 25:this.$=new i.NumberNode(a[h],this._$);break;case 26:this.$=new i.BooleanNode(a[h],this._$);break;case 27:this.$=a[h];break;case 28:a[h-1].isHelper=!0,this.$=a[h-1];break;case 29:this.$=new i.HashNode(a[h],this._$);break;case 30:this.$=[a[h-2],a[h]];break;case 31:this.$=new i.PartialNameNode(a[h],this._$);break;case 32:this.$=new i.PartialNameNode(new i.StringNode(a[h],this._$),this._$);break;case 33:this.$=new i.PartialNameNode(new i.NumberNode(a[h],this._$));break;case 34:this.$=new i.DataNode(a[h],this._$);break;case 35:this.$=new i.IdNode(a[h],this._$);break;case 36:a[h-2].push({part:a[h],separator:a[h-1]}),this.$=a[h-2];break;case 37:this.$=[{part:a[h]}];break;case 38:this.$=[];break;case 39:a[h-1].push(a[h]);break;case 48:this.$=[];break;case 49:a[h-1].push(a[h]);break;case 52:this.$=[a[h]];break;case 53:a[h-1].push(a[h])}},table:[{3:1,4:2,5:[2,38],6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],31:[2,38],32:[2,38],34:[2,38]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:[1,10],13:[1,11],14:16,16:[1,20],19:14,22:15,24:[1,18],26:[1,19],28:[2,2],29:[2,2],31:[1,12],32:[1,13],34:[1,17]},{1:[2,1]},{5:[2,39],12:[2,39],13:[2,39],16:[2,39],24:[2,39],26:[2,39],28:[2,39],29:[2,39],31:[2,39],32:[2,39],34:[2,39]},{5:[2,3],12:[2,3],13:[2,3],16:[2,3],24:[2,3],26:[2,3],28:[2,3],29:[2,3],31:[2,3],32:[2,3],34:[2,3]},{5:[2,4],12:[2,4],13:[2,4],16:[2,4],24:[2,4],26:[2,4],28:[2,4],29:[2,4],31:[2,4],32:[2,4],34:[2,4]},{5:[2,5],12:[2,5],13:[2,5],16:[2,5],24:[2,5],26:[2,5],28:[2,5],29:[2,5],31:[2,5],32:[2,5],34:[2,5]},{5:[2,6],12:[2,6],13:[2,6],16:[2,6],24:[2,6],26:[2,6],28:[2,6],29:[2,6],31:[2,6],32:[2,6],34:[2,6]},{5:[2,7],12:[2,7],13:[2,7],16:[2,7],24:[2,7],26:[2,7],28:[2,7],29:[2,7],31:[2,7],32:[2,7],34:[2,7]},{5:[2,8],12:[2,8],13:[2,8],16:[2,8],24:[2,8],26:[2,8],28:[2,8],29:[2,8],31:[2,8],32:[2,8],34:[2,8]},{17:21,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:27,30:22,41:23,50:[1,26],52:[1,25],53:24},{4:28,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],28:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{4:29,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],28:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{12:[1,30]},{30:32,35:31,42:[1,33],43:[1,34],50:[1,26],53:24},{17:35,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:36,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:37,30:22,41:23,50:[1,26],52:[1,25],53:24},{25:[1,38]},{18:[2,48],25:[2,48],33:[2,48],39:39,42:[2,48],43:[2,48],44:[2,48],45:[2,48],46:[2,48],50:[2,48],52:[2,48]},{18:[2,22],25:[2,22],33:[2,22],46:[2,22]},{18:[2,35],25:[2,35],33:[2,35],42:[2,35],43:[2,35],44:[2,35],45:[2,35],46:[2,35],50:[2,35],52:[2,35],54:[1,40]},{30:41,50:[1,26],53:24},{18:[2,37],25:[2,37],33:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],50:[2,37],52:[2,37],54:[2,37]},{33:[1,42]},{20:43,27:44,28:[1,45],29:[2,40]},{23:46,27:47,28:[1,45],29:[2,42]},{15:[1,48]},{25:[2,46],30:51,36:49,38:50,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],47:57,48:58,49:60,50:[1,59],52:[1,25],53:24},{25:[2,31],42:[2,31],43:[2,31],44:[2,31],45:[2,31],50:[2,31],52:[2,31]},{25:[2,32],42:[2,32],43:[2,32],44:[2,32],45:[2,32],50:[2,32],52:[2,32]},{25:[2,33],42:[2,33],43:[2,33],44:[2,33],45:[2,33],50:[2,33],52:[2,33]},{25:[1,61]},{25:[1,62]},{18:[1,63]},{5:[2,17],12:[2,17],13:[2,17],16:[2,17],24:[2,17],26:[2,17],28:[2,17],29:[2,17],31:[2,17],32:[2,17],34:[2,17]},{18:[2,50],25:[2,50],30:51,33:[2,50],36:65,40:64,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],46:[2,50],47:66,48:58,49:60,50:[1,59],52:[1,25],53:24},{50:[1,67]},{18:[2,34],25:[2,34],33:[2,34],42:[2,34],43:[2,34],44:[2,34],45:[2,34],46:[2,34],50:[2,34],52:[2,34]},{5:[2,18],12:[2,18],13:[2,18],16:[2,18],24:[2,18],26:[2,18],28:[2,18],29:[2,18],31:[2,18],32:[2,18],34:[2,18]},{21:68,29:[1,69]},{29:[2,41]},{4:70,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{21:71,29:[1,69]},{29:[2,43]},{5:[2,9],12:[2,9],13:[2,9],16:[2,9],24:[2,9],26:[2,9],28:[2,9],29:[2,9],31:[2,9],32:[2,9],34:[2,9]},{25:[2,44],37:72,47:73,48:58,49:60,50:[1,74]},{25:[1,75]},{18:[2,23],25:[2,23],33:[2,23],42:[2,23],43:[2,23],44:[2,23],45:[2,23],46:[2,23],50:[2,23],52:[2,23]},{18:[2,24],25:[2,24],33:[2,24],42:[2,24],43:[2,24],44:[2,24],45:[2,24],46:[2,24],50:[2,24],52:[2,24]},{18:[2,25],25:[2,25],33:[2,25],42:[2,25],43:[2,25],44:[2,25],45:[2,25],46:[2,25],50:[2,25],52:[2,25]},{18:[2,26],25:[2,26],33:[2,26],42:[2,26],43:[2,26],44:[2,26],45:[2,26],46:[2,26],50:[2,26],52:[2,26]},{18:[2,27],25:[2,27],33:[2,27],42:[2,27],43:[2,27],44:[2,27],45:[2,27],46:[2,27],50:[2,27],52:[2,27]},{17:76,30:22,41:23,50:[1,26],52:[1,25],53:24},{25:[2,47]},{18:[2,29],25:[2,29],33:[2,29],46:[2,29],49:77,50:[1,74]},{18:[2,37],25:[2,37],33:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],50:[2,37],51:[1,78],52:[2,37],54:[2,37]},{18:[2,52],25:[2,52],33:[2,52],46:[2,52],50:[2,52]},{12:[2,13],13:[2,13],16:[2,13],24:[2,13],26:[2,13],28:[2,13],29:[2,13],31:[2,13],32:[2,13],34:[2,13]},{12:[2,14],13:[2,14],16:[2,14],24:[2,14],26:[2,14],28:[2,14],29:[2,14],31:[2,14],32:[2,14],34:[2,14]},{12:[2,10]},{18:[2,21],25:[2,21],33:[2,21],46:[2,21]},{18:[2,49],25:[2,49],33:[2,49],42:[2,49],43:[2,49],44:[2,49],45:[2,49],46:[2,49],50:[2,49],52:[2,49]},{18:[2,51],25:[2,51],33:[2,51],46:[2,51]},{18:[2,36],25:[2,36],33:[2,36],42:[2,36],43:[2,36],44:[2,36],45:[2,36],46:[2,36],50:[2,36],52:[2,36],54:[2,36]},{5:[2,11],12:[2,11],13:[2,11],16:[2,11],24:[2,11],26:[2,11],28:[2,11],29:[2,11],31:[2,11],32:[2,11],34:[2,11]},{30:79,50:[1,26],53:24},{29:[2,15]},{5:[2,12],12:[2,12],13:[2,12],16:[2,12],24:[2,12],26:[2,12],28:[2,12],29:[2,12],31:[2,12],32:[2,12],34:[2,12]},{25:[1,80]},{25:[2,45]},{51:[1,78]},{5:[2,20],12:[2,20],13:[2,20],16:[2,20],24:[2,20],26:[2,20],28:[2,20],29:[2,20],31:[2,20],32:[2,20],34:[2,20]},{46:[1,81]},{18:[2,53],25:[2,53],33:[2,53],46:[2,53],50:[2,53]},{30:51,36:82,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],50:[1,26],52:[1,25],53:24},{25:[1,83]},{5:[2,19],12:[2,19],13:[2,19],16:[2,19],24:[2,19],26:[2,19],28:[2,19],29:[2,19],31:[2,19],32:[2,19],34:[2,19]},{18:[2,28],25:[2,28],33:[2,28],42:[2,28],43:[2,28],44:[2,28],45:[2,28],46:[2,28],50:[2,28],52:[2,28]},{18:[2,30],25:[2,30],33:[2,30],46:[2,30],50:[2,30]},{5:[2,16],12:[2,16],13:[2,16],16:[2,16],24:[2,16],26:[2,16],28:[2,16],29:[2,16],31:[2,16],32:[2,16],34:[2,16]}],defaultActions:{4:[2,1],44:[2,41],47:[2,43],57:[2,47],63:[2,10],70:[2,15],73:[2,45]},parseError:function r(t,e){throw new Error(t)},parse:function a(t){function e(t){n.length=n.length-2*t,r.length=r.length-t,a.length=a.length-t}function s(){var t;return t=i.lexer.lex()||1,"number"!=typeof t&&(t=i.symbols_[t]||t),t}var i=this,n=[0],r=[null],a=[],o=this.table,h="",p=0,l=0,c=0,u=2,f=1;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var d=this.lexer.yylloc;a.push(d);var m=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var g,k,v,y,S,b,x={},_,N,P,w;;){if(v=n[n.length-1],this.defaultActions[v]?y=this.defaultActions[v]:((null===g||"undefined"==typeof g)&&(g=s()),y=o[v]&&o[v][g]),"undefined"==typeof y||!y.length||!y[0]){var E="";if(!c){w=[];for(_ in o[v])this.terminals_[_]&&_>2&&w.push("'"+this.terminals_[_]+"'");E=this.lexer.showPosition?"Parse error on line "+(p+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+w.join(", ")+", got '"+(this.terminals_[g]||g)+"'":"Parse error on line "+(p+1)+": Unexpected "+(1==g?"end of input":"'"+(this.terminals_[g]||g)+"'"),this.parseError(E,{text:this.lexer.match,token:this.terminals_[g]||g,line:this.lexer.yylineno,loc:d,expected:w})}}if(y[0]instanceof Array&&y.length>1)throw new Error("Parse Error: multiple actions possible at state: "+v+", token: "+g);switch(y[0]){case 1:n.push(g),r.push(this.lexer.yytext),a.push(this.lexer.yylloc),n.push(y[1]),g=null,k?(g=k,k=null):(l=this.lexer.yyleng,h=this.lexer.yytext,p=this.lexer.yylineno,d=this.lexer.yylloc,c>0&&c--);break;case 2:if(N=this.productions_[y[1]][1],x.$=r[r.length-N],x._$={first_line:a[a.length-(N||1)].first_line,last_line:a[a.length-1].last_line,first_column:a[a.length-(N||1)].first_column,last_column:a[a.length-1].last_column},m&&(x._$.range=[a[a.length-(N||1)].range[0],a[a.length-1].range[1]]),b=this.performAction.call(x,h,l,p,this.yy,y[1],r,a),"undefined"!=typeof b)return b;N&&(n=n.slice(0,-1*N*2),r=r.slice(0,-1*N),a=a.slice(0,-1*N)),n.push(this.productions_[y[1]][0]),r.push(x.$),a.push(x._$),P=o[n[n.length-2]][n[n.length-1]],n.push(P);break;case 3:return!0}}return!0}},s=function(){var t={EOF:1,parseError:function e(t,s){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,s)},setInput:function(t){return this._input=t,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var e=t.match(/(?:\r\n?|\n).*/g);return e?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,s=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e-1),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),s.length-1&&(this.yylineno-=s.length-1);var n=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:s?(s.length===i.length?this.yylloc.first_column:0)+i[i.length-s.length].length-s[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[n[0],n[0]+this.yyleng-e]),this},more:function(){return this._more=!0,this},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var t,e,s,i,n,r;this._more||(this.yytext="",this.match="");for(var a=this._currentRules(),o=0;o<a.length&&(s=this._input.match(this.rules[a[o]]),!s||e&&!(s[0].length>e[0].length)||(e=s,i=o,this.options.flex));o++);return e?(r=e[0].match(/(?:\r\n?|\n).*/g),r&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],t=this.performAction.call(this,this.yy,this,a[i],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),t?t:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function s(){var t=this.next();return"undefined"!=typeof t?t:this.lex()},begin:function i(t){this.conditionStack.push(t)},popState:function n(){return this.conditionStack.pop()},_currentRules:function r(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function a(t){this.begin(t)}};return t.options={},t.performAction=function o(t,e,s,i){function n(t,s){return e.yytext=e.yytext.substr(t,e.yyleng-s)}var r=i;switch(s){case 0:if("\\\\"===e.yytext.slice(-2)?(n(0,1),this.begin("mu")):"\\"===e.yytext.slice(-1)?(n(0,1),this.begin("emu")):this.begin("mu"),e.yytext)return 12;break;case 1:return 12;break;case 2:return this.popState(),12;break;case 3:return e.yytext=e.yytext.substr(5,e.yyleng-9),this.popState(),15;break;case 4:return 12;break;case 5:return n(0,4),this.popState(),13;break;case 6:return 45;break;case 7:return 46;break;case 8:return 16;break;case 9:return this.popState(),this.begin("raw"),18;break;case 10:return 34;break;case 11:return 24;break;case 12:return 29;break;case 13:return this.popState(),28;break;case 14:return this.popState(),28;break;case 15:return 26;break;case 16:return 26;break;case 17:return 32;break;case 18:return 31;break;case 19:this.popState(),this.begin("com");break;case 20:return n(3,5),this.popState(),13;break;case 21:return 31;break;case 22:return 51;break;case 23:return 50;break;case 24:return 50;break;case 25:return 54;break;case 26:break;case 27:return this.popState(),33;break;case 28:return this.popState(),25;break;case 29:return e.yytext=n(1,2).replace(/\\"/g,'"'),42;break;case 30:return e.yytext=n(1,2).replace(/\\'/g,"'"),42;break;case 31:return 52;break;case 32:return 44;break;case 33:return 44;break;case 34:return 43;break;case 35:return 50;break;case 36:return e.yytext=n(1,2),50;break;case 37:return"INVALID";break;case 38:return 5}},t.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],t.conditions={mu:{rules:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[5],inclusive:!1},raw:{rules:[3,4],inclusive:!1},INITIAL:{rules:[0,1,38],inclusive:!0}},t}();return e.lexer=s,t.prototype=e,e.Parser=t,new t}();return t=e}(),h=function(t){"use strict";function e(t,e){return{left:"~"===t.charAt(2),right:"~"===e.charAt(e.length-3)}}function s(t,e,s,i,h,l){if(t.sexpr.id.original!==i.path.original)throw new p(t.sexpr.id.original+" doesn't match "+i.path.original,t);var c=s&&s.program,u={left:t.strip.left,right:i.strip.right,openStandalone:r(e.statements),closeStandalone:n((c||e).statements)};if(t.strip.right&&a(e.statements,null,!0),c){var f=s.strip;f.left&&o(e.statements,null,!0),f.right&&a(c.statements,null,!0),i.strip.left&&o(c.statements,null,!0),n(e.statements)&&r(c.statements)&&(o(e.statements),a(c.statements))}else i.strip.left&&o(e.statements,null,!0);return h?new this.BlockNode(t,c,e,u,l):new this.BlockNode(t,e,c,u,l)}function i(t,e){for(var s=0,i=t.length;i>s;s++){var h=t[s],p=h.strip;if(p){var l=n(t,s,e,"partial"===h.type),c=r(t,s,e),u=p.openStandalone&&l,f=p.closeStandalone&&c,d=p.inlineStandalone&&l&&c;p.right&&a(t,s,!0),p.left&&o(t,s,!0),d&&(a(t,s),o(t,s)&&"partial"===h.type&&(h.indent=/([ \t]+$)/.exec(t[s-1].original)?RegExp.$1:"")),u&&(a((h.program||h.inverse).statements),o(t,s)),f&&(a(t,s),o((h.inverse||h.program).statements))}}return t}function n(t,e,s){void 0===e&&(e=t.length);var i=t[e-1],n=t[e-2];return i?"content"===i.type?(n||!s?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(i.original):void 0:s}function r(t,e,s){void 0===e&&(e=-1);var i=t[e+1],n=t[e+2];return i?"content"===i.type?(n||!s?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(i.original):void 0:s}function a(t,e,s){var i=t[null==e?0:e+1];if(i&&"content"===i.type&&(s||!i.rightStripped)){var n=i.string;i.string=i.string.replace(s?/^\s+/:/^[ \t]*\r?\n?/,""),i.rightStripped=i.string!==n}}function o(t,e,s){var i=t[null==e?t.length-1:e-1];if(i&&"content"===i.type&&(s||!i.leftStripped)){var n=i.string;return i.string=i.string.replace(s?/\s+$/:/[ \t]+$/,""),i.leftStripped=i.string!==n,i.leftStripped}}var h={},p=t;return h.stripFlags=e,h.prepareBlock=s,h.prepareProgram=i,h}(s),p=function(t,e,s,i){"use strict";function n(t){return t.constructor===o.ProgramNode?t:(a.yy=l,a.parse(t))}var r={},a=t,o=e,h=s,p=i.extend;r.parser=a;var l={};return p(l,h,o),r.parse=n,r}(o,a,h,e),l=function(t,e){"use strict";function s(){}function i(t,e,s){if(null==t||"string"!=typeof t&&t.constructor!==s.AST.ProgramNode)throw new o("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+t);e=e||{},"data"in e||(e.data=!0),e.compat&&(e.useDepths=!0);var i=s.parse(t),n=(new s.Compiler).compile(i,e);return(new s.JavaScriptCompiler).compile(n,e)}function n(t,e,s){function i(){var i=s.parse(t),n=(new s.Compiler).compile(i,e),r=(new s.JavaScriptCompiler).compile(n,e,void 0,!0);return s.template(r)}if(null==t||"string"!=typeof t&&t.constructor!==s.AST.ProgramNode)throw new o("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+t);e=e||{},"data"in e||(e.data=!0),e.compat&&(e.useDepths=!0);var n,r=function(t,e){return n||(n=i()),n.call(this,t,e)};return r._setup=function(t){return n||(n=i()),n._setup(t)},r._child=function(t,e,s){return n||(n=i()),n._child(t,e,s)},r}function r(t,e){if(t===e)return!0;if(h(t)&&h(e)&&t.length===e.length){for(var s=0;s<t.length;s++)if(!r(t[s],e[s]))return!1;return!0}}var a={},o=t,h=e.isArray,p=[].slice;return a.Compiler=s,s.prototype={compiler:s,equals:function(t){var e=this.opcodes.length;if(t.opcodes.length!==e)return!1;for(var s=0;e>s;s++){var i=this.opcodes[s],n=t.opcodes[s];if(i.opcode!==n.opcode||!r(i.args,n.args))return!1}for(e=this.children.length,s=0;e>s;s++)if(!this.children[s].equals(t.children[s]))return!1;return!0},guid:0,compile:function(t,e){this.opcodes=[],this.children=[],this.depths={list:[]},this.options=e,this.stringParams=e.stringParams,this.trackIds=e.trackIds;var s=this.options.knownHelpers;if(this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0,lookup:!0},s)for(var i in s)this.options.knownHelpers[i]=s[i];
return this.accept(t)},accept:function(t){return this[t.type](t)},program:function(t){for(var e=t.statements,s=0,i=e.length;i>s;s++)this.accept(e[s]);return this.isSimple=1===i,this.depths.list=this.depths.list.sort(function(t,e){return t-e}),this},compileProgram:function(t){var e=(new this.compiler).compile(t,this.options),s=this.guid++,i;this.usePartial=this.usePartial||e.usePartial,this.children[s]=e;for(var n=0,r=e.depths.list.length;r>n;n++)i=e.depths.list[n],2>i||this.addDepth(i-1);return s},block:function(t){var e=t.mustache,s=t.program,i=t.inverse;s&&(s=this.compileProgram(s)),i&&(i=this.compileProgram(i));var n=e.sexpr,r=this.classifySexpr(n);"helper"===r?this.helperSexpr(n,s,i):"simple"===r?(this.simpleSexpr(n),this.opcode("pushProgram",s),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("blockValue",n.id.original)):(this.ambiguousSexpr(n,s,i),this.opcode("pushProgram",s),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(t){var e=t.pairs,s,i;for(this.opcode("pushHash"),s=0,i=e.length;i>s;s++)this.pushParam(e[s][1]);for(;s--;)this.opcode("assignToHash",e[s][0]);this.opcode("popHash")},partial:function(t){var e=t.partialName;this.usePartial=!0,t.hash?this.accept(t.hash):this.opcode("push","undefined"),t.context?this.accept(t.context):(this.opcode("getContext",0),this.opcode("pushContext")),this.opcode("invokePartial",e.name,t.indent||""),this.opcode("append")},content:function(t){t.string&&this.opcode("appendContent",t.string)},mustache:function(t){this.sexpr(t.sexpr),this.opcode(t.escaped&&!this.options.noEscape?"appendEscaped":"append")},ambiguousSexpr:function(t,e,s){var i=t.id,n=i.parts[0],r=null!=e||null!=s;this.opcode("getContext",i.depth),this.opcode("pushProgram",e),this.opcode("pushProgram",s),this.ID(i),this.opcode("invokeAmbiguous",n,r)},simpleSexpr:function(t){var e=t.id;"DATA"===e.type?this.DATA(e):e.parts.length?this.ID(e):(this.addDepth(e.depth),this.opcode("getContext",e.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperSexpr:function(t,e,s){var i=this.setupFullMustacheParams(t,e,s),n=t.id,r=n.parts[0];if(this.options.knownHelpers[r])this.opcode("invokeKnownHelper",i.length,r);else{if(this.options.knownHelpersOnly)throw new o("You specified knownHelpersOnly, but used the unknown helper "+r,t);n.falsy=!0,this.ID(n),this.opcode("invokeHelper",i.length,n.original,n.isSimple)}},sexpr:function(t){var e=this.classifySexpr(t);"simple"===e?this.simpleSexpr(t):"helper"===e?this.helperSexpr(t):this.ambiguousSexpr(t)},ID:function(t){this.addDepth(t.depth),this.opcode("getContext",t.depth);var e=t.parts[0];e?this.opcode("lookupOnContext",t.parts,t.falsy,t.isScoped):this.opcode("pushContext")},DATA:function(t){this.options.data=!0,this.opcode("lookupData",t.id.depth,t.id.parts)},STRING:function(t){this.opcode("pushString",t.string)},NUMBER:function(t){this.opcode("pushLiteral",t.number)},BOOLEAN:function(t){this.opcode("pushLiteral",t.bool)},comment:function(){},opcode:function(t){this.opcodes.push({opcode:t,args:p.call(arguments,1)})},addDepth:function(t){0!==t&&(this.depths[t]||(this.depths[t]=!0,this.depths.list.push(t)))},classifySexpr:function(t){var e=t.isHelper,s=t.eligibleHelper,i=this.options;if(s&&!e){var n=t.id.parts[0];i.knownHelpers[n]?e=!0:i.knownHelpersOnly&&(s=!1)}return e?"helper":s?"ambiguous":"simple"},pushParams:function(t){for(var e=0,s=t.length;s>e;e++)this.pushParam(t[e])},pushParam:function(t){this.stringParams?(t.depth&&this.addDepth(t.depth),this.opcode("getContext",t.depth||0),this.opcode("pushStringParam",t.stringModeValue,t.type),"sexpr"===t.type&&this.sexpr(t)):(this.trackIds&&this.opcode("pushId",t.type,t.idName||t.stringModeValue),this.accept(t))},setupFullMustacheParams:function(t,e,s){var i=t.params;return this.pushParams(i),this.opcode("pushProgram",e),this.opcode("pushProgram",s),t.hash?this.hash(t.hash):this.opcode("emptyHash"),i}},a.precompile=i,a.compile=n,a}(s,e),c=function(t,e){"use strict";function s(t){this.value=t}function i(){}var n,r=t.COMPILER_REVISION,a=t.REVISION_CHANGES,o=e;i.prototype={nameLookup:function(t,e){return i.isValidJavaScriptVariableName(e)?t+"."+e:t+"['"+e+"']"},depthedLookup:function(t){return this.aliases.lookup="this.lookup",'lookup(depths, "'+t+'")'},compilerInfo:function(){var t=r,e=a[t];return[t,e]},appendToBuffer:function(t){return this.environment.isSimple?"return "+t+";":{appendToBuffer:!0,content:t,toString:function(){return"buffer += "+t+";"}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(t,e,s,i){this.environment=t,this.options=e,this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!i,this.name=this.environment.name,this.isChild=!!s,this.context=s||{programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.compileChildren(t,e),this.useDepths=this.useDepths||t.depths.list.length||this.options.compat;var n=t.opcodes,r,a,h;for(a=0,h=n.length;h>a;a++)r=n[a],this[r.opcode].apply(this,r.args);if(this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new o("Compile completed with content left on stack");var p=this.createFunctionContext(i);if(this.isChild)return p;var l={compiler:this.compilerInfo(),main:p},c=this.context.programs;for(a=0,h=c.length;h>a;a++)c[a]&&(l[a]=c[a]);return this.environment.usePartial&&(l.usePartial=!0),this.options.data&&(l.useData=!0),this.useDepths&&(l.useDepths=!0),this.options.compat&&(l.compat=!0),i||(l.compiler=JSON.stringify(l.compiler),l=this.objectLiteral(l)),l},preamble:function(){this.lastContext=0,this.source=[]},createFunctionContext:function(t){var e="",s=this.stackVars.concat(this.registers.list);s.length>0&&(e+=", "+s.join(", "));for(var i in this.aliases)this.aliases.hasOwnProperty(i)&&(e+=", "+i+"="+this.aliases[i]);var n=["depth0","helpers","partials","data"];this.useDepths&&n.push("depths");var r=this.mergeSource(e);return t?(n.push(r),Function.apply(this,n)):"function("+n.join(",")+") {\n  "+r+"}"},mergeSource:function(t){for(var e="",s,i=!this.forceBuffer,n,r=0,a=this.source.length;a>r;r++){var o=this.source[r];o.appendToBuffer?s=s?s+"\n    + "+o.content:o.content:(s&&(e?e+="buffer += "+s+";\n  ":(n=!0,e=s+";\n  "),s=void 0),e+=o+"\n  ",this.environment.isSimple||(i=!1))}return i?(s||!e)&&(e+="return "+(s||'""')+";\n"):(t+=", buffer = "+(n?"":this.initializeBuffer()),e+=s?"return buffer + "+s+";\n":"return buffer;\n"),t&&(e="var "+t.substring(2)+(n?"":";\n  ")+e),e},blockValue:function(t){this.aliases.blockHelperMissing="helpers.blockHelperMissing";var e=[this.contextName(0)];this.setupParams(t,0,e);var s=this.popStack();e.splice(1,0,s),this.push("blockHelperMissing.call("+e.join(", ")+")")},ambiguousBlockValue:function(){this.aliases.blockHelperMissing="helpers.blockHelperMissing";var t=[this.contextName(0)];this.setupParams("",0,t,!0),this.flushInline();var e=this.topStack();t.splice(1,0,e),this.pushSource("if (!"+this.lastHelper+") { "+e+" = blockHelperMissing.call("+t.join(", ")+"); }")},appendContent:function(t){this.pendingContent&&(t=this.pendingContent+t),this.pendingContent=t},append:function(){this.flushInline();var t=this.popStack();this.pushSource("if ("+t+" != null) { "+this.appendToBuffer(t)+" }"),this.environment.isSimple&&this.pushSource("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){this.aliases.escapeExpression="this.escapeExpression",this.pushSource(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(t){this.lastContext=t},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(t,e,s){var i=0,n=t.length;for(s||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(t[i++]));n>i;i++)this.replaceStack(function(s){var n=this.nameLookup(s,t[i],"context");return e?" && "+n:" != null ? "+n+" : "+s})},lookupData:function(t,e){this.pushStackLiteral(t?"this.data(data, "+t+")":"data");for(var s=e.length,i=0;s>i;i++)this.replaceStack(function(t){return" && "+this.nameLookup(t,e[i],"data")})},resolvePossibleLambda:function(){this.aliases.lambda="this.lambda",this.push("lambda("+this.popStack()+", "+this.contextName(0)+")")},pushStringParam:function(t,e){this.pushContext(),this.pushString(e),"sexpr"!==e&&("string"==typeof t?this.pushString(t):this.pushStackLiteral(t))},emptyHash:function(){this.pushStackLiteral("{}"),this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}"))},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var t=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push("{"+t.ids.join(",")+"}"),this.stringParams&&(this.push("{"+t.contexts.join(",")+"}"),this.push("{"+t.types.join(",")+"}")),this.push("{\n    "+t.values.join(",\n    ")+"\n  }")},pushString:function(t){this.pushStackLiteral(this.quotedString(t))},push:function(t){return this.inlineStack.push(t),t},pushLiteral:function(t){this.pushStackLiteral(t)},pushProgram:function(t){this.pushStackLiteral(null!=t?this.programExpression(t):null)},invokeHelper:function(t,e,s){this.aliases.helperMissing="helpers.helperMissing";var i=this.popStack(),n=this.setupHelper(t,e),r=(s?n.name+" || ":"")+i+" || helperMissing";this.push("(("+r+").call("+n.callParams+"))")},invokeKnownHelper:function(t,e){var s=this.setupHelper(t,e);this.push(s.name+".call("+s.callParams+")")},invokeAmbiguous:function(t,e){this.aliases.functionType='"function"',this.aliases.helperMissing="helpers.helperMissing",this.useRegister("helper");var s=this.popStack();this.emptyHash();var i=this.setupHelper(0,t,e),n=this.lastHelper=this.nameLookup("helpers",t,"helper");this.push("((helper = (helper = "+n+" || "+s+") != null ? helper : helperMissing"+(i.paramsInit?"),("+i.paramsInit:"")+"),(typeof helper === functionType ? helper.call("+i.callParams+") : helper))")},invokePartial:function(t,e){var s=[this.nameLookup("partials",t,"partial"),"'"+e+"'","'"+t+"'",this.popStack(),this.popStack(),"helpers","partials"];this.options.data?s.push("data"):this.options.compat&&s.push("undefined"),this.options.compat&&s.push("depths"),this.push("this.invokePartial("+s.join(", ")+")")},assignToHash:function(t){var e=this.popStack(),s,i,n;this.trackIds&&(n=this.popStack()),this.stringParams&&(i=this.popStack(),s=this.popStack());var r=this.hash;s&&r.contexts.push("'"+t+"': "+s),i&&r.types.push("'"+t+"': "+i),n&&r.ids.push("'"+t+"': "+n),r.values.push("'"+t+"': ("+e+")")},pushId:function(t,e){"ID"===t||"DATA"===t?this.pushString(e):this.pushStackLiteral("sexpr"===t?"true":"null")},compiler:i,compileChildren:function(t,e){for(var s=t.children,i,n,r=0,a=s.length;a>r;r++){i=s[r],n=new this.compiler;var o=this.matchExistingProgram(i);null==o?(this.context.programs.push(""),o=this.context.programs.length,i.index=o,i.name="program"+o,this.context.programs[o]=n.compile(i,e,this.context,!this.precompile),this.context.environments[o]=i,this.useDepths=this.useDepths||n.useDepths):(i.index=o,i.name="program"+o)}},matchExistingProgram:function(t){for(var e=0,s=this.context.environments.length;s>e;e++){var i=this.context.environments[e];if(i&&i.equals(t))return e}},programExpression:function(t){var e=this.environment.children[t],s=e.depths.list,i=this.useDepths,n,r=[e.index,"data"];return i&&r.push("depths"),"this.program("+r.join(", ")+")"},useRegister:function(t){this.registers[t]||(this.registers[t]=!0,this.registers.list.push(t))},pushStackLiteral:function(t){return this.push(new s(t))},pushSource:function(t){this.pendingContent&&(this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),this.pendingContent=void 0),t&&this.source.push(t)},pushStack:function(t){this.flushInline();var e=this.incrStack();return this.pushSource(e+" = "+t+";"),this.compileStack.push(e),e},replaceStack:function(t){var e="",i=this.isInline(),n,r,a;if(!this.isInline())throw new o("replaceStack on non-inline");var h=this.popStack(!0);if(h instanceof s)e=n=h.value,a=!0;else{r=!this.stackSlot;var p=r?this.incrStack():this.topStackName();e="("+this.push(p)+" = "+h+")",n=this.topStack()}var l=t.call(this,n);a||this.popStack(),r&&this.stackSlot--,this.push("("+e+l+")")},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var t=this.inlineStack;if(t.length){this.inlineStack=[];for(var e=0,i=t.length;i>e;e++){var n=t[e];n instanceof s?this.compileStack.push(n):this.pushStack(n)}}},isInline:function(){return this.inlineStack.length},popStack:function(t){var e=this.isInline(),i=(e?this.inlineStack:this.compileStack).pop();if(!t&&i instanceof s)return i.value;if(!e){if(!this.stackSlot)throw new o("Invalid stack pop");this.stackSlot--}return i},topStack:function(){var t=this.isInline()?this.inlineStack:this.compileStack,e=t[t.length-1];return e instanceof s?e.value:e},contextName:function(t){return this.useDepths&&t?"depths["+t+"]":"depth"+t},quotedString:function(t){return'"'+t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(t){var e=[];for(var s in t)t.hasOwnProperty(s)&&e.push(this.quotedString(s)+":"+t[s]);return"{"+e.join(",")+"}"},setupHelper:function(t,e,s){var i=[],n=this.setupParams(e,t,i,s),r=this.nameLookup("helpers",e,"helper");return{params:i,paramsInit:n,name:r,callParams:[this.contextName(0)].concat(i).join(", ")}},setupOptions:function(t,e,s){var i={},n=[],r=[],a=[],o,h,p;i.name=this.quotedString(t),i.hash=this.popStack(),this.trackIds&&(i.hashIds=this.popStack()),this.stringParams&&(i.hashTypes=this.popStack(),i.hashContexts=this.popStack()),h=this.popStack(),p=this.popStack(),(p||h)&&(p||(p="this.noop"),h||(h="this.noop"),i.fn=p,i.inverse=h);for(var l=e;l--;)o=this.popStack(),s[l]=o,this.trackIds&&(a[l]=this.popStack()),this.stringParams&&(r[l]=this.popStack(),n[l]=this.popStack());return this.trackIds&&(i.ids="["+a.join(",")+"]"),this.stringParams&&(i.types="["+r.join(",")+"]",i.contexts="["+n.join(",")+"]"),this.options.data&&(i.data="data"),i},setupParams:function(t,e,s,i){var n=this.objectLiteral(this.setupOptions(t,e,s));return i?(this.useRegister("options"),s.push("options"),"options="+n):(s.push(n),"")}};for(var h="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),p=i.RESERVED_WORDS={},l=0,c=h.length;c>l;l++)p[h[l]]=!0;return i.isValidJavaScriptVariableName=function(t){return!i.RESERVED_WORDS[t]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t)},n=i}(i,s),u=function(t,e,s,i,n){"use strict";var r,a=t,o=e,h=s.parser,p=s.parse,l=i.Compiler,c=i.compile,u=i.precompile,f=n,d=a.create,m=function(){var t=d();return t.compile=function(e,s){return c(e,s,t)},t.precompile=function(e,s){return u(e,s,t)},t.AST=o,t.Compiler=l,t.JavaScriptCompiler=f,t.Parser=h,t.parse=p,t};return a=m(),a.create=m,a["default"]=a,r=a}(r,a,p,l,c);return u});
/* jshint ignore:end */
/*!
 * Amplify 1.1.2
 *
 * Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 *
 * http://amplifyjs.com
 */
 /* jshint ignore:start */
(function(e,t){var n=[].slice,r={},i=e.amplify={publish:function(e){if(typeof e!="string")throw new Error("You must provide a valid topic to publish.");var t=n.call(arguments,1),i,s,o,u=0,a;if(!r[e])return!0;i=r[e].slice();for(o=i.length;u<o;u++){s=i[u],a=s.callback.apply(s.context,t);if(a===!1)break}return a!==!1},subscribe:function(e,t,n,i){if(typeof e!="string")throw new Error("You must provide a valid topic to create a subscription.");arguments.length===3&&typeof n=="number"&&(i=n,n=t,t=null),arguments.length===2&&(n=t,t=null),i=i||10;var s=0,o=e.split(/\s/),u=o.length,a;for(;s<u;s++){e=o[s],a=!1,r[e]||(r[e]=[]);var f=r[e].length-1,l={callback:n,context:t,priority:i};for(;f>=0;f--)if(r[e][f].priority<=i){r[e].splice(f+1,0,l),a=!0;break}a||r[e].unshift(l)}return n},unsubscribe:function(e,t,n){if(typeof e!="string")throw new Error("You must provide a valid topic to remove a subscription.");arguments.length===2&&(n=t,t=null);if(!r[e])return;var i=r[e].length,s=0;for(;s<i;s++)r[e][s].callback===n&&(!t||r[e][s].context===t)&&(r[e].splice(s,1),s--,i--)}}})(this),function(e,t){function i(e,i){n.addType(e,function(s,o,u){var a,f,l,c,h=o,p=(new Date).getTime();if(!s){h={},c=[],l=0;try{s=i.length;while(s=i.key(l++))r.test(s)&&(f=JSON.parse(i.getItem(s)),f.expires&&f.expires<=p?c.push(s):h[s.replace(r,"")]=f.data);while(s=c.pop())i.removeItem(s)}catch(d){}return h}s="__amplify__"+s;if(o===t){a=i.getItem(s),f=a?JSON.parse(a):{expires:-1};if(!(f.expires&&f.expires<=p))return f.data;i.removeItem(s)}else if(o===null)i.removeItem(s);else{f=JSON.stringify({data:o,expires:u.expires?p+u.expires:null});try{i.setItem(s,f)}catch(d){n[e]();try{i.setItem(s,f)}catch(d){throw n.error()}}}return h})}var n=e.store=function(e,t,r){var i=n.type;return r&&r.type&&r.type in n.types&&(i=r.type),n.types[i](e,t,r||{})};n.types={},n.type=null,n.addType=function(e,t){n.type||(n.type=e),n.types[e]=t,n[e]=function(t,r,i){return i=i||{},i.type=e,n(t,r,i)}},n.error=function(){return"amplify.store quota exceeded"};var r=/^__amplify__/;for(var s in{localStorage:1,sessionStorage:1})try{window[s].setItem("__amplify__","x"),window[s].removeItem("__amplify__"),i(s,window[s])}catch(o){}if(!n.types.localStorage&&window.globalStorage)try{i("globalStorage",window.globalStorage[window.location.hostname]),n.type==="sessionStorage"&&(n.type="globalStorage")}catch(o){}(function(){if(n.types.localStorage)return;var e=document.createElement("div"),r="amplify";e.style.display="none",document.getElementsByTagName("head")[0].appendChild(e);try{e.addBehavior("#default#userdata"),e.load(r)}catch(i){e.parentNode.removeChild(e);return}n.addType("userData",function(i,s,o){e.load(r);var u,a,f,l,c,h=s,p=(new Date).getTime();if(!i){h={},c=[],l=0;while(u=e.XMLDocument.documentElement.attributes[l++])a=JSON.parse(u.value),a.expires&&a.expires<=p?c.push(u.name):h[u.name]=a.data;while(i=c.pop())e.removeAttribute(i);return e.save(r),h}i=i.replace(/[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-"),i=i.replace(/^-/,"_-");if(s===t){u=e.getAttribute(i),a=u?JSON.parse(u):{expires:-1};if(!(a.expires&&a.expires<=p))return a.data;e.removeAttribute(i)}else s===null?e.removeAttribute(i):(f=e.getAttribute(i),a=JSON.stringify({data:s,expires:o.expires?p+o.expires:null}),e.setAttribute(i,a));try{e.save(r)}catch(d){f===null?e.removeAttribute(i):e.setAttribute(i,f),n.userData();try{e.setAttribute(i,a),e.save(r)}catch(d){throw f===null?e.removeAttribute(i):e.setAttribute(i,f),n.error()}}return h})})(),function(){function i(e){return e===t?t:JSON.parse(JSON.stringify(e))}var e={},r={};n.addType("memory",function(n,s,o){return n?s===t?i(e[n]):(r[n]&&(clearTimeout(r[n]),delete r[n]),s===null?(delete e[n],null):(e[n]=s,o.expires&&(r[n]=setTimeout(function(){delete e[n],delete r[n]},o.expires)),s)):i(e)})}()}(this.amplify=this.amplify||{}),function(e,t){"use strict";function n(){}function r(e){return{}.toString.call(e)==="[object Function]"}function i(e){var t=!1;return setTimeout(function(){t=!0},1),function(){var n=this,r=arguments;t?e.apply(n,r):setTimeout(function(){e.apply(n,r)},1)}}e.request=function(t,s,o){var u=t||{};typeof u=="string"&&(r(s)&&(o=s,s={}),u={resourceId:t,data:s||{},success:o});var a={abort:n},f=e.request.resources[u.resourceId],l=u.success||n,c=u.error||n;u.success=i(function(t,n){n=n||"success",e.publish("request.success",u,t,n),e.publish("request.complete",u,t,n),l(t,n)}),u.error=i(function(t,n){n=n||"error",e.publish("request.error",u,t,n),e.publish("request.complete",u,t,n),c(t,n)});if(!f)throw u.resourceId?"amplify.request: unknown resourceId: "+u.resourceId:"amplify.request: no resourceId provided";if(!e.publish("request.before",u)){u.error(null,"abort");return}return e.request.resources[u.resourceId](u,a),a},e.request.types={},e.request.resources={},e.request.define=function(t,n,r){if(typeof n=="string"){if(!(n in e.request.types))throw"amplify.request.define: unknown type: "+n;r.resourceId=t,e.request.resources[t]=e.request.types[n](r)}else e.request.resources[t]=n}}(amplify),function(e,t,n){"use strict";var r=["status","statusText","responseText","responseXML","readyState"],i=/\{([^\}]+)\}/g;e.request.types.ajax=function(i){return i=t.extend({type:"GET"},i),function(s,o){var u,a,f=i.url,l=o.abort,c=t.extend(!0,{},i,{data:s.data}),h=!1,p={readyState:0,setRequestHeader:function(e,t){return u.setRequestHeader(e,t)},getAllResponseHeaders:function(){return u.getAllResponseHeaders()},getResponseHeader:function(e){return u.getResponseHeader(e)},overrideMimeType:function(e){return u.overrideMimeType(e)},abort:function(){h=!0;try{u.abort()}catch(e){}a(null,"abort")},success:function(e,t){s.success(e,t)},error:function(e,t){s.error(e,t)}};a=function(e,i){t.each(r,function(e,t){try{p[t]=u[t]}catch(n){}}),/OK$/.test(p.statusText)&&(p.statusText="success"),e===n&&(e=null),h&&(i="abort"),/timeout|error|abort/.test(i)?p.error(e,i):p.success(e,i),a=t.noop},e.publish("request.ajax.preprocess",i,s,c,p),t.extend(c,{isJSONP:function(){return/jsonp/gi.test(this.dataType)},cacheURL:function(){if(!this.isJSONP())return this.url;var e="callback";this.hasOwnProperty("jsonp")&&(this.jsonp!==!1?e=this.jsonp:this.hasOwnProperty("jsonpCallback")&&(e=this.jsonpCallback));var t=new RegExp("&?"+e+"=[^&]*&?","gi");return this.url.replace(t,"")},success:function(e,t){a(e,t)},error:function(e,t){a(null,t)},beforeSend:function(t,n){u=t,c=n;var r=i.beforeSend?i.beforeSend.call(this,p,c):!0;return r&&e.publish("request.before.ajax",i,s,c,p)}}),c.cache&&c.isJSONP()&&t.extend(c,{cache:!0}),t.ajax(c),o.abort=function(){p.abort(),l.call(this)}}},e.subscribe("request.ajax.preprocess",function(e,n,r){var s=[],o=r.data;if(typeof o=="string")return;o=t.extend(!0,{},e.data,o),r.url=r.url.replace(i,function(e,t){if(t in o)return s.push(t),o[t]}),t.each(s,function(e,t){delete o[t]}),r.data=o}),e.subscribe("request.ajax.preprocess",function(e,n,r){var i=r.data,s=e.dataMap;if(!s||typeof i=="string")return;t.isFunction(s)?r.data=s(i):(t.each(e.dataMap,function(e,t){e in i&&(i[t]=i[e],delete i[e])}),r.data=i)});var s=e.request.cache={_key:function(e,t,n){function s(){return n.charCodeAt(i++)<<24|n.charCodeAt(i++)<<16|n.charCodeAt(i++)<<8|n.charCodeAt(i++)<<0}n=t+n;var r=n.length,i=0,o=s();while(i<r)o^=s();return"request-"+e+"-"+o},_default:function(){var e={};return function(t,n,r,i){var o=s._key(n.resourceId,r.cacheURL(),r.data),u=t.cache;if(o in e)return i.success(e[o]),!1;var a=i.success;i.success=function(t){e[o]=t,typeof u=="number"&&setTimeout(function(){delete e[o]},u),a.apply(this,arguments)}}}()};e.store&&(t.each(e.store.types,function(t){s[t]=function(n,r,i,o){var u=s._key(r.resourceId,i.cacheURL(),i.data),a=e.store[t](u);if(a)return i.success(a),!1;var f=o.success;o.success=function(r){e.store[t](u,r,{expires:n.cache.expires}),f.apply(this,arguments)}}}),s.persist=s[e.store.type]),e.subscribe("request.before.ajax",function(e){var t=e.cache;if(t)return t=t.type||t,s[t in s?t:"_default"].apply(this,arguments)}),e.request.decoders={jsend:function(e,t,n,r,i){e.status==="success"?r(e.data):e.status==="fail"?i(e.data,"fail"):e.status==="error"?(delete e.status,i(e,"error")):i(null,"error")}},e.subscribe("request.before.ajax",function(n,r,i,s){function f(e,t){o(e,t)}function l(e,t){u(e,t)}var o=s.success,u=s.error,a=t.isFunction(n.decoder)?n.decoder:n.decoder in e.request.decoders?e.request.decoders[n.decoder]:e.request.decoders._default;if(!a)return;s.success=function(e,t){a(e,t,s,f,l)},s.error=function(e,t){a(e,t,s,f,l)}})}(amplify,jQuery)
/* jshint ignore:end */

if (!window.console) {
    // Allow us to use console.log() without breaking everything in old IE
    // From https://stackoverflow.com/questions/8002116/
    var noOp = function(){}; // no-op function
    window.console = {
        log: noOp,
        warn: noOp,
        error: noOp
    };
}


/*
Your Fucking Polling Place
Address Lookup Request Processing JavaScript
by Nick Catalano
www.nickcatalano.com
*/

(function(amplify, $){


    amplify.subscribe("lookupAddress", function(address) {
        var data = {
            'key': 'AIzaSyAnjkErJZeEzUIrr52eqcQuiPfTQxQxsMk',
            'address': address
        };
        var request = $.ajax({
            url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?callback=?',
            type: "GET",
            dataType: 'jsonp',
            data: data
        });
        request.done(function(response) {
            if ('error' in response) {
                amplify.publish("requestFailure", response, address);
            } else {
                amplify.publish("requestSuccess", response, address);
            }
        });
    });

    // Handle successful request responses (aka 200s)
    amplify.subscribe("requestSuccess", function(response, address) {
        console.log("requestSuccess");
        response.result = 'success';
        response.user_address = address;

        amplify.publish("lookupSuccess", response);
    });

    // Handle requests that returned an error
    amplify.subscribe("requestFailure", function(response, address) {
        console.log("requestFailure");
        response.result = 'failure';
        response.reason = response.error.errors[0].reason;
        response.user_address = address;

        amplify.publish("lookupFailure", response);
    });
})(window.amplify, jQuery);


/*
Your Fucking Polling Place
Social JavaScript
by Nick Catalano
www.nickcatalano.com
*/

(function(window, amplify, $){

    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.twttr = (function (d,s,id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
    js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f); } });
    }(document, "script", "twitter-wjs"));

    // Use $.Deferred() to allow extra things to run when Facebook first loads
    // From http://johnkpaul.tumblr.com/post/32087902037/handling-fbasyncinit-use-deferred
    window.fbAsyncInit = function(){
        FB.init({
          appId      : '382719335136154',
          xfbml      : true,
          version    : 'v2.1'
        });
        window.fbAsyncInit.fbLoaded.resolve();
    };
    window.fbAsyncInit.fbLoaded = $.Deferred();



    amplify.subscribe("resultsRendered", function() {
        if ('widgets' in window.twttr) {
            window.twttr.widgets.load();
        }
    });

    amplify.subscribe("postToFacebook", function(polling_info){
        var obj = {
            method: 'feed',
            link: 'http://yourfuckingpollingplace.com/?utm_source=facebook&utm_medium=social&utm_campaign=YFPP_2014_USER_' + polling_info.state,
            picture: 'http://yourfuckingpollingplace.com/images/yfpp-fbwide.jpg??20141128',
            name: 'I Vote At ' + polling_info.location,
            caption: "YourFuckingPollingPlace.com",
            description: 'I vote at ' + polling_info.location + ' in ' + polling_info.city + ' ' + polling_info.state + ', where the fuck do you vote? Visit YourFuckingPollingPlace.com to find out'
        };
        function callback(response) {
            amplify.publish("facebookFeedCallback", response);
        }
        FB.ui(obj, callback);
    });

    $(function(){
        $('#main-content').on('click', '.fb-post', function(event) {
            amplify.publish("postToFacebook", {
                location: $(this).attr('data-location'),
                city: $(this).attr('data-city'),
                state: $(this).attr('data-state')
            });
            event.preventDefault();
        });
    });

})(window, window.amplify, jQuery);


/*
Your Fucking Polling Place
Site Navigation JavaScript
by Nick Catalano
www.nickcatalano.com
*/

(function(amplify, $){

    function generate_hash(string) {
        // Generate a 4 character hash of an address
        // Adapted from https://stackoverflow.com/questions/7616461/

        /*jslint bitwise: true */
        var hash = 0, i, len;
        if (string.length === 0) {
            return "fuck";
        }
        for (i = 0, len = string.length; i < len; i++) {
            var chr = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        // Always return 4 characters. Risk collissions, live life on the edge
        return ("fuck" + Math.abs(hash).toString(36)).slice(-4);
    }

    $(function(){

        $(window).on('hashchange', function() {
            console.log('hashchange Fired');
            var hash = window.location.hash.replace('#','');
            console.log(hash);

            // We have to make sure we compare against latest_lookup_key as we
            // are causing this event to fire when we change the hash on new
            // lookups and don't want to re-enter the render loop
            if (hash !== window.latest_lookup_key) {
                amplify.publish("processHash", hash);
            } else {
                window.latest_lookup_key = undefined;
            }
        });

        amplify.subscribe("processHash", function(hash) {
            console.log("Process Hash");


            // Check for an existing stored result
            var stored_result = amplify.store(hash);
            var stored_address = amplify.store(hash + '_address');

            // If the hash or result isn't available locally, display the initial page
            if (hash === '' || stored_result === undefined) {
                console.log("Stored Result Nowhere To Be Found");
                if (stored_address !== undefined) {
                    amplify.publish("lookupAddress", stored_address);
                } else {
                    amplify.publish("displayInput");
                }
            } else {
                // If we have a copy in sessionStorage, display it
                if (stored_result.result === 'success') {
                    amplify.publish("displaySuccess", stored_result);
                }
                if (stored_result.result === 'failure') {
                    amplify.publish("displayFailure", stored_result);
                }
                amplify.publish("foundInLocalStorage");
            }
        });

        amplify.subscribe("lookupSuccess", function(result) {
            var hash = generate_hash(result.user_address);
            window.latest_lookup_hash = hash;
            window.location.hash = hash;
            // Store the result based on our hash. Expire in 30 minutes
            var options = {
                expires: 30*60*1000
            };
            amplify.store(hash, result, options);

            // Store the address associated with this key in long-term storage
            amplify.store(hash + '_address', result.user_address);
        });

    });
})(window.amplify, jQuery);
(function(Handlebars, amplify, $){

    $(function(){


        Handlebars.registerHelper('pretty', function(text) {
            if (text === undefined) {
                return text;
            }
            return text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        });

        // Setup helpers
        Handlebars.registerHelper('pluralize', function(number, single, plural) {
            if (number === 1) { return single; }
            else { return plural; }
        });

        Handlebars.registerHelper('pluralize_length', function(array, single, plural) {
            return Handlebars.helpers.pluralize(array.length, single, plural);
        });

        Handlebars.registerHelper('fuckit', function(name) {
            if (name === undefined) {
                return "No Fucking Place Name Provided";
            }
            var orig = Handlebars.helpers.pretty(name);
            var arr = orig.split(' ');
            arr.splice(1,0,"Fucking");
            return arr.join(" ");
        });

        Handlebars.registerHelper('urlencode', function(string) {
            return encodeURIComponent(string);
        });

        Handlebars.registerHelper('chain', function () {
            // Chain helpers. From https://github.com/wycats/handlebars.js/issues/304
            var helpers = [], value;
            $.each(arguments, function (i, arg) {
                if (Handlebars.helpers[arg]) {
                    helpers.push(Handlebars.helpers[arg]);
                } else {
                    value = arg;
                    $.each(helpers, function (j, helper) {
                        value = helper(value, arguments[i + 1]);
                    });
                    return false;
                }
            });
            return value;
        });

        // Setup templates
        var result_source = $('#result-template').html();
        var result_template = Handlebars.compile(result_source);

        var input_source = $('#submit-template').html();
        var input_template = Handlebars.compile(input_source);

        amplify.subscribe("displayInput", function() {
            var html = input_template({});
            console.log("Failure");
            $('#main-content').html(html);
            window.ga_page = '/';
            window.ga_title = 'Your Fucking Polling Place';
            amplify.publish("pageSwitch");
            amplify.publish("contentRendered");
        });

        amplify.subscribe("displaySuccess lookupSuccess", function(result) {
            window.results = result;
            var context = {
                result: result
            };
            var html = result_template(context);
            $('#main-content').html(html);
            window.ga_page = '/results';
            window.ga_title = 'Results';
            amplify.publish("pageSwitch");
            amplify.publish("contentRendered");
            amplify.publish("resultsRendered");
        });
        amplify.subscribe("displayFailure lookupFailure", function(result) {
            console.log("Well, we made it to the failure");
            /*var context = {
                result: result
            };
            //var html = failure_template(context);
            //$('#main-content').html(html);
            */
            var error_message = result.error.message;
            var clean_reasons = {
                parseError: "We couldn't process that address.<br>Did you enter a full fucking address?",
                required: "You didn't provide us an address...<br>How the fuck do you think this even works??",
                invalidValue: "Well for fuck sake, we couldn't find data for this address for this election.<br>Come back later and try again.",
                invalidQuery: "The election is over... get the fuck out of here<br>(but come back next time)",
                notFound: "Fuck. We couldn't find any data for this address.<br>Try again with a residental address, or come back later.",
                conflict: "Fuck. We have conflicting data about this shit.<br>Come back later",
                backendError: "Something's fucked up with our provider's servers.<br>Come back later.",
                invalid: "Well for fuck sake, we couldn't find data for this address for this election.<br>Come back later and try again."
            };
            if (result.reason in clean_reasons) {
                error_message = clean_reasons[result.reason];
            }
            $('.error').html(error_message);
        });
    });

    // Render a few extra items

    amplify.subscribe("resultsRendered", function() {
        // Turn Google Maps URLs into directions
        $.each($('.address-list-item .map-link'), function() {
            var address = $(this).attr('data-address');
            var user_address = $('.user-address').attr('data-address');
            var google_address = 'https://www.google.com/maps/dir/' +
                encodeURIComponent(user_address) + '/' +
                encodeURIComponent(address) + '/';
            $(this).attr('href', google_address);
        });
    });

})(window.Handlebars, window.amplify, jQuery);
/*!

Your Fucking Polling Place
Javascript Code by Nick Catalano
www.nickcatalano.com

*/

(function(amplify, $){
    $(function(){
        // Handle pageviews where there is a hash
        if (window.location.hash.replace('#','') !== '') {
            amplify.publish("processHash", window.location.hash.replace('#',''));
        }

        $('#main-content').on('submit', '.address-form', function(event) {
            var address;
            if ($('#address-mobile').val()) {
                address = $('#address-mobile').val();
            } else {
                address = $('#address-desktop').val();
            }
            amplify.publish("lookupAddress", address);
            event.preventDefault();
            console.log('somebody submitted something');
        });

        $('.title-link').click(function(event){
            if (window.history && window.history.pushState) {
                // Remove the hash using the history API
                history.pushState(null, null, window.location.pathname);
                amplify.publish("displayInput");
                event.preventDefault();
            }
        });
    });
})(window.amplify, jQuery);

(function(window, amplify, $) {

$(function() {
    var content = $("#main-content");

    content.on('click', '.toggle-button', function(event) {
        event.preventDefault();
        $(this).toggleClass("open").next('.toggle-container').slideToggle();
        amplify.publish("tryAgainToggle");
    });

    content.on('click', '.toggle-button, .toggle-container', function(event) {
        event.stopPropagation();
    });

    content.on('click', '.candidate-homepage-link', function(event) {
        var data = {
            contest: $(this).parents('.contest').attr('data-contest'),
            candidate_name: $(this).attr('data-candidate')
        };
        amplify.publish("candidateClick", data);
    });

});

})(window, window.amplify, jQuery);

/*
Your Fucking Polling Place
Analytics JavaScript
by Nick Catalano
www.nickcatalano.com


*/

// Make sure that we have a version of the ga() var locally
// From https://stackoverflow.com/questions/20914703/
window.ga = window.ga || function () {
    (window.ga.q = window.ga.q || []).push(arguments);
};

// It's probably unwise to rely on amplify pubsub for JS monitoring
window.onerror = function(msg, url, linenumber) {
    // Log error to console
    console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    ga('send', 'event', 'Javascript Error', msg, linenumber);
};


// Put everything inside this closure to help with minification
(function(window, document, amplify, $){


    /*
        getElem: This is a shortcut function for parsing a URL using the DOM.
        This allows you to quickly get the domain, pathname, etc off of a full URL.
        From https://github.com/bluestatedigital/bsd-google-analytics-integration
    */

    function getElem(href) {
        var target = document.createElement("a");
        target.href = href;
        return target;
    }

    /*
    GA Helpers
    Useful so that we're sure that we always pass the current page
    */
    function sendEvent(category, action, label, noninteraction) {
        var nI = 0;
        if (noninteraction === true) {
            nI = 1;
        }
        ga('send', 'event', category, action, label,
            {
                    'nonInteraction': nI,
                    'page': window.ga_page,
                    'title': window.ga_title
            });
    }

    function social_action(social_network, action, label) {
        ga('send', 'social', social_network, action, label, {
            'page': window.ga_page,
            'title': window.ga_title
        });
        ga('send', 'event', social_network, action, label, {
            'page': window.ga_page,
            'title': window.ga_title
        });
    }

    amplify.subscribe('pageSwitch', function() {
        ga('send', 'pageview', {
            'page': window.ga_page,
            'title': window.ga_title
        });
    }, 9);


    amplify.subscribe('lookupSuccess', function(result) {
        ga('send', 'event', 'Address', 'Lookup', result.normalizedInput.state,
            {
                'nonInteraction': 1,
                'page': '/results',
                'title': 'Results'
            });
    }, 11);

    amplify.subscribe('lookupFailure', function(result) {
        sendEvent('Address', 'Failure', result.reason);
        if (result.reason === 'invalid') {
            sendEvent('Misc', 'Invalid Message', result.error.message, true);
        }
    }, 11);

    amplify.subscribe("tryAgainToggle", function() {
        if ($('.toggle-button').hasClass('open')) {
            sendEvent('Page Action', 'Try Again', 'Open');
        } else {
            sendEvent('Page Action', 'Try Again', 'Close');
        }
    });

    amplify.subscribe("candidateClick", function(data) {
        sendEvent('Candidate Click', data['contest'], data['candidate_name']);
    });

    amplify.subscribe("foundInLocalStorage", function() {
        sendEvent('Storage', 'Found', '', true);
    }, 50);

    /*

    Generic Tracking

    */

    $(function() {
        $('footer a').click(function(event) {
            sendEvent('Exit', 'Footer', $(this).attr('href'));
        });
        $('.map-link').click(function(event) {
            sendEvent('googlemap', 'Click', $(this).attr('data-state'));
        });
    });

    /*
    Social Tracking
    */

    // Add these to the Facebook Async Setup
    window.fbAsyncInit.fbLoaded.done(function(){
        FB.Event.subscribe('edge.create', function(targetUrl) {
            social_action('facebook', 'like', targetUrl);
        });
        FB.Event.subscribe('edge.remove', function(targetUrl) {
            social_action('facebook', 'unlike', targetUrl);
        });
        FB.Event.subscribe('message.send', function(targetUrl) {
            social_action('facebook', 'send', targetUrl);
        });
    });


    amplify.subscribe("facebookFeedCallback", function(response) {
        social_action('facebook', 'post', response);
    }, 50);

    window.twttr.ready(function(twttr){ //Wrap on twttr.ready for async compatibility. 
        /*
            Twitter Tracking
            Create Twitter events for clicks, tweets, RTs, Follows and Favorites.
            Uses an iterator to avoid repetitive code.
            Adapted from https://github.com/bluestatedigital/bsd-google-analytics-integration
            and written by Yahel Carmon https://github.com/yahelc
            Released under an Apache 2.0 License http://www.apache.org/licenses/
        */
        'click tweet retweet follow favorite'.replace(/\w+/g, function(n) {
            twttr.events.bind(n, function(intent) {
                var target;
                if (intent && intent.target) {
                    if (intent.target.src) {
                        target = getElem(decodeURIComponent((intent.target.src.match(/[&#?](url=)([^&]*)/)||[""]).pop()));
                    }
                    else if (intent && intent.target && intent.target.href) {
                        $.each(decodeURIComponent(intent.target.search).replace(/\+/g, " ").split(/&| |\=/g), function(i, v) {
                        if (v.match(/(^https?:\/\/)|(^www.)/)) {
                              target = getElem(v);
                              return false;
                            }
                         });
                    }
                }
                if(target){
                    social_action("twitter", intent.type, target.href.replace(target.hash, ""), target.pathname);
                }
            });
        });
    });

})(window, document, window.amplify, jQuery);
