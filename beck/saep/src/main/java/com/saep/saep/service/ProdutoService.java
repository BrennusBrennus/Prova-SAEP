package com.saep.saep.service;

import com.saep.saep.exception.CampoVazioException;
import com.saep.saep.controller.dto.ProdutoEditDto;
import com.saep.saep.controller.dto.ProdutoRequestDto;
import com.saep.saep.controller.dto.ProdutoResponseDto;
import com.saep.saep.exception.EdicaoInvalidaException;
import com.saep.saep.exception.NaoEncontradoException;
import com.saep.saep.exception.ProdutoJaExisteException;
import com.saep.saep.model.Produto;
import com.saep.saep.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    private void validarProduto(ProdutoRequestDto dto){
        if(dto.nomeProduto().trim().isEmpty()) throw new CampoVazioException("Nome do produto está vazio");

        if(dto.quantidade() < 0 ) throw new EdicaoInvalidaException("Quantidade não pode ser inferior a zero");

        if(dto.quantidadeMinima() < 0) throw new EdicaoInvalidaException("Quantidade minima não pode ser inferior a zero");

        if(produtoRepository.findByNome(dto.nomeProduto()).isPresent()) throw new ProdutoJaExisteException("Produto já cadastrado");
    }

    private void validarEdicao(ProdutoEditDto dto){
        if(dto.nomeProduto().trim().isEmpty()) throw new CampoVazioException("Nome do produto está vazio");

        if(dto.quantidade() <= 0 ) throw new EdicaoInvalidaException("Quantidade não pode ser inferior a zero");

        if(dto.quantidadeMinima() <= 0) throw new EdicaoInvalidaException("Quantidade minima não pode ser inferior a zero");
    }

    private Produto buscarPeloId(UUID id){
        return produtoRepository.findById(id).orElseThrow(() -> new NaoEncontradoException("Produto não encontrado"));
    }

    public ResponseEntity<?> cadastrar(ProdutoRequestDto dto) {
        validarProduto(dto);
        Produto produto = new Produto(
                dto.nomeProduto(),
                dto.quantidade(),
                dto.quantidadeMinima()
        );
        produtoRepository.save(produto);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> listar(){
        List<Produto> lista =  produtoRepository.findAll();
        List<ProdutoResponseDto> dto = lista.stream()
                .map(ProdutoResponseDto::paraDto)
                .toList();
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<?> buscarNome(String nome){
        List<Produto> lista = produtoRepository.findByNomeContains(nome);
        List<ProdutoResponseDto> dto = lista.stream()
                .map(ProdutoResponseDto::paraDto)
                .toList();
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<?> editar(ProdutoEditDto dto){
        Produto produto = buscarPeloId(dto.id());
        validarEdicao(dto);
        produto.setNome(dto.nomeProduto());
        produto.setQuantidade(dto.quantidade());
        produto.setQuantidadeMinima(dto.quantidadeMinima());
        produtoRepository.save(produto);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> excluir(UUID id){
        Produto produto = buscarPeloId(id);
        produtoRepository.delete(produto);
        return ResponseEntity.ok().build();
    }
}
