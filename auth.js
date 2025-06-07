// Lấy danh sách user từ localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Lưu danh sách user vào localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Đăng ký user mới
function registerUser(username, password, email) {
  const users = getUsers();
  if (users.find(u => u.username === username)) {
    return { success: false, msg: "Tên đăng nhập đã tồn tại." };
  }
  users.push({ username, password, email }); // ✅ truyền đúng email

  saveUsers(users);
  return { success: true };
}


// Đăng nhập user
function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true };
  }
  return { success: false, msg: "Tên đăng nhập hoặc mật khẩu không đúng." };
}

// Xử lý form đăng ký
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
const email = document.getElementById("email").value.trim(); // 🆕 thêm dòng này
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;
const msgEl = document.getElementById("registerMsg");

    if (password !== confirmPassword) {
      msgEl.textContent = "Mật khẩu không khớp.";
      msgEl.style.color = "red";
      return;
    }
    const res = registerUser(username, password, email); // ✅ thêm email

    if (res.success) {
      msgEl.style.color = "green";
      msgEl.textContent = "Đăng ký thành công! Bạn có thể đăng nhập ngay.";
      registerForm.reset();
    } else {
      msgEl.style.color = "red";
      msgEl.textContent = res.msg;
    }
  });
}

// Xử lý form đăng nhập
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const msgEl = document.getElementById("loginMsg");

    const res = loginUser(username, password);
    if (res.success) {
      msgEl.style.color = "green";
      msgEl.textContent = "Đăng nhập thành công! Đang chuyển trang...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      msgEl.style.color = "red";
      msgEl.textContent = res.msg;
    }
  });
}
// Hiển thị trạng thái người dùng
const userStatusEl = document.getElementById("userStatus");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (userStatusEl) {
  if (currentUser) {
    userStatusEl.innerHTML = `
      👋 Xin chào, <strong>${currentUser.username}</strong> |
      <a href="orders.html">Đơn hàng của tôi</a> |
      <a href="#" id="logoutLink">Đăng xuất</a>
    `;

    // Gắn sự kiện Đăng xuất
    document.getElementById("logoutLink").addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      Swal.fire({
  icon: 'success',
  title: 'Bạn đã đăng xuất!',
  showConfirmButton: false,
  timer: 1200
});

      location.reload(); // hoặc chuyển về login.html
    });
  } else {
    userStatusEl.innerHTML = `
      🔐 <a href="login.html">Đăng nhập</a> |
      <a href="register.html">Đăng ký</a>
    `;
  }
}
// Gửi OTP
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("forgotUsername").value.trim();
    const msgEl = document.getElementById("forgotMsg");
    const users = getUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      msgEl.textContent = "Tên đăng nhập không tồn tại.";
      msgEl.style.color = "red";
      return;
    }

    // Tạo OTP 6 số
    const otp = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("resetOtp", otp);
    localStorage.setItem("resetUser", username);

    const params = {
      to_name: user.username,
      to_email: user.email,
      otp: otp
    };

    emailjs.send("service_m55ohcy", "template_bg0d7rr", params)
      .then(() => {
        msgEl.textContent = "✅ Mã OTP đã được gửi qua email.";
        msgEl.style.color = "green";
        setTimeout(() => window.location.href = "verify.html", 1500);
      })
      .catch(err => {
        msgEl.textContent = "❌ Lỗi khi gửi email.";
        msgEl.style.color = "red";
        console.error(err);
      });
  });
}

// Xác nhận OTP và đặt lại mật khẩu
const verifyForm = document.getElementById("verifyForm");
if (verifyForm) {
  verifyForm.addEventListener("submit", e => {
    e.preventDefault();
    const inputOtp = document.getElementById("otp").value.trim();
    const newPass = document.getElementById("newPassword").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    const msgEl = document.getElementById("verifyMsg");

    const storedOtp = localStorage.getItem("resetOtp");
    const resetUser = localStorage.getItem("resetUser");

    if (inputOtp !== storedOtp) {
      msgEl.textContent = "❌ Mã OTP không đúng.";
      msgEl.style.color = "red";
      return;
    }

    if (newPass !== confirmPass) {
      msgEl.textContent = "❌ Mật khẩu xác nhận không khớp.";
      msgEl.style.color = "red";
      return;
    }

    // Cập nhật mật khẩu
    const users = getUsers();
    const user = users.find(u => u.username === resetUser);
    if (user) {
      user.password = newPass;
      saveUsers(users);
      msgEl.style.color = "green";
      msgEl.textContent = "✅ Cập nhật mật khẩu thành công!";
      localStorage.removeItem("resetOtp");
      localStorage.removeItem("resetUser");
      setTimeout(() => window.location.href = "login.html", 1500);
    }
  });
}

