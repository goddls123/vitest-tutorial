import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopList = Object.entries(optionCounts.scoops).map(([key, value]) => (
    <li key={key}>{`${key}: ${value}`}</li>
  ));

  const toppingList = Object.keys(optionCounts.toppings).map((key) => (
    <li key={key}>{key}</li>
  ));
  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)} </h2>
      <ul>{scoopList}</ul>
      <ul>{toppingList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)} </h2>
      <SummaryForm />
    </div>
  );
}
