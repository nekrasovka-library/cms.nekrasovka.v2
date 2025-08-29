import { all, fork } from "redux-saga/effects";
import templatesSaga from "../../features/templates/templatesSaga";
import projectsSaga from "../../features/projects/projectsSaga";
import projectSaga from "../../features/project/projectSaga";
import pageSaga from "../../features/page/pageSaga";
import menusSaga from "../../features/menus/menusSaga";
import blockSaga from "../../features/block/blockSaga";
import fontsSaga from "../../features/fonts/fontsSaga";

export default function* rootSaga() {
  yield all([fork(templatesSaga)]);
  yield all([fork(projectsSaga)]);
  yield all([fork(projectSaga)]);
  yield all([fork(pageSaga)]);
  yield all([fork(menusSaga)]);
  yield all([fork(blockSaga)]);
  yield all([fork(fontsSaga)]);
}
