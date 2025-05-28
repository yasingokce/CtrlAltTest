//alliasHelper.js
const aliasMap = {
  "valid username": 'ygsahin4@gmail.com',
  "valid password": 'WAb9CGqcTC.ewUU',
  "invalid username": 'dfmnglkdgflkdgnj',
  "invalid password": 'gdf56g465d4gd65f4ge98rge65grg4r68gf4reger',
  "empty username": "--",
  "empty password": "---" ,
  "loggin button with eMail": '#btnLoginWithEmail',//id selector
  "Email textbox": '#txtEmail',
  "loggin/create account button disabled": '.btn-link-second-menu.d-block.disabled.ng-star-inserted',
  "loggin/create account button enabled": '.btn-link-second-menu.d-block.ng-star-inserted',
  "search input": '#txtSearchBox',
  "auto-suggestions": 'li.ng-star-inserted span.content',
  "first auto-suggestions": '.suggestions > ul:nth-of-type(1) > li > a',
  "last search list": 'div.last-search-list li a',
  "homepage":'https://www.e-bebek.com/',
  "first item":'eb-product-list-item >> nth=0',
  "add to cart": "//button[@class='btn btn-add disable ng-star-inserted']",
  "close popup":"//i[@class='icon-close-modal']",
  "cart popup" : 'span.number.ng-star-inserted',
  "product":'span.description.plist-desc',
  "Account Button": "//nav[contains(.,'Hesabım  Siparişlerim  Cüzdanım  Mesajlarım  Değerlendirmelerim  Listelerim  Hed')]",
  "Logout Button": "#lnkSignOutNavNode",
  
};

function getSelector(alias) {
  if (!(alias in aliasMap)) throw new Error(`Alias not found: ${alias}`);
  return aliasMap[alias];
}

function getAliasBySelector(selector) {
  return Object.keys(aliasMap).find(key => aliasMap[key] === selector) || null;
}

module.exports = {
  aliasMap,
  getSelector,
  getAliasBySelector
};
