package com.saep.saep.service;

import com.saep.saep.exception.CampoVazioException;
import com.saep.saep.exception.EdicaoInvalidaException;
import com.saep.saep.exception.NaoEncontradoException;
import com.saep.saep.model.Movimentacao;
import com.saep.saep.model.MovimentacaoStatus;
import com.saep.saep.model.Produto;
import com.saep.saep.repository.MovimentacaoRepository;
import com.saep.saep.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MovimentacaoService {

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    private void validar(Movimentacao mov) {

        if (mov.getProduto() == null)
            throw new CampoVazioException("Produto não informado");

        if (mov.getMovimentacaoStatus() == null)
            throw new CampoVazioException("Status não informado");

        if (mov.getResponsavel() == null || mov.getResponsavel().trim().isEmpty())
            throw new CampoVazioException("Responsável não informado");

        if (mov.getQuantidade() < 0)
            throw new CampoVazioException("Quantidade deve ser maior que zero");
    }

    private Produto buscarProduto(UUID id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new NaoEncontradoException("Produto não encontrado"));
    }

    private Movimentacao buscarMovimentacao(UUID id) {
        return movimentacaoRepository.findById(id)
                .orElseThrow(() -> new NaoEncontradoException("Movimentação não encontrada"));
    }

    public ResponseEntity<?> cadastrar(UUID idProduto,
                                  MovimentacaoStatus status,
                                  String responsavel,
                                  int quantidade,
                                  String motivo) {

        Produto produto = buscarProduto(idProduto);

        if (status == MovimentacaoStatus.ENTRADA) {
            produto.setQuantidade(produto.getQuantidade() + quantidade);
        } else {
            if (produto.getQuantidade() < quantidade) {
                throw new EdicaoInvalidaException(
                        "Quantidade insuficiente. Estoque atual: " + produto.getQuantidade()
                );
            }
            produto.setQuantidade(produto.getQuantidade() - quantidade);
        }

        Movimentacao mov = new Movimentacao();
        mov.setProduto(produto);
        mov.setMovimentacaoStatus(status);
        mov.setResponsavel(responsavel);
        mov.setQuantidade(quantidade);
        mov.setMotivo(motivo);
        mov.setData(LocalDateTime.now());

        validar(mov);

        // Atualiza produto no banco
        produtoRepository.save(produto);
        if(mov.getQuantidade() < produto.getQuantidadeMinima()){
            return ResponseEntity.ok("O produto: "+ produto.getNome()+ " possui uma quantidade inferior a minima");
        }

        // Salva a movimentação
        return ResponseEntity.ok().build();
    }
    public Movimentacao buscarPorId(UUID id) {
        return buscarMovimentacao(id);
    }

    public List<Movimentacao> listar() {
        return movimentacaoRepository.listarMovimentacoesOrdenadasPorNomeDoProduto();
    }

    public void excluir(UUID id) {
        Movimentacao mov = buscarMovimentacao(id);
        movimentacaoRepository.delete(mov);
    }
}
