var app = angular.module('mainApp', ['ngMask']);
app.controller('mainController',function($scope,$http){
	$scope.showCards = false;
	$scope.toolTip = false;


	var template = null

	VeLib.core.init().then((ok) => {
		console.log("Core init loaded");

		VeLib.public_templates.init().then( (status) => {
			console.log("Here it should say if i should display the buttons for un-initiated envelopes", status)
			console.log("This neeeds context creation", status.needsContextCreation)
			// This part should run only if neccessary and status needs creation of Envelope Context
			$scope.needsContextCreation = status.needsContextCreation

			//

			if (status.needsContextCreation) {
				VeLib.public_templates.getTemplateInterface().then((templates) => {
					console.log("received templates are", templates)

					template = templates[0]
				})
				// Create envelope context call instead of submit here.... PLEASE !!
			}

		})
	})

	$scope.finish = () => {
		console.log("After sending template data, additional options shold be displayed based on status or not")
		// if !$scope.needsContextCreation, disable the finish button and jump
	}

	// $scope.submit = () => {
	// 	$scope.busy = true
	// 	template.setData($scope.data)
	// 	VeLib.public_templates.submit().then((response) =>{
	// 		$scope.busy = false
	// 		console.log(response, "I should redirect to the signing page right now, right?");
	// 	})
	// }

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
