package com.saep.saep.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity

@Table(name = "tb_user")

@Setter

@Getter

@NoArgsConstructor

@AllArgsConstructor

public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "usuario_id")
    private UUID id;

    @Column(name = "login", nullable = false)
    private String login;

    @Column(name = "senha", nullable = false)
    private String senha;

    public Usuario(String login, String senha) {
        this.login = login;
        this.senha = senha;
    }
}
