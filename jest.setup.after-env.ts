import { jest, beforeAll, afterAll, expect } from "@jest/globals";
import { remote } from "webdriverio";
import { config } from "./wdio.conf.js";
import { matchers } from "expect-webdriverio";
// import { expect } from "expect-webdriverio";

// Set the enhanced expect object as global
 
// (globalThis as any).expect = expect;

jest.setTimeout(30000);

beforeAll(async () => { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect.extend(matchers as Record<string, any>);

  // The enhanced expect already has matchers extended, no need to extend again
  globalThis.chrome = await remote(config);
});

afterAll(async () => {
  await globalThis.chrome?.deleteSession();
});
