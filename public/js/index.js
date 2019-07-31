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
	slideshowRuning = false;
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
	slideshowRuning = true;

	//finds element with maching index inside slideshowDiv and shows it
	let $currentSlideshow= $(slideshowHtml).children();
	let visibleImg =$($currentSlideshow).eq(i);
	$(visibleImg).show();
	slideshowTiming(i, $currentSlideshow);
}

function play(){
	slideshowRuning = true;
	startSlideshow($("#slideshow"));
	switchPausePlay();
	$('#prev').fadeOut(2000);
	$('#next').fadeOut(2000);
	$('#nav').css('background','none');
}

function pause(){
	stopSlideshow();
	slideshowRuning = false;
	switchPausePlay();
	$('#prev').fadeIn();
	$('#next').fadeIn();
	$('#nav').css('background-color', 'RGB(19, 170, 180 ,0.8)');
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

function switchPausePlay(){

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

	// and hides them

	startSlideshow($("#slideshow"));
// closes slideshow when user clicks outside the slideshow frame
	$(backgroundDiv).on('click', function(){
		$('#slideshow').hide();
		$('#background').hide();
		$('#nav').hide();
		$('#pausePlay').hide();
		stopSlideshow();
		$('#slideshow').empty();
	});

	$('#slideshow').on('mouseleave',function(){
		$('#pausePlay').css("visibility","hidden");
	});

	$('#slideshow').on('mouseenter',function(){
		$('#pausePlay').css("visibility","visible").show();
	});

		//$('#pausePlay').on('mouseleave',function(){
		//	$('#pausePlay').prop("visibility","hidden");
		//});

		$('#pausePlay').on('mouseenter',function(){
			$('#pausePlay').css("visibility","visible");
		});

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
