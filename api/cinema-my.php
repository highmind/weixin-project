<?php
 header("Content-Type: text/html; charset=UTF-8");
 $str = $_GET['callback'];
 $url = 'http://m.maoyan.com/cinemas.json';
 $ip = $_SERVER["REMOTE_ADDR"]; //获取客户端ip,有时不好用，这里成当地的ip


$ch = curl_init(); 
curl_setopt($ch, CURLOPT_URL, $url);  //需要抓取的页面
curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-FORWARDED-FOR:'.'60.7.2.81', 'CLIENT-IP:'.'60.7.2.81')); //构造IP 
curl_setopt($ch, CURLOPT_REFERER, "http://qhd.meituan.com/ "); //构造来路 
curl_setopt($ch, CURLOPT_HEADER, false); 

curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt ($ch, CURLOPT_TIMEOUT, 30);

$file_contents = curl_exec($ch);//抓取的内容放在变量中
curl_close($ch); 

echo($str.'('. $file_contents .')');

?>