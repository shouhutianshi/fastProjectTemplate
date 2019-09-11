import { mount, createLocalVue } from "@vue/test-utils";
import cache from "@/components/cache/index.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const menuCache = [
	{ path: "/welcome", name: "Welcome", keepAlive: true, pageName: "欢迎页", query: {} },
	{ path: "/exchangeComfirmnDetail", name: "ExchangeComfirmnDetail", keepAlive: true, pageName: "IS组织关系02", query: { highlight: 200743 } },
];

describe("底部tab组件测试", () => {
	const wrapper = mount(cache, {
		data() {
			return {
				menuCache,
			};
		},
		watch: {
			$route: {
				handler: "getCache",
				immediate: true,
			},
		},
		methods: {
			getCache: jest.fn(),
		},
		localVue,
		router,
	});
	const canClickNode = wrapper.findAll("li").wrappers;
	let goto = jest.fn();
	let clearCache = jest.fn();
	wrapper.setMethods({ goto, clearCache });
	it("数据渲染是否正确", () => {
		expect(wrapper.findAll("li").length).toEqual(2);
	});

	it("tab都可以点击", () => {
		canClickNode.forEach(v => {
			v.trigger("click");
			expect(wrapper.vm.goto).toHaveBeenCalled();
		});
	});
	it("清除缓存按钮可以点击", () => {
		canClickNode.forEach(v => {
			v.findAll("i").wrappers.forEach(n => {
				n.trigger("click");
				expect(wrapper.vm.clearCache).toHaveBeenCalled();
			});
		});
	});
});
