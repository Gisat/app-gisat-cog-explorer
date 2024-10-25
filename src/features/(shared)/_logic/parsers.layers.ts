import { Datasource } from "./models.panther.datasources";
import { ApplicationClient } from "./models.panther";
import { LayerTreeElement } from "./models.panther.layertree";
import { RenderingLayer } from "@/features/(map)/_logic/models.layers";

/**
 * PArse backend datasource nodes into rendering layers usinf application configuration context (mainly layer tree)
 * @param datasourceNodes Panther datasource nodes for the application
 * @param applicationNode Application node from the Panther
 * @returns List of layers with full context needed to be rendered
 */
export const parseDatasourcesToRenderingLayers = (datasourceNodes: Datasource[], applicationNode: ApplicationClient): RenderingLayer[] => {

    if (datasourceNodes.length !== applicationNode.configuration.layerTree.length)
        throw new Error("Datasource Parsing: layerTree is different from datasource collection");

    // TODO validation
    const layertree = applicationNode.configuration.layerTree as LayerTreeElement[]

    const mapped = layertree.map(layertreeElement => {
        const equalDatasource = datasourceNodes.find(datasource => datasource.key === layertreeElement.key)

        if (!equalDatasource)
            throw new Error("Datasource Parsing: missing datasource for layertree element");

        const renderingLayer: RenderingLayer = {
            datasource: equalDatasource,
            isActive: true, // TODO: Other default?
            level: layertreeElement.level,
            interaction: layertreeElement.onClickInteraction,
            category: layertreeElement.category
        }

        return renderingLayer
    })

    return mapped





    // const sordedSources = webDatasources.sort(
    //     (a: Datasource, b: Datasource) => a.configuration["level"] - b.configuration["level"])

    // const parsed = sordedSources.map((source: Datasource) => {
    //     const mapped: RenderingLayer = {
    //         level: source.configuration["level"],
    //         isActive: true,
    //         datasource: source
    //     }

    //     return mapped
    // })

    // return parsed
}