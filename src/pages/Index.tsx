
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

const Index = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showCategoriesInHero, setShowCategoriesInHero] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Erreur lors du chargement des produits:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits.",
          variant: "destructive",
        });
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { name: "Alimentation", icon: "🍚", count: "2,340", color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100", slug: "alimentation" },
    { name: "Artisanat", icon: "🧺", count: "1,567", color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100", slug: "artisanat" },
    { name: "Textiles", icon: "👘", count: "890", color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100", slug: "textiles" },
    { name: "Beauté", icon: "🌿", count: "1,234", color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100", slug: "beaute" },
    { name: "Épices", icon: "🌶️", count: "567", color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100", slug: "epices" },
    { name: "Décoration", icon: "🏺", count: "945", color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100", slug: "decoration" },
    { name: "Bijoux", icon: "💎", count: "678", color: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100", slug: "bijoux" },
    { name: "Musique", icon: "🎵", count: "234", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100", slug: "musique" },
    { name: "Livres", icon: "📚", count: "456", color: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100", slug: "livres" },
    { name: "Jouets", icon: "🧸", count: "789", color: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100", slug: "jouets" },
    { name: "Électronique", icon: "📱", count: "345", color: "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100", slug: "electronique" },
    { name: "Maison", icon: "🏠", count: "1,123", color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100", slug: "maison" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section moderne avec fond clair */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Contenu texte - moitié gauche */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                  <span className="text-2xl mr-2">🇲🇬</span>
                  <span className="text-sm font-semibold text-blue-700">100% Produits Malgaches</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Découvrez le 
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                    Meilleur de Madagascar
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Explorez une sélection unique de produits authentiques : alimentation locale, 
                  artisanat traditionnel, textiles, épices rares et bien plus encore.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all">
                  Explorer maintenant
                </Button>
                <Link to="/seller-dashboard">
                  <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-xl font-semibold w-full">
                    Devenir vendeur
                  </Button>
                </Link>
              </div>
              
              {/* Statistiques compactes */}
              <div className="flex gap-6 pt-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{products.length || 0}+</div>
                  <div className="text-sm text-gray-500">Produits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">3,200+</div>
                  <div className="text-sm text-gray-500">Vendeurs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">99.4%</div>
                  <div className="text-sm text-gray-500">Satisfaction</div>
                </div>
              </div>
            </div>
            
            {/* Catégories - moitié droite */}
            <div className="lg:pl-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Explorez nos catégories</h3>
                  <p className="text-gray-600 text-sm">Découvrez la richesse des produits malgaches</p>
                </div>
                <Button
                  onClick={() => setShowCategoriesInHero(!showCategoriesInHero)}
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                >
                  {showCategoriesInHero ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
              </div>
              
              {showCategoriesInHero && (
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <Link key={category.name} to={`/categories/${category.slug}`}>
                      <Card className={`cursor-pointer border-2 ${category.color} hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md`}>
                        <CardContent className="p-3 text-center">
                          <div className="text-xl mb-1">{category.icon}</div>
                          <h4 className="font-semibold text-xs mb-1">{category.name}</h4>
                          <span className="text-xs opacity-75">{category.count}</span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
              
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Produits populaires</h2>
            <p className="text-gray-600">Les meilleurs produits sélectionnés pour vous</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Aucun produit disponible pour le moment.</p>
              <Link to="/seller-dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Ajouter le premier produit
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    currency={product.currency}
                    image={product.image || product.images?.[0] || "/placeholder.svg"}
                    seller={product.seller}
                    rating={product.rating || 0}
                    reviewCount={product.review_count || 0}
                    category={product.category}
                    downloads={product.downloads || 0}
                  />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link to="/search">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold">
                    Voir tous les produits
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bouton flottant pour les catégories */}
      {scrolled && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setShowCategories(!showCategories)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4"
          >
            {showCategories ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          {showCategories && (
            <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl border p-4 max-h-96 overflow-y-auto scrollbar-thin">
              <h3 className="font-bold text-gray-900 mb-3">Catégories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link key={category.name} to={`/categories/${category.slug}`}>
                    <Card className={`cursor-pointer border ${category.color} hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md`}>
                      <CardContent className="p-3 text-center">
                        <div className="text-lg mb-1">{category.icon}</div>
                        <h4 className="font-semibold text-xs mb-1">{category.name}</h4>
                        <span className="text-xs opacity-75">{category.count}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;
