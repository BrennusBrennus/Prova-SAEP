package com.saep.saep.controller;

import com.saep.saep.model.Movimentacao;
import com.saep.saep.model.MovimentacaoStatus;
import com.saep.saep.service.MovimentacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/movimentacoes")
@CrossOrigin(origins = "*")
public class MovimentacaoController {

    @Autowired
    private MovimentacaoService movimentacaoService;

    // DTO para cadastrar movimentação
    public record MovimentacaoRequest(
            UUID idProduto,
            MovimentacaoStatus status,
            String responsavel,
            int quantidade,
            String motivo
    ) {}

    @PostMapping
    public ResponseEntity<Movimentacao> cadastrar(@RequestBody MovimentacaoRequest request) {
        Movimentacao mov = movimentacaoService.cadastrar(
                request.idProduto(),
                request.status(),
                request.responsavel(),
                request.quantidade(),
                request.motivo()
        );

        return ResponseEntity.ok(mov);
    }

    @GetMapping
    public ResponseEntity<List<Movimentacao>> listar() {
        return ResponseEntity.ok(movimentacaoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movimentacao> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(movimentacaoService.buscarPorId(id));
    }

    @GetMapping("/produto/{idProduto}")
    public ResponseEntity<List<Movimentacao>> buscarPorProduto(@PathVariable UUID idProduto) {
        return ResponseEntity.ok(movimentacaoService.buscarPorProduto(idProduto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable UUID id) {
        movimentacaoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
