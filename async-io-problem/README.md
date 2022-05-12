## Node.js の仕組み

Node.js は非同期 I/O という仕組みで動いている。  
I/O とは Input と Output の頭文字を取ったもので入出力処理のこと。  
多くのプログラミングで言語では I/O 処理の間、プログラムは停止してその I/O 処理が完了するのを待つ。
このような、停止して待つような I/O 処理のことを同期 I/O という。
この時に停止する状態のことをブロッキングという。

非同期 I/O はそれに対してブロッキングをしない。  
ある I/O の処理中も別の処理を行い、コンピューターのリソースを上手く活用します。

## 非同期 I/O の具体例

```
const fs = require('fs');
const fileName = './test.txt';
for (let count = 0; count < 500; count++) {
  fs.appendFile(fileName, 'あ', 'utf8', () => {});
  fs.appendFile(fileName, 'い', 'utf8', () => {});
  fs.appendFile(fileName, 'う', 'utf8', () => {});
  fs.appendFile(fileName, 'え', 'utf8', () => {});
  fs.appendFile(fileName, 'お', 'utf8', () => {});
  fs.appendFile(fileName, '\n', 'utf8', () => {});
}
```

文字列の順番がバラバラになる。  
これは、「あ」という文字を書き込んでいる処理中に「い」の処理などの後続の処理を実行しようとした結果である。
要求された動作は満たしていないけれどその分、CPU のリソースを効率良く利用できている。

```
あいうおえ
いうえおあ
いえあおう
あえいお
ういあうおえ
あいおうえ
あえいう
おうあえ
おいいえあう
おいあえおうあうえいお
あういえ
おい
うおえああ
```

## なんで非同期処理が必要なの？

ディスクに書き込んでいる時間や DB に対してのアクセスなど、待機時間の間に別の処理ができた方が効率が良いから。

コンビニのレジで例えるなら、  
レジでお弁当を温めている間に次のお客さんを対応すると同時に 2 人のお客さんを対応しているから効率がいい。  
同期だとレンジをチンしている間、ぼーっと待つことになるのでめちゃくちゃクレームが入りそう。

## 正しい順番で実行したいときはどうする？

### 同期関数で書く

```
const fs = require('fs');
const fileName = './test.txt';
for (let count = 0; count < 500; count++) {
  fs.appendFileSync(fileName, 'あ', 'utf8');
  fs.appendFileSync(fileName, 'い', 'utf8');
  fs.appendFileSync(fileName, 'う', 'utf8');
  fs.appendFileSync(fileName, 'え', 'utf8');
  fs.appendFileSync(fileName, 'お', 'utf8');
  fs.appendFileSync(fileName, '\n', 'utf8');
}
```

fs.appendFileSync は Sync の名前がつくように同期で動くメソッド。  
これを実行すると正しい順番で「あいうえお」が出るようになる。

しかし、非同期で実行したときと比べると終わるまで時間がかかる。  
これは 500 回の書き込み処理の中でブロッキングしながら処理をしているため。

```
あいうえお
あいうえお
あいうえお
あいうえお
あいうえお
あいうえお
あいうえお
```

### await を使って非同期処理が終わるまで待機する

async/await 構文では async 関数内で await を使うことで非同期処理の待機ができる。  
これにより同期処理っぽく非同期処理が書けるようになる。

待機ってことは同期処理のようにブロッキングしないの？と疑問が出ますが Node.js ではトップレベルのファイルで await 出来ないようになっているのでブロッキングは起きない。  
それが出来てしまうと Node.js のイベントループ自体が停止してしまうので Node.js を使うメリットがすべて消え去る。

```
const fs = require('fs');
const fileName = './test.txt';

async function appendFile(filename, str) {
    return new Promise((resolve) => {
        fs.appendFile(filename, str, 'utf8', () => resolve());
    });
}

for (let count = 0; count < 500; count++) {
  await appendFile(fileName, 'あ', 'utf8');
  await appendFile(fileName, 'い', 'utf8');
  await appendFile(fileName, 'う', 'utf8');
  await appendFile(fileName, 'え', 'utf8');
  await appendFile(fileName, 'お', 'utf8');
  await appendFile(fileName, '\n', 'utf8');
}
```

このように関数の先頭に await を付けてあげることで待機できる。
これで「あいうえお」と正しい順番で書き込みを行うことができる。

## 気になる実行時間

計測してみた  
非同期処理の速さに驚いた。  
ブロッキングしないことの強みを知った。  
同期処理と await を比べると await の方が遅かった。  
しかしブロッキングをしないという大きなメリットがあるので問題ない。

-   同期処理

```
Execution Time: 0.635ms
```

-   非同期処理

```
Execution Time: 0.035ms
```

-   非同期処理(await)

```
Execution Time: 0.963ms
```
