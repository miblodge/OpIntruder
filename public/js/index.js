let bttnName;
let allImgs;
let selectedImgs;

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
    let slideshowDiv=$('<div class = slideshow></div>');
    let currentImg = $(this);

    if ( $('.slideshow').length > 0){
      $('.slideshow').empty();
      $(this).clone().prependTo('.slideshow');
    } else {
      $('body').append(slideshowDiv);
      $(this).clone().prependTo(slideshowDiv);
    }

//creates a selection of slides maching menu id.
selectedImgs=[];

$(allImgs).each(function(i){
/*  console.log(i+': '+$(this).attr('class'));*/
  if($(this).hasClass(bttnName)) {
    /*console.log('has class '+bttnName);*/
    //selectedImgs.push($(this).children().html());
    selectedImgs.push($(this).children().prop('src'));
  }
  });

   console.log(selectedImgs);
   console.log(currentImg.prop('src'));


function matchSrc(src){
     return src == currentImg.prop('src');
   }

let i = selectedImgs.findIndex(matchSrc);
console.log(i);

let prev = selectedImgs[i-1];
let next = selectedImgs[i+1];

console.log(prev);
console.log(next);

slideshowDiv.prepend("<img src='"+prev+"'>");
slideshowDiv.append("<img src='"+next+"'>");
 /*To do:
      - cycle through the array of selectedImgs (function to come up with, set interval)
      (note:choose transition/animation from landscape to portrait)
      - add pause on mouseenter and start on mouseleave, close on click.
   */
    });
})
