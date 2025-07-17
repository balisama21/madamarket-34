
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import ProductReviews from "@/components/ProductReviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, Heart, Share2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  image: string | null;
  images: string[] | null;
  seller: string;
  seller_id: string | null;
  category: string;
  categories: string[] | null;
  rating: number | null;
  review_count: number | null;
  downloads: number | null;
  created_at: string;
  updated_at: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { toast } = useToast();

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erreur lors du chargement du produit:", error);
        return;
      }

      setProduct(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter des produits au panier.",
        variant: "destructive",
      });
      return;
    }

    setAddingToCart(true);

    try {
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      if (existingItem) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cart_items")
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1
          });

        if (error) throw error;
      }

      toast({
        title: "Ajouté au panier",
        description: `${product.title} a été ajouté à votre panier.`,
      });

    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier.",
        variant: "destructive",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter aux favoris.",
        variant: "destructive",
      });
      return;
    }

    setWishlisted(!wishlisted);
    toast({
      title: wishlisted ? "Retiré des favoris" : "Ajouté aux favoris",
      description: wishlisted 
        ? `${product?.title} a été retiré de vos favoris.`
        : `${product?.title} a été ajouté à vos favoris.`,
    });
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description || 'Découvrez ce produit sur notre marketplace',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erreur lors du partage:', error);
      }
    } else {
      // Fallback: copier l'URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien du produit a été copié dans le presse-papiers.",
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Produit non trouvé</h1>
            <p className="text-muted-foreground">Le produit que vous recherchez n'existe pas.</p>
          </div>
        </div>
      </div>
    );
  }

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
      ? [product.image] 
      : ["/placeholder.svg"];

  const productFeatures = [
    "Livraison disponible",
    `Catégorie: ${product.category}`,
    `Vendeur: ${product.seller}`,
    ...(product.categories && product.categories.length > 1 
      ? [`Autres catégories: ${product.categories.slice(1).join(", ")}`] 
      : [])
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src={productImages[selectedImageIndex]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto scrollbar-thin">
                {productImages.map((image, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-primary font-medium mb-2">{product.category}</div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
                    />
                  ))}
                  <span className="ml-2 text-muted-foreground">({product.review_count || 0} avis)</span>
                </div>
              </div>
              
              <div className="text-4xl font-bold text-foreground mb-6">
                {product.price.toLocaleString()} {product.currency}
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Description</h3>
                <p className="text-muted-foreground mb-4">{product.description || "Aucune description disponible."}</p>
                
                <h4 className="font-semibold mb-2">Informations :</h4>
                <ul className="space-y-1 max-h-32 overflow-y-auto scrollbar-thin">
                  {productFeatures.map((feature, index) => (
                    <li key={index} className="text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {addingToCart ? "Ajout..." : "Ajouter au panier"}
              </Button>
              <Button variant="outline" size="lg" onClick={handleWishlist}>
                <Heart className={`h-5 w-5 ${wishlisted ? 'fill-current text-pink-500' : ''}`} />
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Vendeur: {product.seller}</h4>
                    <p className="text-sm text-muted-foreground">Téléchargements: {product.downloads || 0}</p>
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

        {/* Section avis et messagerie */}
        <div className="mt-12">
          <ProductReviews 
            productId={product.id} 
            sellerId={product.seller_id || "unknown"} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
