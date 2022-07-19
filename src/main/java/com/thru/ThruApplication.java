package com.thru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class ThruApplication {

	public static void main(String[] args) {
		SpringApplication.run(ThruApplication.class, args);
	}

}
