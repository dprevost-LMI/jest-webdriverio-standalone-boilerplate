import { expect } from "expect-webdriverio";
import { test } from "@jest/globals";

test("WebdriverIO test 1", async () => {
  const testStartTime = Date.now();
  console.log(`🚀 Test started at: ${new Date().toISOString()}`);
  
  // Navigate to website
  const navigationStart = Date.now();
  await chrome.url("https://webdriver.io");
  const navigationDuration = Date.now() - navigationStart;
  console.log(`⏱️  Navigation took: ${navigationDuration}ms`);
  
  // Check title
  const titleCheckStart = Date.now();
  await expect(chrome).toHaveTitle("WebdriverIO", { containing: true });
  const titleCheckDuration = Date.now() - titleCheckStart;
  console.log(`⏱️  Title check took: ${titleCheckDuration}ms`);
  
  // Find and click search button
  const searchButtonStart = Date.now();
  const searchButton = await chrome.$(".DocSearch-Button");
  await searchButton.click();
  const searchButtonDuration = Date.now() - searchButtonStart;
  console.log(`⏱️  Search button interaction took: ${searchButtonDuration}ms`);
  
  // Enter search text
  const searchInputStart = Date.now();
  const searchBar = await chrome.$("#docsearch-input");
  await searchBar.setValue("click");
  const searchInputDuration = Date.now() - searchInputStart;
  console.log(`⏱️  Search input took: ${searchInputDuration}ms`);
  
  // Wait for suggestions
  const suggestionsStart = Date.now();
  const suggestions = await chrome.$(".DocSearch-Hit");
  await suggestions.waitForExist();
  const suggestionsDuration = Date.now() - suggestionsStart;
  console.log(`⏱️  Waiting for suggestions took: ${suggestionsDuration}ms`);
  
  const testTotalTime = Date.now() - testStartTime;
  console.log(`✅ Test completed at: ${new Date().toISOString()}`);
  console.log(`🏁 Total test duration: ${testTotalTime}ms (${(testTotalTime / 1000).toFixed(2)}s)`);
  
  // Performance assertions (optional - adjust thresholds as needed)
  expect(navigationDuration).toBeLessThan(10000); // Navigation should take less than 10s
  expect(testTotalTime).toBeLessThan(30000); // Total test should take less than 30s
});