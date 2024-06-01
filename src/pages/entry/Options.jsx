import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import { Row } from "react-bootstrap";
import { BASE_URL } from "../../mocks/handlers";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!optionType) return;
    axios
      .get(`${BASE_URL}/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [optionType]);
  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;
  return (
    <Row>
      {items.map((item) => (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </Row>
  );
}
