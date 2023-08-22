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
          type: Database["public"]["Enums"]["attraction_type"] | null
        }
        Insert: {
          age_from?: number
          age_to?: number
          created_at?: string
          id?: number
          name: string
          spot_id: number
          type?: Database["public"]["Enums"]["attraction_type"] | null
        }
        Update: {
          age_from?: number
          age_to?: number
          created_at?: string
          id?: number
          name?: string
          spot_id?: number
          type?: Database["public"]["Enums"]["attraction_type"] | null
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
      spot_proposals: {
        Row: {
          created_at: string
          data: Json
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data: Json
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spot_proposals_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      spots: {
        Row: {
          created_at: string
          google_maps_url: string | null
          has_restaurant: boolean
          has_toilet: boolean
          id: number
          lat: number
          lon: number
          name: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          google_maps_url?: string | null
          has_restaurant?: boolean
          has_toilet?: boolean
          id?: number
          lat: number
          lon: number
          name: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          google_maps_url?: string | null
          has_restaurant?: boolean
          has_toilet?: boolean
          id?: number
          lat?: number
          lon?: number
          name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      attraction_type: "playground" | "trampoline_park" | "parkour" | "swimming"
      user_role: "spots_moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
