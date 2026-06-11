import { test, expect, Locator } from '@playwright/test';
import { BasePageDriver } from './drivers/BasePageDriver';
import { baseUrl } from './baseUrl';
import { selectors } from './selectors/selectors';

const keyword = 'ocean';
let basePageDriver: BasePageDriver;
let wallpapers: Locator;

test.beforeEach(async ({ page }) => {
    basePageDriver = await BasePageDriver.goto(page, `${baseUrl}/find/${keyword}`);
    wallpapers = await basePageDriver.getWallpapers();

})
test.describe.configure({ mode: 'parallel' });
test.describe('Identify free vs premium wallpapers', () => {

    test('Identify premium wallpaper download', async ({ page }) => {
        const premiumWallpaper = wallpapers.filter({ has: page.locator(selectors.badge) }).first();

        const downloadModal = await basePageDriver.goToWallpaperAndClickDownload(premiumWallpaper);
        expect(downloadModal).toContain('Unlock and Support the Artist');
        expect(downloadModal).toContain('Login to unlock 3 free premium downloads daily!');
        expect(downloadModal).toContain('Buy Credits');
    })

    test('Identify free wallpaper download', async ({ page }) => {
        const freeWallpaper = wallpapers.filter({ hasNot: page.locator(selectors.badge) }).first();

        const downloadModal = await basePageDriver.goToWallpaperAndClickDownload(freeWallpaper);
        expect(downloadModal).toContain('Preparing your download');
        expect(downloadModal).toContain('Please wait a few moments for the download to begin');
    })
});
