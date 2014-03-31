'use strict';

/**
 * 表单生成
 * */
angular.module("erp.common.directives", [])
        .directive("commonform", ["$compile", function($compile) {
            return {
                restrict: "E",
                scope: {
                    config: "=",
                    data: "="
                },
                replace: true,
                transclusion: true,
                compile: function(element, attrs, transclude) {
                    return {
                        pre: function($scope, iElement, iAttrs, controller) {
                            $scope.$on("commonForm.ready", function() {
                                var fm = new formMaker($scope);
                                var html = fm.makeHTML();
                                iElement.append($compile(html)($scope.$parent));
                                return;
                            });
                        }
                    };
                }
            };
        }])
        .directive("bill", ["$compile", function($compile){
            return {
                restrict: "E",
                replace: true,
                scope: {
                    config: "="
                },
                transclusion: true,
                compile: function(element, attrs, transclude) {
                    return {
                        pre: function($scope, iElement, iAttrs, controller) {
//                            $scope.$on("billForm.ready", function() {
                                var b = new billFormMaker($scope, $compile);
                                iElement.append($compile(b.makeHTML())($scope.$parent));
//                            });

                        }
                    };
                }
            };
        }])
        .directive("widgetbox", ["$compile", "$templateCache", "$rootScope", function($compile, $templateCache, $rootScope){
            return {
                restrict: "E",
                scope: {
                    wtitle: "="
                },
                replace: false,
                transclusion: true,
                compile: function(element, attrs){
                    var template = '<div class="widget-box">'+
                            '<div class="widget-header widget-header-flat"><h5>%(title)s</h5></div>'+
                            '<div class="widget-body"><div class="widget-main no-padding">%(inner)s</div></div>'+
                        '</div>';
                    element.html(sprintf(template, {
                        title : $rootScope.i18n.lang.widgetTitles[attrs.wtitle],
                        inner : element.html()
                    }));
                }
            };
        }])
        .directive("pageactions", ["$compile", function($compile){
            return {
                restrict: "E",
                templateUrl: 'views/common/actions/default.html',
                replace: false,
                transclude: true
            };
        }]);