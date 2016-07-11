/**
 * @class DefaultComponent
 * Компонента по-уолчанию
 */
export default class DefaultComponent {
	/**
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.el
	 * @param {Object} options.data
	 */
	constructor(options, template) {
		this.el = options.el;
		this.data = options.data;
		this._template = template;

		this._initEvents();
	}

	/**
	* Сказать миру о случившемся
	* @param {string} name тип события
	* @param {Object} data объект события
	*/
	trigger(name, data) {
		const event = new CustomEvent(name, {
			detail: data,
		});

		this.el.dispatchEvent(event);
	}

	/**
	 * Рисуем форму
	 */
	render() {
		this.el.innerHTML = this._template(this.data);
	}
}
