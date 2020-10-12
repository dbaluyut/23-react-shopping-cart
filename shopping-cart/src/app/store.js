import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import mainReducer from "../features/main/mainSlice"
import cartReducer from "../features/cart/cartSlice"

export default configureStore({
  reducer: {
    counter: counterReducer,
    products: mainReducer,
    cart: cartReducer,
  },
})
