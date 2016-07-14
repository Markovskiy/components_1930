/**
 * Примесь Trigger
 * @param  {Object} superclass
 */
const Trigger = (superclass) => class extends superclass  {
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
};

export default Trigger;
