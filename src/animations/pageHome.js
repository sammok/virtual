import preload from '../preload';
import pageMenu from './pageMenu';
import pagination from './pagination';
import creator from './creator';
import homeParticle from './homeParticle';

export default {
  stage: null,

  objectsForDestroy: [],

  bg() {
    let bitmap = creator.bgCreator('p1-bg');
    this.objectsForDestroy.push(bitmap);
    this.stage.addChild(bitmap)
    this.stage.setChildIndex(bitmap, 0);
  },
  drawBurning() {
    let fireData = {
      images: [preload.queue.getResult('homeBurn-0'), preload.queue.getResult('homeBurn-1')],
      frames: [
        [1, 1, 425, 561, 0, 0, 0],
        [1, 564, 425, 561, 0, 0, 0],
        [1, 1127, 425, 561, 0, 0, 0],
        [428, 1, 425, 561, 0, 0, 0],
        [855, 1, 425, 561, 0, 0, 0],
        [1282, 1, 425, 561, 0, 0, 0],
        [428, 564, 425, 561, 0, 0, 0],
        [428, 1127, 425, 561, 0, 0, 0],
        [855, 564, 425, 561, 0, 0, 0],
        [1282, 564, 425, 561, 0, 0, 0],
        [855, 1127, 425, 561, 0, 0, 0],
        [1282, 1127, 425, 561, 0, 0, 0],
        [1, 1, 425, 561, 1, 0, 0],
        [1, 564, 425, 561, 1, 0, 0],
        [1, 1127, 425, 561, 1, 0, 0],
        [428, 1, 425, 561, 1, 0, 0],
        [855, 1, 425, 561, 1, 0, 0],
        [1282, 1, 425, 561, 1, 0, 0],
        [428, 564, 425, 561, 1, 0, 0],
        [428, 1127, 425, 561, 1, 0, 0],
        [855, 564, 425, 561, 1, 0, 0],
        [1282, 564, 425, 561, 1, 0, 0],
        [855, 1127, 425, 561, 1, 0, 0]
      ],
      animations: {
        homeBurn: { 
          speed: 0.1,
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 
          next: false 
        }
      },
    };

    let container = new createjs.Container();

    var spriteSheet = new createjs.SpriteSheet(fireData);
    var animation = new createjs.Sprite(spriteSheet, "homeBurn");
    animation.x = PSD_WIDTH - 425;
    animation.y = PSD_HEIGHT - 561;

    container.regX = PSD_WIDTH / 2;
    container.regY = PSD_HEIGHT / 2;
    container.x = (CANVAS_WIDTH) / 2;
    container.y = (CANVAS_HEIGHT) / 2;
    let scale = (PSD_WIDTH / PSD_HEIGHT) / (CANVAS_WIDTH / CANVAS_HEIGHT);
    container.scaleX = scale;
    container.scaleY = scale;
    container.addChild(animation);

    this.objectsForDestroy.push(container);
    this.stage.addChild(container);
    this.stage.setChildIndex(container, 100);
  },
  destroy() {
    this.objectsForDestroy.forEach(obj => this.stage.removeChild(obj));
    this.pagination.destroy();
  },
  goNextPage() {
    this.destroy();
    homeParticle.destroy();
    pageMenu.init(this.stage)
  },
  init(stage) {
    this.stage = stage;
    this.bg();
    this.drawBurning();
    homeParticle.init(this.stage);
    homeParticle.createParticles();
    this.pagination = pagination(stage);
    this.pagination.paging( { tipsId: 'p1-tips', onClick: () => this.goNextPage() });
    
  }
};
