import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
} from "./eventsSlice";
import { apiFetchMenu } from "../menus/menusApi";

export function* handleFetchEvents() {
  try {
    const data = yield call(apiFetchMenu);
    yield put(fetchEventsSuccess(data));
  } catch (err) {
    yield put(fetchEventsFailure(err?.message || "Failed to load"));
  }
}

export default function* eventsSaga() {
  yield all([takeLatest(fetchEventsRequest.type, handleFetchEvents)]);
}
