/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

// function Result({ title, thumbnail, link }) {
//   return (
//     <div>
//       <img src={thumbnail} alt="" />

//       <a href={link} target="_blank" rel="noopener noreferrer">
//         <p>{title}</p>
//       </a>
//     </div>
//   );
// }

function FilterModal({ query, onApply, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const { elements } = event.target;
    const contains = elements.contains.value ? elements.contains.value.split(' ') : null;
    const doesntContain = elements.doesntContain.value ? elements.doesntContain.value.split(' ') : null;
    const minPrice = elements.minPrice.value;
    const maxPrice = elements.maxPrice.value;
    const condition = elements.condition.value;

    onApply(contains, doesntContain, minPrice, maxPrice, condition);
  };

  const modalStyle = {
    position: 'absolute',
    top: '30px',
    bottom: '30px',
    left: '60px',
    right: '60px',
    boxShadow: '0px 0px 50px 0px gray',
    backgroundColor: 'white'
  };

  // const resultsBoxStyle = {
  //   overflow: 'scroll',
  //   height: '80%'
  // };

  return (
    <div style={modalStyle}>
      <p>{query.title}</p>

      {/* <div style={resultsBoxStyle}>
        {
          query.results.map((result) => (
            <Result
              key={result.id}
              title={result.title}
              thumbnail={result.thumbnail}
              link={result.link}
            />
          ))
        }
      </div> */}

      <form onSubmit={handleSubmit}>
        <label>
          Contiene:
          <input name="contains" type="text" />
        </label>
        <label>
          No contiene:
          <input name="doesntContain" type="text" />
        </label>
        <label>
          Precio mínimo:
          <input name="minPrice" type="number" />
        </label>
        <label>
          Precio máximo:
          <input name="maxPrice" type="number" />
        </label>
        <label>
          Condición:
          <select name="condition">
            <option value="new">Nuevo</option>
            <option value="used">Usado</option>
            <option value="">Cualquiera</option>
          </select>
        </label>

        <button type="submit">Aplicar filtro</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default FilterModal;