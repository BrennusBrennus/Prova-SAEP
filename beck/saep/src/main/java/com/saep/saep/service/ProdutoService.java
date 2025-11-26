package com.saep.saep.service;

import com.saep.saep.CampoVazioException;
import com.saep.saep.controller.dto.ProdutoRequestDto;
import com.saep.saep.model.Produto;
import com.saep.saep.repository.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    private ProdutoRepository produtoRepository;

    private void validarProduto(ProdutoRequestDto dto){
        if(dto.nomeProduto() == null) throw new CampoVazioException("Nome do produto está vazio");
    }

    public ResponseEntity<?> cadastrar(ProdutoRequestDto dto) {
        Produto produto = new Produto(
                dto.nomeProduto(),
                dto.quantidade(),
                dto.quantidadeMinima()
        );
        produtoRepository.save(produto);
        return ResponseEntity.ok().build();
    }
}
