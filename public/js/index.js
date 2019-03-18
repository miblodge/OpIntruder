
$(document).ready(function(){

  $(".container div").hide();

  var button = $("button");

  $('button').on('click',function(){
    var bttnName = this.id;

    console.log(bttnName);
        $("#homeImg").hide();
        $(".container div").hide();
        $("div." +bttnName).show();
  });

  $("#home").on("click", function(){
    $("#homeImg").show();
  });

$("img").on("click",function(){
  var newDiv=$('<div class = slideshow></div>');
  var divClass = $(this).parent().attr('class');


 if ( $('.slideshow').length > 0){
   $('.slideshow').empty();
   $(this).clone().prependTo('.slideshow');
 } else {
   $('body').append(newDiv);
   $(this).clone().prependTo(newDiv);
 }


  console.log(divClass);
});
});
