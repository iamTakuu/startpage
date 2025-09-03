/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "startpage"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
  startpage: "https://www.startpage.com/sp/search?q="
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"K6bNA3qqJrwqJ5yl","label":"utilities","bookmarks":[{"id":"VcZf8iFSs4zzzd5H","label":"yandex","url":"https://yandex.com/"},{"id":"0ljBAxcjwHQT6VCk","label":"sci-hub","url":"https://www.sci-hub.st/"},{"id":"oIkBpunLjALakQhp","label":"bibliography","url":"https://www.mybib.com/"},{"id":"Xa0tsFIZvCJvsD55","label":"⩜ library","url":"https://theanarchistlibrary.org"}]},{"id":"fstm17oKw9CvqYpR","label":"OFFLINE!","bookmarks":[{"id":"NUHaMCr1z51RR7cM","label":"proton_mail","url":"https://mail.proton.me/u/0/"},{"id":"NeUHA3c3tvcrFhCp","label":"black_lyfe","url":"https://blackqueer.life/"},{"id":"XR0SKwBdaVN2IG7s","label":"gamed_dev","url":"https://mastodon.gamedev.place/"},{"id":"0a7vmQvBix3lSSvC","label":"itch.io","url":"https://imp3tuz.itch.io/"}]},{"id":"ZKcbZzxd6pLspSXy","label":"penny_UP","bookmarks":[{"id":"0SmVrV6DrZMesbUO","label":"github","url":"https://www.github.com/"},{"id":"BJOFMqsm5LEdp2XD","label":"neetcode","url":"https://www.neetcode.io/"},{"id":"7yTOMyAa4xb5CTfk","label":"teachme2","url":"https://tutor.teachme2.com/dashboard"},{"id":"jNRErN6O8XkWfdSq","label":"ko_fi","url":"https://ko-fi.com/"}]},{"id":"J5p3BnTdtTL5bII3","label":"fun","bookmarks":[{"id":"wiZ2nVrl9ZaAAkqJ","label":"youtube","url":"https://www.youtube.com/"},{"id":"sVANhRVQqRDluTns","label":"9anime","url":"https://9animetv.to/home"},{"id":"Jqn4LXMvcZflqwmf","label":"monkeytype","url":"https://monkeytype.com/"},{"id":"vN0RVQWM8z7IHfXO","label":"fitgirl","url":"https://fitgirl-repacks.site/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
