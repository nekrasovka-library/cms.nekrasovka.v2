import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchPageFailure,
  fetchPageRequest,
  fetchPageSuccess,
  updatePageRequest,
} from "./pageSlice";
import { apiFetchPage, apiUpdatePage } from "./pageApi";

export function* handleFetchPage(params) {
  try {
    const data = yield call(apiFetchPage, params);
    yield put(fetchPageSuccess(data));
  } catch (err) {
    yield put(fetchPageFailure(err?.message || "Failed to load"));
  }
}

export function* handleUpdatePage(params) {
  try {
    const data = yield call(apiUpdatePage, params);
    yield put(fetchPageSuccess(data));
  } catch (err) {
    yield put(fetchPageFailure(err?.message || "Failed to load"));
  }
}

export default function* pageSaga() {
  yield takeLatest(fetchPageRequest.type, handleFetchPage);
  yield takeLatest(updatePageRequest.type, handleUpdatePage);
}
