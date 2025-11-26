package com.saep.saep.controller.dto;

import com.saep.saep.model.Produto;

import java.util.UUID;

public record ProdutoResponseDto(UUID id, String name, int quantidade, int quantidadeMinima) {
    public static ProdutoResponseDto paraDto(Produto produto){
        return new ProdutoResponseDto(
            produto.getId(),
            produto.getNome(),
            produto.getQuantidade(),
            produto.getQuantidadeMinima()
        );
    }
}
