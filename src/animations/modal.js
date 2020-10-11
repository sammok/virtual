import preload from '../preload';

export default stage => ({
  objectsForDestroy: [],

  draw (modalTextId) {
    let container = new createjs.Container();
    container.x = 75;
    container.y = (CANVAS_HEIGHT - 794) / 2;
    this.objectsForDestroy.push(container);

    //  bg
    let bg = new createjs.Bitmap(preload.queue.getResult('bg-modal'));

    //  bg dot
    for (let i = 0; i < 4; ++i) {
      let g = new createjs.Graphics();
      g.beginFill(createjs.Graphics.getRGB(67, 120, 137));
      g.drawCircle(0, 0, 6); 

      let  s = new createjs.Shape(g);
      s.x = 0;
      s.y = 70 + (26 * i);
      s.alpha = 0.4;
      createjs.Tween.get(s, { loop: true })
        .wait(1000 * i).to({ alpha: 1 }, 1000, createjs.Ease.linear);

      container.addChild(s);
    }

    //  text
    let text = new createjs.Sprite(window.sprites, modalTextId);
    let { width, height } = text.getBounds();
    text.x = (bg.image.width - width) / 2;
    text.y = (bg.image.height - height) / 2;
    text.alpha = 0;

    createjs.Tween.get(text).to({ alpha: 1 }, 750, createjs.Ease.linear);

    container.addChild(bg, text);
    stage.addChild(container);
    stage.setChildIndex(container, 10);
  },

  destroy () {
    this.objectsForDestroy.forEach(obj => stage.removeChild(obj));
  }
});
