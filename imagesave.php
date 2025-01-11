<?php
	// requires php8
	define('UPLOAD_DIR', './pictures/');
	$dir = time();
  // Check if the directory already exists
  if (!is_dir(UPLOAD_DIR . $dir)) {
    mkdir(UPLOAD_DIR . $dir, 0755, true);
  }
	$post = $_POST['img'] ?? '';
	$images = explode('data:image/png;base64,', $post);
	$snapstr = UPLOAD_DIR . $dir . '/snapstr.png';
  if(!copy(UPLOAD_DIR . '/snapstr.png', $snapstr)) {
    print "IMAGE DUPLICATE FAILED";
    return FALSE;
  }
  $z = 100;
	foreach($images as $img) {
	  if (strlen($img) > 1) {
    	$img = str_replace(' ', '+', $img);
    	$data = base64_decode($img);
    	$file = UPLOAD_DIR . $dir . '/' . uniqid() . '.png';
    	$success = file_put_contents($file, $data);
    	// Create image instances
      $dest = imagecreatefrompng($snapstr);
      $src = imagecreatefrompng($file);
      $src = image_flip($src, 'horiz');
      $x = imagesx($src);
      $y = imagesy($src);
      // Copy and merge
      if(!imagecopy($dest, $src, 20, $z, 0, 0, $x, $y)) {
        print "IMAGE COPY FAILED";
        return FALSE;
      }
      $z = $z + imagesy($src) + 15;
      // Output and free from memory
      header('Content-Type: image/png');
      if(!imagepng($dest, $snapstr)) {
        print "IMAGE CREATE FAILED";
        return FALSE;
      }
      imagedestroy($dest);
      imagedestroy($src);	  
	  }
	}
  print $success ? '/' . $snapstr : 'Unable to save the file.';
	return false;

function image_flip($img, $type=''){
    $width  = imagesx($img);
    $height = imagesy($img);
    $dest   = imagecreatetruecolor($width, $height);
    switch($type){
        case '':
            return $img;
        break;
        case 'vert':
            for($i=0;$i<$height;$i++){
                imagecopy($dest, $img, 0, ($height - $i - 1), 0, $i, $width, 1);
            }
        break;
        case 'horiz':
            for($i=0;$i<$width;$i++){
                imagecopy($dest, $img, ($width - $i - 1), 0, $i, 0, 1, $height);
            }
        break;
        case 'both':
            for($i=0;$i<$width;$i++){
                imagecopy($dest, $img, ($width - $i - 1), 0, $i, 0, 1, $height);

            }
            $buffer = imagecreatetruecolor($width, 1);
            for($i=0;$i<($height/2);$i++){
                imagecopy($buffer, $dest, 0, 0, 0, ($height - $i -1), $width, 1);
                imagecopy($dest, $dest, 0, ($height - $i - 1), 0, $i, $width, 1);
                imagecopy($dest, $buffer, 0, $i, 0, 0, $width, 1);
            }
            imagedestroy($buffer);
        break;
    }
    return $dest;
}
?>