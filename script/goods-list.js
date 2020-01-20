const goods_list = Vue.component('goods-list', {
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

export default {
	goods_list: goods_list
};