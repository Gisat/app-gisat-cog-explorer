import isEqual from 'lodash.isequal';
import { useState, useRef, useEffect } from 'react';

import { useCogBitmapOptions } from '@/hooks/map/layers/getCogBitmapOptions';
import { LayerDefinition as CogBitmapLayerDefinition } from '@/types/layers/cogBitmapLayer';
import { getSource } from '@/utils/url/getSource';

export const useCogBitmapLayer = () => {
  const { source } = getSource();
  const cogBitmapOptions = useCogBitmapOptions();

  const cogUrl = source.parsedValue;

  // Handling layer incremental indexing
  const versionRef = useRef(0);
  const increaseLayerVersion = () => {
    versionRef.current += 1;
  };

  const cogUrlRef = useRef<string | undefined>();

  const [cogBitmapLayer, setCogBitmapLayer] =
    useState<CogBitmapLayerDefinition | null>(null);

  /**
   * Handling parameters
   */
  const defaultOptions = {
    alpha: 100,
  };
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    const gotParams = cogBitmapOptions;

    setOptions((prevParams: any) => {
      // Use deep comparison to check if params have changed
      if (!isEqual(prevParams, gotParams)) {
        return gotParams;
      }
      return prevParams;
    });
  });

  /**
   * Layer initialization
   */

  const initLayer = () => {
    increaseLayerVersion();

    // console.log("final options", options);

    const layerDefinition: CogBitmapLayerDefinition = {
      key: `CogBitmapLayer_${versionRef.current}`,
      layerKey: `CogBitmapLayer`,
      name: 'CogBitmapLayer_',
      opacity: options.alpha ? options.alpha * 0.01 : 1,
      options: {
        url: cogUrl || undefined,
        type: 'image',
        cogBitmapOptions: {
          ...options,
        },
      },
      type: 'cogBitmap',
    };

    setCogBitmapLayer(layerDefinition);
  };

  if (cogUrl && cogUrlRef.current !== cogUrl) {
    cogUrlRef.current = cogUrl;
    initLayer();
  }

  useEffect(() => {
    if (options) {
      initLayer();
    }
  }, [options]);

  return cogBitmapLayer;
};
