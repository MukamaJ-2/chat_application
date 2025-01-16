import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yxrvcyvqdkhjojchhnrs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cnZjeXZxZGtoam9qY2hobnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDMzMzUsImV4cCI6MjA1MjUxOTMzNX0.pOO7xR9gjUlU9bmT2b_T6yFG-xmWmSkuU5P9arvNd8Y";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;