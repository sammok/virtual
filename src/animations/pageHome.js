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
    homeParticle.init(this.stage);
    homeParticle.createParticles();
    this.pagination = pagination(stage);
    this.pagination.paging( { tipsId: 'p1-tips', onClick: () => this.goNextPage() });
    
  }
};
