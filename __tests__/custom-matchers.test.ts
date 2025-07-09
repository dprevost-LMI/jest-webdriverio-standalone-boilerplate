import { expect } from "@jest/globals";
import { test, describe } from "@jest/globals";

import "../toHaveElementId";
import "../toBeWithinRange";

describe("Custom Matchers", () => {
  test("support custom matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test using Jest expect with element properties
    const heroSection = await chrome.$(".hero");
    console.log(typeof heroSection); // Should log 'object'

    expect(1).toBeWithinRange(1, 2);
    await expect(heroSection).not.toHaveElementId("hero-section");
    await expect(heroSection).toHaveElementId(expect.stringContaining("f"));
  });
});