angular.module('brixtondd').directive('pageHeader', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            title: '@',
            back: '='
		},
		templateUrl: 'directive/page-header/page-header.html',
		compile: function(template, attr) {
			if (!angular.isDefined(attr.back)) {
				angular.element(template[0]).find('a').remove();
			}
			return {
				post: function(scope, element, attrs) {
					if (scope.back !== undefined) {
			          scope.navBack = function() {
			            	window.history.back();
			          };
					}
				}
			}
		}
	};
});
