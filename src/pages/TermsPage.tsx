
import Header from "@/components/Header";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Conditions d'utilisation</h1>
            <p className="text-lg text-gray-600">
              Dernière mise à jour : 7 janvier 2025
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Conditions générales d'utilisation
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptation des conditions</h3>
                  <p className="text-gray-600 leading-relaxed">
                    En utilisant MadaMarket, vous acceptez d'être lié par ces conditions d'utilisation. 
                    Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Utilisation de la plateforme</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Vous vous engagez à :
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Fournir des informations exactes et à jour</li>
                    <li>Utiliser la plateforme de manière légale et éthique</li>
                    <li>Ne pas porter atteinte aux droits d'autrui</li>
                    <li>Respecter les droits de propriété intellectuelle</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Commandes et paiements</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Toutes les commandes sont soumises à acceptation et disponibilité. Les prix sont indiqués 
                    en Ariary malgache (Ar) et incluent toutes les taxes applicables. Le paiement doit être 
                    effectué avant la livraison.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Livraison</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous nous efforçons de livrer dans les délais indiqués, mais ne pouvons garantir 
                    des dates de livraison exactes. La livraison est gratuite pour les commandes 
                    de plus de 50 000 Ar.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Retours et remboursements</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vous pouvez retourner les produits dans un délai de 14 jours suivant la réception, 
                    dans leur état d'origine. Les frais de retour sont à votre charge, sauf en cas 
                    de produit défectueux.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation de responsabilité</h3>
                  <p className="text-gray-600 leading-relaxed">
                    MadaMarket ne saurait être tenu responsable des dommages indirects, incidents ou 
                    consécutifs résultant de l'utilisation de la plateforme ou des produits achetés.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Modifications</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous nous réservons le droit de modifier ces conditions à tout moment. 
                    Les modifications prendront effet dès leur publication sur le site.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Contact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pour toute question concernant ces conditions, contactez-nous à : legal@madamarket.mg
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      
    </div>
  );
};

export default TermsPage;
