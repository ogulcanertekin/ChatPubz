app.controller('chatController',['$scope',($scope)=>{
    $scope.onlineList=[];
    $scope.activeTab = 2;

    $scope.changeTab = (tab)=>{                                 //Chats-Online Users Tab
        $scope.activeTab=tab;
    };

    const socket = io.connect("http://localhost:3000");

    socket.on('onlineList',users=>{
        $scope.onlineList=users;
        $scope.$apply();
    });
}]);