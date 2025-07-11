
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de confidentialité</h1>
            <p className="text-lg text-gray-600">
              Dernière mise à jour : 7 janvier 2025
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Protection de vos données
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Collecte des données</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous collectons les informations que vous nous fournissez directement, telles que votre nom, 
                    adresse e-mail, numéro de téléphone et adresse de livraison lorsque vous créez un compte 
                    ou passez une commande sur MadaMarket.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Utilisation des données</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Nous utilisons vos données personnelles pour :
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Traiter vos commandes et gérer votre compte</li>
                    <li>Vous contacter concernant vos commandes</li>
                    <li>Améliorer nos services et votre expérience</li>
                    <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Partage des données</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous ne vendons, n'échangeons ou ne transférons pas vos données personnelles à des tiers, 
                    sauf dans les cas nécessaires pour traiter vos commandes (livraison, paiement) ou 
                    lorsque la loi l'exige.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Sécurité des données</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées 
                    pour protéger vos données personnelles contre tout accès non autorisé, altération, 
                    divulgation ou destruction.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Vos droits</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Vous avez le droit de :
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Accéder à vos données personnelles</li>
                    <li>Rectifier des données inexactes</li>
                    <li>Demander la suppression de vos données</li>
                    <li>Vous opposer au traitement de vos données</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Contact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
                    contactez-nous à : privacy@madamarket.mg
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;
