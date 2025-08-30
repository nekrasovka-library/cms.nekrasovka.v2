import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import projectsReducer from "../features/projects/projectsSlice";
import projectReducer from "../features/project/projectSlice";
import pageReducer from "../features/page/pageSlice";
import blockReducer from "../features/block/blockSlice";
import templatesReducer from "../features/templates/templatesSlice";
import menusReducer from "../features/menus/menusSlice";
import visibilitySlice from "../features/visibility/visibilitySlice";
import fontsSlice from "../features/fonts/fontsSlice";
import eventsReducer from "../features/events/eventsSlice";
import eventReducer from "../features/event/eventSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    project: projectReducer,
    page: pageReducer,
    block: blockReducer,
    templates: templatesReducer,
    menus: menusReducer,
    visibility: visibilitySlice,
    fonts: fontsSlice,
    events: eventsReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
