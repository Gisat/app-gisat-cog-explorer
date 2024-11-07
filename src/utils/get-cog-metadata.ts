import { fromUrl } from "geotiff";

export const getCogMetadata = async (searchParams: URLSearchParams) => {
  const cogUrl = searchParams.get("cogUrl");

  if (!cogUrl) {
    console.warn("No COG URL specified in searchParams.");
    return null;
  }

  try {
    const tiff = await fromUrl(cogUrl);
    const image = await tiff.getImage();
    const metadata = image.getFileDirectory(); // Retrieves metadata as an object

    return metadata;
  } catch (error) {
    console.error("Error fetching COG metadata:", error);
    return null;
  }
};
