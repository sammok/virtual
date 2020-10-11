import './index.less';
import preload from './preload';
import pageHome from './animations/pageHome';
import pageBurning from './animations/pageBurning';
import pageMenu from './animations/pageMenu';
import pageText from './animations/pageText';
import modal from './animations/modal';
import pageConclusion from './animations/pageConclusion';
import initMainSprites from "./animations/mainSprites";

//  setting createjs
createjs.Ticker.framerate = 65;
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
    },
    initCharacter03() {
        let isWaitingForShowShare = false;
        let ticking = false;

        function getScrollTop () {
            // 考虑到浏览器版本兼容性问题，解析方式可能会不一样
          return document.documentElement.scrollTop || document.body.scrollTop
        }
        function getWinHeight () {
            // 浏览器可见内容高度 || 浏览器所有内容高度(考虑到浏览器版本兼容性问题，解析方式可能会不一样)
            return document.documentElement.clientHeight || document.body.clientHeight
        }

        function getScrollHeight() {
            let bodyScrollHeight = 0
            let documentScrollHeight = 0
            if (document.body) {
              bodyScrollHeight = document.body.scrollHeight
            }
            if (document.documentElement) {
              documentScrollHeight = document.documentElement.scrollHeight
            }
            return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (document.querySelector('body').classList.contains('character03Active')) {
                        let offset = document.body.offsetHeight;
                        let scrollTop = window.scrollY;
                        let innerHeight = window.innerHeight;
                        let scrollBarHeight = document.querySelector('.character03-scroll-bar').getBoundingClientRect().height;
                        let scrollBar = document.querySelector('.dot');
                        scrollBar.style.top = parseInt(scrollTop / (offset - innerHeight) * (scrollBarHeight - 60)) + 'px';
                        
                        if(!isWaitingForShowShare) {
                            if (getScrollTop() >= parseInt(getScrollHeight()) - getWinHeight()) {
                                isWaitingForShowShare = true;
                                setTimeout(() => {
                                    document.querySelector('body').classList.remove('character03Active');
                                    document.querySelector('.share').style.display = 'block';
                                    isWaitingForShowShare = false;
                                }, 2000);
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
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
                window.scrollTo(0, 0);
                document.querySelector('body').classList.remove('character03Active');
                document.querySelector('.share').style.display = 'none';
                document.querySelector('.refs').style.display = 'none';
                document.querySelector('.character03').style.display = 'none';
                pageMenu.init(this.stage);
                try {
                    document.querySelector('.video').pause();
                } catch (e) {
                    console.log(e);
                }
            });  
        })
    },
    initBGM() {
        let played = false;
        let audio = document.createElement('audio');
        audio.src = 'http://qncdn.mercurymage.com/bkx/bgm1.mp3';
        audio.loop = true;
        document.querySelector('body').appendChild(audio);
        let stage = this.stage;
        stage.addEventListener('click', playAudio);

        function playAudio() {
            if (played) {
                stage.removeEventListener('click', playAudio);
            }
            played = true;
            audio.play();
        }
    },
    loadCSSImags() {
        let data = [
            { src: 'bg-share.jpg', selector: 'share' },
            { src: 'bg01.png', selector: 'refs' },
            { src: 'img-scrollbar.png', selector: 'dot' },
            { src: 'bg-scrollbar.png', selector: 'character03-scroll-bar' },
            { src: 'bg01.png', selector: 'character03' },
            { src: 'btn-home.png', selector: 'icon-home' },
            { src: 'icon-refs.png', selector: 'icon-refs' },
            { src: 'btn-back.png', selector: 'icon-back' },
            { src: 'img-history.png', selector: 'c03-img', type: 'img' },
            { src: 'img-qrcode.png', selector: 'img-qrcode', type: 'img' },
            { src: 'text-refs.png', selector: 'img-refs', type: 'img' },
            { src: 'cover-video.jpg', selector: 'video', type: 'poster' },
        ]
        data.forEach(({ src, selector, type }) => {
            let img = document.createElement('img');
            img.addEventListener('load', function () {
                let that = this;
                if (type === 'img') {
                    document.querySelector(`.${selector}`).src = this.src;
                }
                else if (type === 'poster') {
                    document.querySelector(`.${selector}`).poster = this.src;
                }
                else {
                    document.querySelectorAll(`.${selector}`).forEach(function (selector) {
                        selector.style.backgroundImage = `url('${that.src}')`
                    });
                }
            });
            img.src = 'http://qncdn.mercurymage.com/virtual03/' + src;
        });
    },
    init() {
        preload.load(_ => {
            this.initStage();
            initMainSprites();
            this.initBackHome();
            this.initCharacter03();
            this.initShare();
            this.initRefs();
            this.initBGM();
            this.loadCSSImags();

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

