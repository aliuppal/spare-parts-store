// Public Supabase settings for the storefront. The anon key is meant to be public:
// row-level security in supabase/schema.sql is what stops non-admins from writing.
// Leave both empty to run on the bundled data.js catalog (no sign-in, no admin page).
window.APEX_CONFIG = {
  supabaseUrl: 'https://wetpegdtltntseilavey.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldHBlZ2R0bHRudHNlaWxhdmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMTM4NTUsImV4cCI6MjEwNjY4OTg1NX0.6DJyyIPvmjEJwt_iw4-T6NDvAxFERoTyY0GseZdZqvg',
};
