export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      pdf_extractions: {
        Row: {
          created_at: string | null
          extracted_text: string | null
          file_name: string
          id: string
          original_pdf_path: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          extracted_text?: string | null
          file_name: string
          id?: string
          original_pdf_path: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          extracted_text?: string | null
          file_name?: string
          id?: string
          original_pdf_path?: string
          status?: string | null
        }
        Relationships: []
      }
      plantations: {
        Row: {
          bamboo_area: number | null
          clump_age: number | null
          clump_conditions: string | null
          clump_year: number | null
          created_at: string | null
          distance_to_factory: number | null
          distance_to_road: number | null
          harvest_year: number | null
          id: string
          image_url: string | null
          internode_length: number | null
          land_area: number | null
          landowner_name: string
          location: string | null
          pole_dbh: number | null
          pole_height: number | null
          poles_harvested: number | null
          site_conditions: string | null
          site_status: string | null
          soil_type: string | null
          species_name: string | null
          total_clumps: number | null
          total_poles: number | null
          total_poles_count: number | null
          updated_at: string | null
          wall_thickness: number | null
        }
        Insert: {
          bamboo_area?: number | null
          clump_age?: number | null
          clump_conditions?: string | null
          clump_year?: number | null
          created_at?: string | null
          distance_to_factory?: number | null
          distance_to_road?: number | null
          harvest_year?: number | null
          id: string
          image_url?: string | null
          internode_length?: number | null
          land_area?: number | null
          landowner_name: string
          location?: string | null
          pole_dbh?: number | null
          pole_height?: number | null
          poles_harvested?: number | null
          site_conditions?: string | null
          site_status?: string | null
          soil_type?: string | null
          species_name?: string | null
          total_clumps?: number | null
          total_poles?: number | null
          total_poles_count?: number | null
          updated_at?: string | null
          wall_thickness?: number | null
        }
        Update: {
          bamboo_area?: number | null
          clump_age?: number | null
          clump_conditions?: string | null
          clump_year?: number | null
          created_at?: string | null
          distance_to_factory?: number | null
          distance_to_road?: number | null
          harvest_year?: number | null
          id?: string
          image_url?: string | null
          internode_length?: number | null
          land_area?: number | null
          landowner_name?: string
          location?: string | null
          pole_dbh?: number | null
          pole_height?: number | null
          poles_harvested?: number | null
          site_conditions?: string | null
          site_status?: string | null
          soil_type?: string | null
          species_name?: string | null
          total_clumps?: number | null
          total_poles?: number | null
          total_poles_count?: number | null
          updated_at?: string | null
          wall_thickness?: number | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
