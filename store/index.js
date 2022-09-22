export const state = () => ({
    imagesFromProducts: [],
    portionProducts: [],
    products: [],
    about: [],
    cart: [],
    activeFilter: "All Products",
    isShowMenu: false,
    portionNumber: 0,
    loading: false,
    error: "",
})

export const actions = {
    async fetchProducts({commit, state}) {
        try {
            commit('SET_LOADING', true)
            let result;
            await this.$fire.database
                .ref(`products`)
                .on("value", (e) => {
                    result = e.val()
                    commit('SET_PRODUCTS', result)
                    commit('SET_PORTION_PRODUCTS')
                    commit('SET_LOADING', false)
                    state.products.forEach(el => {
                        commit('SET_IMAGES_FROM_PRODUCTS', el.img)
                    })
                })
        } catch (error) {
            commit('SET_ERROR', error.message)
        }
    },
    async fetchAbout({commit, state}) {
        try {
            commit('SET_LOADING', true)
            let result;
            await this.$fire.database
                .ref(`about`)
                .on("value", (e) => {
                    result = e.val()
                    commit('SET_ABOUT', result)
                    commit('SET_LOADING', false)
                })
        } catch (error) {
            commit('SET_ERROR', error.message)
        }
    },
    fetchPortionProducts({commit}) {
        commit('SET_PORTION_PRODUCTS')
    },
    setFilteredProducts({commit, dispatch}, event) {
        commit('SET_ACTIVE_FILTER', event.currentTarget.innerText)
        commit('TOGGLE_MENU', false)
        dispatch('fetchPortionProducts')
    },
    toggleMenu({commit}, menu) {
        commit('TOGGLE_MENU', menu)
        commit('SET_PORTION_NUMBER', 0)
    },
    routeToShop({commit, dispatch}, name) {
        commit('SET_ACTIVE_FILTER', name)
        dispatch('fetchPortionProducts')
    },
    getCartFromStorage({commit}) {
        commit('CLEAR_CART')
        for (let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            commit('SET_CART_FROM_STORAGE', localStorage.getItem(key))
        }
    },
    setCartFromStorage({commit}, product) {
        localStorage.setItem(`${product.name}`, JSON.stringify(product))
    },
    deleteCartFromStorage({dispatch}, key) {
        localStorage.removeItem(key)
        dispatch("getCartFromStorage")
    },

}

export const getters = {
    getCart: state => state.cart,
    getError: state => state.error,
    getAbout: state => state.about,
    getLoading: state => state.loading,
    getProducts: state => state.products,
    getIsShowMenu: state => state.isShowMenu,
    getActiveFilter: state => state.activeFilter,
    getPortionNumber: state => state.portionNumber,
    getPortionProducts: state => state.portionProducts,
    getImagesFromProducts: state => state.imagesFromProducts,
}
export const mutations = {
    SET_ABOUT: (state, about) => state.about = about,
    SET_ERROR: (state, error) => state.error = error,
    CLEAR_CART: (state) => {
        state.cart = []
    },
    SET_LOADING: (state, value) => state.loading = value,
    TOGGLE_MENU: (state, isShow) => state.isShowMenu = isShow,
    SET_PRODUCTS: (state, products) => {
        state.products = products
    },
    SET_ACTIVE_FILTER: (state, filter) => state.activeFilter = filter,
    SET_CART_FROM_STORAGE: (state, prod) => {
        const item = JSON.parse(prod)
        if (typeof(item) === "object" && item !== null) {
            state.cart.push(item)
        }
    },
    SET_PORTION_NUMBER: (state, num) => state.portionNumber = num,
    SET_PORTION_PRODUCTS: (state) => {
        state.portionNumber += 4
        if (state.activeFilter === "All Products") {
            state.portionProducts = state.products
                .slice(0, state.portionNumber)

        } else {
            state.portionProducts = state.products
                .filter(el => el.filter
                    .includes(state.activeFilter.toLowerCase()))
                .slice(0, state.portionNumber)
        }
    },
    SET_IMAGES_FROM_PRODUCTS: (state, image) => state.imagesFromProducts.push(image),
}