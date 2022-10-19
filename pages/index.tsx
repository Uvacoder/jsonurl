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
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CircularProgress from "@mui/material/CircularProgress";
import { Tabs } from "components/tabs";

const Home: NextPage = () => {
    const [urls, setUrls] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [parent] = useAutoAnimate();
    const [currentTab, setCurrentTab] = useState("json");
    const { register, handleSubmit, reset } = useForm();

    const addUrl = (url: any) => {
        if (url.python) {
            url.body = "python code";
        }
        setUrls((prev) => {
            let newUrls: any = [url, ...prev];
            newUrls = new Set(newUrls);
            newUrls = [...newUrls];

            localStorage.setItem("urls", JSON.stringify(newUrls));
            return newUrls;
        });
    };

    const validateStatic = (data: any) => {
        try {
            JSON.parse(data.body);
        } catch {
            return alert("Invalid JSON");
        }
        if (data.delay.trim() === "") return true;
        if (typeof parseInt(data.delay) !== "number") {
            return alert("Invalid seconds");
        }
        if (isNaN(parseInt(data.delay))) {
            return alert("Invalid seconds");
        }
        if (parseInt(data.delay) < 0) {
            return alert("Invalid seconds");
        }
        if (parseInt(data.delay) > 4) {
            return alert("Invalid seconds");
        }
        return true;
    };

    const validatePython = (data: any) => {
        if (!data.python.trim()) return alert("Invalid python code");
        if (!data.variable.trim()) return alert("No variable name");
        if (data.variable.trim().startsWith("_")) {
            return alert("Invalid variable name");
        }
        if (!data.variable.trim().match(/^[a-zA-Z0-9_]+$/)) {
            return alert("Invalid variable name");
        }
        if (!data.python.trim().includes(data.variable.trim())) {
            return alert("Variable not in python code");
        }
        return true;
    };

    const validate = (data: any) => {
        if (currentTab === "json") {
            return validateStatic(data);
        }
        if (currentTab === "python") {
            return validatePython(data);
        }
    };

    const onSubmit = handleSubmit(async (data: any) => {
        setLoading(true);
        const isValid = validate(data);
        if (!isValid) return setLoading(false);

        try {
            const response = await fetch("/posturl", {
                method: "POST",
                body: JSON.stringify(data),
            });
            reset();
            const result = await response.json();
            const _id = result._id;
            addUrl({ ...data, _id });
        } catch (error) {
        } finally {
            setLoading(false);
        }
    });

    useEffect(() => {
        const urlsLS = localStorage.getItem("urls");
        if (urlsLS) {
            setUrls((prev) => [...prev, ...JSON.parse(urlsLS)]);
        } else {
            addUrl(defaultUrl);
        }
        return () => {
            setUrls([]);
        };
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
                ref={parent as any}
            >
                {urls.map((url) => {
                    return <Url {...url} key={url._id} />;
                })}
            </main>
            <div className={styles.rightBar}>
                <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <form className={styles.input}>
                    <div className={styles.textarea}>
                        {currentTab === "json" && (
                            <>
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
                            </>
                        )}
                        {currentTab === "python" && (
                            <>
                                <textarea
                                    {...register("python", {
                                        required: "Enter your Python code",
                                    })}
                                    className={styles.body}
                                    placeholder="Enter your Python code"
                                />
                            </>
                        )}
                    </div>
                    {currentTab === "json" && (
                        <input
                            {...register("delay")}
                            className={styles.seconds}
                            type="text"
                            placeholder="Loading in seconds"
                        />
                    )}
                    {currentTab === "python" && (
                        <input
                            {...register("variable")}
                            className={styles.seconds}
                            type="text"
                            placeholder="What variable to return"
                        />
                    )}
                    <button
                        type="button"
                        className={styles.button}
                        onClick={onSubmit}
                    >
                        Create JSON
                        {loading && (
                            <CircularProgress
                                size={20}
                                sx={{ color: "white" }}
                            />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;
