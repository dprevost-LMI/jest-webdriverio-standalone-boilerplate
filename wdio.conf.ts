
const args = [];
const headless = !!process.env.HEADLESS;
if (headless) {
  args.push("--headless");
}

export const config = {
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args,
    },
  },
  waitforTimeout: 15000,
  logLevel: 'silent' as const,
};
