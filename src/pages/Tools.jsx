import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Tools(props) {
    return (
        <>
            <h1>Tools</h1>
            <div className="base-size my-2 flex flex-row justify-evenly">
                <Button as={Link} to="/tools/dice">
                    Dice Roller
                </Button>
                <Button as={Link} to="/tools/stats">
                    Stats Roller
                </Button>
            </div>
        </>
    );
}
