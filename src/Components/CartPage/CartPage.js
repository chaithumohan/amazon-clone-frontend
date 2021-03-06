import "./CartPage.css";
import React, { useState, useEffect } from "react";
import CartComponent from "./CartComponent";
import { Store } from "../../context";
import { URL } from "../../reducer";
export default function CartPage() {
  const [cartData, setCartData] = useState([]);
  const [checkoutPrice, setCheckoutPrice] = useState(0);
  const [store] = Store();
  useEffect(() => {
    const popOrders = () => {
      let newCheckoutPrice = 0;
      let newCartData = [];
      store.user.cart.map(async (cart) => {
        await fetch(`${URL}/item?itemId=${cart}`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.err) {
              newCartData.push(data);
              setCartData(newCartData);
              newCheckoutPrice = newCheckoutPrice + data.amountMax;
              setCheckoutPrice(newCheckoutPrice);
            } else {
              console.log("Item Not Returned");
            }
          })
          .catch((err) => console.log(err.message));
        return null;
      });
    };
    popOrders();
  }, [store.user]);
  return store.user.cart.length !== 0 ? (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12  text-left py-3 checkout__div">
          Total Cart Price : {checkoutPrice}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3  "></div>
        <div className="col-lg-6 col-12">
          {cartData.map((cartItem) => (
            <CartComponent
              key={cartItem._id}
              id={cartItem._id}
              img={cartItem.imageURLs.split(",")[0]}
              name={cartItem.name}
              stock={cartItem.isSale}
              price={cartItem.amountMax}
            />
          ))}
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  ) : (
    <div className="no__results__div my-5 jumbotron mx-auto">
      <p className="px-auto text-center no__results">Cart Is Empty </p>
    </div>
  );
}
