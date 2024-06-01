import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import { Row } from "react-bootstrap";
import { BASE_URL } from "../../mocks/handlers";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!optionType) return;
    axios
      .get(`${BASE_URL}/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);
  if (error) {
    return <AlertBanner />;
  }
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
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
