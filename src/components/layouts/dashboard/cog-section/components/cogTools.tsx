import { Alpha } from './tools/alpha';
import { BlurredTexture } from './tools/blurredTexture';
import { Clip } from './tools/clip';
import { ClippedColor } from './tools/clippedColor';
import { Color } from './tools/color';
import { ColorsBasedOnValues } from './tools/colorsBasedOnValues';
import { ColorScale } from './tools/colorScale';
import { ColorScaleValueRange } from './tools/colorScaleValueRange';
import { Multiplier } from './tools/multiplier';
import { NullColor } from './tools/nullColor';
import { UnidentifiedColor } from './tools/unidentifiedColor';
import { UseAutoRange } from './tools/useAutoRange';
import { UseChannel } from './tools/useChannel';
import { UseColorsBasedOnValues } from './tools/useColorsBasedOnValues';
import { UseDataForOpacity } from './tools/useDataForOpacity';
import { UseHeatMap } from './tools/useHeatMap';
import { UseSingleColor } from './tools/useSingleColor';

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
