---
kind: article
created_at: 2013-05-07 09:43 EET
title: AngularJS Directives - Design a ContextMenu directive with AngularJS
tags:
  - english
  - AngularJS
  - Directives
---

What should be the right approach to develop a context-menu? As far as I searched at the internet I found two main approaches:

1) With ul, li 
2) With menu, menuitem

Since `menuitem` tag is only supported on Mozilla Firefox, I decided to use `li` and `li` tags. Please refer to [this](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menuitem) link for browser compatility of `menuitem`.

JS Fiddle:

<iframe width="100%" height="300" src="http://jsfiddle.net/yaprak/5Lk2V/13/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


