const BASE_URL = ''

Vue.component('goods-item', {
	props: ['good', 'cart'],
	computed: {
		/**
		 * Свойство создаёт массив из id товаров в корзине
		 * @return {boolean}
		 */
		goodsIdInCart(cart) {
			let idArr = [];
			this.cart.forEach((i) => {
				idArr.push(i.id);
			});
			return idArr;
		},
	},
	methods: {
		/**
		 * Метод передаёт выше событие клика кнопки добавления товара
		 * @param {obj} event событие клика
		 */
		add(event) {
			if (!this.goodsIdInCart.includes(this.good.id)) {
				this.$emit('add', event);				
			}
		}
	},
	template: `
		<div class="goods-item">
			<img :src="good.img" width="180" height="180">
			<h3>{{ good.title }}</h3>
			<p>Цена: {{ good.price }} $</p>
			<button class="btn item-button" :data-id="good.id" :class="{inCart: goodsIdInCart.includes(good.id)}" @click.prevent="add">{{ goodsIdInCart.includes(good.id) ? 'Добавлено' : 'Добавить в корзину' }}</button>
		</div>
	`
});

Vue.component('goods-list', {
	props: ['goods', 'cart'],
	computed: {
		/**
		 * Свойство проверяет есть ли товар в общем списке товаров
		 * @return {boolean}
		 */
		isGoodsNotEmpty() {
			return this.goods.length > 0;
		},
	},
	methods: {
		/**
		 * Метод передаёт выше событие клика кнопки добавления товара
		 * @param {obj} event событие клика
		 */
		add(event) {
			this.$emit('add', event);
		}
	},
	template: `
		<div class="goods-list" v-if="isGoodsNotEmpty">
			<goods-item v-for="good in goods" :good="good" :cart="cart" :key="good.id" @add="add"></goods-item>
		</div>		
		<div class="no-items" v-else>
			Нет подходящих товаров
		</div>
	`
});

Vue.component('search', {
	data() {
		return {
			searchLine: '',
		}
	},
	props: ['goods'],
	computed: {
		/**
		 * Свойство фильтрует массив товаров по значению строки поиска
		 * @return {arr}    массив с отфильтрованными объектами
		 */
		filteredGoods() {
			const regexp = new RegExp(this.searchLine, 'i');
			return this.goods.filter((good) => {	
				return regexp.test(good.title);
			});
		},
	},
	methods: {
		/**
		 * Метод очищает строку поиска товара
		 */
		cleanSearch() {
			this.searchLine = '';
			this.$emit('filter_send', this.filteredGoods);
		},

		/**
		 * Метод передаёт выше событие отфильтрованный массив товаров
		 * @param {arr} filtered-goods событие клика
		 */
		filter_send() {
			this.$emit('filter_send', this.filteredGoods);
		}
	},

	template: `
		<form class="goods-search-form" @submit.prevent>
			<input type="text" class="goods-search" ref="searchInput" v-model.trim="searchLine" @keyup.prevent="filter_send()"></input>
			<button class="clean-search" @click="cleanSearch">X</button>
		</form>
	`
});

Vue.component('cart', {
	props: ['goods', 'visible', 'cart_goods'],
	computed: {
		/**
		 * Свойство проверяет есть ли товар в корзине
		 * @return {boolean}
		 */
		isCartNotEmpty() {
			return this.cart_goods.length > 0;
		},

		/**
		 * Свойство рассчитывает суммарную стоимость товаров в корзине
		 * @param  [arr] list - массив с товарами
		 * @return [number] - сумма всех товаров (по 1шт каждого)
		 */
		totalPrice() {
			return this.cart_goods.reduce((total, good) => {
				if(!good.price) return total;
				return total += good.price * good.qty;
			}, 0);
		},
	},
	methods: {
		/**
		 * Метод определяет товар по нажатой кнопке товара
		 * @param  {obj} event нажатая кнопка товара
		 * @return {obj}       выбранный товар
		 */
		identifyItem(event) {
			goodId = event.target.getAttribute('data-id');
			good = this.goods.find((currentGood) => {
				return currentGood.id === goodId;
			});
			return good;
		},

		/**
		 * Метод увеличивает количество товара на 1
		 * @param  {obj} good товар
		 */
		plusOne(event) {
			this.$emit('plus_one_item', event);
		},

		/**
		 * Метод уменьшает количество товара на 1
		 * @param  {obj} good товар
		 */
		minusOne(event) {
			goodId = event.target.getAttribute('data-id');
			good = this.cart_goods.find((currentGood) => {
				return currentGood.id === goodId;
			});
			if (good.qty > 1) {
				this.$emit('minus_one_item', event);
			} else {
				this.cart_remove_good(event);
			}
		},

		/**
		 * Метод оповещает о необходимости удалить товар из корзины
		 * @param {obj} event кнопка удаления товара
		 * @param {arr} filtered-goods событие клика
		 */
		cart_remove_good(event) {
			this.$emit('cart_remove_good', event);
		},

		/**
		 * Метод передаёт выше необходимость закрытия корзины
		 * @param {arr} filtered-goods событие клика
		 */
		cart_close() {
			this.$emit('cart_close');
		}
	},
	template: `
		<transition name="fade">
			<div class="cart-list" v-if="visible">
				<button class="close_cart" @click.prevent="cart_close">X</button>
				<div class="cart-item" v-for="good in cart_goods">
					<img :src="good.img" width="90" height="90">
					<div class="cartColumn goodDescr">
						<p><b>Наименование:</b></p>
						<p><b>{{ good.title }}</b></p>
					</div>
					<div class="cartColumn goodPrice">					
						<p><b>Цена:</b></p>
						<p>{{ good.price }} $</p>
					</div>
					<div class="cartColumn goodQty">					
						<p><b>Кол-во:</b></p>
						<p>{{ good.qty }} шт.</p>
						<button class="qtyBtn plusBtn" :data-id="good.id" @click.prevent="plusOne">+</button>					
						<button class="qtyBtn minusBtn" :data-id="good.id" @click.prevent="minusOne">-</button>
					</div>
					<div class="cartColumn goodSum">					
						<p><b>Сумма:</b></p>
						<p><b>{{ good.sum = good.price * good.qty}} $</b></p>
					</div>
					<button class="item-button btn" :data-id="good.id" @click.prevent="cart_remove_good">Удалить из корзины</button>
				</div>
				<div class="cartSum" v-if="isCartNotEmpty"><b>Итого: {{ totalPrice }} $</b></div>
				<div class="no-items cart-no-items" v-else>В корзине нет товаров</div>
			</div>
		</transition>
	`
});

Vue.component('error', {
	template: `
			<div class="error">			
				Нет связи с сервером товаров
			</div>
	`
});

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
			goodId = event.target.getAttribute('data-id');
			good = this.goods.find((currentGood) => {
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
			good = this.identifyItem(event);
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
			good = this.identifyItem(event);
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
			good = this.identifyItem(event);
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
			goodId = event.target.getAttribute('data-id');
			good = this.goods.find((currentGood) => {
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