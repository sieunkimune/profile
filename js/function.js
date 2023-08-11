//로딩중
$(function () {
	const $loading = $('.loading');
	$loading.children('p').fadeOut();
	$loading.delay(250).fadeOut(800);
});

//
$(function () {
	const $h1 = $('h1');
	const $home = $('#home');
	const $intro = $home.children('.intro');

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

		$h1.css({
			//선택된 요소가 body로부터 이르는 거리 (left, top)
			top: $intro.offset().top - 72,
		});
	});
});
