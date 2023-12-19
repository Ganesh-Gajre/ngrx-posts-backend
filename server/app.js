const express = require('express');
const sequelize = require('./db/mysql-config');
const postsRoutes = require('./routes/posts.route');
const userRoutes = require('./routes/user.route');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

sequelize.sync();

app.use('/api/v1', userRoutes);
app.use('/api/v1', postsRoutes);

app.listen(3000, () => {
    console.log('Server started at port 3000');
});