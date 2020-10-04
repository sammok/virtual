export default {
  queue: new createjs.LoadQueue(),
  load(cb) {
    this.queue.installPlugin(createjs.Sound);
    this.queue.on("complete", handleComplete, this);
    let manifest = [
      {
        id: 'btn-home',
        src: 'http://192.168.0.105:8081' + '/btn-home.png?a=1'
      },
      {
        id: 'p1-bg',
        src: 'http://192.168.0.105:8081' + '/p1-bg.jpg?a=1'
      },
      {
        id: 'p1-tips',
        src: 'http://192.168.0.105:8081' + '/p1-tips.png?a=1'
      },
      {
        id: 'p2-tips',
        src: 'http://192.168.0.105:8081' + '/p2-tips.png?a=1'
      },
      {
        id: 'p3-tips',
        src: 'http://192.168.0.105:8081' + '/p3-tips.png?a=1'
      },
      {
        id: 'p4-tips',
        src: 'http://192.168.0.105:8081' + '/p4-tips.png?a=1'
      },
      {
        id: 'btn01',
        src: 'http://192.168.0.105:8081' + '/btn01.png?a=1'
      },
      {
        id: 'btn02',
        src: 'http://192.168.0.105:8081' + '/btn02.png?a=1'
      },
      {
        id: 'btn03',
        src: 'http://192.168.0.105:8081' + '/btn03.png?a=1'
      },
      {
        id: 'bg01',
        src: 'http://192.168.0.105:8081' + '/bg01.png?a=1'
      },
      {
        id: 'img-text01',
        src: 'http://192.168.0.105:8081' + '/img-text01.png?a=1'
      },
      {
        id: 'img-text02',
        src: 'http://192.168.0.105:8081' + '/img-text02.png?a=1'
      },
      {
        id: 'img-text03',
        src: 'http://192.168.0.105:8081' + '/img-text03.png?a=1'
      },
      {
        id: 'bg-modal',
        src: 'http://192.168.0.105:8081' + '/bg-modal.png?a=1'
      },
      {
        id: 'modal-text01',
        src: 'http://192.168.0.105:8081' + '/modal-text01.png?a=1'
      },
      {
        id: 'modal-text02',
        src: 'http://192.168.0.105:8081' + '/modal-text02.png?a=1'
      },
      {
        id: 'modal-text03',
        src: 'http://192.168.0.105:8081' + '/modal-text03.png?a=1'
      },
      {
        id: 'modal-text04',
        src: 'http://192.168.0.105:8081' + '/modal-text04.png?a=1'
      },
      {
        id: 'img-person',
        src: 'http://192.168.0.105:8081' + '/img-person.png?a=1'
      },
      {
        id: 'person-dot01',
        src: 'http://192.168.0.105:8081' + '/person-dot01.png?a=1'
      },
      {
        id: 'person-dot02',
        src: 'http://192.168.0.105:8081' + '/person-dot02.png?a=1'
      },
      {
        id: 'person-dot03',
        src: 'http://192.168.0.105:8081' + '/person-dot03.png?a=1'
      },
      {
        id: 'person-dot04',
        src: 'http://192.168.0.105:8081' + '/person-dot04.png?a=1'
      },
      {
        id: 'btn-back',
        src: 'http://192.168.0.105:8081' + '/btn-back.png?a=1'
      },

      //   burning
      {
        id: 'bg-burning01',
        src: 'http://192.168.0.105:8081' + '/bg-burning01.png?a=1'
      },
      {
        id: 'bg-burning02',
        src: 'http://192.168.0.105:8081' + '/bg-burning02.png?a=1'
      },
      {
        id: 'bg-burning03',
        src: 'http://192.168.0.105:8081' + '/bg-burning03.png?a=1'
      },
      {
        id: 'burning-a-text01',
        src: 'http://192.168.0.105:8081' + '/burning-a-text01.png?a=1'
      },
      {
        id: 'burning-a-text02',
        src: 'http://192.168.0.105:8081' + '/burning-a-text02.png?a=1'
      },
      {
        id: 'burning-a-text03',
        src: 'http://192.168.0.105:8081' + '/burning-a-text03.png?a=1'
      },
      {
        id: 'burning-b-text01',
        src: 'http://192.168.0.105:8081' + '/burning-b-text01.png?a=1'
      },
      {
        id: 'burning-b-text02',
        src: 'http://192.168.0.105:8081' + '/burning-b-text02.png?a=1'
      },
      {
        id: 'burning-b-text03',
        src: 'http://192.168.0.105:8081' + '/burning-b-text03.png?a=1'
      },
      {
        id: 'burning-c-text01',
        src: 'http://192.168.0.105:8081' + '/burning-c-text01.png?a=1'
      },
      {
        id: 'burning-c-text02',
        src: 'http://192.168.0.105:8081' + '/burning-c-text02.png?a=1'
      },
      {
        id: 'burning-c-text03',
        src: 'http://192.168.0.105:8081' + '/burning-c-text03.png?a=1'
      },
      {
        id: 'tips-line',
        src: 'http://192.168.0.105:8081' + '/tips-line.png?a=1'
      },
      {
        id: 'tips-hand',
        src: 'http://192.168.0.105:8081' + '/tips-hand.png?a=1'
      },
      {
        id: 'conclusion-text01',
        src: 'http://192.168.0.105:8081' + '/conclusion-text01.png?a=1'
      },
      {
        id: 'conclusion-text02',
        src: 'http://192.168.0.105:8081' + '/conclusion-text02.png?a=1'
      },
      {
        id: 'conclusion-text03',
        src: 'http://192.168.0.105:8081' + '/conclusion-text03.png?a=1'
      },
      {
        id: 'conclusion-text04',
        src: 'http://192.168.0.105:8081' + '/conclusion-text04.png?a=1'
      },
      {
        id: 'conclusion-text05',
        src: 'http://192.168.0.105:8081' + '/conclusion-text05.png?a=1'
      },
      {
        id: 'img-conclusion01',
        src: 'http://192.168.0.105:8081' + '/img-conclusion01.png?a=1'
      },
      {
        id: 'img-conclusion02',
        src: 'http://192.168.0.105:8081' + '/img-conclusion02.png?a=1'
      },
      {
        id: 'img-conclusion03',
        src: 'http://192.168.0.105:8081' + '/img-conclusion03.png?a=1'
      },
      {
        id: 'img-conclusion04',
        src: 'http://192.168.0.105:8081' + '/img-conclusion04.png?a=1'
      },
      {
        id: 'modal-conclusion01',
        src: 'http://192.168.0.105:8081' + '/modal-conclusion01.png?a=1'
      },
      {
        id: 'modal-conclusion02',
        src: 'http://192.168.0.105:8081' + '/modal-conclusion02.png?a=1'
      },
      {
        id: 'modal-conclusion03',
        src: 'http://192.168.0.105:8081' + '/modal-conclusion03.png?a=1'
      }
    ];

    for (let i = 1; i <= 22; ++i) {
      manifest.push({
        id: 'pageFrames' + i,
        src: 'http://192.168.0.105:8081' + `/frame${ i < 10 ? '0' + i : i}.png?a=1`
      });
    }

    ['a', 'b', 'c'].forEach(id => {
      for (let i = 1; i <= 80; ++i) {
        manifest.push({
          id: `curve${id.toUpperCase()}Frames${i}`,
          src: 'http://192.168.0.105:8081' + `/curve-${id}-${ i < 10 ? '0' + i : i}.png?a=1`
        });
      }
    })

    this.queue.loadManifest(manifest);
    function handleComplete() {
      cb();
    }
  }
}