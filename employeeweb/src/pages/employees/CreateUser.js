import {useState} from "react";
import "./CreateUser.css";
import { Button, FormControl, FormGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
 
const CreateUser = () => {
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

  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    console.log(formData);

    try {
        const response = await fetch("http://localhost:8080/api/employee",{
            method:"POST",
            headers:{"content-Type":"application/json"},
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log("Employee Created ",data);
        navigate("/")
    } catch (error) {
        console.log("Error creating employee:",error.message);
    }
  }

    return(
        <>
            <div className="center-form">
                <h1>Create new Employee</h1>
                <Form onSubmit={handleSubmit}>
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

                    <Button variant="primary" type="submit" className="w-100">Create Employee</Button>

                </Form>
            </div>
        </>
    )
}
export default CreateUser;