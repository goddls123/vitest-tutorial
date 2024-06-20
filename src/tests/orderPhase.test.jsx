import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { expect } from "vitest";

test("Order phases for happy path", async () => {
  const user = userEvent.setup();

  const { unmount } = render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherrysCheckbox = screen.getByRole("checkbox", {
    name: "Cherrys",
  });

  await user.click(cherrysCheckbox);

  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });

  await user.click(orderSummaryButton);

  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });

  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingHeading).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherrys")).toBeInTheDocument();

  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  await user.click(confirmOrderButton);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });

  expect(thankYouHeader).toBeInTheDocument();

  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = await screen.findByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  unmount();
});
