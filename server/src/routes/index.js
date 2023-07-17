const apiRoute = require('./api');
const chatRoute = require('./chat');

function routes(app) {
    app.use('/api', apiRoute);
    app.use('/chats', chatRoute);

    app.use('/', (req, res, next) => {
        res.send('Home page');
    });
}

module.exports = routes;
