const ordersRoutes = require('./orders_routes');

module.exports = function(app, db) {
    ordersRoutes(app, db);
}