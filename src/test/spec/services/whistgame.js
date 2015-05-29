'use strict';

describe('Service: whistGame', function () {

  // load the service's module
  beforeEach(module('angularWhistApp'));

  // instantiate service
  var whistGame;
  beforeEach(inject(function (_whistGame_) {
    whistGame = _whistGame_;
  }));

  it('should do something', function () {
    expect(!!whistGame).toBe(true);
  });

});
