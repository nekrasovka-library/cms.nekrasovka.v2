import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchMenusFailure,
  fetchMenusRequest,
  fetchMenusSuccess,
} from "./menusSlice";
import { apiFetchMenu } from "./menusApi";

export function* handleFetchMenus() {
  try {
    const data = yield call(apiFetchMenu);
    yield put(fetchMenusSuccess(data));
  } catch (err) {
    yield put(fetchMenusFailure(err?.message || "Failed to load"));
  }
}

export default function* pageSaga() {
  yield takeLatest(fetchMenusRequest.type, handleFetchMenus);
}
