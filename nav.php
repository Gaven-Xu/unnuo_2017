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
