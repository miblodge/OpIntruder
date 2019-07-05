let bttnName;
let allImgs;
let selectedImgs;
let $currentImg;
let timing;

function imageSelection(){
	//creates a selection of slide urls maching menu id.
	selectedImgs=[];

	$(allImgs).each(function(i){
		if($(this).hasClass(bttnName)) {
			selectedImgs.push($(this).children().prop('src'));
		}
	});
}
// param button is a DOM object of a menu button
function buttonClick(button){
	bttnName = button.id;

	$("#homeImg").hide();
	$(".container div").hide();
	$("div." +bttnName).show();

	imageSelection();

	$('#slideshow').empty();

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
     return src == $currentImg.prop('src');
 }

function slideshowTiming(index, slideshow){
	timing = setTimeout(function(){ nextImg(index,slideshow)}, 3000);
}

function stopSlideshow(){
	clearTimeout(timing);
}

// cycels through the images inside slideshow
function nextImg(index, slideshow){

	$(slideshow).eq(index).hide();

	if (++index >= slideshow.length){
		index = 0;
	}
	$(slideshow).eq(index).show();
	$currentImg = $(slideshow).eq(index);
	timing = setTimeout(function(){ nextImg(index,slideshow)}, 3000);
}


function startSlideshow(slideshowHtml){
	$('#slideshow').children().hide();
	let i = selectedImgs.findIndex(matchSrc);

	//finds element with maching index inside slideshowDiv and shows it
	let $currentSlideshow= $(slideshowHtml).children();
	let visibleImg =$($currentSlideshow).eq(i);
	$(visibleImg).show();
	slideshowTiming(i, $currentSlideshow);
}



function play(){
	startSlideshow($("#slideshow"));
}

function pause(){
	stopSlideshow();
}

function prev(){
	stopSlideshow();
	let i = selectedImgs.findIndex(matchSrc);
	$('#slideshow').children().eq(i).hide();
	$('#slideshow').children().eq(i-1).show();
	$currentImg = $('#slideshow').children().eq(i-1);
}

function next(){
	stopSlideshow();
	let i = selectedImgs.findIndex(matchSrc);
	$('#slideshow').children().eq(i).hide();
	if (++i >= $('#slideshow').children().length){
		i = 0;
	}
	$('#slideshow').children().eq(i).show();
	$currentImg = $('#slideshow').children().eq(i);
}

function addSlideshowNav(){
	$('#nav').show();
}

function rmSlideshowNav(){
	$('#nav').hide();
}

//nav events to be refactored into a function

function initialiseNav(){
	$('#prev').on('click',function(){
		prev();
	});
	$('#pause').on('click',function(){
		pause();
	});
	$('#next').on('click',function(){
		next();
	});
	$('#play').on('click',function(){
		play();
	});
	$('#slideshow').on('mouseenter',addSlideshowNav);
	$('#background').on('mouseenter',rmSlideshowNav);
}

function appendNav(){
	let navDiv = $('<div id = nav></div>');
	let prev = $('<button id = prev>prev</button>');
	let pause = $('<button id =pause>pause</button>');
	let play = $('<button id = play>play</button>');
	let next = $('<button id = next>next</button>');

	$('body').append(navDiv);
	$('#nav').append(prev, pause,play,next);

		initialiseNav();
}

function openSlideshow(clickedImg){

	let slideshowDiv = $('<div id = slideshow></div>');
	let backgroundDiv = $('<div id = background></div>');
	let slideshowFrame = $('<div id = frame></div>');


	$currentImg = $(clickedImg);

	if($('#slideshow').length){
		$('#slideshow').show();
		$('#background').show();

	} else {
		$('body').append(backgroundDiv);
		$('body').append(slideshowDiv);
		$('body').append(slideshowFrame); //creates buffer left/right of slideshow for prev/next buttons.

		appendNav();
	}
	// inserts selection of slides into slideshow div
	$(selectedImgs).each(function() {
		$("#slideshow").append("<img src='"+this+"'>");
	});

	// and hides them

	startSlideshow($("#slideshow"));

	$(backgroundDiv).on('click', function(){
		$('#slideshow').hide();
		$('#background').hide();
		$('#frame').hide();
		stopSlideshow();
		$('#slideshow').empty();
	});
}

$(document).ready(function(){

	allImgs = $('.container div').siblings();

	//Hides the photo grid
	$(".container div").hide();

	initiliseButtons();

	//Opens up a slideshow viewer
	$(".container img").on("click",function(){
		openSlideshow(this);
    });

});

/*

 Features to add:
 - Navigation buttons for the slideshow.
 - mouse enter and mouse leave behaviour
 -  adding cgaphicons etc.
*/
