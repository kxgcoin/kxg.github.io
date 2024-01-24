/* global news_ajax_object */
/* global jQuery */
jQuery(document).ready(function ($) {
	$(document).on('click', '.chia-load-more', function () {
		const post_per_page = $(this).data('per-page');
		const nonce = $(this).data('nonce');
		const paged = $(this).attr('data-paged');
		const post_type = $(this).attr('data-post');

		jQuery.ajax({
			type: 'post',
			url: news_ajax_object.ajax_url,
			data: {
				action: 'chia_post_load_more',
				post_per_page,
				nonce,
				paged,
				post_type,
			},
			success(data) {
				if (data.status) {
					if (data.post_type === 'post') {
						$('.blog-lists').append(data.html); // phpcs:ignore WordPressVIPMinimum.JS.HTMLExecutingFunctions.append
						if (data.loadmore) {
							$('.chia-load-more').attr('data-paged', data.paged);
						} else {
							$('.chia-pagination-section').hide();
						}
					} else {
						$('.news-posts').append(data.html); // phpcs:ignore WordPressVIPMinimum.JS.HTMLExecutingFunctions.append
						if (data.loadmore) {
							$('.chia-load-more').attr('data-paged', data.paged);
						} else {
							$('.chia-pagination-section').hide();
						}
					}
				}
			},
		});
	});
});
