package com.nexworkai.service;

import com.nexworkai.dto.request.LoginRequestDto;
import com.nexworkai.dto.request.RegisterRequestDto;
import com.nexworkai.dto.response.AuthResponseDto;

public interface AuthService {
    AuthResponseDto register(RegisterRequestDto dto);
    AuthResponseDto login(LoginRequestDto dto);
}
