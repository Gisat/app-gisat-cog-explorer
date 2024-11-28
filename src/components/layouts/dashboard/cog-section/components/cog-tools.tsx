import { Alpha } from "./tools/alpha";
import { Clip } from "./tools/clip";
import { CogUrl } from "./cogUrl";
import { Multiplier } from "./tools/multiplier";
import { UseAutoRange } from "./tools/useAutoRange";
import { UseChannel } from "./tools/useChannel";
import { UseDataForOpacity } from "./tools/useDataForOpacity";
import { UseHeatMap } from "./tools/useHeatMap";

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
    </>
  );
};

export default CogTools;
