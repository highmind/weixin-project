<?php
 header("Content-Type: text/html; charset=UTF-8");
 $url = 'http://m.maoyan.com/showtime/wrap.json';
 // $sleep = $_GET["sleep"];//延迟时间
 
  if(isset($_GET['sleep'])){
    $sleep = $_GET['sleep'];
  }else{
    $sleep = 0; 
  }

 if(isset($_GET['cinemaid'])){
    $cinemaId = $_GET['cinemaid'];
    $url = $url . '&cinemaid=' . $cinemaId;
 }else{
    $cinemaId = 0; 
 }
 
 if(isset($_GET['movieid'])){
     $movieId = $_GET['movieid'];
     $url = $url . '&movieid=' . $movieId;
 }else{
    $movieId = 0;
 }


 $url = 'http://m.maoyan.com/showtime/wrap.json?cinemaid=' . $cinemaId . '&movieid='. $movieId;
 $content = file_get_contents($url);
 sleep($sleep);
 echo $content;
?>