import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [
    {
      id: "1",
      name: "Address 1",
      location: [37.58474589760985, 55.68637982576635],
    },
    {
      id: "2",
      name: "Address 2",
      location: [37.60396083514783, 55.75946670769645],
    },
    {
      id: "3",
      name: "Address 3",
      location: [37.91431314009037, 56.55213241649824],
    },
    {
      id: "4",
      name: "Address 4",
      location: [35.445534779483324, 55.81047184025999],
    },
    {
      id: "5",
      name: "Address 5",
      location: [37.981651236803174, 54.81256855560716],
    },
  ],
  requests: [
    { number: "1650", startPointId: "1", endPointId: "2" },
    { number: "1651", startPointId: "4", endPointId: "2" },
    { number: "1652", startPointId: "3", endPointId: "5" },
    { number: "1653", startPointId: "4", endPointId: "1" },
    { number: "1654", startPointId: "5", endPointId: "3" },
  ],
  selectedRequest: null,
  selectedRouteGeometry: null,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSelectedRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    setRequestPoint(state, action) {
      const request = state.requests.find(
        (item) => item.number == action.payload.requestNumber
      );

      switch (action.payload.type) {
        case "start":
          request.startPointId = action.payload.pointId;
          break;
        case "end":
          request.endPointId = action.payload.pointId;
          break;
        default:
          throw new Error("Invalid point type");
      }
    },
    setSelectedRouteGeometry: (state, action) => {
      state.selectedRouteGeometry = action.payload;
    },
  },
});

export const { setSelectedRequest, setRequestPoint, setSelectedRouteGeometry } =
  mainSlice.actions;
export default mainSlice.reducer;
