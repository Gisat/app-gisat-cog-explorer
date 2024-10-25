import { SegmentedControl } from '@mantine/core';
import styles from "../layout.module.css";
import { useState } from 'react';
// import ChartBox from '@/features/(panelAttributes)/_components/ChartBox';
// import LayersPanel from '@/features/(panelLayers)/_components/LayersPanel';

/** Right panel section (everything next to map) */
export default (props: any) => {

  const [contentSection, setContentState] = useState("layers")

  return (
    <section className={`${styles.contentSection}`}>
      <SegmentedControl
        fullWidth={true}
        value={contentSection}
        data={[
          { label: "Layers", value: "layers" },
          { label: "Charts", value: "charts" },
        ]}
        onChange={setContentState} />

      <div className={``}>
        { // contentSection === "layers" ?
          // <LayersPanel /> :
          // <ChartBox />
        }
      </div>
    </section>
  )
} 