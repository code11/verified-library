var app = angular.module('mainApp', ['ngMask']);
app.controller('mainController',function($scope, $http, $window){
	$scope.showCards = false;
	$scope.toolTip = false;


	var template = null
	$scope.recipient = {}
	$scope.signUrl = null

	// Load this as soon as possible, it fetches all the data from remote and sets up auth
	VeLib.core.init()
	.then((ok) => {
		// Only need this when using public template
		return VeLib.public_templates.init()
	})
	.then( (status) => {
		// returns a status object with a needsContextCreation property
		$scope.needsContextCreation = status.needsContextCreation

		// Need this if you want to display something else based on the fact the
		// form is forwarded..if it's forwarded this will return false

		return VeLib.public_templates.getTemplateInterface() })
	.then((templates) => {
		// One template returned only, so we make all the necessary calls on that and we store it in
		// the current context

		template = templates[0]
	})

	$scope.submitRecipient = () => {
		$scope.busy= true
		// console.log("After sending template data, additional options shold be displayed based on status or not ?")
		// if !$scope.needsContextCreation, disable the finish button and jump
		template.setData($scope.data)
		// we set the userData for the template only now, since we want to defer
		// everything until the user has completed everything including the 'who he is part' or
		// forwarded depending on choice

		VeLib.public_templates.submitFormData()
		.then(() => { return VeLib.public_templates.getAvailableSigningMethods()})
		// after submitting the data, we query the template for the available signing methods
		.then((availableMethods) => {
			console.log("i'm in available methods, i selected", availableMethods[0])
			return template.addRecipient({
				// We fetch this info from the scope to complete signatory data

				email        : $scope.recipient.email,
				familyName   : $scope.recipient.familyName,
				givenName    : $scope.recipient.givenName,
				// we chose one, ( usually just 1 for 99% of the cases)
				signingMethod: availableMethods[0]
			})
		})
		// We publish it only if we are not going to forward it.
		.then(() => { console.log("i'm in publish"); return VeLib.public_templates.publish()})
		// Now i get the url for redirect if .publish called, othwise we do something
		// after the  VeLib.public_templates.forware({recipient}), in the UI ( display message or whatever )
		.then((url) => {
			console.log("got sign url", url)
			$scope.busy = false
			$scope.signUrl = url
			$scope.$digest()
		})
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

	$scope.forward = function() {
		$scope.data['Status'] = 'Forward';
	}
	$scope.forwarded = function() {
		$scope.data['Status'] = 'Forwarded';
		console.log("Submit to email: ", $scope.email, $scope.data);
	}
});
