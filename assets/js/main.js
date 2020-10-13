/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/

/*===========================
 1. function declearetion
 ==========================*/
var themeApp = {
	responsiveIframe: function() {
		$('.post').fitVids();
	},
	sidebarConfig:function() {
		if(typeof sidebar_left !== 'undefined' && sidebar_left == true) {
			$('.main-content').addClass('col-md-push-4');
			$('.sidebar').addClass('col-md-pull-8');
		}
	},
	instagram: function() {
		if (typeof insta_user_id !== 'undefined' && insta_user_id !== '' && typeof insta_access_token !== 'undefined' && insta_access_token !== '') {
			var instaUserFeed = new Instafeed({
				get: 'user',
				limit: 9,
    			resolution: 'thumbnail',
				userId: insta_user_id,
				accessToken: insta_access_token,
				template: '<div class="insta-item"><a href="{{link}}" target="_blank" title="{{caption}}"><img src="{{image}}" alt="{{caption}}"></a></div>'
			});
			instaUserFeed.run();
		}
	},
	facebook:function() {
		if (typeof facebook_page_url !== 'undefined' && facebook_page_url !== '') {
			var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href='+facebook_page_url+'&amp;width&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:258px; width:100%;" allowTransparency="true"></iframe>';
			$('.fb').append(fb_page);
			$(".fb").fitVids();
		}
	},
	flickr:function() {
		if (typeof flickr_id !== 'undefined' && flickr_id !== '') {
			$('.flkr-widget').jflickrfeed({
				limit: 8,
				qstrings: {
					id: flickr_id
				},
				itemTemplate:
				'<li>' +
					'<a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a>' +
				'</li>'
			});
		}
	},
	highlighter: function() {
		$('pre code').each(function(i, block) {
		    hljs.highlightBlock(block);
		  });
	},
	backToTop: function() {
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop : 0},1000);
			return false;
		});
    },
    adjustTileHeight: function() {
        var tile = $('.archive .about-author, .archive .tag-wrapper');
        var max_height = 0;
        if(tile.length > 0) {
            $.each(tile, function(){
                var h = $(this).height();
                max_height = h > max_height ? h : max_height;
            });
            tile.height(max_height);
        }
    },
    gallery: function() {
        var images = document.querySelectorAll('.kg-gallery-image img');
        images.forEach(function (image) {
            var container = image.closest('.kg-gallery-image');
            var width = image.attributes.width.value;
            var height = image.attributes.height.value;
            var ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        });
        mediumZoom('.kg-gallery-image img', {
            margin: 30
        });
	},
	notifications: function() {
		// Parse the URL parameter
		function getParameterByName(name, url) {
			if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, '\\$&');
			var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, ' '));
		}

		// Give the parameter a variable name
		var action = getParameterByName('action');
		var stripe = getParameterByName('stripe');

		if (action == 'subscribe') {
			$('body').addClass("subscribe-success");
		}
		if (action == 'signup') {
			window.location = '/signup/?action=checkout';
		}
		if (action == 'checkout') {
			$('body').addClass("signup-success");
		}
		if (action == 'signin') {
			$('body').addClass("signin-success");
		}
		if (stripe == 'success') {
			$('body').addClass("checkout-success");
		}

		$('.notification-close').click(function () {
			$(this).parent().addClass('closed');
			var uri = window.location.toString();
			if (uri.indexOf("?") > 0) {
				var clean_uri = uri.substring(0, uri.indexOf("?"));
				window.history.replaceState({}, document.title, clean_uri);
			}
		});

	},
	init: function() {
		themeApp.responsiveIframe();
		themeApp.sidebarConfig();
		themeApp.instagram();
		themeApp.facebook();
		themeApp.flickr();
		themeApp.highlighter();
        themeApp.backToTop();
        themeApp.adjustTileHeight();
		themeApp.gallery();
		themeApp.notifications();
	}
}

/*===========================
2. Initialization
==========================*/
$(document).ready(function(){
  themeApp.init();
});
