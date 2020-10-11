export const state = () => ({
  itemsCounter: null,
  cart: []
})

export const getters = {
  getItemsCounter: state => state.itemsCounter,
  getItemInCart: state => state.cart
}

export const mutations = {
  setItemsCounter (state, payload) {
    state.itemsCounter = payload
  },

  addItemToCart (state, payload) {
    if (state.cart.find(el => el.id === payload.id)) {
      state.cart = state.cart.map((el) => {
        if (el.id === payload.id) {
          el.count = el.count + 1
          return el
        }
        return el
      })
    } else {
      state.cart.push({ ...payload, count: 1 })
    }
  },

  removeItemFromCart (state, payload) {
    state.cart = state.cart.filter(el => el.id !== payload.id)
  },

  appendCartItem (state, payload) {
    state.cart.find(el => el.id === payload.id ? el.count++ : null)
  },

  subtractCartItem (state, payload) {
    state.cart.find(el => el.id === payload.id ? el.count-- : null)
  }
}
