<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création de Produits - Ets AmenPlus</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <h1>Ets AmenPlus</h1>
                <p>Création de Produits</p>
            </div>
            <nav class="nav">
                <a href="#" class="nav-link active">Produits</a>
                <a href="#" class="nav-link">Catégories</a>
                <a href="#" class="nav-link">Inventaire</a>
                <a href="#" class="nav-link">Rapports</a>
            </nav>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <div class="content-header">
                <h2>Créer un Nouveau Produit</h2>
                <p>Ajoutez un nouveau produit à votre catalogue</p>
            </div>

            <div class="form-container">
                <form id="productForm" class="product-form" enctype="multipart/form-data">
                    <div class="form-grid">
                        <!-- Informations de base -->
                        <div class="form-section">
                            <h3>Informations du Produit</h3>
                            <div class="form-group">
                                <label for="productName">Nom du Produit *</label>
                                <input type="text" id="productName" name="productName" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="productPriceMin">Prix Minimum *</label>
                                    <div class="price-input">
                                        <span class="currency">€</span>
                                        <input type="number" id="productPriceMin" name="productPriceMin" step="0.01" min="0" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="productPriceMax">Prix Maximum *</label>
                                    <div class="price-input">
                                        <span class="currency">€</span>
                                        <input type="number" id="productPriceMax" name="productPriceMax" step="0.01" min="0" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="resetForm()">
                            <i class="fas fa-undo"></i>
                            Réinitialiser
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i>
                            Créer le Produit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>

    <!-- Success Modal -->
    <div id="successModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <i class="fas fa-check-circle success-icon"></i>
                <h3>Produit Créé avec Succès!</h3>
            </div>
            <div class="modal-body">
                <p>Votre produit a été ajouté au catalogue avec succès.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal()">Continuer</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>