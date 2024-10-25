import { isArray } from "lodash";
import { GraphNode, UsedGraphNodes, ApplicationClient } from "../_logic/models.panther";
import { Datasource } from "../_logic/models.panther.datasources";
import { Nullable } from "../_logic/types.universal";

/**
 * Parse and validate all types of backend nodes from panther response
 * @param data Anything from panther
 * @returns Sorted and validated nodes from the response
 */
export const parseNodesFromPanther = (data: unknown) => {

    if (!data)
        throw new Error("Panther Fetch: No data recived");

    if (!isArray(data))
        throw new Error("Panther Fetch: Data must be an array of nodes");

    const { applicationsNode, datasourceNodes } = (data as GraphNode[]).reduce(
        (acc, node) => {
            if (node.nodeType === UsedGraphNodes.Application) {
                acc.applicationsNode = node as ApplicationClient;
            } else if (node.nodeType === UsedGraphNodes.Datasource) {
                acc.datasourceNodes.push(node as Datasource);
            }
            return acc;
        },
        { applicationsNode: null as Nullable<ApplicationClient>, datasourceNodes: [] as Datasource[] }
    );

    if(!applicationsNode)
        throw new Error("Panther Fetch: Missing application node");

    return {
        applicationsNode: applicationsNode as ApplicationClient,
        datasourceNodes: datasourceNodes as Datasource[]
    }
}
