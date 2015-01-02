---
kind: article
created_at: 2014-12-11 11:34 CET
title: Resetting an animated search input box without loosing the focus
map_included: false
tags:
  - english
  - search input 
  - expandable
  - css
---

With HTML5, new types such as text, search, tel, date, email etc. can be used to define the types of input forms. 
This helps, especially, the mobile devices to show which type of keyboard when you click on that input field. 
For instance, if you have an input box 
defined as follows: `<input type="date">`
In your mobile device, when you click on this form, a date picker will reveal in response. Or, if you have an input
box as `<input type="search">`, when you text some data on the input box, automatically, a reset button will appear
in the right most of the input field.

If you test your code in desktop browsers, the support may be problematic with some of the browsers. For instance, 
when you create a search input box 
like: `<input type="search">`, a reset text button will appear automatically in browsers such as Opera, Safari and Chrome.
Unfortunately, not for Firefox Mozilla. Thus, either you might want the reset button for input of 
type="search" to appear in all browsers, or you might want to design your own fancy one, you will learn how to
do it in this blog post. Believe me, it is not as easy as it seems so.

<!--MORE-->

## Expandable Searchbox with Remove Button

If you want to device your own search input with a reset button, you need a component which includes an input search box, 
 a reset and a magnify button as given below: 


    #!html
    <span class="search-container">
        <input class="search" type="text" placeholder="Text smt."/>
        <button class="my-icon my-icon-search" type="submit"></button>
        <input class="my-icon my-icon-remove" type="reset" value="">
    </span>
 
If you had a fixed length search box, it was not a problem at all. However, if you had a dynamically changing width, 
you will encounter the focusout event problem for the input field.

## How to reproduce the problem:
 
* You have the input box given below : 

<div class="defn" id="expandable-button">
  <form method="post" action="/search" >
      <span class="search-container">
          <input class="search" type="text" placeholder="Text smt."/>
          <button class="my-icon my-icon-search" type="submit"></button>
          <input class="my-icon my-icon-remove" type="reset" value="">
      </span>
  </form>
</div>

* When you text something inside, it expands.
* When you want to reset your text inside the search box (by clicking the reset botton on the right), your input box throws a 
 focusout event and shrunk.
 
 <style>
    #expandable-button{
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
    }
    
    .my-icon.my-icon-remove {
        display: none; /* Hide the remove button initially */
        background: #ffffff url(/img/icons/remove.svg) no-repeat center center; /* Define the background image for remove button */
        right: 25px; /* Define the absolute position in the search container */
    }
    
    input[type=text] {
        /* Give an initial width */
        width: 100px;
        /* Make the width changes more smooth */
        transition: width 1s ease;
        -webkit-transition: width 1s ease;
    
        /* Make the search box look fancy .*/
        display: block;
        height: 34px;
        padding: 3px 6px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    
 </style>
 <script type="application/javascript">
    $(document).ready(function(){
    
        // If there is a text entered to the input box, reveal the remove button
        // else make keep it hidden.
        function displayReset(that) {
            // Test the length of the value of the input box
            var display = $(that).val().length > 0 ? "block" : "none";
            $(".my-icon-remove").css("display", display);
        }
    
        // On focusin event, increase the width of the input box
        $("input[type=text]").on("focusin", function(){
            $("input[type=text]").css("width", "250px");
            displayReset(this);
        });
    
        // On keydown, check whether there is text in the input box or not
        $("input[type=text]").on("keydown", function() {
            displayReset(this);
        });
        
        // On focus out for defining the problem
        $(".defn input[type=text]").on("focusout", function(event){
            $("input[type=text]").css("width", "100px");
            $(".my-icon-remove").css("display", "none");
        });
    
        // On focus out search input text
        $(".soln input[type=text]").on("focusout", function(event){
            var target = $(event.relatedTarget); // Get the related target of the event
            // Unless there is "my-icon" class in the relatedTarget, update the width
            console.log(target);
            if ( !target.hasClass("my-icon") ) {
                $("input[type=text]").css("width", "100px");
                $(".my-icon-remove").css("display", "none");
            }
        });
        
        // On focus out remove button
        $(".soln .my-icon.my-icon-remove").on("focusout", function(event){
            var target = $(event.relatedTarget); // Get the related target of the event
            // Unless there is "my-icon" class in the relatedTarget, update the width
            console.log(target);
            if ( !target.hasClass("search") ) {
                $("input[type=text]").css("width", "100px");
                $(".my-icon-remove").css("display", "none");
            }
        });
        
        
    });
 </script>
 
## What is the intended behaviour & solution?

Obviously, it should not shrunk when reset button or click and be free to shrunk when somewhere outside of the 
searchbox is clicked.


To solve this problem, I think of detecting the item that is clicked. The `relatedTarget` of JQuery event comes 
in handy here. So, on click, if the classes of the element not matching with the sub elements of search box 
container, shrunk it. If not, keep it as is. Here is code: 



    #!javascript
    // Focus out event of search input box
    $("input[type=text]").on("focusout", function(event){
        var target = $(event.relatedTarget); // Get the related target of the event
        // Unless there is "my-icon" class in the relatedTarget, update the width
        if (!target.hasClass("my-icon")) {
            $("input[type=text]").css("width", "100px");
            $(".my-icon-remove").css("display", "none");
        }
    });
    
    // Focus out event of remove button
    $(".my-icon.my-icon-remove").on("focusout", function(event){
        var target = $(event.relatedTarget); // Get the related target of the event
        // Unless there is "my-icon" class in the relatedTarget, update the width
        console.log(target);
        if ( !target.hasClass("search") ) {
            $("input[type=text]").css("width", "100px");
            $(".my-icon-remove").css("display", "none");
        }
    });


## Summary

With the focus out events given above will prevent the unwanted behaviour such as

The unwanted behavior for search box component will be prevented by conditionally shrinking the search box. Thus, 1) it
will not shrink when the the reset button is clicked, and 2) it remains still when clicking the reset button and 
then clicking somewhere else. 

Go play with the working solution in Chrome, Mozilla, Opera or Safari. :)

<div class="soln">
  <form method="post" action="/search" >
      <span class="search-container">
          <input class="search" type="text" placeholder="Text smt."/>
          <button class="my-icon my-icon-search" type="submit"></button>
          <input class="my-icon my-icon-remove" type="reset" value="">
      </span>
  </form>
</div>

If you want to see the solution together with the codes, take a look at 
[this JSFiddle.](http://jsfiddle.net/yaprak/oaa1k4y2/)


Next, I'm gonna provide a solution showing a neat way to create a search box as you can find in Apple.com's website.
In the begining, there will be just a magnifier, and on click the input search box will open up.
 
