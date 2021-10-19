//.......................Fetch And Make posts..............................

var productList; //the result of first Fetch includes All Data
const ApIstring = "https://fakestoreapi.com/products";
var totalPaying = 0;
var SingleProductPrice = 0;
let totalCustomerPaying = 0;
var productBox = document.querySelectorAll(".product-block");
const bagItems = document.getElementById("bag-Items");
const ShoppingBagBtn = document.querySelector(".btn-bag");
var productBoxBlock = document.querySelectorAll(".product-box");
const shoppingProductList = [];
function FetchData() {
fetch(ApIstring)
    .then((response) => response.json())
    .then((result) => {
        productLis = result;
        const menList = productLis.filter(current => current.category == "men's clothing");
        const femaleList = productLis.filter(current => current.category == "women's clothing");
        const jewelryList = productLis.filter(current => current.category == "jewelery");
        const electronicList = productLis.filter(current => current.category == "electronics");
        menList.forEach(currentItem => {
            AddProduct(currentItem, "men-block")
        })
        femaleList.forEach(currentItem => {
            AddProduct(currentItem, "female-block")
        })

        jewelryList.forEach(currentItem => {
            AddProduct(currentItem, "jewelery-block")
        })

        electronicList.forEach(currentItem => {
            AddProduct(currentItem, "electronics-block")
        })
        const searchBtn = document.querySelector(".search-btn");
        searchBtn.addEventListener("click", () => {
            const searchInputString = document.querySelector(".search-input");
            SearchManengmnet(searchInputString, result);
        })
        const searchInputString = document.querySelector(".search-input");
        searchInputString.addEventListener("input", () => {
            if (searchInputString.value!=="") {
                SearchManengmnet(searchInputString, result);
            }

           

        })
        searchInputString.addEventListener("blur", () => {
            const SearchdataList = document.getElementById("Search-Items");
            SearchdataList.innerHTML = "";

        })


    });
}
FetchData();

//.......................Fetch And Make posts..............................

function AddProduct(item, htmlblock) {
    const productTitle = item.title;
    const productImgAdd = item.image;
    const productPrice = item.price;
    const productId = item.id;
    const menBlock = document.querySelector(`.${htmlblock}`);
    const productBlockBox = document.createElement("div");
    const productImageTag = document.createElement("img");
    productImageTag.setAttribute("src", productImgAdd);
    const productTitleTag = document.createElement("p");
    productTitleTag.innerHTML = productTitle;
    productTitleTag.classList.add("title");
    const productPriceTag = document.createElement("p");
    productPriceTag.innerHTML = productPrice;
    productPriceTag.classList.add("price");
    productBlockBox.appendChild(productImageTag);
    productBlockBox.appendChild(productTitleTag);
    productBlockBox.appendChild(productPriceTag);
    productBlockBox.classList.add("product-block-box");
    const orderboxtag = document.createElement("div")
    orderboxtag.classList.add("orderBox");
    const infoTag = document.createElement("p");
    infoTag.className = "fas fa-info";
    infoTag.setAttribute("data-toggle", "modal");
    infoTag.setAttribute("data-target", "#infomodal")
    const heartTag = document.createElement("p");
    heartTag.className = "far fa-heart";
    const shoppingBagTag = document.createElement("p");
    shoppingBagTag.className = "fas fa-shopping-cart";
    orderboxtag.appendChild(infoTag);
    orderboxtag.appendChild(shoppingBagTag);
    orderboxtag.appendChild(heartTag);
    productBlockBox.append(orderboxtag);
    menBlock.appendChild(productBlockBox);
    infoTag.addEventListener("click", () => {
        AddInfoModal(item, infoTag)

    })

    shoppingBagTag.onclick = () => {
        ShoppingProductListMAker(item, productId, shoppingProductList)
    }


}


//.......................Searching Manengment..............................
function SearchManengmnet(searchInputString, productList) {
    
    const SearchResultProductList = productList.filter(currentProduct => (currentProduct.title.toLowerCase().includes(searchInputString.value.toLowerCase().trim())) || (currentProduct.category.toLowerCase().includes(searchInputString.value.toLowerCase().trim())));
    if ((!(SearchResultProductList.length === 0)) && (searchInputString.value !== "")) {
        productBox.forEach(currentItem => {
            currentItem.innerHTML = " ";
            const titrTag = document.querySelectorAll(".titr");
            const lineTag = document.querySelectorAll(".line");
            lineTag.forEach(currentItem => {
                currentItem.style.display = "none";
            })

            titrTag.forEach(currentItem => {
                currentItem.innerHTML = " ";
            })
            document.querySelector(".men-titr").innerHTML = "Searched Products"

        })
        SearchResultProductList.forEach(CurrentItem => {
            const SearchdataList = document.getElementById("Search-Items");
            productBox.innerHTML = " ";
            AddProduct(CurrentItem, "men-block");
            const SearchdataListItem = document.createElement("option");
            SearchdataListItem.setAttribute("value", CurrentItem.title);
            SearchdataList.appendChild(SearchdataListItem);
        });

    }

  
}
//.......................Add Information Modal..............................
function AddInfoModal(item, tag) {
    const productId = item.id;
    const modaltitle = document.querySelector(".modal-title");
    const modalimage = document.querySelector(".modal-image");
    const modalprice = document.querySelector(".modal-price");
    modalprice.innerHTML = `Price:<strong class="total-price">  ${item.price} $</strong>`;
    modaltitle.innerHTML = item.title;
    modalimage.setAttribute("src", item.image);
    const btnAddToShoppingBag = document.querySelector(".btn-addToShoppingBag");
    btnAddToShoppingBag.onclick = () => {
        ShoppingProductListMAker(item, productId, shoppingProductList);
    }

}



//.......................shopping Manengment..............................
function ShopingBagManengment(shoppingProductList) {
    const bagRecords = document.querySelector(".bag-records");
    bagRecords.innerHTML = "";
    totalPaying = 0;
    shoppingProductList.forEach(currentItem => {
        const bagTableRow = document.createElement("tr");
        bagTableRow.setAttribute("data-id", currentItem.id)
        const tableTitleCol = document.createElement("td");
        tableTitleCol.innerHTML = currentItem.title;
        const tableImageCol = document.createElement("td");
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", currentItem.image);
        imageElement.className = "shoppingBagImage";
        tableImageCol.appendChild(imageElement);
        bagTableRow.appendChild(tableImageCol);
        bagTableRow.appendChild(tableTitleCol);
        bagRecords.appendChild(bagTableRow);


    })



    //.......................Show Shopping Bag..............................
}
ShoppingBagBtn.onclick = () => {
        ShopingBagManengment(shoppingProductList);
    }
    //.......................TotalPaying Calculate..............................
function ShoppingProductListPayingCalculate(currentItemQuantity, quantityChangedProductPrice) {
    const totalProductPrice = currentItemQuantity * quantityChangedProductPrice;
    totalPaying += totalProductPrice;
    return totalPaying.toFixed(2);


}
//----------------------------------ShoppingProductListMAker-----------------------------
function ShoppingProductListMAker(item, productId, shoppingProductList) {
    let shopppingProductListIdArray = shoppingProductList.map(product => product.id);
    const isExist = shopppingProductListIdArray.some(item => item == productId);
    if (!isExist) {

        shoppingProductList.push(item);
        bagItems.innerHTML = shoppingProductList.length;
    }

}