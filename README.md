# Picenlarge

A simple JS library using jQuery, allowing to listen to every link using a picture and targeting another one, in order to display the targeted one centered in an overlay.

The idea is very simple, if you have big pictures but want to display only thumbnails linked to the big original pictures, use this library. 
## Installation

* You need to include jQuery to use this library.
    \<script src="jquery-2.1.0.min.js">\</script>
* The installation is very simple, just include it in your document
    \<script src="picenlarge.js">\</script>

* From this point, every link including a picture and targeting another picture will be handled by the library and display the picture in an grey overlay. An exemple of link : 
    \<a href="http://www.my-site.com"> \<img src="bmw.jpg" alt="Alt attribute" title="Title attribute"/> \</a>
