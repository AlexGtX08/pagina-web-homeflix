const supabaseClient = supabase.createClient(
  "https://ysynzhjhyklnlxrvrlqi.supabase.co",
  "sb_publishable_d35p-YdLArGM_jbrgUIesw_yUplQJpd"
);

async function getSession() {
  const { data } = await supabaseClient.auth.getSession();
  return data.session;
}

async function getUserRole() {
  const session = await getSession();
  if (!session) return null;

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error) return null;
  return data.role;
}

async function logout() {
  await supabaseClient.auth.signOut();
  location.href = "login.html";
}
export { supabaseClient, getSession, getUserRole, logout };