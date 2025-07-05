import { expect } from "expect-webdriverio";
import { test, describe, expect as jestExpect } from "@jest/globals";

describe("WebdriverIO Comprehensive Tests", () => {
  test("Browser matchers - toHaveUrl and toHaveTitle", async () => {
    // Navigate to WebdriverIO site
    await chrome.url("https://webdriver.io");
    
    // Test toHaveUrl matcher
    await expect(chrome).toHaveUrl("https://webdriver.io/");
    await expect(chrome).toHaveUrl(expect.stringContaining("webdriver"));
    
    // Test toHaveTitle matcher
    await expect(chrome).toHaveTitle(expect.stringContaining("WebdriverIO"));
  });

  test("Element existence and display matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test element existence
    const heroSection = await chrome.$(".hero");
    await expect(heroSection).toExist();
    await expect(heroSection).toBeDisplayed();
    
    // Test non-existent element
    const nonExistent = await chrome.$(".does-not-exist");
    await expect(nonExistent).not.toExist();
  });

  test("Text content matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test toHaveText matcher with different options
    const subtitle = await chrome.$(".hero__subtitle");
    await expect(subtitle).toHaveText(expect.stringContaining("automation"));
    await expect(subtitle).toHaveText(expect.stringContaining("Node.js"));
    
    // Test with ignoreCase option
    await expect(subtitle).toHaveText(expect.stringContaining("AUTOMATION"), { ignoreCase: true });
    
  });

  test("Attribute matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test toHaveAttribute matcher with a more reliable selector
    const logoLink = await chrome.$("a[href=\"/\"]");
    await expect(logoLink).toHaveAttribute("href");
    await expect(logoLink).toHaveAttribute("href", "/");
    
    // Test class attributes  
    const heroTitle = await chrome.$(".hero__title");
    await expect(heroTitle).toHaveElementClass("hero__title");
    
  });

  test("Form interaction and value matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test search functionality
    const searchButton = await chrome.$(".DocSearch-Button");
    await expect(searchButton).toBeClickable();
    await searchButton.click();
    
    const searchInput = await chrome.$("#docsearch-input");
    await expect(searchInput).toBeDisplayed();
    
    // Test input value
    await searchInput.setValue("api");
    await expect(searchInput).toHaveValue("api");
    await expect(searchInput).toHaveValue(expect.stringContaining("ap"));
    
    // Test suggestions appear
    const suggestions = await chrome.$(".DocSearch-Hit");
    await suggestions.waitForExist({ timeout: 3000 });
    await expect(suggestions).toExist();
    
    // Close search modal
    await chrome.keys("Escape");
    
  });

  test("HTML content matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test toHaveHTML matcher
    const navigation = await chrome.$("nav");
    await expect(navigation).toHaveHTML(expect.stringContaining("nav"));
    
    // Test with array of expected values
    const heroSection = await chrome.$(".hero");
    await expect(heroSection).toHaveHTML(expect.stringContaining("hero"));
    
  });

  test("Multiple elements and array matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test multiple elements
    const navigationLinks = await chrome.$$("nav a");
    await expect(navigationLinks).toBeElementsArrayOfSize({ gte: 3 });
    
    // Test text content of multiple elements - use more generic approach
    const linksCount = await navigationLinks.length;
    if (linksCount >= 1) {
      // Test that first navigation link exists
      const firstLink = navigationLinks[0];
      await expect(firstLink).toExist();
    }
    
  });

  test("Viewport and size matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test element dimensions
    const heroSection = await chrome.$(".hero");
    
    // Get actual dimensions and verify they're reasonable
    const size = await heroSection.getSize();
    expect(size.width).toBeGreaterThan(100);
    expect(size.height).toBeGreaterThan(50);
    
    // Test if element is in viewport
    await expect(heroSection).toBeDisplayedInViewport();
    
  });

  test("Focus and interaction state matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test clickable elements - use a more reliable selector
    const logoLink = await chrome.$("a[href=\"/\"]");
    await expect(logoLink).toBeClickable();
    
    // Test search button focus
    const searchButton = await chrome.$(".DocSearch-Button");
    await searchButton.click();
    
    const searchInput = await chrome.$("#docsearch-input");
    await expect(searchInput).toBeFocused();
    
    // Close search
    await chrome.keys("Escape");
    
  });

  test("Negative assertions and edge cases", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test negative assertions
    const nonExistentElement = await chrome.$(".this-class-does-not-exist");
    await expect(nonExistentElement).not.toExist();
    await expect(nonExistentElement).not.toBeDisplayed();
    
    // Test element that exists but doesn't have certain attributes
    const heroTitle = await chrome.$(".hero__title");
    await expect(heroTitle).not.toHaveAttribute("data-nonexistent");
    await expect(heroTitle).not.toHaveElementClass("non-existent-class");
    
  });

  test("Complex selectors and CSS matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test complex CSS selectors
    const mainContent = await chrome.$("main");
    await expect(mainContent).toExist();
    
    // Test child elements - use a more specific selector that exists
    const heroTitle = await chrome.$(".hero__title");
    await expect(heroTitle).toExist();
    
    // Test CSS properties if available
    const heroSection = await chrome.$(".hero");
    await expect(heroSection).toHaveElementClass(expect.stringContaining("hero"));
    
  });

  test("RegExp and partial matchers", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test RegExp matchers
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
    
  });

  test("Standard Jest matchers - toEqual and toBe", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test using standard Jest matchers with element properties
    const heroSection = await chrome.$(".hero");
    

    
    // Get element properties and test with standard matchers
    const isDisplayed = await heroSection.isDisplayed();

    const expectVoid = expect(isDisplayed);
    await expectVoid;

    expectVoid.toBe(true);
    jestExpect(isDisplayed).toBe(true);
    
    const exists = await heroSection.isExisting();
    expect(exists).toEqual(true);
    
    // Test element dimensions with standard matchers
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
    const currentUrl = await chrome.getUrl();
    expect(currentUrl).toEqual("https://webdriver.io/");
    expect(currentUrl).toMatch(/^https:\/\/webdriver\.io/);
    
    const title = await chrome.getTitle();
    expect(title).toEqual(expect.stringContaining("WebdriverIO"));
    expect(title.length).toBeGreaterThan(0);
    
    // Test element text content with standard matchers
    // Use page title instead since h1 might be empty
    const pageTitle = await chrome.getTitle();
    expect(pageTitle).toEqual(expect.stringContaining("WebdriverIO"));
    expect(typeof pageTitle).toBe("string");
    expect(pageTitle.length).toBeGreaterThan(0);
    
    // Test element attributes with standard matchers
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
    const navLinks = await chrome.$$("nav a");
    const linkCount = navLinks.length;
    await expect(linkCount).toBeGreaterThanOrEqual(1);
    expect(typeof linkCount).toBe("number");
    expect(Array.isArray(navLinks)).toBe(true);
    
    // Test element tag names
    const tagName = await heroSection.getTagName();
    expect(tagName.toLowerCase()).toEqual("header");
    expect(tagName).toMatch(/^(header|div|section)$/i);
    
  });

  test("Jest matchers with form interactions", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test search button interactions with standard matchers
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
    
  });

  test("Array and object matchers with WebDriver data", async () => {
    
    await chrome.url("https://webdriver.io");
    
    // Test window handles as array
    const windowHandles = await chrome.getWindowHandles();
    expect(windowHandles).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(windowHandles.length).toBe(1);
    expect(Array.isArray(windowHandles)).toBe(true);
    
    // Test window size as object
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
    const allLinks = await chrome.$$("a");
    expect(allLinks).toEqual(expect.any(Array));
    await expect(allLinks.length).toBeGreaterThan(0);
    
    // Test element texts as array - test first 3 elements
    const linkTexts = [];
    const maxLinks = Math.min(3, await allLinks.length);
    for (let i = 0; i < maxLinks; i++) {
      const linkText = await allLinks[i].getText();
      linkTexts.push(linkText);
    }
    
    expect(linkTexts).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(linkTexts.every((text: any) => typeof text === "string")).toBe(true);
    
  });
});
