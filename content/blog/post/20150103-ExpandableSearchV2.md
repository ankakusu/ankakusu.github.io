---
kind: article
created_at: 2015-01-03 20:00 CET
title: Expandable search button like in the website of Apple.com
map_included: false
tags:
    - english
    - expandable search input
    - css
    - front end
---

In my previous blog post, I talked about creating [a expandable search box with a reset button](/#/blog/post/2015/01/02/ResetAnimatedInput).
In this blog post, we had a focusable search box and when we the search box gets the focus, the problem was to detect the source of the focus out
event. Given the information that sends the focus out event, I can decide whether to shrink the search box or not.

Suppose, we want to take a step further and want our search box to be totally shrunk like the one in the website of [Apple.com](www.apple.com).
If the search box is initially shrunk, how will it get the focus? 

<!--MORE-->


