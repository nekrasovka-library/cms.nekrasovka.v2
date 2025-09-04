import { call, put, takeLatest, all } from "redux-saga/effects";
import { apiFetchEvent } from "./eventApi";
import {
  fetchEventRequest,
  fetchEventSuccess,
  fetchEventFailure,
} from "./eventSlice";

export function* handleFetchEvent(params) {
  try {
    const data = yield call(apiFetchEvent, params);
    yield put(fetchEventSuccess(data));
  } catch (e) {
    yield put(fetchEventFailure(e?.message || "Failed to load event"));
  }
}

export default function* eventSaga() {
  yield all([takeLatest(fetchEventRequest.type, handleFetchEvent)]);
}
