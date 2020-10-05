import preload from '../preload';

export default ((stage) => (
  {
    stage,

    objectsForDestroy: [],
  
    tips(tipsId) {
      let bitmap = new createjs.Bitmap(preload.queue.getResult(tipsId));
      this.objectsForDestroy.push(bitmap);
      bitmap.x = (PSD_WIDTH - 79 - 27);
      bitmap.y = (CANVAS_HEIGHT - 84 - 33);
      createjs.Tween.get(bitmap, { loop: true, reversed: true }).to({ alpha: 0.6 }, 400, createjs.Ease.bounceOut).to({ alpha: 1 }, 600, createjs.Ease.bounceIn);
      this.stage.addChild(bitmap)
      this.stage.setChildIndex(bitmap, 20);
    },
  
    paging({ tipsId, onClick }={}) {
      //  翻页
      var data = {
        images: [],
        frames: {width: 290, height: 307},
        animations: {
            run: {
              frames: [],
              speed: 0.4,
              next: 'repeat'
            },
            repeat: {
              frames: [],
              speed: 0.1
            },
        },
      };

      for (let i = 1; i <= 22; ++i) {
        data.images.push(preload.queue.getResult(`pageFrames${i}`));
        data.animations.run.frames.push(i - 1);
      }


      for (let i = 22; i >= 20; --i) {
        data.images.push(preload.queue.getResult(`pageFrames${i}`));
        data.animations.repeat.frames.push(i - 1);
      }
      
      for (let i = 20; i <= 22; ++i) {
        data.images.push(preload.queue.getResult(`pageFrames${i}`));
        data.animations.repeat.frames.push(i - 1);
      }

      data.animations.run.frames.push();
  
      var spriteSheet = new createjs.SpriteSheet(data);
      var animation = new createjs.Sprite(spriteSheet, 'run');
      animation.x = PSD_WIDTH - 290;
      animation.y = CANVAS_HEIGHT - 307;
      tipsId && animation.on('animationend', () => this.tips(tipsId));
      onClick && animation.addEventListener('click', onClick);
      animation.name = 'pageFrames';
      this.objectsForDestroy.push(spriteSheet);
      this.objectsForDestroy.push(animation);
      this.stage.addChild(animation)
      this.stage.setChildIndex(animation, 100);
    },
  
    destroy() {
      this.objectsForDestroy.forEach(obj => this.stage.removeChild(obj));
    },
  }
));