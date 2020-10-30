export const FETCH_LIST = 'FETCH_LIST';
export const FETCH_MORE_LIST = 'FETCH_LIST';

export function loadList(page) {
  return { type: FETCH_LIST, page };
}

export function loadListSucceed(payload) {
  return { type: `${FETCH_LIST}_SUCCESS`, payload };
}

export function loadListFailed(payload) {
  return { type: `${FETCH_LIST}_FAIL`, payload };
}

// export function loadMoreList(payload) {
//   return { type: FETCH_MORE_LIST, payload };
// }

// export function loadMoreListSucceed(payload) {
//   console.log("payload : ", payload);
//   return { type: `${FETCH_MORE_LIST}_SUCCESS`, payload };
// }

// export function loadMoreListFailed(payload) {
//   return { type: `${FETCH_MORE_LIST}_FAIL`, payload };
// }