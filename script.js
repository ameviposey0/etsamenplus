// Gestion des produits avec stockage local
class ProductManager {
    constructor() {
        this.products = [];
        this.productsFile = 'products.json';
        this.loadProducts();
        this.displayProducts();
    }

    // Charger les produits depuis le localStorage
    async loadProducts() {
        try {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                this.products = JSON.parse(storedProducts);
            } else {
                this.products = [];
                await this.saveProducts();
            }
        } catch (error) {
            console.log('Erreur lors du chargement, initialisation avec liste vide');
            this.products = [];
            await this.saveProducts();
        }
    }

    // Sauvegarder les produits dans le localStorage
    async saveProducts() {
        try {
            localStorage.setItem('products', JSON.stringify(this.products));
            console.log('Produits sauvegardés dans le localStorage');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        }
    }

    // Ajouter un nouveau produit
    async addProduct(productName) {
        const newProduct = {
            id: Date.now(),
            name: productName,
            createdAt: new Date().toLocaleDateString('fr-FR'),
            timestamp: Date.now()
        };

        this.products.unshift(newProduct);
        await this.saveProducts();
        this.displayProducts();
        this.showSuccessModal();

        return newProduct;
    }



    // Modifier un produit
    async editProduct(productId, newName) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.name = newName;
            product.updatedAt = new Date().toLocaleDateString('fr-FR');
            await this.saveProducts();
            this.displayProducts();
        }
    }

    // Afficher les produits
    displayProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        if (this.products.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <h3>Aucun produit créé</h3>
                    <p>Commencez par créer votre premier produit !</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = this.products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-info">
                    <h3>${this.escapeHtml(product.name)}</h3>
                    <p class="product-date">Créé le ${product.createdAt}</p>
                    ${product.updatedAt ? `<p class="product-updated">Modifié le ${product.updatedAt}</p>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn btn-small btn-primary" onclick="productManager.editProductModal(${product.id})">
                        <i class="fas fa-edit"></i>
                        Modifier
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Modal pour modifier
    editProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const newName = prompt('Modifier le nom du produit:', product.name);
        if (newName && newName.trim() !== '' && newName !== product.name) {
            this.editProduct(productId, newName.trim());
        }
    }

    // Modal de succès
    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Sécurité HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Télécharger la liste des produits
    downloadProductsList() {
        try {
            const dataStr = JSON.stringify(this.products, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = 'products.json';

            link.click();
            URL.revokeObjectURL(link.href);

            console.log('Liste des produits téléchargée');
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            alert('Erreur lors du téléchargement de la liste');
        }
    }
}

// Gestionnaire de formulaire
class FormManager {
    constructor(productManager) {
        this.productManager = productManager;
        this.form = document.getElementById('productForm');
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const productNameInput = document.getElementById('productName');
        const productName = productNameInput.value.trim();

        if (!productName) {
            alert('Veuillez entrer un nom de produit');
            return;
        }

        try {
            await this.productManager.addProduct(productName);
            this.resetForm();
        } catch (error) {
            console.error('Erreur lors de la création:', error);
            alert('Erreur lors de la création du produit');
        }
    }

    resetForm() {
        if (this.form) {
            this.form.reset();
        }
    }
}

// Initialisation
let productManager;
let formManager;

document.addEventListener('DOMContentLoaded', () => {
    productManager = new ProductManager();
    formManager = new FormManager(productManager);
});

// Fonctions globales
function resetForm() {
    if (formManager) {
        formManager.resetForm();
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fermer modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
