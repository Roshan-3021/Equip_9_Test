package com.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.mindrot.jbcrypt.BCrypt;

import com.spring.model.Register;
import com.spring.repo.Repos;

@RestController
@CrossOrigin("*")
public class EquipController {

	@Autowired
	Repos repo;

	@PostMapping("/adduser")
	public ResponseEntity<Register> addUser(@RequestBody Register m) {
	    System.out.println(m);
	    String hashedPassword = BCrypt.hashpw(m.getPassword(), BCrypt.gensalt(12)); // Encrypt the password
	    m.setPassword(hashedPassword);
	    return ResponseEntity.ok(repo.save(m));
	}


	@GetMapping("/perform_login/{identifier}/{password}")
	public ResponseEntity<?> performLogin(@PathVariable String identifier, @PathVariable String password) {
	    // Fetch user by mobile number or email
	    Register user = repo.findByMobileNumber(identifier);
	    
	    // If no user found by mobile number, try finding by email
	    if (user == null) {
	        user = repo.findByEmail(identifier); // You need to create this method in your repository
	    }

	    if (user == null) {
	        return ResponseEntity.status(404).body("User not found");
	    }

	    if (BCrypt.checkpw(password, user.getPassword())) { // Compare the password
	        System.out.println("Login successful");
	        return ResponseEntity.ok(user);
	    } else {
	        System.out.println("Invalid password");
	        return ResponseEntity.status(401).body("Invalid credentials");
	    }
	}


	@DeleteMapping("/deleteregistration/{id}")
	public void deleteRegistration(@PathVariable Long id) {
		System.out.println("id=" + id);
		repo.deleteById(id);
	}

	@PutMapping("/updateregistration/{id}")
	public Register updateRegistration(@PathVariable Long id, @RequestBody Register newReg) {
		System.out.println("id=" + id);
		return repo.findById(id).map(reg -> {
			reg.setFirstName(newReg.getFirstName());
			reg.setMobileNumber(newReg.getMobileNumber());
			reg.setPassword(newReg.getPassword());
			return repo.save(reg);
		}).orElseGet(() -> {
			return repo.save(newReg);
		});
	}

}