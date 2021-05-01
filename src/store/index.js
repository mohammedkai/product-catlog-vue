import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
	added: [],
	all: [
		{
			id: 1,
			name: 'OnePlus 9',
			description:'LTPO Fluid2 AMOLED, 1B colors, 120Hz, HDR10+, 1300 nits (peak)',
			processor: 'Snapdragon 600',
			price: 399
		},
		{
			id: 2,
			name: 'Iphone 11',
			description:'Super Retina XDR OLED, HDR10, Dolby Vision, 800 nits (typ), 1200 nits (peak)',
			processor: 'Apple A13 Bionic',
			price: 399
		},
		{
			id: 3,
			name: 'Samsung S20',
			description:'Dynamic AMOLED 2X, 120Hz, HDR10+, 1400 nits (peak)',
			processor: 'Snapdragon 888',
			price: 399
		},
	],
	inventory: [
		{
			id: 1,
			quantity: 5
		},
		{
			id: 2,
			quantity: 8
		},
		{
			id: 3,
			quantity: 10
		}

	],
}

// getters
const getters = {
	allProducts: state => state.all, // would need action/mutation if data fetched async
	getNumberOfProducts: state => (state.all) ? state.all.length : 0,
	cartProducts: state => {
		return state.added.map(({ id, quantity }) => {
			const product = state.all.find(p => p.id === id)

			return {
				id:product.id,
				name: product.name,
				price: product.price,
				quantity
			}
		})
	}
}

// actions
const actions = {
	addToCart({ commit }, product) {
		commit('ADD_TO_CART', {
			id: product.id
		})
	}
}

// mutations
const mutations = {
	ADD_TO_CART:(state, { id })=> {
		const record = state.added.find(p => p.id === id)
		if (!record) {
			state.added.push({
				id,
				quantity: 1
			})
		} else {
			record.quantity++
		}
	}
}

// one store for entire application
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
