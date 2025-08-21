var comCacheUtil = {
	/**
	 * @description 유의사항 조회
	 * @param id : 유의사항 ID
	 * @return 
	 */
	getGuideTip : function(id) {
		var ajax = jex.createAjaxUtil("com_utl_070101_1");
		
		ajax.set("task_package",    "com");
		ajax.set("task_subpackage", "utl");
		ajax.set("cache_key",       "GUIDE_TIP");
		ajax.set("guide_id",        id);
		
		ajax.setErrTrx(false);
		ajax.setAsync(false);
		
		var res_data = ajax.execute();
		var rtn_data = "";
		
		if(isEmpty(res_data) == false) {
			res_data = res_data["_tran_res_data"][0];
			
			if(res_data["_is_error"] != "true") { //정상거래
				rtn_data = res_data;
			}
		}
		
		return rtn_data;
	},
	/**
	 * @description 약관URL 목록 조회
	 * @param id_str : 약관ID 목록 문자열(',' 로 구분) 또는 리스트
	 * @return 약관URL목록
	 */
	getTermUrlList : function(id_list) {
		var term_id_list = []; //약관ID 목록
		
		if(typeof(id_list) === "object" && id_list.length > 0) { //리스트
			term_id_list = id_list;
		}
		else { //문자열
			id_list.split(",").forEach(function(id) {
				term_id_list.push({"term_id" : id});
			});
		}
		
		var ajax = jex.createAjaxUtil("com_utl_070101_1");
		
		ajax.set("task_package",    "com");
		ajax.set("task_subpackage", "utl");
		ajax.set("cache_key",       "TERM_URL");
		ajax.set("term_id_list",    term_id_list); //약관ID 목록
		
		ajax.setErrTrx(false);
		ajax.setAsync(false);
		
		var res_data = ajax.execute();
		var rtn_data = "";
		
		if(isEmpty(res_data) == false) {
			res_data = res_data["_tran_res_data"][0];
			
			if(res_data["_is_error"] != "true") { //정상거래
				rtn_data = res_data["term_url_list"];
			}
		}
		
		return rtn_data;
	},
	/**
	 * @description 약관URL 정보 조회
	 * @param id : 약관ID
	 * @return 약관URL 정보
	 */
	getTermUrlInfo : function(id) {
		var term_url_list = this.getTermUrlList(id);
		
		if(isEmpty(term_url_list) == false && term_url_list.length == 1) {
			return term_url_list[0];
		} else { //조회종류가 없을경우
			return "";
		}
	}
}