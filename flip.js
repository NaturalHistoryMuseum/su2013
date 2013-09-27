window.ondragstart = function() { return false; } 
$(function(){
	function preload(arrayOfImages) {
	    $(arrayOfImages).each(function(){
		$('<img/>')[0].src = this;
	    });
	}
	preload([
		'1_full.png',
		'2_full.png',
		'3_full.png',
		'4_full.png',
		'5_full.png',
		'6_full.png',
		'7_full.png',
		'8_full.png',
		'9_full.png'
	]);
	$(document).ready(function(){
		$('.flipbox').click(function(e){
			if(!$('.active').length){
				$(this).addClass('active');
				$('.flipbox-container').css('-webkit-perspective','').css('perspective','');
				if($(this).hasClass('front')){
					$(this).removeClass('front');
					$('.flipbox').css('transform', '');
					$(this).flippy({
						direction: 'top',
						duration: '400',
						verso: '<img src="'+$(this).data('verso')+'" class="verso" width="'+$(this).width()+'" height="'+$(this).height()+'"/>',
						onReverseFinish: function(){
							$('.active').removeClass('active');
						},
						onFinish: function(){
							var position = $('img', $(this).get(0).jO).position();
							var moveLeft = 0 - $('img', $(this).get(0).jO).position().left;
							var moveUp = 0 - $('img', $(this).get(0).jO).position().top;
							var originalHeight = $('img', $(this).get(0).jO).height();
							var originalWidth = $('img', $(this).get(0).jO).width();
							$('img', $(this).get(0).jO).data('height', originalHeight);
							$('img', $(this).get(0).jO).data('width', originalWidth);
							$('img', $(this).get(0).jO).animate({height:$(window).height(), width:$(window).width(), left: moveLeft, top: moveUp}, 1000, 'swing', function(){
								$('.active').removeClass('active');
							});
							//$('body').append('<p class="back">Click anywhere to close</p>');
						}
					});
				} else {
					var originalThis = $(this);
					$('img', $(this)).animate({height:$('img', $(this)).data('height'), width:$('img', $(this)).data('width'), left: 0, top: 0}, 1000, 'swing', function(){
						$(originalThis).addClass('front');
						$(originalThis).flippyReverse();
					});
				}
			}
		});
	});
});
