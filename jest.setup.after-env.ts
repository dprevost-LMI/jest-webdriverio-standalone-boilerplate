import { jest, beforeAll, afterAll, expect } from "@jest/globals";
import { remote } from "webdriverio";
import { config } from "./wdio.conf.js";
import { matchers } from "expect-webdriverio";

jest.setTimeout(30000);

// Import and extend Jest's expect with WebdriverIO matchers
beforeAll(async () => {
  // Convert the Map to a plain object and extend Jest's expect
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matchersObject: Record<string, any> = {};
  matchers.forEach((matcher, name) => {
    matchersObject[name] = matcher;
  });
  
  expect.extend(matchersObject);
  
  globalThis.chrome = await remote(config);
});

afterAll(async () => {
  await globalThis.chrome.deleteSession();
});
