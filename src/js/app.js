import Menu  from './components/menu/menu.js';
import Form  from './components/form/form.js';
import Model from './components/model/model.js';

const model = new Model({
	url: 'menu',
	data: {},
});

const menu = new Menu({
	el: document.querySelector('.js-menu'),
});

const form = new Form({
	el: document.querySelector('.js-form'),
	data: {
		hint: {
			anchor: 'Название',
			href: 'Ссылка',
		},
	},
});

form.render();
model.fetch(menu.render.bind(menu));

menu.el.addEventListener('toggle', event => {
	if (event.detail.open) {
		form.hideAddBlock();
	}
});

menu.el.addEventListener('remove', event => {
	menu.removeItem(event.detail);
	model.save();
});

form.el.addEventListener('add', event => {
	menu.addItem(event.detail);
	menu.onToggle('open');
	model.setData(menu.data);
	model.save();
});
