import DefaultComponent from '../DefaultComponent.js';
import './menu.css';
import template from './menu.jade';

/**
 * @class Menu
 * Компонента "Меню"
 */
export default class Menu extends DefaultComponent {

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.el
	 * @param {Object} options.data
	 */
	constructor(options) {
		super(options, template);
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
			if (this.data.items.length) {
				this.onToggle();
			}
			break;

		case 'remove':
			this._onRemoveClick(item);
			break;

		case 'pick':
			this.pickItem(item);
			break;

		default:
			break;
		}
	}

	onToggle(open) {
		if (open) {
			this.el.classList.add('menu_open');
		} else {
			this.el.classList.toggle('menu_open');
		}
		this.trigger('toggle', {
			open: this.el.classList.contains('menu_open'),
		});
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
	 * Добавляем пункт меню в данные
	 * @param {Object} item
	 */
	addItem(item) {
		this.data.items.push(item);
		this.render();
	}

	/**
	 * Удаляем пункт меню из данных
	 * @param  {Object} removedItem
	 */
	removeItem(removedItem) {
		this.data.items = this.data.items.filter((item, index) => index !== removedItem.index);

		if (!this.data.items.length) {
			this.onToggle();
		}

		this.render();
	}

	/**
	* Удаления элемента меню
	* @param {HTMLElement} item
	*/
	_onRemoveClick(item) {
		const index = parseInt(item.parentNode.dataset.index, 10);

		this.trigger('remove', {
			index,
		});
	}
}
