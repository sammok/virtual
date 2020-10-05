export default {
  stage: null,

  particleSystems: [],

  destroyed: false,
  
  createParticles() {
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

      this.update = function (container) {
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
            .to({ x: this.finalPosition.x, y: this.finalPosition.y * -1}, this.lifetime).on('complete', () => {
              this.lifetime = 0;
            });
          
          // createjs.Tween.get(this.shape)
          //   .to({ alpha: 0 }, 2500 * Math.random()).on('complete', () => {
          //     this.lifetime = 0;
          //   });

          container.addChild(this.shape);
        }
        this.lifetime -= 1;
      };

      this.dispose = function (container) {
        container.removeChild(this.shape);
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
      this.container = null;
      this.objectsForDestroy = [];

      this.update = function () {
        this.particles.forEach((p, i, array) => {
          if (p.isDead()) {
            p.dispose(this.container);
            array.splice(i, 1);
          }
          else {
            p.update(this.container);
          }
        });

        this.generateParticles();
      };

      this.destroy = function () {
        console.log('destroy particles');
        createjs.Ticker.removeEventListener("tick", tickUpdateHandler);
        this.particles.forEach(particle => particle.dispose(this.container));
      }

      this.generateParticles = () => {
        let maxGenerate = Math.min(rand(this.generatePerRound.min, this.generatePerRound.max) >> 0, this.count - this.particles.length);
        for (let i = 0; i < maxGenerate; ++i) {
          genParticle();
        }
      }

      const genParticle = () => {
        let p = new Particle();
        p.lifetime = rand(this.lifetime.min, this.lifetime.max);
        p.position = {
          x: rand(this.position.x.min, this.position.x.max),
          y: rand(this.position.y.min, this.position.y.max)
        };
        p.size = this.size;
        p.finalPosition = { x: rand(this.finalPosition.x.min, this.finalPosition.x.max), y: rand(this.finalPosition.y.min, this.finalPosition.y.max) };
        this.particles.push(p);
        p.update(this.container);
      }
    }

    let ps = new ParticleSystem();
    ps.lifetime = { min: 5000, max: 15000 };
    ps.position = { x: { min: 420, max: 720 }, y: { min: CANVAS_HEIGHT, max: CANVAS_HEIGHT - 500 }  };
    ps.finalPosition = { x: { min: 600, max: PSD_WIDTH }, y: { min: CANVAS_HEIGHT, max: CANVAS_HEIGHT - 500 } };
    ps.size = { min: 1, max: 5 };
    ps.generatePerRound = { min:  3, max: 6 };
    ps.count = 4000;

    let container = new createjs.Container();
    ps.container = container;
    this.stage.addChild(container);

    this.particleSystems.push(ps);

    //  update particles
    const tickUpdateHandler = () => {
      if (ps.destroyed) return;
      ps && ps.update(this.stage);
      this.stage.update();
    }
    createjs.Ticker.addEventListener("tick", tickUpdateHandler);
  },

  destroy() {
    console.log('destroy')
    this.destroyed = true;
    this.particleSystems.forEach((ps) => ps.destroy(this.stage));
  },

  init(stage) {
    this.stage = stage;
    this.createParticles();
  }
};