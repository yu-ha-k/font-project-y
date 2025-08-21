/**
 * 사이즈 기반 차트.
 * HTML 엘리먼트의 사이즈와. 옵션등을 할 수 있게 하자.
  * setValue [{'RATE':47,},{'RATE':51},{'RATE':2}]
 */
(function() {
	var size_chart = _attrM.extend({
		init : function(q, $e) {
            this._super(q, $e);
            this.val = [];
		}, onload : function() {
		}, clear : function() {
		}, getValue : function() {
			return this.val;
		}, setValue : function(val) {
            this.val = val;
            var children = this.$e.children();
            
            for (var ii=0; ii<children.length; ii++) {
                var  row = val[ii];
                var $ele = $(children[ii]);
                _attrUtil.setOut(row, $ele, "data-row");
            }


		}
	});
	_nattr['.size-chart'] = size_chart;
})();