(function (sinon) {
  'use strict';

  describe('sinon-ng', function () {
    describe('fulfills()', function () {

      it('should exist', function () {
        expect(sinon.stub().fulfills).to.be.a('function');
      });

      it('should return a promise, resolved with the value', function () {
        var foo = {
          bar: function () {
          }
        };

        var stub = sinon.stub(foo, 'bar').fulfills('baz');
        return expect(foo.bar()).to.eventually.equal('baz')
          .then(function () {
            expect(stub).to.have.been.calledOnce;
          });
      });

      it('should work on bare stub', function () {
        var stub = sinon.stub().fulfills('baz');
        return expect(stub()).to.eventually.equal('baz')
          .then(function () {
            expect(stub).to.have.been.calledOnce;
          });
      });

      it('should work with the call api', function () {
        var foo = {
          bar: function () {
          }
        };

        sinon.stub(foo,
          'bar').onFirstCall().fulfills('baz').onSecondCall().fulfills('quux');
        return expect(foo.bar()).to.eventually.equal('baz').then(function () {
          return expect(foo.bar()).to.eventually.equal('quux');
        });
      });
    });

    describe('rejects', function () {

      it('should exist', function () {
        expect(sinon.stub().rejects).to.be.a('function');
      });

      it('should return a promise, rejected with the value', function () {
        var foo = {
          bar: function () {
          }
        };
        var stub = sinon.stub(foo, 'bar').rejects('baz');
        return expect(foo.bar()).to.eventually.be.rejectedWith('baz')
          .then(function () {
            expect(stub).to.have.been.calledOnce;
          });
      });

      it('should work on a bare stub', function () {
        var stub = sinon.stub().rejects('baz');
        return expect(stub()).to.eventually.be.rejectedWith('baz')
          .then(function () {
            expect(stub).to.have.been.calledOnce;
          });
      });
      
      it('should work with the call api', function () {
        var foo = {
          bar: function () {
          }
        };

        sinon.stub(foo,
          'bar').onFirstCall().rejects('baz').onSecondCall().rejects('quux');
        return expect(foo.bar()).to.eventually.be.rejectedWith('baz').then(function () {
          return expect(foo.bar()).to.eventually.be.rejectedWith('quux');
        });
      });
    });

    //TODO: add tests against angular-debaser
  });

})(window.sinon);
