import './menu.css';

export default class Menu {
	constructor(options) {
		this.el = options.el;
		this._initEvents();
	}

	_initEvents() {
		this.el.addEventListener('click', this._onMenuClick.bind(this));
	}

	_onMenuClick(event) {
		let isItemClick = false;

		if (event.target.classList.contains('menu__item')) {
			isItemClick = true;
			this._onMenuItemClick(event);
		}

		if (event.target.classList.contains('menu__item-remove')) {
			isItemClick = true;
			this._removeItem(event);
		}

		if (!isItemClick) {
			this.el.classList.toggle('menu_open');
		}
	}

	_onMenuItemClick(event) {
		console.dir(event.target);
	}

	_removeItem(event) {
		event.target.parentNode.remove();
	}
}
