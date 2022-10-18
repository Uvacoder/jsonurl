import styles from "../../styles/Home.module.css";
import SVG from "react-inlinesvg";
import iconButton from "assets/arrow-button.svg";

const ArrowButton = ({ className }: any) => {
    return <SVG className={className} src={iconButton.src} />;
};

export const Url = ({ url, body }: any) => {
    return (
        <a
            href={`https://jsonurl.com/${url}`}
            target="_blank"
            rel="noreferrer"
            className={styles.url}
        >
            <div className={styles.urlHeading}>
                <p className={styles.urlUrl}>jsonurl.com/{url}</p>
                <ArrowButton></ArrowButton>
            </div>
            <p className={styles.urlBody}>{body}</p>
        </a>
    );
};
