
import Header from "@/components/Header";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, User } from "lucide-react";

const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes messages</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des conversations */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">ArtisanMG</h4>
                        <p className="text-xs text-gray-600">Concernant votre panier...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">NatureMada</h4>
                        <p className="text-xs text-gray-600">Merci pour votre commande</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Zone de chat */}
            <div className="lg:col-span-2">
              <Card className="h-96">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">ArtisanMG</h3>
                      <p className="text-sm text-gray-600">En ligne</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 p-4">
                  <div className="space-y-4 mb-4">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Bonjour, j'ai vu que vous avez ajouté notre panier traditionnel au panier. Avez-vous des questions ?</p>
                        <span className="text-xs text-gray-500 mt-1">Il y a 2h</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Bonjour, oui j'aimerais savoir si vous avez d'autres tailles disponibles ?</p>
                        <span className="text-xs text-blue-100 mt-1">Il y a 1h</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <Input placeholder="Tapez votre message..." className="flex-1" />
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default MessagesPage;
