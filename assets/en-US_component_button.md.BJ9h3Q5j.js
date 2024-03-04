import{_ as r,a as i,b as h,c as u,d as p,e as _}from"./chunks/demo.zh-CN.vue_vue_type_script_setup_true_lang.bZ2yzHPs.js";import{j as b,n as m,b as a,l as c,u as o,ag as l,o as f,v as t,y as e}from"./chunks/framework.y8UAToHR.js";import"./chunks/theme.DRmv9gcW.js";const g=l('<h1 class="anchor">Button <a class="header-anchor" href="#button" aria-label="Permalink to &quot;Button&quot;">​</a></h1><p>The basic general component is used to mark a set of operation commands, which are triggered by the user&#39;s click, respond to the user and complete the corresponding business logic.</p><h2 class="anchor"><span id="demos" class="anchor__title">Demos</span><a class="anchor__link" href="#demos">#</a></h2>',3),k=t("h3",{class:"anchor"},[t("span",{id:"button-type",class:"anchor__title"},"Button Type"),t("a",{class:"anchor__link",href:"#button-type"},"#")],-1),y=t("p",null,[e("By setting the "),t("code",null,"type"),e(" prop to: "),t("code",null,"primary"),e(", "),t("code",null,"info"),e(", "),t("code",null,"success"),e(", "),t("code",null,"warning"),e(" and "),t("code",null,"error"),e(" to create button with different types.")],-1),v=t("h3",{class:"anchor"},[t("span",{id:"disabled-button",class:"anchor__title"},"Disabled Button"),t("a",{class:"anchor__link",href:"#disabled-button"},"#")],-1),S=t("p",null,[e("Adding the "),t("code",null,"disabled"),e(" prop to make the button disabled.")],-1),B=t("h3",{class:"anchor"},[t("span",{id:"simple-button",class:"anchor__title"},"Simple Button"),t("a",{class:"anchor__link",href:"#simple-button"},"#")],-1),T=t("p",null,"Simple buttons use light tones and are often used on minimalist pages.",-1),w=t("h3",{class:"anchor"},[t("span",{id:"ghost-button",class:"anchor__title"},"Ghost Button"),t("a",{class:"anchor__link",href:"#ghost-button"},"#")],-1),C=t("p",null,"The ghost button turns the background transparent and is often used on colored backgrounds.",-1),x=t("h3",{class:"anchor"},[t("span",{id:"text-button",class:"anchor__title"},"Text Button"),t("a",{class:"anchor__link",href:"#text-button"},"#")],-1),A=t("p",null,[e("Adding the "),t("code",null,"text"),e(" prop to make the button look like normal text.")],-1),N=t("p",null,[e("With the "),t("code",null,"tag"),e(" prop, you can make it look like a normal link.")],-1),z=t("h3",{class:"anchor"},[t("span",{id:"dashed-button",class:"anchor__title"},"Dashed Button"),t("a",{class:"anchor__link",href:"#dashed-button"},"#")],-1),D=t("p",null,[e("Add the "),t("code",null,"dashed"),e(" prop can change button to dashed.")],-1),P=t("h3",{class:"anchor"},[t("span",{id:"inner-badge",class:"anchor__title"},"Inner Badge"),t("a",{class:"anchor__link",href:"#inner-badge"},"#")],-1),V=t("p",null,[e("The inner badge can be set via the "),t("code",null,"badge"),e(" prop.")],-1),I=t("h3",{class:"anchor"},[t("span",{id:"button-size",class:"anchor__title"},"Button Size"),t("a",{class:"anchor__link",href:"#button-size"},"#")],-1),U=t("p",null,[e("There are three built-in sizes, which are set by "),t("code",null,"size"),e(".")],-1),j=t("h3",{class:"anchor"},[t("span",{id:"add-icon",class:"anchor__title"},"Add Icon"),t("a",{class:"anchor__link",href:"#add-icon"},"#")],-1),E=t("p",null,[e("When you need to embed an icon inside a button, you can pass the icon component directly into the "),t("code",null,"icon"),e(" prop.")],-1),O=t("p",null,"If you don't mind the trouble, you can also use the Icon component directly in the slot.",-1),G=t("h3",{class:"anchor"},[t("span",{id:"loading-button",class:"anchor__title"},"Loading Button"),t("a",{class:"anchor__link",href:"#loading-button"},"#")],-1),W=t("p",null,[e("Adding the "),t("code",null,"loading"),e(" prop to make the button in loading.")],-1),$=t("h3",{class:"anchor"},[t("span",{id:"custom-color",class:"anchor__title"},"Custom Color"),t("a",{class:"anchor__link",href:"#custom-color"},"#")],-1),q=t("p",null,[e("You can custom the major color through the "),t("code",null,"color"),e(" prop.")],-1),L=t("h3",{class:"anchor"},[t("span",{id:"button-group",class:"anchor__title"},"Button Group"),t("a",{class:"anchor__link",href:"#button-group"},"#")],-1),R=t("p",null,"Using ButtonGroup can easily combine multiple buttons, which are mostly used in a series of functional button layouts.",-1),J=t("p",null,"The ButtonGroup size and type can be set uniformly, and you can also set the type of each Button individually.",-1),M=l(`<h2 class="anchor"><span id="api" class="anchor__title">API</span><a class="anchor__link" href="#api">#</a></h2><h3 class="anchor"><span id="preset-types" class="anchor__title">Preset Types</span><a class="anchor__link" href="#preset-types">#</a></h3><div class="language-ts"><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="language-ts" lang="ts" tabindex="-1"><code><span class="token keyword">type</span> <span class="token class-name">ButtonType</span> <span class="token operator">=</span> <span class="token string">&#39;default&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;primary&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;info&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;success&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;warning&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;error&#39;</span>
<span class="token keyword">type</span> <span class="token class-name">ButtonAttrType</span> <span class="token operator">=</span> <span class="token string">&#39;button&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;submit&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;reset&#39;</span>
</code><span aria-hidden="true" class="code-line-numbers"><span></span><span></span></span></pre></div></div><h3 class="anchor"><span id="button-props" class="anchor__title">Button Props</span><a class="anchor__link" href="#button-props">#</a></h3><div class="md-table"><table><thead><tr><th>Name</th><th>Type</th><th>Description</th><th>Default</th><th>Since</th></tr></thead><tbody><tr><td>badge</td><td><code>number | string</code></td><td>set inner badge content</td><td><code>null</code></td><td><code>2.0.4</code></td></tr><tr><td>block</td><td><code>boolean</code></td><td>Whether it is a block-level element, the width becomes 100% after setting</td><td><code>false</code></td><td>-</td></tr><tr><td>button-type</td><td><code>ButtonAttrType</code></td><td>Set the <code>type</code> attribute of the native <code>&lt;button&gt;</code></td><td><code>&#39;button&#39;</code></td><td>-</td></tr><tr><td>circle</td><td><code>boolean</code></td><td>Set whether it is circular</td><td><code>false</code></td><td>-</td></tr><tr><td>color</td><td><code>string</code></td><td>Set the major color of the button</td><td><code>null</code></td><td><code>2.0.0</code></td></tr><tr><td>dashed</td><td><code>boolean</code></td><td>Set whether it is a dashed button</td><td><code>false</code></td><td><code>2.0.0</code></td></tr><tr><td>disabled</td><td><code>boolean</code></td><td>Set whether it is disabled</td><td><code>false</code></td><td>-</td></tr><tr><td>ghost</td><td><code>boolean</code></td><td>Once set, the button will be styled with a transparent background color</td><td><code>false</code></td><td>-</td></tr><tr><td>icon</td><td><code>VueComponent</code></td><td>Auxiliary icon of the button, it will switch to the loading icon when loading</td><td><code>&#39;&#39;</code></td><td>-</td></tr><tr><td>loading</td><td><code>boolean</code></td><td>Set whether it is loading</td><td><code>false</code></td><td>-</td></tr><tr><td>loading-effect</td><td><code>string</code></td><td>Set the effect animation for the loading icon</td><td><code>false</code></td><td>-</td></tr><tr><td>loading-icon</td><td><code>VueComponent</code></td><td>Set whether to be read-only when loading</td><td><code>Spinner</code></td><td>-</td></tr><tr><td>no-pulse</td><td><code>boolean</code></td><td>Set whether to disable the pulse effect after clicking</td><td><code>false</code></td><td><code>2.0.0</code></td></tr><tr><td>simple</td><td><code>boolean</code></td><td>Once set, the button will change to a minimalist style in light colors</td><td><code>false</code></td><td>-</td></tr><tr><td>size</td><td><code>&#39;small&#39; | &#39;default&#39; | &#39;large&#39;</code></td><td>The size of the button</td><td><code>&#39;default&#39;</code></td><td>-</td></tr><tr><td>tag</td><td><code>string</code></td><td>Set button rendering tag</td><td><code>&#39;button&#39;</code></td><td><code>2.0.0</code></td></tr><tr><td>text</td><td><code>boolean</code></td><td>Set whether it is a text button</td><td><code>false</code></td><td><code>2.0.0</code></td></tr><tr><td>type</td><td><code>ButtonType</code></td><td>Set the button type</td><td><code>&#39;default&#39;</code></td><td>-</td></tr></tbody></table></div><h3 class="anchor"><span id="button-events" class="anchor__title">Button Events</span><a class="anchor__link" href="#button-events">#</a></h3><div class="md-table"><table><thead><tr><th>Name</th><th>Description</th><th>Parameters</th><th>Since</th></tr></thead><tbody><tr><td>click</td><td>Emitted when the button is left clicked, returns the clicked event object</td><td><code>(event: MouseEvent)</code></td><td>-</td></tr></tbody></table></div><h3 class="anchor"><span id="button-slots" class="anchor__title">Button Slots</span><a class="anchor__link" href="#button-slots">#</a></h3><div class="md-table"><table><thead><tr><th>Name</th><th>Description</th><th>Parameters</th><th>Since</th></tr></thead><tbody><tr><td>default</td><td>Content slot for button</td><td>-</td><td>-</td></tr><tr><td>icon</td><td>Slot for button prefix icon</td><td>-</td><td><code>2.0.0</code></td></tr><tr><td>loading</td><td>Loading icon slot, used when you need more custom loading icon effects</td><td>-</td><td>-</td></tr></tbody></table></div>`,9),tt=JSON.parse('{"title":"Button","description":"","frontmatter":{},"headers":[],"relativePath":"en-US/component/button.md","filePath":"en-US/component/button.md","lastUpdated":1709542159000}'),Y={name:"en-US/component/button.md"},et=Object.assign(Y,{setup(F){const s=Object.assign({"/demos/button/basis/demo.en-US.vue":r,"/demos/button/basis/demo.zh-CN.vue":i,"/demos/button/custom/demo.en-US.vue":h,"/demos/button/custom/demo.zh-CN.vue":u,"/demos/button/dashed/demo.en-US.vue":p,"/demos/button/dashed/demo.zh-CN.vue":_}),d=Object.assign({});return(H,K)=>{const n=b("Demo");return f(),m("div",null,[g,a(n,{demos:o(s),codes:o(d),src:"button/basis",alive:!1},{default:c(()=>[k,y]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/disabled",alive:!1},{default:c(()=>[v,S]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/simple",alive:!1},{default:c(()=>[B,T]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/ghost",alive:!1},{default:c(()=>[w,C]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/text",alive:!1},{default:c(()=>[x,A,N]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/dashed",alive:!1},{default:c(()=>[z,D]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/badge",alive:!1},{default:c(()=>[P,V]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/size",alive:!1},{default:c(()=>[I,U]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/icon",alive:!1},{default:c(()=>[j,E,O]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/loading",alive:!1},{default:c(()=>[G,W]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/custom",alive:!1},{default:c(()=>[$,q]),_:1},8,["demos","codes"]),a(n,{demos:o(s),codes:o(d),src:"button/group",alive:!1},{default:c(()=>[L,R,J]),_:1},8,["demos","codes"]),M])}}});export{tt as __pageData,et as default};
