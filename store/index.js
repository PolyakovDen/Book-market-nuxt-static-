export const state = () => ({
  itemsCounter: null
})

export const getters = {
  getItemsCounter: state => state.itemsCounter
}

export const mutations = {
  setItemsCounter (state, payload) {
    state.itemsCounter = payload
  }
}
