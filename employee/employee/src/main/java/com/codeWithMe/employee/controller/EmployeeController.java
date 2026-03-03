package com.codeWithMe.employee.controller;

import com.codeWithMe.employee.dto.EmployeeDTO;
import com.codeWithMe.employee.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/employee")
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeDTO create(@RequestBody EmployeeDTO dto) {
        var saved = employeeService.postEmployee(dto);
        return saved;
    }

    @GetMapping("/employees")
    public Page<EmployeeDTO> getAllEmployee(Pageable pageable){
        return employeeService.getAllEmployees(pageable);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id){
        try {
                employeeService.deleteEmployee(id);
                return new ResponseEntity<>("Employee with "+id+" deleted successfuly",HttpStatus.OK);
        }catch (EntityNotFoundException ee){
            return new ResponseEntity<>(ee.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){

            EmployeeDTO employeeDTO = employeeService.getEmployeeById(id);
            if(employeeDTO == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(employeeDTO);

    }
    @PatchMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO){

        EmployeeDTO updateEmployee = employeeService.updateEmployee(id,employeeDTO);
        if(updateEmployee == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updateEmployee);
    }

}
