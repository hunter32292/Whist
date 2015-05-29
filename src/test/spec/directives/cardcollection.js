'use strict';

describe('Directive: cardCollection', function () {

  // load the directive's module
  beforeEach(module('angularWhistApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<card-collection></card-collection>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cardCollection directive');
  }));
});
