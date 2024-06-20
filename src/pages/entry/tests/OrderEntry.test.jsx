import { expect } from "vitest";
import { server } from "../../../mocks/server";
import { BASE_URL } from "../../../mocks/handlers";
import { HttpResponse, http } from "msw";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

test("hanlders error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get(`${BASE_URL}/scoops`, () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get(`${BASE_URL}/toppings`, () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});
