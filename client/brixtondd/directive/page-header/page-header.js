angular.module('brixtondd').directive('pageHeader', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            title: '@'
		},
		templateUrl: 'directive/page-header/page-header.html',
		link: function(scope, element, attrs, fn) {


		}
	};
});
