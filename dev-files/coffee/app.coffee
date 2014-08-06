appYaprak = angular.module "yaprak", ["ui.router", "SVGApp", "AppCtrls"]

appYaprak.config( ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise("/")
  
  $stateProvider
  .state "home", {
    url: "/"
    templateUrl: "partials/home.html"
    controller: "HomeCtrl"
  }
  .state "projects", {
    url: "/projects"
    templateUrl: "partials/projects.html"
    controller: "ProjectsCtrl"
  }
  .state "education", {
    url: "/education"
    templateUrl: "partials/education.html"
    controller: "EducationCtrl"
  }
  .state "blog",{
    url: "/blog"
    templateUrl: "partials/blog.html"
    controller: "BlogCtrl"
  }
  .state "post", {
    url:  "/blog/post/:year/:month/:day/:title"
    templateUrl: ($stateParams) -> 
      console.log ("/blog/post/" + $stateParams.year + "/" + $stateParams.month + "/" + $stateParams.day + "/" + $stateParams.title + "/index.html");
      return ("/blog/post/" + $stateParams.year + "/" + $stateParams.month + "/" + $stateParams.day + "/" + $stateParams.title + "/index.html")
    controller: "PostCtrl"
  }
)

appCtrls = angular.module "AppCtrls", []
appCtrls.controller "HomeCtrl", [ ->
  console.log "Home Ctrl"
]

appCtrls.controller "MainCtrl", [ "$scope", "$location", ($scope, $location) ->
  $scope.isActive = (viewLocation) ->
    viewLocation is $location.path()
]

appCtrls.controller "EducationCtrl", [ "$scope", "$http", ($scope, $http) ->
  
  $http( {method: "GET", url: "data/education.json"} )
  .success (data,status, headers, config) ->
    $scope.mydata = data
  .error (topologyData, status, headers, config) ->
    console.log("Error in data fetch!");
]

appCtrls.controller "ProjectsCtrl", [ "$scope", "$http", ($scope, $http) ->

  $http( {method: "GET", url: "data/projects.json"} )
  .success (data,status, headers, config) ->
    $scope.mydata = data
  .error (topologyData, status, headers, config) ->
    console.log("Error in data fetch!");

]

appCtrls.controller "PostCtrl", ->
  console.log "PostCtrl"

