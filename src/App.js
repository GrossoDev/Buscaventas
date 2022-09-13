import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Queries from './components/Queries';
import Sellers from './components/Sellers';

function App() {
  const [queries] = useState([
    {
      id: 0,
      title: 'Mouse',
      results: [
        {
          id: 0,
          title: 'Mouse Inalámbrico Logitech M170 Plateado',
          thumbnail: 'http://http2.mlstatic.com/D_971969-MLA42361716384_062020-I.jpg',
          link: 'https://www.mercadolibre.com.ar/mouse-inalambrico-logitech-m170-plateado/p/MLA15572438',
          freeShipping: true,
          price: 2687,
          seller: {
            id: 0,
            address: 'Capital Federal, Capital Federal',
            link: 'http://perfil.mercadolibre.com.ar/ITECH+AR',
            level: '3_yellow'
          }
        }
      ]
    }
  ]);

  const handleSearch = (queryText) => console.log(queryText);
  const handleFilterQuery = (queryId) => console.log('Filtering query', queryId);
  const handleRemoveQuery = (queryId) => console.log('Removed query', queryId);

  return (
    <div className="App">
      <h1>Buscaventas</h1>

      <SearchBar onSearch={handleSearch} />

      <Queries queries={queries} onFilter={handleFilterQuery} onRemove={handleRemoveQuery} />

      <Sellers />
    </div>
  );
}

export default App;
