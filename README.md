# Important

- make sure to set the URL inside the `baseURL.ts` file
- Add the url without the forward slash at the end "/"

## Playwright Setup

This project is configured to use Playwright Test.

## Commands

- `npm install` - install dependencies
- `npm test` - run Playwright tests
- `npm run test:headed` - run tests in headed mode
- `npm run test:debug` - run Playwright in debug mode

- you can run individual tests via `npm test` + test file name
- `npm test download-wallpaper`
- `npm test identify-free-premium`
- `npm test search-word-check-result`


## Test Cases

### 1. **Download Free Wallpaper** (`download-wallpaper.spec.ts`)
- **Purpose**: Verify that users can successfully download a free wallpaper and that the file is saved correctly.
- **Test Steps**:
  1. Navigate to a specific free wallpaper URL
  2. Wait for the page to load
  3. Click the Download button
  4. Capture the download event and save the file locally
- **Assertions**:
  - Download has a valid filename
  - File exists on disk after download
  - Downloaded file is not empty (size > 0 bytes)

### 2. **Identify Free and Premium Wallpapers** (`identify-free-premium.spec.ts`)

#### 2.1 Identify Premium Wallpaper Download
- **Purpose**: Verify that premium wallpapers trigger a login/unlock modal instead of direct download.
- **Test Steps**:
  1. Search for wallpapers using a keyword
  2. Check wallpapers that have a premium badge
  3. Click on a premium wallpaper
  4. Click the Download button
- **Assertions**:
  - Modal appears with text: "Unlock and Support the Artist"
  - Modal contains: "Login to unlock 3 free premium downloads daily!"
  - Modal contains: "Buy Credits" option

#### 2.2 Identify Free Wallpaper Download
- **Purpose**: Verify that free wallpapers trigger the download flow without requiring login.
- **Test Steps**:
  1. Search for wallpapers using the keyword 'ocean'
  2. Filter wallpapers without premium badge
  3. Click on the first free wallpaper
  4. Click the Download button
- **Assertions**:
  - Modal appears with text: "Preparing your download" and an AD

### 3. **Search Word Check Result** (`search-word-check-result.spec.ts`)
- **Purpose**: Verify that search functionality returns relevant results matching the search keyword.
- **Test Steps**:
  1. Navigate to the home page
  2. Perform a search with some keyword
  3. Check the results and make sure they have something in common with the keyword
- **Assertions**:
  - Search returns exactly 15 results
  - They match the keyword


