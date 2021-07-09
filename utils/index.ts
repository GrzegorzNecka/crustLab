const jsonFetcher = (url) => fetch(url).then((res) => res.json());

const findUpNode = (el, tag) => {
  while (el.parentNode) {
    el = el.parentNode;
    if (el.tagName === tag) return el;
  }
  return null;
};

export { findUpNode, jsonFetcher };
