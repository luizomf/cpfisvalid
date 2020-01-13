/**
 * Valida CPF em Javascript
 * Tested in IE6+, Chrome, Firefox, Safari, Node, etc...
 * @param {string} cpf
 * @returns {boolean} true para válido, false inválido
 */
function cpfIsValid (cpf) {
  'use strict';

  function getCpfDigit (sumOfDigits, regressiveCounter, cpfDigits) {
    for (var i = 0; i < cpfDigits.length; i++) {
      sumOfDigits += parseInt(cpfDigits.charAt(i)) * regressiveCounter;
      regressiveCounter--;
    }

    sumOfDigits = 11 - (sumOfDigits % 11);
    return sumOfDigits > 9 ? 0 : sumOfDigits;
  }

  // Only strings
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
  var sequenceFromFirstCpfCharArray = [];
  for (var i = 0; i < generatedCpf.length; i++) {
    sequenceFromFirstCpfCharArray.push(generatedCpf.charAt(0));
  }

  var sequenceFromFirstCpfChar = sequenceFromFirstCpfCharArray.join('');

  // Is sequence
  if (cpfOnlyNumbers === sequenceFromFirstCpfChar) return false;

  // Valid
  if (cpfOnlyNumbers === generatedCpf) return true;

  // Fallback invalid
  return false;
}
