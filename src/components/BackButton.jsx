import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = () => {
    const navigate = useNavigate();

    function handleClickBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <Button type="back" onClick={handleClickBack}>&larr; Back</Button>
    );
}

export default BackButton;