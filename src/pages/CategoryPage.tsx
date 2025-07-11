
import { useParams } from "react-router-dom";
import Header from "@/components/Header";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoryProducts = [
    {
      id: "1",
      title: "Riz Makalioka Premium - Sac 25kg",
      price: 85000,
      currency: "Ar",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      seller: "RizMada",
      rating: 4.8,
      reviewCount: 324,
      category: "Alimentation",
      downloads: 1250
    },
    {
      id: "2", 
      title: "Artisanat Malagasy - Panier traditionnel",
      price: 45000,
      currency: "Ar",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
      seller: "ArtisanMG",
      rating: 4.9,
      reviewCount: 156,
      category: "Artisanat",
      downloads: 890
    },
    {
      id: "3",
      title: "Huile essentielle Ravintsara - 30ml",
      price: 35000,
      currency: "Ar", 
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
      seller: "NatureMada",
      rating: 4.7,
      reviewCount: 203,
      category: "Santé & Beauté",
      downloads: 567
    }
  ];

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1) || "Produits";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-gray-600 mt-2">{categoryProducts.length} produits trouvés</p>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              Trier
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      
      
    </div>
  );
};

export default CategoryPage;
