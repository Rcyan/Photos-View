<?php 
    header("Content-Type:text/html;charset=utf-8");
    $start=isset($_GET['start']) ? $_GET['start']:0;
	$str1=file_get_contents('http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start='.$start.'&count=9&from=360chrome');
	echo $str1;
?>