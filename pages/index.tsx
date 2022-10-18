import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { defaultUrl } from "util/defaultUrl";
import { Url } from "components/url";
import Image from "next/image";
import logotype from "assets/logotype.svg";

const Home: NextPage = () => {
    const [urls, setUrls] = useState<any[]>([defaultUrl]);

    useEffect(() => {
        console.log(urls);
    }, [urls]);

    return (
        <div className={styles.container}>
            <Head>
                <title>JSON url</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <div className={styles.sidebar}>
                <div className={styles.logotype}>
                    <Image src={logotype} alt=""></Image>
                </div>
            </div>
            <main
                className={styles.main}
                style={{ width: "0px", overflow: "auto" }}
            >
                {urls.map((url) => {
                    return <Url url={url._id} body={url.body} key={url._id} />;
                })}
            </main>
            <form className={styles.input}>
                <div className={styles.textarea}>
                    <textarea
                        name="body"
                        className={styles.body}
                        placeholder="Enter JSON here"
                    />
                    <p className={styles.inputHint}>
                        or in URL like&nbsp;
                        <a
                            href='https://jsonurl.com/{"name": "Max"}'
                            target="_blank"
                            rel="noreferrer"
                        >
                            {`jsonurl.com/{"name": "Max"}`}
                        </a>
                    </p>
                </div>
                <input
                    className={styles.seconds}
                    type="text"
                    placeholder="Loading in seconds"
                />
                <button type="button" className={styles.button}>
                    Create JSON
                </button>
            </form>
        </div>
    );
};

export default Home;
