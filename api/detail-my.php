<?php
 header("Content-Type: text/html; charset=UTF-8");

 $id = $_GET['id'];
 $sleep = $_GET['sleep'];
 $url = 'http://m.maoyan.com/movie/'.$id.'.json';
 $content = file_get_contents($url);
 sleep($sleep);//延迟3s输出数据
 echo  $content;

?>