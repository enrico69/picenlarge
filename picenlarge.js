/**
 * 
 * Show the image beyond a HTML link. All the <a.. balise including an image
 * are affected.
 * The picture is displayed centered with a grey overlay.
 * 
 * @author Eric COURTIAL
 * @since 2013
 */

// Style of the background overlay
var bgStyle = "display: none;" +
    " position: absolute;" +
    " height: 100%;" +
    " width: 100%;" +
    " top: 0;" +
    " left: 0;" +
    " background: #000000;" +
    " z-index: 1;";
        
// Style of the enlarged image container
var largeStyle = "display: none;" +
    " position: absolute;" +
    " background: #FFFFFF;" +
    " padding: 5px;" +
    " z-index: 10;" +
    " min-height: 200px;" +
    " min-width: 200px;" +
    " color: #336699;";
    
// Style of the loading screen
var loadingStyle = 'font-weight: bold;' +
    ' font-size: large;' +
    ' line-height: 100px;' +
    ' height: 100px;' +
    ' width: 200px;' +
    ' background: black;' + 
    ' color: white;' +
    ' vertical-align: middle;' +
    ' text-align: center;' +
    ' display: none;' + 
    ' position: absolute;';
    
// The loading message
var loadingMessage = "Please wait...";

// Divs names
var divLoadingMessage = "divMessage"; // The loading message container
// The background overlay
var divBackgroundOverlay = "backgroundOverlay";
// The enlarged image container
var divLargerContainer = "largeContainer";

// Autoresize : not perfect
var blnAutoResize = true;

// Extensions to match
var extensionsToMatch = "/(jpg|gif|png)$/";

// Define the center function()
jQuery.fn.center = function(imgWidth, imgHeight) {

    elementId = $(this).attr('id');
    $("#" + elementId).css('margin-top', $(document).scrollTop());

    $(this).css("position", "absolute");
    var moveUp = ($(document).scrollTop() + ($(window).height() - imgHeight) / 2);
    $(this).css("top", moveUp);
    $(this).css("left", ($(window).width() - imgWidth) / 2 + "px");
    
    if( $(this).css('display') === "none") {
        $(this).css('display', 'block');
    }

    return $(this);
};

// Handle the loading message
// It's the place to be customized, for example setting a loading gif file...
function loadingMessageStatus(statut) {
    
    if (statut === "in") {
        $('#' + divLoadingMessage).append(loadingMessage);
        $('#' + divLoadingMessage).css('visibility', 'visible');
        $('#' + divLoadingMessage).center($('#' + divLoadingMessage).width(), $('#' + divLoadingMessage).height());
        
    } else if (statut === "out") {
        $('#' + divLoadingMessage).remove();
    }
}

$(document).ready(function() {
    
    // Will be the gray overlay in backgroud
    $("body").append('<div id="' + divBackgroundOverlay + '" style="' + bgStyle + '"></div>');
    // The container of the enlarged picture
    $("body").append('<div id="' + divLargerContainer + '" style="' + largeStyle + '"></div>');
    // The loading screen 
    $("body").append('<div id="' + divLoadingMessage + '" style="' + loadingStyle + ' "></div>');
    
    // Selector on every link with an image
    $('a:has(img)').click(function(){
        // Check if the link is targeting a picture
        if(eval(extensionsToMatch).test($(this).attr('href'))) {

            // Loading screen
            loadingMessageStatus("in");

            // Set the opacity of the overlay
            $("#" + divBackgroundOverlay).css({"opacity": "0.7"}).fadeIn("slow");

            var urlImage = $(this).attr("href");
            var imgTitle = $(this).children('img').attr('alt');
            var imgAlt = $(this).children('img').attr('alt');
            var img = new Image();

            // When the picture is loaded
            img.onload = function() {

                // Auto Resize?
                var resizeOrder = "";
                if(blnAutoResize) {
                    if($(window).width() < this.width || $(window).height() < this.height) {
                        var newScreenWidth = ($(window).width() * 0.75);
                        var ratio = this.width / newScreenWidth;
                        this.width = this.width / ratio;
                        this.height = this.height / ratio;

                        resizeOrder = ' width="' + this.width + '" height="' + this.height + '" ';
                    }
                }

                $("#" + divLargerContainer).html('<img ' + resizeOrder + 'src="' + urlImage + '" alt="' + imgAlt + '"/><br/>' + imgTitle)
                    .center(this.width, this.height)
                    .fadeIn("slow");
                loadingMessageStatus("out");
            };
            img.src = urlImage;
            return false;
        }
    });

    function fadeOut() {
        $("#" + divBackgroundOverlay).fadeOut("slow");
        $("#" + divLargerContainer).fadeOut("slow");
    }

    // Attach event to the click on overlay and the enlarged image
    $(document).on({
        click: function() {
            fadeOut();
        }
    }, '#' + divBackgroundOverlay);

    $(document).on({
        click: function() {
            fadeOut();
        }
    }, '#' + divLargerContainer);
});