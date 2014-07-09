expenseMeApp.controller("NewItemCtrl", function($scope, $location, $routeParams) {
	
	$scope.categories = categories; // categories are coming from constants.js
	
	var items = localStorage[itemsKey];
	if (items) {
		$scope.existingItems = JSON.parse(items);
	} else {
		$scope.existingItems = [];
	}
	
	var itemParam = $routeParams.itemName;
	if (itemParam) {
		for (i in $scope.existingItems) {
			if ($scope.existingItems[i].name === itemParam) {
				$scope.item = $scope.existingItems[i];
				$scope.update = true;
				break;
			}
		}
	} 
	if (!$scope.item) {
		$scope.item = {};
		$scope.updateItem = false;
	}
	
	$scope.$watch('item.name', function(newVal) {
		if ($scope.item.name && $scope.existingItems.indexOf($scope.item.name) > -1) {
			$scope.itemForm.name.$error.duplicate = true;
		} else {
			$scope.itemForm.name.$error.duplicate = false;
		}
	});
	
	$scope.$watch('item.price', function(newVal) {
		if (newVal) {
			$scope.itemForm.price.$invalid = isNaN(newVal);
		} else {
			$scope.itemForm.price.$invalid = false;
		}
	});
	
	$scope.hasEightItems = function() {
		return $scope.existingItems.length >= 8;
	};
	
	$scope.canBeSaved = function() {
		return $scope.item.name && !$scope.itemForm.name.$invalid && !$scope.itemForm.name.$error.duplicate && !$scope.itemForm.price.$invalid;
	};
	
	var updateItems = function(item, items) {
		items.push(item);
		localStorage[itemsKey] = JSON.stringify(items);
	};
	
	$scope.save = function() {
		updateItems($scope.item, $scope.existingItems);
		$location.path("/items");
	};
	
	$scope.saveAndClear = function() {
		updateItems($scope.item, $scope.existingItems);
		$scope.itemForm.$setPristine();
		$scope.item = {};
	};
	
	$scope.cancel = function() {
		$location.path("/items");
	};
	
	$scope.updateItem = function() {
		for (i in $scope.existingItems) {
			if ($scope.existingItems[i].name == $scope.item.name) {
				$scope.existingItems[i] = $scope.item;
				localStorage[itemsKey] = JSON.stringify($scope.existingItems);
				$location.path("/editItems");
				break;
			}
		}
	};
	
	$scope.deleteItem = function() {
		for (i in $scope.existingItems) {
			if ($scope.existingItems[i].name === $scope.item.name) {
				$scope.existingItems.splice(i, 1);
				localStorage[itemsKey] = JSON.stringify($scope.existingItems);
				$location.path("/editItems");
				break;
			}
		}
	}

});
