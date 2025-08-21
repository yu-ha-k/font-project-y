/**
 * User: kwakyc
 * Date: 13. 5. 2.
 * Time: 오전 10:31
 *
 * @namespace JexMobilePosition
 *
 * @example <div .. data-jx-position="It is yours">
 *
 */
(function () {
	var position_attrs = {
		id: "data-jx-position"
	};

	var JexMobilePosition = JexPlugin.extend({
		init: function () {
		},

		/**
		 * @method load
		 * data-jx-position 에 해당하는 속성 값이 읽혀질 때 framework에 의해 호출되는 메소드
		 */
		load: function (attr, $jq) {
			this.$object = $jq;

			this.dialogPosition = new DialogPosition(
				this.$object,
				this.$object.attr(position_attrs.id)
			);
			
		},

		/**
		 * @param event [Mouse Event]
		 */
		set: function(event) {
			var _this = this;
			this.dialogPosition.reset(event);
//			if($(document.activeElement).is('input:not([readonly]):not([disabled])') || $(document.activeElement).is('textarea:not([readonly]):not([disabled])')){
				setTimeout(function(){
					_this.dialogPosition.reset(event);
				},500);
				setTimeout(function(){
					try{
						_this.dialogPosition.reset(event);
						_this.$object.show(); //alert창이 하단에서 화면 중간으로 이동하는 현상으로 comMobView.js에서 object show를 위치조정완료 후 show처리되게 수정
					}catch(e){}
				},800);
//			}
		}
	});

	/**
	 *	@constructor
	 *	@desc DialogPoistion 생성자
	 *
	 *	@param {object} object dialog 대상 객체
	 *	@param {string} userData 사용자가 입력한 위치 데이터.
	 *
	 */
	var DialogPosition = function(object, userData){
		this.$object = object;
		this.data = {
			left 	: {},
			top 	: {},
		};

		this.init(userData);
	};

	/* public interface */
	DialogPosition.prototype = {
		/* public interface */
		init : function(userData){
			this.$object.css("position", "absolute");

			this.parse(userData);
		},
		reset : function(event, direct){
			if ( direct == null ) {
				this.reset(event, "left");
				this.reset(event, "top");
			} else {
				var position = 0;

				var tmpPosition = -1;
				//20130627 right,bottom 가능하도록 수정
				/*if ( this.data[direct] != null && !isNaN(this.data[direct]["position"]) ) {
					tmpPosition = this.data[direct]["position"];
				}*/
				if ( this.data[direct] != null && typeof this.data[direct] === "object" &&
						this.isNumber(this.data[direct]["position"])) {
					tmpPosition = this.data[direct]["position"];
				}

				var reverse = this.isReverse(direct) && !this.isRelative(direct);
				
				//20130627 right,bottom 가능하도록 수정
				/*if ( tmpPosition != null && tmpPosition != -1 ) {*/
				if (this.isNumber(tmpPosition) && tmpPosition != -1 && !reverse){
					position = tmpPosition;
				} else {
					position = this.getPosition(direct);
				}
				

				if (this.isRelative(direct)) {
					var $lastExecuter = jex.get("_jex_last_evt");
					position += parseInt($lastExecuter.offset()[direct]);
				} else {
					position += this.getScrollOffset(direct);
				}
				this.$object.css(direct, position + "px");
			}
		}
		/* /public interface */
	};

	DialogPosition.prototype.parse = function(userData){
		if ( typeof userData !== 'string' || userData.length == 0 )		    throw new Error("입력 값이 ${left}, ${top} 형식이 아닙니다.");

		var arrUserData = userData.split(",");
		if ( arrUserData.length != 2 )				throw new Error("입력 값이 ${left}, ${top} 형식이 아닙니다.");

		this.setPosition("left", arrUserData[0].trim());
		this.setPosition("top", arrUserData[1].trim());
	};

	DialogPosition.prototype.setPosition = function(direct, data){
		//20130627 right,bottom 가능하도록 수정
		/*		var prefix = data.charAt(0);

		if ( this.data[direct] == null )	this.data[direct] = {};

		if ( "+" === prefix || "-" === prefix ) {
			this.setRelativePosition(direct, data);
		} else if ( "@" === prefix ){
			this.setAlignPosition(direct, data);
		} else {
			this.setDefaultPosition(direct, data);
		}*/
		
		if ( this.data[direct] == null )	this.data[direct] = {};

        var keyValue = data.split(":"),
            location = "";

        if (keyValue.length == 2) {
            location = $.trim(keyValue[1]);

            if (direct !== keyValue[0]) {
                this.data[direct][keyValue[0]] = true;
            }
        } else {
            location = data;
        }

        var prefix = location.charAt(0);

		if ( "+" === prefix || "-" === prefix ) {
			this.setRelativePosition(direct, location);
		} else if ( "@" === prefix ){
			this.setAlignPosition(direct, location);
		} else {
			this.setDefaultPosition(direct, location);
		}
	};

	DialogPosition.prototype.setRelativePosition = function(direct, data){
		var position = parseInt(data);
		if (this.isNumber(position)) {
			this.data[direct].position = position;
			this.data[direct].relative = true;
		}
	};

	DialogPosition.prototype.setAlignPosition = function(direct, data){
		var value = data.substring(1);

		if ( value == null || value.length == 0 )		return;
		value = value.trim();

		if ( this.isAllowAlign(direct, value) )		this.data[direct].align = value;
	};

	DialogPosition.prototype.setDefaultPosition = function(direct, data){
		var position = parseInt(data);
		if (this.isNumber(position)) {
			this.data[direct].position = position;
		}
	};

	DialogPosition.prototype.isAllowAlign = function(direct, align){
		if ( align == null || align.length == 0 )		return false;

		var allowedAlign = {
			"left" : {"center":"center", "left":"left", "right":"right"},
			"top" : {"center":"center", "top":"top", "bottom":"bottom"}
		};

		var allowed = allowedAlign[direct];
		if ( allowed == null )			return false;

		if ( allowed[align] != null && allowed[align] === align )		return true;

		return false;
	};

	DialogPosition.prototype.isReverse = function(direct) {
        var reverse = {
            "left"  : "right",
            "top"   : "bottom"
        }[direct];

        return !!(this.data[direct][reverse]);
    };

    DialogPosition.prototype.isRelative = function(direct) {
        return !!this.data[direct]["relative"];
    };
    
    DialogPosition.prototype.isNumber = function(data) {
        return !isNaN(data);
    };
    
	DialogPosition.prototype.getPosition = function(direct){
		var align = this.data[direct]["align"];

		if ( !this.isAllowAlign(direct, align) ) {
			align = "center";
		}

		//20130627 right,bottom 가능하도록 수정
		/*if ( "center" === align ){
			return this.getCenterPosition(direct);
		} else if ( "right" === align ) {
			return this.getWindowInner(direct) - this.getObjectSize(direct);
		}*/
		
		if ("right" === align || this.data[direct]["right"] || "bottom" === align || this.data[direct]["bottom"]) {
            var weight = (this.data[direct]["right"] || this.data[direct]["bottom"])? this.data[direct].position : 0;
            return this.getWindowInner(direct) - this.getObjectSize(direct) - weight;
        } else if ("center" === align) {
            return this.getCenterPosition(direct);
        }

		return 0;
	};

	DialogPosition.prototype.getCenterPosition = function(direct){
		if ( direct == null )		return 0;

		var windowSize = this.getWindowInner(direct);
		var objectSize = this.getObjectSize(direct);

		var position = (windowSize - objectSize);

		if ( position > 0 ) {
			position = position / 2;
		} else {
			position = 0;
		}

		if ( this.$object.parent().offset() != null ) {
			position = position - this.$object.parent().offset()[direct];
		}
		
		if(direct == 'top'){
			if(isEmpty(_headerSize) == false){
				position -= _headerSize/2/window.devicePixelRatio;
			}
		}

		return position;
	};

	DialogPosition.prototype.getWindowInner = function(direct){
		return {
			"left" 	: window.innerWidth,
			"top" 	: window.innerHeight
		}[direct];
	};

	DialogPosition.prototype.getObjectSize = function(direct){
		var object = this.$object;

		return {
			"left" 	: object.width(),
			"top" 	: object.height()
		}[direct];
	};

	DialogPosition.prototype.getScrollOffset = function(direct){
		if ( direct == null )		return 0;

		if ( "left" === direct ) {
			var scrollLeft = $(window).scrollLeft();

			if ( scrollLeft > 0 )		return scrollLeft;
			else					return 0;
		} else if ( "top" === direct ){
			var scrollTop = $(window).scrollTop();
			if ( scrollTop > 0 )		return scrollTop;
			else					    return 0;
		}
	};
	/* /private interface */

	// 페이지에 유일한 객체로 만들고 싶다면 new JexMobilePosition() 로 저장한다.
	jex.plugin.add("JEX_MOBILE_POSITION", JexMobilePosition, position_attrs.id);
})();