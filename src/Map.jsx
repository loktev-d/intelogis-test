import { MapContainer, TileLayer } from "react-leaflet";
import styled from "styled-components";

const StyledMap = styled(MapContainer)`
  height: 100%;
`;

export default function Map() {
  return (
    <StyledMap center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </StyledMap>
  );
}
