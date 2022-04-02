import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { fetchData, sendCartData } from "./store/cart-actions";

let firstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    // const sendReq = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       message: "Sending Request",
    //       type: "warning",
    //       show: true,
    //     })
    //   );
    //   const res = await axios.put(
    //     "https://redux-http-2d78e-default-rtdb.firebaseio.com/cartItems.json",
    //     cart
    //   );
    //   console.log(res);

    //   // success alert
    //   dispatch(
    //     uiActions.showNotification({
    //       message: "Cart Updated",
    //       type: "success",
    //       show: true,
    //     })
    //   );
    // };

    // sendReq().catch((err) => {
    //   console.log(err);
    //   dispatch(
    //     uiActions.showNotification({
    //       message: "Something went wrong",
    //       type: "error",
    //       show: true,
    //     })
    //   );
    // });

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
