import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card/Card.js';
import Navbor from './components/Navbar/Navbor.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    /* 第1引数には実行させたい副作用関数を記述*/
    const fetchPokemonData = async () => {//非同期処理なのでasync関数を付ける
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);//オブジェクトとして20種類のポケモンのデータが入っている
      console.log(res.next);
      //各ポケモンの詳細なデータを取得
       loadPokemon(res.results);//res.resultsには配列として20種類のポケモンのデータが入っている
       //console.log(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous); //最初はnullになる
      setLoading(false);
    };
    fetchPokemonData();
  }, []);
  const loadPokemon = async(data) => {//res.resultsをdataとして受け取る。
    let _pokemonData = await Promise.all(//20種類のポケモン一つ一つのURLを読み取っている
      data.map((pokemon) => {
        //console.log(pokemon);//pokemonには、nameとurlがループで入っている
        let pokemoRecord = getPokemon(pokemon.url);
         return pokemoRecord;
      })
    );
    setPokemonData(_pokemonData);//pokemoDataには、20種類のポケモンの詳細なデータ（体重、身長など）が入っている
  };

//console.log(pokemonData);

const handleNextPage = async () => {
  setLoading(true);
  let data = await getAllPokemon(nextURL);//次のポケモンのデータが取得できる
  //console.log(data);//dataの中にはnextの中に次のポケモンのデータ、previousの中に前のページのポケモンのデータが入っている
  await loadPokemon(data.results);
  setNextURL(data.next);
  setPrevURL(data.previous);
  setLoading(false);
};

const handlePrevPage = async () => {
  if(!prevURL) return;
  setLoading(true);
  let data = await getAllPokemon(prevURL);
  await loadPokemon(data.results);
  setNextURL(data.next);
  setPrevURL(data.previous);
  setLoading(false);
};

  return (
   <>
    <Navbor/> 
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) =>{ //pokemonは各要素の値,iはインデックス
              return<Card key={i} pokemon={pokemon} />;//keyプロパティにはi,pokemonプロパティには各ポケモンの情報が渡される
            } )}
          </div>
          <div className='btn'>
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
   </>
  );
}

export default App;
