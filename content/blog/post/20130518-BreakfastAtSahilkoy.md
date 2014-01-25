---
kind: article
created_at: 2013-05-18 11:11 EET
title: Breakfast at Sahilköy
tags:
- english
- travel
- şile
- sahilköy
- sahilköy kahvesi
- 4000 maintenance of the motor
- motorcycle service
---

<%
	require 'exifr'

	def get_degree(value)
		degree = value[0].to_f + (value[1].to_f / 60) + (value[2].to_f / 3600)
	end

	def get_coords(img_path)
		lat = get_degree( EXIFR::JPEG.new(img_path).exif[:gps_latitude ] )
		lng = get_degree( EXIFR::JPEG.new(img_path).exif[:gps_longitude] )
		return {:lat => lat, :lng => lng}
	end

	$coords = {}
	def insert_marker(name, img_path)
		return if $coords[:name]
		$coords[:name] = get_coords(img_path)
	end

	$seen = {}
	def insert_pic(name, pics)
		pic_html = "<div class='row text-center'>"
		pic_html += "<a name='/#{name}'></a>" if $seen[:name]
		$seen[:name] = true
		pic_html += pics.map {|pic|
			insert_marker(name, pic[:path])
			"<span><a href='#/#{pic[:name]}/#{pic[:lat]}/#{pic[:lng]}'>" +
				"<img src='#{pic[:name]}' alt='#{pic[:alt]}'>" + 
			"</a></span>"
		}.join
		pic_html += "</div>"
		pic_html
  end
%>

<% 	def put_anchor(nameArr)
		name_html = "";
		for item in nameArr
			name_html += "<a name='/#{item[:name]}'></a>"
		end
		name_html
	end
%>

<% def insert_location(lat,lng, text)
		"<a class='location' href=\"#/" + lat.to_s + "/" + lng.to_s +  "\">" + text + "</a>"
	end	
%>

It was the Saturday morning. We woke up around half past ten and it all started with my single sentence: 
"Volkancığım, you're not gonna believe me but I'm not hungry right now." Cause, generally, even before washing my face, I open the refrigerator and have a bite to eat :) 

He said: 
_"Ok. Here is my plan: Lets go to motorcycle service for routine maintenance, then we shall have our breakfast somewhere there."_

I processed that information for a few seconds and prompted:
_"Lets have the motorbike serviced and have our breakfast at Sahilköy Kahvesi that we visited before."_


Within a few hours, we dressed up our motorcycle suits, prepared some food and we were 
<!-- <a href="#/41.03/29.051333333333332">yet another couple of motorcycles in the ultimate weekend traffic of Istanbul!</a> --> 

<!-- <%= insert_location(41.03,29.051333333333332, "yet another couple of motorcycles in the ultimate weekend traffic of Istanbul!"  ) %> -->

 
<%= 
	insert_pic( "start" ,[{:name => "1.jpg",
			:path => "content/blog/post/20130518-BreakfastAtSahilkoy#1.jpg", 
			:alt => "Where we start", 
			:lat => 41.03, :lng => 29.051333333333332}]) 
%> 


In an hour, we were at <%= insert_location(40.878996897862116 , 29.236679077148438, "the motorcycle service at  Kartal-Pendik.") %> 
<!-- <a href="#/40.878996897862116/29.236679077148438">the motorcycle service at  Kartal-Pendik.</a>  -->
All the repairmen where having their **lunches** while **were still haven't had our
breakfast's** yet :) It was around 13.00 :) that it was getting hard to suppress the hunger. 
Having the breakfast right there
viewing our motorcycle maintenance was an option but we decided to hang on for a few more hours. 
The peaceful Blacksea view, cool wind, cute dogs and chickens of Sahilköy Kahvesi was our strong leverage.

Finally, we're done with the motorcycle service and we are on our way to Sahilköy :) After 1.5 hour trip, we are there
and ready and hungry enough to have our breakfast. 

Incidentally, there was a local football tournament and that was the answer to the crowd there. Local people were interested on us, and we changed information about whereabouts, job title, the reason for visit :) then we all drawn into a new and tasty chat with local people. 
That is common in Turkey especially when you are at a village :) If they saw a guest at their village, they show their hospitality: offering whatever food they have, chatting with you and make you feel that you are a member of their family. For me, that is the best thing for trips. You meet new people, talk with them, learn how they live, what they do, how they think. You are welcomed to pick some fresh vegetables from their garden and eat them. We are generally offered fresh cow milk, and newly fermented cheese and yogurt. If you do not have a place to sleep they will gracefully offer you a bed :) When you offer even for a symbolic payment for all those help they will be upset and reject it.

Anyway, after the chat, we ordered tea and eat our food with a big big appetite :) In the mean time, we were also feeding the chickens with
 bread, cheese, sesame, plums, cherry, banana etc. and they eat all, sometimes fighting with each other to eat one others food. 
 Finally, we are full and sipping our tea and oralet.

 <%= 
 insert_pic( "sahilkoy", [
 	{ 	
	 	:name => "WeAreFull.jpg", 
		:path => "content/blog/post/20130518-BreakfastAtSahilkoy#WeAreFull.jpg",
		:alt => "Where we start", 
		:lat => 41.202666666666666, 
		:lng => 29.41283333333333
	},
	{	:name => "TeaAndOralet.jpg", 
		:path => "content/blog/post/20130518-BreakfastAtSahilkoy#TeaAndOjpg",
		:alt => "Tea and Oralet", 
		:lat => 41.202666666666666, 
		:lng => 29.41283333333333
	}
	]) 
%> 

We finished feeding them they were wandering around:) I though there were searching food, but there as an 
<a href="#/TheEgg.jpg/41.202666666666666/29.41283333333333">**egg**</a> there! Yay! Locals presented that egg to me :) When I took it it was warm! 


  <%= 
  	insert_pic( "sahilkoy2" , [
  	{
  		:name => "Chickens.jpg",
		:path => "content/blog/post/20130518-BreakfastAtSahilkoy#Chickens.jpg",
		:alt => "The chickens wandering around.", 
		:lat => 41.202666666666666, 
		:lng => 29.41283333333333
	},
	{
		:name => "TheEgg.jpg", 
		:path => "content/blog/post/20130518-BreakfastAtSahilkoy#TheEgg.jpg",
 		:alt => "That egg is warm!", 
		:lat => 41.202666666666666, 
		:lng => 29.41283333333333
	}
	]) 
 %> 

 Now, it is time to go! But one final task to do: Find a place to buy a Indian buffalo yogurt! 
 Well, note that, as a Turk it is funny to say **Indian Buffalo Yogurt** to **manda yoğurdu** :)
  We asked to local people and they directed us to 

 <%= insert_location(41.163833333333336, 29.2715, "Bozhane Village.") %>

 While we were leaving they were deeply talking about manda yoğurdu:

 _"I used to eat a lot of manda yoğurdu when I was a child! But now we sold all our Manda's."_


 _"İzmit-Kandıra is the best for manda and manda yoğurdu."_


 _"You know, manda yoğurdu is so intense that even you take the yoğurt container up-side-down it won't spill out! "_


 _"You know, the manda yoğurdu is chopped with a knife!"_


 _"The creamy part of the yoğurt is so intense!"_

 
 _"It is so fatty."_


<%= insert_pic( "bozhane" , 
[
	{ 
		:name => "MandaYogurdu.jpg",
      :path => "content/blog/post/20130518-BreakfastAtSahilkoy#MandaYogurdu.jpg",
      :alt => "Bozhane Village.",
		:lat => 41.163833333333336, 
		:lng => 29.2715
	}
]
)
%> 

Our final stop before home was the <a href="#/41.10341484314047/29.06810760498047">Kanlıca Square.</a>  We asked for a hot water and brewed out own tea: 
Hibiscus and supped it on the free banks at the square watching kids playing hide-and-seek:) 

 It was one of the nicest trip I've ever made. Now, I'm at home, eating my manda yoğurt with a honey dressing. 

Here are all the list of photos of our trip:

<center>
	<span id="chevron-left" ng-click="prev()" > 
			<i class="icon-chevron-left"></i> </span>	
	<span id="photoAlbum">
	 	<a id="imgRef" href="#/1.jpg/41.03/29.051333333333332"> 
	 		<img id="curImage" src="1.jpg" alt=""> 
	 	</a> 
	</span>
	<span id="chevron-right" ng-click="next()" > 
			<i class="icon-chevron-right"></i> </span>
</center>

<script>
var map = $("#map-mini");
var pic_list = []; 
var coords = [
<%=
	$coords.map{ |name, coord|
		"{name: '#{name}', lat: #{coord[:lat]}, lng: #{coord[:lng]}}"
	}.join(",")
%>
];
$.each(coords, function(coord) {
	pic_list.push(new Picture(coord, map));
})
</script>