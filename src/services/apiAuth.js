import supabase from "./supabase";

export async function signupUser({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  console.log(error);

  if (error) {
    throw new Error(error);
  }
  return data;
}

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

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return true;
}

export async function updateUserFunc({ fullName, password, avatar }) {
  let updateUser;
  if (password) {
    updateUser = { password };
  }
  if (fullName) {
    updateUser = {
      data: {
        fullName,
      },
    };
  }

  // 1. check whether user details or password
  // 2. if avatar , upload , update user

  const { data, error } = await supabase.auth.updateUser(updateUser);

  if (error) {
    throw new Error(error);
  }

  if (!avatar) {
    return data;
  }

  // upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { data: avatarFile, error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError);
  }

  const { data: finalUser, error: updatingAvatar } =
    await supabase.auth.updateUser({
      data: {
        avatar: `https://monsxsuuewqcyclzcxrx.supabase.co/storage/v1/object/public/avatar/${fileName}`,
      },
    });

  if (updatingAvatar) {
    throw new Error(updatingAvatar);
  }
  return finalUser;
}
