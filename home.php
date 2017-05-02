<?php get_header();?>
<?php uno_set_link('/style/home.min.css'); ?>
<?php get_template_part('nav'); ?>
<div id="container">
    <div class="home">
        <div class="cat-mix">
            <div class="mix-index">
                <?php query_posts(array('posts_per_page' => 8)); if ( have_posts() ) : while ( have_posts() ) : the_post(); $curImg = get_content_first_image(get_the_content());?>
                    <div class="">
                        <span><?php the_modified_date('M'); ?></span>
                        <span><?php the_modified_date('d日'); ?></span>
                    </div>
                <?php endwhile;endif; wp_reset_query();?>
            </div>
            <div class="mix-content">
                <?php query_posts(array('posts_per_page' => 8)); if ( have_posts() ) : while ( have_posts() ) : the_post(); $curImg = get_content_first_image(get_the_content());?>
                    <div class="mix-back" style="background-image:url('<?php echo $curImg ?>')">
                        <?php the_title();?>
                        <?php the_excerpt(); ?>
                    </div>
                <?php endwhile;endif; wp_reset_query();?>
            </div>
        </div>
        <div class="cat-essay">

        </div>
        <div class="cat-front_end">

        </div>
        <div class="cat-design">

        </div>
        <div class="cat-shoot">

        </div>
        <div class="cat-draw">

        </div>
    </div>
    <div class="sidebar"></div>
</div>

<a href="http://www.baidu.com/s?wd=LOL">LOL</a>

<?php get_footer() ?>
