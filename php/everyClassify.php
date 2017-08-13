<?php 
    header("Content-Type:text/html;charset=utf-8");
    $start=isset($_GET['start']) ? $_GET['start']:0;
    $cid=isset($_GET['cid']) ? $_GET['cid']:36;
	$str3=file_get_contents("http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid={$cid}&start={$start}&count=9&from=360chrome");
	echo $str3;
?>