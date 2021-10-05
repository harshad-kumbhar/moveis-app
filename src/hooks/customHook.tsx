import { useEffect } from "react";

function CustomHooks(marks, setGrade) {
        let grade;
    useEffect(() => {
        if (marks > 7) {
            grade = 'AA';
        } else if (marks > 5) {
            grade = 'BB'
        } else if (marks > 2) {
            grade = 'CC'
        } else {
            grade = 'DD'
        } 
        setGrade(grade);
        return grade;
    })
}

export default CustomHooks;