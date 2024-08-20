import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Unable to fetch cabins data");
    console.log(error);
  }
  return cabins;
}

export async function deleteCabin(id) {
  console.log(id);
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to delete the cabin");
  }
  return true;
}

export async function createCabin(cabinData) {
  const isImageUrl = typeof cabinData.image === "string";
  let fileName;
  let imageUrl;
  let newdata = cabinData;
  if (!isImageUrl) {
    //1. filename
    fileName =
      Math.random() + "_" + cabinData.image[0]?.name?.split("-").join("_");

    imageUrl = `https://monsxsuuewqcyclzcxrx.supabase.co/storage/v1/object/public/cabinImages/${fileName}`;
    newdata = { ...cabinData, image: imageUrl };
  }

  // 2. inserting data in cabins column
  const { data, error: TableError } = await supabase
    .from("cabins")
    .insert([newdata]);
  if (TableError) {
    throw new Error("Unable to create the cabin");
  }

  //3. uploading image  in the storage bucket
  if (!isImageUrl) {
    const { error: StorageError } = await supabase.storage
      .from("cabinImages")
      .upload(fileName, cabinData.image[0]);

    if (StorageError) {
      // error in uploading the image , delete the record created
      await supabase.from("cabins").delete().eq("id", data.id);
    }
  }
  return true;
}

export async function editCabin(cabinData) {
  //1 . check if image is updated or not

  const isImageUrl = typeof cabinData.image === "string";

  let imageUrl;
  let fileName;
  if (!isImageUrl) {
    fileName = Math.random() + "_" + cabinData.image.name?.split("-").join("_");
    imageUrl = `https://monsxsuuewqcyclzcxrx.supabase.co/storage/v1/object/public/cabinImages/${fileName}`;
  } else {
    imageUrl = cabinData.image;
  }

  //2. if was a file then it should be uploaded and if was a url then it is already uploaded.
  if (!isImageUrl) {
    //3. uploading image  in the storage bucket
    const { error: StorageError } = await supabase.storage
      .from("cabinImages")
      .upload(fileName, cabinData.image);

    if (StorageError) {
      // error in uploading the image , delete the record created
      await supabase.from("cabins").delete().eq("id", cabinData.id);
      throw new error("Unable to upload the image");
    }
  }

  //3.update into cabin table
  const { data, error: TableError } = await supabase
    .from("cabins")
    .update({ ...cabinData, image: imageUrl })
    .eq("id", cabinData.id);
  if (TableError) {
    throw new Error("Unable to edit the cabin");
  }
  return true;
}
