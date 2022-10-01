const { RESTDataSource } = require('apollo-datasource-rest');

class ListingsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:4010/';
    }

    getListingsForUser(userId) {
        return this.get(`user/${userId}/listings`);
    }

    getTotalCost({ id, checkInDate, checkOutDate }) {
        return this.get(`listings/${id}/totalCost?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    }
}

module.exports = ListingsAPI;
