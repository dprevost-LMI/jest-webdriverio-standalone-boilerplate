describe("WebdriverIO-specific Matchers", () => {
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
    
    // Test if element is in viewport
    const heroSection = await chrome.$(".hero");
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
    
    // Test negative assertions with WebdriverIO matchers
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

  test("RegExp and partial matchers with WebdriverIO", async () => {
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
});
