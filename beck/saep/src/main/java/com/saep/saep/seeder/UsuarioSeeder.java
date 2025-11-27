package com.saep.saep.seeder;

import com.saep.saep.model.Usuario;
import com.saep.saep.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UsuarioSeeder implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String[] args) {
        if (!usuarioRepository.existsByLogin("admin@gmail.com")) {
            Usuario user = new Usuario(
                "admin@gmail.com",
                "admin123"
            );
            usuarioRepository.save(user);
        }
    }
}
