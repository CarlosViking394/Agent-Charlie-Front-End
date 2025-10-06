// ============================================================================
// VOICE COMMAND TYPES
// ============================================================================

export interface VoiceCommandRequest {
  command: string;
}

export interface VoiceCommandResponse {
  success: boolean;
  action: string;
  intent: string;
  entities: Record<string, any>;
  response: string;
  audioUrl?: string;
  data?: any;
}

export interface TranscriptionResponse {
  success: boolean;
  text: string;
  language?: string;
  duration?: number;
}

export interface SynthesisRequest {
  text: string;
  voiceId?: string;
}

export interface SynthesisResponse {
  success: boolean;
  audioUrl: string;
  text: string;
  voiceId?: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  category?: string;
  description?: string;
  labels?: Record<string, string>;
  preview_url?: string;
}

export interface VoicesResponse {
  success: boolean;
  voices: Voice[];
}

// ============================================================================
// INVENTORY TYPES
// ============================================================================

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  warehouse?: string;
  location?: string;
  min_stock?: number;
  max_stock?: number;
  unit_price?: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInventoryItemRequest {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  warehouse?: string;
  location?: string;
  min_stock?: number;
  max_stock?: number;
  unit_price?: number;
  description?: string;
}

export interface UpdateInventoryItemRequest {
  name?: string;
  sku?: string;
  category?: string;
  quantity?: number;
  warehouse?: string;
  location?: string;
  min_stock?: number;
  max_stock?: number;
  unit_price?: number;
  description?: string;
}

export interface InventoryItemsResponse {
  success: boolean;
  data: InventoryItem[];
  count: number;
}

export interface InventoryItemResponse {
  success: boolean;
  data: InventoryItem;
}

export interface InventoryStats {
  totalItems: number;
  totalQuantity: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  categoryCounts: Record<string, number>;
  warehouseCounts: Record<string, number>;
}

export interface InventoryStatsResponse {
  success: boolean;
  stats: InventoryStats;
}

// ============================================================================
// HEALTH CHECK TYPES
// ============================================================================

export interface HealthCheckResponse {
  success: boolean;
  timestamp: string;
  uptime?: number;
  environment?: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface APIError {
  success: false;
  message: string;
  error?: string;
  code?: string;
  details?: any;
}

// ============================================================================
// GENERIC API RESPONSE
// ============================================================================

export type APIResponse<T> = T | APIError;

