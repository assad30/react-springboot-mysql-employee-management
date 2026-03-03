import './UpdateUser.css';
import {useEffect, useState} from "react";
import { Button, FormControl, FormGroup, Form } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = ()=>{
    const {empId} = useParams();
    const navigate = useNavigate();

     const [formData, setFormData] = useState({
    
            name: "",
            email: "",
            phone: "",
            department: "",
            salary: "",
        })
    
        const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      useEffect(() => {
            const fetchEmployee = async () =>{
                try {
                   const response = await fetch(`http://localhost:8080/api/employee/${empId}`);
                
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error("Error while fetching user : ",error.message);
                }
            }
            fetchEmployee();
      },[empId])

      const handleUpdateSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/employee/${empId}`,{
                method:"PATCH",
                headers:{"content-Type":"application/json"},
                body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log("User updated : ", data);
        navigate(`/`)
        } catch (error) {
            console.error("Error while Update Record : ", error.message);
        }
      }

    return(
        <>
            <div className="center-form">
                <h1>Edit Employee</h1>
                <Form onSubmit={handleUpdateSubmit}>
                    <FormGroup controlId="formBasicName">
                        <FormControl 
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="formBasicName">
                        <FormControl 
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicName">
                        <FormControl 
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicName">
                        <FormControl 
                            type="text"
                            name="department"
                            placeholder="Enter department"
                            value={formData.department}
                            onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="formBasicName">
                        <FormControl 
                            type="text"
                            name="salary"
                            placeholder="Enter salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                        />
                    </FormGroup>

                    <Button variant="primary" type="submit" className="w-100" >Edit Employee</Button>

                </Form>
            </div>
        </>
    )
}
export default UpdateUser;