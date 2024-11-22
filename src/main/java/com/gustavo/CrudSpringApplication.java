package com.gustavo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.gustavo.enums.Category;
import com.gustavo.model.Course;
import com.gustavo.model.Lesson;
import com.gustavo.repository.CourseRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	@Profile("dev")
	CommandLineRunner initDatabase(CourseRepository  courseRepository){
		return args -> {
			courseRepository.deleteAll();


			for(int i =0; i < 20; i++){

			Course c = new Course();
			c.setName("Angular com Spring" + i);
			c.setCategory(Category.BACK_END);

			Lesson l = new Lesson();
			l.setName("Introdução");
			l.setYoutubeUrl("0123456789");
			l.setCourse(c);
			c.getLessons().add(l);


			Lesson l1 = new Lesson();
			l1.setName("Angular");
			l1.setYoutubeUrl("1234567890");
			l1.setCourse(c);
			c.getLessons().add(l1);

			courseRepository.save(c);
		}
		};
	}
}
