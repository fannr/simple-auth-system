const usersStorage = JSON.parse(localStorage.getItem("user")) || [];

const validationForm = (inputElement, ...element) => {
  for (const input of inputElement) {
    input.addEventListener("keyup", () => {
      for (const el of element) {
        if (el.value.length != 0) {
          document.querySelector(".button").classList.remove("disabled");
        } else {
          document.querySelector(".button").classList.add("disabled");
        }
      }
    });
  }
};

const formRegister = (username, email, password, password2) => {
  const filterUser = usersStorage.filter(
    (u) =>
      u.username === username.value.toLowerCase() ||
      u.email === email.value.toLowerCase()
  );

  if (filterUser.length > 0) {
    const getFilterUser = filterUser.find((f) => f);

    if (getFilterUser.username == username.value.toLowerCase()) {
      alert(`Username telah digunakan!`);
    } else if (getFilterUser.email == email.value.toLowerCase()) {
      alert(`Email telah digunakan!`);
    }
  } else if (username.value.length > 0 && username.value.length < 6) {
    alert("Username anda terlalu pendek, minimal 6 digit!");
  } else if (password.value.length > 0 && password.value.length < 8) {
    alert("Password anda terlalu pendek, minimal 8 digits!");
  } else if (password.value.toLowerCase() != password2.value.toLowerCase()) {
    alert("Password not same!");
  } else {
    const userData = {
      id: +new Date(),
      username: username.value.toLowerCase(),
      email: email.value.toLowerCase(),
      password: password.value.toLowerCase(),
    };

    usersStorage.push(userData);
    alert("Registrasi berhasil!");

    username.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";
    document.querySelector(".button").classList.add("disabled");
  }

  localStorage.setItem("user", JSON.stringify(usersStorage));
};

const formLogin = (username, password) => {
  const filterUser = usersStorage.filter(
    (u) =>
      u.username === username.value.toLowerCase() ||
      u.email === username.value.toLowerCase()
  );

  if (filterUser.length > 0) {
    const getFilterUser = filterUser.find((f) => f);

    if (getFilterUser.password === password.value.toLowerCase()) {
      alert("Login successfully!");

      setTimeout(() => {
        document.location.href = `home.html?userId=${getFilterUser.id}`;
      }, 300);
    } else {
      alert("Your password is wrong!!");
    }
  } else {
    alert("Username / Email not found!");
  }
};

const formNewPassword = () => {
  const newPassword = document.querySelector("#newPassword");
  const confirmPassword = document.querySelector("#newPassword2");
  const userHidden = document.getElementById("userHidden").dataset.user;

  if (newPassword.value != confirmPassword.value) {
    alert("Password is not same!");
  } else if (newPassword.value.length > 0 && newPassword.value.length < 8) {
    alert("Password minimum 8 digit!");
  } else {
    // update
    const getFilterUser = usersStorage
      .filter((u) => u.username === userHidden || u.email === userHidden)
      .find((user) => user);

    getFilterUser.password = newPassword.value;
    localStorage.setItem("user", JSON.stringify(usersStorage));

    alert("Password success changed!");
    document.location.href = "index.html";
  }
};

const checkUsersForm = (username) => {
  const filterUser = usersStorage.filter(
    (u) =>
      u.username === username.value.toLowerCase() ||
      u.email === username.value.toLowerCase()
  );

  if (filterUser.length > 0) {
    alert("Cek username / email anda berhasil");

    const elementForgot = document.querySelector("[data-login='forgot']");
    elementForgot.dataset.login = "newPassword";

    elementForgot.innerHTML = "<h1>Wait...</h1>";

    setTimeout(() => {
      elementForgot.innerHTML = `
      <input type="hidden" id="userHidden" data-user="${username.value}" />
      <div class="form-group">
        <input
          class="input-form-newForgot"
          id="newPassword"
          type="password"
          placeholder="New pasword..."
        />
        <small>Message</small>
      </div>
      <div class="form-group">
        <input
          class="input-form-newForgot"
          id="newPassword2"
          type="password"
          placeholder="Confirm New pasword..."
        />
        <small>Message</small>
      </div>
      <div class="form-group">
        <button type="submit" class="button disabled">
          Change password
        </button>
      </div>`;
    }, 2000);
  } else {
    alert("Username / email tidak ada!");
  }
};

export {
  validationForm,
  formRegister,
  formLogin,
  formNewPassword,
  checkUsersForm,
  usersStorage,
};
