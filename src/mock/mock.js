var path = require("path");
const util = require("./util")(path.resolve(`${__dirname}/db`));

/**
 *此处有一重点是：db文件中的文件名称，既包含路径名称，也包含方法名称
 */
const config = util
	.map(n => {
		const upperStr = n.indexOf("G") !== -1 ? "G" : "P";
		const strArr = n.split(upperStr);
		const name = strArr[0];
		const method = `${upperStr}${strArr[1]}`.toLowerCase();
		return {
			name,
			method,
			fileName: n
		};
	})
	.map(n => {
		if (!n.method) n.method = "post";
		n.data = require(`./db/${n.fileName}.js`);
		n.url = `/api/${n.name}`;
		return n;
	});

module.exports = config;
