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
	console.log($currentImg.prop('src'));
     return src == $currentImg.prop('src');
 }

function slideshowTiming(index, slideshow){
	console.log('slideshowTiming');
	timing = setTimeout(function(){ nextImg(index,slideshow)}, 3000);
}

function stopSlideshow(){
	clearTimeout(timing);
}

// cycels through the images inside slideshow slideshowDiv
function nextImg(index, slideshow){
	console.log('inside nextImg');
	console.log($(slideshow));

	$(slideshow).eq(index).hide();

	if (++index >= slideshow.length){
		console.log('inside if');
		index = 0;
	}
	$(slideshow).eq(index).show();
	timing = setTimeout(function(){ nextImg(index,slideshow)}, 3000);
}

function startSlideshow(slideshowHtml){
	$('#slideshow').children().hide();
	console.log('startSlideshow');
	let i = selectedImgs.findIndex(matchSrc);
	console.log(i);
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
}

function next(){
	stopSlideshow();
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

function openSlideshow(clickedImg){
	console.log('fn openSlideshow');
	let slideshowDiv = $('<div id = slideshow></div>');
	let backgroundDiv = $('<div id = background></div>');

	let slideshowFrame = $('<div id = frame></div>');
	let navDiv = $('<div id = nav></div>');
	let prev = $('<button id = prev>prev</button>');
	let pause = $('<button id =pause>pause</button>');
	let play = $('<button id = play>play</button>');
	let next = $('<button id = next>next</button>');


	$currentImg = $(clickedImg);

	if($('#slideshow').length){
		$('#slideshow').show();
		$('#background').show();

	} else {
		$('body').append(backgroundDiv);
		$('body').append(slideshowDiv);
		$('body').append(navDiv);
		$('body').append(slideshowFrame); //creates buffer left/right of slideshow for prev/next buttons.
		$('#nav').append(prev, pause,play,next);
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
		stopSlideshow();
		$('#slideshow').empty();
	});

	initialiseNav();
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
