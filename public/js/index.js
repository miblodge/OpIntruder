
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

});
