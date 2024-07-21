import styles from "../home/index.module.scss";
import clsx from "clsx";
import React, {useRef} from "react";

export default function Statistic() {
    return (
        <div className={styles.contentBlack}>
            <ul className={clsx('row w-1280', styles.contentCount)}>
                <li><span style={{marginLeft: 0}}>32</span>服务器</li>
                <li>已在线转换文件<span>77777</span>个</li>
                <li>已在线转换文件<span>999999</span>GB</li>
            </ul>
        </div>
    );
}