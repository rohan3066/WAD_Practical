// Sample product data
const products = [
    { id: 1, name: "Wireless Headphones", price: 7999, description: "Noise-cancelling over-ear headphones.", image: "https://via.placeholder.com/100?text=Headphones" },
    { id: 2, name: "Smartwatch", price: 12999, description: "Fitness tracking smartwatch.", image: "https://via.placeholder.com/100?text=Smartwatch" },
    { id: 3, name: "Gaming Mouse", price: 2499, description: "Ergonomic gaming mouse.", image: "https://via.placeholder.com/100?text=Gaming+Mouse" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    { id: 4, name: "Laptop Stand", price: 1999, description: "Adjustable aluminum stand.", image: "https://via.placeholder.com/100?text=Laptop+Stand" },
    // Add more products to test pagination (e.g., 12 products)
];

const itemsPerPage = 10;
let currentPage = 1;

function displayProducts(page) {
    const productBody = document.getElementById('productBody');
    productBody.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>₹${product.price}</td>
            <td>${product.description}</td>
        `;
        productBody.appendChild(row);
    });

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(currentPage);
    }
});

// Initial display
displayProducts(currentPage);