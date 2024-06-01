import { HttpResponse, http } from "msw";

export const BASE_URL = "http://localhost:3030";
export const handlers = [
  http.get(`${BASE_URL}/scoops`, async () => {
    return HttpResponse.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),
];
