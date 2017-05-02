<?php
    register_nav_menu( 'head-menu', __( '顶部菜单', 'theme-slug' ) );
    register_nav_menu( 'side-menu', __( '左侧菜单', 'theme-slug' ) );
    register_nav_menu( 'foot-menu', __( '底部菜单', 'theme-slug' ) );

    function uno_set_link($linkUrl){
        echo '<link rel="stylesheet" href="'.get_bloginfo('template_directory').$linkUrl.'">';
    }

    function uno_set_src($linkUrl){
        echo '<script src="'.get_bloginfo('template_directory').$linkUrl.'" charset="utf-8"></script>';
    }

    function get_content_first_image($content){
        if ( $content === false ) $content = get_the_content();

        preg_match_all('|<img.*?src=[\'"](.*?)[\'"].*?>|i', $content, $images);

        if($images[1][0]){
            return $images[1][0];
        }else{
            return "http://www.unnuo.com/author/background.jpg";
        }
    }//获取文章首图片(非插件)

?>
