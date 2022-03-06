import { Table } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import SelectCell from "./SelectCell";

const columns = [
  {
    title: "Request Number",
    dataIndex: "number",
    key: "number",
    className: "fixed-column",
  },
  {
    title: "Start Address",
    dataIndex: "startAddress",
    key: "startAddress",
    className: "fixed-column",
    render: (value, row) => (
      <SelectCell
        defaultValue={value}
        requestNumber={row.number}
        type="start"
      />
    ),
  },
  {
    title: "End Address",
    dataIndex: "endAddress",
    key: "endAddress",
    className: "fixed-column",
    render: (value, row) => (
      <SelectCell defaultValue={value} requestNumber={row.number} type="end" />
    ),
  },
];

const StyledTable = styled(Table)`
  overflow: auto;
`;

export default function RequestTable() {
  const requests = useSelector((state) => state.main.requests);
  const addresses = useSelector((state) => state.main.addresses);
  const selectedRequest = useSelector((state) => state.main.selectedRequest);

  const dispatch = useDispatch();

  const rowSelection = {
    type: "radio",
    selectedRowKeys: selectedRequest ? [selectedRequest] : [],
    onChange: (selectedRowKeys) => {
      dispatch({ type: "saga/setSelectedRequest", payload: selectedRowKeys });
    },
  };

  const onRow = (row) => {
    return {
      onClick: () => {
        dispatch({ type: "saga/setSelectedRequest", payload: row.number });
      },
    };
  };

  const dataSource = requests.map((request) => ({
    number: request.number,
    startAddress: addresses.find(
      (address) => address.id === request.startPointId
    ).id,
    endAddress: addresses.find((address) => address.id === request.endPointId)
      .id,
    key: request.number,
  }));

  return (
    <StyledTable
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      onRow={onRow}
    />
  );
}
