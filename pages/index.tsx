import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch(`https://jsonurl.vercel.app/{"name": "Oleh"}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);

    return (
        <div className={styles.container}>
            <p>{data?.name}</p>
        </div>
    );
};

export default Home;
