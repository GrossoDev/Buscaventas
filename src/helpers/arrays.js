/* eslint-disable func-names */
/* eslint-disable no-extend-native */

Array.prototype.unique = function (predicate) {
  return this
    .filter((v1, i, a) => a.findIndex((v2) => predicate(v1) === predicate(v2)) === i);
};
