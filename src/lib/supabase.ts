import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    Tables: {
      hs_app_settings: {
        Row: {
          id: string
          pin_hash: string
          updated_at: string
        }
        Insert: {
          id?: string
          pin_hash: string
          updated_at?: string
        }
        Update: {
          id?: string
          pin_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      hs_records: {
        Row: {
          id: string
          record_date: string
          location: string
          course: string
          amount: string
          memo: string
          created_at: string
        }
        Insert: {
          id?: string
          record_date: string
          location?: string
          course?: string
          amount?: string
          memo?: string
          created_at?: string
        }
        Update: {
          id?: string
          record_date?: string
          location?: string
          course?: string
          amount?: string
          memo?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

let supabaseClient: SupabaseClient<Database> | null = null

function getSupabaseUrl() {
  return String(import.meta.env.VITE_SUPABASE_URL ?? '').trim()
}

function getSupabaseAnonKey() {
  return String(import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey())
}

export function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = getSupabaseUrl()
  const supabaseAnonKey = getSupabaseAnonKey()

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase 환경 변수가 설정되지 않았어요.')
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return supabaseClient
}
