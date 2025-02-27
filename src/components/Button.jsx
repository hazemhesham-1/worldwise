import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ children, type, onClick }) => {
    return (
        <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;