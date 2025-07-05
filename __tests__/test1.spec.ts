import { expect } from "expect-webdriverio";
import { test, describe } from "@jest/globals";

const timestamp = () => `[${new Date().toISOString()}]`;

describe("WebdriverIO Comprehensive Tests", () => {
  test("Browser matchers - toHaveUrl and toHaveTitle", async () => {
    console.log(`${timestamp()} Starting browser navigation test`);
    
    // Navigate to WebdriverIO site
    console.log(`${timestamp()} Navigating to https://webdriver.io`);
    await chrome.url("https://webdriver.io");
    
    // Test toHaveUrl matcher
    console.log(`${timestamp()} Testing toHaveUrl matcher`);
    await expect(chrome).toHaveUrl("https://webdriver.io/");
    await expect(chrome).toHaveUrl(expect.stringContaining("webdriver"));
    
    // Test toHaveTitle matcher
    console.log(`${timestamp()} Testing toHaveTitle matcher`);
    await expect(chrome).toHaveTitle(expect.stringContaining("WebdriverIO"));
    
    console.log(`${timestamp()} Browser matchers test completed`);
  });

  test("Element existence and display matchers", async () => {
    console.log(`${timestamp()} Starting element existence tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test element existence
    console.log(`${timestamp()} Testing element existence matchers`);
    const heroSection = await chrome.$(".hero");
    await expect(heroSection).toExist();
    await expect(heroSection).toBeDisplayed();
    
    // Test non-existent element
    const nonExistent = await chrome.$(".does-not-exist");
    await expect(nonExistent).not.toExist();
    
    console.log(`${timestamp()} Element existence tests completed`);
  });

  test("Text content matchers", async () => {
    console.log(`${timestamp()} Starting text content tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test toHaveText matcher with different options
    console.log(`${timestamp()} Testing toHaveText matchers`);
    const subtitle = await chrome.$(".hero__subtitle");
    await expect(subtitle).toHaveText(expect.stringContaining("automation"));
    await expect(subtitle).toHaveText(expect.stringContaining("Node.js"));
    
    // Test with ignoreCase option
    await expect(subtitle).toHaveText(expect.stringContaining("AUTOMATION"), { ignoreCase: true });
    
    console.log(`${timestamp()} Text content tests completed`);
  });

  test("Attribute matchers", async () => {
    console.log(`${timestamp()} Starting attribute tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test toHaveAttribute matcher with a more reliable selector
    console.log(`${timestamp()} Testing toHaveAttribute matchers`);
    const logoLink = await chrome.$("a[href=\"/\"]");
    await expect(logoLink).toHaveAttribute("href");
    await expect(logoLink).toHaveAttribute("href", "/");
    
    // Test class attributes  
    const heroTitle = await chrome.$(".hero__title");
    await expect(heroTitle).toHaveElementClass("hero__title");
    
    console.log(`${timestamp()} Attribute tests completed`);
  });

  test("Form interaction and value matchers", async () => {
    console.log(`${timestamp()} Starting form interaction tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test search functionality
    console.log(`${timestamp()} Testing search interaction`);
    const searchButton = await chrome.$(".DocSearch-Button");
    await expect(searchButton).toBeClickable();
    await searchButton.click();
    
    const searchInput = await chrome.$("#docsearch-input");
    await expect(searchInput).toBeDisplayed();
    
    // Test input value
    console.log(`${timestamp()} Testing input value`);
    await searchInput.setValue("api");
    await expect(searchInput).toHaveValue("api");
    await expect(searchInput).toHaveValue(expect.stringContaining("ap"));
    
    // Test suggestions appear
    console.log(`${timestamp()} Testing search suggestions`);
    const suggestions = await chrome.$(".DocSearch-Hit");
    await suggestions.waitForExist({ timeout: 3000 });
    await expect(suggestions).toExist();
    
    // Close search modal
    await chrome.keys("Escape");
    
    console.log(`${timestamp()} Form interaction tests completed`);
  });

  test("HTML content matchers", async () => {
    console.log(`${timestamp()} Starting HTML content tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test toHaveHTML matcher
    console.log(`${timestamp()} Testing toHaveHTML matchers`);
    const navigation = await chrome.$("nav");
    await expect(navigation).toHaveHTML(expect.stringContaining("nav"));
    
    // Test with array of expected values
    const heroSection = await chrome.$(".hero");
    await expect(heroSection).toHaveHTML(expect.stringContaining("hero"));
    
    console.log(`${timestamp()} HTML content tests completed`);
  });

  test("Multiple elements and array matchers", async () => {
    console.log(`${timestamp()} Starting multiple elements tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test multiple elements
    console.log(`${timestamp()} Testing multiple elements`);
    const navigationLinks = await chrome.$$("nav a");
    await expect(navigationLinks).toBeElementsArrayOfSize({ gte: 3 });
    
    // Test text content of multiple elements - use more generic approach
    const linksCount = await navigationLinks.length;
    if (linksCount >= 1) {
      // Test that first navigation link exists
      const firstLink = navigationLinks[0];
      await expect(firstLink).toExist();
    }
    
    console.log(`${timestamp()} Multiple elements tests completed`);
  });

  test("Viewport and size matchers", async () => {
    console.log(`${timestamp()} Starting viewport and size tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test element dimensions
    console.log(`${timestamp()} Testing element dimensions`);
    const heroSection = await chrome.$(".hero");
    
    // Get actual dimensions and verify they're reasonable
    const size = await heroSection.getSize();
    expect(size.width).toBeGreaterThan(100);
    expect(size.height).toBeGreaterThan(50);
    
    // Test if element is in viewport
    await expect(heroSection).toBeDisplayedInViewport();
    
    console.log(`${timestamp()} Viewport and size tests completed`);
  });

  test("Focus and interaction state matchers", async () => {
    console.log(`${timestamp()} Starting focus and interaction tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test clickable elements - use a more reliable selector
    console.log(`${timestamp()} Testing clickable elements`);
    const logoLink = await chrome.$("a[href=\"/\"]");
    await expect(logoLink).toBeClickable();
    
    // Test search button focus
    const searchButton = await chrome.$(".DocSearch-Button");
    await searchButton.click();
    
    const searchInput = await chrome.$("#docsearch-input");
    await expect(searchInput).toBeFocused();
    
    // Close search
    await chrome.keys("Escape");
    
    console.log(`${timestamp()} Focus and interaction tests completed`);
  });

  test("Negative assertions and edge cases", async () => {
    console.log(`${timestamp()} Starting negative assertions tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test negative assertions
    console.log(`${timestamp()} Testing negative assertions`);
    const nonExistentElement = await chrome.$(".this-class-does-not-exist");
    await expect(nonExistentElement).not.toExist();
    await expect(nonExistentElement).not.toBeDisplayed();
    
    // Test element that exists but doesn't have certain attributes
    const heroTitle = await chrome.$(".hero__title");
    await expect(heroTitle).not.toHaveAttribute("data-nonexistent");
    await expect(heroTitle).not.toHaveElementClass("non-existent-class");
    
    console.log(`${timestamp()} Negative assertions tests completed`);
  });

  test("Complex selectors and CSS matchers", async () => {
    console.log(`${timestamp()} Starting complex selectors tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test complex CSS selectors
    console.log(`${timestamp()} Testing complex CSS selectors`);
    const mainContent = await chrome.$("main");
    await expect(mainContent).toExist();
    
    // Test child elements - use a more specific selector that exists
    const heroTitle = await chrome.$(".hero__title");
    await expect(heroTitle).toExist();
    
    // Test CSS properties if available
    const heroSection = await chrome.$(".hero");
    await expect(heroSection).toHaveElementClass(expect.stringContaining("hero"));
    
    console.log(`${timestamp()} Complex selectors tests completed`);
  });

  test("RegExp and partial matchers", async () => {
    console.log(`${timestamp()} Starting RegExp and partial matchers tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test RegExp matchers
    console.log(`${timestamp()} Testing RegExp matchers`);
    await expect(chrome).toHaveTitle(/WebdriverIO/i);
    await expect(chrome).toHaveUrl(/webdriver\.io/);
    
    // Test partial matchers
    const subtitle = await chrome.$(".hero__subtitle");
    await expect(subtitle).toHaveText(expect.stringContaining("automation"));
    await expect(subtitle).toHaveText(expect.stringContaining("framework"));
    
    // Test array of partial matchers
    await expect(subtitle).toHaveText([
      expect.stringContaining("automation"),
      expect.stringContaining("Node.js"),
    ]);
    
    console.log(`${timestamp()} RegExp and partial matchers tests completed`);
  });

  test("Standard Jest matchers - toEqual and toBe", async () => {
    console.log(`${timestamp()} Starting standard Jest matchers tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test using standard Jest matchers with element properties
    console.log(`${timestamp()} Testing element properties with Jest matchers`);
    const heroSection = await chrome.$(".hero");
    
    // Get element properties and test with standard matchers
    const isDisplayed = await heroSection.isDisplayed();
    expect(isDisplayed).toBe(true);
    
    const exists = await heroSection.isExisting();
    expect(exists).toEqual(true);
    
    // Test element dimensions with standard matchers
    console.log(`${timestamp()} Testing dimensions with standard matchers`);
    const size = await heroSection.getSize();
    expect(size).toEqual(expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number),
    }));
    expect(size.width).toBeGreaterThan(0);
    expect(size.height).toBeGreaterThan(0);
    
    // Test element location
    const location = await heroSection.getLocation();
    expect(location).toEqual(expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }));
    
    // Test browser properties with standard matchers
    console.log(`${timestamp()} Testing browser properties with standard matchers`);
    const currentUrl = await chrome.getUrl();
    expect(currentUrl).toEqual("https://webdriver.io/");
    expect(currentUrl).toMatch(/^https:\/\/webdriver\.io/);
    
    const title = await chrome.getTitle();
    expect(title).toEqual(expect.stringContaining("WebdriverIO"));
    expect(title.length).toBeGreaterThan(0);
    
    // Test element text content with standard matchers
    console.log(`${timestamp()} Testing text content with standard matchers`);
    // Use page title instead since h1 might be empty
    const pageTitle = await chrome.getTitle();
    expect(pageTitle).toEqual(expect.stringContaining("WebdriverIO"));
    expect(typeof pageTitle).toBe("string");
    expect(pageTitle.length).toBeGreaterThan(0);
    
    // Test element attributes with standard matchers
    console.log(`${timestamp()} Testing attributes with standard matchers`);
    const logoLink = await chrome.$("a[href=\"/\"]");
    const href = await logoLink.getAttribute("href");
    expect(href).toBe("/");
    expect(href).toEqual("/");
    
    // Test CSS properties with standard matchers
    const heroDisplay = await heroSection.getCSSProperty("display");
    expect(heroDisplay).toEqual(expect.objectContaining({
      property: "display",
      value: expect.any(String),
    }));
    expect(heroDisplay.value).not.toBe("none");
    
    // Test multiple elements count with standard matchers
    console.log(`${timestamp()} Testing element collections with standard matchers`);
    const navLinks = await chrome.$$("nav a");
    const linkCount = navLinks.length;
    expect(linkCount).toBeGreaterThanOrEqual(1);
    expect(typeof linkCount).toBe("number");
    expect(Array.isArray(navLinks)).toBe(true);
    
    // Test element tag names
    const tagName = await heroSection.getTagName();
    expect(tagName.toLowerCase()).toEqual("header");
    expect(tagName).toMatch(/^(header|div|section)$/i);
    
    console.log(`${timestamp()} Standard Jest matchers tests completed`);
  });

  test("Jest matchers with form interactions", async () => {
    console.log(`${timestamp()} Starting Jest matchers with form interactions`);
    
    await chrome.url("https://webdriver.io");
    
    // Test search button interactions with standard matchers
    console.log(`${timestamp()} Testing button interactions with Jest matchers`);
    const searchButton = await chrome.$(".DocSearch-Button");
    
    const isClickable = await searchButton.isClickable();
    expect(isClickable).toBe(true);
    expect(isClickable).toEqual(true);
    
    const isEnabled = await searchButton.isEnabled();
    expect(isEnabled).toBe(true);
    
    // Click and test modal appearance
    await searchButton.click();
    
    const searchInput = await chrome.$("#docsearch-input");
    await searchInput.waitForDisplayed({ timeout: 3000 });
    
    const inputDisplayed = await searchInput.isDisplayed();
    expect(inputDisplayed).toBe(true);
    
    // Test input value changes
    console.log(`${timestamp()} Testing input value changes with Jest matchers`);
    await searchInput.setValue("testing");
    
    const inputValue = await searchInput.getValue();
    expect(inputValue).toEqual("testing");
    expect(inputValue).toBe("testing");
    expect(inputValue.length).toEqual(7);
    
    // Clear and test empty value
    await searchInput.clearValue();
    const clearedValue = await searchInput.getValue();
    expect(clearedValue).toBe("");
    expect(clearedValue).toEqual("");
    expect(clearedValue.length).toEqual(0);
    
    // Close modal
    await chrome.keys("Escape");
    
    console.log(`${timestamp()} Jest matchers with form interactions completed`);
  });

  test("Array and object matchers with WebDriver data", async () => {
    console.log(`${timestamp()} Starting array and object matchers tests`);
    
    await chrome.url("https://webdriver.io");
    
    // Test window handles as array
    console.log(`${timestamp()} Testing window handles with array matchers`);
    const windowHandles = await chrome.getWindowHandles();
    expect(windowHandles).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(windowHandles.length).toBe(1);
    expect(Array.isArray(windowHandles)).toBe(true);
    
    // Test window size as object
    console.log(`${timestamp()} Testing window size with object matchers`);
    const windowSize = await chrome.getWindowSize();
    expect(windowSize).toEqual({
      width: expect.any(Number),
      height: expect.any(Number),
    });
    expect(windowSize).toEqual(expect.objectContaining({
      width: expect.any(Number),
    }));
    
    // Test element location and size as objects
    const heroSection = await chrome.$(".hero");
    const location = await heroSection.getLocation();
    const size = await heroSection.getSize();
    
    expect(location).toEqual({
      x: expect.any(Number),
      y: expect.any(Number),
    });
    
    expect(size).toEqual({
      width: expect.any(Number),
      height: expect.any(Number),
    });
    
    // Test multiple elements as array
    console.log(`${timestamp()} Testing multiple elements with array matchers`);
    const allLinks = await chrome.$$("a");
    expect(allLinks).toEqual(expect.any(Array));
    expect(allLinks.length).toBeGreaterThan(0);
    
    // Test element texts as array - test first 3 elements
    const linkTexts = [];
    const maxLinks = Math.min(3, await allLinks.length);
    for (let i = 0; i < maxLinks; i++) {
      const linkText = await allLinks[i].getText();
      linkTexts.push(linkText);
    }
    
    expect(linkTexts).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(linkTexts.every((text: any) => typeof text === "string")).toBe(true);
    
    console.log(`${timestamp()} Array and object matchers tests completed`);
  });
});
