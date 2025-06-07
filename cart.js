// Danh sách sản phẩm
const products = [
  { id: 1, name: "Nước hoa nữ Daisy", brand: "Marc Jacobs", price: 1200000, category: "nu", image: "images/daisy.jpg" },
  { id: 2, name: "Nước hoa nam Bleu de Chanel", brand: "Chanel", price: 2000000, category: "nam", image: "images/chanel.jpg" },
  { id: 3, name: "Nước hoa nữ Flowerbomb", brand: "Marc Jacobs", price: 1500000, category: "nu", image: "images/flowebom.jpg" },
  { id: 4, name: "Nước hoa nam Aventus", brand: "Dior", price: 2500000, category: "nam", image: "images/aventust.jpg" },
  { id: 5, name: "Body Mist Victoria's Secret", brand: "Versace", price: 390000, category: "bodymist", image: "images/victory.jpg" },
  { id: 6, name: "Nước hoa unisex Baccarat Rouge", brand: "MFK", price: 4200000, category: "unisex", image: "images/bac.jpg" },
  { id: 7, name: "Set nước hoa mini Dior 5 món", brand: "Dior", price: 950000, category: "combo", image: "images/minidior.jpg" },
  { id: 8, name: "Nước hoa nữ Good Girl", brand: "Versace", price: 1890000, category: "nu", image: "images/girl.jpg" },
  { id: 9, name: "Nước hoa nam Dior Sauvage", brand: "Dior", price: 2400000, category: "nam", image: "images/sauvage.jpg" },
  { id: 10, name: "Nước hoa unisex Maison Kurkdjian", brand: "MFK", price: 3750000, category: "unisex", image: "images/mfk.jpg" },
  {
  id: 11,
  name: "Nước hoa nữ J'adore",
  brand: "Dior",
  price: 2100000,
  category: "nu",
  image: "images/jadore.jpg"
},
{
  id: 12,
  name: "Nước hoa nam Acqua di Gio",
  brand: "Armani",
  price: 2300000,
  category: "nam",
  image: "images/acquadigio.jpg"
},
{
  id: 13,
  name: "Nước hoa nữ La Vie Est Belle",
  brand: "Lancôme",
  price: 1900000,
  category: "nu",
  image: "images/lavieestbelle.jpg"
},
{
  id: 14,
  name: "Nước hoa nam Terre d’Hermès",
  brand: "Hermès",
  price: 2400000,
  category: "nam",
  image: "images/hermes.jpg"
},
{
  id: 15,
  name: "Nước hoa unisex CK One",
  brand: "Calvin Klein",
  price: 1250000,
  category: "unisex",
  image: "images/ckone.jpg"
},
{
  id: 16,
  name: "Set nước hoa mini nữ Miss Dior",
  brand: "Dior",
  price: 980000,
  category: "combo",
  image: "images/missdiorset.jpg"
},
{
  id: 17,
  name: "Body Mist Bath & Body Works Rose",
  brand: "BBW",
  price: 350000,
  category: "bodymist",
  image: "images/bbwrose.jpg"
},
{
  id: 18,
  name: "Nước hoa nữ Si Passione",
  brand: "Armani",
  price: 2000000,
  category: "nu",
  image: "images/sipassione.jpg"
},
{
  id: 19,
  name: "Nước hoa nam L'Homme",
  brand: "YSL",
  price: 2200000,
  category: "nam",
  image: "images/yslhomme.jpg"
},
{
  id: 20,
  name: "Nước hoa unisex Le Labo Santal 33",
  brand: "Le Labo",
  price: 3900000,
  category: "unisex",
  image: "images/santal33.jpg"
},
{
  id: 21,
  name: "Nước hoa nữ Daisy Love",
  brand: "Marc Jacobs",
  price: 1450000,
  category: "nu",
  image: "images/daisylove.jpg"
},
{
  id: 22,
  name: "Nước hoa nam Boss Bottled",
  brand: "Hugo Boss",
  price: 1850000,
  category: "nam",
  image: "images/bossbottled.jpg"
},
{
  id: 23,
  name: "Nước hoa nữ My Way",
  brand: "Armani",
  price: 2100000,
  category: "nu",
  image: "images/myway.jpg"
},
{
  id: 24,
  name: "Nước hoa unisex Maison Louis Marie",
  brand: "MLM",
  price: 2700000,
  category: "unisex",
  image: "images/mlm.jpg"
},
{
  id: 25,
  name: "Set quà nước hoa Chanel 3 món",
  brand: "Chanel",
  price: 1200000,
  category: "combo",
  image: "images/chanelset.jpg"
},
{
  id: 26,
  name: "Body Mist Victoria's Secret Love Spell",
  brand: "VS",
  price: 400000,
  category: "bodymist",
  image: "images/lovespell.jpg"
},
{
  id: 27,
  name: "Nước hoa nữ Mon Guerlain",
  brand: "Guerlain",
  price: 1950000,
  category: "nu",
  image: "images/mon.jpg"
},
{
  id: 28,
  name: "Nước hoa nam Bleu Noir",
  brand: "Narciso Rodriguez",
  price: 2100000,
  category: "nam",
  image: "images/bleunoir.jpg"
},
{
  id: 29,
  name: "Nước hoa unisex Tom Ford Oud Wood",
  brand: "Tom Ford",
  price: 4300000,
  category: "unisex",
  image: "images/oudwood.jpg"
},
{
  id: 30,
  name: "Nước hoa nữ Gucci Bloom",
  brand: "Gucci",
  price: 1890000,
  category: "nu",
  image: "images/guccibloom.jpg"
}

];

// Lấy giỏ hàng người dùng
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const cartKey = currentUser ? `cart_${currentUser.username}` : "cart_guest";
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

function renderCartDetails() {
  const container = document.getElementById("cartDetails");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Giỏ hàng trống.</p>";
    return;
  }

  let html = `<table>
    <tr><th>Tên</th><th>Số lượng</th><th>Giá</th><th></th></tr>`;
  let total = 0;

  cart.forEach((item, index) => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      html += `
        <tr>
          <td>${product.name}</td>
          <td>${item.quantity}</td>
          <td>${itemTotal.toLocaleString()}₫</td>
          <td><button onclick="removeItem(${index})">❌</button></td>
        </tr>
      `;
    }
  });

  html += `<tr><td colspan="2"><strong>Tổng:</strong></td><td colspan="2"><strong>${total.toLocaleString()}₫</strong></td></tr>`;
  html += "</table>";
  container.innerHTML = html;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCartDetails();
}

// Xác nhận đặt hàng
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Giỏ hàng trống!',
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }

    if (!currentUser || !currentUser.email) {
      Swal.fire({
        icon: 'error',
        title: 'Bạn cần đăng nhập và có email để đặt hàng.',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const productsInCart = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return {
        name: product.name,
        quantity: item.quantity,
        price: product.price
      };
    });

    const order = {
      username: currentUser.username,
      date: new Date().toLocaleString(),
      items: productsInCart,
      status: "🔄 Đang xử lý"
    };

    const orderDetails = productsInCart.map(item =>
      `${item.name} × ${item.quantity} - ${item.price.toLocaleString()}₫`
    ).join('\n');

    const totalAmount = productsInCart.reduce(
      (sum, item) => sum + item.quantity * item.price, 0
    );

    const emailParams = {
      to_name: currentUser.username,
      to_email: currentUser.email,
      order_list: orderDetails,
      total_price: totalAmount.toLocaleString() + "₫",
      order_date: order.date
    };

    emailjs.send("service_m55ohcy", "template_72r6k2e", emailParams)
      .then(() => {
        console.log("✅ Email gửi thành công");
      })
      .catch(error => {
        console.error("❌ Lỗi gửi email:", error);
      });

    // Lưu đơn hàng
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(order)); // ⬅️ Dùng để in hóa đơn

    // Xoá giỏ
    localStorage.removeItem(cartKey);
    cart = [];
    renderCartDetails();

    // Hiển thị thông báo và chuyển sang trang in hóa đơn
    Swal.fire({
      icon: 'success',
      title: 'Đặt hàng thành công!',
      text: 'Đang chuyển sang in hóa đơn...',
      timer: 1800,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "invoice.html";
    });
  });
}

renderCartDetails();
