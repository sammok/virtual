import preload from "../preload";
import pageText from "./pageText";
import pagination from "./pagination";
import pageBurning from "./pageBurning";
import creator from "./creator";

export default {
  objectsForDestroy: [],

  particleSystems: [],

  createBg() {
    let bitmap = creator.bgCreator("bg01");
    this.objectsForDestroy.push(bitmap);
    this.stage.addChild(bitmap);
    this.stage.setChildIndex(bitmap, 10);
  },

  createButtons() {
    [
      {
        name: "btn01",
        x: -PSD_WIDTH,
        y: 230,
        wait: 0,
        onClick: () => {
          this.drawBurning({
            y: 230,
            cb: () => {
              this.destroy();
              pageText.init(this.stage);
            },
          });
        },
      },
      {
        name: "btn02",
        x: -PSD_WIDTH,
        y: 470,
        wait: 1000,
        onClick: () => {
          this.drawBurning({
            y: 470,
            cb: () => {
              this.destroy();
              pageBurning.init(this.stage);
            },
          });
        },
      },
      {
        name: "btn03",
        x: -PSD_WIDTH,
        y: 708,
        wait: 2000,
        onClick: () => {
          this.drawBurning({
            y: 708,
            cb: () => {
              this.destroy();
              if (!document.querySelector('.video').innerHTML.includes('source')) {
                let video = document.createElement('source');
                video.src = 'http://qncdn.mercurymage.com/virtual03/video2.mp4';
                // video.poster = 'http://qncdn.mercurymage.com/virtual03/cover-video.jpg';
                video.type = 'video/mp4';
                document.querySelector('.video').appendChild(video);
              }
              document.querySelector('body').classList.add('character03Active');
              document.querySelector('.dot').style.top = 0;
            },
          });
        },
      },
    ].forEach(({ name, x, y, wait, onClick }, index) => {
      let bitmap = new createjs.Bitmap(preload.queue.getResult(name));
      bitmap.x = x;
      bitmap.y = y;
      bitmap.alpha = 0;
      this.objectsForDestroy.push(bitmap);
      onClick && bitmap.addEventListener("click", onClick);

      let toX = PSD_WIDTH / 2 - 592 / 2;
      createjs.Tween.get(bitmap)
        .wait(wait)
        .to({ x: toX, alpha: 1 }, 750, createjs.Ease.easeOut)
        .on("complete", () => {
          if (this.destroyed) return;
          createjs.Tween.get(bitmap, { loop: true })
            .wait(wait)
            .to({ alpha: 0.7 }, 1400, createjs.Ease.bounceOut)
            .to({ alpha: 1 }, 600, createjs.Ease.bounceIn);
          this.createParticles({ y: y + 74, index });
        });
      this.stage.addChild(bitmap);
      this.stage.setChildIndex(bitmap, 20);
    });
  },

  drawBurning({ y, cb }) {
    //  翻页
    let fireData = {
      images: [preload.queue.getResult(`fire`)],
      frames: [],
      animations: {
        run: {
          frames: [],
          speed: 0.3,
          next: false,
        },
      },
    };
    for (let i = 19; i >= 0; --i) {
      fireData.frames.push([402 * i, 0, 402, 70]);
      fireData.animations.run.frames.push(19 - i);
    }
    var spriteSheet = new createjs.SpriteSheet(fireData);
    var animation = new createjs.Sprite(spriteSheet, "run");
    animation.x = (PSD_WIDTH - 402) / 2;
    animation.y = y + 70;
    animation.on("animationend", () => {
      setTimeout(cb, 50);
    });

    this.objectsForDestroy.push(animation);
    this.stage.addChild(animation);
    this.stage.setChildIndex(animation, 100);
  },

  createParticles({ y, color, index }) {
    function Particle() {
      this.lifetime = 100;
      this.size = { min: 1, max: 1 };
      this.position = { x: 0, y: 0 };
      this.finalPosition = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      this.shape = null;

      this.isDead = function () {
        return this.lifetime < 1;
      };

      this.update = function (stage) {
        if (this.shape == null) {
          this.shape = new createjs.Shape();
          this.shape.graphics.beginFill("white");
          let size = rand(this.size.min, this.size.max);
          this.shape.graphics.drawRect(
            this.position.x,
            this.position.y,
            size,
            size
          );
          // this.shape.alpha = rand(1, 1);

          createjs.Tween.get(this.shape)
            .to(
              { x: this.finalPosition.x, y: this.finalPosition.y * -1 },
              this.lifetime
            )
            .on("complete", () => {
              this.lifetime = 0;
            });

          // createjs.Tween.get(this.shape)
          //   .to({ alpha: 0 }, 2500 * Math.random()).on('complete', () => {
          //     this.lifetime = 0;
          //   });

          stage.addChild(this.shape);
        }
        this.lifetime -= rand(10, 60);
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
          } else {
            p.update();
          }
        });

        this.generateParticles(stage);
      };

      this.destroy = function (stage) {
        console.log("destroy particles");
        createjs.Ticker.removeEventListener("tick", tickUpdateHandler);
        this.particles.forEach((particle) => particle.dispose(stage));
      };

      this.generateParticles = (stage) => {
        let maxGenerate = Math.min(
          rand(2, 5),
          this.count - this.particles.length
        );
        for (let i = 0; i < maxGenerate; ++i) {
          genParticle(stage);
        }
      };

      const genParticle = (stage) => {
        let p = new Particle();
        p.lifetime = rand(this.lifetime.min, this.lifetime.max);
        p.position = {
          x: rand(this.position.x.min, this.position.x.max),
          y: rand(this.position.y.min, this.position.y.max),
        };
        p.size = this.size;
        p.finalPosition = {
          x: rand(this.finalPosition.x.min, this.finalPosition.x.max),
          y: rand(this.finalPosition.y.min, this.finalPosition.y.max),
        };
        this.particles.push(p);
        p.update(stage);
      };
    }

    let ps = new ParticleSystem();
    ps.lifetime = ({ 0: { min: 2000, max: 3000 }, 1: { min: 6000, max: 7000 }, 2: { min: 7000, max: 8000 } })[index];
    ps.position = {
      x: { min: 160, max: 520 },
      y: { min: y, max: y + rand(10, 60) },
    };
    ps.finalPosition = {
      x: ({ 0: { min: 100, max: 400 }, 1: { min: 900, max: 1100 }, 2: { min: 1400, max: 1600 }})[index],
      y: { min: ps.position.y.min, max: ps.position.y.max },
    };
    ps.size = { min: 2, max: 2 };
    ps.count = 1000;

    this.particleSystems.push(ps);

    //  update particles
    const tickUpdateHandler = () => {
      if (this.destroyed) return;
      ps && ps.update(this.stage);
      this.stage.update();
    };
    createjs.Ticker.addEventListener("tick", tickUpdateHandler);
  },

  destroy() {
    console.log('destroy')
    this.destroyed = true;
    this.objectsForDestroy.forEach((obj) => this.stage.removeChild(obj));
    this.pagination && this.pagination.destroy();
    this.particleSystems.forEach((ps) => ps.destroy(this.stage));
  },

  init(stage) {
    console.log("page menu init");
    this.stage = stage;
    this.destroyed = false;
    this.createBg();
    setTimeout(() => {
      this.createButtons();
    }, 50);;
    this.pagination = pagination(stage);
    this.pagination.paging();
  },
};
