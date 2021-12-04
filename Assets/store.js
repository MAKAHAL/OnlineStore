//Makah Abutahoun-->


if( document.readyState== 'loading'){ // first thing we need to check if the page is loading
    document.addEventListener('DOMContentLoaded', ready)
    }
    else {
       ready()
    }
    function ready(){  // we added the function ready so even if the page is not working our buttons will still work
    var RemoveCartItemButtons = document.getElementsByClassName('btn-danger')
    for( var i=0; i<RemoveCartItemButtons.length; i++){
    var button = RemoveCartItemButtons [i]
    button.addEventListener ('click', removeCartItem)
    } // what this means it tells you when you click on something it will do it
    
    var quatityInputs= document.getElementsByClassName('cart-quantity-input')
    for( var i=0; i<quatityInputs.length; i++){
    var input =  quatityInputs[i]
    input.addEventListener('change', quantityChanged)
    }
    // adding add to cart buttuon//
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
       var button = addToCartButtons[i]
       button.addEventListener('click', addToCartClicked)
    }
    
    //purchase button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    }
    function purchaseClicked(){
       alert('Thank you for your purchase!! ')
       var cartItems = document.getElementsByClassName('cart-items')[0]
       while(
           cartItems.hasChildNodes()){
               cartItems.removeChild(cartItems.firstChild)
           }
    UpdateCartTotal()
    }
    
    function removeCartItem(event){
       var buttonclicked = event.target
       buttonclicked.parentElement.parentElement.remove()
       UpdateCartTotal()
    }
    function quantityChanged(event){
       var input = event.target
       if( isNaN(input.value) || input.value<= 0 ){ // means they're not allow to enter something under 0 as a quantity // isNaN is not a number? for example if the customer doesn't input anything
    input.value=1
       }
       UpdateCartTotal()
    }
    
    
    function addToCartClicked(event){
    
       var button = event.target
       var shopItem = button.parentElement.parentElement
       var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
       console.log(title , price, imageSrc)
    addItemToCart(title , price, imageSrc)
    UpdateCartTotal()
    
    }
    function addItemToCart(title , price, imageSrc){
       var CartRow = document.createElement('div')
       CartRow.classList.add('cart-row')
       var cartItems = document.getElementsByClassName('cart-items')[0]
       var cartItemNames= cartItems.getElementsByClassName('cart-item-title')
       for ( var i =0; i < cartItemNames.length; i++){
    if ( cartItemNames[i].innerText == title) {
       alert ('This item has already been added')
       return
    }
       }
    
       var CartRowContents= `
       <div class="cart-item cart-column">
                   <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                   <span class="cart-item-title"> ${title} </span>
               </div>
               <span class="cart-price cart-column"> ${price}</span>
               <div class="cart-quantity cart-column">
                   <input class="cart-quantity-input" type="number" value="1">
                   <button class="btn btn-danger" type="button">REMOVE</button>
               </div>`
               CartRow.innerHTML = CartRowContents
       cartItems.append(CartRow)
       CartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
       CartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }
    
    function UpdateCartTotal(){ // our actual shopping cart
    var cartItemContainer= document.getElementsByClassName('cart-items')[0]
    var CartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for( var i=0; i<CartRows.length; i++){
    var CartRow = CartRows[i] // to show us to price and quantity
    var priceElement = CartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = CartRow.getElementsByClassName('cart-quantity-input')[0]
    var price =  parseFloat(    priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity) // display the price
    }
    total = Math.round(total * 100 ) / 100 // math. round bascially rounds our number to 2 decimal number not more
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total // adding $ infront of the price
    

}