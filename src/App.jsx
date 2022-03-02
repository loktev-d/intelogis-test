import { Row, Col } from "antd";
import styled from "styled-components";

import "./App.css";
import Table from "./RequestTable";
import Map from "./Map";

const Wrapper = styled(Row)`
  height: 100vh;
`;

const Box = styled(Col)`
  height: 100vh;
  padding: 20px;
`;

export default function App() {
  return (
    <Wrapper>
      <Box span={12}>
        <Table />
      </Box>
      <Box span={12}>
        <Map />
      </Box>
    </Wrapper>
  );
}
