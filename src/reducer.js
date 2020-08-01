import {combineReducers} from "redux";


function products(state = {
    isLoading: false,
    products: [],
    error: "",
    addedProducts: [],
    total: 0

}, action) {
    switch (action.type) {
        case "PRODUCTS_REQUESTED":
            return Object.assign({}, state, {
                isLoading: true,
            });
        case "PRODUCTS_RECEIVED":
            // console.log("reducer=", action.data);
            return Object.assign({}, state, {
                isLoading: false,
                products: [...action.data],
                error: ""
            });
        case "PRODUCTS_REQUESTED_FAILED":
            return Object.assign({}, state, {
                isLoading: false,
                error: "Something Went wrong"
            });
        case "ADD_TO_CART":
            // console.log("action.id", action.id);
            let addedProduct = state.products.find(item => item.id === action.id)
            // console.log("addedProduct", addedProduct);
            //checking if the action id exists in the addedProducts
            let existed_item = state.addedProducts.find(item => action.id === item.id)
            // console.log("existed_item=", existed_item);
            if (existed_item) {
                addedProduct.quantity += 1
                return Object.assign({}, state, {
                    ...state,
                    total: state.total + addedProduct.price
                })
            } else {
                addedProduct.quantity = 1;
                //calculating the total
                let newTotal = state.total + addedProduct.price
                return Object.assign({}, state, {
                    ...state,
                    addedProducts: [...state.addedProducts, addedProduct],
                    total: newTotal
                })
            }
        case "ADD_QUANTITY":
            let addedProduct1 = state.products.find(item => item.id === action.id)
            addedProduct1.quantity += 1
            let newTotal1 = state.total + addedProduct1.price
            return Object.assign({}, state, {
                ...state,
                total: newTotal1
            })
        case "SUB_QUANTITY":
            let addedProduct2 = state.products.find(item => item.id === action.id)
            //if the aP == 0 then it should be removed
            if (addedProduct2.quantity === 1) {
                // Removing in added products
                let new_products = state.addedProducts.filter(item => item.id !== action.id)
                let newTotal = state.total - addedProduct2.price

                // Removing in actual products object Quantity
                addedProduct2.quantity -= 1
                return Object.assign({}, state, {
                    ...state,
                    addedProducts: new_products,
                    total: newTotal
                })
            } else {
                addedProduct2.quantity -= 1
                let newTotal = state.total - addedProduct2.price
                return Object.assign({}, state, {
                    ...state,
                    total: newTotal
                });
            }
        default:
            return state;
    }
}

export default combineReducers({
    products
})