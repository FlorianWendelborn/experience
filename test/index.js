var expect = require('expect.js');

var experience = require('../');

describe('travis test', function () {
	it('should work', function () {
		expect(experience('test')).to.be.ok();
	});
});
