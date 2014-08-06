var appCtrls, appYaprak;

appYaprak = angular.module("yaprak", ["ui.router", "SVGApp", "AppCtrls"]);

appYaprak.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  return $stateProvider.state("home", {
    url: "/",
    templateUrl: "partials/home.html",
    controller: "HomeCtrl"
  }).state("projects", {
    url: "/projects",
    templateUrl: "partials/projects.html",
    controller: "ProjectsCtrl"
  }).state("education", {
    url: "/education",
    templateUrl: "partials/education.html",
    controller: "EducationCtrl"
  }).state("blog", {
    url: "/blog",
    templateUrl: "partials/blog.html",
    controller: "BlogCtrl"
  }).state("post", {
    url: "/blog/post/:year/:month/:day/:title",
    templateUrl: function($stateParams) {
      console.log("/blog/post/" + $stateParams.year + "/" + $stateParams.month + "/" + $stateParams.day + "/" + $stateParams.title + "/index.html");
      return "/blog/post/" + $stateParams.year + "/" + $stateParams.month + "/" + $stateParams.day + "/" + $stateParams.title + "/index.html";
    },
    controller: "PostCtrl"
  });
});

appCtrls = angular.module("AppCtrls", []);

appCtrls.controller("HomeCtrl", [
  function() {
    return console.log("Home Ctrl");
  }
]);

appCtrls.controller("MainCtrl", [
  "$scope", "$location", function($scope, $location) {
    return $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }
]);

appCtrls.controller("EducationCtrl", [
  "$scope", "$http", function($scope, $http) {
    return $http({
      method: "GET",
      url: "data/education.json"
    }).success(function(data, status, headers, config) {
      return $scope.mydata = data;
    }).error(function(topologyData, status, headers, config) {
      return console.log("Error in data fetch!");
    });
  }
]);

appCtrls.controller("ProjectsCtrl", [
  "$scope", "$http", function($scope, $http) {
    return $http({
      method: "GET",
      url: "data/projects.json"
    }).success(function(data, status, headers, config) {
      return $scope.mydata = data;
    }).error(function(topologyData, status, headers, config) {
      return console.log("Error in data fetch!");
    });
  }
]);

appCtrls.controller("PostCtrl", function() {
  return console.log("PostCtrl");
});
