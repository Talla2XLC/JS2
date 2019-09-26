const BASE_URL = '';

import goods_item from './goods-item.js';
import goods_list from './goods-list.js';
import search from './search.js';
import cart from './cart.js';
import error from './error.js';

const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		cartGoods: [],
		isVisibleCart: false,
		isError: false
	},
	computed: {
		cartCount() {
			return this.cartGoods.length;
		}
	},
	created() {
		/**
		 * Метод обновляет товары в корзине
		 */
		this.makeGETRequest(`${BASE_URL}/cartData`).then((goods) => {
			this.cartGoods = goods;
		}).catch((err) => {
			this.isError = !this.isError;
			console.error(err);
		});
	},
	mounted() {
		this.makeGETRequest(`${BASE_URL}/catalogData`).then((goods) => {
			goods.forEach((i) => {
				i.qty = 0;
				i.sum = 0;
			})
			this.goods = goods;
			this.filteredGoods = goods;
		}).catch((err) => {
			this.isError = !this.isError;
			console.error(err);
		});
	},
	methods: {
		/**
		 * Метод отправляет GET запрос на сервер
		 * @param  {string} url ссылка на ресурс
		 * @return {JSON}   файл json с данными
		 */
		makeGETRequest(url) {
			return new Promise ((resolve, reject) => {
				const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status !== 200) {
							reject(xhr.status);
						}
						else {
							const response = JSON.parse(xhr.responseText);
							resolve(response);
						}
					}
				};

				xhr.onerror = (e) => reject(e);

				xhr.open('GET', url);
				xhr.send();
			})
		},

		/**
		 * Метод отправляет POST запрос на сервер
		 * @param  {string} url ссылка на ресурс
		 * @param  {data} data передаваемые данные
		 * @return {JSON}   файл json с данными
		 */
		makePOSTRequest(url, data) {
			return new Promise ((resolve, reject) => {
				const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status !== 200) {
							reject(xhr.status);
						}
						else {
							const response = JSON.parse(xhr.responseText);
							resolve(response);
						}
					}
				};

				xhr.onerror = (e) => reject(e);

				xhr.open('POST', url);
				xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

				xhr.send(JSON.stringify(data));
			})
		},

		/**
		 * Метод отправляет DELETE запрос на сервер
		 * @param  {string} url ссылка на ресурс
		 * @param  {data} data передаваемые данные
		 * @return {JSON}   файл json с данными
		 */
		makeDELETERequest(url, data) {
			return new Promise ((resolve, reject) => {
				const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status !== 200) {
							reject(xhr.status);
						}
						else {
							const response = JSON.parse(xhr.responseText);
							resolve(response);
						}
					}
				};

				xhr.onerror = (e) => reject(e);

				xhr.open('DELETE', url);
				xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

				xhr.send(JSON.stringify(data));
			})
		},

		/**
		 * Метод добавляет выбранный товар в корзину, если его там не было
		 * @param {obj} event кнопка добавления товара
		 */
		async addNewItem(event) {
			let goodId = event.target.getAttribute('data-id');
			let good = this.goods.find((currentGood) => {
				return currentGood.id === goodId;
			});
			try {
				if(!this.isAlreadyAdd(good)) {
					good.qty = 1;
					this.cartGoods = await this.makePOSTRequest('/addToCart', good);
					this.addStat("Добавлен товар", good.title);
				}
			} catch(e) {
				throw new Error(e);
			}
		},

		/**
		 * Метод удаляет выбранный товар из корзины
		 * @param  {obj} event кнопка удаления товара
		 */
		async removeItem(event) {	
			let good = this.identifyItem(event);
			try {
				this.cartGoods = await this.makeDELETERequest('/removeFromCart', good);
				this.addStat("Удалён товар", good.title);
			} catch(e) {
				throw new Error(e);
			}						
		},

		/**
		 * Метод удаляет 1шт выбранного товара
		 * @param  {obj} event кнопка удаления товара
		 */
		async minusOneItem(event) {
			let good = this.identifyItem(event);
			try {
				this.cartGoods = await this.makePOSTRequest('/minusOneItem', good);
				this.addStat("Удалена 1шт", good.title);
			} catch(e) {
				throw new Error(e);
			}			
		},

		/**
		 * Метод прибавляет 1шт выбранного товара
		 * @param  {obj} event кнопка удаления товара
		 */
		async plusOneItem(event) {
			let good = this.identifyItem(event);
			try {
				this.cartGoods = await this.makePOSTRequest('/plusOneItem', good);
				this.addStat("Добавлена 1шт", good.title);
			} catch(e) {
				throw new Error(e);
			}			
		},

		addStat(act, good) {
			let stat = {
				"действие": act,
				"описание": good,
				"время": Date()
			};
			this.makePOSTRequest('/addStat', stat);
		},

		/**
		 * Метод определяет товар по нажатой кнопке товара
		 * @param  {obj} event нажатая кнопка товара
		 * @return {obj}       выбранный товар
		 */
		identifyItem(event) {
			let goodId = event.target.getAttribute('data-id');
			let good = this.goods.find((currentGood) => {
				return currentGood.id === goodId;
			});
			return good;
		},

		/**
		 * Метод проверяет не добавлен ли выбранный товар в корзину
		 * @param  {obj}  good товар магазина
		 * @return {Boolean}
		 */
		isAlreadyAdd(good) {
			return this.cartGoods.includes(good);
		},

		/**
		 * Метод переключает видимость корзины
		 */
		toggleCartVisibility() {
			this.isVisibleCart = !this.isVisibleCart;
			this.$refs.mainHeader.classList.toggle("blur");
			this.$refs.mainContent.classList.toggle("blur");			
		},

		/**
		 * Метод обновляет список товаров в соответствии с пришедшим массивом
		 * @param  {arr} fgoods отфильтрованный массив товаров
		 */
		updateGoods(fgoods) {
			this.filteredGoods = fgoods;
		},
	}
})