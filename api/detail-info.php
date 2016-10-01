<?php
 header("Content-Type: text/html; charset=UTF-8");

 $movieId = $_GET['id'];
 $sleep = $_GET['sleep'];
 $url = 'http://m.maoyan.com/movie/' . $movieId . '?_v_=yes';
 
 
 $content = file_get_contents($url);
 $begin = "<script>var AppData = ";
 $end = ";</script>";

 function _cut($begin,$end,$str){
       $b = mb_strpos($str,$begin) + mb_strlen($begin);
       $e = mb_strpos($str,$end) - $b;
        return mb_substr($str,$b,$e);
 }

 sleep($sleep);

  echo  _cut($begin,$end,$content);



?>