import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
    const [urls, setUrls] = useState<string[]>([]);

    // useEffect(() => {
    //     const fetchUrls = async () => {
    //         const res = await fetch("/api/urls");
    //         const urls = await res.json();
    //         setUrls(urls);
    //     };
    //     fetchUrls();
    // }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>JSON url</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <div className={styles.sidebar}></div>
            <main className={styles.main}></main>
            <div className={styles.input}>
                <textarea
                    name="body"
                    className={styles.body}
                    placeholder="Enter JSON here"
                />
                <input
                    className={styles.seconds}
                    type="text"
                    placeholder="Loading in seconds"
                />
                <button className={styles.button}>Create JSON</button>
            </div>
        </div>
    );
};

export default Home;
