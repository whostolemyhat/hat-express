var app = require('express').createServer();
app.get('/', function(req, res) {
    res.send('Hello world!');
});
app.listen(process.env.VCAP_APP_PORT || 3000);
