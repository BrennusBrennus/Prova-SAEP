package com.saep.saep.controller;

import com.saep.saep.controller.dto.ProdutoEditDto;
import com.saep.saep.controller.dto.ProdutoRequestDto;
import com.saep.saep.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoRequestDto dto){
        return produtoService.cadastrar(dto);
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar(){
        return produtoService.listar();
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorNome(@RequestParam String nome){
        return produtoService.buscarNome(nome);
    }

    @PutMapping("/editar")
    public ResponseEntity<?> editar(@RequestBody ProdutoEditDto dto){
        return produtoService.editar(dto);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluir(@PathVariable UUID id){
        return produtoService.excluir(id);
    }
}
