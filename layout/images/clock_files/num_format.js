var numeric_format;

define(function(require) {});


/**
 * Форматирование числа.
 * @author Andrey Mishchenko (http://www.msav.ru/)
 * @param val - Значение для форматирования
 * @param thSep - Разделитель разрядов
 * @param dcSep - Десятичный разделитель
 * @returns string
 */

numeric_format = function(val, thSep, dcSep) {
  var cnt, fLen, ind, lZero, res, tmpRes;
  if (!thSep) {
    thSep = ' ';
  }
  if (!dcSep) {
    dcSep = ',';
  }
  res = val.toString();
  lZero = val < 0;
  fLen = res.lastIndexOf('.');
  fLen = fLen > -1 ? fLen : res.length;
  tmpRes = res.substring(fLen);
  cnt = -1;
  ind = fLen;
  while (ind > 0) {
    cnt++;
    if (cnt % 3 === 0 && ind !== fLen && (!lZero || ind > 1)) {
      tmpRes = thSep + tmpRes;
    }
    tmpRes = res.charAt(ind - 1) + tmpRes;
    ind--;
  }
  return tmpRes.replace('.', dcSep);
};
