import axios from "axios";
import { successAlert, errorAlert } from "./alerts";
import User from "../../models/userModel";

export const signup = async (
  name,
  surname,
  email,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/users/signup",
      data: {
        name,
        surname,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === "success") {
      successAlert("success", "Uğurla qeydiyyatdan keçdiz!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    errorAlert("error", "Xəta baş verdi. Yenidən cəhd edin!");
  }
};
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      successAlert("success", "Uğurla daxil olundu!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    } else {
      // errorAlert("error", "Email və ya şifrə səhvdir.Yenidən cəhd edin!");
    }
  } catch (err) {
    // console.log(err.response.data);
    errorAlert("error", "Email və ya şifrə səhvdir.Yenidən cəhd edin!");
    window.setTimeout(() => {
      location.assign("/login");
    }, 1500);
  }
};
export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:8000/users/logout",
    });
    if (res.data.status === "success") {
      successAlert("success", "Uğurla hesabdan çıxıldı!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    errorAlert("error", "Hesabdan çıxarkən xəta baş verdi. Yenidən cəhd edin!");
  }
};

export const deleteUser = async id => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:8000/users/${id}`,
    });
    successAlert("success", "Hesab uğurla silindi");
    window.setTimeout(() => {
      location.assign("/manageUsers");
    }, 1200);
  } catch (err) {
    errorAlert("error", "Hesab silinmədi");
  }
};
export const deleteCard = async id => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:8000/cards/${id}`,
    });
    successAlert("success", "Kart uğurla silindi");
    window.setTimeout(() => {
      location.assign("/manageCards");
    }, 1200);
  } catch (err) {
    errorAlert("error", "Kart silinmədi");
  }
};
export const sendToken = async email => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/users/forgotPassword",
      data: {
        email,
      },
    });
    if (res.data.status === "success") {
      successAlert("success", "Email göndərildi");
    }
  } catch (err) {
    errorAlert("error", "Email tapılmadı");
  }
};
export const resetToken = async (password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:8000/users/resetPassword/token",
      data: {
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === "success") {
      successAlert("success", "Şifrə yeniləndi");
    }
  } catch (err) {
    errorAlert("error", "Şifrə yenilənmədi.Yenidən cəhd edin!");
  }
};
