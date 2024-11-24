import PropTypes from "prop-types";
import styles from "./Message.module.css";

const Message = ({ message }) => {
    return (
        <p className={styles.message}>
            <span>👋</span>
            <span>{message}</span>
        </p>
    );
}

Message.propTypes = {
    message: PropTypes.string
};

export default Message;