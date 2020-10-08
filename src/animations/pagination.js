import preload from '../preload';
import pageFrame from './pageFrame';

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
      let data = pageFrame();
      data.images = data.images.map(id => preload.queue.getResult(id));
  
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