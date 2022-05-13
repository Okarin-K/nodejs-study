## リダイレクト

リクエストヘッダーの Location を設定する。  
Location に URL を設定するとその URL に対してリダイレクトしてくれる。

[MDN リダイレクト](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Location)

## URI 設計

| メソッド | パスとクエリ    | 処理               |
| -------- | --------------- | ------------------ |
| GET      | /posts          | 投稿一覧           |
| POST     | /posts          | 投稿とリダイレクト |
| POST     | /posts?delete=1 | 削除               |
| POST     | /login          | ログイン           |
| GET      | /logout         | ログアウト         |

##
