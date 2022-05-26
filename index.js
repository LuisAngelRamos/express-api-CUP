const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {
	logErrors,
	errorHanlder,
	boomErrorHanlder,
	ormErrorHanlder,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080'];
const options = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('No permitido'));
		}
	},
};

app.use(cors(options));

routerApi(app);

app.use(logErrors);
app.use(ormErrorHanlder);
app.use(boomErrorHanlder);
app.use(errorHanlder);

app.listen(port, () => {
	console.log('My port: ' + port);
});
