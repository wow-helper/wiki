import styles from "../home/index.module.scss";
import clsx from "clsx";
import React, {useRef} from "react";
import LoginModal from "../home/_LoginModal";

export default function Header() {
    const refLoginModal = useRef();

    const openLogin = (mode = 1) => {
        if (refLoginModal.current) {
            refLoginModal.current.open(mode); // 调用子组件的方法
        }
    };

    return (
        <div className={styles.contentBlack141414}>
            <div className="w-1440">
                <div className={clsx('w-1280', styles.header)}>
                    <a href={'/air/'}>
                        <img src="img/logo.svg"/>
                        Turbulence
                    </a>
                    <ul>
                        <li>
                            压缩
                            <img src="images/home/下拉箭头1.svg" alt=""/>
                            <div>
                                <a className={styles.on} href="">图像压缩</a>
                                <a href="">视频压缩</a>
                                <a href="">文件压缩</a>
                                <a href="">音频压缩</a>
                            </div>
                        </li>
                        <li>
                            转换
                            <img src="images/home/下拉箭头1.svg" alt=""/>
                            <div>
                                <a className={styles.on} href="">文档转换</a>
                                <a href="">图像转换</a>
                                <a href="">视频转换</a>
                                <a href="">音频转换</a>
                            </div>
                        </li>
                        <li>OCR</li>
                        <li>API</li>
                        <li>定价</li>
                        <li>支持</li>
                    </ul>
                    <div>
                        <div>
                            <img src="images/home/文件夹icon.svg"/>
                            <span>66</span>
                        </div>
                        <div>
                            <img src="images/home/语言icon.svg"/>
                        </div>
                        <button className={styles.homeButton} onClick={() => openLogin(1)}>登录</button>
                    </div>
                </div>
            </div>
            <LoginModal ref={refLoginModal} ></LoginModal>
        </div>
    );
}