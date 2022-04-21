const getPlayList = (): {
  title: string
  cover: string
  duration: string
}[] => {
  return [
    {
      title: '灰よ　　（TVアニメ「ベルセルク」劇中歌）',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
    {
      title: 'BERSERK-Forces 2016',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
    {
      title: 'Aria　　（劇場映画「ベルセルク 黄金時代篇」三部作 主題曲）',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
    {
      title:
        'FORCES II （「ベルセルク 千年帝国の鷹篇 喪失花の章」ゲームサウンドトラック）',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
    {
      title:
        'ZODDO II （「ベルセルク 千年帝国の鷹篇 喪失花の章」ゲームサウンドトラック）',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
    {
      title: '冠毛種子の大群 (Large Chamber ver.)',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
    {
      title: 'INDRA 2016',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
    {
      title: 'Ash Crow　　（TVアニメ「ベルセルク」劇中歌）',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
    {
      title: 'Aria （カラオケ）',
      cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
      duration: '3:45',
    },
  ]
}

const getPlayListInfo = (): {
  title: string
  cover: string
  owner: string
  description: string
} => {
  return {
    title: 'ベルセルク サウンドトラック集「Ash Crow」',
    cover: 'https://m.media-amazon.com/images/I/61SlokFg9yL._AC_SX450_.jpg',
    owner: '平沢進',
    description:
      '平沢進が約２０年にわたり手掛け続けた、人気漫画「ベルセルク」映像化作品のサウンドトラックの中から１０曲を厳選。オリジナルに加えトラック２．６．７．１０は今作初収録のリアレンジ・バージョン。「ベルセルク」唯一無二の世界観を支える、名曲集。ファン必携の永久保存盤',
  }
}

export { getPlayList, getPlayListInfo }
