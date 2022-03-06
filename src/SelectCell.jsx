import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";

export default function DropdownCell({ defaultValue, requestNumber, type }) {
  const addresses = useSelector((state) => state.main.addresses);
  const dispatch = useDispatch();

  return (
    <Select
      defaultValue={defaultValue}
      onChange={(pointId) => {
        dispatch({
          type: "saga/setRequestPoint",
          payload: { requestNumber, type, pointId },
        });
      }}
    >
      {addresses.map((item) => (
        <Select.Option value={item.id}>{item.name}</Select.Option>
      ))}
    </Select>
  );
}
