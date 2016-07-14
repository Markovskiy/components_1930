import DefaultComponent from '../DefaultComponent.js';
import Trigger from '../../mixins/Trigger.js';
import './form.css';
import template from './form.jade';

/**
 * @class Form
 * Компонента "Форма"
 */
export default class Form extends Trigger(DefaultComponent) {

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
		this.el.addEventListener('submit', this._onSubmit.bind(this));
		this.el.addEventListener('focus', this._onFocusInput.bind(this), true);
		this.el.addEventListener('blur', this._onBlurInput.bind(this), true);
	}

	/**
	 * Фокус на поле ввода
	 * @param {Event} event
	 */
	_onFocusInput(event) {
		if (event.target.tagName === 'INPUT') {
			event.target.parentNode.classList.add('form__input-container--focus');
		}
	}

	/**
	 * Снятие фокуса с поля ввода
	 * @param {Event} event
	 */
	_onBlurInput(event) {
		const valueClass = 'form__input-container--value';

		if (event.target.tagName === 'INPUT') {
			event.target.parentNode.classList.remove('form__input-container--focus');

			if (event.target.value) {
				event.target.parentNode.classList.add(valueClass);
			} else {
				event.target.parentNode.classList.remove(valueClass);
			}
		}
	}

	getField(name) {
		return this.el.querySelector(`[name="${name}"]`);
	}

	/**
	 * Отправка формы
	 * @param {Event} event
	 */
	_onSubmit(event) {
		event.preventDefault();

		this.trigger('add', {
			href: this.getField('href').value,
			anchor: this.getField('anchor').value,
		});

		this.hideAddBlock();

		this._onReset();
	}

	_onReset() {
		this.el.reset();
		const elValue = this.el.querySelectorAll('.form__input-container--value');
		elValue.forEach = [].forEach;

		elValue.forEach(item => {
			item.classList.remove('form__input-container--value');
		});
	}

	hideAddBlock() {
		this.el.querySelector('.form__add-block').style.display = 'none';
		this.el.querySelector('.form__add-button').style.display = 'block';
	}

	/**
	* Клик в любую область меню
	* @param {Event} event
	*/
	_onClick(event) {
		const item = event.target;

		switch (item.dataset.action) {
		case 'add':
			event.preventDefault();
			this.el.querySelector('.form__add-block').style.display = 'block';
			item.style.display = 'none';
			break;

		case 'close':
			event.preventDefault();
			this.hideAddBlock();
			this._onReset();
			break;

		default:
			break;
		}
	}
}
