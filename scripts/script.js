$(function(){
	var r = Raphael('map', 2048, 1536),
		attributes = {
            fill: ' rgba(0, 120, 201, 0.2)',
            stroke: '#072b48',
            'stroke-width': 2,
            'stroke-linejoin': 'round'
        },
		arr = new Array();
	for (var country in paths) {
		var obj = r.path(paths[country].path);
		obj.attr(attributes);
		arr[obj.id] = country;
		obj.hover(function(){
			this.animate({
				stroke: 'red'
			}, 300);
		}, function(){
			this.animate({
				stroke: attributes.stroke
			}, 300);
		})
		.click(function(event){
			document.location.hash = arr[this.id];
			var point = this.getBBox(0);
			$('#map').next('.point').remove();
			$('#map').after($('<div />').addClass('point'));
			$('.point')
			.html(paths[arr[this.id]].name)
			.prepend($('<a />').attr('href', '#').addClass('close').text('Close'))
			.css({
				left: event.pageX-($("div.point").width()/2)-8,
				top: event.pageY-($("div.point").outerHeight())-10
			})
			.fadeIn();
		});
		$('.point').find('.close').live('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
	}
});


