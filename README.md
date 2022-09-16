## What is it?
This project was made to implement checkout page from Jakmall technical test.\
There are three steps in the checkout page : 
1. Delivery form\
Every form input will be validated inline, where : \
● Green shows if input is valid \
● Orange shows if input is invalid \
Send as Dropshipper \
● If unchecked, Dropshipper form will be disabled & emptied \
● If checked, Dropshipper form must be filled and Dropship fee of 5,900 will be added to total price dan akan dikenakan biaya Dropship Fee sebesar 5.900 \
Phone Number: \
● Can only contains 0-9,-,+,(,) \
● Number need to be minimum 6 digits and maximum 20 digits \
Address: \
● Must be filled \
● Maximum 120 characters \
● Digit counter to inform number of characters that can be inputted \
Email: \
● Have to be a valid email 

2. Shipment & Payment option \
● Summary panel will be updated in real-time on every shipment or payment changes \
Shipping \
● Must be selected \
Delivery Estimate \
● JNE: 2 days, Go Send: today, Personal Courier: 1 day 
Payment \
● Button wil change based on selected payment type \
3. Order Summary \
● Go to homepage will redirect to first step and remove previous data \
Order ID \
● Generate random 5 digits alphanumeric with exception 1,I,0,O \

## Technology Stacks
### [react](https://reactjs.org/)
### [react-hook-form](https://www.npmjs.com/package/react-hook-form)
### [styled-components](https://www.npmjs.com/package/styled-components)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
