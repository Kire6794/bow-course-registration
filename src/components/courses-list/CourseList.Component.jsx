import React, { useEffect, useState } from 'react';
import { getData, putData, deleteData } from '../../utilities/fetchOps';
import { nullCourse, nullUser } from '../../utilities/nullObjs.js';
import Course from './Course.Component';


const CourseList = ({ SelectedProgram, CourseSubmitted, FilteredCourses, SetFilteredCourses, AddCourse, User, Errors }) => {

    const seasons = ['Spring', 'Summer', 'Fall', 'Winter']
    const [programs, setPrograms] = useState([]);
    const [newCourse, setNewCourse] = useState(nullCourse);
    const [season, setSeason] = useState('')
    const [errors, setErrors] = useState(Errors)
    const [editingCourse, setEditingCourse] = useState(nullCourse); // Store the course being edited
    const [editedSuccessfully, setEditedSuccessfully] = useState(false)
    const [deletedSuccessfully, setDeletedSuccessfully] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    const selectSeason = (e)=>{
        setSeason(e.target.value)
        editingCourse === nullCourse? handleNewCourseChange(e) : handleEditChange(e)
    }

    const handleNewCourseChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
        setEditingCourse(nullCourse)
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingCourse({ ...editingCourse, [name]: value });
        setNewCourse(nullCourse)
    };

    const handleAddCourse = () => {
        console.log(editingCourse)
        AddCourse(newCourse, setValidationErrors); 
        
    };

    const updateCourse = async () => {
        console.log(editingCourse)
        const url = `http://localhost:5000/api/v1/editcourse/${editingCourse.CourseCode}`
        const validationErrors = validate(editingCourse);
        if(Object.keys(validationErrors).length > 0){
          console.log(validationErrors)
          setErrors(validationErrors)  
          return
        } 
        
        const response = await putData(url, editingCourse)
        if(response.submissionError){
            setEditedSuccessfully(false)
            setErrors(response)
            console.log(response.submissionError)
        }
        else if(response.data){
            setEditedSuccessfully(true)
            setErrors({})
            console.log(response.data.programs)

        }
        setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        setTimeout(() => {
            setEditedSuccessfully(false);
            setFadeOut(false);
            setErrors({});
        }, 3000);
    };

    const deleteCourse = async (courseCode)=>{
        console.log(courseCode)
        const url = `http://localhost:5000/api/v1/deletecourse/${courseCode}`
        
        const response = await deleteData(url)
        if(response.submissionError){
            setDeletedSuccessfully(false)
            setErrors(response)
            console.log(response.submissionError)
        }
        else if(response.data){
            setDeletedSuccessfully(true)
            setErrors({})
            console.log(response.data.programs)

        }
        setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        setTimeout(() => {
            setDeletedSuccessfully(false);
            setFadeOut(false);
            setErrors({});
        }, 3000);
    }


    const setValidationErrors =(errors)=>{
        setErrors(errors)
    }

        const validate = (editingCourse) => {
            const newErrors = {};
            if (User.role === nullUser.role ) {
              newErrors.role = 'role is required';
            }
            else if (User.role === 'Admin') {
                console.log(editingCourse)
                if (!editingCourse.CourseName) {
                    newErrors.CourseName = 'Course Name is required';
                }
                if (!editingCourse.SeasonName) {
                    newErrors.SeasonName = 'Season Name is required';
                }
                if (!editingCourse.Description) {
                    newErrors.Description = 'Description is required';
                }
                if (!editingCourse.CourseDay) {
                    newErrors.CourseDay = 'Course Day is required';
                }
                if (!editingCourse.CourseTime) {
                    newErrors.CourseTime = 'Course Time is required';
                }
                if (!editingCourse.Campus) {
                    newErrors.Campus = 'Campus is required';
                }
                if (!editingCourse.DeliveryMode) {
                    newErrors.DeliveryMode = 'Description is required';
                }
                if (!editingCourse.ClassSize) {
                    newErrors.ClassSize = 'Class Size is required';
                }
    
              }
              return newErrors
            }

    useEffect(()=>{

        const getProgramsData = async ()=>{
           
            const url = 'http://localhost:5000/api/v1/programs'
            const response = await getData(url)
            if(response.submissionError)
                console.log(response.submissionError)
           
            else if(response.data){
                console.log(response.data.programs)
                setPrograms(response.data.programs)
                if (response.data.programs.length > 0 && SelectedProgram) {
                    const filtered = response.data.programs.filter(program => program.ProgramType === SelectedProgram);
                    SetFilteredCourses(filtered)
                }
            }
        }

        if(CourseSubmitted || deletedSuccessfully || editedSuccessfully){
            console.log(1)
            getProgramsData()
        }
        
    },[CourseSubmitted, deletedSuccessfully, editedSuccessfully])

    useEffect(()=>{
        if(programs.length > 0){
            const programCourses = programs.filter((program)=>program.ProgramType === SelectedProgram)
            console.log(programCourses)
            
            const lastCode = programCourses[programCourses.length-1]?.CourseCode 
            let serial = lastCode.split('-')[1]
            serial++
            const courseCode = 'SD-'+ (serial)


            setNewCourse({...nullCourse, ['SeasonName'] : programCourses.ProgramCode, ['CourseCode'] : courseCode, ['ParentProgram'] : programCourses[0].BelongsTo})
        }

    },[SelectedProgram, programs])

    useEffect(()=>{
        setSeason(editingCourse.SeasonName)
    },[editingCourse])

    useEffect(()=>{
        if(Object.keys(errors).length > 0){
            setTimeout(()=>{
                setErrors({})
               }, 5000)
        }

       }, [errors]) 

       
        return (
        <div className="program-section">
            

            {/* Add New Course Form */}
            {User.role === "Admin" && editingCourse === nullCourse ? (
            <div className="add-course-form mb-3">

                <input
                    type="text"
                    name="CourseName"
                    placeholder="Course Name"
                    value={newCourse.CourseName}
                    onChange={handleNewCourseChange}
                    className={`form-control mb-2 ${errors.CourseName ? 'is-invalid' : ''}`}
                />
                {errors.CourseName && <div className="invalid-feedback">{errors.CourseName}</div>}

                <div className="mb-3"  style = {{display: 'flex', flexwrap: 'no-wrap'}}>
                    <select
                        name = "SeasonName"
                        id="program-select"
                        className="form-select"
                        value={season}
                        onChange={(e) => selectSeason(e)}
                    >
                        <option value="">--Select a Season Term--</option>
                        {seasons.map((season, index) => (
                            <option key={index} value={season}>{season}</option>
                        ))}
                    </select>
                </div>
                
                <input
                    type="text"
                    name="Description"
                    placeholder="Description"
                    value={newCourse.CourseDescription}
                    onChange={handleNewCourseChange}
                    className={`form-control mb-2 ${errors.Description ? 'is-invalid' : ''}`}
                />
                {errors.Description && <div className="invalid-feedback">{errors.Description}</div>}
                <input
                    type="text"
                    name="CourseDay"
                    placeholder="Course Day (e.g., Monday)"
                    value={newCourse.CourseDay}
                    onChange={handleNewCourseChange}
                    className={`form-control mb-2 ${errors.CourseDay ? 'is-invalid' : ''}`}
                />
                {errors.CourseDay && <div className="invalid-feedback">{errors.CourseDay}</div>}
                <input
                    type="text"
                    name="CourseTime"
                    placeholder="Course Time (e.g., 10:00 AM - 12:00 PM)"
                    value={newCourse.CourseTime}
                    onChange={handleNewCourseChange}
                    className={`form-control mb-2 ${errors.CourseTime ? 'is-invalid' : ''}`}
                />
                {errors.CourseTime && <div className="invalid-feedback">{errors.CourseTime}</div>}
                <input
                    type="text"
                    name="Campus"
                    placeholder="Campus (e.g., Downtown Campus)"
                    value={newCourse.Campus}
                    onChange={handleNewCourseChange}
                    className={`form-control mb-2 ${errors.Campus ? 'is-invalid' : ''}`}
                />
                {errors.Campus && <div className="invalid-feedback">{errors.Campus}</div>}
                <input
                    type="text"
                    name="DeliveryMode"
                    placeholder="Delivery Mode (e.g., Online)"
                    value={newCourse.DeliveryMode}
                    onChange={handleNewCourseChange}
                    className={`form-control mb-2 ${errors.DeliveryMode ? 'is-invalid' : ''}`}
                />
                {errors.DeliveryMode && <div className="invalid-feedback">{errors.DeliveryMode}</div>}
                <input
                    type="number"
                    name="ClassSize"
                    placeholder="Class Size"
                    value={newCourse.ClassSize}
                    onChange={handleNewCourseChange}
                    className={`form-control mb-2 ${errors.ClassSize ? 'is-invalid' : ''}`}
                />
                {errors.ClassSize && <div className="invalid-feedback">{errors.ClassSize}</div>}
                <button onClick={handleAddCourse} className="btn btn-primary">Add New Course</button>
            </div>
            )
        :
        null}

            <h2 className="mb-3">Courses for: {SelectedProgram}</h2>

            {/* Display Course List */}
            {FilteredCourses.map((course) => (

                <div key={course.CourseCode} className="course-item mb-3">

                    {editingCourse?.CourseCode === course.CourseCode ? (
                    // Edit Mode
                    <>
                    {editedSuccessfully && (
                        <div className={`alert alert-success ${fadeOut ? 'fade-out' : ''}`} role="alert">
                            Course {newCourse.CourseCode} edited Successfully
                        </div>
                    )}
                    {deletedSuccessfully && (
                        <div className={`alert alert-success ${fadeOut ? 'fade-out' : ''}`} role="alert">
                            Course {newCourse.CourseCode} deleted Successfully
                        </div>
                    )}

                    {errors.submissionError && (
                        <div className={`alert alert-danger ${fadeOut ? 'fade-out' : ''}`} role="alert">
                            {errors.submissionError}
                        </div>
                    )}
                    <input
                        type="text"
                        name="CourseName"
                        placeholder="Course Name"
                        value={editingCourse.CourseName}
                        onChange={handleEditChange}
                        className={`form-control mb-2 ${errors.CourseName ? 'is-invalid' : ''}`}
                    />
                    {errors.Description && <div className="invalid-feedback">{errors.Description}</div>}

                    <div className="mb-3"  style = {{display: 'flex', flexwrap: 'no-wrap'}}>
                        <select
                            name = "SeasonName"
                            id="program-select"
                            className="form-select"
                            value={season}
                            onChange={(e) => selectSeason(e)}
                        >
                            <option value="">{editingCourse.SeasonName}</option>
                            {seasons.map((season, index) => (
                                (season !== editingCourse.SeasonName) &&
                                <option key={index} value={season}>{season}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="text"
                        name="Description"
                        placeholder="Description"
                        value={editingCourse.Description}
                        onChange={handleEditChange}
                        className={`form-control mb-2 ${errors.Description ? 'is-invalid' : ''}`}
                    />
                    {errors.Description && <div className="invalid-feedback">{errors.Description}</div>}
                    <input
                        type="text"
                        name="CourseDay"
                        placeholder="Course Day (e.g., Monday)"
                        value={editingCourse.CourseDay}
                        onChange={handleEditChange}
                        className={`form-control mb-2 ${errors.CourseDay ? 'is-invalid' : ''}`}
                    />
                    {errors.CourseDay && <div className="invalid-feedback">{errors.CourseDay}</div>}
                    <input
                        type="text"
                        name="CourseTime"
                        placeholder="Course Time (e.g., 10:00 AM - 12:00 PM)"
                        value={editingCourse.CourseTime}
                        onChange={handleEditChange}
                        className={`form-control mb-2 ${errors.CourseTime ? 'is-invalid' : ''}`}
                    />
                    {errors.CourseTime && <div className="invalid-feedback">{errors.CourseTime}</div>}
                    <input
                        type="text"
                        name="Campus"
                        placeholder="Campus (e.g., Downtown Campus)"
                        value={editingCourse.Campus}
                        onChange={handleEditChange}
                        className={`form-control mb-2 ${errors.Campus ? 'is-invalid' : ''}`}
                    />
                    {errors.Campus && <div className="invalid-feedback">{errors.Campus}</div>}
                    <input
                        type="text"
                        name="DeliveryMode"
                        placeholder="Delivery Mode (e.g., Online)"
                        value={editingCourse.DeliveryMode}
                        onChange={handleEditChange}
                        className={`form-control mb-2 ${errors.DeliveryMode ? 'is-invalid' : ''}`}
                    />
                    {errors.DeliveryMode && <div className="invalid-feedback">{errors.DeliveryMode}</div>}
                    <input
                        type="number"
                        name="ClassSize"
                        placeholder="Class Size"
                        value={editingCourse.ClassSize}
                        onChange={handleEditChange}
                        className={`form-control mb-2 ${errors.ClassSize ? 'is-invalid' : ''}`}
                    />
                    {errors.ClassSize && <div className="invalid-feedback">{errors.ClassSize}</div>}
                                
     
                    {User.role ==="Admin" ? (
                        <>
                    <button onClick={()=>{updateCourse()}} className="btn btn-success">Save</button>
                    <button onClick={() => {setEditingCourse(nullCourse)}} className="btn btn-secondary ml-2">Cancel</button>
                    </>
                            ): null}
                            </>
                        ) : (
                            // View Mode
                            <>
                                <Course Course={course} />
                                {User.role === "Admin" ? (
                                <div className="admin-actions mt-2">
                                    <button onClick={() => setEditingCourse((eCourse)=>{
                                        console.log(course)
                                        let temp = {}
                                        const {CourseCode, CourseName, TermID, CourseDescription, CourseDay, CourseTime, Campus, DeliveryMode, ClassSize, ProgramCode} = course
                                        temp.CourseCode = CourseCode
                                        temp.CourseName = CourseName
                                        temp.SeasonName = seasons[TermID-1]
                                        temp.Description = CourseDescription
                                        temp.CourseDay = CourseDay
                                        temp.CourseTime = CourseTime
                                        temp.Campus = Campus
                                        temp.DeliveryMode = DeliveryMode
                                        temp.ClassSize = ClassSize
                                        temp.BelongsTo = ProgramCode
                                        eCourse = temp
                                        return eCourse

                                     })} className="btn btn-warning mx-1">Edit</button>
                                    <button onClick={() => deleteCourse(course.CourseCode)} className="btn btn-danger mx-1">Delete</button>
                                </div>
                                ):
                                null}
                            </>
                        )}
                </div>
            ))}
        </div>
    );
};

export default CourseList;
