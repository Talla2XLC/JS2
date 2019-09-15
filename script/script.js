const BASE_URL = 'https://raw.githubusercontent.com/Talla2XLC/JS_level2/task5'

Vue.component('goods-item', {
	props: ['good', 'cart'],
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
		<div class="goods-item">
			<img :src="good.img" width="180" height="180">
			<h3>{{ good.title }}</h3>
			<p>Цена: {{ good.price }} $</p>
			<button class="btn item-button" :data-id="good.id" :class="{inCart: cart.includes(good)}" @click.prevent="add">{{ cart.includes(good) ? 'Добавлено' : 'Добавить в корзину' }}</button>
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

const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		searchLine: '',
		cartGoods: [],
		isVisibleCart: false,
		cartCount: 0,
		cartSum: 0
	},
	computed: {
		/**
		 * Свойство фильтрует массив по значению строки поиска
		 * @return {arr}    массив с отфильтрованными объектами
		 */
		filteredGoods() {
			const regexp = new RegExp(this.searchLine, 'i');
			return this.goods.filter((good) => {
				return regexp.test(good.title);
			});
		},

		/**
		 * Свойство проверяет есть ли товар в общем списке товаров
		 * @return {boolean}
		 */
		isGoodsNotEmpty() {
			return this.filteredGoods.length > 0;
		},

		/**
		 * Свойство проверяет есть ли товар в корзине
		 * @return {boolean}
		 */
		isCartNotEmpty() {
			return this.cartGoods.length > 0;
		}
	},
	mounted() {
		this.makeGETRequest(`${BASE_URL}/goods.json`).then((goods) => {
			goods.forEach((i) => {
				i.qty = 0;
				i.sum = 0;
			})
			this.goods = goods;
		}).catch(err => console.error(err));
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
						const response = JSON.parse(xhr.responseText);
						if (xhr.status !== 200) reject(response);
						resolve(response);
					}
				};

				xhr.onerror = (e) => reject(e);

				xhr.open('GET', url);
				xhr.send();
			})
		},

		/**
		 * Метод очищает строку поиска товара
		 */
		cleanSearch() {
			this.searchLine = '';
			this.$refs.searchInput.focus();
		},

		/**
		 * Метод добавляет выбранный товар в корзину, если его там не было
		 * @param {obj} event кнопка добавления товара
		 */
		async addNewItem(event) {
			good = this.identifyItem(event);
			try {
				const { result } = await this.makeGETRequest(`${BASE_URL}/addToBasket.json`);
				if(!result) {
					throw new Error('Ошибка добавления');
				}
				if(!this.isAlreadyAdd(good)) {
					good.qty = 1;
					this.cartGoods.push(good);
					this.cartCount = this.cartGoods.length;
					this.totalPrice();
				}
			} catch(e) {
				throw new Error(e);
			}
		},

		/**
		 * Метод удаляет выбранный товар из корзины
		 * @param  {obj} event кнопка удаления товара
		 */
		removeItem(event) {	
			good = this.identifyItem(event);
			goodIndex = this.cartGoods.indexOf(good);
			if (goodIndex > -1) {
				this.cartGoods.splice(goodIndex, 1);
			}
			this.cartCount = this.cartGoods.length;
			this.totalPrice();
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
		 * Метод увеличивает количество товара на 1
		 * @param  {obj} good товар
		 */
		plusOne(event) {
			good = this.identifyItem(event);
			good.qty += 1;
			this.totalPrice();
		},

		/**
		 * Метод уменьшает количество товара на 1
		 * @param  {obj} good товар
		 */
		minusOne(event) {
			good = this.identifyItem(event);
			if (good.qty > 1) {
				good.qty -= 1;
			} else {
				this.removeItem(event);
			}
			this.totalPrice();
		},

		/**
		 * Метод рассчитывает суммарную стоимость товаров в корзине
		 * @param  [arr] list - массив с товарами
		 * @return [number] - сумма всех товаров (по 1шт каждого)
		 */
		totalPrice() {
			this.cartSum = this.cartGoods.reduce((total, good) => {
				if(!good.price) return total;
				return total += good.price * good.qty;
			}, 0);
		}
	}
})