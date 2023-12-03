


document.addEventListener('DOMContentLoaded', function() {
  var modalButtons = document.querySelectorAll('.btn-modal');
  var modals = document.querySelectorAll('.meu-modal');
  var modalBackground = document.createElement('div');
  modalBackground.classList.add('modal-background');
  document.body.appendChild(modalBackground);

  modalButtons.forEach(function(btn, index) {
    btn.onclick = function() {
      modals[index].style.display = 'block';
      modalBackground.style.display = 'block';
    };
  });

  modalBackground.onclick = function() {
    modals.forEach(function(modal) {
      modal.style.display = 'none';
    });
    this.style.display = 'none';
  };
});




function showToast(msg) {
  var x = document.getElementById("snackbar");
  x.innerHTML = msg + " adcionado ao carrinho. <i class='fas fa-cart-plus'></i>";
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  $(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
  });

  jQuery(document).ready(function ($) {
    var path = window.location.pathname.split("/").pop();
    if (path == "") {
      path = "index.html";
    }
    var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
    target.parent().addClass("active");
  });
});

const next1 = document.getElementById("next1");
const field1 = document.getElementById("field1");
const field2 = document.getElementById("field2");
const prev1 = document.getElementById("previous1");
const next2 = document.getElementById("next2");
const field3 = document.getElementById("field3");
const prev2 = document.getElementById("previous2");
next1.addEventListener("click", function () {
  if (document.querySelectorAll(".cart-row").length <= 0) {
    alert("O seu carrinho esta vázio, Adcione itens.");
  } else {
    let all_items = "";
    const cart_row = document.querySelectorAll(".cart-row");
    for (let i = 0; i < cart_row.length; i++) {
      all_items +=
        cart_row[i].firstElementChild.lastElementChild.firstElementChild
          .textContent +
        "(" +
        cart_row[i].lastElementChild.firstElementChild.value +
        "), ";
    }
    document.getElementById("allitems").value = all_items;
    document.getElementById("totalAmount").value =
      document.getElementById("total_price").textContent;
    let price = document.getElementById("total_price").textContent;
    field1.style.display = "none";
    field2.style.display = "block";
    field3.style.display = "none";
  }
});
prev1.addEventListener("click", function () {
  field1.style.display = "block";
  field2.style.display = "none";
  field3.style.display = "none";
});
next2.addEventListener("click", function () {
  if (
    document.getElementById("at-shop").checked &&
    document.getElementById("date").value == ""
  ) {
    document.getElementById("date").classList.add("is-invalid");
  } else if (
    document.getElementById("at-home").checked &&
    (document.getElementById("date").value == "" ||
      document.getElementById("raddr").value == "")
  ) {
    document.getElementById("raddr").classList.add("is-invalid");
    if (document.getElementById("date").value == "") {
      document.getElementById("date").classList.add("is-invalid");
    }
  } else {
    document.getElementById("date").classList.remove("is-invalid");
    document.getElementById("raddr").classList.remove("is-invalid");
    field1.style.display = "none";
    field2.style.display = "none";
    field3.style.display = "block";
  }
});
prev2.addEventListener("click", function () {
  field1.style.display = "noe";
  field2.style.display = "block";
  field3.style.display = "none";
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("remove-btn");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("addtocart");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}
function plusQuantity(event) {
  let value = parseInt(this.event.target.previousElementSibling.value);
  value++;
  this.event.target.previousElementSibling.value = value;
  updateCartTotal();
}
function minusQuantity(event) {
  let value = parseInt(this.event.target.nextElementSibling.value);
  value--;
  if (value > 0) {
    this.event.target.nextElementSibling.value = value;
    updateCartTotal();
  }
}
function purchaseClicked() {
  alert("Obrigado pela sua compra");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("food-title")[0].innerText;
  var price = shopItem.getElementsByClassName("food-price")[0].innerText;
  var imageSrc = shopItem.querySelectorAll("img")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("esse item já esta no carrinho");
      return;
    }
  }
  showToast(title);
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100px">
          <div class="title-price">
            <span class="cart-item-title">${title}</span>
            <span class="cart-price cart-column">$ ${price}</span>
          </div>
      </div>
      <div class="cart-quantity cart-column">
          <div class='d-flex'><span class='minus' onclick='minusQuantity()'>-</span><input class="cart-quantity-input" type="number" value="1"><span class='plus' onclick='plusQuantity()'>+</span></div>
          <button class="btn remove-btn" type="button">Remover</button>
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("remove-btn")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
  document.getElementById("price").value = total;
  document.getElementById("amnt").textContent = total;
}
document
  .querySelector(".cart-items")
  .addEventListener("DOMNodeInserted", function () {
    console.log("Hello");
  });

let radio = document.getElementById("radio-btn");
radio.onchange = function () {
  if (document.getElementById("at-home").checked) {
    document.getElementById("repair-address").style.display = "block";
  } else {
    document.getElementById("repair-date").style.display = "block";
    document.getElementById("repair-address").style.display = "none";
    document.getElementById("raddr").value = "";
  }
};

function formatarDataHoraBrasil(dataHora) {
  let data = new Date(dataHora);
  if (isNaN(data.getTime())) {
      return 'Data inválida';
  }
  let opcoes = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
  };
  return data.toLocaleDateString('pt-BR', opcoes);
}

function formatarMensagemWhatsApp() {
  let nome = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let telefone = document.getElementById('mobno').value;
  let mensagemCliente = document.getElementById('msg').value;
  let dataHorario = document.getElementById('date').value;
  let dataHorarioFormatada = formatarDataHoraBrasil(dataHorario);
  let endereco = document.getElementById('raddr').value;
  let tipoEntrega = document.getElementById('at-home').checked ? "Entregar" : "Buscar na Loja";

  let message = `Pedido de: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensagemCliente}\nTipo de Entrega: ${tipoEntrega}\n`;

  if (tipoEntrega === "Entregar") {
      message += `Endereço de Entrega: ${endereco}\n`;
  }

  message += `Data e Horário: ${dataHorarioFormatada}\n\nItens do Pedido:\n`;

  let cartRows = document.getElementsByClassName("cart-row");
  for (let row of cartRows) {
      let title = row.getElementsByClassName("cart-item-title")[0].innerText;
      let quantity = row.getElementsByClassName("cart-quantity-input")[0].value;
      message += `${title} - Quantidade: ${quantity}\n`;
  }

  let total = document.getElementById("totalAmount").value;
  message += `\nTotal: $${total}`;

  return message;
}


document.getElementById("finalizar-compra").addEventListener("click", function(event) {
  event.preventDefault();
  let mensagem = formatarMensagemWhatsApp();
  let whatsappUrl = `https://wa.me/5511982864581?text=${encodeURIComponent(mensagem)}`;
  window.open(whatsappUrl, '_blank');
});
