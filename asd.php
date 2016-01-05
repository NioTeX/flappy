<?php

$asd = array('string' => 'Nimrod');
$asd2 = array('string' => '');

echo empty('sdf') ? 'yes' : 'no';
echo empty('') ? 'yes' : 'no';
echo empty(array_values($asd)[0]) ? 'yes' : 'no';
echo empty(array_values($asd2)[0]) ? 'yes' : 'no';
 ?>
