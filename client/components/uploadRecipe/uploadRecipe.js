angular.module('app')

.controller ('UploadRecipeCtrl', function ($timeout, get) {
  this.newRecipe = {};

  this.handlePhotoSubmit = () => {
    var addedPhotos = angular.element(document.querySelector("#imageUploads"))[0].files;
    console.log("addedPhotos", addedPhotos);  //(an obj={i:{name:xx, time:xx}})
    // addedPhotos = Array.prototype.slice.call(addedPhotos);
    //console.log(addedPhotos[0].name)  //[{}, {}, {}]


    var addedTags = angular.element(document.getElementsByName("yolo"))[0].value;
    this.newRecipe["Tags"] = addedTags.split(",");
    this.newRecipe["Photos"] = addedPhotos;
    console.log("reqObj", this.newRecipe);
    get.sendRecipe(this.newRecipe);
  };


  $timeout(function() {
    // code to execute after directives goes here
    $(".tm-input").tagsManager(
       { hiddenTagListName:"yolo" }
      );
  });

})

.component('uploadRecipe', {
  controller: 'UploadRecipeCtrl',
  templateUrl: 'client/components/uploadRecipe/uploadRecipe.html',

})