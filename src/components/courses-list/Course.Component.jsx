import React from "react";

const Course = ({Course}) => {
    return (
        <div className="card mb-3"> {/* Card for each course */}
            <div className="card-header">
                <h5 className="card-title">{Course.CourseName}</h5>
                <p className="card-subtitle mb-2 text-muted">
                    <strong>Type Term:</strong> {Course.TermID}
                </p>
                <p className="card-subtitle mb-2 text-muted">
                    <strong>Code:</strong> {Course.CourseCode}
                </p>
            </div>

            <div className="card-body">
                <p className="card-text"><strong>Description:</strong> {Course.CourseDescription}</p>

                <div className="course-info" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div style={{ textAlign: 'justify' }}>
                        <p><strong>Day:</strong> {Course.CourseDay}</p>
                        <p><strong>Time: </strong>{Course.CourseTime}</p>
                        
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        <p><strong>Campus:</strong> {Course.Campus}</p>
                        <p><strong>Delivery mode:</strong> {Course.DeliveryMode}</p>
                        <p><strong>Class size:</strong> {Course.ClassSize}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
