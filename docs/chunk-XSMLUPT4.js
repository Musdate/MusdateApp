import{a,b as o,c as r,d as m,e as i,f as c,h as p}from"./chunk-TMV7ZVWB.js";var u=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=a({type:t,selectors:[["app-register"]],standalone:!0,features:[c],decls:1,vars:0,template:function(n,s){n&1&&i(0,`register works!
`)}});let e=t;return e})();var g=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=a({type:t,selectors:[["app-login"]],standalone:!0,features:[c],decls:10,vars:0,consts:[[1,"container","layout"],["type","email","placeholder","Email",1,"input"],["type","password","placeholder","Password",1,"input"],["type","submit"]],template:function(n,s){n&1&&(o(0,"div",0)(1,"form"),m(2,"input",1)(3,"input",2),o(4,"button",3),i(5," LOGIN "),r(),o(6,"span"),i(7,"Forgot Password?"),r(),o(8,"span"),i(9,"Create Account"),r()()())},styles:[".layout[_ngcontent-%COMP%]{width:27.5rem}.layout[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:0 0 5rem;padding:0 1.5rem;width:100%;height:4.5rem;background:#fff;border:none;border-radius:1rem;color:#333}.layout[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#999;font-style:italic}.layout[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}.layout[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;height:5rem;margin:0 0 5rem;font-weight:700;background-color:#6cc2e6;border:none;outline:none;color:#fff;border-radius:1rem;cursor:pointer}.layout[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#74d2fa}.layout[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;text-align:center;margin:0 0 2.5rem;cursor:pointer}.layout[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover{color:#6cc2e6}"]});let e=t;return e})();var f=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=a({type:t,selectors:[["app-layout"]],standalone:!0,features:[c],decls:10,vars:0,consts:[[1,"background"],[1,"container","layout"],[1,"logo"],["src","../../../assets/LogoMemories.png","alt","Logo Memories"],[1,"container"]],template:function(n,s){n&1&&(o(0,"div",0)(1,"div",1)(2,"div",2),m(3,"img",3),r(),o(4,"h1"),i(5,"MEMORIES"),r(),o(6,"h3"),i(7,"FAMILY SPACE."),r(),o(8,"div",4),m(9,"router-outlet"),r()()())},dependencies:[p],styles:[".background[_ngcontent-%COMP%]{background:linear-gradient(90deg,#ffc84b80 15%,#c864e180 85%);min-height:100vh;min-height:100svh}.logo[_ngcontent-%COMP%]{width:10rem}.layout[_ngcontent-%COMP%]{flex-direction:column;align-items:center;padding:7.5rem 0;color:#fff}.layout[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:1rem;font-weight:700}.layout[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 5rem;font-weight:400}"]});let e=t;return e})();var _=[{path:"",component:f,children:[{path:"register",component:u},{path:"login",component:g},{path:"**",redirectTo:"login",pathMatch:"full"}]}];export{_ as AUTH_ROUTES};