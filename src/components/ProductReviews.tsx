import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, MessageSquare, Send } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_id: string;
}

interface ProductReviewsProps {
  productId: string;
  sellerId: string;
}

const ProductReviews = ({ productId, sellerId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors du chargement des avis:", error);
        return;
      }

      setReviews(data || []);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const submitReview = async () => {
    if (newRating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une note.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("reviews")
        .insert([{
          product_id: productId,
          rating: newRating,
          comment: newComment.trim() || null,
        }]);

      if (error) {
        console.error("Erreur lors de l'ajout de l'avis:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter votre avis.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Votre avis a été ajouté !",
      });

      setNewRating(0);
      setNewComment("");
      fetchReviews();
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!messageContent.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un message.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("messages")
        .insert([{
          receiver_id: sellerId,
          product_id: productId,
          subject: `Question sur le produit`,
          content: messageContent.trim(),
        }]);

      if (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le message.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Message envoyé au vendeur !",
      });

      setMessageContent("");
      setShowMessageForm(false);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Section des avis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Avis clients ({reviews.length})</span>
            <div className="flex items-center space-x-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)}/5
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Formulaire d'ajout d'avis */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-semibold mb-3">Laisser un avis</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-2">Votre note :</p>
                {renderStars(newRating, true, setNewRating)}
              </div>
              <Textarea
                placeholder="Votre commentaire (optionnel)..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={submitReview} 
                disabled={loading || newRating === 0}
                className="w-full"
              >
                {loading ? "Envoi..." : "Publier l'avis"}
              </Button>
            </div>
          </div>

          {/* Liste des avis */}
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Aucun avis pour l'instant. Soyez le premier à laisser un avis !
              </p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    {renderStars(review.rating)}
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section de messagerie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Contacter le vendeur</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showMessageForm ? (
            <Button 
              onClick={() => setShowMessageForm(true)}
              variant="outline" 
              className="w-full"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Envoyer un message
            </Button>
          ) : (
            <div className="space-y-3">
              <Textarea
                placeholder="Votre message au vendeur..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={4}
              />
              <div className="flex space-x-2">
                <Button 
                  onClick={sendMessage}
                  disabled={loading || !messageContent.trim()}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? "Envoi..." : "Envoyer"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowMessageForm(false);
                    setMessageContent("");
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductReviews;