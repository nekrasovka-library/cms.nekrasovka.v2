import { call, put, takeLatest } from "redux-saga/effects";
import { apiCreateBlock, apiDeleteBlock, apiUpdateBlock } from "./blockApi";
import {
  createBlockRequest,
  deleteBlockRequest,
  fetchBlockFailure,
  updateBlockRequest,
} from "./blockSlice";
import { fetchPageSuccess } from "../page/pageSlice";

export function* handleFetchBlock(params) {
  try {
    const data = yield call(apiCreateBlock, params);
    yield put(fetchPageSuccess(data));
  } catch (err) {
    yield put(fetchBlockFailure(err?.message || "Failed to load"));
  }
}

export function* handleDeleteBlock(params) {
  try {
    const data = yield call(apiDeleteBlock, params);
    yield put(fetchPageSuccess(data));
  } catch (err) {
    yield put(fetchBlockFailure(err?.message || "Failed to load"));
  }
}

export function* handleUpdateBlock(params) {
  try {
    const data = yield call(apiUpdateBlock, params);
    yield put(fetchPageSuccess(data));
  } catch (err) {
    yield put(fetchBlockFailure(err?.message || "Failed to load"));
  }
}

export default function* pageSaga() {
  yield takeLatest(createBlockRequest.type, handleFetchBlock);
  yield takeLatest(deleteBlockRequest.type, handleDeleteBlock);
  yield takeLatest(updateBlockRequest.type, handleUpdateBlock);
}
