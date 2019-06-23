// Modèle Front-End d'un produit

export interface Product {
  id: string;
  reference: string;
  imagePath: string; // on déclare l'attribut imagePath dans tous les models. (cf. /backend/models/product.js)
  price: number;
  description: string;
  brand: string;
  color: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  category: string;
  creator: string;
}
