import { mount, createLocalVue } from "@vue/test-utils";
import header from "@/components/header/index.vue";
import storage from "utils/storage";
import messageBox from "utils/messageBox";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$storage = storage;
localVue.prototype.$msg = messageBox;

const flushPromises = () => new Promise(resolve => setTimeout(resolve));

const userInfo = {
	postName: "..",
	deptName: "..",
	code: "..",
	name: "..",
};

describe("顶部组件", () => {
	let actions;
	let store;
	beforeEach(() => {
		actions = {
			getUserInfo: () => ({ datas: userInfo }),
			getUrl: () => ({ datas: userInfo }),
		};
		store = new Vuex.Store({
			state: {},
			actions,
		});
	});
	it("数据是否正常渲染", async () => {
		const wrapper = mount(header, {
			data() {
				return {
					userInfo,
				};
			},
			store,
			localVue,
		});
		await flushPromises();
		expect(wrapper.findAll("li").length).toEqual(5);
	});
	it("是否能够退出", async () => {
		const wrapper = mount(header, {
			data() {
				return {
					userInfo,
				};
			},
			store,
			localVue,
		});
		let loginOut = jest.fn();
		wrapper.setMethods({
			loginOut,
		});
		wrapper.find("a").trigger("click");
		expect(wrapper.vm.loginOut).toHaveBeenCalled();
	});
});
