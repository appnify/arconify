import{aa as n,n as s,o as a,ag as p}from"./chunks/framework.y8UAToHR.js";const m=JSON.parse('{"title":"快速上手","description":"","frontmatter":{},"headers":[],"relativePath":"zh-CN/guide/getting-started.md","filePath":"zh-CN/guide/getting-started.md","lastUpdated":1709542159000}'),t={name:"zh-CN/guide/getting-started.md"},e=p(`<h1 class="anchor">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h1><p>通过该章节，你将了解到如何快速开始使用 Arconify UI。在开始之前，你需要掌握了 <a href="https://v3.cn.vuejs.org/" target="_blank" rel="noreferrer">Vue3</a> 的基本使用。</p><h2 class="anchor"><span id="要求" class="anchor__title">要求</span><a class="anchor__link" href="#要求">#</a></h2><p>为了减少不必要的重复依赖，部分依赖外置，因此需要你的项目内有如下依赖：</p><ul><li><a href="./.html">lodash-es</a>：工具库</li><li><a href="./.html">@arco-design/web-vue</a>：字条跳动出品的 Vue3 组件库</li></ul><h2 class="anchor"><span id="安装" class="anchor__title">安装</span><a class="anchor__link" href="#安装">#</a></h2><p>根据你使用的包管理工具，选择以下其中一种命令进行安装：</p><div class="language-sh"><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="language-sh" lang="sh" tabindex="-1"><code><span class="token comment"># 使用 pnpm</span>
<span class="token function">pnpm</span> <span class="token function">add</span> arconify <span class="token parameter variable">-D</span>

<span class="token comment"># 使用 yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> arconify <span class="token parameter variable">-D</span>

<span class="token comment"># 使用 npm</span>
<span class="token function">npm</span> <span class="token function">install</span> arconify <span class="token parameter variable">-D</span>
</code><span aria-hidden="true" class="code-line-numbers"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span></pre></div></div><h2 class="anchor"><span id="使用" class="anchor__title">使用</span><a class="anchor__link" href="#使用">#</a></h2><p>目前只有两个组件且采用 hook 形式调用，因此不用注册组件，只需引入 css 文件即可。在 src/main.ts 文件中，导入 css 文件：</p><div class="language-ts"><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="language-ts" lang="ts" tabindex="-1"><code><span class="token comment">// src/main.ts</span>
<span class="token keyword">import</span> <span class="token string">&#39;arconify/es/style.css&#39;</span>
</code><span aria-hidden="true" class="code-line-numbers"><span></span><span></span></span></pre></div></div><p>然后，在你需要使用的地方，按如下方式调用：</p><div class="language-vue"><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="language-vue" lang="vue" tabindex="-1"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>UserForm</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>UserForm</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> useForm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;arconify&#39;</span>

<span class="token keyword">const</span> UserForm <span class="token operator">=</span> <span class="token function">useForm</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">&#39;名字&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">field</span><span class="token operator">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">setter</span><span class="token operator">:</span> <span class="token string">&#39;input&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">&#39;性别&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">field</span><span class="token operator">:</span> <span class="token string">&#39;gender&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">setter</span><span class="token operator">:</span> <span class="token string">&#39;select&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">&#39;备注&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">field</span><span class="token operator">:</span> <span class="token string">&#39;description&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">setter</span><span class="token operator">:</span> <span class="token string">&#39;textarea&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">submit</span><span class="token punctuation">(</span><span class="token parameter">model</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>model<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;成功&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code><span aria-hidden="true" class="code-line-numbers"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span></pre></div></div>`,13),o=[e];function c(l,r,i,u,k,d){return a(),s("div",null,o)}const h=n(t,[["render",c]]);export{m as __pageData,h as default};
