import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  }, []);

  const [repositories, setRepository] = useState([]);

  async function handleAddRepository() {
    const repository = {
      title: "Desafio conceito ReactJS",
      url: "https://skylab.rocketseat.com.br/",
      techs: ["React, ReactJS"]
    };

    api.post('repositories', repository)
    .then((response) => {
      setRepository([...repositories, response.data])
    }) 
    .catch((error) => {
      console.log(error)
    })  
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    const newRepositorie = repositories;
    newRepositorie.splice(repositoryIndex, 1);
    api.delete(`repositories/${id}`)
    .then(()=> {
      setRepository([...newRepositorie]);      
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            <li key={repository.id}>
            {repository.title}
  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )
        }
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
