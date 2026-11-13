# Project title: Demo UI Automation Tests

Description: practicing creating UI tests from 0. UI tests that verify login, inventory, shopping cart and checkout functionality.
Technology: Playwright and JavaScript

## Project Structure

- `tests/` - contains automated UI tests
- `pages/` - contains POM classes
- `playwright.config.js` - configures Playwright test execution
- `.github/workflows/playwright.yml` - defines the GitHub Actions CI workflow

## Installation

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/viktoryiakorkhava/playwright-demo-ui-tests.git
   cd playwright-demo-ui-tests
   ```

2. Install project dependencies:

   ```bash
   npm ci
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

   ## Running Tests

Runs all tests across Chromium, Firefox, and WebKit:

```bash
  npx playwright test
```

Runs tests only in Chromium:

```bash
  npx playwright test --project=chromium
```

Opens the Playwright HTML test report:

```bash
  npx playwright show-report
```

## Continuous Integration (CI/CD)

1. GitHub Actions automatically runs Playwright tests when code is pushed to the master branch or a pull request targets it.
2. Tests execute on an Ubuntu runner across Chromium, Firefox, and WebKit.
3. The workflow uploads an HTML test report as an artifact.
