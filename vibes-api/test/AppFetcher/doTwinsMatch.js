import _ from "lodash";
import deepKeys from "deep-keys";

const deepPlainObjectKeys = function(obj) {
  const r = _.sortedUniq(deepKeys(obj));
  for (const key of r) {
    const v = _.at(obj, key);
    if (_.isArray(v[0]) && _.isPlainObject(v[0][0])) {
      const v1 = v[0][0];
      const deeperKeys = deepPlainObjectKeys(v1);
      for (const dk of deeperKeys) {
        r.push(`${key}[0].${dk}`);
      }
    }
  } 
  return r;
}

export default function([a, b]) {
  const errors = [];
  if (a.status !== b.status) {
    errors.push(['status']);
  };
  if (a.statusText !== b.statusText) {
    errors.push(['statusText']);
  }
  if (a.json || b.json) {
    const aJson = a.json;
    const bJson = b.json;
    const aDeepKeys = deepPlainObjectKeys(aJson);
    const bDeepKeys = deepPlainObjectKeys(bJson);
    const aMissing = _.difference(aDeepKeys, bDeepKeys);
    if (aMissing.length) {
      errors.push([`Mock API is missing response keys: ${aMissing.join(',')}`]);
    }
    const bMissing = _.difference(bDeepKeys, aDeepKeys);
    if (bMissing.length) {
      errors.push([`API is missing response keys: ${bMissing.join(',')}`]);
    }
  }
  return [!errors.length, errors]
}