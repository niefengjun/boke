$.validator.setDefaults({
	errorPlacement: function (error, element) {
		error.appendTo(element.closest(".field-wrap, .field-container"));
	}
});

var Tip = {};
Tip.alert = function (msg, status, callback) {
    alert(msg);
    callback && callback();
};

function getByteLength(str) {
    var n = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            n = n + 1;
        } else {
            n = n + 0.5;
        }
    }
    return Math.round(n);
}

function checkLength($field, maxlength, $tip) {
    var timer;
    $field.bind({
        focus: function () {
            timer = setInterval(function () {
                var length = getByteLength($.trim($field.val()));
                acceptLength = maxlength - length;
                if (acceptLength >= 0) {
                    $tip.html('还可以输入 <em>' + acceptLength + '</em> 个字符');
                } else {
                    $tip.html('已超过 <em class="error">' + Math.abs(acceptLength) + '</em> 个字符');
                }
            }, 500);
        },
        blur: function () {
            clearInterval(timer);
        }
    });
};
var Dlg = {};
Dlg.open = function ($dlg) {
    if ($("#overlay").length < 1) {
        $('<div id="overlay" class="overlay"></div>').appendTo(document.body);
    }
    $("#overlay").add($dlg).show();
    $dlg.css("margin-top", $(window).scrollTop());
};

Dlg.openUrl = function (url, callback) {
    if ($("#overlay").length < 1) {
        $('<div id="overlay" class="overlay"></div>').appendTo(document.body);
    }
    if ($("#g-loading").length < 1) {
        $('<div id="g-loading" class="g-loading"></div>').appendTo(document.body);
    }
    $("#overlay, #g-loading").show();

    $.get(url, function (html) {
        $("#g-loading").hide();
        var $html = $(html).hide().appendTo(document.body);
        Dlg.open($html);
        callback && callback($html);
    }, "html");
};

Dlg.close = function ($dlg, isRemove) {
    isRemove ? $dlg.remove() : $dlg.hide();
    ($("body > div.dlg:visible").length < 1) && $("#overlay").hide();
};

function getByteLength(str) {
    var n = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            n = n + 1;
        } else {
            n = n + 0.5;
        }
    }
    return Math.round(n);
}

function checkLength($field, maxlength, $tip) {
    var timer;
    $field.bind({
        focus: function () {
            timer = setInterval(function () {
                var length = getByteLength($.trim($field.val()));
                acceptLength = maxlength - length;
                if (acceptLength >= 0) {
                    $tip.html('还可以输入 <em>' + acceptLength + '</em> 个字符');
                } else {
                    $tip.html('已超过 <em class="error">' + Math.abs(acceptLength) + '</em> 个字符');
                }
            }, 500);
        },
        blur: function () {
            clearInterval(timer);
        }
    });
};

$(function () {
    $("div.dlg, #overlay").appendTo(document.body);

    $("a.dlg-close, a.dlg-cancel").live("click", function () {
        Dlg.close($(this).closest(".dlg"));

        return false;
    });
});

