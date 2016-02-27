$(document).ready(function () {
	
	$('.form-container').click(function () {
		$(this).next().slideToggle('slow');
	})
	// navigation selected
	var mainPath = document.location.pathname.match(/(^\/[a-z]*)/),
		subPath = document.location.pathname.match(/(^\/[a-z]*\/[a-z]*)/);

	if (subPath && subPath[1] && $('a[href^="' + subPath[1] + '"]', '.left-nav').length > 0)
		$('a[href^="' + subPath[1] + '"]', '.left-nav').addClass('selected');
	else if (mainPath && mainPath[1] && mainPath[1].length > 1 && $('a[href^="' + mainPath[1] + '"]', '.left-nav').length > 0)
		$('a[href^="' + mainPath[1] + '"]', '.left-nav').addClass('selected');

});
