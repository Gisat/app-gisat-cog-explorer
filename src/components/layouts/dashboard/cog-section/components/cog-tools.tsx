import { Alpha } from "./tools/alpha";
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
    </>
  );
};

export default CogTools;
