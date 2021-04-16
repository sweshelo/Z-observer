<?php
$json = file_get_contents("php://input");
$content = json_decode($json, true);
$text = $content["url"].chr(10).$content["a_date"].chr(10).$content["b_date"].chr(10).$content["state"].chr(10).$content["info"].chr(10).$content["host"].chr(10).$content["desc"].chr(10);

$headers = array(
    'From' => '<From Email address>',
    'X-Mailer' => 'PHP/' . phpversion()
);

if ($content["state"]!="解決済"){
    mail("<To Mail Address>", 'Zabbix Alert', "Some error occured! - $text", $headers);
}
?>
