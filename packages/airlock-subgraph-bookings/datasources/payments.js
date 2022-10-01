const { RESTDataSource } = require('apollo-datasource-rest');

class PaymentsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://rt-airlock-services-payments.herokuapp.com/';
    }

    subtractFunds({ userId, amount }) {
        return this.patch(`wallet/${userId}/subtract`, { amount });
    }
}

module.exports = PaymentsAPI;
