export interface Product {
  id: number;
  sku: string;
  name: string;
  barcode?: string | null;
  category?: string | null;
  cost: string;
  sales_price: string;
  is_active: boolean;
}

export interface Location {
  id: number;
  code: string;
  name: string;
}

export type MoveType = "INBOUND" | "OUTBOUND" | "TRANSFER";

export interface StockMove {
  id: number;
  type: MoveType;
  product: number;
  product_sku?: string;   
  qty: string;
  from_location?: number | null;
  from_code?: string | null; 
  to_location?: number | null;
  to_code?: string | null;  
  timestamp: string;
  created_at: string;
}

export interface InventoryLevel {
  id: number;
  product: number;
  product_sku: string;
  location: number;
  location_code: string;
  on_hand: string;
}

export interface StockMoveLine {
  id?: number;
  product: number;
  product_sku?: string;
  qty: string;
}

export interface StockMoveBatch {
  id: number;
  type: MoveType;
  from_location?: number | null;
  from_code?: string | null; 
  to_location?: number | null;
  to_code?: string | null;  
  timestamp: string;
  created_at: string;
  lines: StockMoveLine[];
}
