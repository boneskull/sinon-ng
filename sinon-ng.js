(function (sinon, angular) {
  'use strict';

  var injector = angular.injector(['ng']),
      $q = injector.get('$q');

  var proto = {
    fulfills: function fulfills(value) {
      return this.returns($q.when(value));
    },
    rejects: function rejects(value) {
      return this.returns($q.reject(value));
    }
  };

  sinon.extend(sinon.stub, proto);
  sinon.extend(sinon.behavior, proto);

})(window.sinon, window.angular);
