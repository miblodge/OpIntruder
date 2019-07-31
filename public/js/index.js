let bttnName;
let allImgs;
let selectedImgs;
let $currentImg;
let timing;
let slideshowRuning;

function imageSelection(){
	//creates a selection of slide urls maching menu id.
	selectedImgs=[];

	$(allImgs).each(function(i){
		if($(this).hasClass(bttnName)) {
			selectedImgs.push($(this).children().prop('src'));
		}
	});
}

function buttonClick(button){
	// shows image selection by maching button id to image class
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


function matchSrc(src){
	// finds index number of $currentImg in selectedImgs array
     return src == $currentImg.prop('src');
 }

function slideshowTiming(index, slideshow){
	// creates timing for the slideshow
	timing = setTimeout(function(){ nextImg(index,slideshow)}, 3000);
}

function stopSlideshow(){
	// stops timing function
	slideshowRuning = false;
	clearTimeout(timing);
}


function nextImg(index, slideshow){
// cycels through the images inside slideshow
	$(slideshow).eq(index).hide();

	if (++index >= slideshow.length){
		index = 0;
	}
	$(slideshow).eq(index).show();
	$currentImg = $(slideshow).eq(index);
	timing = setTimeout(function(){ nextImg(index,slideshow)}, 3000);
}


function startSlideshow(slideshowHtml){
	//starts the slideshow from a slide user clicked on
	$('#slideshow').children().hide();
	let i = selectedImgs.findIndex(matchSrc);
	slideshowRuning = true;

	//finds element with maching index inside slideshowDiv and shows it
	let $currentSlideshow= $(slideshowHtml).children();
	let visibleImg =$($currentSlideshow).eq(i);
	$(visibleImg).show();
	slideshowTiming(i, $currentSlideshow);
}

function play(){
	//plays the slideshow and hides navigation arrow buttons
	slideshowRuning = true;
	startSlideshow($("#slideshow"));
	switchPausePlay();
	$('#prev').fadeOut(2000);
	$('#next').fadeOut(2000);
	$('#nav').css('background','none');
}

function pause(){
	//pauses the slideshow and displays navigation arrow buttons
	stopSlideshow();
	slideshowRuning = false;
	switchPausePlay();
	$('#prev').fadeIn();
	$('#next').fadeIn();
	$('#nav').css('background-color', 'RGB(19, 170, 180 ,0.8)');
}

function prev(){
	// allows user to go to the previous slide one at a time
	stopSlideshow();
	let i = selectedImgs.findIndex(matchSrc);
	$('#slideshow').children().eq(i).hide();
	$('#slideshow').children().eq(i-1).show();
	$currentImg = $('#slideshow').children().eq(i-1);
}

function next(){
	// allows user to go to the next slide one at a time
	stopSlideshow();
	let i = selectedImgs.findIndex(matchSrc);
	$('#slideshow').children().eq(i).hide();
	if (++i >= $('#slideshow').children().length){
		i = 0;
	}
	$('#slideshow').children().eq(i).show();
	$currentImg = $('#slideshow').children().eq(i);
}

function switchPausePlay(){
	//shows relevant buttons depending if the slideshow is paused or playing

	if (slideshowRuning == true) {
		$('#play').hide();
		$('#pause').show();
	}

	if (slideshowRuning == false) {
		$('#pause').hide();
		$('#play').show();
	}
}

function initialiseNav(){
	// sets navigation functions for each button
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
}

function appendNav(){
	// creates navigation for slideshow
	let navDiv = $('<div id = nav></div>');
	let prev = $('<button id = prev class = prev ><i class="material-icons md-48">keyboard_arrow_left</i></button>');
	let pause = $('<button id =pause ><i class="material-icons md-48">pause</i></button>');
	let play = $('<button id = play ><i class="material-icons md-48">play_arrow</i></button>');
	let next = $('<button id = next class = next ><i class="material-icons md-48">keyboard_arrow_right</i></button>');
	let pausePlay =$('<div id=pausePlay></div>');
	$('body').append(navDiv);
	$('#nav').append(prev,next);
	$('body').append(pausePlay);
	$('#pausePlay').append(pause,play).hide();

		initialiseNav();
}

function openSlideshow(clickedImg){

	let slideshowDiv = $('<div id = slideshow class = slideshow ></div>');
	let backgroundDiv = $('<div id = background></div>');

	$currentImg = $(clickedImg);

// Checks if slideshow html elements exist and if not it adds them
	if($('#slideshow').length){
		$('#slideshow').show();
		$('#background').show();
		$('#nav').show();

	} else {
		$('body').append(backgroundDiv);
		appendNav();
		$('#nav').append(slideshowDiv);
	}
	// inserts selection of slides into slideshow div
	$(selectedImgs).each(function() {
		$("#slideshow").append("<img src='"+this+"'>");
	});

	startSlideshow($("#slideshow"));

	$(backgroundDiv).on('click', function(){
	// closes slideshow when user clicks outside the slideshow frame
		$('#slideshow').hide();
		$('#background').hide();
		$('#nav').hide();
		$('#pausePlay').hide();
		stopSlideshow();
		$('#slideshow').empty();
	});
	// hides and shows navigation on mouse entering and leaveing slideshow window
	$('#slideshow').on('mouseleave',function(){
		$('#pausePlay').css("visibility","hidden");
	});

	$('#slideshow').on('mouseenter',function(){
		$('#pausePlay').css("visibility","visible").show();
	});
	// prevents play and pause button from vanishing when mouse hovers over it
	$('#pausePlay').on('mouseenter',function(){
		$('#pausePlay').css("visibility","visible");
	});
	// hides navigation buttons
    $('#prev').hide();
	$('#next').hide();
	$('#nav').css('background','none');
	switchPausePlay();

}


$(document).ready(function(){

	allImgs = $('.container div').siblings();

	//Hides the photo grid
	$(".container div").hide();
	$("#pausePlay").hide();

	initiliseButtons();

	//Opens up a slideshow viewer
	$(".container img").on("click",function(){
		openSlideshow(this);
    });

});
