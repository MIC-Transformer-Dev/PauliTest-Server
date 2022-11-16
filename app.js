const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dbURI = process.env.dbURI;
const PORT = process.env.PORT || 4000;
const app = express();
const testRoutes = require("./routers/test");

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rate Limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 150, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(cors());
app.use("/test", testRoutes);
app.get('/', async (req, res) => {
	res.send('Welcome to Pauli-Test API | By Binar Group')
})

//route not found
app.use((req, res, next) => {
	const error = new Error("Route not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
