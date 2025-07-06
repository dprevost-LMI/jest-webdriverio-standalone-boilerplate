import { launcher as wmLauncher } from "wdio-wiremock-service";
import { exec } from "child_process";

export default async function () {
  exec("lsof -ti:8080 | xargs -r kill -9", () => {}); // Force kill any remaining processes on port 8080
  globalThis.wiremockLauncher = new wmLauncher({ rootDir: "__stubs__", port: 8080 });

  await wiremockLauncher.onPrepare();
}
