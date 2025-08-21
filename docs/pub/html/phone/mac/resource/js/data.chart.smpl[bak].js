/**
 * data.chart.js
 * type :: bar / line / radar / doughnut / pie / 
 *
 * data-chart='chart-type'				// 차트 정의
 * data-chart-opt='option'				// 차트 옵션
 * data-chart-label='label type'		// 차트 라벨 타입
 * data-chart-alpha='0.1 ~ 1'			// 차트 투명도 Default : 1
 * data-chart-fill='true|false'			// 차트안에 bg를 채워넣을지 Default : false
 * data-chart-border='1~'				// 차트 선의 굵기 Default : 2
 * data-chart-colors='colorSet'			// 미리 정의한 색상코드 들을 가져다 쓴다.
 * data-chart-colors-each='true|false'	// data row별로 각각 다른 색상을 사용할지 여부. Default : false, ( pie / doughnut 차트는 Default : true )
 * data-chart-mixed='true|false'		// mixed 차트인지.
 **/
(function() {

	/**
	 * 색상코드를 미리 정의한다.
	 */
	var colorSet	= {
		  "dflt" 		:  [ "#8cbdfa" ,"#fddc68" ,"#fca66d" ,"#68dcde" ,"#abacf0", "#676767"  ]
		 ,"test" 		:  [ "#fca66d" ,"#68dcde" ,"#abacf0", "#676767", "#8cbdfa", "#fddc68"  ]
		 ,"test2" 		:  [ "#008000" ,"#68dcde" ,"#abacf0", "#676767", "#8cbdfa", "#fddc68"  ]
	}
	
	
	/**
	 * 옵션을 미리 정의한다.
	 */
	var chartopt	= {
			dflt : function() {
				return {
					 	 responsive: true
						,title:		{ display: false, text: '' }
						,tooltips:	{ mode: 'index', intersect: false, enabled:false } // enable : true로 바꾸면 활성화.. 
						,legend :	{ display:false }
						,elements:	{ line : { tension : 0.000001 } }
						,scales: {	xAxes: [
											{
												ticks: {
													beginAtZero: true
												}
											}
											],
					        		yAxes: [
					        				{
												ticks: {
													callback:	function(label, index, labels) {
																	var ret = label / 10000;
																	if (ret < 1) return "0";
																	return (ret == 0) ? "0" : ret + "만";
																},
													beginAtZero: true
												},
												scaleLabel: { display: false }
											}
							        ]
							    }
						}
			},tooltip : function() {
				var ret = chartopt.dflt();
				ret.tooltips.enabled = true;
				
				return ret;
			},nogrid : function() {
				var ret = chartopt.dflt();
				ret.scales.xAxes[0]['gridLines'] = {'display':false};
				ret.scales.yAxes[0]['gridLines'] = {'display':false};
				return ret;
			},noborder : function() {
				var ret = chartopt.dflt();
				ret.scales.xAxes[0]['gridLines'] = {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] = {'display':false,'drawBorder':false};
				return ret;
			},curve : function() {
				var ret = chartopt.dflt();
				ret.elements={};
				return ret;
			},onlyline : function() {
				var ret = chartopt.dflt();
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['ticks']			= {}
				ret.scales.xAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.layout								= {};
				ret.layout.padding						= {};
				ret.layout.padding.left					= 20;
				ret.layout.padding.right				= 30;
				ret.layout.padding.top					= 20;
				ret.layout.padding.bottom				= 0;
				return ret;
			},onlycurveline : function() {
				var ret = chartopt.dflt();
				ret.elements							= { line : { tension : 0.4} };
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']			= {beginAtZero:true}
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['ticks']			= {beginAtZero:true}
				ret.scales.xAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.layout								= {};
				ret.layout.padding						= {};
				ret.layout.padding.left					= 20;
				ret.layout.padding.right				= 30;
				ret.layout.padding.top					= 20;
				ret.layout.padding.bottom				= 0;
				return ret;
			},defaultPie : function() {
				return  { responsive: true }
			},noyformat : function() {
				var ret = chartopt.dflt();
				delete ret.scales.yAxes[0]['ticks']['callback'];
				return ret;
			},onlyRadar : function() {
				var ret = chartopt.dflt();
				ret.responsive = false;
				ret.elements={};
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['ticks']			= {beginAtZero:true}
				ret.scales.xAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				return ret;
			},thinBar : function() {
				var ret = chartopt.dflt();
				ret.elements={};
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.xAxes[0]['barPercentage'] 	= 0.5;
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};

				return ret;
			},fillColor : function() { 
				var ret = chartopt.dflt(); 
				ret.elements = {
					line : {
						tension : 0.3,
						fill : true,
						backgroundColor : "rgba(0,0,0,0.3)"
					},
				};
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				return ret;
			},noygtnoxg : function() {
				var ret = chartopt.dflt();
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				return ret;
			},defaultRadar : function() {
				return {
					legend: { position: 'top',	},
					title:	{ display: false,	},
					scale:	{
						ticks: {	callback:	function(label, index, labels) { return ""; }
								,	beginAtZero: true }
					}
				};
			}
	}
	

	var chartlabel = {
			defaultLabel : function(element, dataset, index) {
				var ctx = element._chart.ctx;
				ctx.fillStyle = 'rgb(0, 0, 0, 0.5)';

				var fontSize	= 12;
				var fontStyle	= 'normal';
				var fontFamily	= 'Helvetica Neue';
				ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

				var dataString	= dataset.data[index].toString();

				ctx.textAlign	= 'center';
				ctx.textBaseline= 'middle';

				var padding		= 10;
				var position	= element.tooltipPosition();
				ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
			}
			,gradeMSG : function(element, dataset, index) {
				if (dataset.data.length-1 != index) return;
				var ctx = element._chart.ctx;
				ctx.fillStyle = 'rgb(0, 0, 0, 0.5)';

				var fontSize	= 12;
				var fontStyle	= 'normal';
				var fontFamily	= 'Helvetica Neue';
				ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

				var dataString	= "나의등급";
				var dataString2	= "▼";
				var dataString3	= "●";

				ctx.textAlign	= 'center';
				ctx.textBaseline= 'middle';

				var padding		= 20;
				var position	= element.tooltipPosition();
				ctx.fillText(dataString,	position.x, position.y - (fontSize / 2) - padding);
				
				var padding		= 7;
				ctx.fillText(dataString2,	position.x, position.y - (fontSize / 2) - padding);
				
				var padding		= -7;
				var fontSize	= 15;
				var fontStyle	= 'normal';
				var fontFamily	= 'Helvetica Neue';
				ctx.fillStyle	= 'rgb(255, 0, 0, 1)';
				ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
				ctx.fillText(dataString3,	position.x, position.y - (fontSize / 2) - padding);
			}
	}
	
	var hexToRGBA = function(hex, alpha) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		alpha = (!alpha)?1:alpha;
	    return result ? "rgba(" +parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," +  parseInt(result[3], 16) + "," +  alpha +")" : null;
	}
	
	var chart = _attrM.extend({
		 init	 	: function(q,$e){ this._super(q,$e);				}
		,onload	 	: function()	{ 
			this.type		= this.$e.attr("data-chart");
			this.$canvas	= $("<canvas style='width:98%;height:98%'></canvas>");
			var _this		= this;
			this.opt		= this.$e.attr("data-chart-opt");
			this.label		= this.$e.attr("data-chart-label");
			this.alpha		= this.$e.attr("data-chart-alpha");
			this.fill		= this.$e.attr("data-chart-fill");
			this.border		= this.$e.attr("data-chart-border");
			this.ocolors	= this.$e.attr("data-chart-colors");
			this.eachColor	= this.$e.attr("data-chart-colors-each");
			this.mixed		= this.$e.attr("data-chart-mixed");
			
			if (!this.opt			)	this.opt	= "dflt";
			if (!this.ocolors		)	this.ocolors= "dflt";
			if (this.fill != "true"	)	this.fill	= false;
			else						this.fill	= true;
			if (!this.border		)	this.border	= 2;
			else						this.border = parseInt(this.border);
			if (this.mixed != "true")	this.mixed	= false;
			else						this.mixed	= true;
			
			if (this.eachColor != undefined)	this.eachColor  = (this.eachColor == "true")?true:false;
			else								this.eachColor	= (this.type!='line' && this.type!='bar' && this.type!='horizontalBar')?true:false;
			
			this.colors		= colorSet[this.ocolors];
			
			this.$canvas.appendTo(this.$e);
			
			var drawChart = function(ele) {
				var chartData = {
						labels: ['', '', '', '' ],
						datasets: [	 { type: _this.type, label: '', backgroundColor: _this.colors[0,1,2,3,4,5], data: [ 0, 0, 0, 0 ], borderColor: _this.colors[0], fill: true, borderWidth: 2 }
									,{ type: _this.type, label: '', borderColor: _this.colors[1], backgroundColor: _this.colors[0,1,2,3,4,5], borderWidth: 2, fill: true, data: [ 0, 0, 0, 0 ] } ]
				};

				return new Chart(ele.getContext('2d'), {
					type: _this.type,
					data: chartData,
					options:chartopt[_this.opt]()
				});
			}

			this.chart =  drawChart(this.$canvas.get(0));
		
			if (_this.label) {
				Chart.plugins.register({
					afterDatasetsDraw: function(chart) {
						var ctx = _this.chart.ctx;
						_this.chart.data.datasets.forEach(function(dataset, i) {
							var meta = _this.chart.getDatasetMeta(i);
							if (!meta.hidden) { for (ii in meta.data) { chartlabel[_this.label](meta.data[ii], dataset, ii); } }
						});
					}
				});
			}
			
			this.defineEvt();					
			
		}
		,setValue	: function(val)	{
			var jno			= this.$e.attr("data-jno");	
			this.val		= val;
			var chartdata	= {}
			var label		= [];
			var retdset		= [];
			var dsetrow		= {};

			var idx = 0;
			for (var rkey in val) {
				var dat			= val[rkey];
				dsetrow[rkey]	= [];
				

				for (var jj=0; jj<dat.length; jj++) {
					var row = {};
					row["val"]		= (dat[jj].val)?dat[jj].val:dat[jj].VAL;
					row["color"]	= (dat[jj].color)?dat[jj].color:dat[jj].COLOR;
					dsetrow[rkey].push(row);
					if (idx==0) label.push((dat[jj].label)?dat[jj].label:dat[jj].LABEL);
				}
				
				
				idx++;
			}
			
			
			chartdata['labels']		= label;
			chartdata['datasets']	= retdset;

			
			var nn=0;
			for (label in dsetrow) {
				var data	= [];
				var ds		= dsetrow[label];
				var boc		= [];
				var bac		= [];
				var bcn		= 0;

				for (var jj=0; jj<ds.length; jj++) {
					var color	= ds[jj]['color']?ds[jj]['color']:this.colors[bcn];
					var colback = hexToRGBA(color, this.alpha);
//					var colbord = (this.fill)?hexToRGBA(color, 1):colback;
					var colbord = hexToRGBA(color, 1);
					boc.push(colbord);
					bac.push(colback);
					data.push(ds[jj]['val']);
					(this.eachColor && bcn++);
				}
				

				var row =  {	type	: this.type,
								label	: label,
								backgroundColor: bac,
								data	: data,
								borderColor: boc,
								fill	: this.fill,
								borderWidth	: this.border
				};
				
				
				if (this.mixed) {
					var nrow 	= JSON.parse(JSON.stringify(row));
					var color	= this.colors[1];
					var col 	= hexToRGBA(color, 1);
					
					nrow.type = (nrow.type == "bar")?"line":"bar";
					nrow.borderColor = col;
					retdset.push(nrow);
				}
				
				retdset.push(row);
				
			}
			
			
			var _this = this;
			
			setTimeout(function(){
				_this.chart.data = chartdata;
				_this.chart.update();
			},200);
			
		} ,getValue	: function()	{
			return this.val;
		} ,defineEvt	: function()	{
		}
	});
	_nattr['[data-chart]'] = chart;
})();


