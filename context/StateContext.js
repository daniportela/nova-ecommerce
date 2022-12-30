import React, { createContext, useContext, useState, useEffect } from "react"

import { toast } from "react-hot-toast"

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState()
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

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
                setShowCart
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)