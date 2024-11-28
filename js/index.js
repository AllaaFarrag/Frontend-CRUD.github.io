var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var row = document.getElementById("row");
var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");

var currentIndex = 0;
var productList = [];

if(localStorage.getItem("productContainer") !== null){
  
  productList = JSON.parse( localStorage.getItem("productContainer") )
  searchData();

}


function addProduct() {

  if(validateInput()  && validatePrice() && validateCategory() && validateDescription()){

  var product = {
    name: productName.value,
    price: productPrice.value,
    cat: productCategory.value,
    description: productDescription.value,
    image: productImage.files[0].name,
  };

  productList.push(product);
  localStorage.setItem("productContainer",JSON.stringify(productList))
  searchData(productList); 
  // console.log(productList);
  // clearproduct();
}
} 

// function displayProduct() {
//   // console.log(plist);
//   var cartoona = "";
//   for (var i = 0; i < productList.length; i++) {
//     cartoona += `
//           <div class="col-md-3">
//               <div class="card">
//                 <img class="card-img-top" src="images/${productList[i].image}" alt="${
//                   productList[i].name
//     }" />
//                 <div class="card-body">
//                   <span class="bg-primary rounded-circle">${i + 1}</span>
//                   <h3 class="card-title">Product Name: ${productList[i].name}</h3>
//                   <p class="card-text">Product Price: ${productList[i].price}</p>
//                   <p class="card-text">Product Category: ${productList[i].cat}</p>
//                   <p class="card-text">Product Description: ${productList[i].description}</p>
//                 </div>
//                 <div class="card-footer text-center">
//                   <button class="btn btn-outline-warning btn-sm">Update</button>
//                   <button onclick="deleteproduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
//                 </div>
//               </div>
//           </div>`;
//   }

//   row.innerHTML = cartoona;

// }

function clearproduct() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  productImage.value = null;

  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}

function deleteproduct(index) {
  productList.splice(index, 1);
  // console.log(productList);
  localStorage.setItem("productContainer",JSON.stringify(productList))

  searchData(productList);
}

function searchData(){
  var term =searchInput.value;
  

  var cartoona = "";
  for (var i = 0; i < productList.length; i++) {

    if(productList[i].name.toLowerCase().includes(term.toLowerCase())){

      cartoona += `
            <div class="col-md-3">
                <div class="card">
                  <img class="card-img-top" src="images/${productList[i].image}" alt="${
                    productList[i].name
      }" />
                  <div class="card-body">
                    <span class="bg-primary rounded-circle">${i + 1}</span>
                    <h3 class="card-title">Product Name: ${productList[i].name}</h3>
                    <p class="card-text">Product Price: ${productList[i].price}</p>
                    <p class="card-text">Product Category: ${productList[i].cat}</p>
                    <p class="card-text">Product Description: ${productList[i].description}</p>
                  </div>
                  <div class="card-footer text-center">
                    <button onclick="SetUpdatedData(${i})" class="btn btn-outline-warning btn-sm">Update</button>
                    <button onclick="deleteproduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
                  </div>
                </div>
            </div>`;

    }
  }

  row.innerHTML = cartoona;
}

function SetUpdatedData(index){
  // console.log(productList[index]);

currentIndex = index;

  productName.value = productList[index].name
  productCategory.value = productList[index].cat
  productDescription.value = productList[index].description
  productPrice.value = productList[index].price

  btnAdd.classList.add("d-none")
  btnUpdate.classList.remove("d-none")
}


function updateProduct(){
  if(validateInput()  && validatePrice()){
  var product = {
    name: productName.value,
    price: productPrice.value,
    cat: productCategory.value,
    description: productDescription.value,
    image: productImage.files[0].name,
  };

  productList.splice(currentIndex,1,product);
  localStorage.setItem("productContainer",JSON.stringify(productList))
  searchData(productList); 
}
}

function validateInput(){
  var regix = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/
  var text = productName.value;

  var msgName = document.getElementById("msgName");

  if(regix.test(text)){
    // console.log("match");
    productName.classList.remove("is-invalid")
    productName.classList.add("is-valid")
    msgName.classList.add("d-none")

    return true
  }
  else{
    // console.log("noMatch");
    productName.classList.add("is-invalid")
    productName.classList.remove("is-valid")

    msgName.classList.remove("d-none")

    return false
  }
}

function validatePrice(){
  var regix = /^\d+(\.\d{1,2})?$/
  var text = productPrice.value;

  var msgPrice = document.getElementById("msgPrice");

  if(regix.test(text)){
    // console.log("match");
    productPrice.classList.remove("is-invalid")
    productPrice.classList.add("is-valid")
    msgPrice.classList.add("d-none")

    return true
  }
  else{
    // console.log("noMatch");
    productPrice.classList.add("is-invalid")
    productPrice.classList.remove("is-valid")

    msgPrice.classList.remove("d-none")

    return false
  }
}


function validateCategory(){
  var regix = /^(tv|mobile|screens|electronic)$/i
  var text = productCategory.value;

  var msgCategory = document.getElementById("msgCategory");

  if(regix.test(text)){
    // console.log("match");
    productCategory.classList.remove("is-invalid")
    productCategory.classList.add("is-valid")
    msgCategory.classList.add("d-none")

    return true
  }
  else{
    // console.log("noMatch");
    productCategory.classList.add("is-invalid")
    productCategory.classList.remove("is-valid")

    msgCategory.classList.remove("d-none")

    return false
  }
}


function validateDescription(){
  var regix = /^.{3,}$/m
  var text = productDescription.value;

  var msgDescription = document.getElementById("msgDescription");

  if(regix.test(text)){
    // console.log("match");
    productDescription.classList.remove("is-invalid")
    productDescription.classList.add("is-valid")
    msgDescription.classList.add("d-none")

    return true
  }
  else{
    // console.log("noMatch");
    productDescription.classList.add("is-invalid")
    productDescription.classList.remove("is-valid")

    msgDescription.classList.remove("d-none")

    return false
  }
}

function validateImage(){
  var regix = /^.{1,}\.(jpg|png|avif|jpeg|svg)$/
  var text = productImage.value;

  var msgImage = document.getElementById("msgImage");

  if(regix.test(text)){
    // console.log("match");
    productImage.classList.remove("is-invalid")
    productImage.classList.add("is-valid")
    msgImage.classList.add("d-none")

    return true
  }
  else{
    // console.log("noMatch");
    productImage.classList.add("is-invalid")
    productImage.classList.remove("is-valid")

    msgImage.classList.remove("d-none")

    return false
  }
}
