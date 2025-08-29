import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchFontsFailure,
  fetchFontsRequest,
  fetchFontsSuccess,
} from "./fontsSlice";
import { apiFetchFonts } from "./fontsApi";

export function* handleFetchFonts() {
  try {
    const data = yield call(apiFetchFonts);
    yield put(fetchFontsSuccess(data));
  } catch (err) {
    yield put(fetchFontsFailure(err?.message || "Failed to load"));
  }
}

export default function* pageSaga() {
  yield takeLatest(fetchFontsRequest.type, handleFetchFonts);
}
