# CEP Helper Backend

Backend desenvolvido para o projeto Cep Helper, do processo seletivo da Eureka Labs, com o objetivo de funcionar como ponte e ferramente de cache entre o frontend e o serviço externo do ViaCep (https://viacep.com.br/).

## Overview

### Funcionamento

Mais detalhes sobre o funcionamento da aplicação como um todo podem ser encontrados no repositório do frontend em https://github.com/luisfilipefa/viacep-eureka-frontend#funcionamento . O backend acabou ficando bem simples, possuindo uma única rota `GET` em `/api/cep/:cep`, que recebe um CEP como parâmetro e retorna suas informações, que podem ter sido recebidas direto do serviço ViaCep ou retornadas do cache de uma pesquisa anterior ao mesmo CEP.

### Cache

Para estabelecer um funcionamento de cache utilizei um Banco de Dados NOSQL, neste caso em particular, o MongoDB, pela sua facilidade de configuração e possiblidade de utilizar o MongoDB Atlas, que economiza um bom tempo na configuração do banco. O funcionamento do cache está concentrado em um função de middleware, que intercepta todas as requisições para a única rota da API. A função faz uma checagem no banco pra ver se já existem informações sobre aquele CEP, caso existam, o documento do banco é retornado em formato JSON, caso não exista, a requisição é encaminhada ao cepController, responsável por fazer a resquição dos dados ao serviço ViaCep e gravar as informações no banco para pesquisas futuras.

Neste caso não era necessário implementar algum tipo de refresh do cache, então o funcionamento acabou sendo bem simples, caso o refresh fosse necessário, talvez fosse melhor utilizar um outro tipo de solução, como o Redis, por exemplo.

## Tecnologias utilizadas

A API foi toda desenvolvida utilizando Node.js e Typescript, e para a implementação das rotas, middlewares e o server em si, foi utilizado o Express.

## Rodando o backend localmente

No Readme do repositório frontend eu falo um pouco sobre o processo de clonagem e execução em modo local: https://github.com/luisfilipefa/viacep-eureka-frontend#configurando-o-backend ;
