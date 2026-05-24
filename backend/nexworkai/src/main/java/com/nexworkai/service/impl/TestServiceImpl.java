package com.nexworkai.service.impl;

import com.nexworkai.service.TestService;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl implements TestService {
    @Override
    public String getTest(){
        return "get Test from Service";
    }
}
