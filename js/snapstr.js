jQuery(
  function(){
  // use jquery to hide social/control links
  // because if not then won't be displayed as
  // block when use .show() later in this script
  $("#controls a").hide();
  // Don't start photobooth until user clicks
  $("#start").click(function() {
    // The number of photos that will be taken
    var limit = 4;
    // The initial amount of time for countdown 
    var count = 3; // 10
    // Initiate counter for number of pictures to take
    var snap = 0;
    // Hide start button after user clicks it
    $(this).hide();
    // Set interval to loop every 1 second
    countdown = setInterval(function(){
      // Instead of printing '0' for countdown set variable to SNAP for branding
      if (count === 0) {
        count = "SNAP";
      }
      // Update visual countdown on page
      $("p.countdown").html(count);
      // reset count variable to '0' so it can be compared to math operaters
      if (count === "SNAP") {
        count = 0;
      }
      // Create beep sound for every 3,2,1
      if (count <= 3 && count != 0) {
        $('embed').remove();
        $('body').append('<embed src="/audio/beep.mp3" autostart="true" hidden="true" loop="false">');
      }
      else if ((count % 10 === 0) && count < 10) {
        // Counter has reached 0, time to take a picture
        $("#snap").click();
        $('embed').remove();
        // Create camera sound, users love camera sounds
        $('body').append('<embed src="/audio/camera1.wav" autostart="true" hidden="true" loop="false">');
        // FadeOut the video which shows white background
        $("#video video").fadeOut('fast');
        // FadeIn the video, this is a visual indicator that a photo was taken
        $("#video video").fadeIn('fast');
        // Increment snap to count number of pictures taken so far
        snap++;
        // We only want limit number of pictures. Time to stop the loop and let user take action.
        if (snap === limit) {
          // Inform the user that photo session is done
          $("p.countdown").html("DONE");
          // Stop the interval loop
          clearInterval(countdown);
          // Display the photo booth pictures in a way that looks like it's coming out of actual photobooth
          $("#filmroll").slideDown(5000, function() {
            // Initiate image string for POST
            var image = '';
            $("#filmroll img").each(function(index) {
              image = image + $(this).attr("src");
            });
            // Send all images to PHP file to be merged into single image and stored on server
            $.ajax({
              type: "POST",
              url: "imagesave.php",
              data: "img=" + image,
              success: function(data) {
                $("#controls a.download").attr({'href': data, 'target': '_blank'});
              }
            });
            // Show the social share links, download and print buttons/icons
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