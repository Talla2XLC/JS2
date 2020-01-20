const goods_item = Vue.component('goods-item', {
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

export default {
	goods_item: goods_item
};