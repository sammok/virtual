import preload from '../preload';
import pagination from './pagination';
import pageMenu from './pageMenu';
import person from './person';

export default {
  stage: null,

  objectsForDestroy: [],

  drawedObjects: [],

  step: 0,

  backBtn: null,

  createBg() {
    let bg = new createjs.Bitmap(preload.queue.getResult('bg01'));
    this.objectsForDestroy.push(bg);
    this.stage.addChild(bg);
    this.stage.setChildIndex(bg, 10);

    this.backBtn = new createjs.Bitmap(preload.queue.getResult('btn-home'));
    this.backBtn.x = PSD_WIDTH - 104;
    this.backBtn.y = 35;
    this.backBtn.addEventListener('click', () => {
      this.destroy();
      pageMenu.init(this.stage);
    });
    this.objectsForDestroy.push(this.backBtn);
    this.stage.addChild(this.backBtn);
    this.stage.setChildIndex(this.backBtn, 40);
  },
  
  draw ({ array, x, y, width, height, bitmapId }) {
    let img = preload.queue.getResult(bitmapId);
    let letterWidth = 44;
    let letterHeight = 36;
    let container = new createjs.Container();
    container.y = y;
    container.x = x;
    container.width = width;
    container.height = height;
    array.forEach(({ x, y, num }) => {
      new Array(num).fill(0).forEach((letter, index) => {
        let bitmap = new createjs.Bitmap(img);
        let newX = x + (index > 0 ? letterWidth * index : 0);
        bitmap.x = rand(-100, PSD_WIDTH + 100);
        bitmap.y = rand(-100, PSD_HEIGHT + 100);
        bitmap.alpha = 0;
        bitmap.rotation = rand(0, 360);
        bitmap.scale = rand(1, 1.5);
        bitmap.sourceRect = new createjs.Rectangle(newX, y, letterWidth, letterHeight);
        createjs.Tween.get(bitmap).wait(rand(10, 350)).to({ x: newX, y: y, alpha: 1, rotation: 0, scale: 1 }, rand(1200, 1600), createjs.Ease.quadIn);
        container.addChild(bitmap);
      })
    });
    this.drawedObjects.push(container);
    this.stage.addChild(container);
    this.stage.setChildIndex(container, 40);
  },

  clearDraw () {
    this.drawedObjects.forEach(obj => this.stage.removeChild(obj));
  },

  destroy () {
    this.clearDraw();
    this.objectsForDestroy.forEach(obj => this.stage.removeChild(obj));
    this.pagination && this.pagination.destroy();
  },
  
  next () {
    ++ this.step;

    // ++this.step;
    if (this.step === 1) {
      this.draw({
        bitmapId: 'img-text01',
        array: [
          { x: 88, y: 0, num: 5 },
          { x: 88, y: 81, num: 5 },
          { x: 0, y: 240, num: 9 },
          { x: 110, y: 320, num: 4 },
          { x: 84, y: 400, num: 6 },
          { x: 91, y: 480, num: 6 },
        ],
        x: 195,
        y: 327,
        width: 432,
        height: 332,
      });
      this.genPagination();
    }
    else if (this.step === 2) {
      this.clearDraw();
      this.draw({
        bitmapId: 'img-text02',
        array: [
          { x: 47, y: 0, num: 7 },
          { x: 0, y: 81, num: 9 },
          { x: 54, y: 240, num: 7 },
          { x: 38, y: 320, num: 8 },
          { x: 44, y: 400, num: 7 },
        ],
        x: 191,
        y: 264,
        width: 391,
        height: 437
      });
      this.genPagination();
    }
    else if (this.step === 3) {
      this.destroy();
      person.init(this.stage);
    }
  },

  genPagination () {
    this.pagination && this.pagination.destroy();
    this.pagination = pagination(this.stage);
    this.pagination.paging({ tipsId: 'p2-tips', onClick: () => {
      this.next();
    }});
  },

  init (stage) {
    this.step = 0;
    this.stage = stage;
    this.createBg();
    this.next();
  }
};