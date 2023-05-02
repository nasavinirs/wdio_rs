import {expect as cexpect} from 'chai'
import LoginPage from '../pageObjects/login.page.js'
import ShopPage from '../pageObjects/shop.page.js'
import ReviewPage from '../pageObjects/review.page.js'
import ConfirmPage from '../pageObjects/confirm.page.js'
import fs from 'fs'

const credentials = JSON.parse(fs.readFileSync('test/testData/login.data.json'))
const products = JSON.parse(fs.readFileSync('test/testData/products.data.json'))

describe('ECommerce Test', async () => {

    before(async () => {
        await LoginPage.open('loginpagePractise/')
        console.log(await browser.getTitle())
        await expect(browser).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    })

    credentials.forEach(({username, password}) => {
        products.forEach(({products}) => {
            it('Add to Cart', async () => { // const products = ['iphone X', 'Blackberry']
                await LoginPage.login(username, password)
                await ShopPage.btnCheckout.waitForExist()

                await ShopPage.addProductToCart(products)
                await ShopPage.checkout()
                await browser.pause(2000)
                await ReviewPage.table.waitForExist()
                let totalPrices = 0

                // Method - 1
                // const totalPricesOfProducts = await ReviewPage.productsPrice
                // for (let i = 0; i < await totalPricesOfProducts.length; i++) {
                //     totalPrices += parseInt((await totalPricesOfProducts[i].getText()).split('.')[1].trim())
                // }

                // Method - 2
                totalPrices = await ReviewPage.sumOfProducts()
                const total = await ReviewPage.totalFormattedPrice()
                await cexpect(total).to.be.eql(totalPrices);

                await ConfirmPage.purchase('ind')
                await expect(await ConfirmPage.successAlert.getText()).toHaveText('Success! Thank you! Your order will be delivered in next few weeks :-).')
                await browser.pause(2000)
            })
        })
    })
})
