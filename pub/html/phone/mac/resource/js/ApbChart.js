/**
 * 알파브리핑 챠트
 */


/**
	 * 색상코드를 미리 정의한다. 
	 */
	var colorSet	= {
		"dflt" 		:  [ "#8cbdfa" ,"#fddc68" ,"#fca66d" ,"#68dcde" ,"#abacf0", "#676767"  ]
	   ,"mint" :  [ "#3ac3c9", "#3ac3c9","#3ac3c9", "#3ac3c9","#3ac3c9","#3ac3c9","#3ac3c9"]  
	   ,"onlycoral" :  [ "#fc6047", "#fc6047","#fc6047", "#fc6047","#fc6047", "#fc6047","#fc6047", "#fc6047","#fc6047", "#fc6047",]  
	   ,"coralblue" :  [ "#fc6047", "#1052a8"]
	   ,"onlyblue" :  [ "#1052a8", "#1052a8", "#1052a8", "#1052a8", "#1052a8", "#1052a8"]
	   ,"loanDflt" :  ["#ff6384","#ffce56","#0081ce","#007575"]
	   ,"cashFlow" :  [ "#1052a8","#fc6047","#1052a8","#fc6047","#1052a8","#fc6047","#1052a8","#fc6047","#1052a8","#fc6047","#1052a8","#fc6047"]
	}
	 
	
	/** 
	 * 옵션을 미리 정의한다.
	 */
	var chartopt	= {
			dflt : function() {
				return {
						responsive: true
						,maintainAspectRatio : false
						,title:		{ display: false, text: '' }
						,tooltips:	{ mode: 'index', displayColors:false, intersect: false, enabled:false } // enable : true로 바꾸면 활성화..  displayColors:false 툴팁 라벨 끄기						,legend :	{ display:false }
						,options :  { maintainAspectRatio : false, segmentShowStroke: true}
						,legend :	{ display:false }
						,elements:	{ line : { tension : 0 } } // 0.000001
						//  ,events : { "touchstart" : true, "click" : true, "touchend" : true, "mousemove" : true, "touchmove" : false }
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
																	if (ret >= 1) return ret + "만";
																	ret = label / 1000;
																	if (ret >= 1) return ret + "천";
																	ret = label / 100;
																	if (ret >= 1) return ret + "백";
																	ret = label / 10;
																	if (ret >= 1) return ret + "십";
																	return label ;
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
				
				ret.tooltips.callbacks					= {};
				ret.tooltips.callbacks.label			= function(tooltipItem, data) {
					var val = parseInt(data.datasets[tooltipItem.datasetIndex]['data'][tooltipItem.index]);
					var mon = (val+"").replace(/,/g,"").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
					return data.datasets[tooltipItem.datasetIndex]['label'] + " : " + mon +" 원";
				}
				
				return ret;
			},noyTooltip : function() {
				var ret = chartopt.dflt();
				ret.tooltips.enabled = true; 
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.tooltips.callbacks					= {};
				ret.tooltips.callbacks.label			= function(tooltipItem, data) {
					var val = parseInt(data.datasets[tooltipItem.datasetIndex]['data'][tooltipItem.index]);
					var mon = (val+"").replace(/,/g,"").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
					return data.datasets[tooltipItem.datasetIndex]['label'] + " : " + mon +" 원";
				}
				
				return ret;
			},noxTooltip : function() {
				var ret = chartopt.dflt();
				ret.tooltips.enabled = true; 
				ret.scales.xAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.tooltips.callbacks					= {};
				ret.tooltips.callbacks.label			= function(tooltipItem, data) {
					var val = parseInt(data.datasets[tooltipItem.datasetIndex]['data'][tooltipItem.index]);
					var mon = (val+"").replace(/,/g,"").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
					return data.datasets[tooltipItem.datasetIndex]['label'] + " : " + mon +" 원";
				}
				
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
			},onlyDoughnut : function() {
				var ret = chartopt.dflt();
				ret.options								= {'maintainAspectRatio' : false, responsive:true}  
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['ticks']			= {beginAtZero:true}
				ret.scales.xAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
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
			},paddline : function() {
				var ret = chartopt.dflt();
				// ret.responsive							= false;
				ret.layout								= {};
				ret.layout.padding						= {};
				ret.layout.padding.left					= 10;
				ret.layout.padding.right				= 25;
				ret.layout.padding.top					= 30;
				ret.layout.padding.bottom				= 10;

				ret.tooltips.enabled 					= true;
				ret.tooltips.callbacks					= {};
				ret.tooltips.callbacks.label			= function(tooltipItem, data) {
					var val = parseInt(data.datasets[0]['data'][tooltipItem.index]);
					var mon = (val+"").replace(/,/g,"").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
					return data.datasets[0]['label'] + " : " + mon +" 원";
				}
				
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
			},fillonlycurveline : function() {
				var ret = chartopt.dflt();
				ret.elements							= { line : { tension : 0.4},  };
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']			= {beginAtZero:true};
				ret.scales.yAxes[0]['ticks']			= {padding:5};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""}; 
				ret.layout								= {};
				ret.layout.padding						= {};
				ret.layout.padding.left					= 10;
				ret.layout.padding.right				= 30;
				ret.layout.padding.top					= 25;
				ret.layout.padding.bottom				= 30;
				return ret;
			},fillonlycurvelineTooltip : function() {
				var ret = chartopt.dflt();
				ret.elements							= { line : { tension : 0.4},  };
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']			= {beginAtZero:true};
				ret.scales.yAxes[0]['ticks']			= {padding:5};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};  
 
				ret.tooltips.enabled 					= true;
				ret.tooltips.callbacks					= {};
				ret.tooltips.callbacks.label			= function(tooltipItem, data) {
					var val = parseInt(data.datasets[0]['data'][tooltipItem.index]);
					var mon = (val+"").replace(/,/g,"").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
					return data.datasets[0]['label'] + " : " + mon +" 원";
				}
				// ret.tooltips.callbacks.title			= function(tooltipItem, data) {
				// 	var label	= data['labels'][tooltipItem[0].index];

				// 	return title;
				// }

				ret.layout								= {};
				ret.layout.padding						= {};
				ret.layout.padding.left					= 10;
				ret.layout.padding.right				= 30;
				ret.layout.padding.top					= 25;
				ret.layout.padding.bottom				= 30;
				return ret;
			 },noyformat : function() {
				var ret = chartopt.dflt();
				delete ret.scales.yAxes[0]['ticks']['callback'];
				return ret; 
			},thinBar : function() {
				var ret = chartopt.dflt();
				ret.elements							= { line : { tension : 0} }; 
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.xAxes[0]['barPercentage'] 	= 0.6;
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""}; 
				ret.layout								= {};
				ret.layout.padding						= {};
				ret.layout.padding.left					= 0;
				ret.layout.padding.right				= 0;
				ret.layout.padding.top					= 25;
				ret.layout.padding.bottom				= 0;				
				return ret;
			},onlyThinBar : function() {
				var ret = chartopt.dflt();
				ret.elements={};
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.xAxes[0]['barPercentage'] 	= 0.7;
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['barPercentage'] 	= 0.5;
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['ticks']['autoSkip']= false;
				ret.scales.yAxes[0].ticks.beginAtZero = true;
 
				ret.layout								= {};
				ret.layout.padding						= {};
				ret.layout.padding.left					= 0;
				ret.layout.padding.right				= 0;
				ret.layout.padding.top					= 0;
				ret.layout.padding.bottom				= 0;
				return ret; 
			},noygtnoxg : function() {
				var ret = chartopt.dflt();
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.tooltips.enabled 					= true;
				ret.tooltips.callbacks					= {};
				ret.tooltips.callbacks.label			= function(tooltipItem, data) {
					var val = parseInt(data.datasets[0]['data'][tooltipItem.index]);
					var mon = (val+"").replace(/,/g,"").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
					return data.datasets[0]['label'] + " : " + mon +" 원";
				} 
				return ret; 
			},horizontalThin : function() {
				var ret = chartopt.dflt();
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['barPercentage'] 	= 0.3; 
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['ticks']			= {}
				ret.scales.xAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				return ret;   
			},dashLineChart : function() {
				var ret = chartopt.dflt();
				ret.elements={};
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['ticks']['autoSkip']= false;
				ret.scales.yAxes[0].ticks.beginAtZero 	= true;
				ret.tooltips.enabled 					= true;
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) {  return "" };
				ret.scales.xAxes[0]['ticks']['autoSkip']= false; 
				
				ret.scales.xAxes[0]['ticks']['callback']= function(label, index,labels) {  
					var bet			= Math.floor(labels.length/4);
					var strLabel	= (label+"");
					var add			= (index == 0 || (index%bet==0 && (index+bet)<labels.length) || (index+1) == labels.length )?true:false
					return (!add)?"":strLabel.substring(4,6) + "/" + strLabel.substring(6,8); 
				};

				ret.tooltips.enabled 					= true;
				ret.tooltips.callbacks					= {};
				ret.tooltips.callbacks.label			= function(tooltipItem, data) {
					var val = parseInt(data.datasets[0]['data'][tooltipItem.index]);
					var mon = (val+"").replace(/,/g,"").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
					return data.datasets[0]['label'] + " : " + mon +" 원";
				}
				ret.tooltips.callbacks.title			= function(tooltipItem, data) {
					var label	= data['labels'][tooltipItem[0].index];
					var title	= label.substring(4,6) + "월 " + label.substring(6,8) + "일";
					return title;
				} 

			},dashOnlyThinBar : function() {
				var ret = chartopt.dflt();
				ret.elements={};
				ret.scales.xAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.yAxes[0]['gridLines'] 		= {'display':false,'drawBorder':false};
				ret.scales.xAxes[0]['barPercentage'] 	= 0.7;
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['barPercentage'] 	= 0.5;
				ret.scales.yAxes[0]['ticks']['callback']= function(label, index, labels) { return ""};
				ret.scales.xAxes[0]['ticks']['autoSkip']= false;
				ret.scales.yAxes[0].ticks.beginAtZero = true;
				
				ret.scales.xAxes[0]['ticks']['callback']= function(label, index,labels) {
					var bet			= Math.floor(labels.length/4);
					var strLabel	= (label+"");
					var add			= (index == 0 || (index%bet==0 && (index+bet)<labels.length) || (index+1) == labels.length )?true:false
					return (!add)?"":strLabel.substring(4,6) + "/" + strLabel.substring(6,8); 
				};

				ret.tooltips.enabled 					= true;
				ret.tooltips.callbacks					= {};
				ret.tooltips.callbacks.label			= function(tooltipItem, data) {
					var val = parseInt(data.datasets[0]['data'][tooltipItem.index]);
					var mon = (val+"").replace(/,/g,"").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
					return data.datasets[0]['label'] + " : " + mon +" 원";
				}
				ret.tooltips.callbacks.title			= function(tooltipItem, data) {
					var label	= data['labels'][tooltipItem[0].index];
					var title	= label.substring(4,6) + "월 " + label.substring(6,8) + "일";
					return title;
				}
				
				ret.layout								= {};
				ret.layout.padding						= {};
				ret.layout.padding.left					= 0;
				ret.layout.padding.right				= 0;
				ret.layout.padding.top					= 0;
				ret.layout.padding.bottom				= 0;
				return ret;
			}
	}
	

	var chartlabel = {
			defaultLabel : function(element, dataset, index) {
				var ctx = element._chart.ctx;
				ctx.fillStyle = '#aaaaaa';

				var fontSize	= 13;
				var fontStyle	= 'normal';
				var fontFamily	= 'Helvetica Neue';
				ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

				var dataString	= dataset.data[index].toString();
				
				var fmtString	=  ((dataString)?parseInt((dataString+"").replace(/,/g,"")).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):0);

				ctx.textAlign	= 'center';
				ctx.textBaseline= 'middle';

				var padding		= 10;
				var position	= element.tooltipPosition();
				ctx.fillText(fmtString, position.x, position.y - (fontSize / 2) - padding);
			} 
			,gradeMSG : function(element, dataset, index) {
				if (!dataset.lab || !dataset.lab[index]) return;
				
				var ctx = element._chart.ctx;
				ctx.fillStyle = '#000000';
		
				var fontSize	= 12;
				var fontStyle	= 'normal';
				var fontFamily	= 'Helvetica Neue';
				ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
		
				var dataString	= dataset.lab[index];
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
				var fontSize	= 14;
				var fontStyle	= 'normal';
				var fontFamily	= 'Helvetica Neue';
				ctx.fillStyle	= 'rgba(247, 140, 70, 1)';
				ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
				ctx.fillText(dataString3,	position.x, position.y - (fontSize / 2) - padding);
			}
		
	}
	
	var hexToRGBA = function(hex, alpha) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		alpha = (!alpha)?1:alpha;
	    return result ? "rgba(" +parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," +  parseInt(result[3], 16) + "," +  alpha +")" : null;
	}
	
var ApbChart = function(){
	
	var q;
	var $e;
	
};

ApbChart.prototype = {
		 init	 	: function(q,$e){ 
			 this.q = q;				
			 this.$e = $e;
		 }
		,onload	 	: function()	{ 
			this.type		= this.$e.attr("data-chart");
			var cwidth		= "98%";
			var cheight		= "98%";
		
//			if (!this.$e.is(":visible")) {
//				console.log("charts :: notVislble");
//				var classes = (this.$e.attr('class'))?this.$e.attr('class').split(" "):[];
//				console.log("charts :: classes :: ", classes);
//				for (var clss in classes) {
//					if (/h\d/.test(classes[clss])) {
//						cheight = (Math.floor(parseInt(classes[clss].substring(1)) * 0.98)) + "px";
//						console.log("charts :: cheight == ",cheight);
//						break;
//					}
//				}
//			} 
			
			if (this.$e.find("canvas").length > 0)	this.$canvas	= this.$e.find("canvas");
			else										this.$canvas	= $("<canvas style='width:"+cwidth+";height:"+this.$e.height()+"px'></canvas>");
			
			var _this		= this;
			this.points 		= ['circle', 'rect'];
			this.opt			= this.$e.attr("data-chart-opt");
			this.label		= this.$e.attr("data-chart-label");
			this.alpha		= this.$e.attr("data-chart-alpha");
			this.fill		= this.$e.attr("data-chart-fill");
			this.border		= this.$e.attr("data-chart-border");
			this.ocolors		= this.$e.attr("data-chart-colors");
			this.eachColor	= this.$e.attr("data-chart-colors-each");
			this.mixed		= this.$e.attr("data-chart-mixed");
			
			if (!this.opt			)	this.opt	= "dflt";
			if (!this.ocolors		)	this.ocolors= "dflt";
			if (this.fill != "true"	)	this.fill	= false;
			else							this.fill	= true;
			if (!this.border			)	this.border	= 1; // 2
			else							this.border = parseInt(this.border);
			if (this.mixed != "true")	this.mixed	= false;
			else							this.mixed	= true;
			
			if (this.eachColor != undefined)	this.eachColor  = (this.eachColor == "true")?true:false;
			else								this.eachColor	= (this.type!='line' && this.type!='bar' && this.type!='horizontalBar')?true:false;
			
			this.colors		= colorSet[this.ocolors];
			
			this.$canvas.appendTo(this.$e);
			
			var drawChart = function(ele) {				
				var chartData = {
						labels: ['', '', '', '' ],
						datasets: [	 { type: _this.type, label: '', backgroundColor: _this.colors[0,1,2,3,4,5], data: [ 0, 0, 0, 0 ], borderColor: _this.colors[0], fill: true, borderWidth: 1 }
									,{ type: _this.type, label: '', borderColor: _this.colors[1], backgroundColor: _this.colors[0,1,2,3,4,5], borderWidth: 1, fill: true, data: [ 0, 0, 0, 0 ] } ]
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
			
			if (_this.$e.hasClass('e-data') && _this.$e.data("kk-data")) {
				chartData = _this.$e.data("kk-data");
				_this.setValue(chartData);
			}
			
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
					row["lab"]		= (dat[jj].lab)?dat[jj].lab:dat[jj].LAB;
					dsetrow[rkey].push(row);
					if (idx==0) label.push((dat[jj].label)?dat[jj].label:dat[jj].LABEL);
				}
				
				
				idx++;
			}
			
			
			chartdata['labels']		= label;
			chartdata['datasets']	= retdset;

			
			var nn=0;
			var pp=0;
			for (label in dsetrow) {
				var data	= [];
				var ds		= dsetrow[label];
				var boc		= [];
				var bac		= [];
				var lab		= [];
				var bcn		= 0;

				for (var jj=0; jj<ds.length; jj++) {
					var color	= ds[jj]['color']?ds[jj]['color']:this.colors[bcn];
					var colback = hexToRGBA(color, this.alpha);
//					var colbord = (this.fill)?hexToRGBA(color, 1):colback;
					var colbord = hexToRGBA(color, 1);
					lab.push(ds[jj]['lab']);
					
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

					nrow.borderWidth = 2;
					nrow.pointBackgroundColor = col;
					nrow.pointRadius = 4;
					nrow.pointBorderWidth = 4;
					retdset.push(nrow);
				}
				
				if (this.type == "line") {
					var row = {
							type	: this.type,
							label	: label,
							lab		: lab,
							backgroundColor: bac[nn],
							data	: data,
							borderColor: this.colors[nn++],
							fill	: this.fill,
							alpha   : this.alpha,
							borderWidth	: this.border,
							pointStyle :'circle',
							//borderDash:[5,5],
							// pointStyle: this.points[pp++], 
							pointDot:true,
							pointBorderWidth:2,
							pointRadius:3,
							pointBackgroundColor:"#ffffff"
							};
				}
				if (this.type == "radar") {
					var row = {
						type	: this.type,
							label	: label,
							lab		: lab,
							backgroundColor: bac[nn],
							data	: data,
							borderColor: this.colors[nn++],
							fill	: this.fill,
							alpha   : this.alpha,
							borderWidth	: this.border,
							//borderDash:[5,5],
							pointStyle: this.points[pp++],
							pointDot:true,
							// pointRadius:5,
							pointBackgroundColor: "#797ae6"
					}
				} 
				retdset.push(row);
				
			}
			
			
			var _this = this;
			
			setTimeout(function(){
				_this.chart.data = chartdata;
				_this.chart.update();
			},200);
			
		} ,unbind	: function()	{
			console.log("onload !! chart");
			this.chart.destroy();
			this.$canvas.remove();
		} ,getValue	: function()	{
			return this.val;
		} ,defineEvt	: function()	{
		}
	};

