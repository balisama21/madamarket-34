
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
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

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const categoryNames: { [key: string]: string } = {
    "alimentation": "Alimentation",
    "artisanat": "Artisanat", 
    "textiles": "Textiles",
    "beaute": "Beauté",
    "epices": "Épices",
    "decoration": "Décoration",
    "bijoux": "Bijoux",
    "musique": "Musique",
    "livres": "Livres",
    "jouets": "Jouets",
    "electronique": "Électronique",
    "maison": "Maison"
  };

  const fetchCategoryProducts = async () => {
    if (!category) return;

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors du chargement des produits:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits de cette catégorie.",
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
    fetchCategoryProducts();
  }, [category]);

  const categoryDisplayName = category ? categoryNames[category] || category : "Catégorie";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryDisplayName}</h1>
          <p className="text-gray-600">
            {loading ? "Chargement..." : `${products.length} produit(s) dans cette catégorie`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Aucun produit dans cette catégorie</h2>
            <p className="text-gray-600">Revenez plus tard pour découvrir de nouveaux produits !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
