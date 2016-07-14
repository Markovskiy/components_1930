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
		this.data = options.data || {};
		this._template = template;

		this._initEvents();
	}

	/**
	 * Рисуем форму
	 */
	render(data) {
		if (data) {
			this.data = data;
		}
		this.el.innerHTML = this._template(this.data);
	}
}
