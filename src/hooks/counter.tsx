import { Fragment, useContext, useState } from "react";
import CustomHooks from "./customHook";
import UserContext from "./userontect";

function Counter(props: any) {
    const [marks, setMarks] = useState(0);
    const [grade, setGrade] = useState('DD');

    CustomHooks(marks, setGrade);

    const currentUser = useContext(UserContext);

    return (
        <Fragment>
            <div> {currentUser.name} has {marks} marks and has grade as {grade}</div>
            <button onClick={() => setMarks(marks + 1)}>Add Mark</button>
        </Fragment>
    );
}

export default Counter;