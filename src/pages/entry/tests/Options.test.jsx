import { describe, expect } from "vitest";
import Options from "../Options";
import { render, screen } from "../../../test-utils/testing-library-utils";

describe("options test", () => {
  it("displays image for each scoop option from server", async () => {
    render(<Options optionType={"scoops"} />);

    //find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    //confirm text of images

    const altTexts = scoopImages.map((image) => image.alt);
    expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
  it("displays image for each toppings option from server", async () => {
    render(<Options optionType={"toppings"} />);

    const toppingImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(toppingImages).toHaveLength(3);

    const altTexts = toppingImages.map((image) => image.alt);
    expect(altTexts).toEqual([
      "Sprinkles topping",
      "Peanuts topping",
      "Cherrys topping",
    ]);
  });
});
