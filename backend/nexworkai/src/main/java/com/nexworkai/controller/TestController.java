package com.nexworkai.controller;

import com.nexworkai.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @Autowired
    TestService testService;

    @GetMapping("/getTest")
    String getTest(){
        return testService.getTest();
    }
}
