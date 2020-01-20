const search = Vue.component('search', {
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

export default {
	search: search
};