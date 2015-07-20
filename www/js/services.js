angular.module('starter.services', [])

.factory('Categories', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var categories = [{
		id: 0,
		title: 'Supermarkt'
	}, {
		id: 1,
		title: 'Feierei'
	}, {
		id: 2,
		title: 'Klamotten'
	}];


	return {
		all: function() {
			return categories;
		},
		add: function(category) {
			categories.push({
				id: categories[categories.length-1].id,
				title: category.title
			});
		},
		remove: function(category) {
			categories.splice(categories.indexOf(category), 1);
		},
		get: function(categoryId) {
			for(var i=0; i<categories.length; i++) {
				if(categories[i].id == parseInt(categoryId)) {
					return categories[i];
				}
			}
			return null;
		}
	}
})

.factory('Expenses', function($rootScope) {
	//var expenses = [{
	//	category: 0,
	//	amount: 22
	//}, {
	//	category: 0,
	//	amount: 11
	//}, {
	//	category: 1,
	//	amount: 13
	//}];
	//var expenses = [];

	var service = {
		expenses: [],

		all: function() {
			return this.expenses;
		},
		add: function(expense) {
			this.expenses.push({
				amount: expense.amount,
				category: expense.category,
				date: expense.date
			});
			this.SaveState();
		},
		get: function(expenseId) {
			for(var i=0; i < this.expenses.length; i++) {
				if(this.expenses[i].id == parseInt(expenseId)) {
					return this.expenses[i];
				}
			}
			return null;
		},
		allByCategory: function(category, date) {
			this.RestoreState();
			var amountByCategory = 0;

			for(var i=0; i < this.expenses.length; i++) {
				var curDate = this.expenses[i].date.split('-');
				if(this.expenses[i].category == parseInt(category.id) && (curDate[0] + '-' + curDate[1] == date)) {
					amountByCategory = amountByCategory + parseInt(this.expenses[i].amount);
				}
			}
			return amountByCategory;
		},
		SaveState: function () {
			sessionStorage.expensesService = angular.toJson(this.expenses);
		},

		RestoreState: function () {
			this.expenses =  (typeof angular.fromJson(sessionStorage.expensesService) !== 'undefined') ? angular.fromJson(sessionStorage.expensesService) : [];
		}
	};

	$rootScope.$on("restorestate", this.RestoreState);

	return service;
});