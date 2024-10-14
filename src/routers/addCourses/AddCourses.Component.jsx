import React, {useEffect, useState} from "react";
import Selector from '../../components/selector/Selector.Component'
import AddCourseList from "../../components/courses-list/AddCourseList.Component";
import  {programsData}  from "../../data/programData";
import './addCourses.style.css'

const AddCourses = ({User,SetUser})=>{
    const [selectedTerm, setSelectedTerm] = useState('')
    const [coursesBySelectedTerm, setCoursesBySelectedTerm] = useState([])
    const [wasCourseAdded, setWasCourseAdded] = useState(false)
    const [addedCourse, setAddedCourse] = useState({})
    const [resultingErrors, setResultingErrors] = useState({})
    const [fadeOut, setFadeOut] = useState(false)
    const terms = programsData[0].terms
    const CoursesByStudentProgram = programsData.filter(program=>program.programType === User.program)
    
    const SetSelector = (term)=>{
        setSelectedTerm(term)
        //we can use term instead of selectedTerm to update the list but inside SetSelector
       
    }
    const SetWasCourseAdded =  (truth, course={}, errors={})=>{
        setWasCourseAdded(truth)
        setAddedCourse(course)
        setResultingErrors(errors)

         setTimeout(()=>{
            setFadeOut(true)
        },2500)
         setTimeout(() => {
            setWasCourseAdded(false)
            setFadeOut(false)
            setAddedCourse({})
            setResultingErrors({})
        }, 3000);
        


    }

    //If we want to use the updated state of selectedItem we must use useEffect hook with the state as second args.
    useEffect(()=>{
        const courseByTerm = CoursesByStudentProgram[0].courses.filter(course=> course.typeTerm === selectedTerm)
        setCoursesBySelectedTerm(courseByTerm? courseByTerm:[])
      
    }, [selectedTerm])

    

    return(

        <>
            
            <Selector Category={'Term'} Items={terms} SetSelectorValue={SetSelector} SelectedValue={selectedTerm} ></Selector>     
            {wasCourseAdded && <div className = {`alert alert-success ${fadeOut? "fade-out" : ''} `} role="alert"> Course {addedCourse.IDCourse} Added Successfully </div> }
            {resultingErrors.existingCourse && <div className = {`alert alert-danger ${fadeOut? "fade-out" : ''} `} role="alert"> {resultingErrors.existingCourse} </div>}
            <AddCourseList SelectedProgram={User.program} FilteredCourses={coursesBySelectedTerm} User={User} SetUser = {SetUser} SetWasCourseAdded={SetWasCourseAdded}></AddCourseList>
        </>
    )
}

export default AddCourses