<?php
 header("Content-Type: text/html; charset=UTF-8");
 $offset = $_GET['offset'];
 
 $limit = $_GET['limit'];
 $type = $_GET['type'];
 $sleep = $_GET['sleep'];
 $url = 'http://m.maoyan.com/movie/list.json?type='. $type .'&offset=' . $offset . '&limit=' . $limit;

 $content = file_get_contents($url);
 sleep($sleep);
 echo $content;

?>