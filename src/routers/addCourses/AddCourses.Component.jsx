import React, { useEffect, useState } from 'react';
import { getData, postData } from '../../utilities/fetchOps.js';
import Selector from '../../components/selector/Selector.Component'; // Selector component
import AddCourseList from '../../components/courses-list/AddCourseList.Component'; // For adding courses to user's list
import './addCourses.style.css'; // Style for AddCourses


const AddCourses = ({User}) => {

    const nullUser = {firstName:'',lastName:'',email:'', countryCode:'', phone:'', birthday:'', department:'', program:'', username :'', password:'', role:''}
    const terms = ['Spring', 'Summer', 'Fall', 'Winter']
    const [selectedTerm, setSelectedTerm] = useState(terms[0])
    const [coursesAvailable, setCoursesAvailable] = useState([]);
    const [wasCourseAdded, setWasCourseAdded] = useState(false);
    const [addedCourse, setAddedCourse] = useState({});
    const [resultingErrors, setResultingErrors] = useState({});
    const [fadeOut, setFadeOut] = useState(false);


    useEffect(()=>{
        const getAvailableCourses = async ()=>{
            const url = 'http://localhost:5000/api/v1/programs'
            const response = await getData(url)
            if(response.submissionError)
                console.log(response.submissionError)
           
            else if(response.data){  
                let termID
                terms.forEach((term, index)=>{term === selectedTerm? termID = index+1 : function doNothing(){return}()})
                
                const ac = response.data.programs.filter((course)=>{                
                    if(course.TermID === termID && course.BelongsTo === User.program){
                        return course 
                    } 
                    
                })          

                setCoursesAvailable(ac)                
            }
        }
    
        if(User.role !== nullUser.role) getAvailableCourses()
                
        },[selectedTerm, User])
    
    useEffect(()=>{

        const addCourseToStudentBucket = async ()=>{
            const url = `http://localhost:5000/api/v1/addcourse/studentID/${User.userID}/courseCode/${addedCourse.CourseCode}`

            const response = await postData(url)
            if(response.submissionError){
                setResultingErrors({existingCourse: `Invalid : Course ${addedCourse.CourseCode} has been already added.`})
                setWasCourseAdded(false)
            }           
            else if(response.data){
                setResultingErrors({})
                setWasCourseAdded(true)
             }
        }

        if(Object.keys(addedCourse).length > 0) {
            addCourseToStudentBucket()
        }

    }, [addedCourse])


    const SetSelector = (term) => {
        setSelectedTerm(term);
    };

    const SubmitCourse = (course) => {

        setAddedCourse(course);

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

   
    return (
        <>
            <Selector Category="Term" Items={terms} SetSelectorValue={SetSelector} SelectedValue={selectedTerm} />

            {wasCourseAdded && (
                <div className={`alert alert-success ${fadeOut ? 'fade-out' : ''}`} role="alert">
                    Course {addedCourse.CourseCode} Added Successfully
                </div>
            )}

            {resultingErrors.existingCourse && (
                <div className={`alert alert-danger ${fadeOut ? 'fade-out' : ''}`} role="alert">
                    {resultingErrors.existingCourse}
                </div>
            )}

            {User.role === 'Student' && coursesAvailable.length > 0? 
                (
                    <AddCourseList
                        SelectedProgram={User.program}
                        FilteredCourses={coursesAvailable}
                        SubmitCourse={SubmitCourse}
                    />
                ) : (<></>)
            }
        </>
    );
};

export default AddCourses;
