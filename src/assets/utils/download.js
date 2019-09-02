import { transferBlob2File, downloadHttpInstance } from "./streamHttp";

/**
 * @description 下载文件
 * @author xiaoyang
 * @date 2019-04-03
 * @export
 */
function download({ url, params = {}, name = "附件", method = "POST" } = {}) {
	return downloadHttpInstance({
		method,
		url,
		params,
		responseType: "blob"
	}).then(res => {
		return transferBlob2File(res, name);
	});
}

export default download;
