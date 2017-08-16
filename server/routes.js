var cloudinary = require('cloudinary');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./../db/schema.js');

var app = express();
app.use(express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());

/////////////////////////////////////////////////////////////
/////////////////////// GET REQUESTS ///////////////////////
////////////////////////////////////////////////////////////

// Finds all users from the database
app.get('/api/users', (request, response) => {
  // TODO: fine-tune the findAll method when we incorporate User-Auth.
  db.User.findAll()
    .then((users) => {
      console.log(users);
      response.send(users);
    })
    .catch((error) => {
      response.send(error);
    });
});

// Finds all recipes from the database
app.get('/api/recipes', (request, response) => {
  // TODO: FIX TO FILTER BY USERNAME

  //query username to retrieve their recipeId's
  console.log('Server GET Recipes request', request.query);

  db.Recipe.findAll()
    .then((recipe) => {
      console.log(recipe);
      // response.send(recipe);
    })
    .catch((error) => {
      response.send(error);
    });
});

//Returns all photos that was associated with the recipe that was clicked on
app.get('/api/photos', (request, response) => {
  //the query contains title, (recipe)iD,  and UserId
  console.log('Server GET Photos request', request.query);

  db.Photo.findAll({
    where: {
      RecipeId: request.query.id
    }
  })
    .then(function(photos) {
      console.log('Server GET Photos success');
      response.send(photos)
    })
    .catch(function(error) {
      console.log('Server GET Photos error');
      response.send(error);
    })
});

//Returns all tags associated with the recipe that was clicked on
app.get('/api/tags', (request, response) => {
  console.log('Server GET Tags request', request.query);

  db.Tag.findAll({
    include: [{
      model: db.Recipe,
      where: {
        id: request.query.id
      }
    }]
  })
  .then(function(tags) {
    console.log('Server GET Tags success');
    response.send(tags);
  })
  .catch(function(error) {
    console.log('Server GET Tags error');
    response.send(error);
  })
});

//////////////////////////////////////////////////////////////
/////////////////////// POST REQUESTS ///////////////////////
/////////////////////////////////////////////////////////////

// Adds a recipe, desired tags, thumbnail url, and photos to the database
app.post('/api/recipes', (request, response) => {
  var userTags = [];
  request.body.Tags.forEach(tag => userTags.push(tag));

  var photoUrls = [];
  request.body.Photos.forEach(url => photoUrls.push(url));

  //UPDATE THIS TO HANDLE USERNAME
  db.Recipe.create({
    title: request.body.title,
    imageUrl: request.body.imageUrl,
    Photos: photoUrls,
    Tags: userTags
  }, {
    include: [ db.Tag, db.Photo ]  //UPDATE THIS TO HANDLE USERNAME
  })
  .then((recipeData) => {
    console.log('Server POST Recipe success');
    response.send(recipeData);
  })
  .catch((error) => {
    console.log('Server POST Recipe error');
    response.send(error);
  });
});

///////////////////////////////////////////////////////////////
/////////////////////// OTHER REQUESTS ///////////////////////
//////////////////////////////////////////////////////////////

// Deletes a recipe from the database
app.delete('/api/recipes', (request, response) => {
  db.Recipe.findAll({ title: request.body.title }) //use findAll here?
    .then((recipe)=> {
      console.log('Recipes is: ', recipes);
      return recipes[0].destroy();
    })
    .then(() => {
      console.log('Recipe DESTROYED.');
    });
});

module.exports = app;
