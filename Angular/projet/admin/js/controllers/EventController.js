angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','factory'];

function eventCrtFnt($scope, factory){
    var i = 1;
    $scope.currentPresentation = factory.presentationCreation("","");

    $scope.newSlide = function(){
        $scope.currentPresentation.slidArray.push(factory.slidCreation("Titre de slide",""));
        var image = factory.contentCreation('image','jpg','./img/'+i.toString()+'.jpg');
        i++;
        var lastSlide = $scope.currentPresentation.slidArray.pop();
        lastSlide.contentMap.push(image);
        $scope.currentPresentation.slidArray.push(lastSlide);
    };

    $scope.selectCurrentSlid=function(slide){
        $scope.currentSlide=slide;
    };

    $scope.isSlidContentEmpty=function(slid){
        if(slid.contentMap[0]== undefined){
            return true;
        }
        return false
    }


}

