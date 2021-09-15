console.clear();

function Fullpage__init() {
  new fullpage("#fullpage", {
    scrollOverflow: true,
    verticalCentered: false,
    anchors: ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6'],
    menu: ".top-bar .menu-box-1 > ul"
  });

  // 기존 섹션을 다시 활성화 하여, 최초에도 애니메이션이 발동 하도록
  const $current = $("#fullpage");
}

$("body").imagesLoaded(function () {
  // 이 부분을 0으로 바뀌면 로딩화면이 안보일 때가 있습니다. 억지로라도 로딩화면을 보여주려면 이 부분을 남겨두세요. 500이 적당합니다.
  const fakeLoadingMilliSeconds = 3000;
  setTimeout(function () {
    Fullpage__init();
    $(".loading").remove();
  }, fakeLoadingMilliSeconds);
});

// 자기소개 부분 이미지 효과 //
const $window = $(window);

let windowWidth = $window.width();
let windowHeight = $window.height();

$window.resize(_.throttle(function () {
  windowWidth = $window.width();
  windowHeight = $window.height();
}, 100));

$window.resize(_.throttle(function () {
  MousemoveEffect1__update();
}, 100));

let MousemoveEffect1__$el = null;
let MousemoveEffect1__lastPosX = 0;
let MousemoveEffect1__lastPosY = 0;

function MousemoveEffect1__update() {
  MousemoveEffect1__$el.each(function (index, node) {
    const $node = $(node);
    const horRes = $node.data('data-mousemove-effect1-hor-res');
    const verRes = $node.data('data-mousemove-effect1-ver-res');
    
    const x = (MousemoveEffect1__lastPosX - (windowWidth / 2)) * horRes;
    const y = (MousemoveEffect1__lastPosY - (windowHeight / 2)) * verRes;
    $(node).css('transform', 'translateX(' + x + 'px) translateY(' + y + 'px)');
    
    console.log("MousemoveEffect1__lastPosX : " + MousemoveEffect1__lastPosX);
    console.log("MousemoveEffect1__lastPosY : " + MousemoveEffect1__lastPosY);
  });
}

function MousemoveEffect1__init() {
  MousemoveEffect1__$el = $('.mousemove-effect-1-el');

  MousemoveEffect1__$el.each(function (index, node) {
    const $node = $(node);
    $node.data('data-mousemove-effect1-hor-res', $node.attr('data-mousemove-effect1-hor-res') * 1);
    $node.data('data-mousemove-effect1-ver-res', $node.attr('data-mousemove-effect1-ver-res') * 1);
  });

  const MousemoveEffect1__updateThrottled = _.throttle(function () {
    MousemoveEffect1__update();
  }, 10);

  $window.mousemove(function (e) {
    MousemoveEffect1__lastPosX = e.clientX;
    MousemoveEffect1__lastPosY = e.clientY;

    MousemoveEffect1__updateThrottled();
  });
}

MousemoveEffect1__init();