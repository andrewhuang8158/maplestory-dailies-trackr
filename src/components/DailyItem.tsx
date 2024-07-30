import { useState } from "react";
import "./DailyItem.css";

// interface Props {
//   name: string;
//   id: number;
// }
const DailyItem = ({ name = "daily" }) => {
  const [completed, setCompleted] = useState(false);
  return (
    <>
      <li
        className={"list-group-item"}
        key={name}
        style={{ textDecoration: completed ? "line-through" : "none" }}
        onClick={() => {
          setCompleted(!completed);
        }}
      >
        {name}
      </li>
    </>
  );
};

export default DailyItem;
