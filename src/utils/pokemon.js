export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)//データを取得
        .then((res) => res.json())//JSON形式でデータを取得
        .then((data) => resolve(data));//dataとして受け取る
    });
};