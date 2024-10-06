package com.gustavo.controler;

import java.util.List;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gustavo.model.Course;
import com.gustavo.repository.CourseRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseControler {

    private final CourseRepository  courseRepository;


    // @RequestMapping(method = RequestMethod.GET)
    @GetMapping()
    public List<Course> list() {
        return courseRepository.findAll();
    }

}
