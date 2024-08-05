export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
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
  public: {
    Tables: {
      exercise: {
        Row: {
          body_part: string
          created_at: string | null
          equipment: string
          exercise_id: string
          instructions: string[] | null
          name: string
          secondary_muscles: string[] | null
          target: string
          updated_at: string | null
        }
        Insert: {
          body_part: string
          created_at?: string | null
          equipment: string
          exercise_id?: string
          instructions?: string[] | null
          name: string
          secondary_muscles?: string[] | null
          target: string
          updated_at?: string | null
        }
        Update: {
          body_part?: string
          created_at?: string | null
          equipment?: string
          exercise_id?: string
          instructions?: string[] | null
          name?: string
          secondary_muscles?: string[] | null
          target?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          created_at: string
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_entity: {
        Row: {
          author_profile_id: string | null
          created_at: string
          notes: string | null
          profile_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_profile_id?: string | null
          created_at?: string
          notes?: string | null
          profile_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_profile_id?: string | null
          created_at?: string
          notes?: string | null
          profile_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_entity_author_profile_id_fkey"
            columns: ["author_profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "workout_entity_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      workout_exercise_entity: {
        Row: {
          exercise_id: string | null
          index: number | null
        }
        Insert: {
          exercise_id?: string | null
          index?: number | null
        }
        Update: {
          exercise_id?: string | null
          index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercise_entity_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["exercise_id"]
          },
        ]
      }
      workout_exercise_set_entity: {
        Row: {
          index: number | null
          reps: number
          type: Database["public"]["Enums"]["set_type"]
          weight: number
        }
        Insert: {
          index?: number | null
          reps: number
          type?: Database["public"]["Enums"]["set_type"]
          weight: number
        }
        Update: {
          index?: number | null
          reps?: number
          type?: Database["public"]["Enums"]["set_type"]
          weight?: number
        }
        Relationships: []
      }
      workout_log: {
        Row: {
          author_profile_id: string | null
          created_at: string
          notes: string | null
          profile_id: string
          title: string
          updated_at: string
          workout_log_id: string
          workout_template_id: string | null
        }
        Insert: {
          author_profile_id?: string | null
          created_at?: string
          notes?: string | null
          profile_id: string
          title: string
          updated_at?: string
          workout_log_id?: string
          workout_template_id?: string | null
        }
        Update: {
          author_profile_id?: string | null
          created_at?: string
          notes?: string | null
          profile_id?: string
          title?: string
          updated_at?: string
          workout_log_id?: string
          workout_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_log_author_profile_id_fkey"
            columns: ["author_profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "workout_log_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "workout_log_workout_template_id_fkey"
            columns: ["workout_template_id"]
            isOneToOne: false
            referencedRelation: "workout_template"
            referencedColumns: ["workout_template_id"]
          },
        ]
      }
      workout_log_exercise: {
        Row: {
          exercise_id: string
          index: number
          workout_log_exercise_id: string
          workout_log_id: string
        }
        Insert: {
          exercise_id: string
          index: number
          workout_log_exercise_id?: string
          workout_log_id: string
        }
        Update: {
          exercise_id?: string
          index?: number
          workout_log_exercise_id?: string
          workout_log_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_log_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["exercise_id"]
          },
          {
            foreignKeyName: "workout_log_exercise_workout_log_id_fkey"
            columns: ["workout_log_id"]
            isOneToOne: false
            referencedRelation: "workout_log"
            referencedColumns: ["workout_log_id"]
          },
        ]
      }
      workout_log_exercise_set: {
        Row: {
          index: number
          reps: number
          type: Database["public"]["Enums"]["set_type"]
          weight: number
          workout_log_exercise_id: string
        }
        Insert: {
          index: number
          reps: number
          type?: Database["public"]["Enums"]["set_type"]
          weight: number
          workout_log_exercise_id: string
        }
        Update: {
          index?: number
          reps?: number
          type?: Database["public"]["Enums"]["set_type"]
          weight?: number
          workout_log_exercise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_log_exercise_set_workout_log_exercise_id_fkey"
            columns: ["workout_log_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_log_exercise"
            referencedColumns: ["workout_log_exercise_id"]
          },
        ]
      }
      workout_template: {
        Row: {
          author_profile_id: string | null
          created_at: string
          last_performed: string | null
          notes: string | null
          profile_id: string
          title: string
          updated_at: string
          workout_template_id: string
        }
        Insert: {
          author_profile_id?: string | null
          created_at?: string
          last_performed?: string | null
          notes?: string | null
          profile_id: string
          title: string
          updated_at?: string
          workout_template_id?: string
        }
        Update: {
          author_profile_id?: string | null
          created_at?: string
          last_performed?: string | null
          notes?: string | null
          profile_id?: string
          title?: string
          updated_at?: string
          workout_template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_template_author_profile_id_fkey"
            columns: ["author_profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "workout_template_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      workout_template_exercise: {
        Row: {
          exercise_id: string
          index: number
          workout_template_exercise_id: string
          workout_template_id: string
        }
        Insert: {
          exercise_id: string
          index: number
          workout_template_exercise_id?: string
          workout_template_id: string
        }
        Update: {
          exercise_id?: string
          index?: number
          workout_template_exercise_id?: string
          workout_template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_template_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["exercise_id"]
          },
          {
            foreignKeyName: "workout_template_exercise_workout_template_id_fkey"
            columns: ["workout_template_id"]
            isOneToOne: false
            referencedRelation: "workout_template"
            referencedColumns: ["workout_template_id"]
          },
        ]
      }
      workout_template_exercise_set: {
        Row: {
          index: number
          reps: number
          type: Database["public"]["Enums"]["set_type"]
          weight: number
          workout_template_exercise_id: string
        }
        Insert: {
          index: number
          reps: number
          type?: Database["public"]["Enums"]["set_type"]
          weight: number
          workout_template_exercise_id: string
        }
        Update: {
          index?: number
          reps?: number
          type?: Database["public"]["Enums"]["set_type"]
          weight?: number
          workout_template_exercise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_template_exercise_set_workout_template_exercise_id_fkey"
            columns: ["workout_template_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_template_exercise"
            referencedColumns: ["workout_template_exercise_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      upsert_workout: {
        Args: {
          payload: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      set_type: "Standard" | "Warmup" | "Drop set"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
