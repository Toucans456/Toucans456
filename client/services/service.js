angular.module('app')

.service('get', function () {

  this.getRecipes = function (config, callback) {
    // --------------------FIX TO ADD USERNAME PARAMETER -stretch goal
    //Look below at getPhotos method to find out how

    axios.get('/api/recipes')
      .then(function (recipes) {
        callback(recipes.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };


  this.getRecipe = function(config, callback) {
      console.log('getPhotos config', config);
      axios.get('/api/recipe', {params: {config}
    })
    .then(function(responseObj) {
      console.log('Frontend GET photos success', responseObj);
      callback(responseObj);
    })
    .catch(function(err) {
      console.log('Frontend GET photos error', err);
    });
  };

  this.login = function (config, callback, failedAlert) {
    console.log('login is running');
    axios.get('/api/login', config)
      .then(function (token) {
        console.log('Frontend GET login success', token);
        callback(token);
      })
      .catch(function (err) {
        failedAlert();
        console.log('This is the error form logn', err);
      });
  };

  this.signUp = (config, callback, failedAlert) => {
    console.log(config)
    // post request to '/api/signup'
    axios.post('/api/signup', config)
      .then((token) => {
        callback(token);
      })
      .catch((error) => {
        failedAlert();
        console.log(error);
      });
  };

  this.uploadFileToUrl = function(file, uploadUrl){
    var fd = new FormData();
    fd.append('title', file.Title);
    fd.append('tags', file.Tags);

    // Append each photo to form
    for(var i =0; i < file.Photos.length; i++){
       fd.append('file', file.Photos[i]);
    }

    axios.post(uploadUrl, fd, {
      headers: {'Content-type': 'multipart/form-data'}
    })
    .then(function(file) {
      console.log('uploadFile sucess');
    })
    .catch(function(err) {
      console.error(err);
    });
  };

  this.getHomepage = function() {
    axios.get('/primary')
      .then((primaryView) => {
        console.log('Get Homepage primaryView', primaryView);
      })
      .catch((error) => {});
  };

  this.search = function(config, callback) {
    axios.get('/api/search', {
      params: {
        query: config.query
      }
    })
    .then(function(results) {
      callback(results.data);
    })
    .catch(function(err) {
      console.log(err);
    });
  };

});
