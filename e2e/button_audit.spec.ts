import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/schemes',
  '/complaints',
  '/assistant',
  '/credentials',
  '/id'
];

test.describe('Button Audit', () => {
  for (const route of routes) {
    test(`Audit buttons on ${route}`, async ({ page }) => {
      // Setup dialog handler to dismiss alerts we added
      page.on('dialog', async dialog => {
        await dialog.dismiss();
      });

      // Listen for unhandled errors
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      
      // Listen for console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      const response = await page.goto(`http://localhost:3000${route}`);
      expect(response?.status()).toBe(200);

      // Give it a moment to render client components
      await page.waitForTimeout(1000);

      // Find all buttons
      const buttons = await page.locator('button').all();
      console.log(`Found ${buttons.length} buttons on ${route}`);

      for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        const isVisible = await btn.isVisible();
        if (!isVisible) continue;

        const text = await btn.textContent();
        
        try {
          // Force click in case it's covered by other elements or animations
          await btn.click({ force: true, timeout: 2000 });
        } catch (e: any) {
          console.warn(`Could not click button "${text?.trim()}" on ${route}: ${e.message}`);
        }

        // Small wait to catch any immediate errors
        await page.waitForTimeout(200);
      }

      // We should not have any unhandled JS errors
      // Ignore some common hydration/React errors if they are noise, but fail on real errors
      const realErrors = errors.filter(e => !e.includes('Hydration') && !e.includes('favicon'));
      expect(realErrors).toEqual([]);
    });
  }
});
