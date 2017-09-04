var app = angular.module('mainApp', []);
angular.module('mainApp').controller('mainController',function($scope, $http, $window) {

  // Only runs this if it passes auth / JWT token admission
  VeLib.core.init({})
  .then((ok) => { return VeLib.public_templates.init() })
  .catch(() => { $scope.initResult = "FALSE"})
  .then((status) => {
    $scope.needsContextCreation = status.needsContextCreation;
    return VeLib.public_templates.getTemplateInterface() })
  .then((templates) => { template = templates[0] })
  .then(() => {
    $scope.initResult = "TRUE"
  })

})
