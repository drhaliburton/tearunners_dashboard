webpackJsonp([1],{"8taH":function(t,n,s){"use strict";n.a={name:"loading",props:["loading"],data:function(){return{}}}},AYLQ:function(t,n,s){"use strict";var e=s("w8lG");n.a={fetchProducts:function(){return s.i(e.a)().get("products")},fetchShipments:function(){return s.i(e.a)().get("shipments")},updateShippingData:function(t){return s.i(e.a)().post("shipments",t)}}},BQPY:function(t,n){},GYqU:function(t,n){},HQdO:function(t,n,s){"use strict";var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"cup-container"},[s("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"steam-container"},[s("div",{staticClass:"steam",attrs:{id:"steam-one"}}),t._v(" "),s("div",{staticClass:"steam",attrs:{id:"steam-two"}}),t._v(" "),s("div",{staticClass:"steam",attrs:{id:"steam-three"}}),t._v(" "),s("div",{staticClass:"steam",attrs:{id:"steam-four"}})]),t._v(" "),s("div",{class:t.loading?"hide":"buffer"}),t._v(" "),t._m(0)])},a=[function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"cup"},[s("div",{staticClass:"filled"})])}],r={render:e,staticRenderFns:a};n.a=r},IaJk:function(t,n,s){"use strict";var e=s("fZjL"),a=s.n(e);n.a={refresh:function(){window.location.reload()},getLastCreatedAt:function(t){return t.reduce(function(t,n){return t.created_at>n.created_at?t.created_at:n.created_at})},cleanName:function(t){return t.split(" - ")[0].replace("Tea Runners ","").replace("All ","")},christmasBox:function(t){return t.replace(t,"Christmas Box")},getShipmentMonth:function(t){var n=new Date(t),s=n.getMonth();return 11===s?0:s+1},orderKeys:function(t,n){var s,e=a()(t).sort(function(t,n){return t>n?-1:t<n?1:0}),r={};for(s=0;s<e.length;s++)r[e[s]]=t[e[s]],delete t[e[s]];for(s=0;s<e.length;s++)t[e[s]]=r[e[s]];return t}}},M93x:function(t,n,s){"use strict";function e(t){s("xj1k")}var a=s("xJD8"),r=s("Solh"),i=s("VU/8"),o=e,c=i(a.a,r.a,!1,o,null,null);n.a=c.exports},NHnr:function(t,n,s){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=s("7+uW"),a=s("M93x"),r=s("YaEn"),i=s("oYt9");e.a.use(i.a),e.a.config.productionTip=!1,new e.a({el:"#app",router:r.a,template:"<App/>",components:{App:a.a}})},NxGh:function(t,n,s){"use strict";function e(t){s("ulW3")}var a=s("8taH"),r=s("HQdO"),i=s("VU/8"),o=e,c=i(a.a,r.a,!1,o,null,null);n.a=c.exports},OEpM:function(t,n){},OkQZ:function(t,n,s){"use strict";n.a={name:"DataCell",props:["item"],mounted:function(){},methods:{}}},QevY:function(t,n,s){"use strict";n.a={productCount:{0:{title:"January",month:0,count:{},shipments:{},renewals:{}},1:{title:"February",month:1,count:{},shipments:{},renewals:{}},2:{title:"March",month:2,count:{},shipments:{},renewals:{}},3:{title:"April",month:3,count:{},shipments:{},renewals:{}},4:{title:"May",month:4,count:{},shipments:{},renewals:{}},5:{title:"June",month:5,count:{},shipments:{},renewals:{}},6:{title:"July",month:6,count:{},shipments:{},renewals:{}},7:{title:"August",month:7,count:{},shipments:{},renewals:{}},8:{title:"September",month:7,count:{},shipments:{},renewals:{}},9:{title:"October",month:9,count:{},shipments:{},renewals:{}},10:{title:"November",month:10,count:{},shipments:{},renewals:{}},11:{title:"December",month:11,count:{},shipments:{},renewals:{}}}}},Solh:function(t,n,s){"use strict";var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},a=[],r={render:e,staticRenderFns:a};n.a=r},TGvd:function(t,n,s){"use strict";function e(t){s("eKdA")}var a=s("aEfQ"),r=s("facS"),i=s("VU/8"),o=e,c=i(a.a,r.a,!1,o,null,null);n.a=c.exports},Tfh7:function(t,n,s){"use strict";var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"col"},[s("td",[s("span",{staticClass:"product-name"},[t._v(t._s(t.item.name))]),t._v(" "),s("br"),t._v("\n    "+t._s(t.item.count)+"\n  ")])])},a=[],r={render:e,staticRenderFns:a};n.a=r},VDpy:function(t,n,s){"use strict";function e(t){s("OEpM")}var a=s("e9U7"),r=s("vZId"),i=s("VU/8"),o=e,c=i(a.a,r.a,!1,o,null,null);n.a=c.exports},YaEn:function(t,n,s){"use strict";var e=s("7+uW"),a=s("/ocq"),r=s("TGvd");e.a.use(a.a),n.a=new a.a({mode:"history",routes:[{path:"/",name:"Dashboard",component:r.a}]})},aEfQ:function(t,n,s){"use strict";var e=s("Xxa5"),a=s.n(e),r=s("exGp"),i=s.n(r),o=s("AYLQ"),c=s("VDpy"),u=s("NxGh"),l=s("IaJk"),d=s("PJh5");s.n(d);n.a={name:"dashboard",components:{UpcomingShipments:c.a,Loading:u.a},data:function(){return{products:[],shipments:{},next:"",loading:!1,loaded:!1,error:!1,success:0,deleted:0,skipped:0}},mounted:function(){this.getShipments(),this.loading=!1},methods:{getProducts:function(){var t=this;return i()(a.a.mark(function n(){var s;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.fetchProducts().catch(function(n){t.error=!0,t.loading=!1});case 2:s=n.sent,t.products=s.data.products;case 4:case"end":return n.stop()}},n,t)}))()},getShipments:function(){var t=this;return i()(a.a.mark(function n(){var s;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.fetchShipments().catch(function(n){t.error=!0,t.loading=!1});case 2:s=n.sent,t.shipments=s.data;case 4:case"end":return n.stop()}},n,t)}))()},postShipments:function(t){var n=this;return i()(a.a.mark(function s(){var e;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,o.a.updateShippingData(t).catch(function(t){n.error=!0,n.loading=!1});case 2:e=s.sent,n[e.data.type]++;case 4:case"end":return s.stop()}},s,n)}))()},updateShippingData:function(t){t?this.fetchShippingDetails(t):!1!==t&&this.fetchShippingDetails("?fulfillments.adjusted_fulfillment_date__ge=2018-1-15T00:00:00Z")},fetchShippingDetails:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=this;n.loading=!0;var s={headers:{Authorization:"Basic dGVhX3J1bm5lcnM6TjBxeHFMcHRqRnFNMTdrMg==","Content-Type":"application/json"}},e="http://api.cratejoy.com/v1/shipments/"+t;fetch(e,s).then(function(t){if(502!=t.status)return t.json();setTimeout(function(){n.fetchShippingDetails(n.next)},1e4)}).then(function(t){t.results.map(function(t){n.postShipments(t)}),t.next?n.next=t.next:(n.next=!1,n.loaded=!0,n.loading=!1)}).then(function(){n.next&&n.updateShippingData(n.next)}).catch(function(t){n.error=!0,n.loading=!1})},refresh:function(){l.a.refresh()}}}},e9U7:function(t,n,s){"use strict";var e=s("IaJk"),a=s("QevY"),r=s("k3XT");n.a={name:"UpcomingShipments",props:["shipments"],components:{DataCell:r.a},mounted:function(){},methods:{fillEmptyCells:function(t){for(var n in this.products)this.productCount[t].shipments[n]||(this.productCount[t].shipments[n]={name:n,count:0}),this.productCount[t].renewals[n]||(this.productCount[t].renewals[n]={name:n,count:0}),this.productCount[t].count[n]||(this.productCount[t].count[n]={name:n,count:0});e.a.orderKeys(this.productCount[t].count),e.a.orderKeys(this.productCount[t].renewals),e.a.orderKeys(this.productCount[t].shipments)},countUpcomingShipments:function(t){var n=this,s=this;t.length&&t.map(function(t){if(t.name){var a=t.name.includes("Christmas")?e.a.cleanName(e.a.christmasBox(t.name)):e.a.cleanName(t.name);if(!a.includes("Test")){var r=e.a.getShipmentMonth(t.adjusted_fulfillment_date);s.products[a]||(s.products[a]={name:a,count:0}),s.productCount[r].shipments[a]?s.productCount[r].shipments[a].count++:s.productCount[r].shipments[a]={name:a,count:1,id:t.id},n.countProductTotals(r,a)}s.countUpcomingRenewals(t)}})},countUpcomingRenewals:function(t){var n=this;if(t.autorenew&&!t.name.includes("Test")){var s=t.name.includes("Christmas")?e.a.cleanName(e.a.christmasBox(t.name)):e.a.cleanName(t.name),a=e.a.getShipmentMonth(t.end_date);n.productCount[a].renewals[s]?n.productCount[a].renewals[s].count++:n.productCount[a].renewals[s]={name:s,count:1,id:t.id},this.countProductTotals(a,s)}},countProductTotals:function(t,n){this.productCount[t].count[n]?this.productCount[t].count[n].count++:this.productCount[t].count[n]={name:n,count:1,id:t+n}}},data:function(){return{products:{},productCount:a.a.productCount}}}},eKdA:function(t,n){},facS:function(t,n,s){"use strict";var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("span",[s("Loading",{attrs:{loading:t.loading}}),t._v(" "),s("button",{staticClass:"sync",on:{click:function(n){t.loaded||t.error?t.refresh():t.updateShippingData()}}},[t._v(t._s(t.loaded||t.error?"Refresh Page":t.loading?"Loading":"Sync Shipments")+"\n      "),t.loading?s("span",{staticClass:"saving"},[s("span",[t._v(".")]),s("span",[t._v(".")]),s("span",[t._v(".")])]):t._e()]),t._v(" "),s("div",{staticClass:"product-count"},[t.loading||t.loaded?[s("span",[t._v(t._s(this.success)+" added │ ")]),t._v(" "),s("span",[t._v(" "+t._s(this.skipped)+" skipped │ ")]),t._v(" "),s("span",[t._v(t._s(this.deleted)+" deleted")])]:t._e(),t._v(" "),t.error?[s("span",{staticClass:"error"},[t._v("Error: please refresh and try again.")])]:t._e()],2),t._v(" "),s("UpcomingShipments",{attrs:{shipments:t.shipments}})],1)},a=[],r={render:e,staticRenderFns:a};n.a=r},k3XT:function(t,n,s){"use strict";function e(t){s("BQPY")}var a=s("OkQZ"),r=s("Tfh7"),i=s("VU/8"),o=e,c=i(a.a,r.a,!1,o,null,null);n.a=c.exports},ulW3:function(t,n){},uslO:function(t,n,s){function e(t){return s(a(t))}function a(t){var n=r[t];if(!(n+1))throw new Error("Cannot find module '"+t+"'.");return n}var r={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};e.keys=function(){return Object.keys(r)},e.resolve=a,t.exports=e,e.id="uslO"},vZId:function(t,n,s){"use strict";var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"upcoming-shipments"},[t._v("\n  "+t._s(this.countUpcomingShipments(t.shipments))+"\n\n  "),t._l(t.productCount,function(n){return s("div",{key:n.prod_id},[t._v("\n        "+t._s(t.fillEmptyCells(n.month))+"\n\n    "),s("div",{staticClass:"title"},[t._v(t._s(n.title))]),t._v(" "),t._m(0,!0),t._v(" "),s("span",{staticClass:"flex-grid"},t._l(n.shipments,function(t){return s("span",{key:t.id},[s("DataCell",{attrs:{item:t}})],1)})),t._v(" "),t._m(1,!0),t._v(" "),s("span",{staticClass:"flex-grid"},t._l(n.renewals,function(t){return s("span",{key:t.id},[s("DataCell",{attrs:{item:t}})],1)})),t._v(" "),s("div",{staticClass:"row-title total"},[t._v("Totals")]),t._v(" "),s("span",{staticClass:"flex-grid"},t._l(n.count,function(t){return s("span",{key:t.id},[s("DataCell",{attrs:{item:t}})],1)}))])})],2)},a=[function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("tr",[s("div",{staticClass:"row-title"},[t._v("Subscriptions")])])},function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("tr",[s("div",{staticClass:"row-title"},[t._v("Renewals")])])}],r={render:e,staticRenderFns:a};n.a=r},w8lG:function(t,n,s){"use strict";var e=s("mtWM"),a=s.n(e);n.a=function(){return a.a.create({baseURL:"http://localhost:8081"})}},xJD8:function(t,n,s){"use strict";n.a={name:"app"}},xj1k:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.d80c507f2f69ba09cbb4.js.map