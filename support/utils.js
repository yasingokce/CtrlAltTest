const { getSelector } = require('../support/alliasHelper');

async function waitAndGet(page, alias, state = 'visible') {
  const selector = getSelector(alias);
  const locator = page.locator(selector);
  await locator.waitFor({ state });
  return locator; 
}

async function waitAndClick(page, alias) {
  const selector = getSelector(alias);
  await page.waitForSelector(selector, { state: 'visible' });
  await page.click(selector);
}

module.exports = {
  waitAndGet,
  waitAndClick,
};