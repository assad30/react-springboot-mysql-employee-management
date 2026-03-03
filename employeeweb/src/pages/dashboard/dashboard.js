import { useEffect, useState } from "react";
import { Button, Col, Table, Container, Row } from "react-bootstrap";
import "./dashboard.css"
import { useNavigate } from "react-router-dom";

const Dashboard = () =>{

    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;
    const navigate = useNavigate();


    useEffect(() => {
    fetchEmployees(currentPage);
}, [currentPage]);

const fetchEmployees = async (page) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/employees?page=${page}&size=${pageSize}`
        );
        const data = await response.json();
        setEmployees(data.content);      // actual data
        setTotalPages(data.totalPages);  // total page count
    } catch (error) {
        console.error("Error fetching employees:", error.message);
    }
};

    const handleDelete = async(employeeId) => {
        try { 
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`,{
               method:"DELETE", 
            });
            
            if(response.ok){
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee)=> employee.empId !== employeeId)
                )
            }

            console.log(`Employee with ID ${employeeId} deleted successfully`);
        } catch (error) {
            console.error("Error deleting employee : ",error.message);
        }
    }

    const handleUpdate = (empId) => {
        navigate(`/employee/${empId}`);
    }

    

    return(
       <>
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="text-center">Employees</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.empId}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.salary}</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={()=> handleUpdate(employee.empId)}>Update</Button>{" "}
                                        <Button variant="outline-danger" onClick={()=> handleDelete(employee.empId)}>Delete</Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </Table>
                    <div className="d-flex justify-content-center mt-3">
                        <Button 
                            variant="secondary" 
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </Button>

                        <span className="mx-3 align-self-center">
                            Page {currentPage + 1} of {totalPages}
                        </span>

                        <Button 
                            variant="secondary" 
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
       </>
    )
    
}
export default Dashboard;