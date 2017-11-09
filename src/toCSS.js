import toJSON from './toJSON';

const toDash = string => string.replace(/([A-Z])/g, char => `-${char.toLowerCase()}`);

const stringify = (object) => {
  const array = Object.keys(object).map((cssAttribute) => {
    if (typeof object[cssAttribute] === 'object') {
      return `${toDash(cssAttribute)} {${stringify(object[cssAttribute])}}`;
    }
    return `${toDash(cssAttribute)}: ${object[cssAttribute]};`;
  });
  return array.join('');
};

export default points => stringify(toJSON(points));
