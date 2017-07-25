<?php define( 'WP_USE_THEMES', false ); get_header(); ?>

<div id="container" class="tag">
    <p>Tag: <?php single_tag_title(); ?></p>
    <ul>

    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <li>
        <a href="<?php the_permalink() ?>"><?php the_excerpt_rss(); ?></a>
    </li>

    <?php endwhile; else : ?>
        <li><?php _e( 'Sorry, There is no tag.' ); ?></li>
    <?php endif; ?>
    </ul>
</div>

<?php get_footer() ?>
