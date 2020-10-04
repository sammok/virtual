import preload from '../preload';
import pagination from './pagination';
import pageMenu from './pageMenu';
import modal from './modal';

export default {
  stage: null,

  pagination: null,

  objectsForDestroy: [],

  personContainer: null,
  
  person: null,

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

  renderPerson () {
    this.personContainer = new createjs.Container();
    this.person = new createjs.Bitmap(preload.queue.getResult('img-person'));
    this.personContainer.x = (PSD_WIDTH - this.person.image.width) / 2;
    this.personContainer.y = PSD_HEIGHT - this.person.image.height;
    this.personContainer.alpha = 0.53;
    this.personContainer.scaleX = 1.1;
    this.personContainer.scaleY = 1.1;
    createjs.Tween.get(this.personContainer).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1200, createjs.Ease.easeOut);
    
    let personDot01 = new createjs.Bitmap(preload.queue.getResult('person-dot01'));
    personDot01.x = 237;
    personDot01.y = 100;

    let personDot02 = new createjs.Bitmap(preload.queue.getResult('person-dot02'));
    personDot02.x = 396;
    personDot02.y = 274;

    let personDot03 = new createjs.Bitmap(preload.queue.getResult('person-dot03'));
    personDot03.x = 149;
    personDot03.y = 340;

    let personDot04 = new createjs.Bitmap(preload.queue.getResult('person-dot04'));
    personDot04.x = 211;
    personDot04.y = 479;

    [personDot01, personDot02, personDot03, personDot04].forEach((dot, index) => {
      dot.alpha = 0.6;
      dot.addEventListener('click', () => {
        this.openModal(index);
      });
      createjs.Tween.get(dot, { loop: true, reversed: true }).wait(rand(10, 350)).to({ alpha: 1 }, rand(1200, 1600), createjs.Ease.quadIn);
    });
    this.personContainer.addChild(this.person, personDot01, personDot02, personDot03, personDot04);
    this.stage.addChild(this.personContainer);
    this.objectsForDestroy.push(this.personContainer);
  },

  openModal (index) {
    this.backBtn.visible = false;
    createjs.Tween.get(this.personContainer).to({ alpha: 0.53, scaleX: 1.1, scaleY: 1.1 }, 750, createjs.Ease.easeOut);

    let modalObj = modal(this.stage);
    modalObj.draw(`modal-text0${index + 1}`);
    let backButton = new createjs.Bitmap(preload.queue.getResult('btn-back'));
    backButton.addEventListener('click', () => {
      this.stage.removeChild(backButton);
      modalObj.destroy();
      this.backBtn.visible = true;
      createjs.Tween.get(this.personContainer).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 750, createjs.Ease.easeOut);
    });
    backButton.x = PSD_WIDTH - 104;
    backButton.y = 35;
    this.stage.addChild(backButton);
    this.stage.setChildIndex(backButton, 30);
  },

  destroy () {
    this.objectsForDestroy.forEach(obj => this.stage.removeChild(obj));
    this.pagination && this.pagination.destroy();
  },

  genPagination () {
    this.pagination && this.pagination.destroy();
    this.pagination = pagination(this.stage);
    this.pagination.paging({ tipsId: 'p3-tips', onClick: () => {
    }});
  },

  init (stage) {
    this.stage = stage;
    this.createBg();
    this.renderPerson();
    this.genPagination();
  }  
}