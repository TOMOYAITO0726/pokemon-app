import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    /* 第1引数には実行させたい副作用関数を記述*/
    const fetchPokemonData = async () => {//非同期処理なのでasync関数を付ける
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);//オブジェクトとして20種類のポケモンのデータが入っている
      //console.log(res);
      //各ポケモンの詳細なデータを取得
       loadPokemon(res.results);//res.resultsには配列として20種類のポケモンのデータが入っている
       //console.log(res.results);
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
    setPokemonData(_pokemonData);
  };

console.log(pokemonData);

  return (
  <div className="App">
    {loading ? (
      <h1>ロード中・・・</h1>
    ) : (
      <>
      <h1>ポケモンデータを取得しました</h1>
      </>
    )}
  </div>
  );
}

export default App;
