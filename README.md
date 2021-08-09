# api-ongs-doacao
Api desenvolvida para o gerenciamento de sites com foco em adoção de animais.

# Documentação 

* [Pegar todos os usuarios](https://github.com/rdrsantos/api-ongs-doacao#pegar-todos-os-usuarios).
* [Pegar usuario pelo id](https://github.com/rdrsantos/api-ongs-doacao#pegar-usuario-pelo-id).
* [Cadastrar um usuario](https://github.com/rdrsantos/api-ongs-doacao#cadastrar-um-usuario).


## Pegar todos os usuarios

**GET** ```http://localhost:8080/api/users```

Resposta
```
[
    {
        "id": 1,
        "name": "User 1",
        "email": "user@email.com",
    },
    {
        "id": 2,
        "name": "User 2",
        "email": "user2@email.com",
    },
    {
        "id": 3,
        "name": "User 3",
        "email": "user3@email.com",
    }
]
```

## Pegar usuario pelo id
**GET** ```http://localhost:8080/api/user/id```

Exemplo
**GET** ```http://localhost:8080/api/user/1```

Resposta
```
[
    {
        "id": 1,
        "name": "User 1",
        "email": "user@email.com",
    }
]
```

## Cadastrar um usuario
**POST** ```http://localhost:8080/api/user```


Exemplo usando o axios
```
  let userData = {
      "name": "Rodrigo",
      "email": "r@email.com",
      "password": "123"
  }
  
  axios.post('http://localhost:8080/api/user', userData);
```
