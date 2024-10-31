package com.gustavo.dto.mapper;

import org.springframework.stereotype.Component;

import com.gustavo.dto.CourseDTO;
import com.gustavo.enums.Category;
import com.gustavo.model.Course;

@Component
public class CourseMapper{
    public CourseDTO toDTO(Course course){
        if(course == null){
            return null;
        }
        return new CourseDTO(course.getId(), course.getName(), "Front-end");
    }

    public Course toEntity(CourseDTO courseDTO){

        if(courseDTO == null){
            return null;
        }

        Course course = new Course();
        if(courseDTO.id() != null){
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(Category.FRONT_END);
        course.setStatus("Ativo");
        return course;
    }

}