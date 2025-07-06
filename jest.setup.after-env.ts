import { jest, beforeAll, afterAll, expect } from "@jest/globals";
import { remote } from "webdriverio";
import { config } from "./wdio.conf.js";
import { matchers } from "expect-webdriverio";

jest.setTimeout(30000);

beforeAll(async () => { 
  expect.extend(matchers);
  
  globalThis.chrome = await remote(config);
});

afterAll(async () => {
  await globalThis.chrome.deleteSession();
});
