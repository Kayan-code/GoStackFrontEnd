import React, { useState, useEffect } from 'react';
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techsstring, setTechsstring] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      })
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    const techs = techsstring.split(',');

    const data = {
        title,
        url,
        techs,
    };
    console.log(data);

    try{
      var repository = await api.post('repositories', data);
      setRepositories([...repositories, repository.data]);
       } 
       catch(err){
          alert('Falha no engano ao cadastrar repositório, tente novamente!');
       }         
  }

  async function handleRemoveRepository(id) {
    try{      
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id))
       } 
       catch(err){
          alert('Falha no engano ao remover repositório, tente novamente!');
       }     
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
           )}
         
      </ul>
      
      <form onSubmit={handleAddRepository}>
      <input 
        placeholder="Título do repositório" 
        value={title}
        onChange={e => setTitle(e.target.value)}
        />

        <input 
        placeholder="URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
         />

        <input
         placeholder="Techs"
         value={techsstring}
         onChange={e => setTechsstring(e.target.value)}
          />

          
      <button className="button" type="submit">Adicionar</button>
      </form>

    </div>
  );
}

export default App;
