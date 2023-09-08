//로딩중
$(function () {
	const $loading = $('.loading');
	$loading.children('p').fadeOut();
	$loading.delay(250).fadeOut(800);

	//load 이벤트는 화면에 데이터가 출력이 완료 된 시점에 발생한다.
	$(window).on('load', function () {
		new WOW().init();
	});
});

//메뉴, 스크롤
$(function () {
	const $h1 = $('h1');
	const $home = $('#home');
	const $header = $home.nextAll('header');
	const $intro = $home.children('.intro');
	const $nav = $header.find('nav'); //직계자손선택 find()
	const $mnus = $nav.find('a');
	const $btnGnb = $header.find('.btn-gnb');
	const $aside = $('aside');

	const headerH = $header.height();
	const arrTopVal = []; //header 이후에 존재하는 section의 top값

	$(window).on('load resize', function () {
		/*
    브라우저 화면의 크기

    1) 스크롤바와 툴바를 포함하지 않은 브라우저 화면의 크기
       window.innerWidth
       window.innerHeight

    2) 스크롤바와 툴바를 포함한 브라우저 화면의 크기
       window.outerWidth
       window.outerHeight
    */
		$home.height(window.innerHeight);

		if (window.innerWidth > 640) {
			//PC모드
			$h1.css({
				//선택된 요소가 body로부터 이르는 거리 (left, top)
				top: $intro.offset().top - 72,
			});

			$nav.show();
		} else {
			//모바일
			$h1.css({
				//선택된 요소가 body로부터 이르는 거리 (left, top)
				top: $intro.offset().top - 100,
			});

			$btnGnb.removeClass('clse');
			$nav.hide();

			$home.css({ transform: 'scale(1)' });
		}

		//각 section의 top값을 배열에 저장
		$('header~section').each(function (idx) {
			arrTopVal[idx] = $(this).offset().top;
		});
	}); //end of load resize 이벤트

	$(window).on('scroll', function () {
		let scrollTop = $(this).scrollTop();
		const $aboutme = $home.nextAll('#aboutme');

		//비주얼에 재미있는 효과
		if (window.innerWidth > 640) {
			if (scrollTop > $(this).height() - 400) {
				$home.css({ transform: 'scale(0.9)' });
			} else {
				$home.css({ transform: 'scale(1)' });
			}
		}

		//헤더 고정
		if (scrollTop > $(this).height()) {
			$header.addClass('fixed');
			$aboutme.css({ marginTop: headerH });
		} else {
			$header.removeClass('fixed');
			$aboutme.css({ marginTop: 0 });
		}

		//메뉴 활성화 표시
		for (let i = 0; i < $mnus.length; i++) {
			if (scrollTop >= arrTopVal[i] - headerH - 150) {
				$mnus.eq(i).parent().addClass('on').siblings().removeClass('on');
			} else if (scrollTop < arrTopVal[0] - headerH - 150) {
				$mnus.parent().removeClass('on');
			}
		} //end of for

		//탑버튼 노출 처리
		if (scrollTop > 120) {
			$aside.fadeIn();
		} else {
			$aside.fadeOut();
		}
	}); //end of scroll

	$mnus.on('click', function (evt) {
		evt.preventDefault();

		//nowIdx
		let nowIdx = $mnus.index(this);
		//animate
		$('html, body')
			.stop()
			.animate({
				scrollTop: arrTopVal[nowIdx] - headerH,
			});

		if (!(window.innerWidth > 640)) {
			$btnGnb.trigger('click'); //클릭이벤트 강제발생
		}
	});

	//반응형 햄버거 버튼
	$btnGnb.on('click', function () {
		$(this).toggleClass('clse');
		$nav.toggle();
	});

	$('.logo')
		.add($aside) //$('.logo, aside')랑 똑같은 것
		.on('click', function (evt) {
			evt.preventDefault();
			$('html, body').stop().animate({
				scrollTop: 0,
			});
		});
});

//ability 영역
$(function () {
	$(window).on('scroll', function () {
		const scrollTop = $(this).scrollTop();

		// ex) (~.offset().top이 3000이라면)3000 - 1000(브라우저 높이 값) + 400 = 2400(2400정도 내려왔을 때 보이게 하라)
		if (scrollTop > $('#ability').offset().top - window.innerHeight + 400) {
			$('#ability .bar').each(function () {
				$(this).width($(this).children('span').text());
			});
		} else if (scrollTop < $('#ability').offset().top - window.innerHeight) {
			$('#ability .bar').width(0); //막대그래프 리셋(스크롤 올렸다가 다시 내려도 재작동)
		}

		// if (scrollTop < $('#ability').offset().top + window.innerHeight) {
		// 	$('#ability .bar').width(0); //막대그래프 리셋(스크롤 내렸다올려도 재작동)
		// }
	});
});

//uxdesign 영역
$(function () {
	const $container = $('#uxdesign>.slides>.slides-container');
	const $indicator = $('#uxdesign>.slides>.slides-pagination>li>a');
	const $btnPrev = $('#uxdesign>.slides>.slides-prev');
	const $btnNext = $('#uxdesign>.slides>.slides-next');

	let nowIdx = 0;

	let aniChk = false; //'현재 애니메이트 중이 아님'을 의미 //차단기 변수

	$btnNext.on('click', function (evt) {
		evt.preventDefault();

		if (!aniChk) {
			aniChk = !aniChk; //애니메이트 중

			if (nowIdx < $indicator.length - 1) {
				nowIdx++;
			} else {
				nowIdx = 0;
			}

			$container.stop().animate({ left: '-100%' }, 400, 'easeInOutCubic', function () {
				const $slides = $('#uxdesign>.slides>.slides-container>li');
				$slides.first().appendTo($container); //마지막 자식으로 li를 이동
				$container.css({ left: 0 });
				aniChk = !aniChk;
			});

			$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
		}
	});

	$btnPrev.on('click', function (evt) {
		evt.preventDefault();

		if (!aniChk) {
			aniChk = !aniChk;

			if (nowIdx > 0) {
				nowIdx--;
			} else {
				nowIdx = $indicator.length - 1;
			}

			const $slides = $('#uxdesign>.slides>.slides-container>li');
			$slides.last().prependTo($container);
			$container.css({ left: '-100%' });
			$container.stop().animate({ left: 0 });
			aniChk = !aniChk;

			$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
		}
	});

	$indicator.on('click', function (evt) {
		evt.preventDefault();
		nowIdx = $indicator.index(this);
		$container.stop().animate({
			left: -100 * nowIdx + '%',
		});

		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
	});

	//3초마다 자동실행 - 인터벌, 다음번인덱스, 이동, 활성화표시
	//다음버튼에 클릭이벤트 트리거 설정
	setInterval(function () {
		$btnNext.trigger('click'); //이벤트 강제발생
	}, 3000);
});

//portfolio 영역
$(function () {
	const $slides = $('#portfolio figure');
	const $indicator = $('#portfolio .slides-pagination a');
	const $btnPrev = $('#portfolio .slides-prev');
	const $btnNext = $('#portfolio .slides-next');

	let nowIdx = 0;
	let oldIdx = nowIdx;

	const fadeFn = function () {
		$slides.eq(oldIdx).stop().fadeOut(200);
		$slides.eq(nowIdx).stop().fadeIn(200).css({ display: 'flex' });

		//인디케이터 활성화
		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
	};

	$indicator.on('click', function (evt) {
		evt.preventDefault();

		oldIdx = nowIdx;
		nowIdx = $indicator.index(this);

		fadeFn();
	});

	$btnPrev.on('click', function (evt) {
		evt.preventDefault();

		oldIdx = nowIdx;
		if (nowIdx > 0) {
			nowIdx--;
		} else {
			nowIdx = $indicator.length - 1;
		}

		fadeFn();
	});

	$btnNext.on('click', function (evt) {
		evt.preventDefault();

		oldIdx = nowIdx;
		if (nowIdx < $indicator.length - 1) {
			nowIdx++;
		} else {
			nowIdx = 0;
		}

		fadeFn();
	});

	//작업과정 라이트박스
	const $btnProc = $('#portfolio .proc');
	const $shadow = $('#portfolio .shadow');
	const $btnClse = $shadow.children('.clse');

	$btnProc.on('click', function (evt) {
		evt.preventDefault();

		$shadow.show();
	});
	$btnClse.on('click', function () {
		$shadow.hide();
	});

	//그림자영역 클릭시 닫힘
	$shadow.on('click', function () {
		$(this).hide();
	});

	//이벤트 전파 차단
	$shadow.children('.lightbox').on('click', function (evt) {
		evt.stopPropagation();
	});

	//ESC키로 닫기
	$(document).on('keyup', function (evt) {
		if (evt.which === 27) {
			$shadow.hide();
		}
	});
});

//contact 영역
$(function () {
	const $tit = $('#contact dt > a');

	$tit.on('click', function (evt) {
		evt.preventDefault();

		$(this).parent().toggleClass('on').next().slideToggle(150);
	});
});
