import { jest, beforeAll, afterAll } from "@jest/globals";
import { remote } from "webdriverio";
import { config } from "./wdio.conf.js";
import { expect } from "expect-webdriverio";

// Set the enhanced expect object as global
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).expect = expect;

jest.setTimeout(30000);

beforeAll(async () => { 
  // The enhanced expect already has matchers extended, no need to extend again
  globalThis.chrome = await remote(config);
});

afterAll(async () => {
  await globalThis.chrome?.deleteSession();
});
