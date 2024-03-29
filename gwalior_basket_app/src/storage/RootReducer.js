
const intialState = {
    cart:{},
    user:{}
}

export default function RootReducer(state = intialState,action)
{
    switch(action.type)
    {
        // For Products
        case 'ADD_CART':
            state.cart[action.payload[0]] = action.payload[1]
            return {cart : state.cart , user : state.user}
        case 'EDIT_CART':
            state.cart[action.payload[0]] = action.payload[1]
            return {cart : state.cart , user : state.user}
        case 'DELETE_CART':
            delete state.cart[action.payload[0]]
            return {cart : state.cart , user : state.user}
        case 'CLEAR_CART':
            state.cart = {}
            return {cart : state.cart , user : state.user}
        case 'ADD_USER':
            state.user[action.payload[0]] = action.payload[1]
            return {cart : state.cart , user : state.user}
        default:
            return {cart : state.cart , user : state.user}
    }
}