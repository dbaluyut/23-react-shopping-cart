import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const mainSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload
    },
  },
})

export const { getProducts } = mainSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const productsAsync = () => (dispatch) => {
  axios
    .get(`http://localhost:3001/products`)
    .then((resp) => dispatch(getProducts(resp.data)))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = (state) => state.products.value
export const selectProducts = (state) => state.products.products

export default mainSlice.reducer
