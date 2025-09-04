import { call, put, select, takeLatest } from "redux-saga/effects";

import { apiCreateProject, apiFetchProjects } from "./projectsApi";
import {
  createProjectRequest,
  fetchProjectsFailure,
  fetchProjectsRequest,
  fetchProjectsSuccess,
} from "./projectsSlice";

export function* handleFetchProjects() {
  try {
    const data = yield call(apiFetchProjects);
    yield put(fetchProjectsSuccess(data));
  } catch (err) {
    yield put(fetchProjectsFailure(err?.message || "Failed to load"));
  }
}

export function* handleCreateProject(params) {
  try {
    const items = yield select((state) => state.projects.items);
    const data = yield call(apiCreateProject, params);
    yield put(fetchProjectsSuccess([...items, data]));
  } catch (err) {
    yield put(fetchProjectsFailure(err?.message || "Failed to create"));
  }
}

export default function* projectsSaga() {
  yield takeLatest(fetchProjectsRequest.type, handleFetchProjects);
  yield takeLatest(createProjectRequest.type, handleCreateProject);
}
