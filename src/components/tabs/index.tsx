import styles from "./Tabs.module.css";
import { Mixpanel } from "util/analytics";

export const Tabs = ({ currentTab, setCurrentTab }: any) => {
    const mixpanel = new Mixpanel(true);

    const switchToJson = () => {
        setCurrentTab("json");
        mixpanel.trackTabSwitched("staticJSON");
    };

    const switchToPython = () => {
        setCurrentTab("python");
        mixpanel.trackTabSwitched("python");
    };

    return (
        <div className={styles.tabs}>
            <div
                className={`${styles.tab}
                ${currentTab === "json" ? styles.active : ""}`}
                onClick={switchToJson}
            >
                Static json
            </div>
            <div
                className={`${styles.tab}
                ${currentTab === "python" ? styles.active : ""}`}
                onClick={switchToPython}
            >
                Python code
            </div>
        </div>
    );
};
