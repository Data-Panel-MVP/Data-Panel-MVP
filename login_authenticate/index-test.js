// const express = require('express');
// const mongoose = require('mongoose');
// const authMiddleware = require('./middlewares/auth');
// const errors = require('./middlewares/error');

// require('dotenv').config();
// const dbConfig = require('./config/db_config');

// const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(
//     () => {
//         console.log("Connected to Database");
//     },
//     (error) => {
//         console.log(`Database not connected ${error}`);
//     }
// );

// // Apply authentication middleware for all routes
// app.use(authMiddleware.unless({ path: ['/users/login', '/users/register'] }));

// app.use(express.json());

// // Initialize routes
// app.use("/users", require("./routes/user_route"));

// app.use(errors.errorHandler);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, function () {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./middlewares/auth');
const errors = require('./middlewares/error');

require('dotenv').config();
const dbConfig = require('./config/db_config');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => {
        console.log("Connected to Database");
    },
    (error) => {
        console.log(`Database not connected ${error}`);
    }
);

app.use(express.json());

// Initialize routes
app.use("/users", authMiddleware, require("./routes/user_route"));

app.use(errors.errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
