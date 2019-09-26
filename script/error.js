const error = Vue.component('error', {
	template: `
			<div class="error">			
				Нет связи с сервером товаров
			</div>
	`
});

export default {
	error: error
};