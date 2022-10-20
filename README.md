## Install
```bash
cd src/main/resources/static
npm install
bower install crypto-js
```
## Start Up
```bash
npx babel --watch src --out-dir build --presets react-app/prod
## or using .babelrc {"presets": ["react-app/prod"]}
```
## spring boot gateway
    https://spring.io/projects/spring-cloud-gateway
## Integration Example
```html
    <!-- We will put our content inside this div. -->
    <div id="tokoonline_content"></div>
    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <!-- Load our React component. -->
    <script>_TOKOID_="5f3373db203efa581d2354a2"</script>
    <script>_PAGE_PRODUCT_CATALOG_="file:///Users/anvere/projects/prismatech/example/product_catalog.html"</script>
    <script>_PAGE_PRODUCT_DETAIL_="file:///Users/anvere/projects/prismatech/example/product_detail.html"</script>
    <script src="../build/product_detail.js"></script>
```