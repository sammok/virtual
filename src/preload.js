let api  =  (true)  ? 'http://192.168.0.100:8081' : 'http://qncdn.mercurymage.com/virtual03';

export default {
  queue: new createjs.LoadQueue(),
  load(cb) {
    let partILoaded = false;
    this.queue.on("complete", handleComplete, this);

    const loadPartI = () => {
      let manifest = [
        {
          id: 'pageFrame',
          src: api + '/pageFrame.png?a=5'
        },
        {
          id: 'p1-bg',
          src: api + '/p1-bg.jpg?a=5'
        },
        {
          id: 'bg01',
          src: api + '/bg01.png?a=5'
        },
        {
          id: 'bg-modal',
          src: api + '/bg-modal.png?a=5'
        },
        {
          id: 'img-text01',
          src: api + '/img-text01.png?a=5'
        },
        {
          id: 'img-text02',
          src: api + '/img-text02.png?a=5'
        },
       
        // {
        //   id: 'img-person',
        //   src: api + '/img-person.png?a=5'
        // },
  
        //   burning
        {
          id: 'fire',
          src: api + '/fire.png?a=5'
        },
        {
          id: 'bg-burning01',
          src: api + '/bg-burning01.png?a=5'
        },
        {
          id: 'bg-burning02',
          src: api + '/bg-burning02.png?a=5'
        },
        {
          id: 'bg-burning03',
          src: api + '/bg-burning03.png?a=5'
        },
        {
          id: 'homeBurn-0',
          src: api + '/homeBurn-0.jpg?a=5'
        },
        {
          id: 'homeBurn-1',
          src: api + '/homeBurn-1.jpg?a=5'
        },
        {
          id: 'personFrame01',
          src: api + '/personFrame01.png?a=5'
        },
        {
          id: 'personFrame02',
          src: api + '/personFrame02.png?a=5'
        },
        {
          id: 'mainSprites',
          src: api + '/mainSprites.png?a=5'
        }
      ];
  
      for (let i = 0; i <= 23; ++i) {
        manifest.push({
          id: `curve-${i}.png`,
          src: api + `/curve-${i}.png?a=5`
        });
      }
  
      this.queue.loadManifest(manifest);
    }

    const loadPartII = () => {
      let manifest = [
        
      ];
  
      this.queue.loadManifest(manifest);
    }

    function handleComplete() {
      if (partILoaded) return;
      partILoaded = true;
      // loadPartII();
      cb();
    }

    //  load part 1
    loadPartI();
  }
}