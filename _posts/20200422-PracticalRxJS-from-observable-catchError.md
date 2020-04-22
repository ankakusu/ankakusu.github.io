---
kind: article
created_at: 2020-04-22 16:48 CET
title: RxJS - from, subscribe
tags:
  - english
  - RxJS
  - from
  - catchError
  - subscribe
  - typescript
---

## RxJS - from, subscribe

I have been using RxJS for a long while and I have watched different video lectures 
and read several tutorials and blog posts. Majority of the time, the examples are 
provided with timers, intervals, etc. Those examples gave no insight to me other
 than defining the behavior of the operator or feature. I simply missed practical usages.

In this series of blog posts, I would like to provide you practical real-life examples so 
that you can have a better idea of the strength of both RxJS and its operators.
I will start with making an end request with axios, converting a promise into an observable 
and consume it by subscribing to it and explain the reactive fluent syntax line by line.

Follow me in this possible scenario on your web app:

You want to display an information that you fetch from an endpoint.

Here you can make your end request as follows: 
    
```typescript
// index.ts
import { from } from 'rxjs';
import axios from 'axios'

from(
  axios.get('http://api.tvmaze.com/singlesearch/shows?q=fringe')
).subscribe((response) => {
  console.log('Show', response.data.name); // Show Fringe
});
```
    
Axios returns us a promise and in order to initiate a observable 
sequence we have to use "from" function to convert a promise into 
an observable. Then, you must subscribe to it to consume this 
observable chain.

Please don't forget to subscribe to your observable, otherwise it won't
work. It will simply wait for you to subscribe to it.

In the next edition, I will give examples about handling errors gracefully.

