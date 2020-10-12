import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectProducts, productsAsync } from "./mainSlice"
import Cart from "../cart/Cart"
import { addToCart, selectCart } from "../cart/cartSlice"

import styles from "./main.css"

export default function Main() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const cart = useSelector(selectCart)

  useEffect(() => {
    dispatch(productsAsync())
  }, [])

  return (
    <div>
      <Cart />
      <main>
        <div className="container">
          <div className="filter-container">
            <h3>Sizes:</h3>
            <ul className="size-container">
              <li className="size-btn">XS</li>
              <li className="size-btn">S</li>
              <li className="size-btn">M</li>
              <li className="size-btn">ML</li>
              <li className="size-btn">L</li>
              <li className="size-btn">XL</li>
              <li className="size-btn">XXL</li>
            </ul>
          </div>
          <div>
            <div className="sort-container">
              <div>16 Products found.</div>
              <form>
                <label>Order by </label>
                <select>
                  <option>Select</option>
                  <option>Lowest to Highest</option>
                  <option>Highest to Lowest</option>
                </select>
              </form>
            </div>
            <div className="product-gallery">
              {products.map((product) => {
                return (
                  <div className="product" key={product.id}>
                    <div className="img-price-container">
                      {product.isFreeShipping === false ? (
                        <div className="not-free"> </div>
                      ) : (
                        <div className="free-shipping">Free Shipping</div>
                      )}
                      <img src={product.img.normal}></img>
                    </div>
                    <div className="price-container">
                      <li className="product-title">{product.title}</li>
                      <div className="orange-line"></div>
                      <li className="decimal">
                        $
                        <span className="product-price">
                          {Math.floor(product.price.toFixed(2))}
                        </span>
                        {/* decimal places start here */}
                        {product.price
                          .toFixed(2)
                          .toString()
                          .slice(
                            product.price.toFixed(2).toString().indexOf(".")
                          )}
                      </li>
                      <li className="installments">
                        {`or ${product.installments} x
                  $${(product.price / product.installments).toFixed(2)}`}
                      </li>
                    </div>
                    <button
                      className="add-to-cart"
                      onClick={
                        () => {
                          dispatch(addToCart(product))
                          console.log(cart)
                        }
                        // console.log(product)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* </div> */}
      </main>
    </div>
  )
}
