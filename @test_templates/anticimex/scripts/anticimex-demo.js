var brreg = "http://data.brreg.no/enhetsregisteret/";
var ajvValidator = new window.Ajv({ v5: true, allErrors: true, useDefaults: true});

var app = angular.module('mainApp', []);
app.controller('mainController',function($scope,$http,BrReg){
	$scope.brreg = {};
	$scope.brreg.update = function(d) {
		$scope.data.orgNo         = d.organisasjonsnummer;
		$scope.data.customerName  = d.navn;
		$scope.data.postalAddress = d.forretningsadresse.adresse;
		$scope.data.postalCode    = d.forretningsadresse.postnummer;
		$scope.data.postalTown    = d.forretningsadresse.poststed;
		$scope.data.Country       = d.forretningsadresse.land;
		$scope.data.business      = d.naeringskode1.beskrivelse;
		$scope.data.businessCode  = d.naeringskode1.kode;
		$scope.data.InBrReg       = true;
		$scope.data.InFoReg       = d.registrertIForetaksregisteret == "J";
		$scope.data.InMvaReg      = d.registrertIMvaregisteret == "J";
		$scope.data.Konkurs       = d.konkurs == "J";
		$scope.data.Avvikling     = d.underAvvikling == "J";
		$scope.data.Tvangs        = d.underTvangsavviklingEllerTvangsopplosning == "J";
	};

	$scope.button = function(b) { $scope.data[b.set] = b.value; };

	$scope.lists               = {};
	$scope.data                = {};
	$scope.data.selectedBranch = 0;
	$scope.data.contracts      = [];
	$scope.data.contracts.push({product:'',description:'',count:'',price:''})
	$scope.data.products       = [];
	$scope.data.products.push({product:'',description:'',count:'',price:''})
	$scope.contents            = null;

	VeLib.core.init().then(() => {
		console.info("VeLib is ready", VeLib);
		VeLib.public_templates.getTemplateInterface()
		.then((templateObjectsArray) => {
			templateObjectsArray[0].setData({ "testField" : "Test template data" })
			// console.info(templateObjectsArray[0].getInfo()) // Info about the template from descriptor
			VeLib.public_templates.submit().then((url) => {
				// After submit and polling
			})
		});
	})
});

app.service('BrReg', function($q, $http){
	this.searchName = function(name) {
		var link = brreg + "enhet.json?page=0&size=10&$filter=startswith%28navn%2C%27" + encodeURIComponent(name) + "%27%29";
		var deferred = $q.defer();
		$http.get(link).then(function(d){
			deferred.resolve(d.data.data);
		}, function() {
			deferred.reject(arguments);
		});
		return deferred.promise;
	};
	this.searchNr = function(nr) {
		var link = brreg + "enhet/" + nr + ".json";
		var deferred = $q.defer();
		$http.get(link).then(function(d){
			deferred.resolve(d);
		}, function() {
			deferred.reject(arguments);
		});
		return deferred.promise;
	};
});

app.directive('keyboardPoster', function($parse, $timeout){
	var DELAY = 300;
	return {
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {
			var element = angular.element(elem)[0];
			var currentTimeout = null;

			element.oninput = function() {
				var model = $parse(attr.postFunction);
				var poster = model(scope);
				var value = angular.element(element).val();
				if ( value.length < 3 ) return;
				if ( currentTimeout ) $timeout.cancel(currentTimeout);
				currentTimeout = $timeout( function() { poster(value); }, DELAY);
			}
		}
	}
});

app.directive('getBrregNr', function($parse, $timeout, BrReg){
	var DELAY = 300;
	return {
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {
			var element = angular.element(elem)[0];
			var currentTimeout = null;

			element.oninput = function() {
				var value = angular.element(element).val();
				if ( !value.match(/^\d{9}$/) ) {
					ngModel.$setValidity('auto', false);
					return;
				}
				if ( currentTimeout ) $timeout.cancel(currentTimeout);
				currentTimeout = $timeout( function() {
					BrReg.searchNr(value).then(function(ret){
						if ( ret.data ) {
							scope.brreg.update(ret.data);
							ngModel.$setValidity("auto", true);
						} else {
							ngModel.$setValidity("auto", false);
						}
					})
				}, DELAY);
			}
		}
	}
});

app.directive('getBrregName', function($parse, $timeout, BrReg){
	var DELAY = 300;
	return {
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {
			var element = angular.element(elem)[0];
			var currentTimeout = null;

			element.oninput = function() {
				var model = $parse(attr.postFunction);
				var poster = model(scope);
				var value = angular.element(element).val();
				if ( value.length < 3 ) {
					ngModel.$setValidity('auto', false);
					return;
				}
				if ( currentTimeout ) $timeout.cancel(currentTimeout);
				currentTimeout = $timeout( function() {
					BrReg.searchName(value).then(function(list){
						scope.lists.BrRegDatalist = {};
						if ( !list ) {
							ngModel.$setValidity("auto", false)
						} else if ( list.length == 1 ) {
							scope.brreg.update(list[0]);
							ngModel.$setValidity("auto", true)
						} else list.forEach(function(item) {
							scope.lists.BrRegDatalist[item.navn] = item.organisasjonsnummer;
							ngModel.$setValidity("auto", true)
						});
					})
				}, DELAY);
			}
		}
	}
});

app.directive('instantValidator', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, ngModel) {
			function myValidation(value) {
				var schema = scope.schema[attr.step];
				var pattern = schema.properties[attr.model].pattern;
				if ( !pattern ) {
					ngModel.$setValidity('auto', true);
				} else if ( value.match(pattern) ) {
					ngModel.$setValidity('auto', true);
				} else {
					ngModel.$setValidity('auto', false);
				}
				return value;
			}
			ngModel.$parsers.push(myValidation);
		}
	};
});
