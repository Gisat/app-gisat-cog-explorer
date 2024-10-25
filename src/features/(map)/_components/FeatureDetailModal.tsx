import { Nullable } from "@/features/(shared)/_logic/types.universal"
import { Modal, Table } from "@mantine/core"

/**
 * State of the modal window with feature detail
 */
export interface FeatureModalState<T> {
    isVisible: boolean,
    featureRecord: Nullable<T>
  }

/**
 * Props of the modal window with feature detail
 */
interface FeatureModalProps {
    isVisible: boolean,
    detailEntity: Nullable<any>
    onCloseHandler: () => void
}

/**
 * Modal window with map feature detail information
 * @param props 
 * @returns 
 */
export const FeatureDetailModal = (props: FeatureModalProps) => {

    const renderModalRows = () => {
        if (!props.detailEntity)
            return (<></>)

        return Object
            .entries(props.detailEntity)
            .map(([key, value]) =>
                <Table.Tr>
                    <Table.Th>{key}</Table.Th>
                    <Table.Td>{value as any}</Table.Td>
                </Table.Tr>
            )
    }

    return (
        <Modal
            opened={props.isVisible}
            onClose={props.onCloseHandler}
            title="Selected Point">

            <Table>
                <Table.Thead>
                    {renderModalRows()}
                </Table.Thead>
            </Table>
            
        </Modal>
    )
}