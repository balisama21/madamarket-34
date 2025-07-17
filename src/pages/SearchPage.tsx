
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
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

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const { toast } = useToast();

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "alimentation", label: "Alimentation" },
    { value: "artisanat", label: "Artisanat" },
    { value: "textiles", label: "Textiles" },
    { value: "beaute", label: "Beauté" },
    { value: "epices", label: "Épices" },
    { value: "decoration", label: "Décoration" },
    { value: "bijoux", label: "Bijoux" },
    { value: "musique", label: "Musique" },
    { value: "livres", label: "Livres" },
    { value: "jouets", label: "Jouets" },
    { value: "electronique", label: "Électronique" },
    { value: "maison", label: "Maison" }
  ];

  const searchProducts = async (query: string = searchQuery) => {
    setLoading(true);
    
    try {
      let queryBuilder = supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      // Recherche par titre ou description
      if (query.trim()) {
        queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }

      // Filtrer par catégorie
      if (selectedCategory !== "all") {
        queryBuilder = queryBuilder.eq("category", selectedCategory);
      }

      // Filtrer par prix
      queryBuilder = queryBuilder
        .gte("price", priceRange[0])
        .lte("price", priceRange[1]);

      const { data, error } = await queryBuilder;

      if (error) {
        console.error("Erreur lors de la recherche:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'effectuer la recherche.",
          variant: "destructive",
        });
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
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
    searchProducts();
  }, [selectedCategory, priceRange]);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      searchProducts(query);
    } else {
      searchProducts("");
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Rechercher des produits</h1>
          
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Recherche..." : "Rechercher"}
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtres
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Catégorie</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Prix (Ar)</label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="Prix minimum"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      />
                      <Input
                        type="number"
                        placeholder="Prix maximum"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résultats */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-gray-600">
                {loading ? "Recherche en cours..." : `${products.length} produit(s) trouvé(s)`}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucun produit trouvé pour votre recherche.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
