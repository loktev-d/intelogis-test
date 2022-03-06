import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import mainReducer from "./mainSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { main: mainReducer },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
