export async function imageFileBuilder(imageURL: string) {
  const res = await fetch(imageURL, {
    cache: "no-cache",
  });
  const imageType = imageURL.split(".").pop();
  const blob = await res.blob();

  try {
    const file = new File([blob], imageURL, { type: `image/${imageType}` });
    return file;
  } catch (error) {
    console.error("Error occured while trying to constuct a file from a given image", error);
    return null;
  }
}
