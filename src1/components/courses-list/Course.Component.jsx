import React from "react";

const Course = ({ Course, CourseIndex }) => {
    return (
        <div className="card mb-3"> {/* Card for each course */}
            <div className="card-header">
                <h5 className="card-title">{Course.courseName}</h5>
                <p className="card-subtitle mb-2 text-muted">
                    <strong>Type Term:</strong> {Course.typeTerm}
                </p>
                <p className="card-subtitle mb-2 text-muted">
                    <strong>Code:</strong> {Course.codeCourse}
                </p>
            </div>

            <div className="card-body">
                <p className="card-text"><strong>Description:</strong> {Course.description}</p>

                <div className="course-info" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div style={{ textAlign: 'justify' }}>
                        <p><strong>{Course.courseDay}</strong></p>
                        <p>{Course.courseTime}</p>
                        <p><strong>Start date:</strong> {Course.startDate}</p>
                        <p><strong>End date:</strong> {Course.endDate}</p>
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        <p><strong>Campus:</strong> {Course.campus}</p>
                        <p><strong>Delivery mode:</strong> {Course.deliveryMode}</p>
                        <p><strong>Seats available:</strong> {Course.seatsAvailable}</p>
                        <p><strong>Class size:</strong> {Course.classSize}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
