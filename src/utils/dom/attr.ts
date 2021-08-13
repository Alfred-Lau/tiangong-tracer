export const tryToGetAttribute = (target, attrKey) => {
  if (target && target.getAttribute) {
    return target.getAttribute(attrKey) || "";
  }
  return "";
};
