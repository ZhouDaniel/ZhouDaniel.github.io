const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  autoplay: false,
  audio: [
    {
      name: "绿色",
      artist: '陈雪凝',
      url: 'http://isure.stream.qqmusic.qq.com/C400001luHbo2nQT1Y.m4a?guid=7208467876&vkey=374EC5EFB60C2A3B4A2D9F2936EDB0F0E5B2A9531A774B5EF91C511897E20E873D4A8E992C65F9202442F4D86E6FAC60208986EE8C23E0EA&uin=4066&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M0000010UePb4dyfoi.jpg?max_age=2592000',
    },
    {
      name: 'LEMEO',
      artist: '米津玄师',
      url: 'http://isure.stream.qqmusic.qq.com/C400003pZAGe4Q2w81.m4a?guid=7208467876&vkey=71B1A43D60DADD55082F2C9DE193CB049703EA5352FE9E1C5B452DC302522861260C08B36B0BCC5290C1195A18DD7EF174308E336548FC33&uin=4066&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M000002OR8wD3Lo3E5.jpg?max_age=2592000',
    },
    {
      name: '世界这么大还是遇见你',
      artist: '程响',
      url: 'http://dl.stream.qqmusic.qq.com/C400001xLIXo2w9V7U.m4a?vkey=EC7C3281D3E658CC7F2137AB2D992DD01F896882395200E6C1331DFECB41F16D7324C75C6A44F22609160BD4C65AD9E22E5502D0AC9AE95B&guid=2180150330&uin=0&fromtag=66',
      cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003Ls5Jo4EFBIH.jpg?max_age=2592000',
    }
  ]
});
