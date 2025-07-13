import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Mail, MailOpen } from "lucide-react";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  product_id: string | null;
  subject: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
  products?: {
    title: string;
  };
}

const MessagesInbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          products (
            title
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors du chargement des messages:", error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("id", messageId);
      
      fetchMessages();
    } catch (error) {
      console.error("Erreur lors du marquage comme lu:", error);
    }
  };

  const sendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une réponse.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("messages")
        .insert([{
          receiver_id: selectedMessage.sender_id,
          product_id: selectedMessage.product_id,
          subject: `Re: ${selectedMessage.subject}`,
          content: replyContent.trim(),
        }]);

      if (error) {
        console.error("Erreur lors de l'envoi de la réponse:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer la réponse.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Réponse envoyée !",
      });

      setReplyContent("");
      fetchMessages();
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Liste des messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} non lu(s)</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Aucun message</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedMessage?.id === message.id ? "bg-muted" : ""
                  } ${!message.is_read ? "border-l-4 border-l-primary" : ""}`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.is_read) {
                      markAsRead(message.id);
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {message.is_read ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Mail className="h-4 w-4 text-primary" />
                      )}
                      <span className={`text-sm ${!message.is_read ? "font-semibold" : ""}`}>
                        {message.subject || "Sans objet"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {message.content}
                  </p>
                  {message.products && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Produit: {message.products.title}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Détail du message */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedMessage ? "Détail du message" : "Sélectionnez un message"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">
                    {selectedMessage.subject || "Sans objet"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm mb-2">{selectedMessage.content}</p>
                {selectedMessage.products && (
                  <div className="text-xs text-muted-foreground border-t pt-2">
                    <strong>Concerne le produit:</strong> {selectedMessage.products.title}
                  </div>
                )}
              </div>

              {/* Formulaire de réponse */}
              <div className="space-y-3">
                <h4 className="font-semibold">Répondre</h4>
                <Textarea
                  placeholder="Votre réponse..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                />
                <Button 
                  onClick={sendReply}
                  disabled={loading || !replyContent.trim()}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? "Envoi..." : "Envoyer la réponse"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Sélectionnez un message pour le lire et y répondre</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesInbox;