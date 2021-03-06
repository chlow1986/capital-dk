import { call, all, put, takeEvery, takeLatest } from "redux-saga/effects";
import {loadListSucceed, loadListFailed} from '../actions';
import {BACKEND_URL} from '../../common/Constants';

const getList = (page)=>{
  console.log("page : ", page);
  return fetch(`${BACKEND_URL}/data?page=${page}`)
    .then(response => response.json())
    .then(myJson => myJson);
}

function* fetchList(action) {
  try {
    console.log("call fetch ", action.page);
    const result = yield call(getList, action.page);
    console.log("response : ", result);
    yield put(loadListSucceed({...result}));
  } catch (error) {
    yield put(loadListFailed(error.message));
  }
}

function* fetchListSaga() {
  yield takeEvery('FETCH_LIST', fetchList);
}

export default function* rootSaga() {
  yield all([
    fetchListSaga()
  ]);
}