const app = {
    state: {
        customer: '',
        signListUpdate: false
    },
    mutations: {
        SET_CUSTOMER: (state, customer) => {
            state.customer = customer
        },
        SET_SIGNLISTUPDATE: (state, update) => {
            state.signListUpdate = update
        }
    },
    actions: {
    }
}
export default app