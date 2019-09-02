import axios from "axios";
import { Message, MessageBox } from "element-ui";
import router from "vue-router";

let downloadHttpInstance = axios.create({
	timeout: process.env.VUE_APP_USE_TIMEOUT,
	baseURL: `${process.env.VUE_APP_USE_API}/`,
	headers: {
		"X-Requested-With": "XMLHttpRequest"
	}
});

downloadHttpInstance.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

downloadHttpInstance.interceptors.response.use(
	response => {
		let res = response.data;
		if (res) return response;
		MessageBox.confirm(res.message, "提示", {
			showCancelButton: false,
			type: "error"
		});
		return;
	},
	error => {
		let msg = "加载失败";
		if (error.message.indexOf("timeout") !== -1) return;
		Message.error({ message: msg });
		return Promise.reject(error);
	}
);

/**
 * @description 将Blob文件流下载
 * @author xiaoyang
 * @date 2019-04-03
 * @param {*} res
 * @param {*} name
 */
function transferBlob2File(res, name) {
	return new Promise((rsolve, reject) => {
		const cont = res;
		const header = cont.headers["content-disposition"];
		const code = cont.headers["x-response-code"];
		const msg = cont.headers["x-response-message"];
		const blob = new Blob([res.data]);
		if (code === "0000") {
			const prefix = header.match(/\.\w+/);
			const fileName = `${name}${prefix}`;
			if ("download" in document.createElement("a")) {
				const link = document.createElement("a");
				link.download = fileName;
				link.style.display = "none";
				link.href = URL.createObjectURL(blob);
				document.body.appendChild(link);
				link.click();
				URL.revokeObjectURL(link.href);
				document.body.removeChild(link);
			} else {
				navigator.msSaveBlob(blob, fileName);
			}
		} else if (code === "1000" || code === "4000") {
			return reject(decodeURIComponent(msg));
		} else if (code === "4010") {
			router.push("/denied");
		} else {
			return reject(msg);
		}
	});
}

export { downloadHttpInstance, transferBlob2File };
