


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "private";


ALTER SCHEMA "private" OWNER TO "postgres";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "private"."can_access_project"("project_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.projects p
        JOIN public.organization_members om
            ON om.organization_id = p.organization_id
        JOIN public.users u
            ON u.id = om.user_id
        WHERE p.id = project_id
          AND u.auth_user_id = (SELECT auth.uid())
    );
$$;


ALTER FUNCTION "private"."can_access_project"("project_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "private"."is_org_member"("org_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.organization_members om
        JOIN public.users u
            ON u.id = om.user_id
        WHERE om.organization_id = org_id
          AND u.auth_user_id = (SELECT auth.uid())
    );
$$;


ALTER FUNCTION "private"."is_org_member"("org_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "private"."is_org_owner"("org_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.organization_members om
        JOIN public.users u
            ON u.id = om.user_id
        WHERE om.organization_id = org_id
          AND om.role = 'owner'
          AND u.auth_user_id = (SELECT auth.uid())
    );
$$;


ALTER FUNCTION "private"."is_org_owner"("org_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."alembic_version" (
    "version_num" character varying(32) NOT NULL
);


ALTER TABLE "public"."alembic_version" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."analysis_runs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "document_id" "uuid",
    "requested_by" "uuid",
    "run_type" character varying(30) DEFAULT 'document'::character varying NOT NULL,
    "model_provider" character varying(50),
    "model_name" character varying(100),
    "prompt_version" character varying(50),
    "total_records" integer DEFAULT 0 NOT NULL,
    "processed_records" integer DEFAULT 0 NOT NULL,
    "failed_records" integer DEFAULT 0 NOT NULL,
    "status" character varying(30) DEFAULT 'queued'::character varying NOT NULL,
    "error_message" "text",
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "analysis_runs_run_type_check" CHECK ((("run_type")::"text" = ANY ((ARRAY['document'::character varying, 'project'::character varying])::"text"[]))),
    CONSTRAINT "analysis_runs_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['queued'::character varying, 'running'::character varying, 'completed'::character varying, 'partially_completed'::character varying, 'failed'::character varying, 'cancelled'::character varying])::"text"[])))
);


ALTER TABLE "public"."analysis_runs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."document_import_jobs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "document_id" "uuid" NOT NULL,
    "requested_by" "uuid",
    "status" character varying(30) DEFAULT 'queued'::character varying NOT NULL,
    "total_rows" integer DEFAULT 0 NOT NULL,
    "imported_rows" integer DEFAULT 0 NOT NULL,
    "skipped_rows" integer DEFAULT 0 NOT NULL,
    "failed_rows" integer DEFAULT 0 NOT NULL,
    "error_details" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "attempts" integer DEFAULT 0 NOT NULL,
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "document_import_jobs_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['queued'::character varying, 'processing'::character varying, 'completed'::character varying, 'partially_completed'::character varying, 'failed'::character varying, 'cancelled'::character varying])::"text"[])))
);


ALTER TABLE "public"."document_import_jobs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."documents" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "uploaded_by" "uuid",
    "name" character varying(255) NOT NULL,
    "original_filename" character varying(255) NOT NULL,
    "file_type" character varying(20) NOT NULL,
    "storage_path" "text" NOT NULL,
    "file_size_bytes" bigint,
    "checksum" character varying(128),
    "total_records" integer DEFAULT 0 NOT NULL,
    "processed_records" integer DEFAULT 0 NOT NULL,
    "failed_records" integer DEFAULT 0 NOT NULL,
    "status" character varying(30) DEFAULT 'uploaded'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "documents_file_type_check" CHECK ((("file_type")::"text" = ANY ((ARRAY['csv'::character varying, 'xlsx'::character varying, 'xls'::character varying])::"text"[]))),
    CONSTRAINT "documents_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['uploaded'::character varying, 'validating'::character varying, 'processing'::character varying, 'completed'::character varying, 'partially_completed'::character varying, 'failed'::character varying])::"text"[])))
);


ALTER TABLE "public"."documents" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."feedback_analyses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "feedback_record_id" "uuid" NOT NULL,
    "analysis_run_id" "uuid" NOT NULL,
    "sentiment" character varying(20) NOT NULL,
    "sentiment_score" numeric(5,4),
    "topics" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "positives" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "negatives" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "improvements" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "suggestions" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "summary" "text",
    "raw_output" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "feedback_analyses_sentiment_check" CHECK ((("sentiment")::"text" = ANY ((ARRAY['positive'::character varying, 'negative'::character varying, 'neutral'::character varying, 'mixed'::character varying])::"text"[]))),
    CONSTRAINT "feedback_analyses_sentiment_score_check" CHECK ((("sentiment_score" IS NULL) OR (("sentiment_score" >= (0)::numeric) AND ("sentiment_score" <= (1)::numeric))))
);


ALTER TABLE "public"."feedback_analyses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."feedback_records" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "document_id" "uuid" NOT NULL,
    "row_number" integer NOT NULL,
    "external_id" character varying(255),
    "feedback_text" "text" NOT NULL,
    "customer_id" character varying(255),
    "customer_name" character varying(255),
    "rating" numeric(3,2),
    "feedback_date" timestamp with time zone,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."feedback_records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organization_members" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "organization_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role" character varying(20) DEFAULT 'owner'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "organization_members_role_check" CHECK ((("role")::"text" = 'owner'::"text"))
);


ALTER TABLE "public"."organization_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(150) NOT NULL,
    "slug" character varying(150) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."organizations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project_analysis_summaries" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "analysis_run_id" "uuid" NOT NULL,
    "total_feedback" integer DEFAULT 0 NOT NULL,
    "positive_count" integer DEFAULT 0 NOT NULL,
    "negative_count" integer DEFAULT 0 NOT NULL,
    "neutral_count" integer DEFAULT 0 NOT NULL,
    "mixed_count" integer DEFAULT 0 NOT NULL,
    "average_rating" numeric(4,2),
    "sentiment_distribution" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "top_topics" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "common_positives" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "common_negatives" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "improvement_suggestions" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "executive_summary" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."project_analysis_summaries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "organization_id" "uuid" NOT NULL,
    "name" character varying(150) NOT NULL,
    "description" "text",
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."projects" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."recommendation_evidence" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recommendation_id" "uuid" NOT NULL,
    "feedback_record_id" "uuid" NOT NULL,
    "feedback_analysis_id" "uuid",
    "evidence_type" character varying(20) NOT NULL,
    "relevance_score" numeric(5,4),
    "rationale" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "recommendation_evidence_evidence_type_check" CHECK ((("evidence_type")::"text" = ANY ((ARRAY['supporting'::character varying, 'contradicting'::character varying, 'contextual'::character varying])::"text"[]))),
    CONSTRAINT "recommendation_evidence_relevance_score_check" CHECK ((("relevance_score" IS NULL) OR (("relevance_score" >= (0)::numeric) AND ("relevance_score" <= (1)::numeric))))
);


ALTER TABLE "public"."recommendation_evidence" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."recommendations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "analysis_run_id" "uuid" NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text" NOT NULL,
    "category" character varying(100),
    "priority" character varying(20),
    "status" character varying(20) DEFAULT 'open'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "recommendations_priority_check" CHECK ((("priority" IS NULL) OR (("priority")::"text" = ANY ((ARRAY['low'::character varying, 'medium'::character varying, 'high'::character varying, 'critical'::character varying])::"text"[])))),
    CONSTRAINT "recommendations_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['open'::character varying, 'accepted'::character varying, 'rejected'::character varying, 'implemented'::character varying, 'archived'::character varying])::"text"[])))
);


ALTER TABLE "public"."recommendations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "auth_user_id" "uuid" NOT NULL,
    "full_name" character varying(150),
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."alembic_version"
    ADD CONSTRAINT "alembic_version_pkc" PRIMARY KEY ("version_num");



ALTER TABLE ONLY "public"."analysis_runs"
    ADD CONSTRAINT "analysis_runs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."document_import_jobs"
    ADD CONSTRAINT "document_import_jobs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."feedback_analyses"
    ADD CONSTRAINT "feedback_analyses_feedback_record_id_analysis_run_id_key" UNIQUE ("feedback_record_id", "analysis_run_id");



ALTER TABLE ONLY "public"."feedback_analyses"
    ADD CONSTRAINT "feedback_analyses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."feedback_records"
    ADD CONSTRAINT "feedback_records_document_id_row_number_key" UNIQUE ("document_id", "row_number");



ALTER TABLE ONLY "public"."feedback_records"
    ADD CONSTRAINT "feedback_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organization_members"
    ADD CONSTRAINT "organization_members_organization_id_user_id_key" UNIQUE ("organization_id", "user_id");



ALTER TABLE ONLY "public"."organization_members"
    ADD CONSTRAINT "organization_members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."project_analysis_summaries"
    ADD CONSTRAINT "project_analysis_summaries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_analysis_summaries"
    ADD CONSTRAINT "project_analysis_summaries_project_id_analysis_run_id_key" UNIQUE ("project_id", "analysis_run_id");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."recommendation_evidence"
    ADD CONSTRAINT "recommendation_evidence_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."recommendation_evidence"
    ADD CONSTRAINT "recommendation_evidence_recommendation_id_feedback_record_i_key" UNIQUE ("recommendation_id", "feedback_record_id");



ALTER TABLE ONLY "public"."recommendations"
    ADD CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_auth_user_id_key" UNIQUE ("auth_user_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_analysis_runs_document_id" ON "public"."analysis_runs" USING "btree" ("document_id");



CREATE INDEX "idx_analysis_runs_project_id" ON "public"."analysis_runs" USING "btree" ("project_id");



CREATE INDEX "idx_analysis_runs_status" ON "public"."analysis_runs" USING "btree" ("status");



CREATE INDEX "idx_documents_project_id" ON "public"."documents" USING "btree" ("project_id");



CREATE INDEX "idx_documents_uploaded_by" ON "public"."documents" USING "btree" ("uploaded_by");



CREATE INDEX "idx_feedback_analyses_record_id" ON "public"."feedback_analyses" USING "btree" ("feedback_record_id");



CREATE INDEX "idx_feedback_analyses_run_id" ON "public"."feedback_analyses" USING "btree" ("analysis_run_id");



CREATE INDEX "idx_feedback_analyses_sentiment" ON "public"."feedback_analyses" USING "btree" ("sentiment");



CREATE INDEX "idx_feedback_records_document_id" ON "public"."feedback_records" USING "btree" ("document_id");



CREATE INDEX "idx_feedback_records_external_id" ON "public"."feedback_records" USING "btree" ("external_id");



CREATE INDEX "idx_import_jobs_document_id" ON "public"."document_import_jobs" USING "btree" ("document_id");



CREATE INDEX "idx_import_jobs_status" ON "public"."document_import_jobs" USING "btree" ("status");



CREATE INDEX "idx_organization_members_organization_id" ON "public"."organization_members" USING "btree" ("organization_id");



CREATE INDEX "idx_organization_members_user_id" ON "public"."organization_members" USING "btree" ("user_id");



CREATE INDEX "idx_project_summaries_analysis_run_id" ON "public"."project_analysis_summaries" USING "btree" ("analysis_run_id");



CREATE INDEX "idx_project_summaries_project_id" ON "public"."project_analysis_summaries" USING "btree" ("project_id");



CREATE INDEX "idx_projects_created_by" ON "public"."projects" USING "btree" ("created_by");



CREATE INDEX "idx_projects_organization_id" ON "public"."projects" USING "btree" ("organization_id");



CREATE INDEX "idx_recommendation_evidence_analysis_id" ON "public"."recommendation_evidence" USING "btree" ("feedback_analysis_id");



CREATE INDEX "idx_recommendation_evidence_feedback_record_id" ON "public"."recommendation_evidence" USING "btree" ("feedback_record_id");



CREATE INDEX "idx_recommendation_evidence_recommendation_id" ON "public"."recommendation_evidence" USING "btree" ("recommendation_id");



CREATE INDEX "idx_recommendations_analysis_run_id" ON "public"."recommendations" USING "btree" ("analysis_run_id");



CREATE INDEX "idx_recommendations_project_id" ON "public"."recommendations" USING "btree" ("project_id");



CREATE INDEX "idx_recommendations_status" ON "public"."recommendations" USING "btree" ("status");



CREATE UNIQUE INDEX "one_owner_per_organization" ON "public"."organization_members" USING "btree" ("organization_id") WHERE (("role")::"text" = 'owner'::"text");



ALTER TABLE ONLY "public"."analysis_runs"
    ADD CONSTRAINT "analysis_runs_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."analysis_runs"
    ADD CONSTRAINT "analysis_runs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."analysis_runs"
    ADD CONSTRAINT "analysis_runs_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."document_import_jobs"
    ADD CONSTRAINT "document_import_jobs_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."document_import_jobs"
    ADD CONSTRAINT "document_import_jobs_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."feedback_analyses"
    ADD CONSTRAINT "feedback_analyses_analysis_run_id_fkey" FOREIGN KEY ("analysis_run_id") REFERENCES "public"."analysis_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."feedback_analyses"
    ADD CONSTRAINT "feedback_analyses_feedback_record_id_fkey" FOREIGN KEY ("feedback_record_id") REFERENCES "public"."feedback_records"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."feedback_records"
    ADD CONSTRAINT "feedback_records_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."organization_members"
    ADD CONSTRAINT "organization_members_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."organization_members"
    ADD CONSTRAINT "organization_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_analysis_summaries"
    ADD CONSTRAINT "project_analysis_summaries_analysis_run_id_fkey" FOREIGN KEY ("analysis_run_id") REFERENCES "public"."analysis_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_analysis_summaries"
    ADD CONSTRAINT "project_analysis_summaries_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recommendation_evidence"
    ADD CONSTRAINT "recommendation_evidence_feedback_analysis_id_fkey" FOREIGN KEY ("feedback_analysis_id") REFERENCES "public"."feedback_analyses"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."recommendation_evidence"
    ADD CONSTRAINT "recommendation_evidence_feedback_record_id_fkey" FOREIGN KEY ("feedback_record_id") REFERENCES "public"."feedback_records"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recommendation_evidence"
    ADD CONSTRAINT "recommendation_evidence_recommendation_id_fkey" FOREIGN KEY ("recommendation_id") REFERENCES "public"."recommendations"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recommendations"
    ADD CONSTRAINT "recommendations_analysis_run_id_fkey" FOREIGN KEY ("analysis_run_id") REFERENCES "public"."analysis_runs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recommendations"
    ADD CONSTRAINT "recommendations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Members can view analysis runs" ON "public"."analysis_runs" FOR SELECT TO "authenticated" USING (( SELECT "private"."can_access_project"("analysis_runs"."project_id") AS "can_access_project"));



CREATE POLICY "Members can view documents" ON "public"."documents" FOR SELECT TO "authenticated" USING (( SELECT "private"."can_access_project"("documents"."project_id") AS "can_access_project"));



CREATE POLICY "Members can view feedback analyses" ON "public"."feedback_analyses" FOR SELECT TO "authenticated" USING (( SELECT "private"."can_access_project"(( SELECT "d"."project_id"
           FROM ("public"."feedback_records" "fr"
             JOIN "public"."documents" "d" ON (("d"."id" = "fr"."document_id")))
          WHERE ("fr"."id" = "feedback_analyses"."feedback_record_id"))) AS "can_access_project"));



CREATE POLICY "Members can view feedback records" ON "public"."feedback_records" FOR SELECT TO "authenticated" USING (( SELECT "private"."can_access_project"(( SELECT "d"."project_id"
           FROM "public"."documents" "d"
          WHERE ("d"."id" = "feedback_records"."document_id"))) AS "can_access_project"));



CREATE POLICY "Members can view import jobs" ON "public"."document_import_jobs" FOR SELECT TO "authenticated" USING (( SELECT "private"."can_access_project"(( SELECT "d"."project_id"
           FROM "public"."documents" "d"
          WHERE ("d"."id" = "document_import_jobs"."document_id"))) AS "can_access_project"));



CREATE POLICY "Members can view project summaries" ON "public"."project_analysis_summaries" FOR SELECT TO "authenticated" USING (( SELECT "private"."can_access_project"("project_analysis_summaries"."project_id") AS "can_access_project"));



CREATE POLICY "Members can view projects" ON "public"."projects" FOR SELECT TO "authenticated" USING (( SELECT "private"."is_org_member"("projects"."organization_id") AS "is_org_member"));



CREATE POLICY "Members can view recommendation evidence" ON "public"."recommendation_evidence" FOR SELECT TO "authenticated" USING (( SELECT "private"."can_access_project"(( SELECT "r"."project_id"
           FROM "public"."recommendations" "r"
          WHERE ("r"."id" = "recommendation_evidence"."recommendation_id"))) AS "can_access_project"));



CREATE POLICY "Members can view recommendations" ON "public"."recommendations" FOR SELECT TO "authenticated" USING (( SELECT "private"."can_access_project"("recommendations"."project_id") AS "can_access_project"));



CREATE POLICY "Members can view their organization" ON "public"."organizations" FOR SELECT TO "authenticated" USING (( SELECT "private"."is_org_member"("organizations"."id") AS "is_org_member"));



CREATE POLICY "Owners can add organization members" ON "public"."organization_members" FOR INSERT TO "authenticated" WITH CHECK (( SELECT "private"."is_org_owner"("organization_members"."organization_id") AS "is_org_owner"));



CREATE POLICY "Owners can create documents" ON "public"."documents" FOR INSERT TO "authenticated" WITH CHECK (( SELECT "private"."is_org_owner"(( SELECT "p"."organization_id"
           FROM "public"."projects" "p"
          WHERE ("p"."id" = "documents"."project_id"))) AS "is_org_owner"));



CREATE POLICY "Owners can create projects" ON "public"."projects" FOR INSERT TO "authenticated" WITH CHECK (( SELECT "private"."is_org_owner"("projects"."organization_id") AS "is_org_owner"));



CREATE POLICY "Owners can delete documents" ON "public"."documents" FOR DELETE TO "authenticated" USING (( SELECT "private"."is_org_owner"(( SELECT "p"."organization_id"
           FROM "public"."projects" "p"
          WHERE ("p"."id" = "documents"."project_id"))) AS "is_org_owner"));



CREATE POLICY "Owners can delete projects" ON "public"."projects" FOR DELETE TO "authenticated" USING (( SELECT "private"."is_org_owner"("projects"."organization_id") AS "is_org_owner"));



CREATE POLICY "Owners can remove organization members" ON "public"."organization_members" FOR DELETE TO "authenticated" USING (( SELECT "private"."is_org_owner"("organization_members"."organization_id") AS "is_org_owner"));



CREATE POLICY "Owners can update documents" ON "public"."documents" FOR UPDATE TO "authenticated" USING (( SELECT "private"."is_org_owner"(( SELECT "p"."organization_id"
           FROM "public"."projects" "p"
          WHERE ("p"."id" = "documents"."project_id"))) AS "is_org_owner")) WITH CHECK (( SELECT "private"."is_org_owner"(( SELECT "p"."organization_id"
           FROM "public"."projects" "p"
          WHERE ("p"."id" = "documents"."project_id"))) AS "is_org_owner"));



CREATE POLICY "Owners can update organization members" ON "public"."organization_members" FOR UPDATE TO "authenticated" USING (( SELECT "private"."is_org_owner"("organization_members"."organization_id") AS "is_org_owner")) WITH CHECK (( SELECT "private"."is_org_owner"("organization_members"."organization_id") AS "is_org_owner"));



CREATE POLICY "Owners can update projects" ON "public"."projects" FOR UPDATE TO "authenticated" USING (( SELECT "private"."is_org_owner"("projects"."organization_id") AS "is_org_owner")) WITH CHECK (( SELECT "private"."is_org_owner"("projects"."organization_id") AS "is_org_owner"));



CREATE POLICY "Owners can update recommendations" ON "public"."recommendations" FOR UPDATE TO "authenticated" USING (( SELECT "private"."is_org_owner"(( SELECT "p"."organization_id"
           FROM "public"."projects" "p"
          WHERE ("p"."id" = "recommendations"."project_id"))) AS "is_org_owner")) WITH CHECK (( SELECT "private"."is_org_owner"(( SELECT "p"."organization_id"
           FROM "public"."projects" "p"
          WHERE ("p"."id" = "recommendations"."project_id"))) AS "is_org_owner"));



CREATE POLICY "Owners can update their organization" ON "public"."organizations" FOR UPDATE TO "authenticated" USING (( SELECT "private"."is_org_owner"("organizations"."id") AS "is_org_owner")) WITH CHECK (( SELECT "private"."is_org_owner"("organizations"."id") AS "is_org_owner"));



CREATE POLICY "Owners can view organization members" ON "public"."organization_members" FOR SELECT TO "authenticated" USING (( SELECT "private"."is_org_owner"("organization_members"."organization_id") AS "is_org_owner"));



CREATE POLICY "Owners can view organization users" ON "public"."users" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."organization_members" "om"
  WHERE (("om"."user_id" = "users"."id") AND ( SELECT "private"."is_org_owner"("om"."organization_id") AS "is_org_owner")))));



CREATE POLICY "Users can update their own profile" ON "public"."users" FOR UPDATE TO "authenticated" USING (("auth_user_id" = ( SELECT "auth"."uid"() AS "uid"))) WITH CHECK (("auth_user_id" = ( SELECT "auth"."uid"() AS "uid")));



ALTER TABLE "public"."analysis_runs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."document_import_jobs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."documents" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."feedback_analyses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."feedback_records" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."organization_members" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project_analysis_summaries" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."recommendation_evidence" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."recommendations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































REVOKE ALL ON FUNCTION "private"."can_access_project"("project_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "private"."can_access_project"("project_id" "uuid") TO "authenticated";



REVOKE ALL ON FUNCTION "private"."is_org_member"("org_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "private"."is_org_member"("org_id" "uuid") TO "authenticated";



REVOKE ALL ON FUNCTION "private"."is_org_owner"("org_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "private"."is_org_owner"("org_id" "uuid") TO "authenticated";


















GRANT ALL ON TABLE "public"."alembic_version" TO "anon";
GRANT ALL ON TABLE "public"."alembic_version" TO "authenticated";
GRANT ALL ON TABLE "public"."alembic_version" TO "service_role";



GRANT ALL ON TABLE "public"."analysis_runs" TO "anon";
GRANT ALL ON TABLE "public"."analysis_runs" TO "authenticated";
GRANT ALL ON TABLE "public"."analysis_runs" TO "service_role";



GRANT ALL ON TABLE "public"."document_import_jobs" TO "anon";
GRANT ALL ON TABLE "public"."document_import_jobs" TO "authenticated";
GRANT ALL ON TABLE "public"."document_import_jobs" TO "service_role";



GRANT ALL ON TABLE "public"."documents" TO "anon";
GRANT ALL ON TABLE "public"."documents" TO "authenticated";
GRANT ALL ON TABLE "public"."documents" TO "service_role";



GRANT ALL ON TABLE "public"."feedback_analyses" TO "anon";
GRANT ALL ON TABLE "public"."feedback_analyses" TO "authenticated";
GRANT ALL ON TABLE "public"."feedback_analyses" TO "service_role";



GRANT ALL ON TABLE "public"."feedback_records" TO "anon";
GRANT ALL ON TABLE "public"."feedback_records" TO "authenticated";
GRANT ALL ON TABLE "public"."feedback_records" TO "service_role";



GRANT ALL ON TABLE "public"."organization_members" TO "anon";
GRANT ALL ON TABLE "public"."organization_members" TO "authenticated";
GRANT ALL ON TABLE "public"."organization_members" TO "service_role";



GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";



GRANT ALL ON TABLE "public"."project_analysis_summaries" TO "anon";
GRANT ALL ON TABLE "public"."project_analysis_summaries" TO "authenticated";
GRANT ALL ON TABLE "public"."project_analysis_summaries" TO "service_role";



GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";



GRANT ALL ON TABLE "public"."recommendation_evidence" TO "anon";
GRANT ALL ON TABLE "public"."recommendation_evidence" TO "authenticated";
GRANT ALL ON TABLE "public"."recommendation_evidence" TO "service_role";



GRANT ALL ON TABLE "public"."recommendations" TO "anon";
GRANT ALL ON TABLE "public"."recommendations" TO "authenticated";
GRANT ALL ON TABLE "public"."recommendations" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































