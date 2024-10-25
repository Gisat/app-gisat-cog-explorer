import { Datasource, DatasourceStyling } from "@/features/(shared)/_logic/models.panther.datasources"
import { Nullable, Unsure } from "@/features/(shared)/_logic/types.universal"
import { OneOfInteractionFunc } from "./models.events"

/**
 * General props for every rendered layer by DeckGL
 */
export interface LayerGeneralProps{
    sourceNode: Datasource
    style: Nullable<DatasourceStyling>
    isActive: boolean,

    //TODO better typing and more types of inclick handlers for general purposes
    onClickHandler: Unsure<OneOfInteractionFunc> 
  }