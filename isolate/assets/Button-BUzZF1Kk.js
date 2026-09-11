import{c as u,r as b,j as s,L as x}from"./index-CSbY9TcY.js";/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],f=u("loader-circle",y),i={primary:"btn-primary",secondary:"btn-secondary",ghost:"btn-ghost",danger:"btn-danger"},B=b.forwardRef(function({as:c="button",to:t,variant:d="primary",size:m,loading:a=!1,disabled:l=!1,className:p="",children:r,...e},n){const o=["btn",i[d]??i.primary,m==="sm"?"btn-sm":"",p].filter(Boolean).join(" ");return t?s.jsx(x,{to:t,ref:n,className:o,...e,children:r}):s.jsx(c,{ref:n,className:o,disabled:l||a,"aria-busy":a||void 0,...e,children:a?s.jsxs(s.Fragment,{children:[s.jsx(f,{className:"size-4 animate-spin","aria-hidden":"true"}),r]}):r})});export{B};
