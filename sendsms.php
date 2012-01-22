<?php
require('libraries/Services/Twilio.php');

$send = "http://$_SERVER['SERVER_NAME'].$_POST['path']";

// I need to get a valid Phone Number from Twilio
$client = new Services_Twilio('AC1749fa8577da41a28ba9663c60d34fa1', '79a70079d05a2660375e457df3347436');
$message = $client->account->sms_messages->create(
  '+14085551234', // From a Twilio number in your account
  "$_POST['phone']", // Text any number
  "Here's your booth photos from Snapstr&#153; - $send"
);

print $message->sid;
return FALSE;