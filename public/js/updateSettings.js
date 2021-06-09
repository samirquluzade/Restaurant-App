import axios from "axios";
import { successAlert, errorAlert } from "./alerts";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "http://127.0.0.1:8000/users/updateMyPassword"
        : "http://127.0.0.1:8000/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      type === "password" ? (type = "Şifrəniz") : (type = "Məlumatlar");
      successAlert("success", `${type.capitalize()} uğurla yeniləndi!`);
    }
  } catch (err) {
    errorAlert("error", err.response.data.message);
  }
  location.reload(true);
};
export const updateAllSettings = async (data, type, id) => {
  try {
    const url =
      type === "users"
        ? `http://127.0.0.1:8000/users/updateUser/${id}`
        : `http://127.0.0.1:8000/cards/updateCards/${id}`;
    const res = await axios({
      method: "PATCH",
      url,
      data,
    });
    if (res.data.status === "success") {
      successAlert("success", `Məlumatlar uğurla yeniləndi!`);
    }
  } catch (err) {
    errorAlert("error", err.response.data.message);
  }
  location.reload(true);
};
export const createNewCard = async data => {
  try {
    const url = `http://127.0.0.1:8000/cards/create`;
    const res = await axios({
      method: "POST",
      url,
      data,
    });
    if (res.data.status === "success") {
      successAlert("success", `Kart uğurla əlavə olundu!`);
    }
  } catch (err) {
    errorAlert("error", err.response.data.message);
  }
  location.reload(true);
};
