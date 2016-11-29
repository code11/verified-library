var app = angular.module('mainApp', ['ngMask']);
app.controller('mainController',function($scope,$http){
	$scope.showCards = false;
	$scope.toolTip = false;

	VeLib.core.init().then((ok) => {
		console.log("Core init loaded");
		VeLib.public_templates.getTemplateInterface().then((templates) => {
			templates[0].setData({"test":"testsSendingData"});
			// VeLib.public_templates.submit().then((response) =>{
			// 	console.log(response, "Finished submitting template data for everything");
			// })
		})
	})

	var cards = ["Card_A","Card_B","Card_C","Card_D","Card_E","Card_F"];
	if ( !$scope.data ) { // Don't init if we have forwarded data
		$scope.data = {};
		$scope.data.OrgNr = '';
		$scope.data.PDF_Invoice = true;
		$scope.data.Client_Portal = true;
		cards.forEach(function(card) {
			$scope.data[card] = 0;
		});
	} else {
		$scope.data.Status = "Filling";
	}
	$scope.countCards = function() {
		var n=0;
		cards.forEach(function(card) {
			n += $scope.data[card];
		});
		console.log("N: ", n)
		$scope.nCards = n;
	}
	$scope.sign = function() {
		$scope.data['Status'] = 'Sign';
		console.log("Submit: ", $scope.data);
	}
	$scope.forward = function() {
		$scope.data['Status'] = 'Forward';
		console.log("Submit: ", $scope.data);
	}
	$scope.forwarded = function() {
		$scope.data['Status'] = 'Forwarded';
		console.log("Submit to email: ", $scope.email, $scope.data);
	}
});
