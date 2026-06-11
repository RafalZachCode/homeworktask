import { test, expect } from '@playwright/test';
import { BasePageDriver } from './drivers/BasePageDriver';
import { baseUrl } from './baseUrl';

const keyword = 'summer';

test(`Load search results for specific keyword, expect atleast 10 results to primarily match the ${keyword}`, async ({ page }) => {

  const basePageDriver = await BasePageDriver.goto(page, `${baseUrl}/ringtones-and-wallpapers`);
  await basePageDriver.search(keyword);

  const wallpapers = await basePageDriver.getWallpapers();

  await expect(wallpapers).toHaveCount(15);

  const count = await wallpapers.count();
  let matchCount = 0;

  for (let i = 0; i < count; i++) {
    const wallpaper = wallpapers.nth(i);
    const ariaLabel = await wallpaper.getAttribute('aria-label');
    if (ariaLabel?.toLowerCase().includes(keyword.toLowerCase())) {
      matchCount++;
    }
  }

  expect(matchCount).toBeGreaterThanOrEqual(10);
});
