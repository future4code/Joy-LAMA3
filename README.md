<h1 id="topo">IWFS-S21: LAMA 🎵</h1>

## Labenu Music Awards
Como você deve saber muito bem, o nosso querido chefinho Astrodev é uma pessoa com Networking incrível e ele conhece vários artistas estrelados. Além disso, ele também é um grande ~~megalomaníaco~~ visionário e está planejando fazer um grande evento: o **LAMA**, *Labenu Musical Awards*, um festival  com várias bandas famosas para a formatura da sua turma e, no final, vocês podem eleger a banda que mais gostaram! Entretanto, na opinião dele, vocês só serão merecedores se entregarem um sistema impecável que permita o gerenciamento completo desses shows.

Para isso já deixamos algumas tabelas prontas para vocês não precisarem se preocupar com a modelagem do banco. Deixamos também um template do projeto já com a estrutura da parte de usuários. Vocês podem usá-las a vontade, mas, se quiser fazer do zero sem esse auxílio, também pode.

<h4 align="right"><a href="#topo">Topo</a></h4>


  * [O que funciona](#funciona)
       * [1 - Cadastro](#cadastro)
       * [2 - Login](#login)
       * [3 - Registrar Banda](#regband)
       * [4 - Sobre a Banda](#viewband)
       * [5 - Adicionar Show](#addshow)
       * [6 - Visualizar todos os shows](#getshows)
  ###

  * [O que ainda não funciona](#nfunciona)
       * [7 - Endpoint de criar um ingresso](#)
       * [8 - Comprar ingresso](#)
       * [9 - Adicionar foto](#)
       * [10 - Pegar todas as fotos](#)
###
  
  * [Arquivos Principais](#arquivos)
      * [index.ts](#index)
      * [request.rest](#rrest)
###

  * [Imagens](#imagens)
       * [Sistema de pastas](#pastas)
         * [Pasta @types](#types)
         * [Pasta adapters](#adapters)
         * [Pasta controllers](#controllers)
         * [Pasta data](#data)
         * [Pasta errors](#errors)
         * [Pasta middlewares](#middlewares)
         * [Pasta model](#model)
         * [Pasta repositores](#repositores)
         * [Pasta use-cases](#usecases)
         * [Pasta utils](#utils)

<h4 align="right"><a href="#topo">Topo</a></h4>

- Dicas de modelagem de banco
    
    **Query que cria a tabela de Bandas**
    
    ```sql
    CREATE TABLE IF NOT EXISTS LAMA_BANDAS (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      music_genre VARCHAR(255) NOT NULL,
      responsible VARCHAR(255) UNIQUE NOT NULL 
    )
    ```
    
    **Query que cria a tabela de Shows**
    
    ```sql
    CREATE TABLE IF NOT EXISTS LAMA_SHOWS (
      id VARCHAR(255) PRIMARY KEY,
      week_day VARCHAR(255) NOT NULL,
      start_time INT NOT NULL,
      end_time INT NOT NULL,
      band_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
    )
    ```
    
    **Query que cria tabela de usuários**
    
    ```sql
    CREATE TABLE IF NOT EXISTS LAMA_USUARIOS (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
    )
    ```
<h4 align="right"><a href="#topo">Topo</a></h4>

- Boilerplate do projeto
 
O festival terá duração fixa de 3 dias (sexta, sábado e domingo), começando sempre as 08h e acabando as 23h, totalizando 15h de show a cada dia. As funcionalidades básicas do projeto devem ser:

<h2 id="cadastro">✒️ 1 - Cadastro</h2>

![image](https://user-images.githubusercontent.com/89301596/178123656-162873d6-0914-416a-b1b3-959987d5d6d5.png)

<h4 align="right"><a href="#topo">Topo</a></h4>
    
<h2 id="login">👤 2 - Login</h2>
    
![image](https://user-images.githubusercontent.com/89301596/178123744-d961c333-6d51-4826-a12e-4c028af2ec47.png)

<h4 align="right"><a href="#topo">Topo</a></h4>
    
<h2 id="regband">🎤 3 - Endpoint de registrar banda</h2>
    
![image](https://user-images.githubusercontent.com/89301596/178123787-92bd67ff-6600-498c-be43-6d4b9ae15157.png)

<h4 align="right"><a href="#topo">Topo</a></h4>
    
<h2 id="viewband">📖 4 - Endpoint de visualização de detalhes sobre a banda</h2>
    
![image](https://user-images.githubusercontent.com/89301596/178123799-1da56b2f-7d0d-422f-948e-33b7891496c8.png)

<h4 align="right"><a href="#topo">Topo</a></h4>
    
<h2 id="addshow">🎶 5 - Endpoint de adicionar um show a um dia</h2>
    
![image](https://user-images.githubusercontent.com/89301596/178123823-d75066c1-8552-4e0f-a9d9-72f449d218dd.png)

<h4 align="right"><a href="#topo">Topo</a></h4>
    
<h2 id="getshows">👁️‍🗨️ 6 - Endpoint de pegar todos os shows de uma data</h2>
    
![image](https://user-images.githubusercontent.com/89301596/178123849-5cd35b70-ee2e-4a96-b87d-ab5a7d54a652.png)

<h4 align="right"><a href="#topo">Topo</a></h4>

<h2 id="arquivos">👁️ Arquivos Principais</h2>

<h3 id="index">index.ts</h3>

```javascript
import { Request, Response, NextFunction } from "express";
import { app } from "./server";
import 'express-async-errors'; // https://www.npmjs.com/package/express-async-errors

import { authMiddleware } from "./middlewares/auth";

import { CustomError } from "./errors/CustomError";

import { usersRoutes }from "./routes/usersRoutes";
import { bandRoutes } from "./routes/bandRoutes";

app.use("/user", usersRoutes);
app.use("/band", authMiddleware, bandRoutes);


//* =========================================================
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return error instanceof CustomError 
  ?
  res.status(error.statusCode).send(error.message)
  :
  res.status(500).send(error.message || error.sqlMessage)
});
```

<h4 align="right"><a href="#topo">Topo</a></h4>

<h3 id="rrest">request.rest</h3>

```javascript
// ============================= USERS =====================================

###
POST http://localhost:3003/user/cadaster
Content-Type: application/json

{
"name": "Ricardo Ribeiro",
 "email": "rickhard@gmail.com", 
 "password": "123456",
 "role": "admin"
}

###
POST http://localhost:3003/user/cadaster
Content-Type: application/json

{
"name": "Gabrie",
 "email": "gabriel@gmail.com", 
 "password": "123456",
 "role": "normal"
}

###
POST http://localhost:3003/user/signup
Content-Type: application/json

{
   "email": "rickhard@gmail.com",
   "password": "123456"
}

//====================== BANDS ==============================

###
POST http://localhost:3003/band/register
Content-Type: application/json
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBlY2JmMWQxLWZjOGEtNDRhYy05NWExLTg1YzJjNGU0NzBmNiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1NzE5NTUyOCwiZXhwIjoxNjU3MjgxOTI4fQ.SXa7UDysO4EMhQO1L7ql3vPhpi-AHQ8bhuLjCexQwCg

{
"name": "Banada Teste 1",
 "photo": "Banda teste photo 1", 
 "musicGenre": "BandaTeste music 1",
 "responsible": "Banda Teste responsible 1"
}


###
GET http://localhost:3003/band/Banada Teste 1
Content-Type: application/json
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBlY2JmMWQxLWZjOGEtNDRhYy05NWExLTg1YzJjNGU0NzBmNiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1NzIxODM4OSwiZXhwIjoxNjU3MzA0Nzg5fQ.BVcJ8hitXwkuvZAxhn1N4ZI0jfpovX2gCW-ssR43dEE


###
POST http://localhost:3003/band/schedule/0f6e5890-c2c7-4cf2-9939-b00c094a2b49
Content-Type: application/json
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBlY2JmMWQxLWZjOGEtNDRhYy05NWExLTg1YzJjNGU0NzBmNiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1NzIxODU3MCwiZXhwIjoxNjU3MzA0OTcwfQ.z_GHvsuXG_GNl8bvsC8AcWol_Yk6wQjPZcD9z5Fd5f0

{
   "photo": "Show photo Test 4",
   "weekDay": "SEXTA",
   "startTime": 23,
   "endTime": 5
}
```

<h4 align="right"><a href="#topo">Topo</a></h4>

<h2 id="imagens">Imagens</h2>

<h3 id="pastas">Sistema de Pastas e Arquivos</h3>

![image](https://user-images.githubusercontent.com/89301596/178123024-3c73d048-b671-4572-80a4-3fdb7366f17e.png)

<h4 align="right"><a href="#topo">Topo</a></h4>

<h3 id="types"><span style="color:cyan">Pasta @types</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123168-bcd78424-403b-4afd-bc1c-e7098a2a8e51.png)

<h3 id="adapters"><span style="color:gray">Pasta adapters</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123210-bdec3232-87e3-4268-b537-bfb4a555499a.png)

<h4 align="right"><a href="#topo">Topo</a></h4>

<h3 id="controllers"><span style="color:yellow">Pasta controllers</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123274-d2bda9df-ea28-4361-8e25-e93dbf29b7b8.png)

<h3 id="data"><span style="color:yellow">Pasta data</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123336-1d14e981-873b-41fb-8bf1-2d29b7b71898.png)

<h4 align="right"><a href="#topo">Topo</a></h4>

<h3 id="errors"><span style="color:red">Pasta errors</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123367-6cb428e2-d514-46a4-81cf-b4c5c66a28b0.png)

<h3 id="middlewares"><span style="color:violet">Pasta middlewares</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123418-b6cbd1d7-6de9-4843-b5a1-6a0e6bd3dd7d.png)

<h4 align="right"><a href="#topo">Topo</a></h4>

<h3 id="model"><span style="color:red">Pasta model</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123447-6ba6c90a-a0dc-40fd-a5c0-380974a26be3.png)

<h3 id="repositores"><span style="color:gray">Pasta repositores</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123460-2ba38278-33b5-48f4-9144-e1711c5a7a28.png)

<h3 id="routes"><span style="color:green">Pasta Routes</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123501-bbf83690-9953-449d-bfae-1be66f62b9b4.png)

<h4 align="right"><a href="#topo">Topo</a></h4>

<h3 id="usecases"><span style="color:gray">Pasta use-cases</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123537-6503c10c-f602-43e5-8885-1b535b8eca69.png)

<h3 id="utils"><span style="color:limon">Pasta utils</span></h3>

![image](https://user-images.githubusercontent.com/89301596/178123548-5d693537-5c5e-4996-986f-d2e35d777d3a.png)

<h4 align="right"><a href="#topo">Topo</a></h4>

