---
kind: article
created_at: 2015-01-02 11:34 CET
title: Expandable search with reset button
tags:
  - english
  - search input 
  - expandable
  - css
---

HTML5 defines new input search types such as text, search, tel, date, email, etc. Mobile devices display the related 
keyboard using this type. For instance, a `<input type="date">` will reveal a date picker in your mobile device. 
Or `<input type="search">` shows a reset button at the right. However, for desktop browsers the support may be 
problematic. For instance, in the case of `<input type="search">`, reset button works fine in Opera, Safari, and Chrome but in 
Firefox. Thus, either you want the reset button for all browsers, or you want to design your own fancy one, of which I will
demonstrate here.

<!--MORE-->

 <style>
    #expandable-button{
        display: inline-block;
    }
    
    .defn-container {
        text-align: center;
        padding: 30px 10px;
        font-size: 2em;
    }
    
    .defn, .eg-expand {
        display: inline-block;
    }
    
    .search-container {
        position: relative;
        display: inline-block;
    }
    
    .my-icon {
        border: none;
        background-color: #ffffff;
        position: absolute;
        z-index: 2; /* Make the icon on top of the input box */
        /* vertically center the icon */
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        color: dimgray; /* Define the text color */
        width: 22px;
        height: 22px;
    }
    
    .my-icon.my-icon-search {
        right: 5px; /* Define the absolute position in the search container */
        /* Define the background image for remove button */
        background: #ffffff url(/img/icons/search.svg) no-repeat center center;
        background-size: contain;
        pointer-events: none;
    }
    
    .my-icon.my-icon-remove {
        display: none; /* Hide the remove button initially */
        /* Define the background image for remove button */
        background: #ffffff url(/img/icons/remove.svg) no-repeat center center;
        right: 25px; /* Define the absolute position in the search container */
    }
    
    input[type=text] {
        /* Give an initial width */
        width: 200px;
        /* Make the width changes more smooth */
        transition: width 1s ease;
        -webkit-transition: width 1s ease;
    
        /* Make the search box look fancy .*/
        display: block;
        height: 50px;
        padding: 3px 6px;
        font-size: 25px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    
 </style>
 <script
   src="https://code.jquery.com/jquery-2.2.4.min.js"
   integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
   crossorigin="anonymous"></script>
 <script type="application/javascript">
    $(document).ready(function(){
    
        // If there is a text entered to the input box, reveal the remove button
        // else make keep it hidden.
        function displayReset(that, elem) {
            // Test the length of the value of the input box
            var display = $(that).val().length > 0 ? "block" : "none";
            $( elem + " .my-icon-remove").css("display", display);
        }
    
        // On focusin event, increase the width of the input box
        $(".defn input[type=text]").on("focusin", function(){
            $(".defn input[type=text]").css("width", "350px");
            displayReset(this, ".defn");
        });
        
        
        // On focusin event, increase the width of the input box
        $(".eg-expand input[type=text]").on("focusin", function(){
            $(".eg-expand input[type=text]").css("width", "350px");
            $(".eg-expand .my-icon-remove").css("display", "block");
        });
        
        // On focusin event, increase the width of the input box
        $(".soln input[type=text]").on("focusin", function(){
            $(".soln input[type=text]").css("width", "350px");
            displayReset(this, ".soln");
        });
    
        // On keydown, check whether there is text in the input box or not
        $(".defn input[type=text]").on("keydown", function() {
            displayReset(this, ".defn");
        });
        
        $(".soln input[type=text]").on("keydown", function() {
            displayReset(this, ".soln");
        }); 
            
        // On focus out for defining the problem
        $(".defn input[type=text]").on("focusout", function(event){
            $(".defn input[type=text]").css("width", "200px");
            $(".defn .my-icon-remove").css("display", "none");
        });
        
        // On focus out for defining the problem
        $(".eg-expand input[type=text]").on("focusout", function(event){
            $(".eg-expand input[type=text]").css("width", "200px");
            $(".eg-expand .my-icon-remove").css("display", "none");
        });
    
        // On focus out search input text
        $(".soln input[type=text]").on("focusout", function(event){
            var target = $(event.relatedTarget); // Get the related target of the event
            // Unless there is "my-icon" class in the relatedTarget, update the width
            console.log(target);
            if ( !target.hasClass("my-icon") ) {
                $(".soln input[type=text]").css("width", "200px");
                $(".soln .my-icon-remove").css("display", "none");
            }
        });
        
        // On focus out remove button
        $(".soln .my-icon.my-icon-remove").on("focusout", function(event){
            var target = $(event.relatedTarget); // Get the related target of the event
            // Unless there is "my-icon" class in the relatedTarget, update the width
            console.log(target);
            if ( !target.hasClass("search") ) {
                $(".soln input[type=text]").css("width", "200px");
                $(".soln .my-icon-remove").css("display", "none");
            }
        });
        
        
    });
 </script>

## Expandable Searchbox with Remove Button (HTML & CSS)

Expandable search box is a component that is composed of 1) search button, 2) reset text button, and 3) search input. The reset 
input and search button should appear on the right, respectively. This component should be relatively positioned(`position: relative;`)
 to position the icons to the right absolutely (e.g. `position: absolute; right: 5px;`) within the component. The following
 input box can be coded with the following HTML and CSS. With the lack Javascript and css transitions, reset button is 
 hidden and input does not expand, yet.
                                                                                           
<div class="defn-container">
<div class="visualization">
 <form method="post" action="/search" >
     <span class="search-container">
         <input class="search" type="text" placeholder="Text me!"/>
         <button class="my-icon my-icon-search" type="submit"></button>
         <input class="my-icon my-icon-remove" type="reset" value="">
     </span>
 </form>
</div>
</div>
 
HTML:

``` html
<span class="search-container">
    <input class="search" type="text" placeholder="Text me!"/>
    <button class="my-icon my-icon-search" type="submit"></button>
    <input class="my-icon my-icon-remove" type="reset" value="">
</span>
```
 
CSS:
 
``` css
.search-container {
    position: relative;
    display: inline-block;
}
.my-icon {
    border: none;
    background-color: #ffffff;
    position: absolute;
    z-index: 2; /* Make the icon on top of the input box */
    /* vertically center the icon */
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    color: dimgray; /* Define the text color */
    width: 22px;
    height: 22px;
}
.my-icon.my-icon-search {
    right: 5px; /* Define the absolute position in the search container */
    /* Define the background image for remove button */
    background: #ffffff url(/img/icons/search.svg) no-repeat center center;
    background-size: contain;
}
.my-icon.my-icon-remove {
    display: none; /* Hide the remove button initially */
    /* Define the background image for remove button */
    background: #ffffff url(/img/icons/remove.svg) no-repeat center center; 
    right: 25px; /* Define the absolute position in the search container */
}
input[type=text] {
    /* Give an initial width */
    width: 200px;
    /* Make the width changes more smooth */
    transition: width 1s ease;
    -webkit-transition: width 1s ease;

    /* Make the search box look fancy .*/
    display: block;
    height: 50px;
    padding: 3px 6px;
    font-size: 25px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
```

## Introducing the functionality

Given this pure HTML and CSS how can we add the functionality?  To be more specific,

1) Expand the input box, when it has focus,

2) Show the reset button when the input box has the focus AND there is text on it.


There are a few ways to expand the input box. For instance, css preselectors(:focus) can be used:
 
``` css
input[type=text]:focus{
     width: 350px;
}
```
    
Another way is that, input width can be updated when focusin or focusout event is fired:

``` javascript
$("input[type=text]").on("focusin", function(){
    this.css("width", 350px);
    $(".eg-expand .my-icon-remove").css("display", "block");
});

$("input[type=text]").on("focusout", function(){
    this.css("width", 250px);
    $(".eg-expand .my-icon-remove").css("display", "none");
});
```
    
    
The css solution may seem an easy and natural solution for expanding an input until you realize the bug in the following
 input box: it shrinks when the reset button is clicked. Thus, clicked item should be detected which is possible by 
  Javascript but CSS. 
  
    
<div class="defn-container">
<div class="eg-expand">
  <form method="post" action="/search" >
      <span class="search-container">
          <input class="search" type="text" placeholder="Text me!"/>
          <button class="my-icon my-icon-search" type="submit"></button>
          <input class="my-icon my-icon-remove" type="reset" value="">
      </span>
  </form>
</div>
</div>    
    
    
With the addition of the following code snippet, your remove button will be conditionally visible. 


``` javascript
// If there is a text entered to the input box, reveal the remove button
// else make keep it hidden.
function displayReset(that) {
    // Test the length of the value of the input box
    var display = $(that).val().length > 0 ? "block" : "none";
    $(".my-icon-remove").css("display", display);
}
        
// On focusin event, increase the width of the input box
$("input[type=text]").on("focusin", function() {
    displayReset(this);
});

// On keydown, check whether there is text in the input box or not
$("input[type=text]").on("keydown", function() {
    displayReset(this);
});
```    
    
    
This additional code, we have the following functionality:



If you text something inside this search box you'll see the reset button will be visible. To reset it, just click it.
You'll realize that with this click the search box is shrinking. Actually, when you click the reset box, your search
box throws a focusout event, which explains the reason for this shrinking behaviour. However, this not expected from
a expandable search box.  

## How to avoid the contraction of search box when reset button is clicked?

The first idea that come to my mind is to detect the clicked item. To detect it, the `relatedTarget` of JQuery 
event comes in handy. On click, if the classes of the element not matching with the sub elements of search box 
container, shrink it. If not, keep it as is. Here is code: 


``` javascript
// Focus out event of search input box
$("input[type=text]").on("focusout", function(event){
    var target = $(event.relatedTarget); // Get the related target of the event
    // Unless there is "my-icon" class in the relatedTarget, update the width
    if (!target.hasClass("my-icon")) {
        $("input[type=text]").css("width", "200px");
        $(".my-icon-remove").css("display", "none");
    }
});

// Focus out event of remove button
$(".my-icon.my-icon-remove").on("focusout", function(event){
    var target = $(event.relatedTarget); // Get the related target of the event
    // Unless there is "my-icon" class in the relatedTarget, update the width
    console.log(target);
    if ( !target.hasClass("search") ) {
        $("input[type=text]").css("width", "200px");
        $(".my-icon-remove").css("display", "none");
    }
});
```


## Summary

The journey to create an expandable search box starts with creating your css and html
 files for this component. The container component should be relatively positioned, so
 that position your reset button absolutely within this component. After all, you need
 to define your focus in and out events both for the input and reset button. Focus in 
 event will be uniquely defined for your input box and you should have two seperate 
 conditionally shrinking the search box. Thus, 1) it will not shrink when the the reset 
 button is clicked, and 2) it remains still when clicking the reset button and 
then clicking somewhere else. 

Go play with the working solution in Chrome, Mozilla, Opera or Safari. :)


<div class="defn-container">
<div class="soln">
  <form method="post" action="/search" >
      <span class="search-container">
          <input class="search" type="text" placeholder="Now, text me!"/>
          <button class="my-icon my-icon-search" type="submit"></button>
          <input class="my-icon my-icon-remove" type="reset" value="">
      </span>
  </form>
</div>
</div>

If you want to see the solution together with the codes, take a look at 
[this JSFiddle.](http://jsfiddle.net/yaprak/oaa1k4y2/)

Next, I'm gonna provide a solution showing a neat way to create a search box as you can find in Apple.com's website.
In the beginning, there will be just a magnifier, and on click the input search box will open up.
