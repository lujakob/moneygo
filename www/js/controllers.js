angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup, Expenses, Categories, $rootScope) {
	// restore model state on init
	$rootScope.$broadcast('restorestate');
	$scope.expenses = Expenses.all();

	$scope.months = [{
		id: '2015-07',
		title: 'July 2015'
	},{
		id: '2015-06',
		title: 'June 2015'
	},{
		id: '2015-05',
		title: 'Mai 2015'
	},{
		id: '2015-04',
		title: 'April 2015'
	},{
		id: '2015-03',
		title: 'March 2015'
	}, {
		id: '2015-02',
		title: 'February 2015'
	}, {
		id: '2015-01',
		title: 'January 2015'
	}];

	$scope.categories = Categories.all();

	$scope.getAmountByCat = function(categoryId, date) {
		return Expenses.allByCategory(categoryId, date);
	};

	$scope.newAmount = function(categoryId){
		$scope.popupData = {};

		Date.prototype.yyyymmdd = function() {
			var yyyy = this.getFullYear().toString();
			var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
			var dd  = this.getDate().toString();
			return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1]? dd : '0' + dd[0]);
		};

		d = new Date();


		$scope.popupData = {
			date: d.yyyymmdd()
		};

		var expensePopup = $ionicPopup.show({
			template: '<label for="amount">Amount</label><input id="amount" type="text" type="number" ng-model="popupData.newExpenseAmount"><br><label for="date">Date</label><input type="text" ng-model="popupData.date">',
			title: 'Create new expense',
			subTitle: 'Please enter amount and category',
			scope: $scope,
			buttons: [
				{text: 'Exit'},
				{
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function(e){
						console.log($scope.popupData)
						if($scope.popupData.newExpenseAmount != '') {
							Expenses.add({
								amount: $scope.popupData.newExpenseAmount,
								category: parseInt(categoryId),
								date: $scope.popupData.date
							});
						}
					}
				}
			]
		});
	};
})

.controller('CategoriesCtrl', function($scope, $ionicPopup, Categories) {
	$scope.categories = Categories.all();

	$scope.newCategory = function(){
		$scope.popupData = {};
		var categoryPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="popupData.newCategoryTitle">',
			title: 'Create new category',
			subTitle: 'Please enter category title',
			scope: $scope,
			buttons: [
				{text: 'Exit'},
				{
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function(e){
						if($scope.popupData.newCategoryTitle != '') {
							Categories.add({title: $scope.popupData.newCategoryTitle});
						}
					}
				}
			]
		});
	};
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
