export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      spot_attractions: {
        Row: {
          age_from: number
          age_to: number
          created_at: string
          id: number
          name: string
          spot_id: number
        }
        Insert: {
          age_from?: number
          age_to?: number
          created_at?: string
          id?: number
          name: string
          spot_id: number
        }
        Update: {
          age_from?: number
          age_to?: number
          created_at?: string
          id?: number
          name?: string
          spot_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "spot_attractions_spot_id_fkey"
            columns: ["spot_id"]
            referencedRelation: "spots"
            referencedColumns: ["id"]
          }
        ]
      }
      spots: {
        Row: {
          created_at: string
          has_restaurant: boolean
          has_toilet: boolean
          id: number
          lat: number
          lon: number
          name: string
        }
        Insert: {
          created_at?: string
          has_restaurant?: boolean
          has_toilet?: boolean
          id?: number
          lat: number
          lon: number
          name: string
        }
        Update: {
          created_at?: string
          has_restaurant?: boolean
          has_toilet?: boolean
          id?: number
          lat?: number
          lon?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
