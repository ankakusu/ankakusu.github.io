---
kind: article
created_at: 2014-06-27 09:43 EET
title: ContextMenu with AngularJS Directives
map_included: false
tags:
  - english
  - AngularJS
  - Directives
---

I've been searching, reading blogs, books, watching videos about AngularJS directives. 
[This meetup record](http://www.youtube.com/watch?v=WqmeI5fZcho) by Misko Hevery, creator of AngularJS, is a very good explaination for AngularJS Directives from top to toe. About scopes, [this blog](http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/) should give you an idea. To understand the difference between text binding, one-way binding and two-way binding you shall refer to [this](http://umur.io/angularjs-directives-using-isolated-scope-with-attributes/) blog. Nowadays, I'm reading this [book](http://www.packtpub.com/AngularJS-directives/book) to gain a deeper understanding of AngularJS directives. 

So, after all those reading, I feel ready to write a simple directive: Context Menu (right-click menu).

 Let's decide on the behaviour of a context-menu? Hide & show of an intially created div or append & remove a dynamically created element? 

TL;DR, appending and removing items is the right approach. 

Non TL;DR, first of all, in my specific case, I'm working on dynamically created SVG elements and dynamic contextmenu generation is an important feature for me. When I follow the hide & show method whenever I leave the div to click an item of context menu, it disappeared. Please right click at the "Right Click On the Item!" text given in the sample below:

<iframe width="100%" height="300" src="http://jsfiddle.net/yaprak/76aR9/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

In my trial and errors, I eliminated the first method and continued with this better one(in my opinion):

In this approached, I defined an string at the scope, which defines the HTML for a contextmenu (`$scope.myContextDiv`) and passed this string to my `contextMenu` directive. While linking my function, I appended the context menu to the right-clicked element. Since, I'm adding ng-click method in the run time, the context menu should be [`$compile`](https://docs.angularjs.org/api/ng/service/$compile)d before appending to the element. In my implementation, lScope variable of linking function holds all scope variables and all attributes of the item is at lAttr varible. Thus, the compilation `lScope[ lAttr.contextMenu ])(lScope)` is not dependent on a user defined scope parameter.

The JS Fiddle of this directive is given as follows:

<iframe width="100%" height="300" src="http://jsfiddle.net/yaprak/5Lk2V/14/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


