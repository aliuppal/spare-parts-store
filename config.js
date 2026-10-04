// Public Supabase settings for the storefront. The anon key is meant to be public:
// row-level security in supabase/schema.sql is what stops non-admins from writing.
// Leave both empty to run on the bundled data.js catalog (no sign-in, no admin page).
window.APEX_CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: '',
};
