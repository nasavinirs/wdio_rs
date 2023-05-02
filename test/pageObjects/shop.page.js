import Page from './page.js';

class ShopPage extends Page {

    get btnCheckout() {
        return $('.btn-primary');
    }

    get cards() {
        return $$('div[class=\'card h-100\']');
    }

    get btnAddtocart() {
        return $('div button');
    }

    async checkout() {
        await this.btnCheckout.scrollIntoView({block: 'center', inline: 'center'})
        await this.btnCheckout.click()
    }

    async addProductToCart(products) {

        for (let i = 0; i < await this.cards.length; i++) {
            const cardTitle = (await this.cards[i].$('div h4 a')).getText()
            const productFound = products.includes((await cardTitle).toString())
            if (productFound) {
                await this.cards[i].$('div button').click()
            }
        }
    }
}

export default new ShopPage();
