const cart = Vue.component('cart', {
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
			let goodId = event.target.getAttribute('data-id');
			let good = this.goods.find((currentGood) => {
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
			let goodId = event.target.getAttribute('data-id');
			let good = this.cart_goods.find((currentGood) => {
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

export default {
	cart: cart
};