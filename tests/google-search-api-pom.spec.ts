import { test, expect } from "@playwright/test";
import { GoogleSearchAPI } from "../pages/GoogleSearchAPI";

test.describe("Google Custom Search API - POM", () => {
  let api: GoogleSearchAPI;

  test.beforeAll(() => {
    api = new GoogleSearchAPI();
  });

  const queries = [
    { q: "Valletta", expectSome: true },
    { q: "The Multiplication", expectSome: true },
    { q: "Ftira", expectSome: true },
  ];

  for (const item of queries) {
    test(`search for ${item.q}`, async () => {
      const res = await api.search(item.q);
      expect(res).toBeTruthy();
      expect(res.items).toBeDefined();
      expect(Array.isArray(res.items)).toBeTruthy();
      expect(res.items!.length).toBeGreaterThan(0);
      expect(res.searchInformation?.totalResults).toBeTruthy();

      // Basic validation of top result
      const top = res.items![0];
      expect(top.title).toBeTruthy();
      expect(top.link).toMatch(/^https?:\/\//);
    });
  }
});
