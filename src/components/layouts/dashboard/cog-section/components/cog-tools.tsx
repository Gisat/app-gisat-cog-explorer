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

const CogTools = () => {
  return (
    <>
      <UseAutoRange />
      <UseDataForOpacity />
      <Alpha />
      <UseHeatMap />
      <UseChannel />
      <Multiplier />
      <Clip />
      <ClippedColor />
      <ColorScale />
      <ColorScaleValueRange />
      <UseColorsBasedOnValues />
      <ColorsBasedOnValues />
    </>
  );
};

export default CogTools;
