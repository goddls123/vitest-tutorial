import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { useState } from "react";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <Container>
      <OrderDetailsProvider>
        <Container>
          <Component setOrderPhase={setOrderPhase}></Component>
        </Container>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
