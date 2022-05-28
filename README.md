# Mini Ecommerce V2.0

This an assessment test for a position at ScandiWeb. Its a basic frontend Ecommerce page.

## Change Log

- Added Product Brand before product Name on the product Cart,
- Cart Icon is now been shown on every available product in the store.
- Cartegory Page has been change from using the flex box to using the grid system.
- Background Overlay feature when MiniCart(CartOverlay) is Opened now covers all content except the
  NavBar
- Category Page Information now Centered.
- Cart Item price is now Static on the MiniCart dosen't change on quantity adjustments.
- MiniCart now has a Max-Height and a scrollbar that handled ovelaying products
- HTML content is now correctly handled by the use of interweave
- Image Distortion has been corrected by changing object-fit from the fill to the contain property
- Added Responsive Design for the following Screen Sizes, 1366px and 1280px
- Removed Hardcoded Currencies, it now controlled by the State and when loaded for the first time
  the default currency is the first Currency read from the backend in this case
- Removed Hardcoded Categories and by default the page will open the first catergory given by our
  api
- Add cart on All categories page when you hover on the product it will add with predifined values
  which are the first values each category
- Routing added to the NavBar enabling us to navigate from other routes back to the categories page
- Cart Flow changed to handle products with different attributes and increases the quantity of cart
  item if the same product and attributes are chosen
- View bag button closes when the cart opens

## Backend API (Graphql)

- [API](https://github.com/scandiweb/junior-react-endpoint)
- [Opus](https://www.npmjs.com/package/@tilework/opus)

## Documentation

- [React](https://reactjs.org/docs/getting-started.html)
- [GraphQl](https://graphql.org/learn/)

## Details

- Ability to add/remove products and change their amounts in cart - on the cart page itself, PLP and
  PDP provided.
- For products that have various options (attributes) - the options should be selected.
- The selected options of added to cart products are visible in cart overlay and in cart page.
- If an attribute is a swatch attribute (type = swatch), a representation of the value is rendered
  on PDP and PLP, rather than text description (e.g. the color itself, not "Blue" or "0000FF")
- Filtering products by category name for all of the categories from BackEnd
- The descriptions provided in HTML format should be parsed and presented as HTML, not as plain text
- Ability to change the currency of the store to one of the available currencies
- To Delete Item from Cart, Reduce the quantity until Item has been removed from the Cart
- Changed assets location from public to src so that it can be compiled by Webpack

## Lessons Learned

- Utilization of React JS Class Components
- How To Use React Life Cycle Components
- React Redux

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.
This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel,
ESLint, etc) right into your project so you have full control over them. All of the commands except
`eject` will still work, but they will point to the copied scripts so you can tweak them. At this
point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle
deployments, and you shouldn't feel obligated to use this feature. However we understand that this
tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Authors

- [Leslie Shumba](https://github.com/layan2k)
