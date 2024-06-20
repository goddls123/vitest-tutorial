import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("update scoop subtotal when scoops changes", async () => {
  render(<Options optionType={"scoops"} />, { wrapper: OrderDetailsProvider });

  const user = userEvent.setup();
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings changes", async () => {
  render(<Options optionType={"toppings"} />);

  const user = userEvent.setup();

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherrysCheckbox = await screen.findByRole("checkbox", {
    name: "Cherrys",
  });

  await user.click(cherrysCheckbox);

  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const peanutsCheckbox = screen.getByRole("checkbox", { name: "Peanuts" });

  await user.click(peanutsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
});
