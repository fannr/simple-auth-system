import {
  validationForm,
  formRegister,
  formLogin,
  formNewPassword,
  checkUsersForm,
  usersStorage,
} from "./functions.js";

const main = () => {
  const form = document.querySelector("form");
  const username = form.querySelector("#userInput");
  const password = form.querySelector("#userPassword");
  const email = form.querySelector("#userEmail");
  const password2 = form.querySelector("#userPassword2");

  const inputFormLogin = document.querySelectorAll(".input-form-login");
  const inputFormRegister = document.querySelectorAll(".input-form-register");
  const inputFormForgot = document.querySelectorAll(".input-form-forgot");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const datasetForm = form.dataset.login;

    if (datasetForm === "false") {
      // Register
      formRegister(username, email, password, password2);
    } else if (datasetForm === "true") {
      // Login
      formLogin(username, password);
    } else if (datasetForm === "newPassword") {
      // Changed Password
      formNewPassword();
    } else {
      // CheckUsers Form
      checkUsersForm(username);
    }
  });

  // Validation New Password
  document.addEventListener("input", (e) => {
    if (e.target.id == "newPassword" || e.target.id == "newPassword2") {
      const inputFormNewForgot = document.querySelectorAll(
        ".input-form-newForgot"
      );

      validationForm(inputFormNewForgot, newPassword, newPassword2);
    }
  });

  // Validation Cek email / Username
  validationForm(inputFormForgot, username);

  // Validation Login
  validationForm(inputFormLogin, username, password);

  // Validation Register
  validationForm(inputFormRegister, username, email, password, password2);
};

export default main;
