import { Alert } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const handleClose = () => {
    dispatch(
      uiActions.showNotification({
        show: false,
      })
    );
  };
  return (
    <div>
      {notification.show && (
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
