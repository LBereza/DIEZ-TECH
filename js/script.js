//----------------------------------------------
//-------------------СЛАЙДЕР--------------------
//----------------------------------------------
new Swiper('.reviews-slide__container', {
	navigation: {
			nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	centeredSlides: true,
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	mousewheel: {
		sensitivity: 1,
	}
});
//----------------------------------------------
//--------------------КАРТА---------------------
//----------------------------------------------
var map;
var bigMap;
var points = [{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.53117074072361,
          54.7132977901186
        ]
      }
    }
  ]
}];
 
//Карта подвала
map = L.map("footer-map", {
	center: [54.7132977901186, 20.53117074072361], //Координаты центра карты
	zoom: 15, 
	scrollWheelZoom: false,
	closePopupOnClick: false
});
 
//Создание объекта тайлового слоя
L.tileLayer(
	'https://api.mapbox.com/styles/v1/largo365/cl1xvfctm006b14pilkg6vu5b/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFyZ28zNjUiLCJhIjoiY2wxeHV3bzE5MDZjYzNqbWtxc3BldmRnciJ9.NuZvE5D6YQ9vxKjWLcx_ew&zoomwheel=true&fresh=true#15.25/48.872751/2.305462', {
		tileSize: 512,
		zoomOffset: -1, 
		attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' //Обязательная информация об использовании Mapbox и OpenStreetMap
	}).addTo(map);
 
//Создание маркера на карте
var popup = L.popup()
	.setLatLng([54.7132977901186, 20.53117074072361])
	.setContent("236016, Россия, г. Калининград, ул. Фрунзе, 89")
	.openOn(map);
//Отключение ссылок leaflet
$('.leaflet-control-attribution').hide();
 
//Карта контактов
$(document).ready(function() {
 	if($('html').has('.contacts-map')) {
 		//Создание метки на карте;
		var placeIcon = L.icon({
			iconUrl: '../../img/map-icon.svg',
			iconSize: [29, 39]
		});

		bigMap = L.map("contacts-map", {
			center: [54.72499122307334, 20.49774102272187],
			zoom: 16,
			scrollWheelZoom: false,
			closePopupOnClick: false
		});

		L.tileLayer(
			'https://api.mapbox.com/styles/v1/largo365/cl1xvfctm006b14pilkg6vu5b/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFyZ28zNjUiLCJhIjoiY2wxeHV3bzE5MDZjYzNqbWtxc3BldmRnciJ9.NuZvE5D6YQ9vxKjWLcx_ew&zoomwheel=true&fresh=true#15.25/48.872751/2.305462', {
				tileSize: 512,
				zoomOffset: -1, 
				attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' //Обязательная информация об использовании Mapbox и OpenStreetMap
			}).addTo(bigMap);
		//Добавление метки на карту;
		var marker = L.marker([54.72499122307334, 20.49774102272187],{icon:placeIcon}).addTo(bigMap);
		//Отключение ссылок leaflet;
		$('.leaflet-control-attribution').hide();
	}
 });



$(function() {
	jQuery(function($) {
//----------------------------------------------
//-----------ПОДСВЕТКА РАЗДЕЛА МЕНЮ-------------
//----------------------------------------------
		$(function () {
			var page = window.location.href;
			var cur_url = '/' + page.split('/').pop();
			 
			$('.header__nav li').each(function () {
				var link = $(this).find('a').attr('href');

				if (cur_url == link) {
					$(this).addClass('current');
				}
			});
		});
//----------------------------------------------
//-----------------БУРГЕР-----------------------
//----------------------------------------------
		$(document).ready(function() {
			$('.header-menu__burger').click(function(event) {
				$('.header-menu__burger').toggleClass('active').siblings('.header_menu').toggleClass('active');
				$('body').toggleClass('lock');
			});
		});
		//    >750px отключение body-lock;
		$(function() {
			$(window).on('resize', function(){
				if(innerWidth > 750 && $('body').hasClass('lock')) {
					$('.header-menu__burger').toggleClass('active').siblings('.header_menu').toggleClass('active');
					$('body').toggleClass('lock');
				}
			});
		});
//----------------------------------------------
//------------ФОРМА КОНТАКТЫ--------------------
//----------------------------------------------
//  Динамический paadding для input;
		$(function () {
			$('input').not("input[type='checkbox'], input[type='submit']").each(function () {
					var labelWidth = $(this).siblings('label').width();
					$(this).css("padding-left",labelWidth);
				});
		});
//----------------------------------------------
//------------МАСКИ под INPUT-------------------
//----------------------------------------------
		$('#callbackFullName, #callbackName').on('keypress', function() {
			var that = this;
			setTimeout(function() {
			var res = /[^а-яА-Я]\s/g.exec(that.value);
			that.value = that.value.replace(res, '');
			}, 0);
		});
		$('#callbackFullPhone').mask("+7 (999) 999-99-99");
//----------------------------------------------
//---КЛИКАБЕЛЬНЫЕ ПЛИТКИ С САЙТАМИ НА ГЛАВНОЙ---
//----------------------------------------------
		$(".our-works__link").click(function() {
			window.location = $(this).find("a").attr("href"); 
			return false;
		});
//----------------------------------------------
//-------"НАВЕРХ" НА СТРАНИЦЕ ПОРТФОЛИО---------
//----------------------------------------------
	$('.back_to_top').on('click', function() {
		$("html, body").animate({ scrollTop: 0 }, 200);
	});
//----------------------------------------------
//-------ФИЛЬТРАЦИЯ СТРАНИЦЫ ПОРТФОЛИО----------
//----------------------------------------------
		function filtration(){
				var Tag = $(this).data("tags");
				//  Переключение стиля активной кнопки;
				$(document).find('.works__btn').removeClass('active');
				$(this).addClass('active');

				//  Переключение карточек;
				if(Tag !== "all") {
					$(document).find('.our-works__title').each(function() {
						if($(this).data("tags") !== Tag) {
							$(this).parents(".our-works__item").hide();
						} else if ($(this).data("tags") == Tag) {
							$(this).parents(".our-works__item").show();
						}
					});
				} else {
					$(".our-works__item").show();
				}
			};
		$('.works__btn').click(filtration);
//----------------------------------------------
//--------ПОДГРУЗКА СТРАНИЦЫ ПОРТФОЛИО----------
//----------------------------------------------
	$(document).ready(function () {
			$(window).scroll(function () {
					if($(window).scrollTop() + $(window).height() + 200 >= $(document).height()) {
						count3();
					}
			})
	});

	function count3() {
		var activeFilter = $('.works__btn.active').data("tags");
		var newItemCount = 0;
		
		if (activeFilter !== "all") { //Проверка активного фильтра;
			for (let i = 0; i<3; i++) {
				console.log($('.load').eq(i).find('.our-works__title').data("tags")) //проверка на совпадение фильтра и тега в ссылке;
				//Включаем/выключаем для загруженных элементов отображение в зависимости от фильтра;
				if ($('.load').eq(i).find('.our-works__title').data("tags") == activeFilter) {
					$('.load').eq(i).show();
					newItemCount++; //Увеличиваем счёт новых выведенных элементов;
				} else {
						$('.load').eq(i).hide();
					}
			}
			$('.our-works__item.load').slice(0,3).removeClass('load'); //Отключаем статус "в буффере" для выведенных элементов;
		} else {
				//Проверка остались ли элементы "в буффере" 
				if ($('.load').length > 0) {
					for (let i=0;i<3;i++) {
						newItemCount++; //Увеличиваем счёт новых выведенных элементов;
						$('.load').eq(i).show();
					}
					$('.our-works__item.load').slice(0,3).removeClass('load'); //Отключаем признак "в буффере" для выведенных элементов;
				} else {
					newItemCount = 0;
				}
		}

		//Если новых элементов подходящих условию не найдено - включаем кнопку "наверх"
		if (newItemCount == 0) {
			$('.back_to_top').removeClass('d-none');
		} 
		console.log(newItemCount);
		
	}

//$('.section__title').click(count3);

	});
});