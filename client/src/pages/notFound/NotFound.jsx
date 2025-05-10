import { PiSmileySadBold } from "react-icons/pi";
import styles from './notFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.notFContainer}>
            <h1>Ops Something Went Wrong</h1>
            <p>404 Page Not Found <PiSmileySadBold size={50}/></p>
        </div>
    )
}

export default NotFound