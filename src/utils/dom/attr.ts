export const tryToGetAttribute = (target, attrKey) => {
  if (target && target.getAttribute) {
    const obj = target.getAttribute(attrKey);
    try {
      const res = JSON.parse(obj);

      return res;
    } catch (error) {
      return obj;
    }
  }
  return {};
};
