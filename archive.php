<?php define( 'WP_USE_THEMES', false ); get_header(); ?>

<div id="container" class="archive">
    <p>Category: <?php single_cat_title(); ?></p>
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

     <div><?php the_title(); ?>-<?php the_author() ?></div>

    <?php endwhile; else : ?>
        <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
    <?php endif; ?>
</div>

<?php get_footer() ?>
