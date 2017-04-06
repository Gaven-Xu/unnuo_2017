<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url')?>">
</head>

<body>
    <div id="Nav">
        <div class="menu-btn">
            <div class="line line1"></div>
            <div class="line line2"></div>
            <div class="line line3"></div>
            <div class="line line4"></div>
            <div class="line line5"></div>
        </div>
        <div class="menu-content">
            <?php wp_nav_menu(array(
                'theme_location' => 'side-menu',
                'container' => ''
            ));?>
        </div>
    </div>
