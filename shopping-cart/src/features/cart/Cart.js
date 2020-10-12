import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectProducts, productsAsync } from "../main/mainSlice"
import styles from "./cart.css"
import {
  selectCart,
  incrementQty,
  deleteItem,
  selectCartItemCount,
  selectCartTotal,
} from "./cartSlice"

export default function Cart() {
  const dispatch = useDispatch()

  const cart = useSelector(selectCart)

  const cartItemCount = useSelector(selectCartItemCount)

  const [displayState, setDisplayState] = useState(true)

  const subTotal = useSelector(selectCartTotal)

  return (
    <>
      <div
        className={displayState === false ? "cart" : "cart-close"}
        onClick={() => {
          setDisplayState(!displayState)
        }}
      >
        <i class="fas fa-shopping-cart"></i>
        <li className="cart-count-sm">{cartItemCount}</li>
      </div>

      <div
        className={
          displayState === false
            ? "cart-container"
            : "cart-container container-close"
        }
      >
        <h1 className="cart-header">
          <i class="fas fa-shopping-cart"></i>
          <span className="cart-title">Cart</span>
          <span className="floating-count">{cartItemCount}</span>
        </h1>

        <div>
          {cart.map((product) => (
            <div key={product.sku} className="cart-item">
              <div className="cart-left">
                <img src={product.img.thumb} className="thumb"></img>
                <div>
                  <li className="item-title">{product.title}</li>
                  <li className="item-sizes">{product.availableSizes}</li>
                  <li className="item-qty">qty: {product.quantity}</li>
                </div>
              </div>
              <div className="cart-right">
                <button
                  className="cart-btn"
                  onClick={() => dispatch(deleteItem(product.id))}
                >
                  X
                </button>
                <li>${product.price.toFixed(2)}</li>
                <div className="btn-container">
                  <button className="cart-btn">+</button>
                  <button className="cart-btn">-</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="subtotal-container">
            <li>SUBTOTAL</li>
            <h1 className="subtotal-text">${subTotal.toFixed(2)}</h1>
          </div>
          <button className="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    </>
  )
}
