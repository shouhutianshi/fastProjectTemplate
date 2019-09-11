import { mount, createLocalVue } from "@vue/test-utils";
import breadcrumb from "@/components/breadcrumb/index.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const menus = [
	{
		path: "/",
		name: "首页",
	},
	{
		path: "welcome",
		name: "欢迎页",
	},
];

describe("面包屑组件测试", () => {
	const wrapper = mount(breadcrumb, {
		localVue,
		router,
	});
	wrapper.setData({
		menus: menus,
	});

	let goto = jest.fn();
	wrapper.setMethods({
		goto,
	});
	it("数据渲染是否正确", () => {
		expect(wrapper.findAll("li").length).toEqual(2);
	});

	it("除开最后一个节点都可以点击", () => {
		const canClickNoode = wrapper.findAll("li").wrappers;
		canClickNoode.forEach((v, k) => {
			if (k !== canClickNoode.length - 1) {
				v.find("span").trigger("click");
				expect(wrapper.vm.goto).toHaveBeenCalled();
			}
		});
	});
});
