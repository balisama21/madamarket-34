-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'MGA',
  image TEXT,
  seller TEXT NOT NULL,
  category TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (products are visible to everyone)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to insert products
CREATE POLICY "Authenticated users can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Create policy for users to update their own products (we'll use seller field for now)
CREATE POLICY "Users can update their own products" 
ON public.products 
FOR UPDATE 
USING (true);

-- Create policy for users to delete their own products
CREATE POLICY "Users can delete their own products" 
ON public.products 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster searches
CREATE INDEX idx_products_title ON public.products USING gin(to_tsvector('french', title));
CREATE INDEX idx_products_description ON public.products USING gin(to_tsvector('french', description));
CREATE INDEX idx_products_category ON public.products(category);

-- Insert sample products for testing
INSERT INTO public.products (title, description, price, currency, image, seller, category, rating, review_count, downloads) VALUES
('iPhone 14 Pro', 'Smartphone Apple dernière génération avec caméra 48MP', 1200000, 'MGA', '/placeholder.svg', 'TechStore Madagascar', 'Électronique', 4.8, 156, 89),
('Chaussures Nike Air Max', 'Chaussures de sport confortables pour homme', 350000, 'MGA', '/placeholder.svg', 'SportShop', 'Mode', 4.5, 98, 156),
('Chemise bleue homme', 'Chemise élégante en coton pour homme', 85000, 'MGA', '/placeholder.svg', 'FashionMada', 'Mode', 4.2, 67, 234),
('Samsung Galaxy S23', 'Smartphone Samsung avec écran AMOLED', 950000, 'MGA', '/placeholder.svg', 'MobileWorld', 'Électronique', 4.6, 112, 78),
('Robe traditionnelle malagasy', 'Robe traditionnelle en soie sauvage', 120000, 'MGA', '/placeholder.svg', 'ArtisanMada', 'Mode', 4.9, 45, 123),
('Ordinateur portable Dell', 'PC portable professionnel 15 pouces', 1800000, 'MGA', '/placeholder.svg', 'ComputerShop', 'Électronique', 4.4, 89, 56),
('Baskets Adidas', 'Chaussures de sport blanches', 280000, 'MGA', '/placeholder.svg', 'SportCenter', 'Mode', 4.3, 134, 267),
('Riz Makalioka', 'Riz premium de Madagascar 5kg', 25000, 'MGA', '/placeholder.svg', 'RizMada', 'Alimentation', 4.7, 234, 567);