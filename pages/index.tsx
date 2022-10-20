import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { defaultUrl } from "util/defaultUrl";
import { placeholder } from "util/pythonCodePlaceholder";
import { Url } from "components/url";
import Image from "next/image";
import logotype from "assets/logotype.svg";
import iconMyJsons from "assets/icon-my-jsons.svg";
import { useForm } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CircularProgress from "@mui/material/CircularProgress";
import { Tabs } from "components/tabs";
import Script from "next/script";
import { useMixpanel, Mixpanel } from "util/analytics";

const Home: NextPage = () => {
    const [urls, setUrls] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [parent] = useAutoAnimate();
    const [currentTab, setCurrentTab] = useState("json");
    const { register, handleSubmit, reset, watch, setValue, getValues } =
        useForm();

    const pythonCode = watch("python");
    const variable = watch("variable");

    useMixpanel();

    const mixpanel = new Mixpanel(true);

    const addUrl = (url: any) => {
        if (url.python && currentTab === "python") {
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
        mixpanel.trackCreateButtonPressed(
            getValues("delay"),
            currentTab === "json" ? "staticJSON" : "python"
        );
        const isValid = validate(data);
        if (!isValid) return setLoading(false);

        try {
            let dataToSend;
            if (currentTab === "json") {
                dataToSend = {
                    body: data.body,
                    delay: data.delay,
                };
            } else {
                dataToSend = {
                    python: data.python,
                    variable: data.variable,
                };
            }
            const response = await fetch("/posturl", {
                method: "POST",
                body: JSON.stringify(dataToSend),
            });
            reset();
            const result = await response.json();
            const _id = result._id;
            addUrl({ ...dataToSend, _id });
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

    useEffect(() => {
        const match = /(\w+)(?=\s*=\s*)/g;
        const names = pythonCode?.match(match);
        if (!names) return setValue("variable", "");
        if (!names?.length) return setValue("variable", "");
        if (!names.length) return;
        setValue("variable", names[names.length - 1]);
    }, [pythonCode]);

    return (
        <div className={styles.container}>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-36QB43QBLP"
                id="gtag"
            />
            <Script id="gtagcontent">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-36QB43QBLP');
                `}
            </Script>
            <Script id="hotjar">
                {`
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:3210460,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `}
            </Script>
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
                                    placeholder={placeholder}
                                />
                            </>
                        )}
                    </div>
                    {currentTab === "json" && (
                        <input
                            {...register("delay")}
                            className={styles.seconds}
                            type="text"
                            placeholder="Loading in seconds – up to 4"
                        />
                    )}
                    {currentTab === "python" && (
                        <label className={styles.pythonLabel}>
                            <p className={styles.pythonLabelName}>
                                JSON variable:
                            </p>
                            <input
                                {...register("variable")}
                                className={styles.seconds}
                                type="text"
                                placeholder="json"
                            />
                        </label>
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
