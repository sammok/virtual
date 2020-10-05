import './index.less';
import $ from 'jquery';
import preload from './preload';
import pageHome from './animations/pageHome';
import pageBurning from './animations/pageBurning';
import pageMenu from './animations/pageMenu';
import pageText from './animations/pageText';
import modal from './animations/modal';
import pageConclusion from './animations/pageConclusion';

//  setting createjs
createjs.Ticker.framerate = 60;
createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

//  App
const App = {
    stage: null,
    initStage() {   
        //  创建 canvas
        this.canvas = document.querySelector('.canvas');
        this.canvas.width = DESIGN_WIDTH;
        this.canvas.height = VIEW_HEIGHT / SCALE;
        this.canvas.style.width = VIEW_WIDTH + "px";
        this.canvas.style.height = VIEW_HEIGHT + "px";

        //  创建舞台
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.on("tick", () => {
            this.stage.update();
        });
        //  支持 touch 事件
        createjs.Touch.enable(this.stage);
        createjs.Touch.enable(this.stage);
    },
    initCharacter03() {
        document.querySelector('.character03-bd').addEventListener('scroll', function () {
            let scrollBarHeight = document.querySelector('.character03-scroll-bar').getBoundingClientRect().height;
            let imgHeight = parseInt(document.querySelector('.img').getBoundingClientRect().height);
            let scrollBar = document.querySelector('.dot');
            scrollBar.style.top = parseInt(this.scrollTop / imgHeight * scrollBarHeight) + 'px';
        });
    },
    initShare() {
        document.querySelector('.icon-refs').addEventListener('click', function () {
            document.querySelector('.refs').style.display = 'block';
        });
    },
    initRefs() {
        document.querySelector('.icon-back').addEventListener('click', function () {
            document.querySelector('.refs').style.display = 'none';
        });
    },
    initBackHome() {
        document.querySelectorAll('.icon-home').forEach(s => {
            s.addEventListener('click', () => {
                document.querySelector('.share').style.display = 'none';
                document.querySelector('.refs').style.display = 'none';
                document.querySelector('.character03').style.display = 'none';
                pageMenu.init(this.stage);
            });  
        })
    },
    init() {
        preload.load(_ => {
            this.initStage();

            this.initBackHome();
            this.initCharacter03();
            this.initShare();
            this.initRefs();

            pageHome.init(this.stage);
            // pageBurning.init(this.stage);
            // pageMenu.init(this.stage);
            // pageText.init(this.stage);
            // pageConclusion.init(this.stage);
            // let modalObj = modal(this.stage);
            // modalObj.draw('modal-text01');
        });
    }
};

//  init
App.init();

