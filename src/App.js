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
          id: 144,
          title: 'Mouse Inalámbrico Logitech M170 Plateado',
          thumbnail: 'http://http2.mlstatic.com/D_971969-MLA42361716384_062020-I.jpg',
          link: 'https://www.mercadolibre.com.ar/mouse-inalambrico-logitech-m170-plateado/p/MLA15572438',
          freeShipping: false,
          price: 2687,
          seller: {
            id: 0,
            address: 'Capital Federal, Capital Federal',
            link: 'http://perfil.mercadolibre.com.ar/ITECH+AR',
            level: '3_yellow'
          }
        },
        {
          id: 475,
          title: 'Mouse Chistoso',
          thumbnail: 'http://http2.mlstatic.com/D_971969-MLA42361716384_062020-I.jpg',
          link: 'https://www.mercadolibre.com.ar/mouse-inalambrico-logitech-m170-plateado/p/MLA15572438',
          freeShipping: false,
          price: 2687,
          seller: {
            id: 0,
            address: 'Capital Federal, Capital Federal',
            link: 'http://perfil.mercadolibre.com.ar/ITECH+AR',
            level: '3_yellow'
          }
        }
      ]
    },
    {
      id: 1,
      title: 'Teclado',
      results: [
        {
          id: 786,
          title: 'Teclado Gamer Redragon Dyaus K509 Qwerty Español Latinoamérica Color Negro Con Luz De 7 Colores',
          thumbnail: 'http://http2.mlstatic.com/D_807592-MLA44221235366_122020-I.jpg',
          link: 'https://www.mercadolibre.com.ar/teclado-gamer-redragon-dyaus-k509-qwerty-espanol-latinoamerica-color-negro-con-luz-de-7-colores/p/MLA16258548',
          freeShipping: true,
          price: 3476.05,
          seller: {
            id: 0,
            address: 'Capital Federal, Capital Federal',
            link: 'http://perfil.mercadolibre.com.ar/ITECH+AR',
            level: '3_yellow'
          }
        },
        {
          id: 887,
          title: 'Teclado Chistoso',
          thumbnail: 'http://http2.mlstatic.com/D_807592-MLA44221235366_122020-I.jpg',
          link: 'https://www.mercadolibre.com.ar/teclado-gamer-redragon-dyaus-k509-qwerty-espanol-latinoamerica-color-negro-con-luz-de-7-colores/p/MLA16258548',
          freeShipping: false,
          price: 3475.05,
          seller: {
            id: 1,
            address: 'Bahía Blanca, Buenos Aires',
            link: 'http://perfil.mercadolibre.com.ar/NUBBEO',
            level: 'platinum'
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

      <Sellers queries={queries} />
    </div>
  );
}

export default App;
