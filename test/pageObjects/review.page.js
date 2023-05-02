import Page from './page.js';

class ReviewPage extends Page {
    get table() {
        return $('.table');
    }

    get productsPrice() {
        return $$('tbody tr td:nth-child(4) strong');
    }

    get totalPrice() {
        return $('h3 strong');
    }

    get btnCheckout() {
        return $('.btn-success');
    }

    get btnContinueShoping() {
        return $('.btn-default')
    }

    async sumOfProducts() {
        return(await Promise.all(await this.productsPrice.map(async (productsPrice) => parseInt((await productsPrice.getText()).split('.')[1].trim())))).reduce((total, price) => total + price, 0)
    }

    async totalFormattedPrice() {
        return await parseInt((await this.totalPrice.getText()).split('.')[1].trim())
    }
}

export default new ReviewPage();
