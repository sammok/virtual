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
        var designWidth = PSD_WIDTH;
        var designHeight = PSD_HEIGHT;
        var viewWidth = SCREEN_WIDTH; // 获取浏览器可视区域宽度
        var viewHeight = SCREEN_HEIGHT; // 获取浏览器可视区域高度
        var scale = viewWidth / designWidth; // 缩放因子
        this.canvas.width = designWidth;
        this.canvas.height = viewHeight / scale;
        this.canvas.style.width = viewWidth + "px";
        this.canvas.style.height = viewHeight + "px";
        
        //  创建舞台
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.on("tick", () => {
            this.stage.update();
        });
        //  支持 touch 事件
        createjs.Touch.enable(this.stage);
    },
    init() {
        preload.load(_ => {
            this.initStage();
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

