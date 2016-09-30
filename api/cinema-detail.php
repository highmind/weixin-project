<?php
 header("Content-Type: text/html; charset=UTF-8");
 $str = $_GET['callback'];
 $url = 'http://m.maoyan.com/showtime/wrap.json';


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
 echo($str.'('. $content .')');
?>