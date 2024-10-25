import styles from "../layout.module.css";

export default (props: any) => {

    return (
        <div className={`${styles.navigationBlock}`}>
            {props.children}
        </div>
    )
} 