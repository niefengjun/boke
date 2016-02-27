/*
 * 仿title默认提示效果
 * #g-tooltip {position:absolute; max-width:300px; padding:5px; border:1px solid #000; background-color:#333; color:#fff; font-size:14px; white-space:normal; word-wrap:break-word; word-break:break-all;}
 * */
(function($){
	$.fn.tooltip = function(options){
		var opts = $.extend({
			xOffset: 10,
			yOffset: 20,
			attr: "title", /*提示信息存放在哪个属性里了*/
			showTipFn: showTipFn
		}, options);
		
		var showTipFn = function(e, txt){
			$(this).html(txt).css({
				"top": (e.pageY - opts.xOffset),
				"left": (e.pageX + opts.yOffset)
			}).fadeIn();
		};
		
		return this.each(function(){
			var $this = $(this),
			txt = $this.attr(opts.attr);		
			
			$this.bind({
				"mouseenter": function(e){
					("title" == opts.attr) && $this.removeAttr("title");
					$("body").append('<div id="g-tooltip"></div>');
					showTipFn.call($("#g-tooltip"), e, txt);	
				},
				"mouseleave": function(){
					("title" == opts.attr) && $this.attr("title", txt);
					$("#g-tooltip").remove();
				},
				"mousemove": function(e){
					$("#g-tooltip").css({
						"top": (e.pageY - opts.xOffset),
						"left": (e.pageX + opts.yOffset)
					});
				}
			});
			
		});
	};
})(jQuery);
