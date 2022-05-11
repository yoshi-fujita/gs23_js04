# 課題：APIを使う - Bing Map APIとFirebaseを使った 井戸端チャット

## ① 課題内容 - 井戸端チャット（どんな作品か）
- マンション化、核家族化、大都市化などで減少してしまった近所付き合いを、仮想的な井戸端で補う
- 全地球表面上に、55m間隔で井戸端を設置
- 井戸端チャットアプリを開くと、自動的に最寄りの井戸端に入り、チャットしたり、メッセージを残したり読んだりできる
  - メッセージを読み書きができるのは、参加した最寄りの井戸端のみ
  - その場で複数人でチャットすることもできるし、1人でメッセージを残したり、残されたメッセージを読んだりもできる
- マップ上に、近隣の井戸端に人がいるかどうかを確認できる（メッセージは、そこまで移動して参加しないと読めない）
- 活用例
  - 道を尋ねる、美味しいレストランを尋ねる
  - 悲鳴やサイレンが聞こえた時に、近隣の人と情報交換する
  - 旅先や訪問先で、ローカルの人とコミュニケーションする
  - いろんな場所にメッセージを残す（旅の思い出、Tips、ゲームの手がかり、オリエンテーリング的な遊びに使うなど）

## ② 工夫した点・こだわった点
- Bing MAP APIとFirebaseを使って、多人数で利用できるように作った

## ③ 質問・疑問（あれば）
- dbをroomごとに分けたかったが、"chat"以外にして使い分ける方法が分からなかった
- script type="module"　のスクリプトを別ファイルにする方法をまだ試せていない
  
## ④ その他（感想、シェアしたいことなんでも）
- APIやFirebaseを使うと、思いの外簡単にアプリが作れて感動した。
- 退出機能まで手が回らなかった
- アバターが重ならないように配置したかったが、そこまで手が回っていないので、重なってしまう
- スマホサイズに作るつもりが、なぜか少し大きめになってしまい、スマホだと少しはみ出る
- https://gs23-map.web.app/
