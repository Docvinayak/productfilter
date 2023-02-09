const productList = document.querySelector('.product-list');
const filterRatingInput = document.querySelector('#filter-rating');
const filterCategoryInput = document.querySelector('#filter-category');
const filterButton = document.querySelector('#filter-button');
const searchTitleInput = document.querySelector('#search-title');
const searchButton = document.querySelector('#search-button');
const filterCategorySelect = document.getElementById('filter-category');
const ratingFilter = document.querySelector('#filter-rating');
const sortfilter= document.querySelector('#sort');
const products= fetchProducts()
const category =[]

async function fetchProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  renderProducts(products);

  
    ratingFilter.addEventListener('change', function() {
        filteredProducts = products.filter(product => {
          return (this.value === '' || product.rating.rate >= parseInt(this.value)) && (filterCategoryInput.value === '' || product.category === filterCategoryInput.value) && (searchTitleInput.value === '' || product.title.toLowerCase().includes(searchTitleInput.value.toLowerCase())) ;
        });
        renderProducts(filteredProducts);
    });

    filterCategorySelect.addEventListener('change', function() {
        filteredProducts = products.filter(product => {
          return (this.value === '' || product.category === this.value) && (filterRatingInput.value === '' || product.rating.rate >= parseInt(filterRatingInput.value)) && (searchTitleInput.value === '' || product.title.toLowerCase().includes(searchTitleInput.value.toLowerCase()));
        });
        renderProducts(filteredProducts);
    });

    searchButton.addEventListener('click', function() {
        console.log(searchTitleInput.value)
        filteredProducts = products.filter(product => {
          return (searchTitleInput.value === '' || product.title.toLowerCase().includes(searchTitleInput.value.toLowerCase())) && (filterRatingInput.value === '' || product.rating.rate >= parseInt(filterRatingInput.value)) && (filterCategoryInput.value === '' || product.category === filterCategoryInput.value);
        });
        renderProducts(filteredProducts);
    });

    sortfilter.addEventListener('change', function() {
        console.log(sortfilter.value)
        filteredProducts = products.filter(product => {
          return (searchTitleInput.value === '' || product.title.toLowerCase().includes(searchTitleInput.value.toLowerCase())) && (filterRatingInput.value === '' || product.rating.rate >= parseInt(filterRatingInput.value)) && (filterCategoryInput.value === '' || product.category === filterCategoryInput.value);
        });
        if (this.value === 'high'){
            filteredProducts = filteredProducts.sort(function(a, b) {
                return b.rating.rate - a.rating.rate;
            });
        }
        if (this.value === 'low'){
            filteredProducts = filteredProducts.sort(function(a, b) {
                return a.rating.rate - b.rating.rate;
            });
        }
        renderProducts(filteredProducts);

    });


    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        const productImage = document.createElement('div');
        productImage.classList.add('product-image');
        const productImageImg = document.createElement('img');
        productImageImg.src = product.image;
        productImage.appendChild(productImageImg);
        productCard.appendChild(productImage);
    
        const productTitle = document.createElement('div');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;
        productCard.appendChild(productTitle);
    
        const productRating = document.createElement('div');
        productRating.classList.add('product-rating');
        productRating.textContent = product.rating.rate;
        productCard.appendChild(productRating);
        
        const productPrice = document.createElement('div');
        productPrice.classList.add('product-rating');
        productPrice.textContent = product.price+" $";
        productCard.appendChild(productPrice);

    
        const productCategory = document.createElement('div');
        productCategory.classList.add('product-category');
        productCategory.textContent = product.category;
        productCard.appendChild(productCategory);

        productList.appendChild(productCard);

        if (!category.includes(product.category)){
            category.push(product.category);
            addcategory(product);
            }
        }   
        );

    function addcategory(product) {
        const category_option = document.createElement('option');
        category_option.setAttribute("value", product.category);
        category_option.textContent = product.category;
        filterCategoryInput.appendChild(category_option);

    }

}
}
fetchProducts();

