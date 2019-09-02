export default [
	{
		path: "denied",
		name: "Denied",
		component: () => import("@/views/Denied"),
		meta: {
			breadcrumbName: "未授权页",
			keepAlive: false
		}
	},
	{
		path: "welcome",
		name: "Welcome",
		component: () => import("@/views/Welcome"),
		meta: {
			breadcrumbName: "欢迎页",
			keepAlive: true
		}
	}
];
