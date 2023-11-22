//20種類のポケモンのデータ
export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {//Promiseオブジェクトを返す
        fetch(url)//データを取得
        .then((res) => res.json())//JSON形式でデータを受け取る
        .then((data) => resolve(data));//dataとして受け取る
    });
};
//一つ一つのポケモンのデータ→体重や身長などのデータも取得
export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data)
        );
    });
};