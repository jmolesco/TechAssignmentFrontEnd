import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { URLpath, URLupload } from "../keyword/constant";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {insertTransaction} from '../actions/insertTransaction';
import { ToastContainer, toast } from 'react-toastify';
const UploadTransaction = () => {

    const transaction = useSelector((state) => state);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessShow, setSuccessShow] = useState(false);
    const [isErrorShow, setErrorShow] = useState(false);

    const [isUploadFile ,setUploadFile] = useState();
     const handleSubmit = async(event) => {
         event.preventDefault()
       
         if(isUploadFile){
           
             var config = {
                 mode: 'cors',
                 headers: {
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT",
                     "Content-Type": "application/json",
                 },
             };
              const formData = new FormData();
              formData.append("file", isUploadFile);
              await axios.post(URLpath+URLupload, formData, config)
             .then(function(response) {
               console.log(response);
               if(response.status===200){
                    setErrorShow(false);
                    setSuccessShow(true);
                    setSuccessMessage(" Successfully record the file. Please check the view page ");
               }
              
   
             })
             .catch(function(error) {
               console.log(error.response.data); 
               setErrorShow(true);
                setSuccessShow(false);
                setErrorMessage(error.response.data.errors.file.toString());
             });
         }
         else{
            console.log("here");
            setErrorShow(true);
            setSuccessShow(false);
            setErrorMessage(" File is required. Please upload a file ");
            
         }


       }
     
    const onUpload=(e)=>{
        e.preventDefault();
        setUploadFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    return (
        <Container>
            <br></br>
            <h3>
                Upload your csv or xml file and click the button to submit
            </h3>
            <Form> 
                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label> &raquo;File Upload</Form.Label>
                    <Form.Control type="file" size="lg" onChange={onUpload} />
                </Form.Group>
                <Button onClick={handleSubmit}>Upload CSV or XML</Button>
               
                <Form.Group controlId="formFileLg" className="mb-3" >
                <br></br>
                    {
                        isSuccessShow &&  <Form.Label style={{backgroundColor: 'mediumseagreen', color: 'white'}}>{successMessage}</Form.Label>
                    }
                    {
                        isErrorShow &&   <Form.Label style={{backgroundColor: 'red', color: 'white'}}>{errorMessage}</Form.Label>
                    }
                   
                </Form.Group>
                
            </Form>
            
        </Container>
    );
}
export default UploadTransaction;