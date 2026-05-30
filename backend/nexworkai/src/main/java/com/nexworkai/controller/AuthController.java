package com.nexworkai.controller;

import com.nexworkai.dto.request.LoginRequestDto;
import com.nexworkai.dto.request.RegisterRequestDto;
import com.nexworkai.dto.response.AuthResponseDto;
import com.nexworkai.payload.ApiResponse;
import com.nexworkai.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Authentication APIs")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<ApiResponse<AuthResponseDto>> register(
            @Valid @RequestBody RegisterRequestDto dto) {
        return ResponseEntity.ok(ApiResponse.success(authService.register(dto), "Registered successfully"));
    }

    @PostMapping("/login")
    @Operation(summary = "Login and get JWT token")
    public ResponseEntity<ApiResponse<AuthResponseDto>> login(
            @Valid @RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok(ApiResponse.success(authService.login(dto), "Login successful"));
    }
}