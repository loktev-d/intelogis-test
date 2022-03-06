import { call, put, takeLatest, select, all } from "redux-saga/effects";

import * as api from "./api";
import {
  setSelectedRouteGeometry,
  setSelectedRequest,
  setRequestPoint,
} from "./mainSlice";

function* fetchRouteForRequestSelection(action) {
  yield put(setSelectedRequest(action.payload));

  const selectedRequest = yield select((state) =>
    state.main.requests.find((item) => item.number == action.payload)
  );
  const startPoint = yield select(
    (state) =>
      state.main.addresses.find(
        (item) => item.id == selectedRequest.startPointId
      ).location
  );
  const endPoint = yield select(
    (state) =>
      state.main.addresses.find((item) => item.id == selectedRequest.endPointId)
        .location
  );

  const res = yield call(api.fetchRoute, startPoint, endPoint);
  yield put(setSelectedRouteGeometry(res.data.routes[0].geometry.coordinates));
}

function* fetchRouteForAddressSelection(action) {
  yield put(setRequestPoint(action.payload));

  if (
    yield select((state) => state.main.selectedRequest) !=
      action.payload.requestNumber
  )
    return;

  const selectedRequest = yield select((state) =>
    state.main.requests.find(
      (item) => item.number == action.payload.requestNumber
    )
  );
  const startPoint = yield select(
    (state) =>
      state.main.addresses.find(
        (item) => item.id == selectedRequest.startPointId
      ).location
  );
  const endPoint = yield select(
    (state) =>
      state.main.addresses.find((item) => item.id == selectedRequest.endPointId)
        .location
  );

  const res = yield call(api.fetchRoute, startPoint, endPoint);
  yield put(setSelectedRouteGeometry(res.data.routes[0].geometry.coordinates));
}

function* watchFetchRouteForRequestSelection() {
  yield takeLatest("saga/setSelectedRequest", fetchRouteForRequestSelection);
}

function* watchFetchRouteForAddressSelection() {
  yield takeLatest("saga/setRequestPoint", fetchRouteForAddressSelection);
}

export default function* rootSaga() {
  yield all([
    watchFetchRouteForRequestSelection(),
    watchFetchRouteForAddressSelection(),
  ]);
}
