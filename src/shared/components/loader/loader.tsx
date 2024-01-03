import style from "./loader.module.css"
const Loader = () => {
    return (
            <div className={style.loaderContainer}>
                <div className={style.container}>
                    <div className={`${style.cloud} ${style.front}`}>
                        <span className={style.leftFront}></span>
                        <span className={style.rightFront}></span>
                    </div>
                    <span className={`${style.sun} ${style.sunshine}`}></span>
                    <span className={style.sun}></span>
                    <div className={`${style.cloud} ${style.back}`}>
                        <span className={style.leftBack}></span>
                        <span className={style.rightBack}></span>
                    </div>
                </div>
                <p className={style.loadingText}>Loading...</p>
            </div>
    )
}

export default Loader