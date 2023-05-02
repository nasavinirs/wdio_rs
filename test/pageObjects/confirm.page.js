import Page from './page.js';

class ConfirmPage extends Page {

    get btnCheckout() {
        return $('.btn-success');
    }

    get inputCountry() {
        return $('#country');
    }

    get countryLoader() {
        return $('.lds-ellipsis');
    }

    get btnPurchase() {
        return $('input[type=\'submit\']');
    }

    get successAlert() {
        return $('.alert-success');
    }

    async purchase(country) {
        await this.btnCheckout.click();
        await this.inputCountry.setValue(country);
        await this.countryLoader.waitForExist({reverse: true});
        await $('=India').click()
        await this.btnPurchase.click()
    }
}

export default new ConfirmPage();
