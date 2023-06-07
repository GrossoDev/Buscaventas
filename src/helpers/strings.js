/* eslint-disable func-names */
/* eslint-disable no-extend-native */

String.prototype.isEmptyOrWhitespace = function () {
  return this.trim().length === 0;
};
