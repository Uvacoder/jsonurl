import styles from "./Tabs.module.css";

export const Tabs = ({ currentTab, setCurrentTab }: any) => {
    // const regex = /print\(.*\)/;

    return (
        <div className={styles.tabs}>
            <div
                className={`${styles.tab}
                ${currentTab === "json" ? styles.active : ""}`}
                onClick={() => setCurrentTab("json")}
            >
                Static json
            </div>
            <div
                className={`${styles.tab}
                ${currentTab === "python" ? styles.active : ""}`}
                onClick={() => setCurrentTab("python")}
            >
                Python code
            </div>
        </div>
    );
};
