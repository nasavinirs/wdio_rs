import LoginPage from '../pageObjects/login.page.js'

describe('Login Scenario', async () => {
    before(async () => {
        await LoginPage.open('loginpagePractise/')
        console.log(await browser.getTitle())
        await expect(browser).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    })

    it('Verify Unsuccessful Login', async () => {
        await LoginPage.login('rahulshettyacademy', 'learning123')
        await browser.waitUntil(async () => await LoginPage.btnSubmit.getValue() === 'Sign In', {
            timeout: 5000,
            timeoutMsg: 'Error message not found'
        })
        // await browser.pause(3000)
        const errorMessage = await $('.alert-danger').getText()
        expect(errorMessage).toHaveText('Incorrect username/password.')
        await LoginPage.takeScreenshot('error_screenshot.png')
    })

    it('Verify Successful Login', async () => {
        // await LoginPage.open('loginpagePractise/')
        // let baseUrl = browser.options.baseUrl
        // await browser.url('/loginpagePractise/')
        // const signInBtn = await $('#signInBtn')
        // await signInBtn.waitForDisplayed({timeout: 10000})
        // console.log(await browser.getTitle())
        // await expect(browser).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
        // const inputUsername = await $('#username')
        // const inputPassword = await $('#password')
        // await inputUsername.setValue('rahulshettyacademy');
        // await inputPassword.setValue('learning')
        // await signInBtn.click()

        await LoginPage.login('rahulshettyacademy', 'learning')
        await expect(browser).toHaveTitle('ProtoCommerce')
        await LoginPage.takeScreenshot('success_screenshot.png')

    })

})
