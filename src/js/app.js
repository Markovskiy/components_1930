import Menu from './components/menu/menu.js';
import Form from './components/form/form.js';

const menu = new Menu({
	el: document.querySelector('.js-menu'),
	data: {
		title: 'Список сайтов',
		items: [
			{
				href: 'https://vk.com/',
				anchor: 'vk.com',
			},
			{
				href: 'http://ok.ru/',
				anchor: 'ok.ru',
			},
			{
				href: 'https://yahoo.com/',
				anchor: 'yahoo.com',
			},
			{
				href: 'https://google.com/',
				anchor: 'google.com',
			},
			{
				href: 'http://ya.ru/',
				anchor: 'ya.ru',
			},
		],
	},
});

const form = new Form({
	el: document.querySelector('.js-form'),
	data: {
		hint: {
			anchor: 'Название',
			href: 'Ссылка',
		}
	}
});

console.log(menu);
console.log(form);
