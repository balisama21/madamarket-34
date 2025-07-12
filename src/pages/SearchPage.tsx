import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  seller: string;
  category: string;
  rating: number;
  review_count: number;
  downloads: number;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const { toast } = useToast();

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`title.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error searching products:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la recherche.",
          variant: "destructive",
        });
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      searchProducts(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      searchProducts(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher des produits..."
              className="w-full pl-4 pr-12 py-4 text-lg border border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <Button 
              type="submit"
              className="absolute right-2 top-2 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 p-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Search Results Header */}
        {searchParams.get("q") && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Résultats pour "{searchParams.get("q")}"
                </h1>
                <p className="text-gray-600">
                  {loading ? "Recherche en cours..." : `${products.length} produit${products.length > 1 ? 's' : ''} trouvé${products.length > 1 ? 's' : ''}`}
                </p>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && searchParams.get("q") && products.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Aucun résultat pour "{searchParams.get("q")}". Essayez avec d'autres mots-clés.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Suggestions :</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Vérifiez l'orthographe</li>
                  <li>Utilisez des mots-clés plus généraux</li>
                  <li>Essayez des synonymes</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                currency={product.currency}
                image={product.image}
                seller={product.seller}
                rating={product.rating}
                reviewCount={product.review_count}
                category={product.category}
                downloads={product.downloads}
                isWishlisted={false}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!searchParams.get("q") && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Recherchez des produits
            </h3>
            <p className="text-gray-600">
              Utilisez la barre de recherche ci-dessus pour trouver des produits.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;