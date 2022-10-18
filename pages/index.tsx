import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { defaultUrl } from "util/defaultUrl";
import { Url } from "components/url";
import Image from "next/image";
import logotype from "assets/logotype.svg";
import iconMyJsons from "assets/icon-my-jsons.svg";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
    const [urls, setUrls] = useState<any[]>([defaultUrl]);
    const { register, handleSubmit, reset } = useForm();

    const addUrl = (url: string) => {
        setUrls((prev) => [{ url }, ...prev]);
        localStorage.setItem("urls", JSON.stringify(urls));
    };

    const validate = (data: any) => {
        try {
            JSON.parse(data.body);
        } catch {
            return alert("Invalid JSON");
        }
        if (data.seconds.trim() === "") return true;
        if (typeof parseInt(data.seconds) !== "number") {
            return alert("Invalid seconds");
        }
        if (isNaN(parseInt(data.seconds))) {
            return alert("Invalid seconds");
        }
        if (parseInt(data.seconds) < 0) {
            return alert("Invalid seconds");
        }
        if (parseInt(data.seconds) > 4) {
            return alert("Invalid seconds");
        }
        return true;
    };

    const onSubmit = handleSubmit((data: any) => {
        const isValid = validate(data);
        if (!isValid) return;
        reset();
    });

    useEffect(() => {
        const urlsLS = localStorage.getItem("urls");
        if (urlsLS) {
            setUrls((prev) => [...prev, ...JSON.parse(urlsLS)]);
        }
    }, []);

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
                <div className={styles.currentPage}>
                    <Image src={iconMyJsons} alt=""></Image>
                    <p>My jsons</p>
                </div>
                <p className={styles.description}>Mock backend for your app</p>
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
                        {...register("body", {
                            required: "Enter your JSON",
                        })}
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
                    {...register("seconds")}
                    className={styles.seconds}
                    type="text"
                    placeholder="Loading in seconds"
                />
                <button
                    type="button"
                    className={styles.button}
                    onClick={onSubmit}
                >
                    Create JSON
                </button>
            </form>
        </div>
    );
};

export default Home;
