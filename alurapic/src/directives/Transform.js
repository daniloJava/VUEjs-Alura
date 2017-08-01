import Vue from 'vue';

//Criando uma diretiva com nome, e as configurações da diretiva
Vue.directive('meu-transform',{

    /*
    el - referencia do elemento do DOm que a diretiva foi referenciada.
    binding - Pegar o valor passado pela diretiva
    vnode - é uma referência para o Virtual DOM utilizado pelo Vue
    */
    bind(el, binding, vnode){

        let current = 0;

        el.addEventListener('dblclick', function(){
            let increment = binding.value || 90;
            let efeito;
            
            if(!binding.arg || binding.arg == 'rotate') {
                if(binding.modifiers.reverse){
                    current -= increment;
                }else {
                    current += increment;
                }
                
                efeito = `rotate(${current}deg)`
            } else if(binding.arg == 'scale') {
                efeito = `scale(${increment})`;
                }
            
            this.style.transform = efeito;
            
            if(binding.modifiers.animate) this.style.transition = 'transform 0.5s';
        });

    }

});