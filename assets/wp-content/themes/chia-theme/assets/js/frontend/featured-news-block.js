/**
 * "Load more" for the `chia/featured-news` block.
 *
 * @param {jQuery} $ - The jQuery object.
 *
 * @see File assets/js/frontend/news-block.js for refactoring
 *
 */
/* global chia_featured_news_load_more */
/* global jQuery */
jQuery(document).ready(function ($) {
	$(document).on('click', '.chia-load-more', function () {
		const post_per_page = $(this).data('per-page');
		const nonce = $(this).data('nonce');
		const paged = $(this).attr('data-paged');
		const post_type = $(this).attr('data-post');

		$.ajax({
			type: 'post',
			url: chia_featured_news_load_more.ajax_url,
			data: {
				action: 'chia_featured_news_load_more',
				post_per_page,
				nonce,
				paged,
				post_type,
			},
			success(data) {
				if (data.status) {
					$('.wp-block-chia-featured-news__article-list').append(data.html); // phpcs:ignore WordPressVIPMinimum.JS.HTMLExecutingFunctions.append
					if (data.loadmore) {
						$('.chia-load-more').attr('data-paged', data.paged);
					} else {
						$('.chia-pagination-section').hide();
					}
				}
			},
		});
	});
});
