import styled from "styled-components";
import { useState, useEffect } from "react";

import "./style.css";
import Map from "./Map";
import RequestTable from "./RequestTable";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const Section = styled.div`
  height: 100vh;
  padding: 20px;
`;

const LeftSection = styled(Section)`
  width: ${(prop) => prop.width};
`;

const RightSection = styled(Section)`
  flex-grow: 1;
`;

const Divider = styled.div`
  background-color: grey;
  width: 4px;

  :hover {
    cursor: ew-resize;
  }
`;

export default function App() {
  const [width, setWidth] = useState(500);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseMoveHandler = (e) => {
    if (!isDragging) return;

    setWidth(e.x);
  };

  const onMouseUpHandler = (e) => {
    if (!isDragging) return;

    setIsDragging(false);
    document.body.style.cursor = null;
  };

  const onMouseDownHandler = (e) => {
    setIsDragging(true);
    document.body.style.cursor = "ew-resize";
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", onMouseUpHandler);

    return () => {
      document.removeEventListener("mousemove", onMouseMoveHandler);
      document.removeEventListener("mouseup", onMouseUpHandler);
    };
  });

  return (
    <Wrapper>
      <LeftSection width={`${width}px`}>
        <RequestTable />
      </LeftSection>
      <Divider onMouseDown={onMouseDownHandler} />
      <RightSection>
        <Map />
      </RightSection>
    </Wrapper>
  );
}
