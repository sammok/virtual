let api  =  (false)  ? 'http://192.168.50.110:8081' : 'https://qncdn.mercurymage.com/virtual01';

export default {
  queue: new createjs.LoadQueue(),
  load(cb) {
    let partILoaded = false;
    this.queue.installPlugin(createjs.Sound);
    this.queue.on("complete", handleComplete, this);

    const loadPartI = () => {
      let manifest = [
        {
          id: 'btn-home',
          src: api + '/btn-home.png?a=2'
        },
        {
          id: 'p1-bg',
          src: api + '/p1-bg.jpg?a=2'
        },
        {
          id: 'p1-tips',
          src: api + '/p1-tips.png?a=2'
        },
        {
          id: 'p2-tips',
          src: api + '/p2-tips.png?a=2'
        },
        {
          id: 'p3-tips',
          src: api + '/p3-tips.png?a=2'
        },
        {
          id: 'p4-tips',
          src: api + '/p4-tips.png?a=2'
        },
        {
          id: 'btn01',
          src: api + '/btn01.png?a=2'
        },
        {
          id: 'btn02',
          src: api + '/btn02.png?a=2'
        },
        {
          id: 'btn03',
          src: api + '/btn03.png?a=2'
        },
        {
          id: 'bg01',
          src: api + '/bg01.png?a=2'
        },
        {
          id: 'img-text01',
          src: api + '/img-text01.png?a=2'
        },
        {
          id: 'img-text02',
          src: api + '/img-text02.png?a=2'
        },
        {
          id: 'img-text03',
          src: api + '/img-text03.png?a=2'
        },
        {
          id: 'bg-modal',
          src: api + '/bg-modal.png?a=2'
        },
        {
          id: 'modal-text01',
          src: api + '/modal-text01.png?a=2'
        },
        {
          id: 'modal-text02',
          src: api + '/modal-text02.png?a=2'
        },
        {
          id: 'modal-text03',
          src: api + '/modal-text03.png?a=2'
        },
        {
          id: 'modal-text04',
          src: api + '/modal-text04.png?a=2'
        },
        {
          id: 'img-person',
          src: api + '/img-person.png?a=2'
        },
        {
          id: 'person-dot01',
          src: api + '/person-dot01.png?a=2'
        },
        {
          id: 'person-dot02',
          src: api + '/person-dot02.png?a=2'
        },
        {
          id: 'person-dot03',
          src: api + '/person-dot03.png?a=2'
        },
        {
          id: 'person-dot04',
          src: api + '/person-dot04.png?a=2'
        },
        {
          id: 'btn-back',
          src: api + '/btn-back.png?a=2'
        },
  
        //   burning
        {
          id: 'fire',
          src: api + '/fire.png?a=2'
        },
        {
          id: 'bg-burning01',
          src: api + '/bg-burning01.png?a=2'
        },
        {
          id: 'bg-burning02',
          src: api + '/bg-burning02.png?a=2'
        },
        {
          id: 'bg-burning03',
          src: api + '/bg-burning03.png?a=2'
        },
        {
          id: 'burning-a-text01',
          src: api + '/burning-a-text01.png?a=2'
        },
        {
          id: 'burning-a-text02',
          src: api + '/burning-a-text02.png?a=2'
        },
        {
          id: 'burning-a-text03',
          src: api + '/burning-a-text03.png?a=2'
        },
        {
          id: 'burning-b-text01',
          src: api + '/burning-b-text01.png?a=2'
        },
        {
          id: 'burning-b-text02',
          src: api + '/burning-b-text02.png?a=2'
        },
        {
          id: 'burning-b-text03',
          src: api + '/burning-b-text03.png?a=2'
        },
        {
          id: 'burning-c-text01',
          src: api + '/burning-c-text01.png?a=2'
        },
        {
          id: 'burning-c-text02',
          src: api + '/burning-c-text02.png?a=2'
        },
        {
          id: 'burning-c-text03',
          src: api + '/burning-c-text03.png?a=2'
        },
        {
          id: 'tips-line',
          src: api + '/tips-line.png?a=2'
        },
        {
          id: 'tips-hand',
          src: api + '/tips-hand.png?a=2'
        },
        {
          id: 'conclusion-text01',
          src: api + '/conclusion-text01.png?a=2'
        },
        {
          id: 'conclusion-text02',
          src: api + '/conclusion-text02.png?a=2'
        },
        {
          id: 'conclusion-text03',
          src: api + '/conclusion-text03.png?a=2'
        },
        {
          id: 'conclusion-text04',
          src: api + '/conclusion-text04.png?a=2'
        },
        {
          id: 'conclusion-text05',
          src: api + '/conclusion-text05.png?a=2'
        },
        {
          id: 'img-conclusion01',
          src: api + '/img-conclusion01.png?a=2'
        },
        {
          id: 'img-conclusion02',
          src: api + '/img-conclusion02.png?a=2'
        },
        {
          id: 'img-conclusion03',
          src: api + '/img-conclusion03.png?a=2'
        },
        {
          id: 'img-conclusion04',
          src: api + '/img-conclusion04.png?a=2'
        },
        {
          id: 'modal-conclusion01',
          src: api + '/modal-conclusion01.png?a=2'
        },
        {
          id: 'modal-conclusion02',
          src: api + '/modal-conclusion02.png?a=2'
        },
        {
          id: 'modal-conclusion03',
          src: api + '/modal-conclusion03.png?a=2'
        }
      ];
  
      for (let i = 1; i <= 22; ++i) {
        manifest.push({
          id: 'pageFrames' + i,
          src: api + `/frame${ i < 10 ? '0' + i : i}.png?a=2`
        });
      }

      ['a', 'b', 'c'].forEach(id => {
        for (let i = 1; i <= 80; ++i) {
          manifest.push({
            id: `curve${id.toUpperCase()}Frames${i}`,
            src: api + `/curve-${id}-${ i < 10 ? '0' + i : i}.png?a=2`
          });
        }
      });
  
      this.queue.loadManifest(manifest);
    }

    function handleComplete() {
      if (partILoaded) return;
      partILoaded = true;
      cb();
    }

    //  load part 1
    loadPartI();
  }
}