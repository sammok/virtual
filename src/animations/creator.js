import preload from '../preload';

export default {
  bgCreator (id) {
    let bg = new createjs.Bitmap(preload.queue.getResult(id));
    bg.regX = bg.image.width / 2;
    bg.regY = bg.image.height / 2;
    bg.x = (CANVAS_WIDTH) / 2;
    bg.y = (CANVAS_HEIGHT) / 2;
    let scale = (bg.image.width / bg.image.height) / (CANVAS_WIDTH / CANVAS_HEIGHT);
    bg.scaleX = scale;
    bg.scaleY = scale;
    return bg;
  },

  btnCreator (id) {
    let backBtn = new createjs.Sprite(window.sprites, id);
    let { x, y, width, height } = backBtn.getBounds();
    var hitArea = new createjs.Shape();
    hitArea.graphics.f("#fff").dr(x - 20, y - 20, width + 40, height + 40);
    backBtn.hitArea = hitArea;
    return backBtn;
  }
};