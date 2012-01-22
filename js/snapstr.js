jQuery(
  function(){
  // use jquery to hide social/control links
  // because if not then won't be displayed as
  // block when use .show() later in this script
  $("#controls a").hide();
  // Don't start photobooth until user clicks
  $("#start").click(function() {
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
        // We only want 4 pictures. Time to stop the loop and let user take action.
        if (snap === 4) {
          // Inform the user that photo session is done
          $("p.countdown").html("DONE");
          // Stop the interval loop
          clearInterval(countdown);
          // Display the photo booth pictures in a way that looks like it's coming out of actual photobooth
          $("#filmroll").slideDown(5000, function() {
            // Show the social share links, download and print buttons/icons
            $("#controls a").show();
            // Allow users to print the photo strip via print link/icon
            /* THIS WON'T LET ME SELECT THE PRINT ICON */
            $("#controls a").click(function() {
              window.print();
              
              return false();
            });
            $("#filmroll img").each(function(index) {
              var image = $(this).attr("src");
              $.ajax({
                type: "POST",
                url: "imagesave.php",
                data: "img=" + image
              });
            });
          });
          
          return false;
        }
        count = 4;  // 11
      }
      count--;
    }, 1000);
  });
});