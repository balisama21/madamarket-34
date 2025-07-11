
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ShoppingCart, Package, CreditCard, Truck } from "lucide-react";

const HelpPage = () => {
  const faqs = [
    {
      question: "Comment passer une commande ?",
      answer: "Pour passer une commande, ajoutez simplement les produits à votre panier, puis cliquez sur 'Passer la commande'. Suivez les étapes de paiement et de livraison."
    },
    {
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons Orange Money, MVola, Airtel Money et les virements bancaires. Tous les paiements sont sécurisés."
    },
    {
      question: "Combien de temps prend la livraison ?",
      answer: "La livraison prend généralement 2-5 jours ouvrables selon votre localisation à Madagascar. Livraison gratuite pour les commandes de plus de 50 000 Ar."
    },
    {
      question: "Comment devenir vendeur sur MadaMarket ?",
      answer: "Cliquez sur 'Devenir vendeur' dans le menu principal, remplissez le formulaire d'inscription et notre équipe vous contactera pour finaliser votre profil vendeur."
    },
    {
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous avez 14 jours pour retourner un produit. Il doit être dans son état d'origine avec l'emballage. Contactez le vendeur pour initier le retour."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Centre d'aide</h1>
            <p className="text-lg text-gray-600">
              Trouvez rapidement les réponses à vos questions les plus fréquentes.
            </p>
          </div>
          
          {/* Catégories d'aide */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Commandes</h3>
                <p className="text-sm text-gray-600 mt-2">Gérer vos commandes</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Produits</h3>
                <p className="text-sm text-gray-600 mt-2">Informations produits</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <CreditCard className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Paiements</h3>
                <p className="text-sm text-gray-600 mt-2">Modes de paiement</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Truck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Livraison</h3>
                <p className="text-sm text-gray-600 mt-2">Suivi de livraison</p>
              </CardContent>
            </Card>
          </div>
          
          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Questions fréquemment posées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpPage;
