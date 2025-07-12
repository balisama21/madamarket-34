import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload } from "lucide-react";

interface AddProductDialogProps {
  onProductAdded?: () => void;
}

const AddProductDialog = ({ onProductAdded }: AddProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "MGA",
    image: "",
    seller: "",
    category: "",
  });

  const categories = [
    "Électronique",
    "Mode", 
    "Alimentation",
    "Artisanat",
    "Textiles",
    "Beauté",
    "Épices",
    "Bijoux",
    "Décoration",
    "Autre"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre du produit est requis.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast({
        title: "Erreur", 
        description: "Veuillez entrer un prix valide.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.seller.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du vendeur est requis.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.category) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une catégorie.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        price: Number(formData.price),
        currency: formData.currency,
        image: formData.image.trim() || "/placeholder.svg",
        seller: formData.seller.trim(),
        category: formData.category,
        rating: 0,
        review_count: 0,
        downloads: 0
      };

      const { data, error } = await supabase
        .from("products")
        .insert([productData])
        .select()
        .single();

      if (error) {
        console.error("Erreur lors de l'ajout du produit:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter le produit. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }

      console.log("Produit ajouté avec succès:", data);
      
      toast({
        title: "Succès",
        description: "Produit ajouté avec succès !",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        currency: "MGA",
        image: "",
        seller: "",
        category: "",
      });

      setOpen(false);
      
      // Callback pour rafraîchir la liste
      if (onProductAdded) {
        onProductAdded();
      }

    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau produit</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour ajouter un produit à votre boutique.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du produit *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ex: iPhone 14 Pro"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Description détaillée du produit..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="50000"
                min="0"
                step="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Devise</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MGA">Ariary (MGA)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="USD">Dollar (USD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller">Nom du vendeur *</Label>
            <Input
              id="seller"
              value={formData.seller}
              onChange={(e) => handleInputChange("seller", e.target.value)}
              placeholder="Votre nom ou nom de boutique"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL de l'image</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
            <p className="text-xs text-gray-500">
              Laissez vide pour utiliser l'image par défaut
            </p>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Ajout en cours..." : "Ajouter le produit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;