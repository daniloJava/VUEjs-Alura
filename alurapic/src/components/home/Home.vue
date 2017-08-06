<template>

  <div>
    <h1 class="centralizado" v-meu-transform:rotate.animate="30" >{{ titulo }}</h1>

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre pelo título da foto">

    <ul class="lista-fotos">

        <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
          <meu-painel :titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:scale.animate="1.5" :url="foto.url" :titulo="foto.titulo"/>
            <meu-botao rotulo="Remover"  tipo="button" :confirmacao="true" @botaoAtivado="remove(foto)" estilo="perigo"></meu-botao>
            <router-link :to="{ name: 'altera', params: { id : foto._id } }">
              <meu-botao rotulo="Alterar" tipo="button" />
            </router-link>
          </meu-painel>
        </li>
        
    </ul>

  </div>

</template>

<script>

import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao  from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {

    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  data() {
    return {
      titulo: 'Alurapic',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },
  computed: {
    
    fotosComFiltro(){
      if(this.filtro){
          /*filtrar */
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      
      } else{
        return this.fotos;
      }
    }
  },

  methods: {

    remove(foto) {
      this.service
        .apaga(foto._id)
          .then(() => {
            let indice = this.fotos.indexOf(foto); // acha a posição da foto na lista
            this.fotos.splice(indice, 1); // a instrução altera o array
            this.mensagem = 'Foto removida com sucesso'
            }, 
            err => this.mensagem = err.message
          )
    }
  },

  created(){

    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
    
    /*
    this.$http.get('v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
      */
  }
}
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }
  
  .filtro {
    display: block;
    width: 100%;
  }

</style>