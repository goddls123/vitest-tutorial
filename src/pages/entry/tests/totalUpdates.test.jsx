import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { describe, expect, test } from "vitest";
import OrderEntry from "../OrderEntry";

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

describe("grand total", () => {
  test("grand total starts at 0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
    unmount();
  });
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherrysCheckbox = await screen.findByRole("checkbox", {
      name: "Cherrys",
    });

    await user.click(cherrysCheckbox);

    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if toppings is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });

    const cherrysCheckbox = await screen.findByRole("checkbox", {
      name: "Cherrys",
    });

    await user.click(cherrysCheckbox);

    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });

    const cherrysCheckbox = await screen.findByRole("checkbox", {
      name: "Cherrys",
    });

    await user.click(cherrysCheckbox);

    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherrysCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
