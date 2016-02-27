jQuery(document).ready(function() {


//Collapsing Header Effect

var header_height = jQuery('header').outerHeight();
var full_page_photo_height = jQuery('.full_page_photo').outerHeight();
var total_height = header_height + full_page_photo_height;
var nav = jQuery('.collapsing_header header');  

    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > full_page_photo_height) {
            nav.addClass("absolute");
	  nav.css( "top", full_page_photo_height ); 
        } else {
            nav.removeClass("absolute");
	  nav.css( "top", "0px" );
        }
    });
    
var window_top = jQuery(window).scrollTop();

if (window_top > full_page_photo_height) {
    nav.addClass("absolute");
	nav.css( "top", full_page_photo_height ); 
} else {
    nav.removeClass("absolute");
	nav.css( "top", "0px" );
}           

//UI to Top
jQuery().UItoTop({scrollSpeed:500});		//{ easingType: 'easeOutQuart' }
});
