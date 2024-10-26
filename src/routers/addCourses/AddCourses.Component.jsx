import React, { useEffect, useState } from 'react';
import Selector from '../../components/selector/Selector.Component'; // Selector component
import AddCourseList from '../../components/courses-list/AddCourseList.Component'; // For adding courses to user's list
import AddNewCourseForm from '../../routers/addCourses/AddNewCourseForm'; // For adding new courses by admin
import CourseList from '../../components/courses-list/CourseList.Component'; // Admin Course List
import EditCourseForm from '../../components/courses-list/EditCourseForm.jsx'; // Admin Edit Form
import { programsData } from '../../data/programData'; // Program data
import './addCourses.style.css'; // Style for AddCourses


const AddCourses = ({ User, SetUser }) => {
    const [selectedTerm, setSelectedTerm] = useState('');
    const [coursesBySelectedTerm, setCoursesBySelectedTerm] = useState([]);
    const [wasCourseAdded, setWasCourseAdded] = useState(false);
    const [addedCourse, setAddedCourse] = useState({});
    const [resultingErrors, setResultingErrors] = useState({});
    const [fadeOut, setFadeOut] = useState(false);
    const [courses, setCourses] = useState([]); // For Admin CRUD
    const [editCourse, setEditCourse] = useState(null); // For Edit

    const terms = programsData[0].terms;
    const CoursesByStudentProgram = programsData.filter(program => program.programType === User.program);

    const SetSelector = (term) => {
        setSelectedTerm(term);
    };

    const SetWasCourseAdded = (truth, course = {}, errors = {}) => {
        setWasCourseAdded(truth);
        setAddedCourse(course);
        setResultingErrors(errors);

        setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        setTimeout(() => {
            setWasCourseAdded(false);
            setFadeOut(false);
            setAddedCourse({});
            setResultingErrors({});
        }, 3000);
    };

    useEffect(() => {
        const courseByTerm = CoursesByStudentProgram[0]?.courses.filter(course => course.typeTerm === selectedTerm);
        setCoursesBySelectedTerm(courseByTerm ? courseByTerm : []);
    }, [selectedTerm]);

    // Admin: Add, Edit, Delete Courses
    const handleAddCourse = (newCourse) => {
        setCourses([...courses, newCourse]);
    };

    const handleEditCourse = (updatedCourse) => {
        const updatedCourses = courses.map((course) =>
            course.courseCode === updatedCourse.courseCode ? updatedCourse : course
        );
        setCourses(updatedCourses);
        setEditCourse(null);
    };

    const handleDeleteCourse = (courseCode) => {
        const updatedCourses = courses.filter(course => course.courseCode !== courseCode);
        setCourses(updatedCourses);
    };

    return (
        <>
            <Selector Category="Term" Items={terms} SetSelectorValue={SetSelector} SelectedValue={selectedTerm} />
            {wasCourseAdded && (
                <div className={`alert alert-success ${fadeOut ? 'fade-out' : ''}`} role="alert">
                    Course {addedCourse.IDCourse} Added Successfully
                </div>
            )}
            {resultingErrors.existingCourse && (
                <div className={`alert alert-danger ${fadeOut ? 'fade-out' : ''}`} role="alert">
                    {resultingErrors.existingCourse}
                </div>
            )}

            {User.role === 'Admin' ? (
                <>
                    {/* Admin: Add New Courses */}
                    <AddNewCourseForm SetWasCourseAdded={SetWasCourseAdded} onAddCourse={handleAddCourse} />

                    {/* Admin: Edit Existing Courses */}
                    {editCourse && <EditCourseForm course={editCourse} onSave={handleEditCourse} />}

                    {/* Admin: View All Courses */}
                    <CourseList courses={courses} onEditCourse={setEditCourse} onDeleteCourse={handleDeleteCourse} />
                </>
            ) : (
                <>
                    <AddCourseList
                        SelectedProgram={User.program}
                        FilteredCourses={coursesBySelectedTerm}
                        User={User}
                        SetUser={SetUser}
                        SetWasCourseAdded={SetWasCourseAdded}
                    />
                </>
            )}
        </>
    );
};

export default AddCourses;
