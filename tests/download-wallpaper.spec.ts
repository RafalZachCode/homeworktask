import { test, expect } from '@playwright/test';
import { BasePageDriver } from './drivers/BasePageDriver';
import { baseUrl } from './baseUrl';
import * as fs from 'fs';

test('Download free wallpaper', async ({ page }) => {

    const basePageDriver = await BasePageDriver.goto(page, `${baseUrl}/wallpapers/3dddb5c2-6661-481a-b47f-736128c53c95`);
    await page.waitForTimeout(5000);
    const download = await basePageDriver.downloadWallpaper();

    // Verify the download completed and has a filename
    const fileName = download.suggestedFilename();
    expect(fileName).toBeTruthy();

    // Save and verify the file actually exists on disk
    const filePath = `./downloads/${fileName}`;
    await download.saveAs(filePath);

    expect(fs.existsSync(filePath)).toBe(true);

    // Optional: verify it's not an empty file
    const fileSize = fs.statSync(filePath).size;
    expect(fileSize).toBeGreaterThan(0);
});
