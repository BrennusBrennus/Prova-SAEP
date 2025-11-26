package com.saep.saep.controller;

import com.saep.saep.controller.dto.ProdutoRequestDto;
import com.saep.saep.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProdutoController {

    private ProdutoService produtoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoRequestDto dto){
        return produtoService.cadastrar(dto);
    }
}
