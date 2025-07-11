
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  seller: string;
  rating: number;
  reviewCount: number;
  category: string;
  downloads: number;
  isWishlisted?: boolean;
}

const ProductCard = ({ 
  id, title, price, currency, image, seller, rating, reviewCount, category, downloads, isWishlisted = false 
}: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Ajouté au panier",
      description: `${title} a été ajouté à votre panier.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted(!wishlisted);
    toast({
      title: wishlisted ? "Retiré des favoris" : "Ajouté aux favoris",
      description: wishlisted 
        ? `${title} a été retiré de vos favoris.`
        : `${title} a été ajouté à vos favoris.`,
    });
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <Button 
          size="sm"
          variant="ghost"
          className={`absolute top-3 right-3 p-2 rounded-full ${wishlisted ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-500 bg-white/90 backdrop-blur-sm shadow-sm`}
          onClick={handleWishlist}
        >
          <Heart className="h-4 w-4" fill={wishlisted ? "currentColor" : "none"} />
        </Button>
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {category}
        </div>
      </div>
      
      <div className="p-5">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors text-lg">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-gray-900">
            {price.toLocaleString()} {currency}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Download className="h-4 w-4 mr-1" />
            {downloads}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <Link to={`/seller/${seller}`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Par {seller}
          </Link>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ajouter au panier
          </Button>
          <Button 
            variant="outline" 
            className="px-4 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full"
            onClick={handlePreview}
          >
            Aperçu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
