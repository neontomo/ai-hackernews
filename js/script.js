const hitsPerPage = 30
const page = 1

function generatePostStory(
  title,
  author,
  created_at,
  points,
  url,
  num_comments,
  objectID,
  created_at
) {
  const fullURL = url ? url : `https://news.ycombinator.com/item?id=${objectID}`

  const domain = !fullURL.match(/news.ycombinator.com/)
    ? new URL(fullURL).hostname.replace('www.', '')
    : null

  const li = document.createElement('li')
  li.classList.add('story')

  const liItems = document.createElement('div')
  liItems.classList.add('story-items')

  const upArrow = document.createElement('span')
  upArrow.classList.add('up-arrow')
  upArrow.innerText = '▲'

  const a = document.createElement('a')
  a.classList.add('url')
  a.href = fullURL
  a.innerText = title

  const domainSpan = document.createElement('span')
  domainSpan.classList.add('domain')
  domainSpan.innerHTML = domain
    ? `(<a href="https://news.ycombinator.com/from?site=${domain}">${domain}</a>)`
    : null

  const storyInfo = document.createElement('span')
  storyInfo.classList.add('story-info')

  const pointsSpan = document.createElement('span')
  pointsSpan.classList.add('points')
  pointsSpan.innerText = `${points} points by `

  const authorA = document.createElement('a')
  authorA.classList.add('author')
  authorA.href = `https://news.ycombinator.com/user?id=${author}`
  authorA.innerText = author

  const fakesSpan = document.createElement('span')
  fakesSpan.classList.add('fakes')
  fakesSpan.innerHTML = '&nbsp;| flag | hide |&nbsp;'

  const commentsA = document.createElement('a')
  commentsA.classList.add('comments')
  commentsA.href = `https://news.ycombinator.com/item?id=${objectID}`
  commentsA.innerText = num_comments ? `${num_comments} comments` : 'discuss'

  storyInfo.appendChild(pointsSpan)
  storyInfo.appendChild(authorA)
  storyInfo.appendChild(fakesSpan)
  storyInfo.appendChild(commentsA)

  liItems.appendChild(upArrow)
  liItems.appendChild(a)
  liItems.appendChild(domainSpan)

  li.appendChild(liItems)
  li.appendChild(storyInfo)

  document.getElementById('news').appendChild(li)
}

const query = 'AI'
const baseURL = 'https://hn.algolia.com/api/v1/search_by_date'
const parameters = `tags=story&query=${query}&page=${page}&hitsPerPage=${hitsPerPage}`

fetch(`${baseURL}?${parameters}`)
  .then((response) => response.json())
  .then((data) => {
    const hits = data.hits

    hits.forEach((hit) => {
      generatePostStory(
        hit.title,
        hit.author,
        hit.created_at,
        hit.points,
        hit.url,
        hit.num_comments,
        hit.objectID,
        hit.created_at
      )
    })
  })
