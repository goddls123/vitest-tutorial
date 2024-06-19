import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });
  function updateItemCount(itemName, itemCount, optionType) {
    const newOptionCount = { ...optionCounts };
    newOptionCount[optionType][itemName] = itemCount;
    setOptionCounts(newOptionCount);
  }
  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }
  function calculateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce((total, item) => total + item, 0);
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, updateItemCount, resetOrder, totals };

  return <OrderDetails.Provider value={value} {...props} />;
}
