fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&query=chatgpt')
	.then((response) => response.json())
	.then((data) => {
		let hits = data.hits;
		console.log(hits);
		for (let i = 0; i < hits.length; i++) {
			let story_title = hits[i].title.replace(/(chatgpt)/gi, '<b>$1</b>');
			let story_comments = `https://news.ycombinator.com/item?id=${hits[i].objectID}`;
			let num_comments = hits[i].num_comments ? hits[i].num_comments : 0;
			let story_url = hits[i].url;
			let story_points = hits[i].points;
			let story_author = hits[i].author;
			if (story_url == null) story_url = story_comments;
			let story_domain = story_url
				.replace(/http(s|):\/\//, '')
				.split('/')[0]
				.replace(/^www\./, '');
			if (story_domain.match(/news.ycombinator.com/)) story_domain = '';
			if (story_title == null) continue;
			let news = document.getElementById('news');
			news.innerHTML += `<li class="story">
                <a href="${story_url}">${story_title}</a>
                <span class="story-info">
                    <span class="story-points">${story_points} points by <a href="https://news.ycombinator.com/user?id=${story_author}">${story_author}</a></span>
                    <span>
                        <a href="${story_comments}">${num_comments} comments</a>
                    </span>
                    <span>
                        <a href="https://news.ycombinator.com/from?site=${story_domain}">${story_domain}</a>
                    </span>
                </span>
            </li>`;
		}
	});
