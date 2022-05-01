function logErrors(err, req, res, next) {
	console.log('logErrors');
	console.error(err);
	next(err);
}

function errorHanlder(err, req, res, next) {
	console.log('errorHanlder');
	return res.status(500).json({
		message: err.message,
		stack: err.stack
	});
}

function boomErrorHanlder(err, req, res, next) {
	if(err.isBoom) {
		const { output } = err;
		return res.status(output.statusCode).json(output.payload);
	}
	next(err);
}

module.exports = { logErrors, errorHanlder, boomErrorHanlder };
