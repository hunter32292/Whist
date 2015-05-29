'use strict';

describe('Service: whistShark', function () {

  // load the service's module
  beforeEach(module('angularWhistApp'));

  // instantiate service
  var whistShark;
  beforeEach(inject(function (_whistShark_) {
    whistShark = _whistShark_;
  }));

  it('should do something', function () {
    expect(!!whistShark).toBe(true);
  });

});
