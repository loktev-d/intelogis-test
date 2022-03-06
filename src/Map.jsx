import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledMap = styled(MapContainer)`
  height: 100%;
`;

export default function Map() {
  const selectedRequestNumber = useSelector(
    (state) => state.main.selectedRequest
  );
  const requests = useSelector((state) => state.main.requests);
  const addresses = useSelector((state) => state.main.addresses);
  const route = useSelector((state) => state.main.selectedRouteGeometry);

  const selectedRequest = requests.find(
    (item) => item.number === selectedRequestNumber
  );

  return (
    <StyledMap center={[55.7495, 37.6237]} zoom={8}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedRequestNumber && route ? (
        <>
          <Marker
            position={[
              ...addresses.find(
                (item) => item.id === selectedRequest.startPointId
              ).location,
            ].reverse()}
          />
          <Marker
            position={[
              ...addresses.find(
                (item) => item.id === selectedRequest.endPointId
              ).location,
            ].reverse()}
          />
          <Polyline
            pathOption={{ color: "blue" }}
            positions={route.map((item) => [...item].reverse())}
          />
        </>
      ) : null}
    </StyledMap>
  );
}
