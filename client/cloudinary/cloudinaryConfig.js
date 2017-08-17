var cloudinary = require('cloudinary').v2;
//var envs = require('envs');
var cloudinary_key = process.env.DB_CLOUDINARY_API_KEY;
var cloudinary_sec = process.env.DB_CLOUDINARY_API_SECRET;
var cloudinary_name = process.env.DB_CLOUDINARY_API_NAME;

var uploads = {};

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_key,
  api_secret: cloudinary_sec
});

var uploadPhoto = function(inputfile) {
  let reterivedUrl;
  console.log('upload invoked');
  return cloudinary.uploader.upload(inputfile, // TODO: make image path dynamic
      // { // This sizing might be OK for primary view
      //   width: 2000,
      //   height: 1000,
      //   crop: "limit",
      //   effect: 'art:incognito',
      //   tags: ['endive', 'roquefort']
      // },
      { // This sizing might be OK for thumbnail views
        public_id: 'yolo',
        width: 300,
        height: 225,
        crop: "fit",
        effect: 'art:incognito', // 'auto_color' is a good effect, too.
        tags: ['endive', 'roquefort'] // TODO: make tags dynamic
      },
      function(error, image) {
        if (error) {
          console.log('CLOUDINARY ERROR', error);
        }

        waitForAllUploads('Endive Salad', error, image); // dynamic image title here

      });

  // Stores images to uploads object and logs them to the console
  function waitForAllUploads(id, err, image){
    uploads[id] = image;
    console.log('Uploaded image to Cloudinary. Response object: ', uploads[id]);
    console.log('Unique cloudinary image url (not secure): ', uploads[id].url);
    return uploads[id].url
  }



}

module.exports = {cloudinary, uploadPhoto}