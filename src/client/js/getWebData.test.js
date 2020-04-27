import { getGeoName, getForecast, getImages } from "./getWebData";

test("api calls test", () => {
  expect(getGeoName).toBeDefined();
  expect(getForecast).toBeDefined();
  expect(getImages).toBeDefined();
});
