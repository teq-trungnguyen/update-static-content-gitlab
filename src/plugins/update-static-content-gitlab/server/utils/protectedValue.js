"use strict";

function protectedValue(sensitiveValue) {
  if (sensitiveValue === false) return;

  return sensitiveValue && sensitiveValue.substring(0, 10) + "...";
  return "";
}

module.exports = protectedValue;
