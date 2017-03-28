<?php //get_header();?>
<?php include("header.php") ?>
<div id="posts">

    <?php
      if(have_posts()) : while (have_posts()) : the_post();
    ?>
    <div class="post post_<?php the_ID()?>">
        <a href="<?php the_permalink()?>">
            <?php the_title(); ?>
        </a>
        <?php the_content(); ?>
    </div>
    <?php endwhile;endif;?>

</div>

<?php get_footer() ?>
