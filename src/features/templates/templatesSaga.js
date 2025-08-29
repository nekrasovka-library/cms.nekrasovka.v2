import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchTemplatesRequest,
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
} from "./templatesSlice";
import { apiFetchTemplates } from "./templatesApi";

export function* handleFetchTemplates() {
  try {
    const data = yield call(apiFetchTemplates);
    yield put(fetchTemplatesSuccess(data));
  } catch (err) {
    yield put(fetchTemplatesFailure(err?.message || "Failed to load"));
  }
}

export default function* templatesSaga() {
  yield takeLatest(fetchTemplatesRequest.type, handleFetchTemplates);
}
