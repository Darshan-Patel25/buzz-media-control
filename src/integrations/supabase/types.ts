export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      analytics_metrics: {
        Row: {
          created_at: string
          date: string
          engagement_count: number | null
          followers_count: number | null
          id: string
          impressions_count: number | null
          platform: string
          reach_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          engagement_count?: number | null
          followers_count?: number | null
          id?: string
          impressions_count?: number | null
          platform: string
          reach_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          engagement_count?: number | null
          followers_count?: number | null
          id?: string
          impressions_count?: number | null
          platform?: string
          reach_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      oauth_apps: {
        Row: {
          client_id: string
          client_secret: string
          created_at: string
          id: string
          is_active: boolean | null
          platform: string
          redirect_uri: string
          scopes: string[] | null
          updated_at: string
        }
        Insert: {
          client_id: string
          client_secret: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform: string
          redirect_uri: string
          scopes?: string[] | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          client_secret?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform?: string
          redirect_uri?: string
          scopes?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          comments_count: number | null
          content: string
          created_at: string
          files: string[] | null
          id: string
          images: string[] | null
          likes_count: number | null
          platform: string
          published_date: string | null
          reach_count: number | null
          scheduled_date: string | null
          shares_count: number | null
          status: string
          updated_at: string
          user_id: string
          videos: string[] | null
        }
        Insert: {
          comments_count?: number | null
          content: string
          created_at?: string
          files?: string[] | null
          id?: string
          images?: string[] | null
          likes_count?: number | null
          platform: string
          published_date?: string | null
          reach_count?: number | null
          scheduled_date?: string | null
          shares_count?: number | null
          status?: string
          updated_at?: string
          user_id: string
          videos?: string[] | null
        }
        Update: {
          comments_count?: number | null
          content?: string
          created_at?: string
          files?: string[] | null
          id?: string
          images?: string[] | null
          likes_count?: number | null
          platform?: string
          published_date?: string | null
          reach_count?: number | null
          scheduled_date?: string | null
          shares_count?: number | null
          status?: string
          updated_at?: string
          user_id?: string
          videos?: string[] | null
        }
        Relationships: []
      }
      social_accounts: {
        Row: {
          access_token: string | null
          access_token_encrypted: string | null
          account_name: string
          account_username: string
          created_at: string
          followers_count: number | null
          id: string
          is_active: boolean | null
          is_connected: boolean | null
          last_synced_at: string | null
          oauth_state: string | null
          oauth_user_id: string | null
          oauth_username: string | null
          platform: string
          refresh_token: string | null
          refresh_token_encrypted: string | null
          token_expires_at: string | null
          token_salt: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          access_token_encrypted?: string | null
          account_name: string
          account_username: string
          created_at?: string
          followers_count?: number | null
          id?: string
          is_active?: boolean | null
          is_connected?: boolean | null
          last_synced_at?: string | null
          oauth_state?: string | null
          oauth_user_id?: string | null
          oauth_username?: string | null
          platform: string
          refresh_token?: string | null
          refresh_token_encrypted?: string | null
          token_expires_at?: string | null
          token_salt?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          access_token_encrypted?: string | null
          account_name?: string
          account_username?: string
          created_at?: string
          followers_count?: number | null
          id?: string
          is_active?: boolean | null
          is_connected?: boolean | null
          last_synced_at?: string | null
          oauth_state?: string | null
          oauth_user_id?: string | null
          oauth_username?: string | null
          platform?: string
          refresh_token?: string | null
          refresh_token_encrypted?: string | null
          token_expires_at?: string | null
          token_salt?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_account_health: {
        Args: { account_id: string; user_id_param: string }
        Returns: Json
      }
      initiate_oauth_flow: {
        Args: { platform_name: string; user_id_param: string }
        Returns: Json
      }
      update_social_account_status: {
        Args: { account_id: string; new_status: boolean; user_id_param: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
