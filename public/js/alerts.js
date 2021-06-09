const Swal = require("sweetalert2");
export const errorAlert = (type, msg) => {
  Swal.fire({
    icon: type,
    title: "Xəta",
    text: msg,
  });
};

export const successAlert = (type, msg) => {
  Swal.fire({
    position: "top-center",
    icon: type,
    title: msg,
    showConfirmButton: false,
    timer: 2500,
  });
};
