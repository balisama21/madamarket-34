
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Edit, Upload, X, Image } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  image: string | null;
  images: string[] | null;
  seller: string;
  category: string;
  rating: number | null;
  review_count: number | null;
  downloads: number | null;
  created_at: string;
  updated_at: string;
}

interface EditProductDialogProps {
  product: Product;
  onProductUpdated: () => void;
}

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
  "Musique",
  "Livres",
  "Jouets",
  "Maison",
  "Sport",
  "Autre"
];

const EditProductDialog = ({ product, onProductUpdated }: EditProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description || "",
    price: product.price.toString(),
    currency: product.currency,
    category: product.category,
    image: product.image || "",
    newImages: [] as File[],
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      title: product.title,
      description: product.description || "",
      price: product.price.toString(),
      currency: product.currency,
      category: product.category,
      image: product.image || "",
      newImages: [],
    });
  }, [product]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxImages = 5;
    
    if (formData.newImages.length + files.length > maxImages) {
      toast({
        title: "Erreur",
        description: `Maximum ${maxImages} images autorisées.`,
        variant: "destructive",
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      newImages: [...prev.newImages, ...files].slice(0, maxImages)
    }));
  };

  const removeNewImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.price || !formData.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix doit être un nombre valide supérieur à 0.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload new images if any
      let newImageUrls: string[] = [];
      
      for (const imageFile of formData.newImages) {
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
        
        newImageUrls.push(publicUrl);
      }

      // Combine existing images with new ones
      const existingImages = product.images || [];
      const allImages = [...existingImages, ...newImageUrls];
      const mainImage = formData.image.trim() || newImageUrls[0] || existingImages[0] || null;

      const { error } = await supabase
        .from("products")
        .update({
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          price: price,
          currency: formData.currency,
          category: formData.category,
          image: mainImage,
          images: allImages,
          updated_at: new Date().toISOString(),
        })
        .eq("id", product.id);

      if (error) {
        console.error("Erreur lors de la mise à jour:", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le produit.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Produit mis à jour avec succès.",
      });

      setOpen(false);
      onProductUpdated();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
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
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Modifier le produit</DialogTitle>
          <DialogDescription>
            Modifiez les informations de votre produit ici.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] overflow-y-auto pr-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Nom du produit"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Description du produit"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Prix *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="Prix"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="currency">Devise</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => handleInputChange("currency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MGA">MGA</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
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
            
            <div className="grid gap-2">
              <Label htmlFor="image">URL de l'image principale</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="newImages">Ajouter de nouvelles photos (max 5)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-muted-foreground/50 transition-colors">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Image className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('newImages')?.click()}
                      className="mb-2"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Ajouter des images
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG jusqu'à 5 images
                    </p>
                  </div>
                </div>
                <Input
                  id="newImages"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {formData.newImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {formData.newImages.map((image, index) => (
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
                        onClick={() => removeNewImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              <Button type="submit" disabled={loading}>
                {loading ? "Mise à jour..." : "Mettre à jour"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
