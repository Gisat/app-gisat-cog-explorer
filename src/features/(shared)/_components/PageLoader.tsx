
import { Loader } from "@mantine/core";
import styles from "../shared.module.css";

/** Loader for pages or componenst */
export default () => {

    return (
        <aside className={`${styles.pageLoader}`}>
            <Loader color="green" />
        </aside>
    )
}