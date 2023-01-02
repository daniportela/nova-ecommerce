import React, { createContext, useContext, useState, useEffect } from "react"

import { toast } from "react-hot-toast"

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct
    let index

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id)

        setTotalPrice((previousTotalPrice) => previousTotalPrice + product.price * quantity)
        setTotalQuantities((previousTotalQuantities) => previousTotalQuantities + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map(item => {
                if (item._id === product._id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            })
            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity
            
            setCartItems([...cartItems, { ...product }])
        }

        toast.success(`${qty} ${product.name} added to the cart`)
    }

    const onRemove = product => {
        foundProduct = cartItems.find(item => item._id === product._id)
        const newCartItems = cartItems.filter(item => item._id !== product._id)

        setTotalPrice((previousTotalPrice) => previousTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((previousTotalQuantities) => previousTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find(item => item._id === id)
        index = cartItems.findIndex(product => product._id === id)

        const newCartItems = cartItems.filter(item => item._id !== id)

        if (value === "inc") {
            setCartItems(prevCartItems => {
                prevCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 }
                return prevCartItems
            })
            setTotalPrice((previousTotalPrice) => previousTotalPrice + foundProduct.price)
            setTotalQuantities((previousTotalQuantities) => previousTotalQuantities + 1)
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                setCartItems(prevCartItems => {
                    prevCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 }
                    return prevCartItems
                })
                setTotalPrice((previousTotalPrice) => previousTotalPrice - foundProduct.price)
                setTotalQuantities((previousTotalQuantities) => previousTotalQuantities - 1)
            }
        }
    }

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1

            return prevQty - 1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                increaseQty,
                decreaseQty,
                onAdd,
                onRemove,
                setShowCart,
                toggleCartItemQuantity,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)