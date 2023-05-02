import SecurePage from '../pageObjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials - Smoke', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')
        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('//button').click()
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!')
        console.log('------------------------------------')
        console.log('BROWSER : ' + process.env.BROWSER)
        console.log('------------------------------------')
        await SecurePage.takeScreenshot('filename1.png')
    })
})
