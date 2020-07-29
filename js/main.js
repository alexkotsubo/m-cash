'use strict';
let body = document.querySelector('body');

// Menu

let menu_link = document.querySelectorAll('.menu-links');

let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

if (isMobile.any()) {
	body.classList.add('touch');
	let arrow = document.querySelectorAll('.menu-link-arrow');
	for(let i = 0, length = arrow.length; i < length; i++) {
		let subMenu = arrow[i].nextElementSibling;

		arrow[i].addEventListener('click', function(e) {
			subMenu.classList.toggle('open');
			arrow[i].classList.toggle('arrow-active');
		});

		for(let index = 0, length = menu_link.length; index < length; index++) {
			menu_link[index].addEventListener('click', function(e) {
				subMenu.classList.remove('open');
				arrow[i].classList.remove('arrow-active');
			});
		}

		document.documentElement.addEventListener('click', function(e) {
			if (!e.target.closest('.menu')) {
				subMenu.classList.remove('open');
				arrow[i].classList.remove('arrow-active');
			}
		});
	}
} else {
	body.classList.add('mouse');
}

let fixed_padding = document.getElementsByClassName('fixed-padding');

// Burger

let check = document.getElementById('burg-check');
let burg_link = document.getElementsByClassName('burg-link');

if (check.checked) {
	burgBodyLock();
} else {
	burgBodyUnLock();
}

for(let i = 0, length = burg_link.length; i < length; i++) {
	burg_link[i].addEventListener('click', function(e) {
		if (check.checked) {
			check.checked = false;
			burgBodyUnLock();
		}
	});
}

check.addEventListener('click', function(e) {
	let popupActive = document.querySelector('.popup.open');

	if (popupActive) {
		closePopup(popupActive, false);
	}

	if (check.checked) {
		burgBodyLock();
	} else {
		burgBodyUnLock();
	}
});

document.documentElement.addEventListener('click', function(e) {
	if ((!e.target.closest('.burger') && check.checked) || (e.target.closest('.black-bg') && check.checked)) {
		check.checked = false;
		burgBodyUnLock();
	}
});

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			fixed_padding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			fixed_padding[i].style.paddingRight = '0px';
		}
	}

	body.style.paddingRight = '0px';
	body.classList.remove('lock');
}

// Slider

$(document).ready(function() {
	$('.review-slider').on('init', function(slick) {
		let menu = document.querySelector('.menu');
		let menu_txt = document.querySelectorAll('.menu-links');
		let heightV = 0;
		let widthV = 0;
		let body_height = 0;
		let scroll = [];
		let max_scroll = [];
		let prevMenu;

		function active_else() {
			heightV = document.body.clientHeight;
			widthV = document.body.clientWidth;
			body_height = document.body.scrollHeight;

			for(let i = 0, length = menu_txt.length; i < length; i++) {
				let class_name = menu_txt[i].className.split('');
				let blockId = '';

				for(let i = 0, length = class_name.length; i < length; i++) {
					if (class_name[i] == 's' && class_name[i + 1] == '-') {
						for(let index = i + 2, length = class_name.length; index < length; index++) {
							if (class_name[index] !== '' && class_name[index] !== ' ') {
								blockId = blockId + class_name[index];
							} else {
								break;
							}
						}
					}
				}

				scroll[i] = document.getElementById(blockId).offsetTop - nav.offsetHeight;
				max_scroll[i] = document.getElementById(blockId).offsetHeight + scroll[i];
			}

			for(let i = 0, length = menu_txt.length; i < length; i++) {
				if (i == 0 && pageYOffset >= scroll[i] || i > 0 && pageYOffset >= scroll[i] && pageYOffset > scroll[i - 1]) {
					if (!(prevMenu == undefined)) {
						menu_txt[prevMenu].classList.remove('menu-active');
					}

					if (pageYOffset <= max_scroll[i]) {
						menu_txt[i].classList.add('menu-active');
						prevMenu = i;
					}
				} else {
					menu_txt[i].classList.remove('menu-active');
				}
			}
		}

		active_else();

		window.addEventListener('scroll', function(e) {
			if (!(menu.style.display == 'none')) {
				if (document.body.clientHeight == heightV && document.body.clientWidth == widthV && document.body.scrollHeight == body_height) {
					for(let i = 0, length = menu_txt.length; i < length; i++) {
						if (i == 0 && pageYOffset >= scroll[i] || i > 0 && pageYOffset >= scroll[i] && pageYOffset > scroll[i - 1]) {
							if (!(prevMenu == undefined)) {
								menu_txt[prevMenu].classList.remove('menu-active');
							}

							if (pageYOffset <= max_scroll[i]) {
								menu_txt[i].classList.add('menu-active');
								prevMenu = i;
							}
						} else {
							menu_txt[i].classList.remove('menu-active');
						}
					}
				} else {
					active_else();
				}
			}
		});
	});

	$('.review-slider').slick({
		slidesToShow: 3,
		arrows: false,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 1001,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 701,
				settings: {
					slidesToShow: 1,
				}
			},
		],
	});
});

// Smooth

let nav = document.getElementById('nav');

window.onload = function() {
	let anchors = document.querySelectorAll('.scroll-to');

	for(let i = 0, length = anchors.length; i < length; i++) {
		anchors[i].addEventListener('click', function(e) {
			body.style.overflow = 'auto';
			let class_anchors = anchors[i].className.split('');
			let blockid = '';
			for(let i = 0, length = class_anchors.length; i < length; i++) {
				if (class_anchors[i] == 's' && class_anchors[i + 1] == '-') {
					for(let index = i + 2, length = class_anchors.length; index < length; index++) {
						if (class_anchors[index] !== '' && class_anchors[index] !== ' ') {
							blockid = blockid + class_anchors[index];
						} else {
							break;
						}
					}
				}
			}

			let scroll = document.getElementById(blockid).offsetTop - nav.offsetHeight;

			window.scrollTo({
				top: scroll,
				behavior: 'smooth',
			});
		});
	}
}

// Map

function initMap() {
	let map = document.getElementById('map');
	let options = {
		zoom: 5,
		center: {
			lat: 38.89,
			lng: 57.43
		}
	};

	let myMap = new google.maps.Map(map, options);
}

// Popup

/*let popup_btn = document.getElementsByClassName('popup-btn');
let unlock = true;
let timeout = 500;

if (popup_btn.length > 0) {
	for(let i = 0, length = popup_btn.length; i < length; i++) {
		popup_btn[i].addEventListener('click', function(e) {
			if (!check.checked) {
				let class_popup = popup_btn[i].className.split('');
				let popupid = '';

				for(let i = 0, length = class_popup.length; i < length; i++) {
					if (class_popup[i] == 'o' && class_popup[i + 1] == 'p' && class_popup[i + 2] == '-') {
						for(let index = i + 3, length = class_popup.length; index < length; index++) {
							popupid = popupid + class_popup[index];
						}
					}
				}

				openPopup(document.getElementById(popupid));
			}
		});
	}
}

let close_popup = document.getElementsByClassName('close-popup');

if (close_popup.length > 0) {
	for(let i = 0, length = close_popup.length; i < length; i++) {
		close_popup[i].addEventListener('click', function(e) {
			closePopup(close_popup[i].closest('.popup'));
		});
	}
}

function openPopup(elem) {
	if (elem && unlock && !check.checked) {
		let popupActive = document.querySelector('.popup.open');

		if (popupActive) {
			closePopup(popupActive, false);
		} else {
			bodyLock();
		}

		elem.classList.add('open');
		elem.addEventListener('click', function(e) {
			if (!e.target.closest('.popup-body')) {
				closePopup(e.target.closest('.popup'));
			}
		});
	}
}

function closePopup(elem, doUnlock = true) {
	if (unlock) {
		elem.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixed_padding.length > 0) {
		for(let i = 0, length = fixed_padding.length; i < length; i++) {
			fixed_padding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (fixed_padding.length > 0) {
			for(let i = 0, length = fixed_padding.length; i < length; i++) {
				fixed_padding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if (e.which === 27) {
		closePopup(document.querySelector('.popup.open'));
	}
});*/

(function() {
	// Checking Support
	if (!Element.prototype.closest) {
		// Realize
		Element.prototype.closest = function(css) {
			var node = this;
			while (node) {
				if (node.matches(css)) {
					return node;
				} else {
					node = node.parentElement;
				}
				return null;
			}
		};
	}
});

(function() {
	// Checking Support
	if (!Element.prototype.matches) {
		// Define Property
		Element.prototype.matches = Element.prototype.matchesSelector || 
			Element.prototype.webkitMatchesSelector || 
			Element.prototype.mozMatchesSelector || 
			Element.prototype.msMatchesSelector;
	}
});