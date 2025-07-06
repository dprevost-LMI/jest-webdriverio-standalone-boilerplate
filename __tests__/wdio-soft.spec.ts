/**
 * WebdriverIO Soft Assertions Tests
 * 
 * This test file demonstrates the usage of expect.soft() for soft assertions
 * in WebdriverIO tests. Soft assertions allow tests to continue executing
 * even when assertions fail, collecting all failures and reporting them
 * at the end.
 */

describe("WebdriverIO Soft Assertions", () => {
  
  beforeEach(async () => {
    // Clear any previous soft failures before each test
    expect.clearSoftFailures();
  });

  afterEach(async () => {
    // Assert any accumulated soft failures at the end of each test
    expect.assertSoftFailures();
  });

  test("Basic soft assertions with elements", async () => {
    await chrome.url("https://webdriver.io");
    
    const heroSection = await chrome.$(".hero");
    const navigation = await chrome.$("nav");
    
    // These will not stop test execution if they fail
    // All failures will be collected and reported at the end
    await expect.soft(heroSection).toBeDisplayed();
    await expect.soft(navigation).toBeDisplayed();
    await expect.soft(heroSection).toExist();
    await expect.soft(navigation).toExist();
    
    console.log("✅ Basic soft assertions completed - test continues even if assertions fail");
    
    // Assert all soft failures collected during this test
    expect.assertSoftFailures();
  });

  test("Soft assertions with browser properties", async () => {
    await chrome.url("https://webdriver.io");
    
    // Soft assertions on browser properties
    await expect.soft(chrome).toHaveUrl("https://webdriver.io/");
    await expect.soft(chrome).toHaveTitle(expect.stringContaining("WebdriverIO"));
    await expect.soft(chrome).toHaveUrl(expect.stringContaining("webdriver"));
    
    // Test negative soft assertions
    await expect.soft(chrome).not.toHaveUrl("https://example.com");
    await expect.soft(chrome).not.toHaveTitle("Wrong Title");
    
    console.log("✅ Browser property soft assertions completed");
  });

  test("Soft assertions with element text and attributes", async () => {
    await chrome.url("https://webdriver.io");
    
    // Use elements and properties that we know exist and have content
    const heroDescription = await chrome.$(".hero p, .subtitle, [class*='hero'] p");
    
    // Soft assertions on element text - using elements that actually have text
    console.log("heroDescription text:", await heroDescription.getText());
    
    // Test with the description that we know contains text
    await expect.soft(heroDescription).toHaveText(expect.stringContaining("automation"));
    await expect.soft(heroDescription).toHaveText(expect.any(String));
    await expect.soft(heroDescription).not.toHaveText("");
    
    // Soft assertions with regex patterns on the description
    await expect.soft(heroDescription).toHaveText(/automation|testing|framework|browser|node/i);
    
    // Test browser-level text assertions which are more reliable
    await expect.soft(chrome).toHaveTitle(expect.stringContaining("WebdriverIO"));
    await expect.soft(chrome).toHaveUrl(expect.stringContaining("webdriver.io"));
    
    // Soft assertions on element attributes - test any existing links
    const allLinks = await chrome.$$("a");
    if ((await allLinks.length) > 0) {
      const firstLink = allLinks[0];
      await expect.soft(firstLink).toHaveAttribute("href", expect.any(String));
      await expect.soft(firstLink).not.toHaveAttribute("href", "");
    }
    
    console.log("✅ Element text and attribute soft assertions completed");
  });

  test("Soft assertions with element arrays", async () => {
    await chrome.url("https://webdriver.io");
    
    const navLinks = await chrome.$$("nav a");
    const allLinks = await chrome.$$("a");
    
    // Soft assertions on element arrays
    await expect.soft(navLinks).toBeElementsArrayOfSize({ gte: 3 });
    await expect.soft(allLinks).toBeElementsArrayOfSize({ gte: 10 });
    
    // Test individual elements in array with soft assertions
    if (await navLinks.length > 0) {
      const firstLink = navLinks[0];
      await expect.soft(firstLink).toBeDisplayed();
      await expect.soft(firstLink).toBeClickable();
    }
    
    console.log("✅ Element array soft assertions completed");
  });

  test("Soft assertions with form interactions", async () => {
    await chrome.url("https://webdriver.io");
    
    // Try to interact with search functionality
    const searchButton = await chrome.$(".DocSearch-Button");
    await expect.soft(searchButton).toExist();
    await expect.soft(searchButton).toBeDisplayed();
      
    if (await searchButton.isExisting()) {
      await searchButton.click();
        
      const searchInput = await chrome.$("#docsearch-input");
      await searchInput.waitForDisplayed({ timeout: 3000 });
        
      await expect.soft(searchInput).toBeDisplayed();
      await expect.soft(searchInput).toBeFocused();
        
      // Test input value with soft assertions
      await searchInput.setValue("testing");
      await expect.soft(searchInput).toHaveValue("testing");
      await expect.soft(searchInput).toHaveValue(expect.stringContaining("test"));
        
      // Close modal
      await chrome.keys("Escape");
    }
    
    console.log("✅ Form interaction soft assertions completed");
  });

  test("Soft assertions with CSS properties", async () => {
    await chrome.url("https://webdriver.io");
    
    const heroSection = await chrome.$(".hero");
    const navigation = await chrome.$("nav");
    
    // Soft assertions on element visibility (which implies CSS display properties)
    await expect.soft(heroSection).toBeDisplayed(); // This implies display is not "none"
    await expect.soft(navigation).toBeDisplayed();
    
    // Test element dimensions with soft assertions
    const heroSize = await heroSection.getSize();
    const heroLocation = await heroSection.getLocation();
    
    // Use regular expect for primitive values since expect.soft() works on WebDriver elements
    expect(heroSize.width).toBeGreaterThan(100);
    expect(heroSize.height).toBeGreaterThan(50);
    expect(heroLocation.x).toBeGreaterThanOrEqual(0);
    expect(heroLocation.y).toBeGreaterThanOrEqual(0);
    
    console.log("✅ CSS property soft assertions completed");
  });

  test("Soft assertions with asymmetric matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Use elements that actually exist and have content
    const heroDescription = await chrome.$(".hero p, .subtitle, [class*='hero'] p");
    const allLinks = await chrome.$$("a");
    
    // Soft assertions with various asymmetric matchers
    await expect.soft(heroDescription).toHaveText(expect.stringContaining("automation"));
    await expect.soft(heroDescription).toHaveText(expect.stringMatching(/automation|testing|framework/i));
    await expect.soft(heroDescription).not.toHaveText(expect.stringContaining("Vue.js"));
    
    // Array matchers with soft assertions
    const linkTexts = [];
    const maxLinks = Math.min(3, await allLinks.length);
    for (let i = 0; i < maxLinks; i++) {
      const linkText = await allLinks[i].getText();
      linkTexts.push(linkText);
    }
    
    expect(linkTexts).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(linkTexts.length).toBeGreaterThan(0);
    
    // Window properties with regular expect since these are primitive values
    const windowSize = await chrome.getWindowSize();
    expect(windowSize).toEqual(expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number),
    }));
    
    console.log("✅ Asymmetric matcher soft assertions completed");
  });

  test("Chainable element soft assertions", async () => {
    await chrome.url("https://webdriver.io");
    
    // Soft assertions with chainable elements (not awaited)
    const chainableHero = chrome.$(".hero");
    const chainableNav = chrome.$("nav");
    const chainableLinks = chrome.$$("a");
    
    // These should work without await since they're chainable
    await expect.soft(chainableHero).toBeDisplayed();
    await expect.soft(chainableNav).toBeDisplayed();
    await expect.soft(chainableLinks).toBeElementsArrayOfSize({ gte: 5 });
    
    await expect.soft(chainableHero).toExist();
    await expect.soft(chainableNav).toExist();
    await expect.soft(chainableHero).not.toHaveText("");
    
    console.log("✅ Chainable element soft assertions completed");
  });

  test("Mixed soft and regular assertions", async () => {
    await chrome.url("https://webdriver.io");
    
    const heroSection = await chrome.$(".hero");
    
    // Regular assertion - will stop test if it fails
    await expect(heroSection).toExist();
    
    // Soft assertions - will collect failures but continue
    await expect.soft(heroSection).toBeDisplayed();
    await expect.soft(heroSection).toHaveText(expect.stringContaining("WebdriverIO"));
    await expect.soft(heroSection).not.toHaveText("Non-existent text");
    
    // Another regular assertion
    await expect(chrome).toHaveUrl(expect.stringContaining("webdriver"));
    
    // More soft assertions
    await expect.soft(chrome).toHaveTitle(expect.any(String));
    await expect.soft(chrome).not.toHaveTitle("");
    
    console.log("✅ Mixed soft and regular assertions completed");
  });

  test("Soft assertion failure collection demo", async () => {
    await chrome.url("https://webdriver.io");
    
    const heroSection = await chrome.$(".hero");
    
    // This test demonstrates how to use soft assertions and check failure counts
    // without actually failing the test - useful for demonstrations
    
    // All passing soft assertions
    await expect.soft(heroSection).toExist(); // Should pass
    await expect.soft(heroSection).toBeDisplayed(); // Should pass
    await expect.soft(chrome).toHaveUrl(expect.stringContaining("webdriver")); // Should pass
    await expect.soft(chrome).toHaveTitle(expect.stringContaining("WebdriverIO")); // Should pass
    
    // Check soft failure count (should be 0)
    const softFailures = expect.getSoftFailures();
    console.log(`Number of soft failures collected: ${softFailures.length}`);
    
    // More passing assertions
    await expect.soft(heroSection).not.toHaveText(""); // Should pass
    await expect.soft(chrome).toHaveUrl("https://webdriver.io/"); // Should pass
    
    console.log("✅ Soft assertion failure collection demo completed");
    console.log("💡 This test shows soft assertion usage without failures");
    console.log("🔍 In a real scenario, soft failures would be collected and reported at the end");
  });

  test("Demonstrating soft assertion benefits", async () => {
    await chrome.url("https://webdriver.io");
    
    // In a traditional test, if the first assertion fails, 
    // we'd never know about the other potential failures
    // With soft assertions, we collect ALL failures
    
    const heroSection = await chrome.$(".hero");
    const navigation = await chrome.$("nav");
    const footer = await chrome.$("footer");
    
    // Test multiple elements - all failures will be collected
    await expect.soft(heroSection).toExist();
    await expect.soft(heroSection).toBeDisplayed();
    // Use a more reliable text assertion or skip if hero doesn't contain text
    const heroText = await heroSection.getText();
    if (heroText) {
      await expect.soft(heroSection).toHaveText(expect.stringContaining("automation"));
    }
    
    await expect.soft(navigation).toExist();
    await expect.soft(navigation).toBeDisplayed();
    // Test tag name instead of role attribute since role may not exist
    await expect.soft(navigation).toHaveElementProperty("tagName", "NAV");
    
    // This might fail, but test continues
    await expect.soft(footer).toExist();
    await expect.soft(footer).toBeDisplayed();
    
    // Browser level assertions
    await expect.soft(chrome).toHaveUrl("https://webdriver.io/");
    await expect.soft(chrome).toHaveTitle(expect.stringContaining("WebdriverIO"));
    
    console.log("✅ Comprehensive soft assertion test completed");
    console.log("📋 All assertion results will be reported together at the end");
  });
});
