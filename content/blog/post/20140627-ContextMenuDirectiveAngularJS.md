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

Directives are the building block of AngularJS. Up till now, I was an end user for directives. Beforehand, I had some small and unsuccessful trials. This time, I take my time to read blogs, books and watch videos and realized that there are several concepts to understand to fully comprehend directives. For me, the most important ones are linking, compiling, defining the scope of the directive and data binding. 


[This meetup record](http://www.youtube.com/watch?v=WqmeI5fZcho) by Misko Hevery, creator of AngularJS, explained all of those concepts clearly. About scopes, [this blog](http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/) should give you an idea. To understand the difference between text binding, one-way binding and two-way binding you shall refer to [this](http://umur.io/angularjs-directives-using-isolated-scope-with-attributes/) blog. Nowadays, I'm reading this [book](http://www.packtpub.com/AngularJS-directives/book) to gain a deeper understanding of AngularJS directives. After all those reading, I feel ready to write a simple directive: Context Menu (right-click menu).


### Best Approach for ContextMenu

 Let's decide the behaviour of a context-menu. To design it, should I hide & show of an intially created div or append & remove a dynamically created element? I tried both and append & remove approach seemed to be the best one.


#### Hide & Show Approach

In hide & show approach, since the context menu is not a child of the clicked item, hiding context menu on mouseleave will prevent you from going into menu and when you try it will will disappear.
You shall try at the JSFiddle below:

<iframe width="100%" height="300" src="http://jsfiddle.net/yaprak/76aR9/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### Append & Remove Approach

In this approached, the `$scope.myContextDiv` parameter defines the HTML of context menu. This parameter is sent to `contextMenu` directive. Context menu is linked to the right clicked element on right click. Note that, since context menu is dynamically appended to the element, it has to be [`$compile`](https://docs.angularjs.org/api/ng/service/$compile)d first. 

In the directive, we shall get the context menu by `lScope.myContextDiv` or if we write this way `lScope[ lAttr.contextMenu ])(lScope)`, the directive becomes independent of parameter names.


If you want to check the click elements of context menu items, please open the developer console of you browser. When you click at item1 or item2, you can see the console output.

The JS Fiddle of this directive is given as follows:

<iframe width="100%" height="300" src="http://jsfiddle.net/yaprak/5Lk2V/14/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


Please, note that this shall not be the best way to develop a context menu with AngularJS. If you have suggestions for a better one, please do not hesitate to contact with me. 
