const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  autoplay: false,
  audio: [
    {
      name: "绿色",
      artist: '陈雪凝',
      url: 'http://isure.stream.qqmusic.qq.com/C400001luHbo2nQT1Y.m4a?guid=111305117&vkey=2A4D0BA603249B845F0464D2E95049DB573AD0634D01616AED78C4F53152CD6D8D11AC098357C29E10714895BF5B4FD01E29062D6786701E&uin=0&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M0000010UePb4dyfoi.jpg?max_age=2592000',
    },
    {
      name: 'LEMEO',
      artist: '米津玄师',
      url: 'http://isure.stream.qqmusic.qq.com/C400003pZAGe4Q2w81.m4a?guid=111305117&vkey=6E641AD806E273B61B48AD65B3C536088D6A187A78079C51EEA98366EE8E5FD4AE849CD01A0949AB24118F1B4E8611FB55BD21352780F6AC&uin=4066&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M000002OR8wD3Lo3E5.jpg?max_age=2592000',
    },
    {
      name: '世界这么大还是遇见你',
      artist: '程响',
      url: 'http://isure.stream.qqmusic.qq.com/C400001xLIXo2w9V7U.m4a?guid=111305117&vkey=7474A08F36C5A08AEEEB2D383486FBCE1F72A5D4EBAF9AAF7AD466C0A3E2B90E09029FE86CC3FD09FE9B2C18924672694C98881818BD4CD6&uin=4066&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003Ls5Jo4EFBIH.jpg?max_age=2592000',
    }
  ]
});