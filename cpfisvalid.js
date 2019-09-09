/**
 * Valida CPF em Javascript
 * Testado no IE5+, Chrome, Firefox, Safari, Node, etc...
 * @param {string} cpf
 * @returns {boolean} true para válido, false inválido
 */
function cpfIsValid (cpf) {
  'use strict';

  function getCpfDigit (sumOfDigits, regressiveCounter, cpfDigits) {
    for (var index in cpfDigits) {
      sumOfDigits += cpfDigits[index] * regressiveCounter;
      regressiveCounter--;
    }

    sumOfDigits = 11 - (sumOfDigits % 11);
    return sumOfDigits > 9 ? 0 : sumOfDigits;
  }

  if (typeof cpf === 'undefined') return false;
  if (typeof cpf !== 'string') return false;

  var cpfOnlyNumbers = cpf.replace(/\D+/g, '');

  if (cpfOnlyNumbers.length !== 11) return false;

  var cpfNoDigits = cpfOnlyNumbers.substring(0, 9);
  var generatedCpf = cpfNoDigits;

  var firstCpfDigit = getCpfDigit(0, 10, cpfNoDigits);
  generatedCpf += firstCpfDigit;

  var lastCpfDigit = getCpfDigit(0, 11, generatedCpf);
  generatedCpf += lastCpfDigit;

  if (generatedCpf.length !== 11) return false;

  // IE lacks string repeat
  var sequenceFromFirstCpfDigitArray = [];
  for (var _ in generatedCpf) sequenceFromFirstCpfDigitArray.push(generatedCpf[0]);
  var sequenceFromCpfFirstDigit = sequenceFromFirstCpfDigitArray.join('');

  // Is sequence
  if (cpfOnlyNumbers === sequenceFromCpfFirstDigit) {
    return false;
  }

  // Valid
  if (cpfOnlyNumbers === generatedCpf) {
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
if (!cpfIsValid('00000000000')) console.log('CPF INVÁLIDO');
