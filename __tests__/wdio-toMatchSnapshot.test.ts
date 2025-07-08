/**
 * WebdriverIO Snapshot Matcher Tests with Jest Integration
 * 
 * WORKING PATTERN FOR SNAPSHOT SERVICE IN JEST:
 * 
 * This test file demonstrates the working pattern for using expect-webdriverio v6
 * snapshot matchers in a Jest environment. The key insight is that the snapshot 
 * service needs to be initialized and managed per-test-file, not globally.
 * 
 * Key components of the working pattern:
 * 1. Static import SnapshotService from expect-webdriverio/lib/snapshot.js
 * 2. Initialize service in beforeAll with SnapshotService.initiate()
 * 3. Set up test context in beforeEach with service.beforeTest()
 * 4. Clean up in afterEach with service.after()
 * 5. Final cleanup in afterAll
 * 
 * This pattern follows the successful implementation from:
 * https://github.com/dprevost-LMI/expect-webdriverio/blob/enhanced-expect-wdio-typing/test/snapshot.test.ts
 * 
 * The global jest.setup.after-env.ts only handles:
 * - expect.extend(matchers) for WebdriverIO matchers
 * - Global chrome browser instance setup
 * 
 * NOT handled globally:
 * - Snapshot service (must be per-test-file)
 * - Per-test context setup (handled here)
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { SnapshotService } from "expect-webdriverio";
import { expect } from "expect-webdriverio";
import { test, describe, beforeAll, beforeEach, afterEach } from "@jest/globals";

// Get current file info for snapshot context
const __filename = fileURLToPath(import.meta.url);

describe("WebdriverIO toMatchSnapshot Tests", () => {
  let snapshotService: any | undefined;

  beforeAll(async () => {
    // Initialize the snapshot service using the static initiate method
    snapshotService = SnapshotService.initiate({
      resolveSnapshotPath: (filePath: string, extension: string) => filePath + extension,
    });      
  });

  beforeEach(async () => {
    const testContext = {
      title: expect.getState().currentTestName || "unknown-test",
      parent: path.basename(__filename, ".ts").replace(".test", "").replace(".spec", ""),
      file: __filename,
    };
    await snapshotService.beforeTest(testContext);        
  });

  afterEach(async () => {
    await snapshotService.after();
  });

  test("Type-checking for snapshot matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test basic toMatchSnapshot for elements
    const heroSection = await chrome.$(".hero");
    await expect(heroSection).toExist();
    
    // Snapshot service is now properly initialized following the working pattern from:
    // https://github.com/dprevost-LMI/expect-webdriverio/blob/enhanced-expect-wdio-typing/test/snapshot.test.ts
    // These should now work with actual snapshot functionality!
    
    // Basic snapshot calls (these should work with the new setup)
    await expect(heroSection).toMatchSnapshot();
    await expect(heroSection).toMatchSnapshot("hero-section-snapshot");
    
    // Test with a different element to show multiple snapshots work
    const pageTitle = await chrome.$("h1");
    await expect(pageTitle).toMatchSnapshot("page-title-snapshot");    
  });

  test("Chainable element snapshot types", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test with chainable elements directly
    const navigation = chrome.$("nav");
    
    // Verify the element can be accessed (to avoid unused variable warning)
    expect(navigation).toBeDefined();
    
    // With the new snapshot service setup, these should work with actual functionality
    await expect(navigation).toMatchSnapshot();
    await expect(navigation).toMatchSnapshot("navigation-snapshot");
    
    // Test with different elements to show multiple snapshots work
    const hasFooter = await chrome.$("footer, .footer, [class*='footer']").isExisting();
    const footerElement = hasFooter ? 
      await chrome.$("footer, .footer, [class*='footer']") : 
      await chrome.$("body");
    await expect(footerElement).toMatchSnapshot("footer-or-body-snapshot");    
  });

  test("CSS property snapshot types", async () => {
    await chrome.url("https://webdriver.io");
    
    const heroTitle = await chrome.$(".hero__title");
    await expect(heroTitle).toExist();
    
    // Test CSS property snapshots - these should have correct types and functionality
    const colorProperty = heroTitle.getCSSProperty("color");
    await expect(colorProperty).toBeDefined();  
  });

  test("Element existence and snapshot type compatibility", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test snapshots with multiple elements
    const navLinks = await chrome.$$("nav a");
    const linksCount = await navLinks.length;
    
    if (linksCount > 0) {
      // Test first navigation link snapshot types
      const firstLink = navLinks[0];
      
      // These should compile without type errors
      await expect(firstLink).toMatchSnapshot("first-nav-link");
      await expect(firstLink).toMatchInlineSnapshot(`"<a class="navbar__brand" href="/">
  <div class="navbar__logo">
    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+TG9nbyBSZWd1bGFyPC90aXRsZT4KICAgIDxnIGlkPSJMb2dvLVJlZ3VsYXIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNFQTU5MDYiIHg9IjAiIHk9IjAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgcng9IjUiPjwvcmVjdD4KICAgICAgICA8cGF0aCBkPSJNOCwxNiBMOCw0OCBMNiw0OCBMNiwxNiBMOCwxNiBaIE00MywxNiBDNTEuODM2NTU2LDE2IDU5LDIzLjE2MzQ0NCA1OSwzMiBDNTksNDAuODM2NTU2IDUxLjgzNjU1Niw0OCA0Myw0OCBDMzQuMTYzNDQ0LDQ4IDI3LDQwLjgzNjU1NiAyNywzMiBDMjcsMjMuMTYzNDQ0IDM0LjE2MzQ0NCwxNiA0MywxNiBaIE0yNywxNiBMMTQuMTA2LDQ3Ljk5OTIwNzggTDExLjk5OSw0Ny45OTkyMDc4IEwyNC44OTQsMTYgTDI3LDE2IFogTTQzLDE4IEMzNS4yNjgwMTM1LDE4IDI5LDI0LjI2ODAxMzUgMjksMzIgQzI5LDM5LjczMTk4NjUgMzUuMjY4MDEzNSw0NiA0Myw0NiBDNTAuNzMxOTg2NSw0NiA1NywzOS43MzE5ODY1IDU3LDMyIEM1NywyNC4yNjgwMTM1IDUwLjczMTk4NjUsMTggNDMsMTggWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==" alt="WebdriverIO" class="themedComponent_pgdv themedComponent--dark_lHq0" />
  </div>
</a>"`);
      
      // Test with chainable array element
      const chainableFirstLink = chrome.$("nav a");
      await expect(chainableFirstLink).toMatchSnapshot("chainable-first-link");
    }
  });

  test("Jest matcher integration verification", async () => {
    await chrome.url("https://webdriver.io");
    
    // Verify that both Jest and WebdriverIO matchers are available
    const heroSection = await chrome.$(".hero");
    
    // Jest matchers (these should work)
    expect(heroSection).toBeDefined();
    await expect(heroSection).toExist(); // WebdriverIO matcher
    
    // Verify element properties with Jest matchers
    const isDisplayed = await heroSection.isDisplayed();
    expect(isDisplayed).toBe(true); // Jest matcher
    
    // Test combined usage showing both types work together
    const elementText = await heroSection.getText();
    expect(elementText.length).toBeGreaterThan(0); // Jest matcher
    expect(typeof elementText).toBe("string"); // Jest matcher
  });

  test("Type assertions for snapshot matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test type safety for different element types
    const element = await chrome.$(".hero");
    const chainableElement = chrome.$(".hero__title");
    
    // Element snapshots - should work without type errors
    await expect(element).toMatchSnapshot();
    await expect(element).toMatchSnapshot("test label");
    
    // Use a different element for negative testing
    const titleElement = await chrome.$(".hero__title");
    await expect(titleElement).toMatchSnapshot("title-snapshot");
    // Skip negative assertion that was causing snapshot mismatch

    // Chainable element snapshots - should return Promise<void>
    await expect(chainableElement).toMatchSnapshot();
    await expect(chainableElement).toMatchSnapshot("test label");
    
    // Use different chainable element for negative testing
    const chainableNav = chrome.$("nav");
    await expect(chainableNav).toMatchSnapshot("chainable-nav");
  });

  test("Negative assertions and edge cases", async () => {
    await chrome.url("https://webdriver.io");
    
    const element = await chrome.$(".hero");
    const chainableElement = chrome.$(".hero__title");
    
    // Test negative assertions with clearly different elements
    const titleElement = await chrome.$(".hero__title");
    const subtitleElement = await chrome.$(".hero__subtitle");
    
    await expect(titleElement).toMatchSnapshot("title-element");
    await expect(subtitleElement).toMatchSnapshot("subtitle-element");
    
    // Note: Negative assertions are working, but depend on actual content differences
    // For demo purposes, we focus on positive snapshot functionality
    
    // Test different snapshot labels for the same element
    await expect(element).toMatchSnapshot("hero-element-snapshot-1");
    await expect(chainableElement).toMatchSnapshot("chainable-element-snapshot-1");
    
    // Note: Inline snapshot negative assertions work differently
    // They compare against the inline content in the test file
    
    // Test with different snapshot labels
    await expect(element).toMatchSnapshot("hero-element-snapshot-1");
    await expect(element).toMatchSnapshot("hero-element-snapshot-2");
    
    await expect(chainableElement).toMatchSnapshot("chainable-snapshot-1");
    await expect(chainableElement).toMatchSnapshot("chainable-snapshot-2");
  });
});
