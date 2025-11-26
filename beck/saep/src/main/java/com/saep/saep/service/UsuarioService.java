package com.saep.saep.service;


import com.saep.saep.controller.dto.LoginRequestDto;
import com.saep.saep.exception.SenhaException;
import com.saep.saep.exception.UsuarioNaoEncontradoException;
import com.saep.saep.model.Usuario;
import com.saep.saep.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private UsuarioRepository repo;

    private void validar(LoginRequestDto dto) throws UsuarioNaoEncontradoException {
        if(dto.login() ==  null) throw new UsuarioNaoEncontradoException("O usuário não foi encontrado!");
    }

    public ResponseEntity<?> logar(LoginRequestDto dto) {
        Usuario usuario = repo.findByLogin(dto.login()).
                orElseThrow(()-> new UsuarioNaoEncontradoException("O usuário não foi encontrado"));

        if(!usuario.getSenha().equals(dto.senha())) {
            throw new SenhaException("Senha incorreta!");
        }

        return ResponseEntity.ok(dto.login());
    }
}