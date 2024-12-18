import React, { useState, useEffect } from 'react';
import CourseList from '../../components/courses-list/CourseList.Component';
import { getData, postData } from '../../utilities/fetchOps.js'; 
import {nullUser, nullCourse} from '../../utilities/nullObjs.js'

const Programs = ({User}) => {
    console.log(1)
    const [programs, setPrograms] = useState([]); // Store a copy of programsData for state manipulation
    const [programTypes, setProgramTypes] = useState([])
    const [selectedProgram, setSelectedProgram] = useState(''); // Default program
    const [filteredCourses, setFilteredCourses] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const [fadeOut, setFadeOut] = useState(false);
    const [newCourse, setNewCourse]=useState(nullCourse)

    
    useEffect(()=>{
    const getProgramsData = async ()=>{
        const url = 'http://localhost:5000/api/v1/programs'
        const response = await getData(url)
        if(response.submissionError)
            console.log(response.submissionError)
       
        else if(response.data){
            console.log(response.data)
            setPrograms(response.data.programs)

            //sets the drop down options from fetched program data
            const dist = response.data.programs.filter((obj, index, self) => index === self.findIndex((t) => t.ProgramType === obj.ProgramType))
            const programTypes= []
            for(var obj of dist) {
                programTypes.push(obj.ProgramType)
            }      
            setProgramTypes((programtypes) => programtypes = programTypes) 
        }
    }

    if(programs.length === 0) getProgramsData()
            
    },[])

    useEffect(()=>{
        if (programs.length > 0 && selectedProgram) {
            const filtered = programs.filter(program => program.ProgramType === selectedProgram);
            setFilteredCourses(filtered)
        }
    }, [selectedProgram, programs])

    const validate = (newCourse) => {
        const newErrors = {};
        if (User.role === nullUser.role ) {
          newErrors.role = 'role is required';
        }
        else if (User.role === 'Admin') {
            console.log(newCourse)
            if (!newCourse.CourseName) {
                console.log(newCourse.CourseName)
                newErrors.CourseName = 'Course Name is required';
            }
            if (!newCourse.SeasonName) {
                newErrors.SeasonName = 'Season Name is required';
            }
            if (!newCourse.SeasonName) {
                newErrors.SeasonName = 'Season Name is required';
            }
            if (!newCourse.Description) {
                newErrors.Description = 'Description is required';
            }
            if (!newCourse.CourseDay) {
                newErrors.CourseDay = 'Course Day is required';
            }
            if (!newCourse.CourseTime) {
                newErrors.CourseTime = 'Course Time is required';
            }
            if (!newCourse.Campus) {
                newErrors.Campus = 'Campus is required';
            }
            if (!newCourse.DeliveryMode) {
                newErrors.DeliveryMode = 'Description is required';
            }
            if (!newCourse.ClassSize) {
                newErrors.ClassSize = 'Class Size is required';
            }
            if (!newCourse.ParentProgram) {
                newErrors.ParentProgram = 'Parent Program is required';
            }

          }
          return newErrors
        }
    


    // Add Course
    const addCourse = async (newCourse, setErrors2) => {
        const url = `http://localhost:5000/api/v1/createcourse`
  
        const validationErrors = validate(newCourse);
        if(Object.keys(validationErrors).length > 0){
          console.log(validationErrors)
          setErrors2(validationErrors)  
          return
        } 
        const response = await postData(url, newCourse)
        if(response.submissionError){
            setSubmitted(false)
            setErrors(response)
            console.log(response.submissionError)
        }
        else if(response.data){
            setNewCourse(newCourse)
            setSubmitted(true)
            setErrors({})
            console.log(response.data)
        }
        setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        setTimeout(() => {
            setSubmitted(false);
            setFadeOut(false);
            setErrors({});
        }, 3000);
    };



    return (
        <>
        {programs.length > 0 && <div className="container my-4">
            <h1 className="text-center mb-4">Programs</h1>
            {submitted && (
                <div className={`alert alert-success ${fadeOut ? 'fade-out' : ''}`} role="alert">
                    Course {newCourse.CourseCode} Added Successfully
                </div>
            )}

            {errors.submissionError && (
                <div className={`alert alert-danger ${fadeOut ? 'fade-out' : ''}`} role="alert">
                    {errors.submissionError}
                </div>
            )}
            <div className="mb-3">
                <label htmlFor="program-select" className="form-label">Select courses that belong to program type:</label>
                <select
                    id="program-select"
                    className="form-select"
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                >
                    <option value="">--Select a Program--</option>
                    {programTypes.map((programType, index) => (
                        <option key={index} value={programType}>{programType}</option>
                    ))}
                </select>
            </div>

            {selectedProgram ? (
                <CourseList
                    SelectedProgram={selectedProgram}
                    CourseSubmitted={submitted}
                    FilteredCourses={filteredCourses}
                    SetFilteredCourses={setFilteredCourses}
                    AddCourse={addCourse}
                    Errors={errors}
                    User={User}
                />
            ) : (
                <p className="text-center">Please select a program to see the details.</p>
            )}
        </div>}
        </>
    );
};

export default Programs;
