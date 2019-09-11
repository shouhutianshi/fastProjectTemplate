module.exports = {
	root: true,
	env: {
		node: true,
		jest: true
	},
	extends: ["plugin:vue/essential", "@vue/prettier"],
	rules: {
		"no-console": "off", // 覆盖不允许书写console
		"no-debugger": "off", // 覆盖不允许书写debugger
		"no-multi-spaces": "off", // 覆盖不允许用多余的空格
		"indent": 0,
		"no-tabs": 0,
		"prettier/prettier": 0,
	},
	parserOptions: {
		parser: "babel-eslint",
	},
};
