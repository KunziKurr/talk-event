module.exports = function (phone) {
  var phone = phone
    .toString()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s/g, '');
  var transformedPhone = phone;

  if (phone.length == 9) {
    transformedPhone = '254' + transformedPhone;
  }
  if (phone.length === 10) {
    transformedPhone = '254' + transformedPhone.substring(1);
  }
  if (phone.length == 12) {
    transformedPhone = '254' + transformedPhone.substring(3);
  }
  if (
    phone.length == 13 &&
    transformedPhone.indexOf('+') > -1 &&
    transformedPhone.indexOf('+') == 0
  ) {
    transformedPhone = '254' + transformedPhone.substring(4);
  }
  return transformedPhone;
};
