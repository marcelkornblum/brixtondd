angular.module('brixtondd').directive('pageHeader', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            title: '@',
            back: '@'
		},
		templateUrl: 'directive/page-header/page-header.html',
		link: function(scope, element, attrs, fn) {

		},
		compile: function(template, attr) {
			if (!angular.isDefined(attr.back)) {
				angular.element(template[0]).find('a').remove();
			}
		}
	};
});
