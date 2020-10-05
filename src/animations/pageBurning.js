import preload from '../preload';
import pageConclusion from './pageConclusion';
import pageMenu from './pageMenu';

export default {
  step: 0,

  stage: null,

  objectsForDestroy: [],

  bottomBg: null,

  particleSystems: [],

  texts: [],

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
    this.stage.setChildIndex(this.backBtn, 140);
  },

  createBottomArea() {
    if (this.bottomBg) {
      this.stage.removeChild(this.bottomBg);
      this.objectsForDestroy.splice(this.objectsForDestroy.findIndex(obj => obj === this.bottomBg), 1);
    }
    this.bottomBg = new createjs.Bitmap(preload.queue.getResult(`bg-burning0${this.step + 1}`));
    this.bottomBg.y = PSD_HEIGHT - this.bottomBg.image.height;
    this.objectsForDestroy.push(this.bottomBg);
    this.stage.addChild(this.bottomBg);
    this.stage.setChildIndex(this.bottomBg, 10);
  },

  createTips () {
    let container = new createjs.Container();
    container.y = 115;
    container.x = (PSD_WIDTH - 140) / 2;
    container.alpha = 0;
    let line = new createjs.Bitmap(preload.queue.getResult('tips-line'));
    line.x = 68;
    line.y = 25;
    let hand = new createjs.Bitmap(preload.queue.getResult('tips-hand'));
    createjs.Tween.get(container).wait(250).to({ alpha: 1 }, 1400).on('complete', () => {
      createjs.Tween.get(hand, { loop: true }).to({ x: 20 }, 750, createjs.Ease.linear).to({ x: 0 }, 450, createjs.Ease.linear);
    });
    container.addChild(line, hand);
    this.objectsForDestroy.push(container);
    this.stage.addChild(container);
  },

  initCurve() {
    //  翻页
    var data = {
      images: [],
      frames: { width: 750, height: 460 },
      animations: {
        a: {
          frames: [],
          speed: 0.1,
          next: false,
        },
        b: {
          frames: [],
          speed: 0.1,
          next: false,
        },
        c: {
          frames: [],
          speed: 0.1,
          next: false
        },
      },
    };

    ['a', 'b', 'c'].forEach((id, index) => {
      for (let i = 1; i <= 80; ++i) {
        data.images.push(preload.queue.getResult(`curve${id.toUpperCase()}Frames${i}`));
        data.animations[id].frames.push(i - 1 + 80 * index);
      }
    });

    this.spriteSheet = new createjs.SpriteSheet(data);
  },

  playCurve(index) {
    if (index === 0) {
      setTimeout(() => {
        //  init nav
        const next = () => {
          this.playCurve(++this.step)
        };
        this.next = next;
        this.stage.addEventListener('click', next);
      }, 100);
    }

    if (index === 3) {
      pageConclusion.init(this.stage);
      this.destroy();
      return;
    }

    this.createBottomArea();

    if (this.animation) {
      this.stage.removeChild(this.animation);
    }
    this.animation = new createjs.Sprite(this.spriteSheet, ({ 0: 'a', 1: 'b', 2: 'c' })[index]);
    this.animation.x = 0;
    this.animation.y = PSD_HEIGHT - 445 - 415;
    this.objectsForDestroy.push(this.animation);
    this.stage.addChild(this.animation)
    this.stage.setChildIndex(this.animation, 100);

    if (!this.particleSystems.length) {
      this.createParticles();
    }
    else {
      //  粒子加倍
      this.particleSystems.forEach(ps => {
        ps.count += ps.count * 4;
        ps.generatePerRound = { min: ps.generatePerRound.min * 2, max: ps.generatePerRound.max * 2 };
        ps.lifetime = { min: ps.lifetime.min * 0.75, max: ps.lifetime.max * 0.75 };
        ps.position = { x: { min: 0, max: 0 }, y: { min: PSD_HEIGHT - ({ 0: 450, 1: 520, 2: 670 })[index], max: PSD_HEIGHT }  };
        ps.finalPosition = { x: { min: ({ 0: 140, 1: 400, 2: 600 })[index], max: ({ 0: 432, 1: 648, 2: PSD_WIDTH })[index] }, y: { min: -2, max: -5 } };
      });
    }

    this.drawText(({
      0: [
        { id: 'burning-a-text01', x: 144, y: PSD_HEIGHT - 417 - 58 },
        { id: 'burning-a-text02', x: 194, y: PSD_HEIGHT - 385 - 49 },
        { id: 'burning-a-text03', x: 285, y: PSD_HEIGHT - 54 - 39 },
      ],
      1: [
        { id: 'burning-b-text01', x: 177, y: PSD_HEIGHT - 496 - 43 },
        { id: 'burning-b-text02', x: 127, y: PSD_HEIGHT - 458 - 72 },
        { id: 'burning-b-text03', x: 285, y: PSD_HEIGHT - 54 - 39 },
      ],
      2: [
        { id: 'burning-c-text01', x: 141, y: PSD_HEIGHT - 725 - 60 },
        { id: 'burning-c-text02', x: 90, y: PSD_HEIGHT - 690 - 70 },
        { id: 'burning-c-text03', x: 285, y: PSD_HEIGHT - 54 - 39 },
      ]
    })[index]);
  },

  createParticles({ y, color }={}) {
    function Particle() {
      this.lifetime = 100;
      this.size = { min: 1, max: 1 };
      this.position = { x: 0, y: 0 };
      this.finalPosition = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      this.shape = null;

      this.isDead = function () {
        return (
          this.lifetime < 1
        );
      };

      this.update = function (stage) {
        if (this.shape == null) {
          this.shape = new createjs.Shape();
          this.shape.graphics.beginFill("black")
          this.shape.graphics.drawRect(
            this.position.x,
            this.position.y,
            rand(this.size.min, this.size.max),
            rand(this.size.min, this.size.max),
          );
          // this.shape.alpha = rand(1, 1);
          createjs.Tween.get(this.shape)
            .to({ x: this.finalPosition.x }, this.lifetime).on('complete', () => {
              this.lifetime = 0;
            });
          
          // createjs.Tween.get(this.shape)
          //   .to({ alpha: 0 }, 2500 * Math.random()).on('complete', () => {
          //     this.lifetime = 0;
          //   });

          stage.addChild(this.shape);
          stage.setChildIndex(this.shape, stage.getNumChildren() - 1);
        }
        this.lifetime -= 1;
      };

      this.dispose = function (stage) {
        stage.removeChild(this.shape);
      };
    }

    function ParticleSystem() {
      this.particles = [];
      this.generatedCount = 0;
      this.count = 100;
      this.lifetime = { min: 10, max: 50 };

      this.velocityX = { min: 1, max: 10 };
      this.velocityY = { min: 1, max: 10 };

      this.positionOffsetX = { min: 0, max: 0 };
      this.positionOffsetY = { min: 0, max: 0 };
      this.position = { x: 0, y: 0 };
      this.size = { min: 5, max: 10 };

      this.update = function (stage) {
        this.particles.forEach((p, i, array) => {
          if (p.isDead()) {
            p.dispose(stage);
            array.splice(i, 1);
          }
          else {
            p.update();
          }
        });

        this.generateParticles(stage);
      };

      this.destroy = function (stage) {
        console.log('destroy particles');
        createjs.Ticker.removeEventListener("tick", tickUpdateHandler);
        this.particles.forEach(particle => particle.dispose(stage));
      }

      this.generateParticles = (stage) => {
        let maxGenerate = Math.min(rand(this.generatePerRound.min, this.generatePerRound.max) >> 0, this.count - this.particles.length);
        for (let i = 0; i < maxGenerate; ++i) {
          genParticle(stage);
        }
      }

      const genParticle = (stage) => {
        let p = new Particle();
        p.lifetime = rand(this.lifetime.min, this.lifetime.max);
        p.position = {
          x: rand(this.position.x.min, this.position.x.max),
          y: rand(this.position.y.min, this.position.y.max)
        };
        p.size = this.size;
        p.finalPosition = { x: rand(this.finalPosition.x.min, this.finalPosition.x.max), y: rand(this.finalPosition.y.min, this.finalPosition.y.max) };
        this.particles.push(p);
        p.update(stage);
      }
    }

    let ps = new ParticleSystem();
    ps.lifetime = { min: 5000, max: 15000 };
    ps.position = { x: { min: 0, max: 0 }, y: { min: PSD_HEIGHT - 450, max: PSD_HEIGHT }  };
    ps.finalPosition = { x: { min: 140, max: 432 }, y: { min: -2, max: -5 } };
    ps.size = { min: 1, max: 4 };
    ps.generatePerRound = { min: 2, max: 4 };
    ps.count = 1500;

    this.particleSystems.push(ps);

    //  update particles
    const tickUpdateHandler = () => {
      if (ps.destroyed) return;
      ps && ps.update(this.stage);
      this.stage.update();
    }
    createjs.Ticker.addEventListener("tick", tickUpdateHandler);
  },

  drawText(textInfo) {
    this.texts.forEach((text, i) => {
      this.stage.removeChild(text);
    });

    this.texts = [];

    textInfo.forEach(({ id, x, y }, index) => {
      let bitmap = new createjs.Bitmap(preload.queue.getResult(id));
      bitmap.x = x;
      bitmap.y = y;
      bitmap.alpha = 0;
      bitmap.name = id;
      this.texts.push(bitmap);
      this.stage.addChild(bitmap);
      this.stage.setChildIndex(bitmap, 100);
      createjs.Tween.get(bitmap)
        .wait(750*index)
        .to({ alpha: 1 }, 1450);
    });
  },

  destroy() {
    this.destroyed = true;
    this.objectsForDestroy.forEach(obj => this.stage.removeChild(obj));
    this.texts.forEach(obj => this.stage.removeChild(obj));
    this.particleSystems.forEach(ps => ps.destroy(this.stage));
    this.stage.removeEventListener('click', this.next);
    this.objectsForDestroy = [];
    this.particleSystems = [];
    this.texts = [];
  },

  init(stage) {
    this.step = 0;
    this.stage = stage;
    this.createBg();
    this.initCurve();
    this.createTips();
    this.playCurve(this.step);
  }
};