window.ondragstart = function() { return false; } 
$(function(){
	$(document).ready(function(){
		$('*').disableSelection();
		$('.flipbox').click(function(e){
			if(!$('.active').length){
				$(this).addClass('active');
				$('.flipbox-container').css('-webkit-perspective','').css('perspective','');
				if($(this).hasClass('front')){
					$(this).removeClass('front');
					$('.flipbox').css('transform', '');
					$(this).flippy({
						color_target: '#b6d635',
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
