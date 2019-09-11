export default [
	{
		path: "/exchangeComfirmnDetail",
		name: "ExchangeComfirmnDetail",
		component: () => import("@/views/ExchangeComfirmnDetail"),
		meta: {
			breadcrumbName: ["组织管理", "IS组织关系", "IS组织关系02"],
			keepAlive: true
		}
	}
];
