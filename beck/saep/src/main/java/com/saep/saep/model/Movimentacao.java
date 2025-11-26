package com.saep.saep.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_movimentacao")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Movimentacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @Column(name = "movimentacaoStatus")
    @Enumerated(EnumType.STRING)
    private MovimentacaoStatus movimentacaoStatus;

    @Column(name = "responsavel", nullable = false)
    private String responsavel;

    @Column(name = "quantidade", nullable = false)
    private int quantidade;

    @Column(name = "motivo")
    private String motivo;

    @Column(name = "data", nullable = false)
    private LocalDateTime data;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public MovimentacaoStatus getMovimentacaoStatus() {
        return movimentacaoStatus;
    }

    public void setMovimentacaoStatus(MovimentacaoStatus movimentacaoStatus) {
        this.movimentacaoStatus = movimentacaoStatus;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }
}

