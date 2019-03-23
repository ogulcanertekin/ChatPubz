app.controller('chatController',['$scope',($scope)=>{
    $scope.activeTab = 2;

    $scope.changeTab = (tab)=>{                                 //Chats-Online Users Tab
        $scope.activeTab=tab;
    };

    const socket = io.connect("http://localhost:3000");
}]);