import { useState, useRef, useEffect } from "react";
import { LayerDefinition as CogBitmapLayerDefinition } from "@/types/layers/cogBitmapLayer";
import { getSource } from "@/utils/url/getSource";

export const useCogBitmapLayer = () => {
  const { source } = getSource();
  const url: string | undefined = source.parsedValue ?? undefined;

  const [layer, setLayer] = useState<CogBitmapLayerDefinition | null>(null);
  const prevUrlRef = useRef<string | undefined>(undefined); // Store the previous URL
  const versionRef = useRef(0);

  const increaseLayerVersion = () => {
    versionRef.current += 1;
  };

  useEffect(() => {
    // Check if `url` exists and has changed
    if (url && url !== prevUrlRef.current) {
      // Update the previous URL reference
      prevUrlRef.current = url;

      // Increment the version
      increaseLayerVersion();

      // Define the layer
      const params = {}; // Add dynamic layer parameters here
      const layerDefinition: CogBitmapLayerDefinition = {
        key: `CogBitmapLayer_${versionRef.current}`,
        layerKey: "CogBitmapLayer",
        name: `CogBitmapLayer_${versionRef.current}`,
        opacity: 1,
        options: {
          url,
          type: "image",
          cogBitmapOptions: {
            ...params,
          },
        },
        type: "cogBitmap",
      };

      // Set the layer state
      setLayer(layerDefinition);
    }
  }, [url]); // Re-run effect only if `url` changes

  return layer;
};
