(this["webpackJsonpreact-02"]=this["webpackJsonpreact-02"]||[]).push([[0],{109:function(e,t,n){"use strict";n.d(t,"b",(function(){return o}));var r=n(40),a=n(5),c={dialogs:[{id:1,name:"Dimon"},{id:2,name:"Alex"},{id:3,name:"John"},{id:4,name:"Tony"}],messages:[{id:1,text:"Hei-Hei"},{id:2,text:"Hello"},{id:3,text:"Yow"}]},o={addMessage:function(e){return{type:"dialogs/ADD_MESSAGE",message:e}}};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"dialogs/ADD_MESSAGE":var n=e.messages?e.messages[e.messages.length-1].id:1;return Object(a.a)(Object(a.a)({},e),{},{messages:[].concat(Object(r.a)(e.messages),[{id:n,text:t.message}])});default:return e}}},12:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a}));var r,a,c=n(135),o=n.n(c).a.create({baseURL:"https://social-network.samuraijs.com/api/1.0/",withCredentials:!0,headers:{"API-KEY":"e09d6375-5dac-4dde-95ca-700e186a8f7d"}});!function(e){e[e.Success=0]="Success",e[e.Error=1]="Error"}(r||(r={})),function(e){e[e.CaptchaIsRequired=10]="CaptchaIsRequired"}(a||(a={}))},120:function(e,t,n){e.exports=n.p+"static/media/user.1897f975.png"},139:function(e,t,n){e.exports={nav:"Navbar_nav__1S7QR"}},140:function(e,t,n){e.exports={avatar:"Users_avatar__36OJL",users:"Users_users__33_pi"}},141:function(e,t,n){e.exports={avatar:"User_avatar__3Ie1z"}},143:function(e,t,n){e.exports=n.p+"static/media/oval.be00fc4a.svg"},144:function(e,t,n){e.exports={login:"Login_login__ttFE0"}},16:function(e,t,n){e.exports={menu:"Menu_menu__31oF9",item:"Menu_item__3ZhKs",activeLink:"Menu_activeLink__4AqXD"}},170:function(e,t,n){e.exports=n(296)},175:function(e,t,n){},25:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return f})),n.d(t,"c",(function(){return p}));var r=n(50),a=n(0),c=n.n(a),o=n(61),u=n.n(o),i=n(88),s=function(e){var t=e.meta,n=t.touched,r=t.error,a=e.children,o=n&&r;return c.a.createElement("div",{className:o?u.a.error:""},c.a.createElement("div",null,a))},l=function(e){var t=e.input,n=(e.meta,Object(r.a)(e,["input","meta"]));return c.a.createElement(s,e,c.a.createElement("textarea",Object.assign({},t,n)))},f=function(e){var t=e.input,n=(e.meta,Object(r.a)(e,["input","meta"]));return c.a.createElement(s,e,c.a.createElement("input",Object.assign({},t,n)))};function p(e,t,n,r){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";return c.a.createElement("div",null,c.a.createElement(i.a,Object.assign({placeholder:e,name:t,validate:n,component:r},a)),o)}},257:function(e,t,n){},296:function(e,t,n){"use strict";n.r(t);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var r=n(0),a=n.n(r),c=n(60),o=n.n(c),u=(n(175),n(15)),i=n(10),s=n(98),l=n(109),f={},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f;return e},d=n(2),m=n.n(d),g=n(7),v=n(40),h=n(5),E=function(e,t,n,r){return e.map((function(e){return e[n]===t?Object(h.a)(Object(h.a)({},e),r):e}))},b=n(12),O={getUsers:function(){var e=arguments;return Object(g.a)(m.a.mark((function t(){var n,r,a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.length>0&&void 0!==e[0]?e[0]:1,r=e.length>1&&void 0!==e[1]?e[1]:10,t.next=4,b.c.get("users?page=".concat(n,"&count=").concat(r));case 4:return a=t.sent,t.abrupt("return",a.data);case 6:case"end":return t.stop()}}),t)})))()},followUser:function(e){return Object(g.a)(m.a.mark((function t(){var n;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.c.post("follow/".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},unfollowUser:function(e){return Object(g.a)(m.a.mark((function t(){var n;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.c.delete("follow/".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()}},w={users:[],pageSize:10,totalUsersCount:0,currentPage:1,isLoading:!1,followingInProgress:[]},S=function(e){return{type:"USERS/FOLLOW",userId:e}},j=function(e){return{type:"USERS/UNFOLLOW",userId:e}},_=function(e){return{type:"USERS/SET_USERS",users:e}},k=function(e){return{type:"USERS/SET_CURRENT_PAGE",currentPage:e}},C=function(e){return{type:"USERS/SET_TOTAL_USERS_COUNT",totalUsersCount:e}},P=function(e){return{type:"USERS/TOGGLE_LOADING",isLoading:e}},x=function(e,t){return{type:"USERS/TOGGLE_FOLLOWING_PROGRESS",followingInProgress:e,id:t}},L=function(){var e=Object(g.a)(m.a.mark((function e(t,n,r,a){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(x(!0,n)),e.next=3,r(n);case 3:0===e.sent.resultCode&&t(a(n)),t(x(!1,n));case 6:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USERS/FOLLOW":return Object(h.a)(Object(h.a)({},e),{},{users:E(e.users,t.userId,"id",{followed:!0})});case"USERS/UNFOLLOW":return Object(h.a)(Object(h.a)({},e),{},{users:E(e.users,t.userId,"id",{followed:!1})});case"USERS/SET_USERS":return Object(h.a)(Object(h.a)({},e),{},{users:t.users});case"USERS/SET_CURRENT_PAGE":return Object(h.a)(Object(h.a)({},e),{},{currentPage:t.currentPage});case"USERS/SET_TOTAL_USERS_COUNT":return Object(h.a)(Object(h.a)({},e),{},{totalUsersCount:t.totalUsersCount});case"USERS/TOGGLE_LOADING":return Object(h.a)(Object(h.a)({},e),{},{isLoading:t.isLoading});case"USERS/TOGGLE_FOLLOWING_PROGRESS":return Object(h.a)(Object(h.a)({},e),{},{followingInProgress:t.followingInProgress?[].concat(Object(v.a)(e.followingInProgress),[t.id]):e.followingInProgress.filter((function(e){return e!==t.id}))});default:return e}},U=n(30),y=function(){return Object(g.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.c.get("auth/me");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()},A=function(e,t){var n=arguments;return Object(g.a)(m.a.mark((function r(){var a,c,o;return m.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=n.length>2&&void 0!==n[2]&&n[2],c=n.length>3&&void 0!==n[3]?n[3]:null,r.next=4,b.c.post("auth/login",{email:e,password:t,rememberMe:a,captcha:c});case 4:return o=r.sent,r.abrupt("return",o.data);case 6:case"end":return r.stop()}}),r)})))()},I=function(){return Object(g.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.c.delete("auth/login");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()},N=function(){return Object(g.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.c.get("security/get-captcha-url");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()},R={id:null,email:null,login:null,isLoading:!1,isAuth:!1,captcha:null},G=function(e,t,n,r){return{type:"AUTH/SET_AUTH_USER_DATA",data:{id:e,email:t,login:n,isAuth:r}}},D=function(e){return{type:"AUTH/SET_CAPTCHA",captcha:e}},z=function(e){return{type:"AUTH/TOGGLE_LOADING",isLoading:e}},F=function(){return function(){var e=Object(g.a)(m.a.mark((function e(t){var n,r,a,c,o;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(z(!0)),e.next=3,y();case 3:(n=e.sent).resultCode===b.b.Success&&(r=n.data,a=r.id,c=r.login,o=r.email,t(G(a,c,o,!0))),t(z(!1));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},M=function(){return function(){var e=Object(g.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(z(!0)),e.next=3,N();case 3:n=e.sent,t(D(n.url)),t(z(!1));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH/SET_AUTH_USER_DATA":return Object(h.a)(Object(h.a)({},e),t.data);case"AUTH/SET_CAPTCHA":return Object(h.a)(Object(h.a)({},e),{},{captcha:t.captcha});case"AUTH/TOGGLE_LOADING":return Object(h.a)(Object(h.a)({},e),{},{isLoading:t.isLoading});default:return e}},W=n(136),q=n(132),B={initialized:!0,globalError:null},X=function(){return{type:"APP/INITIALIZED_SUCCESS"}},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/INITIALIZED_SUCCESS":return Object(h.a)(Object(h.a)({},e),{},{initialized:!0});default:return e}},K=n(137),Z=Object(i.combineReducers)({profilePage:s.a,dialogsPage:l.a,SidebarFriends:p,usersPage:T,auth:H,app:J,form:q.a}),Q=Object(i.createStore)(Z,Object(K.composeWithDevTools)(Object(i.applyMiddleware)(W.a)));window.store=Q;var V=Q,Y=n(65),$=n(66),ee=n(69),te=n(68),ne=(n(257),n(139)),re=n.n(ne),ae=n(16),ce=n.n(ae),oe=n(13),ue=function(){return a.a.createElement("nav",{className:ce.a.menu},a.a.createElement("div",{className:"".concat(ce.a.item," ").concat(ce.a.active)},a.a.createElement(oe.b,{activeClassName:ce.a.activeLink,to:"/profile"},"Profile")),a.a.createElement("div",{className:ce.a.item},a.a.createElement(oe.b,{activeClassName:ce.a.activeLink,to:"/dialogs"},"Dialogs")),a.a.createElement("div",{className:ce.a.item},a.a.createElement(oe.b,{activeClassName:ce.a.activeLink,to:"/news"},"News")),a.a.createElement("div",{className:ce.a.item},a.a.createElement(oe.b,{activeClassName:ce.a.activeLink,to:"/music"},"Music")),a.a.createElement("div",{className:ce.a.item},a.a.createElement(oe.b,{activeClassName:ce.a.activeLink,to:"/users"},"Users")),a.a.createElement("div",{className:ce.a.item},a.a.createElement(oe.b,{activeClassName:ce.a.activeLink,to:"/settings"},"Settings")))},ie=function(){return a.a.createElement("nav",{className:re.a.nav},a.a.createElement(ue,null))},se=n(11),le=function(){return a.a.createElement("div",null,"News")},fe=function(){return a.a.createElement("div",null,"Music")},pe=n(96),de=function(e){return e.usersPage.users},me=function(e){return e.usersPage.pageSize},ge=function(e){return e.usersPage.currentPage},ve=function(e){return e.usersPage.followingInProgress},he=function(e){return e.usersPage.totalUsersCount},Ee=function(e){return e.usersPage.isLoading},be=n(140),Oe=n.n(be),we=n(141),Se=n.n(we),je=n(120),_e=n.n(je),ke=function(e){var t=e.id,n=e.name,r=e.status,c=e.followed,o=e.src,u=e.followingInProgress,i=e.followThunkCreator,s=e.unfollowThunkCreator;return a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement(oe.b,{to:"/profile/".concat(t)},a.a.createElement("img",{className:Se.a.avatar,src:null!==o?o:_e.a,alt:""}))),a.a.createElement("div",null,c?a.a.createElement("button",{disabled:u.some((function(e){return e===t})),onClick:function(){i(t)}},"UnFollow"):a.a.createElement("button",{disabled:u.some((function(e){return e===t})),onClick:function(){s(t)}},"Follow"))),a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("div",null,n),a.a.createElement("div",null,r))))},Ce=n(64),Pe=n(97),xe=n(70),Le=n.n(xe),Te=n(142),Ue=n.n(Te),ye=function(e){for(var t=e.totalItemsCount,n=e.pageSize,c=e.currentPage,o=e.onPageChanged,u=e.portionSize,i=void 0===u?10:u,s=Math.ceil(t/n),l=[],f=1;f<s+1;f++)l.push(f);var p=Math.ceil(s/i),d=Object(r.useState)(1),m=Object(Pe.a)(d,2),g=m[0],v=m[1],h=(g-1)*i+1,E=g*i,b=l.filter((function(e){return e>=h&&e<=E})).map((function(e){return a.a.createElement("div",{key:e,className:Ue()(Le.a.paginationItem,Object(Ce.a)({},Le.a.selected,e===c)),onClick:function(t){o(e)}},e)}));return a.a.createElement("div",{className:Le.a.pagination},g>1&&a.a.createElement("button",{onClick:function(){v(1),o(1)}},"<<"),g>1&&a.a.createElement("button",{onClick:function(){v(g-1),o((g-2)*i+1)}},"PREV"),b,g<p&&a.a.createElement("button",{onClick:function(){v(g+1),o(g*i+1)}},"NEXT"),g<p&&a.a.createElement("button",{onClick:function(){v(p),o((p-1)*i+1)}},">>"))},Ae=n(58),Ie=function(e){var t=e.users,n=e.followingInProgress,r=e.unfollowThunkCreator,c=e.followThunkCreator,o=e.totalUsersCount,u=e.pageSize,i=e.currentPage,s=e.onPageChanged,l=e.isLoading,f=t.map((function(e){return a.a.createElement(ke,{key:e.id,id:e.id,src:e.photos.small,followingInProgress:n,unfollowThunkCreator:r,followThunkCreator:c,name:e.name,status:e.status,followed:e.followed})}));return a.a.createElement("div",{className:Oe.a.users},l?a.a.createElement(Ae.a,null):null,a.a.createElement(ye,{totalItemsCount:o,pageSize:u,currentPage:i,onPageChanged:s}),f)},Ne=function(e){Object(ee.a)(n,e);var t=Object(te.a)(n);function n(){var e;Object(Y.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).onPageChanged=function(t){var n=e.props,r=n.setCurrentPage,a=n.pageSize;(0,n.getUsers)(t,a),r(t)},e}return Object($.a)(n,[{key:"componentDidMount",value:function(){var e=this.props;(0,e.getUsers)(e.currentPage,e.pageSize)}},{key:"render",value:function(){var e=this.props,t=e.isLoading,n=e.followingInProgress,r=e.totalUsersCount,c=e.pageSize,o=e.users,u=e.followThunkCreator,i=e.unfollowThunkCreator,s=e.currentPage;return a.a.createElement(a.a.Fragment,null,a.a.createElement(Ie,{followingInProgress:n,totalUsersCount:r,pageSize:c,onPageChanged:this.onPageChanged,users:o,isLoading:t,followThunkCreator:u,unfollowThunkCreator:i,currentPage:s}))}}]),n}(a.a.Component),Re=k,Ge=Object(i.compose)(Object(u.b)((function(e){return{followingInProgress:ve(e),totalUsersCount:he(e),pageSize:me(e),users:de(e),currentPage:ge(e),isLoading:Ee(e)}}),{followThunkCreator:function(e){return function(){var t=Object(g.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,L(n,e,O.unfollowUser.bind(e),j);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},unfollowThunkCreator:function(e){return function(){var t=Object(g.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,L(n,e,O.followUser.bind(e),S);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},getUsers:function(e,t){return function(){var n=Object(g.a)(m.a.mark((function n(r){var a;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r(P(!0)),n.next=3,O.getUsers(e,t);case 3:a=n.sent,r(_(a.items)),r(C(a.totalCount)),r(P(!1));case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},setCurrentPage:Re}),pe.a)(Ne),De=n(93),ze=n.n(De),Fe=function(e){var t=e.isAuth,n=e.login,r=e.logout;return a.a.createElement("header",{className:ze.a.header},a.a.createElement("img",{src:"https://i.mycdn.me/image?id=886337513216&ts=0000000000000f0154&plc=WEB&tkn=*u1GpzXPcA82wxOfVLnRWdSlOcvM&fn=sqr_288_2x",alt:""}),a.a.createElement("div",{className:ze.a.loginBlock},t?a.a.createElement("div",null,n," - ",a.a.createElement("button",{onClick:r},"Log out")):a.a.createElement(oe.b,{to:"/login"},"Login")))},Me=Object(u.b)((function(e){return{isAuth:e.auth.isAuth,login:e.auth.login}}),{logout:function(){return function(){var e=Object(g.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(z(!0)),e.next=3,I();case 3:0===e.sent.resultCode&&t(G(null,null,null,!1)),t(z(!1));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}})(Fe),He=n(131),We=n(25),qe=n(62),Be=n(61),Xe=n.n(Be),Je=n(144),Ke=n.n(Je),Ze=Object(He.a)({form:"login"})((function(e){var t=e.handleSubmit,n=e.error,r=e.captcha;return a.a.createElement("form",{onSubmit:t},Object(We.c)("email","email",[qe.c],We.a),Object(We.c)("Password","password",[qe.c],We.a,{type:"password"}),Object(We.c)(void 0,"rememberMe",[],We.a,{type:"checkbox"},"remember me"),n&&a.a.createElement("div",{className:Xe.a.summaryError},n),a.a.createElement("div",null,a.a.createElement("button",null,"Login")),r&&a.a.createElement("div",null,a.a.createElement("img",{src:r,alt:""}),a.a.createElement("div",null,Object(We.c)("\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0438\u043c\u0432\u043e\u043b\u044b \u0441 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0438","captcha",[qe.c],We.a,{}))))})),Qe=Object(u.b)((function(e){return{isAuth:e.auth.isAuth,captcha:e.auth.captcha}}),{login:function(e,t,n,r){return function(){var a=Object(g.a)(m.a.mark((function a(c){var o,u;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c(z(!0)),a.next=3,A(e,t,n,r);case 3:(o=a.sent).resultCode===b.b.Success?c(F()):(o.resultCode===b.a.CaptchaIsRequired&&c(M()),u=o.messages.length>0?o.messages[0]:"some error",c(Object(U.a)("login",{_error:u}))),c(z(!1));case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}})((function(e){return e.isAuth?a.a.createElement(se.a,{to:"/profile"}):a.a.createElement("div",{className:Ke.a.login},a.a.createElement("h3",null,"Login"),a.a.createElement(Ze,{onSubmit:function(t){e.login(t.email,t.password,t.rememberMe,t.captcha)},captcha:e.captcha}))})),Ve=a.a.lazy((function(){return n.e(4).then(n.bind(null,303))})),Ye=a.a.lazy((function(){return n.e(3).then(n.bind(null,302))})),$e=function(e){Object(ee.a)(n,e);var t=Object(te.a)(n);function n(){var e;Object(Y.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).catchAllUnhandledErrors=function(e){alert(e)},e}return Object($.a)(n,[{key:"componentDidMount",value:function(){this.props.initializeApp(),window.addEventListener("unhandledrejection",this.catchAllUnhandledErrors)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("unhandledrejection",this.catchAllUnhandledErrors)}},{key:"render",value:function(){return this.props.initialized?a.a.createElement("div",{className:"app-wrapper"},a.a.createElement(Me,null),a.a.createElement(ie,null),a.a.createElement("div",{className:"app-wrapper-content"},a.a.createElement(r.Suspense,{fallback:a.a.createElement("div",null,"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...")},a.a.createElement(se.d,null,a.a.createElement(se.b,{exact:!0,path:"/",render:function(){return a.a.createElement(Ye,null)}}),a.a.createElement(se.b,{path:"/news",render:function(){return a.a.createElement(le,null)}}),a.a.createElement(se.b,{path:"/music",component:fe}),a.a.createElement(se.b,{path:"/dialogs",render:function(){return a.a.createElement(Ve,null)}}),a.a.createElement(se.b,{path:"/profile/:userId?",render:function(){return a.a.createElement(Ye,null)}}),a.a.createElement(se.b,{path:"/users",render:function(){return a.a.createElement(Ge,null)}}),a.a.createElement(se.b,{path:"/login",render:function(){return a.a.createElement(Qe,null)}}),a.a.createElement(se.b,{path:"*",render:function(){return a.a.createElement("div",null,"404 Page not found")}}))))):a.a.createElement(Ae.a,null)}}]),n}(a.a.Component),et=Object(u.b)((function(e){return{initialized:e.app.initialized}}),{initializeApp:function(){return function(e){var t=e(F());Promise.all([t]).then((function(){e(X())}))}}})($e),tt=function(){return a.a.createElement(oe.a,null,a.a.createElement(u.a,{store:V},a.a.createElement(et,null)))};o.a.render(a.a.createElement(tt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},58:function(e,t,n){"use strict";var r=n(143),a=n.n(r),c=n(0),o=n.n(c),u=n(92),i=n.n(u);t.a=function(){return o.a.createElement("div",{className:i.a.preloader},o.a.createElement("img",{className:i.a.img,src:a.a,alt:""}))}},61:function(e,t,n){e.exports={error:"FormControls_error__BPla1",errorText:"FormControls_errorText__2oHqt",summaryError:"FormControls_summaryError__3XmgK"}},62:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return o}));var r=function(e){return e?void 0:"Field is required"},a=function(e){return function(t){return t&&t.length>e?"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0432\u0432\u0435\u0434\u0435\u043d\u043d\u044b\u0445 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 \u0431\u043e\u043b\u044c\u0448\u0435, \u0447\u0435\u043c ".concat(e):void 0}},c=a(30),o=a(100)},70:function(e,t,n){e.exports={pagination:"Paginator_pagination__18p3_",paginationItem:"Paginator_paginationItem__30SkM",selected:"Paginator_selected__15uXf"}},92:function(e,t,n){e.exports={preloader:"Preloader_preloader__17QRK",img:"Preloader_img__3mjMk"}},93:function(e,t,n){e.exports={header:"Header_header__3pvtt",loginBlock:"Header_loginBlock__2GtUP"}},96:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(50),a=n(0),c=n.n(a),o=n(11),u=n(15),i=function(e){return{isAuth:e.auth.isAuth}};function s(e){return Object(u.b)(i)((function(t){var n=t.isAuth,a=Object(r.a)(t,["isAuth"]);return n?c.a.createElement(e,a):c.a.createElement(o.a,{to:"/login"})}))}},98:function(e,t,n){"use strict";n.d(t,"d",(function(){return h})),n.d(t,"b",(function(){return E})),n.d(t,"c",(function(){return b})),n.d(t,"g",(function(){return O})),n.d(t,"e",(function(){return w})),n.d(t,"f",(function(){return S}));var r=n(134),a=n(2),c=n.n(a),o=n(7),u=n(40),i=n(5),s=n(30),l=n(12),f=function(e){return Object(o.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.c.get("profile/".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},p=function(e){return Object(o.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.c.get("profile/status/".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},d=function(e){return Object(o.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.c.put("profile/status",{status:e});case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},m=function(e){return Object(o.a)(c.a.mark((function t(){var n,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=new FormData).append("image",e),t.next=4,l.c.put("profile/photo",n);case 4:return r=t.sent,t.abrupt("return",r.data);case 6:case"end":return t.stop()}}),t)})))()},g=function(e){return Object(o.a)(c.a.mark((function t(){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.c.put("profile",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},v={posts:[{id:1,message:"\u041f\u0435\u0440\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",likeCount:1},{id:2,message:"\u0412\u0442\u043e\u0440\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",likeCount:2},{id:3,message:"\u0422\u0440\u0435\u0442\u044c\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",likeCount:3},{id:4,message:"\u0427\u0435\u0442\u0432\u0435\u0440\u0442\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",likeCount:5}],profile:null,status:"",isLoading:!1},h={toggleLoading:function(e){return{type:"profile/TOGGLE_LOADING",isLoading:e}},addPost:function(e){return{type:"profile/ADD_POST",post:e}},deletePost:function(e){return{type:"profile/DELETE_POST",id:e}},setUserProfile:function(e){return{type:"profile/SET_USER_PROFILE",profile:e}},setStatus:function(e){return{type:"profile/SET_STATUS",status:e}},setPhotos:function(e){return{type:"profile/SET_PHOTOS",photos:e}}},E=function(e){return function(){var t=Object(o.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(h.toggleLoading(!0)),t.next=3,f(e);case 3:r=t.sent,n(h.setUserProfile(r)),n(h.toggleLoading(!1));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},b=function(e){return function(){var t=Object(o.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(h.toggleLoading(!0)),t.next=3,p(e);case 3:r=t.sent,n(h.setStatus(r)),n(h.toggleLoading(!1));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},O=function(e){return function(){var t=Object(o.a)(c.a.mark((function t(n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n(h.toggleLoading(!0)),t.next=4,d(e);case 4:0===t.sent.resultCode&&(n(h.setStatus(e)),n(h.toggleLoading(!1))),t.next=10;break;case 8:t.prev=8,t.t0=t.catch(0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},w=function(e){return function(){var t=Object(o.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m(e);case 2:0===(r=t.sent).resultCode&&n(h.setPhotos(r.photos));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},S=function(e){return function(){var t=Object(o.a)(c.a.mark((function t(n,a){var o,u,i,l,f,p,d;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g(e);case 2:if(o=t.sent,u=a().auth.id,0!==o.resultCode){t.next=12;break}if(null===u){t.next=9;break}n(E(u)),t.next=10;break;case 9:throw new Error("userId can not be null");case 10:t.next=17;break;case 12:i={},l=Object(r.a)(o.messages);try{for(l.s();!(f=l.n()).done;)p=f.value,d=p.slice(30,p.length-1).toLowerCase(),i[d]="Invalid url format"}catch(c){l.e(c)}finally{l.f()}return n(Object(s.a)("profileAboutMeForm",{contacts:i})),t.abrupt("return",Promise.reject(o.messages[0]));case 17:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"profile/ADD_POST":var n=e.posts?e.posts[e.posts.length-1].id+1:1;return Object(i.a)(Object(i.a)({},e),{},{posts:[].concat(Object(u.a)(e.posts),[{id:n,message:t.post,likeCount:0}])});case"profile/DELETE_POST":return Object(i.a)(Object(i.a)({},e),{},{posts:e.posts.filter((function(e){return e.id!==t.id}))});case"profile/SET_USER_PROFILE":return Object(i.a)(Object(i.a)({},e),{},{profile:t.profile});case"profile/SET_STATUS":return Object(i.a)(Object(i.a)({},e),{},{status:t.status});case"profile/SET_PHOTOS":return Object(i.a)(Object(i.a)({},e),{},{profile:Object(i.a)(Object(i.a)({},e.profile),{},{photos:t.photos})});case"profile/TOGGLE_LOADING":return Object(i.a)(Object(i.a)({},e),{},{isLoading:t.isLoading});default:return e}}}},[[170,1,2]]]);
//# sourceMappingURL=main.a87fb51e.chunk.js.map