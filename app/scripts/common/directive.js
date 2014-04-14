'use strict';

/**
 * 表单生成
 * */
angular.module("erp.common.directives", ["erp.formMaker"])
        .directive("commonform", ["$compile", "FormMaker", function($compile, FormMaker) {
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
                                var fm = new FormMaker.makeForm($scope);
                                var html = fm.makeHTML();
                                iElement.append($compile(html)($scope.$parent));
                                return;
                            });
                        }
                    };
                }
            };
        }])
        .directive("inputfield", ["$compile", "FormMaker", function($compile, FormMaker){
            return {
                restrict: "E",
                replace: true,
                scope: {
                    config: "="
                },
                compile: function(element, attrs, transclude){
                    return {
                        pre: function($scope,iElement, iAttrs, controller){
                            var fieldDefine = $scope.$parent[iAttrs.config].fieldDefine;
                            var formMaker = new FormMaker.makeField($scope);
                            var html = formMaker.maker.factory($scope.$parent[iAttrs.config].context, fieldDefine, $scope);
                            
                            iElement.append($compile(html)($scope.$parent));
                        }
                    };
                }
            };
        }])
        .directive("select3", ["$compile", "FormMaker", function($compile,FormMaker){
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
                            var b = new FormMaker.select3($scope);
                            setTimeout(function(){
                                $(iElement).after($compile(b.makeHTML())($scope.$parent));
                                iElement.remove();
                            });
                            
                        }
                    };
                }
            };
        }])
        .directive("bill", ["$compile", "FormMaker", function($compile, FormMaker){
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
                            if($scope.config.isEdit) {
                                $scope.$on("bill.dataLoaded", function(evt, data){
                                    $scope.$parent.formMetaData = data;
                                    var b = new FormMaker.makeBill($scope);
                                    iElement.append($compile(b.makeHTML())($scope.$parent));
                                });
                            } else {
                                var b = new FormMaker.makeBill($scope);
                                iElement.append($compile(b.makeHTML())($scope.$parent));
                            }
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