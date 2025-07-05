describe("Basic Jest Matchers", () => {
  test("Jest equality matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test using Jest expect with element properties
    const heroSection = await chrome.$(".hero");
    
    // Get element properties and test with Jest matchers
    const isDisplayed = await heroSection.isDisplayed();
    expect(isDisplayed).toBe(true);
    expect(isDisplayed).toEqual(true);
    
    const exists = await heroSection.isExisting();
    expect(exists).toBe(true);
    expect(exists).toEqual(true);
    
    // Test browser properties with Jest matchers
    const currentUrl = await chrome.getUrl();
    expect(currentUrl).toBe("https://webdriver.io/");
    expect(currentUrl).toEqual("https://webdriver.io/");
    
    const title = await chrome.getTitle();
    expect(title).toContain("WebdriverIO");
    expect(typeof title).toBe("string");
    expect(title.length).toBeGreaterThan(0);
  });

  test("Jest number and comparison matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test element dimensions with Jest number matchers
    const heroSection = await chrome.$(".hero");
    const size = await heroSection.getSize();
    
    expect(size.width).toBeGreaterThan(0);
    expect(size.height).toBeGreaterThan(0);
    expect(size.width).toBeGreaterThanOrEqual(100);
    expect(size.height).toBeGreaterThanOrEqual(50);
    expect(size.width).toBeLessThan(10000);
    expect(size.height).toBeLessThan(10000);
    expect(size.width).toBeLessThanOrEqual(5000);
    expect(size.height).toBeLessThanOrEqual(5000);
    
    // Test with numbers
    expect(size.width).toBeCloseTo(size.width, 0);
    expect(Number.isInteger(size.width)).toBe(true);
    expect(Number.isInteger(size.height)).toBe(true);
    
    // Test navigation links count
    const navLinks = await chrome.$$("nav a");
    const linkCount = navLinks.length;
    expect(linkCount).toBeGreaterThanOrEqual(1);
    expect(typeof linkCount).toBe("number");
  });

  test("Jest string matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test string methods with Jest
    const title = await chrome.getTitle();
    expect(title).toMatch(/WebdriverIO/i);
    expect(title).toMatch(/^.*WebdriverIO.*$/);
    expect(title).toContain("WebdriverIO");
    
    // Test element text content
    const heroTitle = await chrome.$(".hero__title");
    const titleText = await heroTitle.getText();
    expect(typeof titleText).toBe("string");
    expect(titleText.length).toBeGreaterThanOrEqual(0);
    
    // Test element attributes
    const logoLink = await chrome.$("a[href=\"/\"]");
    const href = await logoLink.getAttribute("href");
    expect(href).toBe("/");
    expect(href).toEqual("/");
    expect(href).toHaveLength(1);
    
    // Test URL patterns
    const currentUrl = await chrome.getUrl();
    expect(currentUrl).toMatch(/^https:\/\//);
    expect(currentUrl).toMatch(/\/$/);
    expect(currentUrl).toContain("webdriver.io");
  });

  test("Jest array and object matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test window handles as array with Jest matchers
    const windowHandles = await chrome.getWindowHandles();
    expect(Array.isArray(windowHandles)).toBe(true);
    expect(windowHandles).toHaveLength(1);
    expect(windowHandles).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(windowHandles[0]).toEqual(expect.any(String));
    
    // Test window size as object with Jest matchers
    const windowSize = await chrome.getWindowSize();
    expect(windowSize).toEqual(expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number),
    }));
    expect(windowSize).toHaveProperty("width");
    expect(windowSize).toHaveProperty("height");
    expect(windowSize).toHaveProperty("width", expect.any(Number));
    expect(windowSize).toHaveProperty("height", expect.any(Number));
    
    // Test element location object
    const heroSection = await chrome.$(".hero");
    const location = await heroSection.getLocation();
    expect(location).toEqual(expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }));
    expect(Object.keys(location)).toContain("x");
    expect(Object.keys(location)).toContain("y");
    
    // Test multiple elements as array
    const allLinks = await chrome.$$("a");
    expect(allLinks).toEqual(expect.any(Array));
    expect(allLinks.length).toBeGreaterThan(0);
    
    // Test element collection properties
    const linkTexts = [];
    const maxLinks = Math.min(3, await allLinks.length);
    for (let i = 0; i < maxLinks; i++) {
      const linkText = await allLinks[i].getText();
      linkTexts.push(linkText);
    }
    expect(linkTexts).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(linkTexts.every((text: any) => typeof text === "string")).toBe(true);
  });

  test("Jest boolean and truthiness matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test boolean values from WebDriver methods with Jest
    const heroSection = await chrome.$(".hero");
    
    const isDisplayed = await heroSection.isDisplayed();
    const exists = await heroSection.isExisting();
    const isEnabled = await heroSection.isEnabled();
    
    // Test with Jest boolean matchers
    expect(isDisplayed).toBe(true);
    expect(exists).toBe(true);
    expect(isEnabled).toBe(true);
    
    expect(isDisplayed).toBeTruthy();
    expect(exists).toBeTruthy();
    expect(isEnabled).toBeTruthy();
    
    expect(isDisplayed).not.toBe(false);
    expect(exists).not.toBe(false);
    expect(isEnabled).not.toBe(false);
    
    expect(isDisplayed).not.toBeFalsy();
    expect(exists).not.toBeFalsy();
    expect(isEnabled).not.toBeFalsy();
    
    // Test with non-existent element
    const nonExistent = await chrome.$(".does-not-exist");
    const nonExistentDisplayed = await nonExistent.isDisplayed();
    const nonExistentExists = await nonExistent.isExisting();
    
    expect(nonExistentDisplayed).toBe(false);
    expect(nonExistentExists).toBe(false);
    expect(nonExistentDisplayed).toBeFalsy();
    expect(nonExistentExists).toBeFalsy();
    expect(nonExistentDisplayed).not.toBeTruthy();
    expect(nonExistentExists).not.toBeTruthy();
  });

  test("Jest type checking matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test different data types with Jest
    const heroSection = await chrome.$(".hero");
    
    // Test string types
    const title = await chrome.getTitle();
    const tagName = await heroSection.getTagName();
    expect(typeof title).toBe("string");
    expect(typeof tagName).toBe("string");
    
    // Test number types
    const size = await heroSection.getSize();
    expect(typeof size.width).toBe("number");
    expect(typeof size.height).toBe("number");
    
    // Test boolean types
    const isDisplayed = await heroSection.isDisplayed();
    const exists = await heroSection.isExisting();
    expect(typeof isDisplayed).toBe("boolean");
    expect(typeof exists).toBe("boolean");
    
    // Test object types
    const location = await heroSection.getLocation();
    const windowSize = await chrome.getWindowSize();
    expect(typeof location).toBe("object");
    expect(typeof windowSize).toBe("object");
    expect(location).not.toBeNull();
    expect(windowSize).not.toBeNull();
    
    // Test array types
    const windowHandles = await chrome.getWindowHandles();
    const allLinks = await chrome.$$("a");
    expect(Array.isArray(windowHandles)).toBe(true);
    expect(Array.isArray(allLinks)).toBe(true);
    
    // Test undefined/null
    const nonExistentAttribute = await heroSection.getAttribute("data-non-existent");
    expect(nonExistentAttribute).toBeNull();
  });

  test("Jest error and exception matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test that certain operations don't throw (synchronous)
    expect(() => {
      const num = 5 + 5;
      return num;
    }).not.toThrow();
    
    expect(() => {
      const title = "WebdriverIO";
      return title.toUpperCase();
    }).not.toThrow();
    
    // Test basic calculations and operations
    const size = await chrome.$(".hero").getSize();
    const area = size.width * size.height;
    expect(area).toBeGreaterThan(0);
    expect(typeof area).toBe("number");
    expect(Number.isFinite(area)).toBe(true);
    
    // Test string operations
    const title = await chrome.getTitle();
    const upperTitle = title.toUpperCase();
    expect(upperTitle).toEqual(title.toUpperCase());
    expect(upperTitle).toContain("WEBDRIVERIO");
  });

  test("Jest promise matchers with resolves", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test that WebDriver promises resolve successfully
    await expect(chrome.getTitle()).resolves.toContain("WebdriverIO");
    await expect(chrome.getUrl()).resolves.toBe("https://webdriver.io/");
    
    // Test element method promises
    const heroSection = await chrome.$(".hero");
    await expect(heroSection.isDisplayed()).resolves.toBe(true);
    await expect(heroSection.isExisting()).resolves.toBe(true);
    await expect(heroSection.isEnabled()).resolves.toBe(true);
    
    // Test element size and location promises
    await expect(heroSection.getSize()).resolves.toEqual(expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number),
    }));
    
    await expect(heroSection.getLocation()).resolves.toEqual(expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }));
    
    // Test element attribute promises
    const logoLink = await chrome.$("a[href=\"/\"]");
    await expect(logoLink.getAttribute("href")).resolves.toBe("/");
    await expect(logoLink.getTagName()).resolves.toMatch(/^(a|A)$/);
    
    // Test window handles promise
    await expect(chrome.getWindowHandles()).resolves.toEqual(expect.arrayContaining([expect.any(String)]));
    
    // Test window size promise
    await expect(chrome.getWindowSize()).resolves.toEqual(expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number),
    }));
    
    // Test element text promise
    const heroTitle = await chrome.$(".hero__title");
    await expect(heroTitle.getText()).resolves.toEqual(expect.any(String));
  });

  test("Jest promise matchers with rejects", async () => {
    await chrome.url("https://webdriver.io");
    
    // Test that invalid selectors or operations reject appropriately
    // Note: WebdriverIO doesn't always throw for invalid selectors, so we'll test other scenarios
    
    // Test invalid window handle operations (these should not reject in normal cases)
    // Instead, let's test some edge cases that might fail
    
    // Test custom promise that rejects
    const rejectedPromise = Promise.reject(new Error("Test rejection"));
    await expect(rejectedPromise).rejects.toThrow("Test rejection");
    await expect(rejectedPromise).rejects.toThrow(Error);
    await expect(rejectedPromise).rejects.toBeInstanceOf(Error);
    
    // Test custom promise that rejects with specific message
    const customRejection = Promise.reject(new Error("Custom error message"));
    await expect(customRejection).rejects.toThrow(/Custom error/);
    await expect(customRejection).rejects.toEqual(expect.any(Error));
    
    // Test promise that rejects with specific value
    const valueRejection = Promise.reject("string error");
    await expect(valueRejection).rejects.toBe("string error");
    await expect(valueRejection).rejects.toEqual("string error");
    
    // Test promise that rejects with object
    const objectRejection = Promise.reject({ error: "object error", code: 404 });
    await expect(objectRejection).rejects.toEqual(expect.objectContaining({
      error: "object error",
      code: 404,
    }));
    await expect(objectRejection).rejects.toHaveProperty("error", "object error");
    
    // Test async function that throws
    const asyncThrowFunction = async () => {
      throw new Error("Async function error");
    };
    
    await expect(asyncThrowFunction()).rejects.toThrow("Async function error");
    await expect(asyncThrowFunction()).rejects.toBeInstanceOf(Error);
  });

  test("Jest mixed promise and synchronous matchers", async () => {
    await chrome.url("https://webdriver.io");
    
    // Combine synchronous and asynchronous assertions
    const heroSection = await chrome.$(".hero");
    
    // Test that promises resolve to expected types
    const titlePromise = chrome.getTitle();
    const sizePromise = heroSection.getSize();
    const locationPromise = heroSection.getLocation();
    
    // Test the promises themselves (before awaiting)
    expect(titlePromise).toBeInstanceOf(Promise);
    expect(sizePromise).toBeInstanceOf(Promise);
    expect(locationPromise).toBeInstanceOf(Promise);
    
    // Test that they resolve to expected values
    await expect(titlePromise).resolves.toEqual(expect.any(String));
    await expect(sizePromise).resolves.toEqual(expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number),
    }));
    await expect(locationPromise).resolves.toEqual(expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }));
    
    // Test Promise.all with multiple WebDriver promises
    const allPromises = Promise.all([
      chrome.getTitle(),
      chrome.getUrl(),
      heroSection.isDisplayed(),
    ]);
    
    await expect(allPromises).resolves.toEqual([
      expect.stringContaining("WebdriverIO"),
      "https://webdriver.io/",
      true,
    ]);
    
    // Test Promise.race (first to resolve)
    const racePromise = Promise.race([
      chrome.getTitle(),
      chrome.getUrl(),
    ]);
    
    await expect(racePromise).resolves.toEqual(expect.any(String));
    
    // Test custom async operations
    const delayedPromise = new Promise<string>(resolve => {
      globalThis.setTimeout(() => resolve("delayed result"), 100);
    });
    
    await expect(delayedPromise).resolves.toBe("delayed result");
    
    // Test that we can combine with timeout
    const quickPromise = Promise.resolve("quick result");
    await expect(quickPromise).resolves.toBe("quick result");
  });
});
