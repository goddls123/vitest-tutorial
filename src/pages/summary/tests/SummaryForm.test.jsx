import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("SummaryForm", () => {
  it("initial conditions", () => {
    render(<SummaryForm />);
    const checkBox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkBox).not.toBeChecked();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    expect(confirmButton).toBeDisabled();
  });
  it("Checkbox enables buttons on first click and disables on second click", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkBox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkBox).not.toBeChecked();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    expect(confirmButton).toBeDisabled();

    await user.click(checkBox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkBox);
    expect(confirmButton).toBeDisabled();
  });
  it("popeover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const nullPopover = screen.queryByText(
      /No ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditionsButton = screen.getByText(/Terms and Conditions/i);
    await user.hover(termsAndConditionsButton);
    const termsAndConditionsPopover = screen.getByText(
      /No ice cream will actually be delivered/i
    );
    expect(termsAndConditionsPopover).toBeInTheDocument();

    await user.unhover(termsAndConditionsButton);
    expect(termsAndConditionsPopover).not.toBeInTheDocument();
  });
});
