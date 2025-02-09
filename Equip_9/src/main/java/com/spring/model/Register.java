package com.spring.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "registration")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
public class Register {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;
	@Column(name = "mobile_number")
	private String mobileNumber;
	@Column(name = "password")
	private String password;
	@Column(name = "email")
	private String email;
	@Column(name = "created_date", updatable = false)
	private LocalDateTime createdDate = LocalDateTime.now();
	@Column(name = "created_by", updatable = false)
	private String createdBy = "System";
	@Column(name = "updated_date")
	private LocalDateTime updatedDate = LocalDateTime.now();
	@Column(name = "updated_by")
	private String updatedBy = "System";

}