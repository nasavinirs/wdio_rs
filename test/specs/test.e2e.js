import {expect as cexpect} from 'chai'

describe('Test Dynamic Stuffs', async () => {
    xit('Sort the table and validate the values', async () => {
        await browser.url('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        // await $('tr th:nth-child(1)').click()
        await browser.pause(2000)
        // const veggiesLocators = await $$('tr td:nth-child(1)')
        const veggiesBeforeSort = await $$('tr td:nth-child(1)').map(async veggie => await veggie.getText())
        console.log(veggiesBeforeSort)
        console.log('---------------------------------------------------------');
        const unsortedVeggies = await veggiesBeforeSort.slice()
        console.log(unsortedVeggies)
        const sortedVeggies = await unsortedVeggies.sort()
        console.log(sortedVeggies)
        console.log('---------------------------------------------------------')
        await $('tr th:nth-child(1)').click()
        await browser.pause(2000)
        const veggiesAfterSort = await $$('tr td:nth-child(1)').map(async veggie => await veggie.getText())
        console.log(veggiesAfterSort)
        cexpect(veggiesBeforeSort).to.not.equal(veggiesAfterSort)
    })

    xit('Search for veggie', async () => {
        const searchText = 'Dragon fruit'
        await browser.url('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        const veggiesBeforeSearch = (await $$('tr td:nth-child(1)').map(async veggie => await veggie.getText()))
        console.log('Veggies Before Search : ' + veggiesBeforeSearch)
        const veggiesCountBeforeSearch = veggiesBeforeSearch.length
        console.log('Veggies Before Search Count : ' + veggiesCountBeforeSearch)
        const searchBox = await $('input[type=\'search\']')
        searchBox.setValue(searchText)
        await browser.pause(2000)
        const veggieAfterSearch = (await $$('tr td:nth-child(1)').map(async veggie => await veggie.getText()))
        console.log('Veggie After Search : ' + veggieAfterSearch)
        const veggieCountAfterSearch = veggieAfterSearch.length
        console.log('Veggie After Search Count : ' + veggieCountAfterSearch)
        cexpect(veggiesCountBeforeSearch).to.not.eql(veggieCountAfterSearch)
        // cexpect(veggieAfterSearch[0]).to.eql(searchText)
        expect(veggieAfterSearch[0]).toBeElementsArrayOfSize({eq: 1})
        expect(veggieAfterSearch[0]).toHaveTextContaining(searchText)
    })
    it('Parent Child Windows', async () => {
        await browser.url('https://rahulshettyacademy.com/loginpagePractise/')
        await browser.pause(1000)
        await $('.blinkingText').click()
        const windowHandles = await browser.getWindowHandles()
        await browser.switchToWindow(windowHandles[1])
        const childTitle = await browser.getTitle();
        console.log('Child Title : ' + childTitle)
        expect(await $('h1')).toHaveTextContaining('DOCUMENTS REQUEST')
        expect(await browser.getTitle()).toHaveTitleContaining('RS Academy')
        expect(await $('(//img)[1]')).toHaveAttributeContaining('src', 'rs_logo.png')
        await browser.pause(1000)
        await browser.closeWindow()
        await browser.pause(1000)
        await browser.switchToWindow(windowHandles[0])
        const parentTitle = await browser.getTitle();
        console.log('Parent Title : ' + parentTitle)
        cexpect(parentTitle).to.not.eql(childTitle);
    })
})
