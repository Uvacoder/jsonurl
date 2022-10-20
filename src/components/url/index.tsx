import styles from "../url/Url.module.css";
import SVG from "react-inlinesvg";
import iconButton from "assets/arrow-button.svg";
import copyButton from "assets/copy-button.svg";
import React from "react";
import { Mixpanel } from "util/analytics";

export const Url = ({ _id, body }: any) => {
    const copyToClipboard = (e: any) => {
        navigator.clipboard.writeText(`https://jsonurl.com/${_id}`);
        if (e.type === "keydown") return;
        e.preventDefault();
    };

    const mixpanel = new Mixpanel(true);
    const trackUrlOpen = () => {
        mixpanel.trackUrlClick(_id);
    };

    return (
        <a
            href={`https://jsonurl.com/${_id}`}
            target="_blank"
            rel="noreferrer"
            className={styles.url}
            onClick={trackUrlOpen}
        >
            <div className={styles.urlHeading}>
                <p className={styles.urlUrl}>jsonurl.com/{_id}</p>
                <div className={styles.rightSide}>
                    <SVG
                        tabIndex={0}
                        onClick={copyToClipboard}
                        onKeyDown={copyToClipboard}
                        className={styles.copyButton}
                        src={copyButton.src}
                    />
                    <SVG className={styles.arrowButton} src={iconButton.src} />
                </div>
            </div>
            <p className={styles.urlBody}>{body}</p>
        </a>
    );
};
