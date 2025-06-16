git clone <repo-url>
cd ecommerce-tests

# Kurulum

--Node.js
npm install --save-dev \
 @babel/core@^7.27.1 \
 @babel/preset-env@^7.27.2 \
 @babel/register@^7.27.1 \
 @cucumber/cucumber@^11.3.0 \
 @cucumber/pretty-formatter@^1.0.1 \
 @playwright/test@^1.52.0 \
 @types/node@^22.15.20 \
 allure-commandline@^2.34.0 \
 allure-cucumberjs@^3.2.2 \
 allure-js-commons@^3.2.2 \
 cross-env@^7.0.3 \
 playwright@^1.52.0 \
 rimraf@^6.0.1

# Test 

npm run test: "cucumber-js"
npm run test:chrome": "cross-env BROWSER=chromium npm run test"
npm run test:firefox": "cross-env BROWSER=firefox npm run test"
npm run test:webkit": "cross-env BROWSER=webkit npm run test"
npm run test:allure": "npx cucumber-js --format ./tests/support/reporter/AllureReporter.js -p runner"


# Allure raporu oluştur

npm run allure:generate": "npx allure generate ./test-results/reports/allure-results --clean -o allure-report"
npm run allure:open": "npx allure open allure-report"
npm run clean:allure": "rimraf allure-results"

# Clean node modules and package-lock.json
npm run clean": "rimraf node_modules package-lock.json"


# alliasHelper.js
Alias kullanımı, tekrar eden kodları kısaltarak test senaryolarının okunabilirliğini ve bakımını kolaylaştırdı.

# util.js
util.js dosyasında tanımlanan waitAndGet ve waitAndClick fonksiyonları ile birlikte alias map yapısının kullanılması, test adımlarında sık tekrar eden element işlemlerini soyutlayarak kod tekrarını azaltmış, aynı zamanda test senaryolarının okunabilirliğini ve sürdürülebilirliğini önemli ölçüde artırmıştır.

# hooks.js
Before ve After blokları kullanılarak, her senaryo öncesinde tarayıcı ve sayfa nesneleri oluşturulmakta, senaryo sonrasında ise tarayıcı kapanarak kaynaklar serbest bırakılmaktadır. Böylece her test izole bir ortamda çalışır ve testler arası bağımlılık olabildiğince engellenmiştir.
