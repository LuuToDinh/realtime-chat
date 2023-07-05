const apiRoute = require('./api');

function routes(app) {
    app.use('/api', apiRoute);

    app.use('/', (req, res, next) => {
        res.send('Home page');
    });
}

module.exports = routes;
