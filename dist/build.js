/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./script/cart.js":
/*!************************!*\
  !*** ./script/cart.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst cart = Vue.component('cart', {\r\n\tprops: ['goods', 'visible', 'cart_goods'],\r\n\tcomputed: {\r\n\t\t/**\r\n\t\t * Свойство проверяет есть ли товар в корзине\r\n\t\t * @return {boolean}\r\n\t\t */\r\n\t\tisCartNotEmpty() {\r\n\t\t\treturn this.cart_goods.length > 0;\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Свойство рассчитывает суммарную стоимость товаров в корзине\r\n\t\t * @param  [arr] list - массив с товарами\r\n\t\t * @return [number] - сумма всех товаров (по 1шт каждого)\r\n\t\t */\r\n\t\ttotalPrice() {\r\n\t\t\treturn this.cart_goods.reduce((total, good) => {\r\n\t\t\t\tif(!good.price) return total;\r\n\t\t\t\treturn total += good.price * good.qty;\r\n\t\t\t}, 0);\r\n\t\t},\r\n\t},\r\n\tmethods: {\r\n\t\t/**\r\n\t\t * Метод определяет товар по нажатой кнопке товара\r\n\t\t * @param  {obj} event нажатая кнопка товара\r\n\t\t * @return {obj}       выбранный товар\r\n\t\t */\r\n\t\tidentifyItem(event) {\r\n\t\t\tlet goodId = event.target.getAttribute('data-id');\r\n\t\t\tlet good = this.goods.find((currentGood) => {\r\n\t\t\t\treturn currentGood.id === goodId;\r\n\t\t\t});\r\n\t\t\treturn good;\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод увеличивает количество товара на 1\r\n\t\t * @param  {obj} good товар\r\n\t\t */\r\n\t\tplusOne(event) {\r\n\t\t\tthis.$emit('plus_one_item', event);\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод уменьшает количество товара на 1\r\n\t\t * @param  {obj} good товар\r\n\t\t */\r\n\t\tminusOne(event) {\r\n\t\t\tlet goodId = event.target.getAttribute('data-id');\r\n\t\t\tlet good = this.cart_goods.find((currentGood) => {\r\n\t\t\t\treturn currentGood.id === goodId;\r\n\t\t\t});\r\n\t\t\tif (good.qty > 1) {\r\n\t\t\t\tthis.$emit('minus_one_item', event);\r\n\t\t\t} else {\r\n\t\t\t\tthis.cart_remove_good(event);\r\n\t\t\t}\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод оповещает о необходимости удалить товар из корзины\r\n\t\t * @param {obj} event кнопка удаления товара\r\n\t\t * @param {arr} filtered-goods событие клика\r\n\t\t */\r\n\t\tcart_remove_good(event) {\r\n\t\t\tthis.$emit('cart_remove_good', event);\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод передаёт выше необходимость закрытия корзины\r\n\t\t * @param {arr} filtered-goods событие клика\r\n\t\t */\r\n\t\tcart_close() {\r\n\t\t\tthis.$emit('cart_close');\r\n\t\t}\r\n\t},\r\n\ttemplate: `\r\n\t\t<transition name=\"fade\">\r\n\t\t\t<div class=\"cart-list\" v-if=\"visible\">\r\n\t\t\t\t<button class=\"close_cart\" @click.prevent=\"cart_close\">X</button>\r\n\t\t\t\t<div class=\"cart-item\" v-for=\"good in cart_goods\">\r\n\t\t\t\t\t<img :src=\"good.img\" width=\"90\" height=\"90\">\r\n\t\t\t\t\t<div class=\"cartColumn goodDescr\">\r\n\t\t\t\t\t\t<p><b>Наименование:</b></p>\r\n\t\t\t\t\t\t<p><b>{{ good.title }}</b></p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"cartColumn goodPrice\">\t\t\t\t\t\r\n\t\t\t\t\t\t<p><b>Цена:</b></p>\r\n\t\t\t\t\t\t<p>{{ good.price }} $</p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"cartColumn goodQty\">\t\t\t\t\t\r\n\t\t\t\t\t\t<p><b>Кол-во:</b></p>\r\n\t\t\t\t\t\t<p>{{ good.qty }} шт.</p>\r\n\t\t\t\t\t\t<button class=\"qtyBtn plusBtn\" :data-id=\"good.id\" @click.prevent=\"plusOne\">+</button>\t\t\t\t\t\r\n\t\t\t\t\t\t<button class=\"qtyBtn minusBtn\" :data-id=\"good.id\" @click.prevent=\"minusOne\">-</button>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"cartColumn goodSum\">\t\t\t\t\t\r\n\t\t\t\t\t\t<p><b>Сумма:</b></p>\r\n\t\t\t\t\t\t<p><b>{{ good.sum = good.price * good.qty}} $</b></p>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<button class=\"item-button btn\" :data-id=\"good.id\" @click.prevent=\"cart_remove_good\">Удалить из корзины</button>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"cartSum\" v-if=\"isCartNotEmpty\"><b>Итого: {{ totalPrice }} $</b></div>\r\n\t\t\t\t<div class=\"no-items cart-no-items\" v-else>В корзине нет товаров</div>\r\n\t\t\t</div>\r\n\t\t</transition>\r\n\t`\r\n});\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n\tcart: cart\r\n});\n\n//# sourceURL=webpack:///./script/cart.js?");

/***/ }),

/***/ "./script/error.js":
/*!*************************!*\
  !*** ./script/error.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst error = Vue.component('error', {\r\n\ttemplate: `\r\n\t\t\t<div class=\"error\">\t\t\t\r\n\t\t\t\tНет связи с сервером товаров\r\n\t\t\t</div>\r\n\t`\r\n});\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n\terror: error\r\n});\n\n//# sourceURL=webpack:///./script/error.js?");

/***/ }),

/***/ "./script/goods-item.js":
/*!******************************!*\
  !*** ./script/goods-item.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst goods_item = Vue.component('goods-item', {\r\n\tprops: ['good', 'cart'],\r\n\tcomputed: {\r\n\t\t/**\r\n\t\t * Свойство создаёт массив из id товаров в корзине\r\n\t\t * @return {boolean}\r\n\t\t */\r\n\t\tgoodsIdInCart(cart) {\r\n\t\t\tlet idArr = [];\r\n\t\t\tthis.cart.forEach((i) => {\r\n\t\t\t\tidArr.push(i.id);\r\n\t\t\t});\r\n\t\t\treturn idArr;\r\n\t\t},\r\n\t},\r\n\tmethods: {\r\n\t\t/**\r\n\t\t * Метод передаёт выше событие клика кнопки добавления товара\r\n\t\t * @param {obj} event событие клика\r\n\t\t */\r\n\t\tadd(event) {\r\n\t\t\tif (!this.goodsIdInCart.includes(this.good.id)) {\r\n\t\t\t\tthis.$emit('add', event);\t\t\t\t\r\n\t\t\t}\r\n\t\t}\r\n\t},\r\n\ttemplate: `\r\n\t\t<div class=\"goods-item\">\r\n\t\t\t<img :src=\"good.img\" width=\"180\" height=\"180\">\r\n\t\t\t<h3>{{ good.title }}</h3>\r\n\t\t\t<p>Цена: {{ good.price }} $</p>\r\n\t\t\t<button class=\"btn item-button\" :data-id=\"good.id\" :class=\"{inCart: goodsIdInCart.includes(good.id)}\" @click.prevent=\"add\">{{ goodsIdInCart.includes(good.id) ? 'Добавлено' : 'Добавить в корзину' }}</button>\r\n\t\t</div>\r\n\t`\r\n});\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n\tgoods_item: goods_item\r\n});\n\n//# sourceURL=webpack:///./script/goods-item.js?");

/***/ }),

/***/ "./script/goods-list.js":
/*!******************************!*\
  !*** ./script/goods-list.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst goods_list = Vue.component('goods-list', {\r\n\tprops: ['goods', 'cart'],\r\n\tcomputed: {\r\n\t\t/**\r\n\t\t * Свойство проверяет есть ли товар в общем списке товаров\r\n\t\t * @return {boolean}\r\n\t\t */\r\n\t\tisGoodsNotEmpty() {\r\n\t\t\treturn this.goods.length > 0;\r\n\t\t},\r\n\t},\r\n\tmethods: {\r\n\t\t/**\r\n\t\t * Метод передаёт выше событие клика кнопки добавления товара\r\n\t\t * @param {obj} event событие клика\r\n\t\t */\r\n\t\tadd(event) {\r\n\t\t\tthis.$emit('add', event);\r\n\t\t}\r\n\t},\r\n\ttemplate: `\r\n\t\t<div class=\"goods-list\" v-if=\"isGoodsNotEmpty\">\r\n\t\t\t<goods-item v-for=\"good in goods\" :good=\"good\" :cart=\"cart\" :key=\"good.id\" @add=\"add\"></goods-item>\r\n\t\t</div>\t\t\r\n\t\t<div class=\"no-items\" v-else>\r\n\t\t\tНет подходящих товаров\r\n\t\t</div>\r\n\t`\r\n});\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n\tgoods_list: goods_list\r\n});\n\n//# sourceURL=webpack:///./script/goods-list.js?");

/***/ }),

/***/ "./script/script.js":
/*!**************************!*\
  !*** ./script/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _goods_item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goods-item.js */ \"./script/goods-item.js\");\n/* harmony import */ var _goods_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goods-list.js */ \"./script/goods-list.js\");\n/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search.js */ \"./script/search.js\");\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart.js */ \"./script/cart.js\");\n/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error.js */ \"./script/error.js\");\nconst BASE_URL = '';\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst app = new Vue({\r\n\tel: '#app',\r\n\tdata: {\r\n\t\tgoods: [],\r\n\t\tfilteredGoods: [],\r\n\t\tcartGoods: [],\r\n\t\tisVisibleCart: false,\r\n\t\tisError: false\r\n\t},\r\n\tcomputed: {\r\n\t\tcartCount() {\r\n\t\t\treturn this.cartGoods.length;\r\n\t\t}\r\n\t},\r\n\tcreated() {\r\n\t\t/**\r\n\t\t * Метод обновляет товары в корзине\r\n\t\t */\r\n\t\tthis.makeGETRequest(`${BASE_URL}/cartData`).then((goods) => {\r\n\t\t\tthis.cartGoods = goods;\r\n\t\t}).catch((err) => {\r\n\t\t\tthis.isError = !this.isError;\r\n\t\t\tconsole.error(err);\r\n\t\t});\r\n\t},\r\n\tmounted() {\r\n\t\tthis.makeGETRequest(`${BASE_URL}/catalogData`).then((goods) => {\r\n\t\t\tgoods.forEach((i) => {\r\n\t\t\t\ti.qty = 0;\r\n\t\t\t\ti.sum = 0;\r\n\t\t\t})\r\n\t\t\tthis.goods = goods;\r\n\t\t\tthis.filteredGoods = goods;\r\n\t\t}).catch((err) => {\r\n\t\t\tthis.isError = !this.isError;\r\n\t\t\tconsole.error(err);\r\n\t\t});\r\n\t},\r\n\tmethods: {\r\n\t\t/**\r\n\t\t * Метод отправляет GET запрос на сервер\r\n\t\t * @param  {string} url ссылка на ресурс\r\n\t\t * @return {JSON}   файл json с данными\r\n\t\t */\r\n\t\tmakeGETRequest(url) {\r\n\t\t\treturn new Promise ((resolve, reject) => {\r\n\t\t\t\tconst xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');\r\n\r\n\t\t\t\txhr.onreadystatechange = function () {\r\n\t\t\t\t\tif (xhr.readyState === 4) {\r\n\t\t\t\t\t\tif (xhr.status !== 200) {\r\n\t\t\t\t\t\t\treject(xhr.status);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\telse {\r\n\t\t\t\t\t\t\tconst response = JSON.parse(xhr.responseText);\r\n\t\t\t\t\t\t\tresolve(response);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t};\r\n\r\n\t\t\t\txhr.onerror = (e) => reject(e);\r\n\r\n\t\t\t\txhr.open('GET', url);\r\n\t\t\t\txhr.send();\r\n\t\t\t})\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод отправляет POST запрос на сервер\r\n\t\t * @param  {string} url ссылка на ресурс\r\n\t\t * @param  {data} data передаваемые данные\r\n\t\t * @return {JSON}   файл json с данными\r\n\t\t */\r\n\t\tmakePOSTRequest(url, data) {\r\n\t\t\treturn new Promise ((resolve, reject) => {\r\n\t\t\t\tconst xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');\r\n\r\n\t\t\t\txhr.onreadystatechange = function () {\r\n\t\t\t\t\tif (xhr.readyState === 4) {\r\n\t\t\t\t\t\tif (xhr.status !== 200) {\r\n\t\t\t\t\t\t\treject(xhr.status);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\telse {\r\n\t\t\t\t\t\t\tconst response = JSON.parse(xhr.responseText);\r\n\t\t\t\t\t\t\tresolve(response);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t};\r\n\r\n\t\t\t\txhr.onerror = (e) => reject(e);\r\n\r\n\t\t\t\txhr.open('POST', url);\r\n\t\t\t\txhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');\r\n\r\n\t\t\t\txhr.send(JSON.stringify(data));\r\n\t\t\t})\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод отправляет DELETE запрос на сервер\r\n\t\t * @param  {string} url ссылка на ресурс\r\n\t\t * @param  {data} data передаваемые данные\r\n\t\t * @return {JSON}   файл json с данными\r\n\t\t */\r\n\t\tmakeDELETERequest(url, data) {\r\n\t\t\treturn new Promise ((resolve, reject) => {\r\n\t\t\t\tconst xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');\r\n\r\n\t\t\t\txhr.onreadystatechange = function () {\r\n\t\t\t\t\tif (xhr.readyState === 4) {\r\n\t\t\t\t\t\tif (xhr.status !== 200) {\r\n\t\t\t\t\t\t\treject(xhr.status);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\telse {\r\n\t\t\t\t\t\t\tconst response = JSON.parse(xhr.responseText);\r\n\t\t\t\t\t\t\tresolve(response);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t};\r\n\r\n\t\t\t\txhr.onerror = (e) => reject(e);\r\n\r\n\t\t\t\txhr.open('DELETE', url);\r\n\t\t\t\txhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');\r\n\r\n\t\t\t\txhr.send(JSON.stringify(data));\r\n\t\t\t})\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод добавляет выбранный товар в корзину, если его там не было\r\n\t\t * @param {obj} event кнопка добавления товара\r\n\t\t */\r\n\t\tasync addNewItem(event) {\r\n\t\t\tlet goodId = event.target.getAttribute('data-id');\r\n\t\t\tlet good = this.goods.find((currentGood) => {\r\n\t\t\t\treturn currentGood.id === goodId;\r\n\t\t\t});\r\n\t\t\ttry {\r\n\t\t\t\tif(!this.isAlreadyAdd(good)) {\r\n\t\t\t\t\tgood.qty = 1;\r\n\t\t\t\t\tthis.cartGoods = await this.makePOSTRequest('/addToCart', good);\r\n\t\t\t\t\tthis.addStat(\"Добавлен товар\", good.title);\r\n\t\t\t\t}\r\n\t\t\t} catch(e) {\r\n\t\t\t\tthrow new Error(e);\r\n\t\t\t}\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод удаляет выбранный товар из корзины\r\n\t\t * @param  {obj} event кнопка удаления товара\r\n\t\t */\r\n\t\tasync removeItem(event) {\t\r\n\t\t\tlet good = this.identifyItem(event);\r\n\t\t\ttry {\r\n\t\t\t\tthis.cartGoods = await this.makeDELETERequest('/removeFromCart', good);\r\n\t\t\t\tthis.addStat(\"Удалён товар\", good.title);\r\n\t\t\t} catch(e) {\r\n\t\t\t\tthrow new Error(e);\r\n\t\t\t}\t\t\t\t\t\t\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод удаляет 1шт выбранного товара\r\n\t\t * @param  {obj} event кнопка удаления товара\r\n\t\t */\r\n\t\tasync minusOneItem(event) {\r\n\t\t\tlet good = this.identifyItem(event);\r\n\t\t\ttry {\r\n\t\t\t\tthis.cartGoods = await this.makePOSTRequest('/minusOneItem', good);\r\n\t\t\t\tthis.addStat(\"Удалена 1шт\", good.title);\r\n\t\t\t} catch(e) {\r\n\t\t\t\tthrow new Error(e);\r\n\t\t\t}\t\t\t\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод прибавляет 1шт выбранного товара\r\n\t\t * @param  {obj} event кнопка удаления товара\r\n\t\t */\r\n\t\tasync plusOneItem(event) {\r\n\t\t\tlet good = this.identifyItem(event);\r\n\t\t\ttry {\r\n\t\t\t\tthis.cartGoods = await this.makePOSTRequest('/plusOneItem', good);\r\n\t\t\t\tthis.addStat(\"Добавлена 1шт\", good.title);\r\n\t\t\t} catch(e) {\r\n\t\t\t\tthrow new Error(e);\r\n\t\t\t}\t\t\t\r\n\t\t},\r\n\r\n\t\taddStat(act, good) {\r\n\t\t\tlet stat = {\r\n\t\t\t\t\"действие\": act,\r\n\t\t\t\t\"описание\": good,\r\n\t\t\t\t\"время\": Date()\r\n\t\t\t};\r\n\t\t\tthis.makePOSTRequest('/addStat', stat);\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод определяет товар по нажатой кнопке товара\r\n\t\t * @param  {obj} event нажатая кнопка товара\r\n\t\t * @return {obj}       выбранный товар\r\n\t\t */\r\n\t\tidentifyItem(event) {\r\n\t\t\tlet goodId = event.target.getAttribute('data-id');\r\n\t\t\tlet good = this.goods.find((currentGood) => {\r\n\t\t\t\treturn currentGood.id === goodId;\r\n\t\t\t});\r\n\t\t\treturn good;\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод проверяет не добавлен ли выбранный товар в корзину\r\n\t\t * @param  {obj}  good товар магазина\r\n\t\t * @return {Boolean}\r\n\t\t */\r\n\t\tisAlreadyAdd(good) {\r\n\t\t\treturn this.cartGoods.includes(good);\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод переключает видимость корзины\r\n\t\t */\r\n\t\ttoggleCartVisibility() {\r\n\t\t\tthis.isVisibleCart = !this.isVisibleCart;\r\n\t\t\tthis.$refs.mainHeader.classList.toggle(\"blur\");\r\n\t\t\tthis.$refs.mainContent.classList.toggle(\"blur\");\t\t\t\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод обновляет список товаров в соответствии с пришедшим массивом\r\n\t\t * @param  {arr} fgoods отфильтрованный массив товаров\r\n\t\t */\r\n\t\tupdateGoods(fgoods) {\r\n\t\t\tthis.filteredGoods = fgoods;\r\n\t\t},\r\n\t}\r\n})\n\n//# sourceURL=webpack:///./script/script.js?");

/***/ }),

/***/ "./script/search.js":
/*!**************************!*\
  !*** ./script/search.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst search = Vue.component('search', {\r\n\tdata() {\r\n\t\treturn {\r\n\t\t\tsearchLine: '',\r\n\t\t}\r\n\t},\r\n\tprops: ['goods'],\r\n\tcomputed: {\r\n\t\t/**\r\n\t\t * Свойство фильтрует массив товаров по значению строки поиска\r\n\t\t * @return {arr}    массив с отфильтрованными объектами\r\n\t\t */\r\n\t\tfilteredGoods() {\r\n\t\t\tconst regexp = new RegExp(this.searchLine, 'i');\r\n\t\t\treturn this.goods.filter((good) => {\t\r\n\t\t\t\treturn regexp.test(good.title);\r\n\t\t\t});\r\n\t\t},\r\n\t},\r\n\tmethods: {\r\n\t\t/**\r\n\t\t * Метод очищает строку поиска товара\r\n\t\t */\r\n\t\tcleanSearch() {\r\n\t\t\tthis.searchLine = '';\r\n\t\t\tthis.$emit('filter_send', this.filteredGoods);\r\n\t\t},\r\n\r\n\t\t/**\r\n\t\t * Метод передаёт выше событие отфильтрованный массив товаров\r\n\t\t * @param {arr} filtered-goods событие клика\r\n\t\t */\r\n\t\tfilter_send() {\r\n\t\t\tthis.$emit('filter_send', this.filteredGoods);\r\n\t\t}\r\n\t},\r\n\r\n\ttemplate: `\r\n\t\t<form class=\"goods-search-form\" @submit.prevent>\r\n\t\t\t<input type=\"text\" class=\"goods-search\" ref=\"searchInput\" v-model.trim=\"searchLine\" @keyup.prevent=\"filter_send()\"></input>\r\n\t\t\t<button class=\"clean-search\" @click=\"cleanSearch\">X</button>\r\n\t\t</form>\r\n\t`\r\n});\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n\tsearch: search\r\n});\n\n//# sourceURL=webpack:///./script/search.js?");

/***/ })

/******/ });