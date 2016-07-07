import './menu.css';
import template from './menu.jade';

/**
 * @class Menu
 * Компонента "Меню"
 */
export default class Menu {

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.el
	 * @param {Object} options.data
	 */
	constructor(options) {
		this.el = options.el;
		this.data = options.data;

		this.render();

		this.list = this.el.querySelector('.menu__list');

		this._initEvents();
	}

	/**
	* Развешиваем события
	*/
	_initEvents() {
		this.el.addEventListener('click', this._onClick.bind(this));
	}

	/**
	* Клик в любую область меню
	* @param {Event} event
	*/
	_onClick(event) {
		event.preventDefault();
		const item = event.target;

		switch (item.dataset.action) {
		case 'toggle':
			this.el.classList.toggle('menu_open');
			break;

		case 'remove':
			this.removeItem(item);
			break;

		case 'pick':
			this.pickItem(item);
			break;

		default:
			break;
		}
	}

	/**
	* Выбор элемента меню
	* @param {HTMLElement} item
	*/
	pickItem(item) {
		this.trigger('pick', {
			href: item.getAttribute('href'),
			anchor: item.textContent,
		});
	}

	/**
	* Удаления элемента меню
	* @param {HTMLElement} item
	*/
	removeItem(item) {
		const index = parseInt(item.parentNode.dataset.index, 10);

		this.trigger('remove', {
			index,
		});

		this.list.removeChild(item.parentNode);
	}

	/**
	* Сказать миру о случившемся
	* @param {string} name тип события
	* @param {Object} data объект события
	*/
	trigger(name, data) {
		const menuEvent = new CustomEvent(name, {
			detail: data,
		});

		this.el.dispatchEvent(menuEvent);
		console.log(name, data);
	}

	/**
	 * Рисуем меню
	 */
	render() {
		this.el.innerHTML = template(this.data);
	}
}
