const express = require("express");
const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");
const config = require("./mock");

const multipartyMiddleware = multiparty();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Mock = require("mockjs");
// 入参判断
const mock = (data, params) => {
	const type = Object.prototype.toString;
	if (type.call(data) === "[object Object]") {
		return Mock.mock(data);
	} else if (type.call(data) === "[object function]") {
		return Mock.mock(data(params));
	} else {
		return "error: data should be an object or a function.";
	}
};

// 路由判断
config.forEach(({ method, url, data }) => {
	if (method === "get") {
		app.get(url, (req, res) => {
			res.json(mock(data, req.query));
		});
	} else if (method === "post") {
		app.post(url, multipartyMiddleware, (req, res) => {
			res.json(mock(data, req.body));
		});
	} else if (method === "jsonp") {
		app.get(url, (req, res) => {
			const query = req.query;
			const mockData = JSON.stringify(mock(data, req.query));
			const callback =
				"typeof " +
				query.callback +
				' === "function" && ' +
				query.callback +
				"(" +
				mockData +
				")";

			res.send(callback);
		});
	}
});

let port = 9090;
process.argv.forEach((arg, index, arr) => {
	if (arg === "--port") {
		port = arr[index + 1] || port;
		return false;
	}
});

module.exports = app.listen(port, () => {
	console.log("监听mock server于 http://localhost:" + port);
});
