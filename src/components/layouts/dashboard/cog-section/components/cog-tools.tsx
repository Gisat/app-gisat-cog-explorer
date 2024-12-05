import { Alpha } from "./tools/alpha";
import { Clip } from "./tools/clip";
import { CogUrl } from "./cogUrl";
import { Multiplier } from "./tools/multiplier";
import { UseAutoRange } from "./tools/useAutoRange";
import { UseChannel } from "./tools/useChannel";
import { UseDataForOpacity } from "./tools/useDataForOpacity";
import { UseHeatMap } from "./tools/useHeatMap";
import { ClippedColor } from "./tools/clippedColor";
import { ColorScale } from "./tools/colorScale";
import { ColorScaleValueRange } from "./tools/colorScaleValueRange";
import { UseColorsBasedOnValues } from "./tools/useColorsBasedOnValues";
import { ColorsBasedOnValues } from "./tools/colorsBasedOnValues";
import { UnidentifiedColor } from "./tools/unidentifiedColor";
import { NullColor } from "./tools/nullColor";
import { UseSingleColor } from "./tools/useSingleColor";
import { Color } from "./tools/color";
import { BlurredTexture } from "./tools/blurredTexture";

const CogTools = () => {
  return (
    <>
      <Alpha />
      <UseAutoRange />
      <UseDataForOpacity />
      <UseHeatMap />
      <UseChannel />
      <Multiplier />
      <Clip />
      <ClippedColor />
      <ColorScale />
      <ColorScaleValueRange />
      <UseColorsBasedOnValues />
      <ColorsBasedOnValues />
      <UnidentifiedColor />
      <NullColor />
      <UseSingleColor />
      <Color />
      <BlurredTexture />
    </>
  );
};

export default CogTools;
