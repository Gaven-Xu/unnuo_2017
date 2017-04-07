<?php get_header();?>

<div id="container" class="home">
    <div class="cate_design">
        <?php query_posts(array('category_name'=>'design','posts_per_page' => 1)); if ( have_posts() ) : while ( have_posts() ) : the_post(); $curImg = get_content_first_image(get_the_content());?>
        <a href="<?php the_permalink()?>"><?php the_title() ?></a>
        <img src="<?php echo $curImg;?>" alt="">
        <?php endwhile;endif; wp_reset_query();?>
    </div>
    <div class="cate_draw">
        <?php query_posts(array('category_name'=>'draw','posts_per_page' => 1)); if ( have_posts() ) : while ( have_posts() ) : the_post(); $curImg = get_content_first_image(get_the_content());?>
        <a href="<?php the_permalink()?>"><?php the_title() ?></a>
        <img src="<?php echo $curImg;?>" alt="">

        <?php endwhile;endif; wp_reset_query();?>
    </div>
</div>

<?php get_footer() ?>
