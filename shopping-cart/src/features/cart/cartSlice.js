import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartItemCount: 0,
    cartTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = { ...action.payload }

      const findProduct = state.products.find((item) => item.id == product.id)

      if (findProduct) {
        findProduct.quantity = findProduct.quantity + 1
        state.cartItemCount += +1
        state.cartTotal += findProduct.price
      } else {
        state.products.push({ ...product, quantity: 1 })
        state.cartItemCount += +1
        state.cartTotal += product.price
      }
    },
    // incrementQty: (state, action) => {},
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      )
    },
  },
})

export const { addToCart, incrementQty, deleteItem } = cartSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// export const productsAsync = () => (dispatch) => {
//   axios
//     .get(`http://localhost:3001/products`)
//     .then((resp) => dispatch(getProducts(resp.data)))
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = (state) => state.products.value
export const selectCart = (state) => state.cart.products
export const selectCartItemCount = (state) => state.cart.cartItemCount
export const selectCartTotal = (state) => state.cart.cartTotal

export default cartSlice.reducer
