
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

  $('body').append(newDiv);

//  if ( $('body').has(newDiv)){
//    newDiv.empty();
//  }; not executing this

  $(this).prependTo(newDiv);
  console.log(divClass);
});
});
