var app = angular.module("my-awesome-app",[]);
app.controller('FilesListCtrl',function($scope, $http){ 
    $scope.repos = [];
    var counter = 1;
    $scope.loadRepos = function() {
        var url = 'https://api.github.com/users/aqfaridi/events?page='+counter+'&per_page=40';
        $http.get(url).success(function(data) {
            console.log(data);
            $scope.repos = $scope.repos.concat(data);
            counter += 1;
        });
    };
    $scope.loadRepos();
});

app.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        angular.element($(window)).bind("scroll", function() {
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            var body = document.body, html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});