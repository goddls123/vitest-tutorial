import { describe, expect } from "vitest";
import Options from "../Options";
import { render, screen } from "@testing-library/react";

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
});
