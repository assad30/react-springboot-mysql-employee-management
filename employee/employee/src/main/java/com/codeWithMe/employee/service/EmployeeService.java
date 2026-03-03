package com.codeWithMe.employee.service;

import com.codeWithMe.employee.dto.EmployeeDTO;
import com.codeWithMe.employee.enitiy.Employee;
import com.codeWithMe.employee.repository.EmployeeRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepo employeeRepo;


    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public EmployeeDTO postEmployee(EmployeeDTO dto ){
        Employee e = new Employee();
        e.setName(dto.name());
        e.setEmail(dto.email());
        e.setPhone(dto.phone());
        e.setDepartment(dto.department());
        e.setSalary(dto.salary());
        return map(employeeRepo.save(e));
    }
    private EmployeeDTO map(Employee e) {
        return new EmployeeDTO(e.getEmpId(), e.getName(), e.getEmail(), e.getPhone(),e.getDepartment(),e.getSalary());
    }

//    public List<EmployeeDTO> getAllEmployees() {
//
//        return employeeRepo.findAll().stream().map(this::map).toList();
//    }

    public Page<EmployeeDTO> getAllEmployees(Pageable pageable) {
        return employeeRepo.findAll(pageable)
                .map(this::map);
    }



    public void deleteEmployee(Long id){
        if(!employeeRepo.existsById(id)){
            throw new EntityNotFoundException("Employee with ID "+id+" not found");
        }
        employeeRepo.deleteById(id);
    }

    public EmployeeDTO getEmployeeById(Long empId){
        Employee employee = employeeRepo.findById(empId).orElse(null);
        return map(employee);
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Optional<Employee> optionalEmployee = employeeRepo.findById(id);
        if(optionalEmployee.isPresent()){
            Employee existingEmployee = optionalEmployee.get();
            existingEmployee.setName(employeeDTO.name());
            existingEmployee.setEmail(employeeDTO.email());
            existingEmployee.setPhone(employeeDTO.phone());
            existingEmployee.setDepartment(employeeDTO.department());
            existingEmployee.setSalary(employeeDTO.salary());
            return map(employeeRepo.save(existingEmployee));

        }
        return null;
    }
}
