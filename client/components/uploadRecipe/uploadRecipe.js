angular.module('app')

.controller ('UploadRecipeCtrl', function ($timeout, get) {
  this.newRecipe = {};

  this.handlePhotoSubmit = () => {
    var el = angular.element(document.querySelector("#imageUploads"))[0].files[0];
    console.log("el", el);
    var x = angular.element(document.getElementsByName("yolo"))[0].value;
    this.newRecipe["tags"] = x.split(",");
    console.log(this.newRecipe);
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