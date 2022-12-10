//@prepros-append jq-start.js
//@prepros-append map.js
//@prepros-append scroll.js
//@prepros-append fullscroll.js
//@prepros-append responsive.js
//@prepros-append sliders.js
//@prepros-append forms.js
//@prepros-append script.js
//@prepros-append jq-end.js
$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
function map(n){
	google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView(); 
		ov.onAdd = function() { 
			var proj = this.getProjection(); 
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x+offsetX;
			aPoint.y = aPoint.y+offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function() {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055,27.8813694)],
		[new google.maps.LatLng(53.700055,27.5513694)],
		[new google.maps.LatLng(53.809055,27.5813694)],
		[new google.maps.LatLng(53.859055,27.5013694)],
	]
	var options = {
		zoom: 10,
		panControl:false,
		mapTypeControl:false,
		center: locations[0][0],
		//styles:[{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
		scrollwheel:false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}; 
	var map = new google.maps.Map(document.getElementById('map'), options);
	var mainicon={
		url:'img/icons/map.svg',
		scaledSize: new google.maps.Size(39, 51),
		anchor: new google.maps.Point(20, 25)
	}
	var icon={
		url:'img/icons/flag.svg',
		scaledSize: new google.maps.Size(24, 28),
		anchor: new google.maps.Point(12, 14)
	}
	for (var i = 0; i < locations.length; i++) {
		var ic=icon;
			if(i==0){ic=mainicon;}
		var marker = new google.maps.Marker({
			icon:ic,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					//markers[m].setIcon(mainicon);
				}
					var cnt=i+1;
				infowindow.setContent($('.contacts-map-item--'+cnt).html());
				infowindow.open(map, marker);
				//marker.setIcon(mainicon);
				map.setCenterWithOffset(marker.getPosition(),0,0);
				setTimeout(function(){
					baloonstyle();
				},10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if(n){
			var nc=n-1;
		setTimeout(function(){
			google.maps.event.trigger(markers[nc], 'click');
		},500);
	}
}
function baloonstyle(){
	$('.gm-style-iw').parent().addClass('baloon');
	$('.gm-style-iw').prev().addClass('baloon-style');
	$('.gm-style-iw').next().addClass('baloon-close');
	$('.gm-style-iw').addClass('baloon-content');
}
if($("#map").length>0){
	map(1);
}


/* YA
function map(n){
	ymaps.ready(init);
	function init(){ 
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			controls: [],
			center: [43.585525,39.723062],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 10
		});
		
		myPlacemar = new ymaps.Placemark([43.585525,39.723062],{
			id:'2'
		},{
			// Опции.
			hasBalloon:false,
			hideIconOnBalloonOpen:false,
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'img/icons/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0,0],
		});
		myMap.geoObjects.add(myPlacemar);

		myMap.behaviors.disable('scrollZoom');
	}
}
*/
if(w>767 && $('#lines').length>0){
	function linedrow(){
		var w=$(window).outerWidth();
		var draw = SVG('lines');
		var body=$('.mainsteps-line');
		var bodyw=body.outerWidth();
		var hl_r=Math.round(bodyw/1.3);
		var hl_l=Math.round(0-bodyw/1.3);
		var hl_1=Math.round(bodyw/1.5);

		if(w<992){
			var hl_r=Math.round(bodyw/1.1);
			var hl_l=Math.round(0-bodyw/1.1);
			var hl_1=Math.round(bodyw/1.1);
		}

		var vl_1=375;
		var vl_2=680;
		var first_hl=0-350;

		var p=new SVG.PathArray([
			['M',bodyw/2,0],
			['v',100],
			['s',0,5,-5,5],
			['h',first_hl],
			['s',-5,0,-5,5],
			['v',300],
			['s',0,5,5,5],
			['h',hl_1],
			['s',5,0,5,5],
			['v',vl_1],
			['s',0,5,-5,5],
			['h',hl_l],
			['s',-5,0,-5,5],
			['v',vl_2],
			['s',0,5,5,5],
			['h',hl_r],
			['s',5,0,5,5],
			['v',vl_1],
		]);

		if(!$('.mainsteps-line').hasClass('active')){
			draw.path(p).stroke({width:2,color:"#e6c03e"}).fill('none').attr('id','line');
			draw.path(p).stroke({width:2,color:"#818181"}).fill('none').attr('id','activeline');
			$('.mainsteps-line').addClass('active');
		}else{
			$('#line,#activeline').attr('d',p);
		}

	}

		linedrow();
	function SVGRoad(elem) {
		this.pathLength = elem.getTotalLength();
		this.setStrokeDasharrayInPercent = function() {
				var strokeDasharray = "";
			for (i = 0; i < arguments.length; i++) {
				strokeDasharray += arguments[i]/100*this.pathLength+" ";
			}
			elem.style.strokeDasharray = strokeDasharray;
		};
		this.setStrokeDashoffsetInPercent = function(strokeDashoffset) {
			elem.style.strokeDashoffset=0-strokeDashoffset/100*this.pathLength;
		};
	}

	var pathElem = document.getElementById("activeline");
	var SVGRoadInstance = new SVGRoad(pathElem);

	//change the following values
	SVGRoadInstance.setStrokeDasharrayInPercent(100);
}
//============================================================================================
	sectors($(this).scrollTop());
$(window).scroll(function(event) {
		var scr=$(this).scrollTop();
	sectors(scr);
});

function sectors(scr){
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var headerheight=70;
	if(w<768){headerheight=50;}
	if(scr>10){
		$('header').addClass('scroll');
		$('div.regularpageblock-submenu').addClass('scroll');
	}else{
		$('header').removeClass('scroll');
		$('div.regularpageblock-submenu').removeClass('scroll');
	}
	if(scr>h){
		$('#up').fadeIn(300);
	}else{
		$('#up').fadeOut(300);
	}
	$.each($('.sectorblock'), function(index, val) {
			var th=$(this).outerHeight();
			var tot=Math.round($(this).offset().top);
		if(scr>tot-h/1.5 && scr<tot+th){
			if($('.dotts').length>0){
				dotts(index,0);
			}
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
	});
	$.each($('.sector'), function(index, val) {
			var th=$(this).outerHeight();
			var tot=Math.round($(this).offset().top);
		if(scr>=tot && scr<=tot+th-h){
			$('.sector.scroll').removeClass('scroll');
			$(this).addClass('scroll');
		}
		if($(this).hasClass('scroll')){
			if(scr>=tot && scr<=tot+th-h){
				if($(this).hasClass('normalscroll')){
					$('body').addClass('scroll');
				}else{
					$('body').removeClass('scroll');
				}
			}else{
				if($(this).hasClass('normalscroll')){
					if(scr>tot+th-h && $(this).next().length>0){
						$('body').removeClass('scroll');
					}
					if(scr<tot){
						$('body').removeClass('scroll');
					}
				}
			}
		}
		if(scr>tot-h/1.5 && scr<tot+th){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
		if(scr>tot-h && scr<tot+th){
			$(this).addClass('view');
			/*
			if($(this).hasClass('padding') && w>767){
					var ps=100-(tot-scr)/h*100;
					var p=headerheight/100*ps;
				if(p>=headerheight){p=headerheight;}
				$(this).css({paddingTop:p});
			}
			*/
		}else{
			//$(this).removeClass('view');
		}
	});
	if(w>767 && $('#lines').length>0){
		if(scr>$('.mainsteps-body').offset().top-h/1.2 && scr<$('.mainsteps-body').offset().top+$('.mainsteps-body').outerHeight()-h/1.2){
				var p=(scr-($('.mainsteps-body').offset().top-h/1.2))/$('.mainsteps-body').outerHeight()*100;
			SVGRoadInstance.setStrokeDashoffsetInPercent(p);
			if(p>10){
				$('.mainsteps-item--1').addClass('active');
			}else{
				$('.mainsteps-item--1').removeClass('active');
			}
			if(p>28){
				$('.mainsteps-item--2').addClass('active');
			}else{
				$('.mainsteps-item--2').removeClass('active');
			}
			if(p>42){
				$('.mainsteps-sector-item--1').addClass('active');
			}else{
				$('.mainsteps-sector-item--1').removeClass('active');
			}
			if(p>52){
				$('.mainsteps-sector-item--2').addClass('active');
			}else{
				$('.mainsteps-sector-item--2').removeClass('active');
			}
			if(p>63){
				$('.mainsteps-item--3').addClass('active');
			}else{
				$('.mainsteps-item--3').removeClass('active');
			}
			if(p>82){
				$('.mainsteps-sector-item--3').addClass('active');
			}else{
				$('.mainsteps-sector-item--3').removeClass('active');
			}
			if(p>95){
				$('.mainsteps-item--4').addClass('active');
			}else{
				$('.mainsteps-item--4').removeClass('active');
			}
		}else if (scr<$('.mainsteps-body').offset().top-h/1.5){
			SVGRoadInstance.setStrokeDashoffsetInPercent(0);
		}

		if(scr>$('.mainsteps').offset().top-h && scr<$('.mainsteps').offset().top+$('.mainsteps').outerHeight()-h){
			$.each($('.mainsteps-item-side'), function(index, val) {
					var th=$(this);
					var th_p=$(this).parent();
					var im=th.find('.mainsteps-item-image');
					var th_of=th.offset().top;
					var th_oh=th.outerHeight();
				if(scr>th_of-h && scr<th_of+th_oh-h){
						th_p.addClass('load');
						var p=(scr-(th_of-h))/th_oh*100;
					if(th_p.hasClass('mainsteps-item--right')){
						im.css({left:500-500/100*p});
					}else{
						im.css({right:500-500/100*p});
					}
				}else{
					if(scr<th_of-h){
						if(th_p.hasClass('mainsteps-item--right')){
							im.css({left:-500});
						}else{
							im.css({right:-500});
						}
						th_p.removeClass('load');
					}
					if(scr>=th_of+th_oh-h){
						if(th_p.hasClass('mainsteps-item--right')){
							im.css({left:0});
						}else{
							im.css({right:0});
						}
					}
				}
			});
		}
	}
}
	scrollpause=500;
if(navigator.appVersion.indexOf("Mac")!=-1){
	scrollpause=1000;
};
if(!isMobile.any() && $('.page').length==0){
	$(document).bind('DOMMouseScroll wheel MozMousePixelScroll onmousewheel touchmove mousewheel keyup', function(event){
			var w=$(window).outerWidth();
			var h=$(window).outerHeight();
		if(h>700 && w>992){
			if(!$('.popup').hasClass('active') && !$('body').hasClass('scrollblock') && !$('body').hasClass('scroll')){
					var scl=$(window).scrollTop();
					var active=$('.sector.scroll');
					var nextslide=active.next('.sector').index()+1;
					var prevslide=active.prev('.sector').index()+1;
					var offset=0;
				if(event.keyCode==40 || event.keyCode==34 || event.deltaX>0 || event.deltaY<0){
					if(nextslide>0){
						$('body').removeClass('scroll');
						gotoslide(nextslide,offset);
					}
					if($('.sector.normalscroll').hasClass('scroll')){
						if(!nextslide){
							var nextslide=$('.sector.normalscroll.active').index()+1;
						}
						$('body').removeClass('scroll');
						gotoslide(nextslide,offset);
					}
				}else if(event.keyCode==38 || event.keyCode==33 || event.deltaX<0 || event.deltaY>0){
					if(prevslide>0){
						$('body').removeClass('scroll');
						if($('.sector').eq(prevslide-1).hasClass('normalscroll')){
							offset=$('.sector').eq(prevslide-1).outerHeight()-h;
						}
						gotoslide(prevslide,offset);
					}
					if($('.sector.normalscroll').hasClass('scroll')){
							var pslide=$('.sector.active').not('.normalscroll').index()+1;
						$('body').removeClass('scroll');
						gotoslide(prevslide,offset);
					}
				}
			}
			if(!$('body').hasClass('scroll')){
				return false;
			}else if($('body').hasClass('scrollblock')){
				return false;
			}
		}
	});
}
function gotoslide(n,offset) {
	if($('.sector-'+n).length>0){
			$('body').addClass('scrollblock');
		$('body,html').animate({scrollTop: $('.sector-'+n).offset().top+offset},800, function() {
			setTimeout(function() {
				$('body').removeClass('scrollblock');
			},scrollpause);
		});
	}
}
$('.mainblock-scroll').click(function(event) {
		$('body').addClass('scrollblock');
	$('body,html').animate({scrollTop:$('.maincontent').offset().top},800, function() {
		setTimeout(function() {
			$('body').removeClass('scrollblock');
		},scrollpause);
	});
});
$('.regularpageblock-scroll').click(function(event) {
		$('body').addClass('scrollblock');
	$('body,html').animate({scrollTop:$('.regularpageblock').next().offset().top},800, function() {
		setTimeout(function() {
			$('body').removeClass('scrollblock');
		},scrollpause);
	});
});
//Adaptive functions
$(window).resize(function(event) {
	adaptive_function();
});
function adaptive_header(w,h) {
		var headerMenu=$('.header-menu');
		var headerContacts=$('.header-contacts');
	if(w<767){
		if(!headerContacts.hasClass('done')){
			headerContacts.addClass('done').appendTo(headerMenu);
		}
	}else{
		if(headerContacts.hasClass('done')){
			headerContacts.removeClass('done').appendTo($('.header__column').eq(2));
		}
	}
}
function adaptive_mainpage(w,h){
	if(h>700 && w>992){
		$('.portfiolio').css({height: h});
	}
	if(w>767 && $('#lines').length>0){
		linedrow();
	}
}
function adaptive_page(w,h){
	if(w>767){
		setTimeout(function(){
			$('.regularpageslider-dotts').css({left:$('.regularpageslider .container').eq(0).offset().left})
		},1);
	}
}

function adaptive_function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
	adaptive_header(w,h);
	if($('.mainpage').length>0){
		adaptive_mainpage(w,h);
	}
	if($('.regularpageslider-dotts').length>0){
		adaptive_page(w,h);
	}
}
	adaptive_function();
//SLIDERS
if($('.mainblock').length>0){
	$('.mainblock-slider').slick({
		//autoplay: true,
		//infinite: false,
		fade:true,
		dots: false,
		arrows: true,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		speed: 900,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {
				adaptiveHeight:true,
			}
		}]
	});
	setTimeout(function(){
		$('.mainblock').addClass('animate');
	},500);
	setTimeout(function(){
		$('.mainblock').addClass('load');
		$('.mainblock-slide-content-text__label span').eq(0).addClass('active');
		setInterval(function(){
				var block=$('.mainblock-slide.slick-active');
				var spa=block.find('.mainblock-slide-content-text__label span.active');
				var num=block.find('.mainblock-slide-content-text__num');
			if(spa.next().length>0){
				spa.removeClass('active');
				spa.next().addClass('active');
				num.html(spa.next().index()+1);
			}else{
				spa.removeClass('active');
				block.find('.mainblock-slide-content-text__label').find('span').eq(0).addClass('active');
				num.html('1');
			}
		},2000);
	},3000);
	/*
	setTimeout(function(){
		$('.mainblock-slide.slick-active').addClass('active');
	},500);
	$('.mainblock-slider').on('afterChange', function(event, slick, currentSlide){
		$('.mainblock-slide').removeClass('active');
		$('.mainblock-slide.slick-active').addClass('active');
	});
	*/
}

if($('.advantages-slider').length>0){
	$('.advantages-slider').slick({
		//autoplay: true,
		//infinite: false,
		fade:true,
		dots: false,
		arrows: true,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		speed: 900,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {
				adaptiveHeight:true,
			}
		}]
	});
}


if($('.regularpageslider').length>0){
	$('.regularpageslider-body').slick({
		//autoplay: true,
		//infinite: false,
		fade:true,
		dots: true,
		adaptiveHeight:true,
		arrows: false,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		speed: 900,
		appendDots:$('.regularpageslider-dotts'),
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
	});
	$('.regularpageslider-item-more').not('.nextscreen').click(function(){
		$('.regularpageslider-body').slick('slickNext');
		return false;
	});
}

if($('.regularpageimageslider').length>0){
	$('.regularpageimageslider-main').slick({
		//autoplay: true,
		//infinite: false,
		fade:true,
		dots: false,
		arrows: true,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		speed: 900,
		asNavFor:'.regularpageimageslider-thumbs',
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {
				adaptiveHeight:true,
			}
		}]
	});
	$.each($('.regularpageimageslider-main-item'), function(index, val) {
		$('.regularpageimageslider-thumbs').append(
			'<div class="regularpageimageslider-thumbs-item">'+
				'<div class="regularpageimageslider-thumbs-item__image ibg"><img src="'+$(this).find('img').attr('src')+'" alt="" /></div>'+
			'</div>');
	});
		var slider=$('.regularpageimageslider-thumbs')
	slider.slick({
		//autoplay: true,
		//infinite: false,
		//infinite: true,
		dots: true,
		arrows: true,
		accessibility:false,
		slidesToShow:5,
		variableWidth:true,
		slidesToScroll:1,
		autoplaySpeed: 3000,
		speed: 500,
		waitForAnimate:false,
		asNavFor:'.regularpageimageslider-main',
		//appendDots:
		appendDots:$('.objects-controls'),
		appendArrows:$('.objects-controls'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow:1,
				slidesToScroll:1,
			}
		}]
	});
	$(document).on('click','.regularpageimageslider-thumbs-item', function(index, val) {
		slider.slick('goTo',Math.abs($(this).data('slick-index')));
	});
}



if($('.portfiolio').length>0){
	$('.portfiolio-slider').slick({
		//autoplay: true,
		//infinite: false,
		fade:true,
		dots: false,
		arrows: false,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		speed: 900,
		asNavFor:'.portfiolio-bgslider',
		appendDots:$('.portfiolio-dotts'),
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				//adaptiveHeight:true,
			}
		}]
	});
	$('.portfiolio-bgslider').slick({
		//autoplay: true,
		//infinite: false,
		//fade:true,
		dots: true,
		arrows: true,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		speed: 900,
		asNavFor:'.portfiolio-slider',
		appendDots:$('.portfiolio-dotts'),
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {
				//adaptiveHeight:true,
			}
		}]
	});
}



//SLICK FIX
if($('.objects-slider').length>0){
		var slider=$('.objects-slider');
	slider.slick({
		//autoplay: true,
		//infinite: false,
		infinite: true,
		dots: true,
		arrows: true,
		accessibility:false,
		slidesToShow:2,
		slidesToScroll:1,
		autoplaySpeed: 3000,
		speed: 500,
		waitForAnimate:false,
		//asNavFor:'',
		//appendDots:
		appendDots:$('.objects-controls'),
		appendArrows:$('.objects-controls'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow:1,
				slidesToScroll:1,
			}
		}]
	});
		var sltoshow=slider.get(0).slick.options.slidesToShow;
		var all=slider.find('.slick-slide').length;
		var allactive=slider.find('.slick-slide').not('.slick-cloned').length;
	slider.on('beforeChange', function(event,slick,currentSlide,nextSlide){
		if(nextSlide==0){
				var ind=all-allactive;
			if(sltoshow==1){
				slider.find('.slick-slide').eq(ind).addClass('active');
			}else{
				sliderfix(slider,ind);
			}
		}
		if(nextSlide==allactive-1){
			if(sltoshow==1){
				slider.find('.slick-slide').eq(0).addClass('active');
			}else{
				sliderfix(slider,sltoshow-1);
			}
		}
	});
	slider.on('afterChange', function(event, slick, currentSlide){
		slider.find('.slick-slide').removeClass('active');
	});
	function sliderfix(slider,v){
		for (var i=0; i < sltoshow; i++) {
				var n=v+i;
			slider.find('.slick-slide').eq(n).addClass('active');
		}
	}
}

if($('.newsmodule-slider').length>0){
	$('.newsmodule-slider').slick({
		//autoplay: true,
		//infinite: false,
		fade:true,
		dots: false,
		arrows: false,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next fa fa-angle-right"></button>',
		prevArrow:'<button type="button" class="slick-prev fa fa-angle-left"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {	}
		}]
	});
	//Опция
	$('.newsmodule-slider').get(0).slick.options.slidesToShow

	$('.newsmodule-items-item').click(function(event) {
		$('.newsmodule-items-item').removeClass('active');
		$(this).addClass('active');
		$('.newsmodule-slider').slick('goTo',$(this).index());
	});
	$('.newsmodule-navigator-info span').eq(1).html($('.newsmodule-items-item').length);
	
	$('.newsmodule-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.newsmodule-navigator-info span').eq(0).html(currentSlide+1);
	});
	$('.newsmodule-slider').on('afterChange', function(event, slick, currentSlide){
		$('.newsmodule-navigator-info span').eq(0).html(currentSlide+1);
	});
	$('.newsmodule-navigator__arrow.fa-angle-left').click(function(event) {
		$('.newsmodule-slider').slick('slickPrev');
	});
	$('.newsmodule-navigator__arrow.fa-angle-right').click(function(event) {
		$('.newsmodule-slider').slick('slickNext');
	});
}

//FORMS
function forms(){
	//SELECT
	if($('select').length>0){
		function selectscrolloptions(){
				var scs=100;
				var mss=50;
			if(isMobile.any()){
				scs=10;
				mss=1;
			}
			var opt={
				cursorcolor:"#2078e5",
				cursorwidth: "3px",
				background: "",
				autohidemode:false,
				bouncescroll:false,
				cursorborderradius: "0px",
				scrollspeed:scs,
				mousescrollstep:mss,
				directionlockdeadzone:0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select(){
			$.each($('select'), function(index, val) {
					var ind=index;
				$(this).hide();
				if($(this).parent('.select-block').length==0){
					$(this).wrap("<div class='select-block "+$(this).attr('class')+"-select-block'></div>");
				}else{
					$(this).parent('.select-block').find('.select').remove();
				}
					var milti='';
					var check='';
					var sblock=$(this).parent('.select-block');
					var soptions="<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if($(this).attr('multiple')=='multiple'){
					milti='multiple';
					check='check';
				}
				$.each($(this).find('option'), function(index, val) {
					if($(this).attr('value')!=''){
						soptions=soptions+"<div data-value='"+$(this).attr('value')+"' class='select-options__value_"+ind+" select-options__value value_"+$(this).val()+" "+$(this).attr('class')+" "+check+"'>"+$(this).html()+"</div>";
					}else if($(this).parent().attr('data-label')=='on'){
						if(sblock.find('.select__label').length==0){
							sblock.prepend('<div class="select__label">'+$(this).html()+'</div>');
						}
					}
				});
					soptions=soptions+"</div></div></div>";
				if($(this).attr('data-type')=='search'){
						sblock.append("<div data-type='search' class='select_"+ind+" select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
												"<div class='select-title'>"+
													"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
													"<input data-value='"+$(this).find('option[selected="selected"]').html()+"' class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"' />"+
												"</div>"+
												soptions+
											"</div>");
						$('.select_'+ind).find('input.select-title__value').jcOnPageFilter({
							parentSectionClass:'select-options_'+ind,
							parentLookupClass:'select-options__value_'+ind,
							childBlockClass:'select-options__value_'+ind
						});
				}else{
					sblock.append("<div class='select_"+ind+" select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
											"<div class='select-title'>"+
												"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
												"<div class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"'>"+$(this).find('option[selected="selected"]').html()+"</div>"+
											"</div>"+
											soptions+
										"</div>");
				}
				if($(this).find('option[selected="selected"]').val()!=''){
					sblock.find('.select').addClass('focus');
				}
				if($(this).attr('data-req')=='on'){
					$(this).addClass('req');
				}
				$(".select_"+ind+" .select-options-scroll").niceScroll('.select-options-list',selectscrolloptions());
			});
		}
			select();

		$('body').on('keyup','input.select-title__value',function() {
			$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
			$(this).parents('.select').addClass('active');
			$(this).parents('.select').find('.select-options').slideDown(50,function() {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});
			$(this).parents('.select-block').find('select').val('');
		});
		$('body').on('click','.select',function(){
			if(!$(this).hasClass('disabled')){
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50,function() {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if($(this).attr('data-type')=='search'){
					if(!$(this).hasClass('active')){
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}
			}
		});
		$('body').on('click','.select-options__value',function() {
			if($(this).parents('.select').hasClass('multiple')){
				if($(this).hasClass('active')){
					if($(this).parents('.select').find('.select-title__value span').length>0){
						$(this).parents('.select').find('.select-title__value').append('<span data-value="'+$(this).data('value')+'">, '+$(this).html()+'</span>');
					}else{
						$(this).parents('.select').find('.select-title__value').data('label',$(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="'+$(this).data('value')+'">'+$(this).html()+'</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index()+1).prop('selected', true);
					$(this).parents('.select').addClass('focus');
				}else{
					$(this).parents('.select').find('.select-title__value').find('span[data-value="'+$(this).data('value')+'"]').remove();
					if($(this).parents('.select').find('.select-title__value span').length==0){
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index()+1).prop('selected', false);
				}
				return false;
			}

			if($(this).parents('.select').attr('data-type')=='search'){
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value',$(this).html());
			}else{
				$(this).parents('.select').find('.select-title__value').attr('class','select-title__value value_'+$(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

				$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if($.trim($(this).data('value'))!=''){
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="'+$(this).data('value')+'"]').attr('selected','selected');
			}else{
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="'+$(this).html()+'"]').attr('selected','selected');
			}


			if($(this).parents('.select-block').find('select').val()!=''){
				$(this).parents('.select-block').find('.select').addClass('focus');
			}else{
				$(this).parents('.select-block').find('.select').removeClass('focus');

				$(this).parents('.select-block').find('.select').removeClass('err');
				$(this).parents('.select-block').parent().removeClass('err');
				$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
			}
			if(!$(this).parents('.select').data('tags')!=""){
				if($(this).parents('.form-tags').find('.form-tags__item[data-value="'+$(this).data('value')+'"]').length==0){
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="'+$(this).data('value')+'" href="" class="form-tags__item">'+$(this).html()+'<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if($(this).parents('.select-block').find('select').data('update')=='on'){
				select();
			}
		});
		$(document).on('click touchstart',function(e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50,function() {});
				searchselectreset();
			};
		});
	}

	//FIELDS
	$('input,textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function() {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			this.value = $(this).attr('data-value');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}

		$(this).click(function() {
			if (this.value == $(this).attr('data-value')) {
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = '';
			};
		});
		$(this).blur(function() {
			if (this.value == '') {
				this.value = $(this).attr('data-value');
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};
			};
		});
	});
	$('.form-input__viewpass').click(function(event) {
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});
	

	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function(index, val) {
		$(this).attr('type','tel');
		$(this).focus(function(){
			$(this).inputmask('+7(999) 999 9999',{clearIncomplete: true,clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));}
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function(event) {
		maskclear($(this));
	});
	$.each($('input.num'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('9{1,1000}',{clearIncomplete: true,placeholder:"",clearMaskOnLostFocus: true,"onincomplete": function(){maskclear($(this));}});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.num').focusout(function(event) {
		maskclear($(this));
	});
	/*
	$.each($('input.date'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('dd.mm.yyyy',{
				clearIncomplete: true,
				placeholder:"_",
				//yearrange:{'minyear':n-40,'maxyear':n},
				clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));},
				"oncomplete": function(){
					$(this).datepicker("setDate",$(this).val());
				}
			});
			$(this).addClass('focus');
			$(this).parents('.form-column').addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
		$(this).focusout(function(event) {
			maskclear($(this));
		});
		$(this).datepicker({
			dateFormat : "dd.mm.yy",
			//yearRange: "1915:2015",
			//defaultDate: '-18Y', 
			//inDate: '-85Y', 
			//maxDate: "0Y",
			beforeShow :function(event){
				$('.ui-datepicker').show();
			},
			onSelect:function(event){
				if($(this).val()!=$(this).attr('data-value') && $(this).val()!=''){
					$(this).addClass('focus');
					$(this).parent().addClass('focus');
					if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
						$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
					}
				}
			}
		});
	});
	*/

	//CHECK
	$.each($('.check'), function(index, val) {
		if($(this).find('input').prop('checked')==true){
			$(this).addClass('active');
		}
	});
	$('body').off('click','.check',function(event){});
	$('body').on('click','.check',function(event){
		if(!$(this).hasClass('disable')){
				var target = $(event.target);
			if (!target.is("a")){
					$(this).toggleClass('active');
				if($(this).hasClass('active')){
					$(this).find('input').prop('checked', true);
				}else{
					$(this).find('input').prop('checked', false);
				}
			}
		}
	});

	//OPTION
	$.each($('.option.active'), function(index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function(event) {
		if(!$(this).hasClass('disable')){
			if($(this).hasClass('active') && $(this).hasClass('order') ){
				$(this).toggleClass('orderactive');
			}
				$(this).parents('.options').find('.option').removeClass('active');
				$(this).toggleClass('active');
				$(this).children('input').prop('checked', true);
		}
	});
	//RATING
	$('.rating.edit .star').hover(function() {
			var block=$(this).parents('.rating');
		block.find('.rating__activeline').css({width:'0%'});
			var ind=$(this).index()+1;
			var linew=ind/block.find('.star').length*100;
		setrating(block,linew);
	},function() {
			var block=$(this).parents('.rating');
		block.find('.star').removeClass('active');
			var ind=block.find('input').val();
			var linew=ind/block.find('.star').length*100;
		setrating(block,linew);
	});
	$('.rating.edit .star').click(function(event) {
			var block=$(this).parents('.rating');
			var re=$(this).index()+1;
			block.find('input').val(re);
			var linew=re/block.find('.star').length*100;
		setrating(block,linew);
	});
	$.each($('.rating'), function(index, val) {
			var ind=$(this).find('input').val();
			var linew=ind/$(this).parent().find('.star').length*100;
		setrating($(this),linew);
	});
	function setrating(th,val) {
		th.find('.rating__activeline').css({width:val+'%'});
	}
	//QUANTITY
	$('.quantity__btn').click(function(event) {
			var n=parseInt($(this).parent().find('.quantity__input').val());
		if($(this).hasClass('dwn')){
			n=n-1;
			if(n<1){n=1;}
		}else{
			n=n+1;
		}
			$(this).parent().find('.quantity__input').val(n);
		return false;
	});
	//RANGE
	if($("#range" ).length>0){
		$("#range" ).slider({
			range: true,
			min: 0,
			max: 5000,
			values: [0, 5000],
			slide: function( event, ui ){
				$('#rangefrom').val(ui.values[0]);
				$('#rangeto').val(ui.values[1]);
				$(this).find('.ui-slider-handle').eq(0).html('<span>'+ui.values[0]+'</span>');
				$(this).find('.ui-slider-handle').eq(1).html('<span>'+ui.values[1]+'</span>');
			},
			change: function( event, ui ){
				if(ui.values[0]!=$( "#range" ).slider( "option","min") || ui.values[1]!=$( "#range" ).slider( "option","max")){
					$('#range').addClass('act');
				}else{
					$('#range').removeClass('act');
				}
			}
		});
		$('#rangefrom').val($( "#range" ).slider( "values", 0 ));
		$('#rangeto').val($( "#range" ).slider( "values", 1 ));

		$("#range" ).find('.ui-slider-handle').eq(0).html('<span>'+$( "#range" ).slider( "option","min")+'</span>');
		$("#range" ).find('.ui-slider-handle').eq(1).html('<span>'+$( "#range" ).slider( "option","max")+'</span>');
		
		$( "#rangefrom" ).bind("change", function(){
			if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
				$(this).val($( "#range" ).slider( "option","max"));
			}
			if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
				$(this).val($( "#range" ).slider( "option","min"));
			}
			$("#range" ).slider( "values",0,$(this).val());
		});
		$( "#rangeto" ).bind("change", function(){
			if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
				$(this).val($( "#range" ).slider( "option","max"));
			}
			if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
				$(this).val($( "#range" ).slider( "option","min"));
			}
			$("#range" ).slider( "values",1,$(this).val());
		});
		$("#range" ).find('.ui-slider-handle').eq(0).addClass('left');
		$("#range" ).find('.ui-slider-handle').eq(1).addClass('right');
	}
}
forms();

function digi(str){
	var r=str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function(){
		var er=0;
		var form=$(this).parents('form');
		var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError(form);

		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			clearForm(form);
			return false;
		}
		/*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

		//ОПТРАВКА ФОРМЫ
		/*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/
	}else{
		return false;
	}
});
function formValidate(input){
		var er=0;
		var form=input.parents('form');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			removeError(input);
		}
	}else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if(input.hasClass('name')){
		if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
				er++;
			addError(input);
		}
	}
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}else{
			removeError(input);
		}
	}
		return er;
}
function formLoad(){
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms){
	$('.popup').hide();
	$('.popup-message.'+ms).addClass('active').fadeIn(300);
}
function showMessage(html){
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form){
	$.each(form.find('.input'), function(index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error-2');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form,input__name,error_text){
		var input=form.find('[name="'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form){
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}
function maskclear(n){
	if(n.val()==""){
		n.inputmask('remove');
		n.val(n.attr('data-value'));
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function(index, val){
			var block=$(this).parent();
			var select=$(this).parent().find('select');
		if($(this).find('.select-options__value:visible').length==1){
			$(this).addClass('focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value',$('.select-options__value:visible').html());
		}else if(select.val()==''){
			$(this).removeClass('focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value',select.find('option[selected="selected"]').html());
		}
	});
}
	var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};if(location.hash){		var hsh=location.hash.replace('#','');	if($('.popup-'+hsh).length>0){		popupOpen(hsh);	}else if($('div.'+hsh).length>0){		$('body,html').animate({scrollTop:$('div.'+hsh).offset().top,},500, function(){});	}}$('.wrapper').addClass('loaded');	var act="click";if(isMobile.iOS()){	var act="touchstart";}if(!isMobile.any()){	$('.header-menu-list>li').hover(function() {		$(this).toggleClass('hover');	}, function() {		$(this).toggleClass('hover');	});	$('.maintech-item').hover(function() {		$(this).toggleClass('hover');		$(this).find('.maintech-item-body').stop().stop().slideToggle(500);	}, function() {		$(this).toggleClass('hover');		$(this).find('.maintech-item-body').stop().stop().slideToggle(500);	});}$('.header-menu__icon').click(function(event) {	$(this).toggleClass('active');	$('.header-menu').toggleClass('active');	$('body').toggleClass('lock');});//ZOOMif($('.gallery').length>0){	baguetteBox.run('.gallery', {		// Custom options	});}//POPUP$('.pl').click(function(event) {		var pl=$(this).attr('href').replace('#','');		var v=$(this).data('vid');	popupOpen(pl,v);	return false;});function popupOpen(pl,v){	$('.popup').removeClass('active').hide();	if(!isMobile.any()){		$('body').css({paddingRight:$(window).outerWidth()-$('.wrapper').outerWidth()}).addClass('lock');		$('header,.mainpage,.mainblock-body,.regularpage,.regularpageblock-body').css({paddingRight:$(window).outerWidth()-$('.wrapper').outerWidth()});		setTimeout(function(event) {			if($('.popup-'+pl).find('.popup-scroll').length>0){				scroll();				$('.popup-'+pl).find('.popup-body').getNiceScroll().resize();			}		},100);	}else{		$('body').addClass('lock');	}		history.pushState('', '', '#'+pl);	if(v!='' && v!=null){		$('.popup-'+pl+' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/'+v+'?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');	}	$('.popup-'+pl).fadeIn(300).delay(300).addClass('active');}function openPopupById(popup_id){	$('#'+popup_id).fadeIn(300).delay(300).addClass('active');}function popupClose(){	$('.popup').removeClass('active').fadeOut(300);	if(!$('.header-menu').hasClass('active')){		if(!isMobile.any()){			$('body').css({paddingRight:0}).removeClass('lock');			$('header,.mainpage,.mainblock-body,.regularpage,.regularpageblock-body').css({paddingRight:0});		}else{			$('body').removeClass('lock');		}	}	$('.popup-video__value').html('');	history.pushState('', '', window.location.href.split('#')[0]);}$('.popup').click(function(e) {	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {		popupClose();		return false;	}});$('.goto').click(function() {		var el=$(this).attr('href').replace('#','');		var offset=0;	$('body,html').animate({scrollTop:$('.'+el).offset().top+offset},500, function() {});	if($('.header-menu').hasClass('active')){		$('.header-menu,.header-menu__icon').removeClass('active');		$('body').removeClass('lock');	}	return false;});function ibg(){	$.each($('.ibg'), function(index, val) {		if($(this).find('img').length>0){			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');		}	});}ibg();	//Клик вне области$(document).on('click touchstart',function(e) {	if (!$(e.target).is(".select *")) {		$('.select').removeClass('active');	};});//UP$(window).scroll(function() {		var w=$(window).width();	if($(window).scrollTop()>50){		$('#up').fadeIn(300);	}else{		$('#up').fadeOut(300);	}});$('#up').click(function(event) {	$('body,html').animate({scrollTop:0},300);});$('.regularpageslider-item-more.nextscreen').click(function(event) {	$('body,html').animate({scrollTop:$('.regularpageimageslider').offset().top},800);	return false;});$('body').on('click','.tab__navitem',function(event) {			var eq=$(this).index();		if($(this).hasClass('parent')){			var eq=$(this).parent().index();		}	if(!$(this).hasClass('active')){			$(this).closest('.tabs').find('.tab__navitem').removeClass('active');			$(this).addClass('active');			$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');		if($(this).closest('.tabs').find('.slick-slider').length>0){			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');		}	}});$.each($('.spoller.active'), function(index, val) {	$(this).next().show();});$('body').on('click','.spoller',function(event) {	if($(this).hasClass('mob') && !isMobile.any()){		return false;	}	if($(this).hasClass('closeall') && !$(this).hasClass('active')){		$.each($(this).closest('.spollers').find('.spoller'), function(index, val) {			$(this).removeClass('active');			$(this).next().slideUp(300);		});	}	$(this).toggleClass('active').next().slideToggle(300,function(index, val) {			if($(this).parent().find('.slick-slider').length>0){				$(this).parent().find('.slick-slider').slick('setPosition');			}	});});if($('.regularpageblock').length>0){	setTimeout(function(){		$('.regularpageblock').addClass('loaded');	},500);}function scrolloptions(){		var scs=100;		var mss=50;		var bns=false;	if(isMobile.any()){		scs=10;		mss=1;		bns=true;	}	var opt={		cursorcolor:"#262626",		cursorwidth: "11px",		background: "#676762",		autohidemode:false,		cursoropacitymax: 0.4,		bouncescroll:bns,		cursorborderradius: "0px",		scrollspeed:scs,		mousescrollstep:mss,		directionlockdeadzone:0,		cursorborder: "0px solid #fff",	};	return opt;}function scroll(){	$('.popup-body').niceScroll('.popup-scroll',scrolloptions());}function scrolloptions(){		var scs=100;		var mss=50;		var bns=false;	if(isMobile.any()){		scs=10;		mss=1;		bns=true;	}	var opt={		cursorcolor:"#262626",		cursorwidth: "11px",		background: "#676762",		autohidemode:false,		cursoropacitymax: 0.4,		bouncescroll:bns,		cursorborderradius: "0px",		scrollspeed:scs,		mousescrollstep:mss,		directionlockdeadzone:0,		cursorborder: "0px solid #fff",	};	return opt;}if(!isMobile.any()){	//$('body').on('load',function(){		$('body').niceScroll(scrolloptions());	//});}/*function scrollwhouse(){		var scs=100;		var mss=50;		var bns=false;	if(isMobile.any()){		scs=10;		mss=1;		bns=true;	}	var opt={		cursorcolor:"#afafaf",		cursorwidth: "5px",		background: "",		autohidemode:false,		railalign: 'left',		cursoropacitymax: 1,		bouncescroll:bns,		cursorborderradius: "0px",		scrollspeed:scs,		mousescrollstep:mss,		directionlockdeadzone:0,		cursorborder: "0px solid #fff",	};	return opt;}$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());$('.whouse-content-body').scroll(function(event) {		var s=$(this).scrollTop();		var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());		var p=s/r*100;	$('.whouse-content__shadow').css({opacity:1-1/100*p});});*/if($('.t,.tip').length>0){	tip();}function tip(){	$('.t,.tip').webuiPopover({		placement:'top',		trigger:'hover',		backdrop: false,		//selector:true,		animation:'fade',		dismissible: true,		padding:false,		//hideEmpty: true		onShow: function($element) {},		onHide: function($element) {},	}).on('show.webui.popover hide.webui.popover', function(e){		$(this).toggleClass('active');	});}
});
