module.exports = {
  new: [
    {
      header: 'CurseForge custom API の導入',
      content: 'CurseForgeはAPIを閉じるみたい。',
      advanced: { cm: '2b37e27a', ms: 'Noo CurseForge, why?' }
    },
    {
      header: 'インスタンスを並べ替えるオプションを追加しました！',
      content: '設定で並び順を選択してみて！',
      advanced: { cm: 'dda24322', pr: '887' }
    },
    {
      header: 'エクスポート先のフォルダを開くオプションを追加しました！',
      content: 'インスタンスをエクスポートした後にあるよ！',
      advanced: { cm: 'e15d6548', pr: '1082' }
    }
  ],
  improvements: [
    {
      header: '「更新の確認」ボタンを追加しました！',
      content: 'CurseForgeのです。',
      advanced: { cm: 'f12465f2' }
    },
    {
      header: 'Electronをアップデートしました！',
      content: 'あとmurmur2の最新バージョンへの対応も',
      advanced: { cm: 'f03d81b5', ms: 'Upgraded Electron to v15.1.0' }
    },
    {
      header:
        'CurseForgeのリクエストを複数スレッドで処理できるようになりました！',
      content: 'パフォーマンス向上に期待。',
      advanced: { cm: '422f9caf' }
    }
  ],
  bugfixes: [
    {
      header: 'ダウンロードした7zipが解凍されない問題を修正。',
      content: '',
      advanced: {
        cm: '2240004d'
      }
    },
    {
      header: 'MacOS .DS_Store に関する修正。',
      content: '',
      advanced: { cm: '7528e587', pr: '1045/511af67' }
    },
    {
      header: 'CSSコードを修正しました。',
      content: '',
      advanced: { cm: '7528e587', pr: '1045' }
    },
    {
      header: 'MacOSのナビゲーションバーのアイコンを修正。',
      content: 'being a bit to far on the right',
      advanced: { cm: '5a245c99', pr: '1074' }
    },
    {
      header: 'ポータブル版のエラーを修正。',
      content: 'not downloading.',
      advanced: { cm: 'e32ee91f' }
    },
    {
      header: 'FTBのダウンロードに関する修正。',
      content: 'ハッシュの違いによる失敗が多発していました。',
      advanced: {
        cm: '77988a42'
      }
    },
    {
      header: 'Modファイルのハッシュチェックに関する修正。',
      advanced: { cm: '5fd0deb4' }
    },
    {
      header: 'Linux .debでのアイコンを修正。',
      content: '',
      advanced: { cm: 'a7f1cb35', pr: '1039' }
    }
  ]
};
