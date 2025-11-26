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

    @Column(name = "produto")
    private Produto produto;

    @Column(name = "movimentacaoStatus")
    @Enumerated(EnumType.STRING)
    private MovimentacaoStatus movimentacaoStatus;

    @Column(name = "responsavel", nullable = false)
    private String responsavel;

    @Column(name = "data", nullable = false)
    private LocalDateTime data;
}

