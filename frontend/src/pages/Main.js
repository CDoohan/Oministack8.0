import React, {useEffect, useState} from 'react';
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

  return(
    <div className="main-container">
      <img src={logo} alt="Tindev" />
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
                <button type="button">
                  <img src={dislike} alt="Dislike this bi#%ch" />
                </button>
                <button type="button">
                  <img src={like} alt="Like that fella" />
                </button>
              </div>
            </li>
          )

        )}

      </ul>
    </div>
  )
}
