angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','$q','factory'];

function eventCrtFnt($scope, $log, auth, $window, factory){
    var i = 1;
    $scope.currentPresentation = factory.presentationCreation("","");

    $scope.newSlide = function(){
        $scope.currentPresentation.slidArray.push(factory.slidCreation("Titre de slide",""));
        var pikachu = factory.contentCreation('image','jpg','./img/'+i.toString()+'.jpg');
        i++;
        var lastSlide = $scope.currentPresentation.slidArray.pop();
        lastSlide.contentMap.push(pikachu);
        $scope.currentPresentation.slidArray.push(lastSlide);
        $scope.currentSlide = lastSlide;
    }


}

