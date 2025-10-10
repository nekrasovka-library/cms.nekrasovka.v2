import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  fetchProjectFailure,
  fetchProjectRequest,
  fetchProjectSuccess,
  updateProjectRequest,
  createInProjectPageRequest,
  deleteInProjectPageRequest,
  updateInProjectPageRequest,
} from "./projectSlice";
import { apiFetchProject, apiUpdateProject } from "./projectApi";
import {
  apiCreateGroupedPage,
  apiCreatePage,
  apiDeletePage,
  apiUpdatePage,
} from "../page/pageApi";

export function* handleFetchProject(params) {
  try {
    const data = yield call(apiFetchProject, params);
    yield put(fetchProjectSuccess(data));
  } catch (err) {
    yield put(fetchProjectFailure(err?.message || "Failed to load"));
  }
}

export function* handleUpdateProject(params) {
  try {
    const data = yield call(apiUpdateProject, params);
    yield put(fetchProjectSuccess(data));
  } catch (err) {
    yield put(fetchProjectFailure(err?.message || "Failed to load"));
  }
}

export function* handleCreateInProjectPage(params) {
  try {
    const data = yield call(apiCreatePage, params);
    yield put(fetchProjectSuccess(data));
  } catch (err) {
    yield put(fetchProjectFailure(err?.message || "Failed to load"));
  }
}

export function* handleDeleteInProjectPage(params) {
  try {
    const data = yield call(apiDeletePage, params);
    yield put(fetchProjectSuccess(data));
  } catch (err) {
    yield put(fetchProjectFailure(err?.message || "Failed to load"));
  }
}

export function* handleUpdateInProjectPage(params) {
  try {
    const data = yield call(apiUpdatePage, params);
    yield put(fetchProjectSuccess(data));
  } catch (err) {
    yield put(fetchProjectFailure(err?.message || "Failed to load"));
  }
}

export default function* projectSaga() {
  yield takeLatest(fetchProjectRequest.type, handleFetchProject);
  yield takeLatest(updateProjectRequest.type, handleUpdateProject);
  yield takeLatest(createInProjectPageRequest.type, handleCreateInProjectPage);
  yield takeLatest(deleteInProjectPageRequest.type, handleDeleteInProjectPage);
  yield takeLatest(updateInProjectPageRequest.type, handleUpdateInProjectPage);
}
