import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
} from "./eventsSlice";
import { apiFetchEvents } from "./eventsApi";

export function* handleFetchEvents(params) {
  try {
    const data = yield call(apiFetchEvents, params);
    yield put(fetchEventsSuccess(data));
  } catch (err) {
    yield put(fetchEventsFailure(err?.message || "Failed to load"));
  }
}

export default function* eventsSaga() {
  yield all([takeLatest(fetchEventsRequest.type, handleFetchEvents)]);
}
