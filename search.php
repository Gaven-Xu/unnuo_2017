<?php
/*
Template Name: Search Page
*/
get_header(); ?>

<?php
global $query_string;

$query_args = explode("&", $query_string);
$search_query = array();

if( strlen($query_string) > 0 ) {
	foreach($query_args as $key => $string) {
		$query_split = explode("=", $string);
		$search_query[$query_split[0]] = urldecode($query_split[1]);
	} // foreach
} //if

$search = new WP_Query($search_query);
?>

<div id="container" class="search">
    <?php get_search_form(); ?>
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



<?php get_footer();
