import { expect } from "@jest/globals";
import { PartialMatcher } from "expect-webdriverio";
import type { ChainablePromiseElement } from "webdriverio";

const toHaveElementId =
  // `floor` and `ceiling` get types from the line above
  // it is recommended to type them as `unknown` and to validate the values
  async function (actual: ChainablePromiseElement, elementId: string | PartialMatcher<string>) {
    if (!actual || typeof actual !== "object") {
      throw new TypeError("These must be of type ChainablePromiseElement!");
    }
    const actualElementId = await actual.elementId;

    if (actualElementId === elementId || (typeof elementId === "object" && elementId.asymmetricMatch(actualElementId))) {
      return {
        message: () =>
          // `this` context will have correct typings
          `expected ${JSON.stringify(actual)} not to have element ID ${elementId}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${JSON.stringify(actual)} to have element ID ${elementId}`,
        pass: false,
      };
    }
  };

expect.extend({
  toHaveElementId,
});

declare module "expect" {
  interface Matchers<R> {
    toHaveElementId(elementId: string | PartialMatcher<string>): Promise<R>;
  }
}