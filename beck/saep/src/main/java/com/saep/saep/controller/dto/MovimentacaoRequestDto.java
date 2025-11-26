package com.saep.saep.controller.dto;

import com.saep.saep.model.MovimentacaoStatus;

import java.util.UUID;

public record MovimentacaoRequestDto(UUID produtoId, MovimentacaoStatus movimentacaoStatus, String responsavel, String motivo){
}
