const api = `https://fakestoreapi.com/products`;
const bagItems = document.getElementById("bag-Items");
const ShoppingBagBtn = document.querySelector(".btn-bag");
var productBox = document.querySelectorAll(".product-box");
const menBlock = document.querySelector(".product-box");
let AllProductList = "";
const shoppingProductList = [];

function FetchData() {
    fetch(api).then(res => res.json()).then(data => {

        let MenProductList = data.filter(currentproduct => currentproduct.category === "men's clothing");
        sliderMaker(MenProductList);
        MenProductList.forEach(currentItem => {
            AddProduct(currentItem);
        })

        const searchInputString = document.querySelector(".search-input");
        searchInputString.addEventListener("input", () => {

            SearchManengmnet(searchInputString, MenProductList);

        })

    });
}
FetchData();



//.......................Fetch And Make posts..............................

function AddProduct(productitem) {
    console.log(productitem);
   const productId=productitem.id;
    const productBlockBox = document.createElement("div");
    const productImageTag = document.createElement("img");
    productImageTag.setAttribute("src", productitem.image);
    const productTitleTag = document.createElement("p");
    productTitleTag.innerHTML = productitem.title;
    productTitleTag.classList.add("title");
    const productPriceTag = document.createElement("p");
    productPriceTag.innerHTML = productitem.price;
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
        AddInfoModal(productitem, infoTag)

    })

    shoppingBagTag.onclick = () => {

        ShoppingProductListMAker(productitem, productId, shoppingProductList) 
      
    }


}


//.......................Add Information Modal..............................
function AddInfoModal(item, tag) {
    const modaltitle = document.querySelector(".modal-title");
    const modalimage = document.querySelector(".modal-image");
    const modalprice = document.querySelector(".modal-price");
    const productId = item.id;
    modalprice.innerHTML = `Price:<strong class="total-price">  ${item.price} $</strong>`;
    modaltitle.innerHTML = item.title;

    modalimage.setAttribute("src", item.image);
    const btnAddToShoppingBag = document.querySelector(".btn-addToShoppingBag");
    btnAddToShoppingBag.onclick = () => {

        ShoppingProductListMAker(item, productId, shoppingProductList) 


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





//.......................Searching Manengment..............................
function SearchManengmnet(searchInputString, menproductlist) {
    if (searchInputString.value==="") {
        menBlock.innerHTML="";
        menproductlist.forEach(currentItem => {
            AddProduct (currentItem);
        })
        
       
    }
    const SearchResultProductList = menproductlist.filter(currentProduct => (currentProduct.title.toLowerCase().includes(searchInputString.value.toLowerCase().trim())) || (currentProduct.category.toLowerCase().includes(searchInputString.value.toLowerCase().trim())));
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

//----------------------------------ShoppingProductListMAker-----------------------------
function ShoppingProductListMAker(item, productId, shoppingProductList) {
    let shopppingProductListIdArray = shoppingProductList.map(product => product.id);
    const isExist = shopppingProductListIdArray.some(item => item == productId);
    if (!isExist) {

        shoppingProductList.push(item);
        bagItems.innerHTML = shoppingProductList.length;
    }

}


//---------------------------------price elider maker-----------------------------------
function sliderMaker(menproductlist) {
    const pricesArray = menproductlist.map(item => item.price);
    const maxPrice = Math.max(...pricesArray);
    const minPrice = Math.min(...pricesArray);
    console.log(maxPrice);

    $(function() {
        const markermin = document.querySelector(".marker-0");
        const markermax = document.querySelector(".marker-100");
        markermin.innerHTML = minPrice;
        markermax.innerHTML = maxPrice;

        // Initiate Slider
        $('#slider-range').slider({
            range: true,
            min: minPrice,
            max:maxPrice+5,
            step: 5,
            values: [minPrice, 100000]
        });


        // Move the range wrapper into the generated divs
        $('.ui-slider-range').append($('.range-wrapper'));

        // Apply initial values to the range container
        $('.range').html('<span class="range-value"><sup>$</sup>' + $('#slider-range').slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value"><sup>$</sup>' + $("#slider-range").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');

        // Show the gears on press of the handles
        $('.ui-slider-handle, .ui-slider-range').on('mousedown', function() {
            $('.gear-large').addClass('active');
        });

        // Hide the gears when the mouse is released
        // Done on document just incase the user hovers off of the handle
        $(document).on('mouseup', function() {
            if ($('.gear-large').hasClass('active')) {
                $('.gear-large').removeClass('active');
            }
        });

        // Rotate the gears
        var gearOneAngle = 0,
            gearTwoAngle = 0,
            rangeWidth = $('.ui-slider-range').css('width');

        $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
        $('.gear-two').css('transform', 'rotate(' + gearTwoAngle + 'deg)');

        $('#slider-range').slider({
            
            slide: function(event, ui) {

                // Update the range container values upon sliding

                $('.range').html('<span class="range-value"><sup>$</sup>' + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value"><sup>$</sup>' + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');
               const minRange= ui.values[0];
               const maxRange=ui.values[1];
               FilterByPrice(minRange,maxRange,menproductlist) 
             
                // Get old value
                var previousVal = parseInt($(this).data('value'));
               
               
                // Save new value
                $(this).data({
                    'value': parseInt(ui.value)
                    
                });
               

                // Figure out which handle is being used
                if (ui.values[0] == ui.value) {

                    // Left handle
                    if (previousVal > parseInt(ui.value)) {
                        // value decreased
                        gearOneAngle -= 7;
                        $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
                    } else {
                        // value increased
                        gearOneAngle += 7;
                        $('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
                    }

                } else {

                    // Right handle
                    if (previousVal > parseInt(ui.value)) {
                        // value decreased
                        gearOneAngle -= 7;
                        $('.gear-two').css('transform', 'rotate(' + gearOneAngle + 'deg)');
                    } else {
                        // value increased
                        gearOneAngle += 7;
                        $('.gear-two').css('transform', 'rotate(' + gearOneAngle + 'deg)');
                    }

                }

                if (ui.values[1] === 110000) {
                    if (!$('.range-alert').hasClass('active')) {
                        $('.range-alert').addClass('active');
                    }
                } else {
                    if ($('.range-alert').hasClass('active')) {
                        $('.range-alert').removeClass('active');
                    }
                }
            }
        });

        // Prevent the range container from moving the slider
        $('.range, .range-alert').on('mousedown', function(event) {
            event.stopPropagation();
        });

    });
}
//---------------------------------------------
function FilterByPrice(minprice,maxprice,menproductlist) {
      const filterList= menproductlist.filter(product=>product.price>=minprice && product.price<=maxprice);
      console.log(filterList);
      menBlock.innerHTML="";
      filterList.forEach(currentItem => {

          AddProduct(currentItem);
          
      })
      
}