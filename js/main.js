$(function () {
	// ------------------------------------------------------------
	// Slick Slider（プラグイン）の初期化
	// ------------------------------------------------------------
	$(".slider").slick({
		autoplay: true, //自動でスクロール
		autoplaySpeed: 0, //自動再生のスライド切り替えまでの時間を設定
		speed: 5000, //スライドが流れる速度を設定
		cssEase: "linear", //スライドの流れ方を等速に設定
		slidesToShow: 4, //表示するスライドの数
		swipe: false, // 操作による切り替えはさせない
		arrows: false, //矢印非表示
		pauseOnFocus: false, //スライダーをフォーカスした時にスライドを停止させるか
		pauseOnHover: false, //スライダーにマウスホバーした時にスライドを停止させるか
		responsive: [
			{
				breakpoint: 750,
				settings: {
					slidesToShow: 2, //画面幅750px以下でスライド2枚表示
				},
			},
		],
	});
});

// ------------------------------------------------------------
// スムーズスクロール関数　指定したターゲット要素へスムーズスクロールする関数
// ------------------------------------------------------------
function linkscroll(target) {
	const headerHeight = 80; // 固定ヘッダーの高さを調整（スクロール位置からこの分引く）
	// ターゲット要素を取得
	const element = document.querySelector(target);
	// 要素の表示位置（ブラウザ上での相対位置）を取得し、スクロール位置を計算
	const position = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
	// スムーズにスクロールする
	window.scrollTo({
		top: position, // スクロール先のY座標（調整済み）
		behavior: "smooth", // アニメーションのようにスムーズに移動
	});
}

// ------------------------------------------------------------
// メニュー項目のクリックイベント クリックされたら、対応するセクションにスクロールする
// ------------------------------------------------------------
$("#about").click(function () {
	linkscroll("#about-link"); // #main-linkまでスクロール
});

$("#course").click(function () {
	linkscroll("#course-link"); // #course-linkまでスクロール
});

$("#news").click(function () {
	linkscroll("#news-link"); // #news-linkまでスクロール
});

$("#access").click(function () {
	linkscroll("#access-link"); // #access-linkまでスクロール
});

$("#contact").click(function () {
	linkscroll("#contact-link"); // #contact-linkまでスクロール
});

// ------------------------------------------------------------
// TOPに戻るボタンの処理
// ------------------------------------------------------------
const $pagetop = $("#back-to-top");
const $footer = $(".footer");
const footerHeight = $footer.outerHeight();

// スクロールが一定量を超えたらボタンを表示
$(window).scroll(function () {
	if ($(this).scrollTop() > 300) {
		$pagetop.fadeIn();
	} else {
		$pagetop.fadeOut();
	}

	// レスポンシブ表示時のみフッター手前で止める処理
	if (window.innerWidth <= 768) {
		const windowHeight = $(window).height();
		const documentHeight = $(document).height();
		const scrollTop = $(window).scrollTop();
		const scrollBottom = windowHeight + scrollTop;
		const topPosition = documentHeight - footerHeight - $pagetop.outerHeight() - 20; // フッターとボタンの間に少し margin

		if (scrollBottom > documentHeight - footerHeight && scrollTop < topPosition) {
			$pagetop.css("bottom", scrollBottom - (documentHeight - footerHeight) + 20 + "px");
		} else {
			$pagetop.css("bottom", "20px");
		}
	} else {
		// デスクトップ表示の場合は固定位置に戻す
		$pagetop.css("bottom", "20px");
	}
});

// ボタンクリックでページトップへスムーズスクロール
$pagetop.click(function () {
	$("body,html").animate({ scrollTop: 0 }, 500, "swing");
});

// 画面リサイズ時にもフッターとの位置関係を調整 (念のため…！！！！)
$(window).resize(function () {
	if (window.innerWidth <= 768) {
		const windowHeight = $(window).height();
		const documentHeight = $(document).height();
		const scrollTop = $(window).scrollTop();
		const scrollBottom = windowHeight + scrollTop;
		const topPosition = documentHeight - footerHeight - $pagetop.outerHeight() - 20;

		if (scrollBottom > documentHeight - footerHeight && scrollTop < topPosition) {
			$pagetop.css("bottom", scrollBottom - (documentHeight - footerHeight) + 20 + "px");
		} else {
			$pagetop.css("bottom", "20px");
		}
	} else {
		$pagetop.css("bottom", "20px");
	}
});

// ------------------------------------------------------------
// スクロールに合わせてフェードイン
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
	const fadeEls = document.querySelectorAll(".fadeIn");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
				}
			});
		},
		{
			threshold: 0.2, // 要素が20%見えたら発火
		}
	);

	fadeEls.forEach((el) => observer.observe(el));
});
