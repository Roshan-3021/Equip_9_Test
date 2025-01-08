package com.spring.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.model.Register;


@Repository
public interface Repos extends JpaRepository<Register, Long> {
	@Query("from Register where mobileNumber =:mobileNumber")
	Register findByMobileNumber(String mobileNumber);

	 @Query("from Register where email = :email")
	    Register findByEmail(String email); // New method for finding by email
	}
	
