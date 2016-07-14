export default class Model {
	constructor(options) {
		this.data = options.data || {};
		this.url = options.url;
	}

	getData() {
		return this.data;
	}

	setData(data) {
		this.data = data;
	}

	_getBaseUrl() {
		return 'https://faviconer-615ef.firebaseio.com/';
	}

	/**
	 * Загрузка данных с сервера
	 * @param  {Function} resolve
	 * @return {XMLHttpRequest}
	 */
	fetch(resolve) {
		const req = this._makeRequest('GET');

		req.onreadystatechange = () => {
			if (req.readyState != 4) return;

			if (req.status != 200) {
				console.error(`При отрпавке запроса ошибка ${req.status}`);
			} else {
				const data = this.parse(req.responseText);
				this.setData(data);

				resolve(this.getData());
			}
		}

		req.send();

		return req;
	}

	save(resolve) {
		const req = this._makeRequest('PUT');

		req.onreadystatechange = () => {
			if (req.readyState != 4) return;

			if (req.status != 200) {
				console.error(`При отрпавке запроса ошибка ${req.status}`);
			} else {
				const data = this.parse(req.responseText);
				this.setData(data);
				if (resolve) {
					resolve(this);
				}
			}
		}

		let reqString = JSON.stringify(this.getData());
		req.send(reqString);
	}

	/**
	 * Создание объекта запроса
	 * @param {string} method - HTTP method
	 * @return {XMLHttpRequest}
	 */
	_makeRequest(method) {
		const xhr = new XMLHttpRequest();

		xhr.open(method, `${this._getBaseUrl() + this.url}.json`, false);

		return xhr;
	}

	/**
	 * Преобразлвание тескта отвева в данные
	 * @param {string} responseText
	 * @return {Object}
	 */
	parse (responseText) {
		return JSON.parse(responseText);
	}
}
