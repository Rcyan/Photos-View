<?php 
    header("Content-Type:text/html;charset=utf-8");
    // $start=isset($_GET['start']) ? $_GET['start']:0;
	$str2=file_get_contents('http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome');
	echo $str2;
?>