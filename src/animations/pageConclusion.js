import preload from '../preload';
import pagination from './pagination';
import pageMenu from './pageMenu';
import modal from './modal';

export default {
  stage: null,

  backBtn: null,

  objectsForDestroy: [],

  drawedObjects: [],

  createBg() {
    let bg = new createjs.Bitmap(preload.queue.getResult('bg01'));
    this.objectsForDestroy.push(bg);
    this.stage.addChild(bg);
    this.stage.setChildIndex(bg, 10);
  },

  draw() {
    let config = [
      { id: 'conclusion-text01', x: 161, y: 96 },
      { id: 'conclusion-text02', x: 213, y: 236, fromLeft: true },
      { id: 'conclusion-text03', x: 227, y: 290, fromLeft: true },
      { id: 'conclusion-text04', x: 219, y: 345, fromLeft: true },
      { id: 'conclusion-text05', x: 182, y: 396 },
      { id: 'img-conclusion01', x: 33, y: 413 },
      { id: 'img-conclusion02', x: 89, y: 691, modalIndex: 1},
      { id: 'img-conclusion03', x: 89, y: 788 , modalIndex: 2},
      { id: 'img-conclusion04', x: 89, y: 885, modalIndex: 3},
    ];

    config.forEach(({ id, x, y, modalIndex, fromLeft }, index) => {
      let img = new createjs.Bitmap(preload.queue.getResult(id));
      img.x = x;
      img.y = y + 10;
      img.alpha = 0;
      modalIndex && img.addEventListener('click', () => {
        this.cleanDraw();
        let modalObj = modal(this.stage);
        modalObj.draw('modal-conclusion0' + modalIndex);

        let backBtn = new createjs.Bitmap(preload.queue.getResult('btn-back'));
        backBtn.x = PSD_WIDTH - 104;
        backBtn.y = 35;
        backBtn.on('click', () => {
          console.log('click');
          return;
          this.stage.removeChild(backBtn);
          modalObj.destroy();
          this.draw();
        });
        this.stage.addChild(backBtn);
        this.stage.setChildIndex(backBtn, 140);
      });

      if (fromLeft) {
        img.x = -PSD_WIDTH;
        img.alpha = 1;
        createjs.Tween.get(img).wait(250 * index).to({ x}, 1100, createjs.Ease.easeOut);
      }
      else {
        createjs.Tween.get(img).wait(index < 4 ? 250 * index : 400 * index).to({ y: y, alpha: 1}, 450, createjs.Ease.quadIn);
      }

      this.drawedObjects.push(img);
      this.stage.addChild(img);
      this.timer = setTimeout(() => {
        this.genPagination();
      }, config.length * 250);
    });

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

  cleanDraw() {
    this.drawedObjects.forEach(obj => this.stage.removeChild(obj));
    this.stage.removeChild(this.backBtn);
  },

  destroy () {
    this.timer && clearTimeout(this.timer);
    this.cleanDraw();
    this.objectsForDestroy.forEach(obj => this.stage.removeChild(obj));
    this.pagination && this.pagination.destroy();
  },

  genPagination () {
    this.pagination && this.pagination.destroy();
    this.pagination = pagination(this.stage);
    this.pagination.paging({ tipsId: 'p4-tips', onClick: () => {
      this.destroy();
      document.querySelector('.character03').style.display = 'block';
      document.querySelector('.character03-bd').scrollTop = 0;
      document.querySelector('.dot').style.top = 0;
    }});
  },

  init(stage) {
    this.stage = stage;
    this.createBg();
    this.draw();
  }
}