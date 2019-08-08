import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import './Main.css';

import api from '../services/api';

export default function Main({ match }){

  const [ users, setUsers ] = useState([]);// inicializa a variavel users como um array vazio
  // quando setUsers, é chamado, e a variavel users é atualizada
  // todo conteúdo em return() é re-renderizado(n sei se é assim que se escreve, mas foda se)

  useEffect( () => {

    async function loadUsers(){
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id
        }
      })

      setUsers(response.data);
    }

    loadUsers();   

  }, [ match.params.id ] )

  async function handleLike(id){

    const loggedDev = match.params.id;

    await api.post(`/dev/${id}/likes`, null , {
      headers:{
        user: loggedDev
      }
    })

    // Para atualizar a listagem com os 'novos' usuários
    setUsers(users.filter( user => user._id !== id ))
  }

  async function handleDislike(id){

    const loggedDev = match.params.id;

    await api.post(`/dev/${id}/dislikes`, null , {
      headers:{
        user: loggedDev
      }
    })

    // Para atualizar a listagem com os 'novos' usuários
    setUsers(users.filter( user => user._id !== id ))
  }

  return(
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      { users.length > 0 ? (
        <ul>
          { users.map( (user) => 
            // quando se tem um return() já encapsulado, pode-se usar () para retornar o html 
            (
              <li key={user._id} >
                <img src={user.avatar} alt={user.name} />
                <footer>
                  <strong>
                    {user.name}
                  </strong>
                  <p>
                    {user.bio}
                  </p>
                </footer>
                <div className="buttons">
                  <button type="button" onClick={ () => handleDislike(user._id) }>
                    <img src={dislike} alt="Dislike this bi#%ch" />
                  </button>
                  <button type="button" onClick={ () => handleLike(user._id) }>
                    <img src={like} alt="Like that fella" />
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      ) : (
        <div className="empty">
          Acabou :(
        </div>
      )}      
    </div>
  )
}
