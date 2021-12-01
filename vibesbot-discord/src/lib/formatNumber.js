import * as d3_format from "d3-format";

export const isKnownFormat = function (as) {
  // prettier-ignore
  if (as === 'dollars') { return '$.0f'; }
  else if (as === 'big_dollars') { return "$.3~s"; }
  else if (as === 'dollars_and_cents') { return '$.2f'; }
  else if (as === 'dollars_cents') { return '$.2f'; }
  else if (as === 'percent') { return '.0~%'; }
  else if (as === 'percent0f') { return '.0~%'; }
  else if (as === 'percent1f') { return '.1~%'; }
  else if (as === 'percent2f') { return '.2~%'; }
  else if (as === 'decimal')   { return '.2~f'; }
  else if (as === 'decimal0f') { return '.0~f'; }
  else if (as === 'decimal1f') { return '.1~f'; }
  else if (as === 'decimal2f') { return '.2~f'; }
  else if (as === 'decimal3f') { return '.3~f'; }
  else if (as === 'decimal4f') { return '.4~f'; }
  else if (as === 'count') { return '.0f'; }
  else if (as === 'round_number') { return '.0f'; }
  else if (as === 'big_number') { return '.3~s'; }
  else if (as === 'signed-big_number') { return '+.3~s'; }
  else if (as === 'signed-big_dollars') { return '+$.3~s'; }
  else if (as === 'signed-dollars') { return '+$.0f'; }
  else if (as === 'signed-dollars_and_cents') { return '+$.2f'; }
  else if (as === 'signed-dollars_cents') { return '+$.2f'; }
  else if (as === 'signed-percent') { return '+.0~%'; }
  else if (as === 'signed-percent0f') { return '+.0~%'; }
  else if (as === 'signed-percent1f') { return '+.1~%'; }
  else if (as === 'signed-percent2f') { return '+.2~%'; }
  else if (as === 'signed-decimal')   { return '+.2~f'; }
  else if (as === 'signed-decimal0f') { return '+.0~f'; }
  else if (as === 'signed-decimal1f') { return '+.1~f'; }
  else if (as === 'signed-decimal2f') { return '+.2~f'; }
  else if (as === 'signed-decimal3f') { return '+.3~f'; }
  else if (as === 'signed-decimal4f') { return '+.4~f'; }
  else if (as === 'signed-count') { return '+.0f'; }
  else if (as === 'round_number') { return '.0f'; }
};

export const formatterFor = function (as) {
  const format = (() => {
    return isKnownFormat(as);
  })();
  if (format) {
    return d3_format.format(format);
  } else {
    return function (v) {
      return v;
    };
  }
};

export const formatNumber = function (n, as, nan_text = "-") {
  if (typeof n === "string") {
    n = parseFloat(n);
  }
  if (Number.isNaN(n)) {
    return nan_text;
  }
  if (!Number.isFinite(n)) {
    return nan_text;
  }
  const formatter = formatterFor(as);
  return formatter(n);
};

export default formatNumber;
