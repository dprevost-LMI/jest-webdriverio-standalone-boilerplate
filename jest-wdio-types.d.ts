/**
 * Custom type declarations to augment Jest's global expect with WebdriverIO matchers
 * This bridges the gap between @types/jest and expect-webdriverio
 */

// Re-export the jest namespace with WebdriverIO matchers included
declare global { 
  // Chrome global from WebdriverIO setup
  var chrome: WebdriverIO.Browser;
}
