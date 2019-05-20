let bttnName;
let allImgs;
let selectedImgs;
let $currentImg;

function buttonClick(button){
	bttnName = button.id;

	$("#homeImg").hide();
	$(".container div").hide();
	$("div." +bttnName).show();

	selectedImgs=[];
	//creates a selection of slide urls maching menu id.
	$(allImgs).each(function(i){
		if($(this).hasClass(bttnName)) {
			selectedImgs.push($(this).children().prop('src'));
		}
	});
}

function initiliseButtons(){
	//Shows sellection of photos with class matching menu button id
	$('button').on('click',function(){
		buttonClick(this);
    });

	//Hides the photo grid and shows home img istead
	$("#home").on("click", function(){
		$("#homeImg").show();
	});
}

// finds index number of $currentImg in selectedImgs array
function matchSrc(src){
	console.log($currentImg.prop('src'));
     return src == $currentImg.prop('src');
 }

// cycels through the images inside slideshow slideshowDiv
function nextImg(index, slideshow){
	$(slideshow).eq(index).hide();

	if (++index >= slideshow.length){
		index = 0;
	}

	$(slideshow).eq(index).show();
	setTimeout(function(){ nextImg(index,slideshow) }, 3000);
}

function startSlideshow(slideshowHtml){
	let i = selectedImgs.findIndex(matchSrc);

	//finds element with maching index inside slideshowDiv and shows it
	let currentSlideshow= $(slideshowHtml).children();
	let visibleImg =$(currentSlideshow).eq(i);
	$(visibleImg).show();

	setTimeout(function(){ nextImg(i,currentSlideshow) }, 3000);
}

function openSlideshow(clickedImg){
	let slideshowDiv= $('<div id = slideshow></div>');
	let backgroungDiv= $('<div id = background></div>');
	$currentImg = $(clickedImg);

	if ( $('#slideshow').length > 0){
		$('#slideshow').empty();
	} else {
		$('body').append(backgroungDiv);
		$('body').append(slideshowDiv);
	}

	// inserts selection of slides into slideshow div
	$(selectedImgs).each(function() {
		$("#slideshow").append("<img src='"+this+"'>");
	});

	// and hides them
	$(slideshowDiv).children().hide();
	startSlideshow(slideshowDiv);
}

function slideshowNav(){
	//button navigation
}

$(document).ready(function(){

	allImgs = $('.container div').siblings();

	//Hides the photo grid
	$(".container div").hide();

	initiliseButtons();

	//Opens up a slideshow viewer
	$("img").on("click",function(){
		openSlideshow(this);
    });
})

/*To do:
	 - cycle through the array of selectedImgs (function to come up with, set interval)
	 (note:choose transition/animation from landscape to portrait)
	 - add pause on mouseenter and start on mouseleave, close on click.
  */
