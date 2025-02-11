const express = require('express');
const connection = require('./config/db');
const app = express();
const dashboardRouter = require('./routers/dashboardRouter');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', dashboardRouter);

app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running on port http://localhost:3000`);
        connection();
    }
});