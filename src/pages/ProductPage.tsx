
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, Heart, Share2, MessageCircle } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  
  const product = {
    id: id || "1",
    title: "Riz Makalioka Premium - Sac 25kg",
    price: 85000,
    currency: "Ar",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop"
    ],
    seller: "RizMada",
    rating: 4.8,
    reviewCount: 324,
    category: "Alimentation",
    description: "Riz de qualité premium cultivé dans les hauts plateaux de Madagascar. Variété Makalioka reconnue pour sa saveur exceptionnelle et sa qualité nutritionnelle.",
    features: [
      "100% naturel et bio",
      "Cultivé à Madagascar",
      "Sac de 25kg",
      "Variété Makalioka premium",
      "Livraison gratuite"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-blue-600 font-medium mb-2">{product.category}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.reviewCount} avis)</span>
                </div>
              </div>
              
              <div className="text-4xl font-bold text-gray-900 mb-6">
                {product.price.toLocaleString()} {product.currency}
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Description</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <h4 className="font-semibold mb-2">Caractéristiques :</h4>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex gap-4">
              <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ajouter au panier
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Vendeur: {product.seller}</h4>
                    <p className="text-sm text-gray-600">Membre depuis 2020</p>
                  </div>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
