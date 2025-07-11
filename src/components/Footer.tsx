
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import orangeMoneyLogo from "../assets/orange-money-logo.png";
import airtelMoneyLogo from "../assets/airtel-money-logo.png";
import mvolaLogo from "../assets/mvola-logo.png";

const Footer = () => {
  return (
    <>
      {/* Section verte réduite */}
      <section className="py-8 bg-gradient-to-br from-green-700 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="text-lg font-bold mb-2 text-white">Livraison rapide</h3>
              <p className="text-green-50 text-sm">48-72h partout à Madagascar</p>
            </div>
            <div className="p-4 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="text-lg font-bold mb-2 text-white">Paiements sécurisés</h3>
              <p className="text-green-50 text-sm">Mobile Money accepté</p>
            </div>
            <div className="p-4 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="text-lg font-bold mb-2 text-white">Qualité garantie</h3>
              <p className="text-green-50 text-sm">100% authentique Madagascar</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">MadaMarket</h3>
                <p className="text-sm text-gray-500">Produits de Madagascar</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              La marketplace de référence pour tous les produits authentiques de Madagascar.
            </p>
            
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">🇲🇬</span>
              <span className="text-sm text-gray-500">Fier d'être malgache</span>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-gray-50 hover:bg-blue-50 rounded-full flex items-center justify-center transition-colors group">
                <Facebook className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 hover:bg-pink-50 rounded-full flex items-center justify-center transition-colors group">
                <Instagram className="h-5 w-5 text-gray-600 group-hover:text-pink-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 hover:bg-blue-50 rounded-full flex items-center justify-center transition-colors group">
                <Twitter className="h-5 w-5 text-gray-600 group-hover:text-blue-400" />
              </a>
            </div>
          </div>

          {/* Catégories populaires */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-gray-900">Catégories</h4>
            <ul className="space-y-3">
              <li><Link to="/categories/alimentation" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center"><span className="mr-2">🍚</span>Alimentation</Link></li>
              <li><Link to="/categories/artisanat" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center"><span className="mr-2">🧺</span>Artisanat</Link></li>
              <li><Link to="/categories/textiles" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center"><span className="mr-2">👘</span>Textiles</Link></li>
              <li><Link to="/categories/beaute" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center"><span className="mr-2">🌿</span>Beauté</Link></li>
              <li><Link to="/categories/bijoux" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center"><span className="mr-2">💎</span>Bijoux</Link></li>
              <li><Link to="/categories/decoration" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center"><span className="mr-2">🏺</span>Décoration</Link></li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-gray-900">Liens utiles</h4>
            <ul className="space-y-3">
              <li><Link to="/seller-dashboard" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Devenir vendeur</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Contact</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Centre d'aide</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Confidentialité</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Conditions</Link></li>
            </ul>
          </div>

          {/* Contact et paiement */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-gray-900">Contact</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Antananarivo, Madagascar</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">+261 34 12 345 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">contact@madamarket.mg</span>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-6 text-gray-900">Moyens de paiement</h5>
              
              {/* Mobile Money */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-orange-200 hover:border-orange-300 transition-colors">
                  <img 
                    src={orangeMoneyLogo} 
                    alt="Orange Money"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-700">Orange Money</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-red-200 hover:border-red-300 transition-colors">
                  <img 
                    src={airtelMoneyLogo} 
                    alt="Airtel Money"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-700">Airtel Money</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200 hover:border-green-300 transition-colors">
                  <img 
                    src={mvolaLogo} 
                    alt="MVola"
                    className="h-8 w-8 object-contain rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">MVola</span>
                </div>
                
                {/* Virement bancaire */}
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">VB</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Virement bancaire</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-xs text-emerald-700 font-medium">Paiements 100% sécurisés</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation et copyright */}
        <div className="border-t border-gray-100 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 MadaMarket. Tous droits réservés. Fait avec ❤️ à Madagascar
            </p>
            <div className="flex space-x-8 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors">Politique de confidentialité</Link>
              <Link to="/terms" className="text-gray-500 hover:text-blue-600 transition-colors">Conditions d'utilisation</Link>
            </div>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
};

export default Footer;
