import axios from "axios";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await axios.get(
        "https://redux-http-2d78e-default-rtdb.firebaseio.com/cartItems.json"
      );
      console.log(res.data);
      return res.data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      console.log(err);
      dispatch(
        uiActions.showNotification({
          message: "Failed to fetch data",
          type: "error",
          show: true,
        })
      );
    }
  };
};
// Another method to connect cart with firebase
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        message: "Sending Request",
        type: "warning",
        show: true,
      })
    );

    const sendReq = async () => {
      const res = await axios.put(
        "https://redux-http-2d78e-default-rtdb.firebaseio.com/cartItems.json",
        cart
      );
      console.log(res.data);

      // success alert
      dispatch(
        uiActions.showNotification({
          message: "Cart Updated",
          type: "success",
          show: true,
        })
      );
    };

    try {
      await sendReq();
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          message: "Something went wrong",
          type: "error",
          show: true,
        })
      );
    }
  };
};
