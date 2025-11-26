package com.saep.saep.controller;

import com.saep.saep.controller.dto.LoginRequestDto;
import com.saep.saep.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class UsuarioController {


    private UsuarioService usuarioService;

    @PostMapping("/logar")
    public ResponseEntity<?> logarC(LoginRequestDto dto) {
        return usuarioService.logar(dto);
    }
}
