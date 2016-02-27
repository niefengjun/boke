/**
级联select

使用示例：
	var myData = [
		{
            "id": "bj",
			"text": "北京",
			"children": [
               {...},
               {...},
               {...}
			]
		},
		{...},
		{...},
		{
            "id": "sd",
			"text": "山东"
		}
	];

默认值写法1
$("#myselect").select({
	data: myData, //或者是url
	defaultValues: ["bj", "dc", "d2"], //默认值写法（选填）：依次表示第1个，第2个，第...个select框的值,
	placeholders: ["请选择", "请先选择城市", "请先选择城区"]
});

默认值写法2：<select defaultValue="11"></select> <select defaultValue="111"></select> <select defaultValue="1112"></select>
*/
(function ($) {
    $.fn.select = function (options) {
        var options = options || {},
		data = options.data,
		defaultVals = options.defaultValues || options.defaultVals || [],
		placeholders = options.placeholders || [],
		callback = options.callback;
				
        function initSelect($selectList, index, data) {
            if (data.length < 1) return;

            var $select = $selectList.eq(index),
			html = '';
            if (placeholders[index]) {
                html = '<option value="">' + placeholders[index] + '</option>';
            }

            $.each(data, function (i, item) {
                html += '<option value="' + item.id + '">' + item.text + '</option>';
            });

            var $todoSelectList = $selectList.slice(index + 1);
            resetSelect($todoSelectList);
            $.isFunction(callback) && callback($todoSelectList);

            $select.html(html).removeAttr("disabled").show();

            $select.val(defaultVals[index] || $select.attr("defaultValue") || $select.attr("defaultvalue")).trigger("change");
        }

        function resetSelect($selectList) {
            $selectList.each(function () {
                $(this).html($(this).data("default"));
            });
        }

        return this.each(function () {
            var $container = $(this),
			$selectList = $container.find("select");

            $selectList.each(function () {
                $(this).data("default", $(this).html());
            });

            $selectList.unbind("change").bind("change", function () {
                var $this = $(this),
				index = $.inArray($this.get(0), $selectList);

                if ("" == $this.val()) {
                    var $todoSelectList = $selectList.slice(index + 1);
                    resetSelect($todoSelectList);
                    $.isFunction(callback) && callback($todoSelectList);
                } else {
                	$this.one("myData", function(e, myData){
                		if (myData) {
	                        initSelect($selectList, index + 1, myData);
	                    } else {
	                        var $todoSelectList = $selectList.slice(index + 1);
	                        resetSelect($todoSelectList);
	                        $.isFunction(callback) && callback($todoSelectList);
	                    }
                	});
                	
                	getChildren.call(this, index);
                }
            });
			
			//初始化第一个select框
            if("string" == $.type(data)) {
				var params = {},
				key = $(this).attr("key");
				if(key) {
					params[key] = $(this).val();
				}
				$.getJSON(data, params, function(json){
					initSelect($selectList, 0, json);
				});
			} else {
				initSelect($selectList, 0, data);
			}
           
            function getChildren(index) {
            	var $this = $(this);
				var myData;
				if("string" == $.type(data)) {
					var $child = $selectList.eq(index+1);
					params = {},
					key = $child.attr("key");
					if(key) {
						params[key] = $(this).val();
					}
					$.getJSON(data, params, function(json){
						$this.trigger("myData", [json]);
					});
				} else {
					myData = data;
					$.each($selectList.slice(0, index+1), function(){
						var val = $(this).val();
						$.each(myData, function(i, item){
							if(item.id == val) {
								myData = myData[i].children;
								return false;
							}
						});
					});
					$(this).trigger("myData", [myData]);
				}
            };
            
        });
    };
})(jQuery);