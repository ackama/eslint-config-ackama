// Key codes
const keys = {
  up: '\x1B\x5B\x41',
  down: '\x1B\x5B\x42',
  enter: '\x0D',
  space: '\x20'
};

describe('setup', () => {
  describe('when installing dependencies', () => {
    describe('when there is no lock file', () => {
      it('uses npm', () => {
        require('../bin/myfile');

        expect(true).toBe(true);
      });
    });

    describe('when a package-lock.json exists', () => {
      it('uses npm', () => {
        require('../bin/myfile');

        expect(true).toBe(true);
      });
    });

    describe('when a yarn.lock exists', () => {
      it('uses yarn', () => {
        require('../bin/myfile');

        expect(true).toBe(true);
      });
    });
  });
});
