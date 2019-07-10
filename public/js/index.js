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
function pausePlay(){

}
function showPause(){

	$('#pause').show();
}

function hidePause(){
	$('#pause').hide();
}

function showPlay(){
	$('#play').show();
}

function hidePlay(){
	$('#play').hide();
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

	$('#slideshow').on('mouseleave',$('#pausePlay').hide());
	$('#slideshow').on('mouseenter',$('#pausePlay').show());
}

function appendNav(){
	let navDiv = $('<div id = nav></div>');
	let prev = $('<button id = prev class = prev ><i class="material-icons md-48">keyboard_arrow_left</i></button>');
	let pause = $('<button id =pause ><i class="material-icons md-48">pause</i></button>');
	let play = $('<button id = play ><i class="material-icons md-48">play_arrow</i></button>');
	let next = $('<button id = next class = next ><i class="material-icons md-48">keyboard_arrow_right</i></button>');
	let pausePlay =$('<div id=pausePlay></div>');
	$('body').append(navDiv);
	$('#nav').append(prev,next);
	$('body').append(pausePlay);
	$('#pausePlay').append(pause,play);

		initialiseNav();
}

function openSlideshow(clickedImg){

	let slideshowDiv = $('<div id = slideshow class = slideshow ></div>');
	let backgroundDiv = $('<div id = background></div>');

	$currentImg = $(clickedImg);

	if($('#slideshow').length){
		$('#slideshow').show();
		$('#background').show();
		$('#nav').show();
		$('#pausePlay').show();

	} else {
		$('body').append(backgroundDiv);
		appendNav();
		$('#nav').append(slideshowDiv);
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
		$('#nav').hide();
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
