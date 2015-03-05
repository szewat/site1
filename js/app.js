// $(function(){
// 	$(".menus h3").on("click", function(e){
// 		// console.log(e);
// 		$(this).next("ul").toggleClass("open");
// 		e.preventDefault();
// 		return false;
// 	});
// });


// Inside the h3 click handler we created right at the start we must add in a call toupdateHeight(), 
//this way when we click to open a menu the variables are updated to reflect the change in height 
//of the document. Without this, if you open a menu on mobile the "loading" functionality would 
//be broken as the visibleHeight variable would be incorrect.
$(function(){
$('.menus h3').on('click', function(e) {
    $(this).next('ul').toggleClass('open');
    updateHeight();
    e.preventDefault(); return false;
});
});

// visibleHeight grabs the window height and subtracts that from the overall document height leaving 
//the height of the area that is currently visible in the users' browser

var visibleHeight = $(document).height() - $(window).height();
var items;

storeElements();
 
$(window).on('resize', function(e) {
    updateHeight();
});
 
$(window).on('scroll', function(e) {
    loadContent();
});

function storeElements() {
    items = $('.portfolio-item:lt(3)').clone();
    //Strip the first class from selection
    items.removeClass('first');
}

function updateHeight() {
    visibleHeight = $(document).height() - $(window).height();
}

function loadContent() {
 // Check if the scroll position is more than (scrolled past) or equal to (currently at) visibleHeight
    if($(window).scrollTop() >= visibleHeight) {
 // If it is, remove the scroll event handler from the window so we can process the content
        $(window).unbind('scroll');
 // Cache loading-wrap for use later        
        var loadingWrap = $('.loading-wrap');
 //Fade loading-wrap in and once the fade completes...        
        loadingWrap.fadeIn(function() {
            // ...set a small Timeout to simulate "loading" the content
            setTimeout(function() {
                // Attach our cloned items before the loading-wrap. This will slot in nicely 
                //between the loading icon and the current portfolio-items
                loadingWrap.before(items);
                // Hide loading-wrap and once hidden updateHeight, storeElements and re-attach 
                //the scroll event to the window with instructions to run this function again
                loadingWrap.hide(function() {
                    updateHeight();
                    storeElements();
                    $(window).on('scroll', function() { loadContent(); });
                });
            }, 500);
        });
 
    }
}

