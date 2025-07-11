
import Header from "@/components/Header";

import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

const WishlistPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Ma liste de souhaits</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Votre liste de souhaits est vide</h2>
            <p className="text-gray-600 mb-6">
              Ajoutez des produits à votre liste de souhaits pour les retrouver facilement plus tard.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Découvrir des produits
            </Button>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default WishlistPage;
