package com.saep.saep.controller.dto;

import java.util.UUID;

public record ProdutoEditDto(UUID id, String nomeProduto, int quantidade, int quantidadeMinima) {
}
