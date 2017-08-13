<?php
	//从bing获取数据
        //error_reporting(E_ALL ^ E_NOTICE);
	    header("Content-Type:text/html;charset=utf-8");
		$str1=file_get_contents('http://cn.bing.com/HPImageArchive.aspx?idx=-1&n=8');
		$str2=file_get_contents('http://cn.bing.com/HPImageArchive.aspx?idx=7&n=8');
		preg_match_all('/<url>(.*?)<\/url>/ies', $str1, $matches1, PREG_SET_ORDER);
		preg_match_all('/<url>(.*?)<\/url>/ies', $str2, $matches2, PREG_SET_ORDER);
		preg_match_all('/<copyright>(.*?)<\/copyright>/ies', $str1, $matches1a, PREG_SET_ORDER);
		preg_match_all('/<copyright>(.*?)<\/copyright>/ies', $str2, $matches2a, PREG_SET_ORDER);
		for($i=1;$i<8;$i++){
			$imgurl='http://cn.bing.com'.$matches1[$i][1];
			$copyRight=$matches1a[$i][0];
			echo "<div class='section' style='background:url($imgurl);height:100%;width:100%'><p>$copyRight</p><span>$imgurl</span></div>";
		}
		for($i=1;$i<8;$i++){
			$imgurl='http://cn.bing.com'.$matches2[$i][1];
			$copyRight=$matches2a[$i][0];
			echo "<div class='section' style='background:url($imgurl);height:100%;width:100%'><p>$copyRight</p><span>$imgurl</span></div>";
		}

	/*
	    http://cn.bing.com/HPImageArchive.aspx?idx=12&n=1
	    idx:非必要。不存在或者等于0时，输出当天的图片，-1为已经预备用于明天显示的信息，
	    1则为昨天的图片，以此类推，idx最多获取到前16天的图片信息
	    n:必要参数。这是输出信息的数量。比如n=1，即为1条，以此类推，至多输出8条。
	*/
?>