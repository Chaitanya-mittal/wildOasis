import supabase from "./supabase";

export async function loginUser({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error();
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error);
  }

  return data?.user;
}
