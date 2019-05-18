let bttnName;
let allImgs;
let selectedImgs;
let currentImg;

// finds index number of currentImg in selectedImgs array
function matchSrc(src){
     return src == currentImg.prop('src');
   }

// cycels through the images inside slideshow slideshowDiv
function nextImg(index, slideshow){
  $(slideshow).eq(index).hide();

  if (++index >= slideshow.length){
   index = 0;
  }
  $(slideshow).eq(index).show();
  console.log(index+" "+slideshow.length);
  setTimeout(function(){ nextImg(index,slideshow) }, 3000);
}

$(document).ready(function(){

  allImgs = $('.container div').siblings();

//Hides the photo grid
  $(".container div").hide();

//Shows sellection of photos with class matching menu button id
  let button = $("button");

  $('button').on('click',function(){
    bttnName = this.id;

    console.log(bttnName);

        $("#homeImg").hide();
        $(".container div").hide();
        $("div." +bttnName).show();
  });


//Hides the photo grid and shows home img istead
  $("#home").on("click", function(){
    $("#homeImg").show();
  });

//Opens up a slideshow viewer
  $("img").on("click",function(){
    let slideshowDiv=$('<div id = slideshow></div>');
    currentImg = $(this);
    selectedImgs=[];

    if ( $('#slideshow').length > 0){
      $('#slideshow').empty();
    } else {
      $('body').append(slideshowDiv);
    }

    //creates a selection of slide urls maching menu id.
    $(allImgs).each(function(i){
      if($(this).hasClass(bttnName)) {
        selectedImgs.push($(this).children().prop('src'));
      }
    });

// inserts selection of slides into slideshow div
  $(selectedImgs).each(function() {
    $("#slideshow").append("<img src='"+this+"'>");
  });

// and hides them
  $(slideshowDiv).children().hide();

let i = selectedImgs.findIndex(matchSrc);
console.log(i);

//finds element with maching index inside slideshowDiv and shows it
let currentSlideshow= $(slideshowDiv).children();
let visibleImg =$(currentSlideshow).eq(i);
$(visibleImg).show();

setTimeout(function(){ nextImg(i,currentSlideshow) }, 3000);


 /*To do:
      - cycle through the array of selectedImgs (function to come up with, set interval)
      (note:choose transition/animation from landscape to portrait)
      - add pause on mouseenter and start on mouseleave, close on click.
   */
    });
})
