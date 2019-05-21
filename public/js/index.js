let bttnName;
let allImgs;
let selectedImgs;
let $currentImg;
let timing;

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
	timing = setTimeout(function(){ nextImg(index,slideshow)}, 3000);
}

function stopSlideshow(){
	clearTimeout(timing);
}

// cycels through the images inside slideshow slideshowDiv
function nextImg(index, slideshow){
console.log('inside nextImg');
console.log('$slideshow; '+$(slideshow).length);
	$(slideshow).eq(index).hide();

	if (++index >= slideshow.length){
		console.log('inside if');
		index = 0;
	}
	console.log('$slideshow; '+$(slideshow));
	$(slideshow).eq(index).show();
	slideshowTiming(index, slideshow);
}

function startSlideshow(slideshowHtml){
	console.log('startSlideshow');
	let i = selectedImgs.findIndex(matchSrc);
	console.log(i);
	//finds element with maching index inside slideshowDiv and shows it
	let currentSlideshow= $(slideshowHtml).children();
	let visibleImg =$(currentSlideshow).eq(i);
	$(visibleImg).show();
	console.log(currentSlideshow);
	console.log(visibleImg);
	slideshowTiming(i, currentSlideshow);
}

function openSlideshow(clickedImg){
	let slideshowDiv= $('<div id = slideshow></div>');
	let backgroundDiv= $('<div id = background></div>');
	$currentImg = $(clickedImg);

if($('#slideshow').length){
	$('#slideshow').show();
	$('#background').show();

} else {
	$('body').append(backgroundDiv);
	$('body').append(slideshowDiv);
}

	$(backgroundDiv).on('click', function(){
		$('#slideshow').hide();
		$('#background').hide();
		stopSlideshow();
	});
	// inserts selection of slides into slideshow div
	$(selectedImgs).each(function() {
		$("#slideshow").append("<img src='"+this+"'>");
	});

	// and hides them
	$('#slideshow').children().hide();
	startSlideshow(slideshowDiv);
}

//function slideshowNav(){
//add slideshow navigation
//}



$(document).ready(function(){

	allImgs = $('.container div').siblings();

	//Hides the photo grid
	$(".container div").hide();

	initiliseButtons();

	//Opens up a slideshow viewer
	$("img").on("click",function(){
		openSlideshow(this);
    });

});

/*
Current issues:

- after user stops slideshow and clicks on another img slideshow is not appearin.
slideshow div is empty and does not refill.
 - When user presses anothe rmenu button the slideshow doesn't start.
 The backgroun dimage does appear so issue must be with selected img array
 or with slideshowdiv content.

 Features to add:
 - Navigation buttons for the slideshow.
 - mouse enter and mouse leave behaviour
 -  adding cgaphicons etc.
*/
