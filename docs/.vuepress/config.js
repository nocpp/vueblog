module.exports = {
	title: '干蛋杂货铺',
	description: '记录学到的知识，活到老，学到老',
  base: '/vueblog/',
	markdown: {
		lineNumbers: true
	},
	head: [
		['meta', {
			name: 'viewport',
			content: 'width=device-width,initial-scale=1,user-scalable=no'
		}],
	],
	theme: 'reco',
	themeConfig: {
		subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
		authorAvatar: './avatar.png',
		searchMaxSuggestions: 10,
		type: 'blog',
		// 博客配置
		blogConfig: {
			category: {
				location: 2, // 在导航栏菜单中所占的位置，默认2
				text: 'Category' // 默认文案 “分类”
			},
			tag: {
				location: 3, // 在导航栏菜单中所占的位置，默认3
				text: 'Tag' // 默认文案 “标签”
			}
		},
		nav: [
			{
				text: 'Home',
				link: '/',
				icon: 'reco-date'
			},
			{
				text: 'TimeLine',
				link: '/timeline/',
				icon: 'reco-date'
			}
		]
	}
}
