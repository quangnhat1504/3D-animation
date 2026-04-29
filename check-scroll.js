const { chromium } = require('@playwright/test');

(async () => {
  console.log("Launching browser for error checking...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let errors = [];
  page.on('pageerror', exception => {
    errors.push(`Uncaught exception: "${exception}"`);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console error: "${msg.text()}"`);
    }
  });

  console.log("Navigating to local dev server...");
  try {
    await page.goto('http://localhost:3003');

    console.log("Waiting for canvas sequence to load...");
    await page.waitForSelector('canvas', { state: 'visible', timeout: 15000 });
    await page.waitForTimeout(2000); // give it time to load images

    console.log("Simulating scrolling through the 4 chapters...");
    // Simulate scroll to trigger all Parallax and Effects
    for (let i = 0; i < 50; i++) {
      await page.mouse.wheel(0, 200);
      await page.waitForTimeout(50);
    }
  } catch (e) {
    errors.push(`Navigation/Scroll Error: ${e.message}`);
  }

  if (errors.length > 0) {
    console.error("❌ Playwright detected errors during execution:");
    errors.forEach(e => console.error(e));
    process.exit(1);
  } else {
    console.log("✅ Playwright test passed: No console or runtime errors detected during the 4-chapter scrollytelling sequence.");
  }

  await browser.close();
})();
