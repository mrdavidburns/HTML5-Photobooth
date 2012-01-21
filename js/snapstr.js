jQuery(
  function(){
  $("#controls a").hide();
  //$("a.print")
  $("#start").click(function() { 
    var count = 3; // 10
    var snap = 0;
    $(this).hide();
    countdown = setInterval(function(){
      if (count === 0) {
        count = "SNAP";
      }
      $("p.countdown").html(count);
      if (count === "SNAP") {
        count = 0;
      }
      if (count <= 3 && count != 0) {
        $('embed').remove();
        $('body').append('<embed src="/audio/beep.mp3" autostart="true" hidden="true" loop="false">');
      }
      else if ((count % 10 === 0) && count < 10) {
        $("#snap").click();
        $('embed').remove();
        $('body').append('<embed src="/audio/camera1.wav" autostart="true" hidden="true" loop="false">');
        $("#video video").fadeOut('fast');
        $("#video video").fadeIn('fast');
        snap++;
        if (snap === 4) {
          $("p.countdown").html("DONE");
          clearInterval(countdown);
          $("#filmroll").slideDown(5000, function() {
            $("#controls a").show();
          });
          
          return false;
        }
        count = 4;  // 11
      }
      count--;
    }, 1000);
  });
});