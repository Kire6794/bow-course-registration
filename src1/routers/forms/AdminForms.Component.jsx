import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap'
import FormsModal from '../../components/forms/Forms.Component'
import AboutFormsData from '../../data/aboutForm'


function Forms() {

  const data = [...AboutFormsData]

  return (
    <>
      <div className="container my-4">
        <FormsModal Forms={data}></FormsModal>
      </div>
     
    </>
  )
}

export default Forms;
