package com.saep.saep.repository;

import com.saep.saep.model.Movimentacao;
import com.saep.saep.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, UUID> {
    Optional<Movimentacao> findByProduto(Produto produto);

    List<Movimentacao> findAllByProduto(Produto produto);
}
