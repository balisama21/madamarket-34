
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, MessageCircle, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("FR");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const languages = [
    { code: "FR", name: "Français" },
    { code: "MG", name: "Malagasy" },
    { code: "EN", name: "English" }
  ];

  useEffect(() => {
    // Check current session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Déconnexion réussie",
        description: "Vous êtes maintenant déconnecté",
      });
      navigate("/");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Top bar avec drapeau malgache */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-xs">🇲🇬</span>
            <span className="text-gray-600 text-xs">Marketplace de produits malgaches</span>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border-none text-xs focus:outline-none text-gray-600"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <span className="text-gray-500 text-xs">Livraison gratuite dès 50 000 Ar</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MadaMarket</h1>
              <p className="text-xs text-gray-500">Produits de Madagascar</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des produits malgaches..."
                className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <Button 
                type="submit"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Navigation icons */}
          <div className="flex items-center space-x-2">
            <Link to="/messages" className="p-3 hover:bg-gray-50 rounded-full relative transition-colors">
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">2</span>
            </Link>
            <Link to="/wishlist" className="p-3 hover:bg-gray-50 rounded-full relative transition-colors">
              <Heart className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">5</span>
            </Link>
            <Link to="/cart" className="p-3 hover:bg-gray-50 rounded-full relative transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">3</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile" className="p-3 hover:bg-gray-50 rounded-full transition-colors">
                  <User className="h-5 w-5 text-gray-600" />
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <LogOut className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                  Connexion
                </Button>
              </Link>
            )}
            
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block pb-4`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
              <Link to="/categories/alimentation" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Alimentation</Link>
              <Link to="/categories/artisanat" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Artisanat</Link>
              <Link to="/categories/textiles" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Textiles</Link>
              <Link to="/categories/beaute" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Beauté</Link>
              <Link to="/categories/epices" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Épices</Link>
              <Link to="/categories/bijoux" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Bijoux</Link>
              <Link to="/categories/decoration" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Décoration</Link>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <Link to="/seller-dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">Espace Vendeur</Link>
              <Link to="/seller-dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full w-fit">
                  Vendre sur MadaMarket
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <Button 
              type="submit"
              className="absolute right-1 top-1 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
