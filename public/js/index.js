var bttnName;
var allImgs;
var selectedImgs;

$(document).ready(function(){

allImgs = $('.container div').siblings();

//Hides the photo grid
  $(".container div").hide();

//Shows sellection of photos with class matching menu button id
  var button = $("button");

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
    var slideshowDiv=$('<div class = slideshow></div>');
    var currentImg = $(this);

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
  console.log(i+': '+$(this).attr('class'));
  if($(this).hasClass(bttnName)) {
    console.log('has class '+bttnName);
    selectedImgs.push($(this).clone());
  }
  });

   console.log(selectedImgs);
    });
});
