import { Download, Locator, Page } from '@playwright/test';
import { selectors } from '../selectors/selectors';

export class BasePageDriver {
    constructor(private page: Page) { }

    static async goto(page: Page, url: string) {
        await page.goto(url);
        await page.waitForLoadState('domcontentloaded');
        // turn off cookie banner if visible
        if (await page.locator(selectors.cookieBanner).isVisible()) {
            await page.click(selectors.cookieBannerAcceptButton);
        }

        return BasePageDriver.build(page);
    }

    async search(searchTerm: string) {
        const searchInput = this.page.locator(selectors.searchInput).first();
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.fill(searchTerm, { timeout: 5000 });
        await this.page.click(selectors.searchButton);
        await this.page.waitForURL(`**/find/${searchTerm}**`, { timeout: 5000 });
    }

    async getWallpapers() {
        const wallpaperList = this.page.locator(selectors.wallpaperList).first();
        await wallpaperList.waitFor({ state: 'visible', timeout: 5000 });
        return wallpaperList.locator('> a');
    }

    async clickDownloadButton() {
        const downloadButton = this.page.getByRole('button', { name: 'Download' }).first();
        await downloadButton.click({ force: true });
    }

    async getDownloadModalText() {
        const modalLocator = this.page.locator(selectors.modalContent).first();
        await modalLocator.waitFor({ state: 'visible', timeout: 5000 });
        const modalText = await modalLocator.textContent();
        return modalText;
    }

    async downloadWallpaper(): Promise<Download> {
        const downloadPromise = this.page.waitForEvent('download', { timeout: 20000 });
        await this.clickDownloadButton();
        return downloadPromise;
    }

    async goToWallpaperAndClickDownload(wallpaper: Locator) {
        await wallpaper.click();
        await this.page.waitForURL('**/wallpapers/**', { timeout: 5000 });
        await this.page.waitForLoadState('domcontentloaded');

        await this.clickDownloadButton();
        return this.getDownloadModalText();
    }

    static build(page: Page) {
        return new BasePageDriver(page);
    }

}