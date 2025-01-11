# Snapstr - HTML5 Photobooth

A simple web-based photobooth application that uses your device's camera to take photos and create a filmstrip-style collection of images.

## Browser Compatibility

This application uses the `getUserMedia` API which is now supported in all modern browsers. Compatible browsers include:
- Chrome 47+
- Firefox 36+
- Safari 11+
- Edge 12+
- Opera 34+

## Usage

1. When you first open the application, your browser will request permission to use your camera
2. Click "Click Here to Begin" to start the photobooth
3. Click the camera button to take a photo
4. Your photos will appear in the filmstrip at the bottom
5. You can:
   - Share photos directly to social media
   - Download individual photos
   - Print your photo collection

## Privacy Note

The application processes all photos locally in your browser - no images are uploaded to any server unless you choose to share them through the social media options.

## Development

This is a pure HTML5/JavaScript application with no build steps required. Simply serve the files through any web server to run the application.

## Credits

Originally inspired by:
- [Building an HTML5 Photo Booth (Ars Technica)](http://arstechnica.com/business/news/2012/01/hands-on-building-an-html5-photo-booth-with-chromes-new-webcam-api.ars)
