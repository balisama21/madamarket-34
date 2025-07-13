import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload, X, Image } from "lucide-react";

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
    seller: "",
    categories: [] as string[],
    images: [] as File[],
  });

  const availableCategories = [
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

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxImages = 5;
    
    if (formData.images.length + files.length > maxImages) {
      toast({
        title: "Erreur",
        description: `Maximum ${maxImages} images autorisées.`,
        variant: "destructive",
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, maxImages)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
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
    
    if (formData.categories.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une catégorie.",
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
      // Upload images first
      const imageUrls: string[] = [];
      
      for (const imageFile of formData.images) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("Erreur upload image:", uploadError);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        imageUrls.push(publicUrl);
      }

      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        price: Number(formData.price),
        currency: formData.currency,
        image: imageUrls[0] || "/placeholder.svg",
        images: imageUrls,
        seller: formData.seller.trim(),
        category: formData.categories[0] || "Autre",
        categories: formData.categories,
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
        seller: "",
        categories: [],
        images: [],
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau produit</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour ajouter un produit à votre boutique.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] overflow-y-auto pr-4">
          <div className="space-y-6">
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

          <div className="space-y-3">
            <Label>Catégories * (sélectionnez une ou plusieurs)</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={formData.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="images">Photos du produit (max 5)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-muted-foreground/50 transition-colors">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Image className="h-8 w-8 text-muted-foreground" />
                <div className="text-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('images')?.click()}
                    className="mb-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Sélectionner des images
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG jusqu'à 5 images
                  </p>
                </div>
              </div>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          </div>
        </ScrollArea>
        
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
            type="button" 
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
            onClick={handleSubmit}
          >
            {loading ? "Ajout en cours..." : "Ajouter le produit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;