
let state = {
  storeItems: [
    {id: 1, 
      name: "beetroot", 
      price: 0.35,
      inCart: 1,
      itemStock: 20,},
    {id: 2, 
      name: "carrot", 
      price: 0.25,
      inCart: 0,
      itemStock: 20},
    {id: 3, 
      name: "apple", 
      price: 0.45,
      inCart: 0,
      itemStock: 20},
    {id: 4, 
      name: "apricot", 
      price: 0.55,
      inCart: 0,
      itemStock: 20},
    {id: 5, 
      name: "avocado", 
      price: 0.65,
      inCart: 2,
      itemStock: 20},
    {id: 6, 
      name: "bananas", 
      price: 0.75,
      inCart: 1,
      itemStock: 20},
    {id: 7, 
      name: "bell-pepper", 
      price: 0.40,
      inCart: 10,
      itemStock: 20},
    {id: 8, 
      name: "berry", 
      price: 0.50,
      inCart: 3,
      itemStock: 20},
    {id: 9, 
      name: "blueberry", 
      price: 0.60,
      inCart: 0,
      itemStock: 20},
    {id: 10, 
      name: "eggplant", 
      price: 0.58,
      inCart: 2,
      itemStock: 20}
  ]
}

function totalPrice() {
  let total = 0

  state.storeItems.forEach(item => {
    total += item.price * item.inCart
  })

  return total
}

function getImagePath(item) {
  let id = String(item.id).padStart(3, "0")
  return `assets/${id}-${item.name}.svg`
}

function getCartItem() {
 return state.storeItems.filter(item => item.inCart > 0)
}

function increaseQuantity(item){
 if (item.itemStock === 0) return
 item.inCart++
 item.itemStock--
}

function decreaseQuantity(item){
  if (item.inCart === 0) return
  item.inCart--
  item.itemStock++
}

function renderStoreItems() {
  let storeUlEl = document.querySelector(".store--item-list")
  storeUlEl.textContent = ""

  for (let item of state.storeItems) {
  
  let iconLi = document.createElement("li")

  let iconDiv = document.createElement("div")
  iconDiv.className = "store--item-icon"

  let iconImg = document.createElement("img")
  iconImg.src = getImagePath(item)

  let iconBtn = document.createElement("button")
  iconBtn.textContent = `Add to cart (${item.itemStock})`
  iconBtn.addEventListener("click", function() {
    increaseQuantity(item)
    render()
  })
  
  iconDiv.append(iconImg)
  iconLi.append(iconDiv, iconBtn)

  storeUlEl.append(iconLi)
}
}

function renderCartItems() {
  let cartUl = document.querySelector(".cart--item-list")
  cartUl.textContent = ""

  for (let item of getCartItem()) {
  let cartli = document.createElement("li")

  let cartImg = document.createElement("img")
  cartImg.className = "cart--item-icon"
  cartImg.src = getImagePath(item)
  cartImg.alt = item.name

  let cartP = document.createElement("p")
  cartP.textContent = item.name

  let cartRemoveBtn = document.createElement("button")
  cartRemoveBtn.className = "quantity-btn remove-btn center"
  cartRemoveBtn.textContent = "-"
  cartRemoveBtn.addEventListener("click", function() {
    decreaseQuantity(item)
    render()
  })

  let cartSpan = document.createElement("span")
  cartSpan.className = "quantity-text center"
  cartSpan.textContent = item.inCart

  let cartAddBtn = document.createElement("button")
  cartAddBtn.className = "quantity-btn add-btn center"
  cartAddBtn.textContent = "+"
  cartAddBtn.addEventListener("click", function() {
    increaseQuantity(item)
    render()
  })

 cartli.append(cartImg, cartP, cartRemoveBtn, cartSpan, cartAddBtn)

  cartUl.append(cartli)}
}

function renderTotal() {
  let total = document.querySelector(".total-number")
  total.textContent = ""
  total.textContent = totalPrice().toFixed(2)+"$"
}

function render() {
  renderStoreItems()
  renderCartItems()
  renderTotal()
}

render()
