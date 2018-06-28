import React from 'react';
import DeletePersonMuation from './mutations/DeletePersonMutation'

const cardStyle = {
  height: '300px',
  width: '250px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  border: '3px solid black',
  margin: '5px',
  padding: '10px',
  borderRadius: '3px'
};

const Card = props => (
  <div style={cardStyle}>
    <p>Character:</p>
    <h1>{props.name}</h1>
    <p>{props.height}</p>
    <br />
    <h2>Homeworld</h2>
    <p>{props.homeworld.name}</p>
    <h2># of Appearances</h2>
    <p>{props.films.length}</p>
    <p>{props.population}</p>
    <DeletePersonMuation>
    {( loading,err,deletePerson )=>{
      return (
        <div>
        <button onClick={()=>deletePerson({ variables: { id: props.id } })} >Delete</button>
        { loading && <p>Loading...</p>}
        {err && <p>Error :(</p>}
        </div>
      )
    }}
    </DeletePersonMuation>
  </div>
);

export default Card;
