/**
 * Valida CPF em Javascript
 * Testado no IE5+, Chrome, Firefox, Safari, etc...
 * @param {string} cpf
 * @returns {boolean} true para válido, false inválido
 */
function cpfIsValid (cpf) {
  'use strict';

  if (typeof cpf === 'undefined') return false;
  if (typeof cpf !== 'string') return false;

  // Only numbers
  var cleanCpf = cpf.replace(/\D+/g, '');

  if (cleanCpf.length !== 11) return false;

  var cpfNoDigits = cleanCpf.substring(0, 9);
  var newCpf = cpfNoDigits;

  // First Digit
  var sum = 0;
  var regressive = 10;

  for (var i in cpfNoDigits) {
    sum += cpfNoDigits[i] * regressive;
    regressive--;
  }

  sum = 11 - (sum % 11);
  var firstDigit = sum > 9 ? 0 : sum;

  newCpf += firstDigit;

  // Last Digit
  sum = 0;
  regressive = 11;

  for (i in newCpf) {
    sum += newCpf[i] * regressive;
    regressive--;
  }

  sum = 11 - (sum % 11);
  var lastDigit = sum > 9 ? 0 : sum;

  newCpf += lastDigit;

  // Avoid sequences
  // IE lacks string repeat
  var tempSequenceArray = [];
  for (i in newCpf) tempSequenceArray.push(newCpf[0]);
  var sequence = tempSequenceArray.join('');

  // Is sequence
  if (cleanCpf === sequence) {
    return false;
  }

  // Valid
  if (cleanCpf === newCpf) {
    return true;
  }

  // Fallback invalid
  return false;
}

// Usage
// Válidos
if (cpfIsValid('593.062.620-00')) console.log('CPF válido');
if (cpfIsValid('59306262000')) console.log('CPF válido');

// Inválidos
if (!cpfIsValid('111.111.111-11')) console.log('CPF INVÁLIDO');
if (!cpfIsValid('11111111111')) console.log('CPF INVÁLIDO');
