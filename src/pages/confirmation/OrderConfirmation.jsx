import React, { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
import { BASE_URL } from "../../mocks/handlers";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  if (orderNumber) {
    return (
      <div>
        <h1>Thank you!</h1>
        <h2>Your order number is {orderNumber}</h2>
        <button onClick={handleClick}>Create new order</button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
