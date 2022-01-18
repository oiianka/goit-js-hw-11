import '../css/style.css'
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css'
import {fetchImages} from "./fetch-images"
import { addGallery } from './add-gallery'

const searchForm = document.querySelector('#search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.btn-load-more')
let query = ''
let page = 1
let simpleLightBox
const perPage = 40

searchForm.addEventListener('submit', onSearchForm)
loadMoreBtn.addEventListener('click', onLoadMoreBtn)



function onSearchForm(e) {
  e.preventDefault()
  window.scrollBy({ top: 0 })
  page = 1
  query = e.currentTarget.searchQuery.value.trim()
  gallery.innerHTML = ''
  loadMoreBtn.classList.add('is-hidden')

  if (query === '') {
    Notiflix.Notify.failure('The search string cannot be empty.')
    return
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      
      if (data.totalHits === 0) {
         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      } else {
        addGallery(data.hits)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden')
        }
      }
    })
    .catch(error => console.log(error))
}

function onLoadMoreBtn() {
  page += 1
  simpleLightBox.destroy()

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      addGallery(data.hits)
      simpleLightBox = new SimpleLightbox('.gallery a').refresh()

      const totalPages = Math.ceil(data.totalHits / perPage)

      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden')
       Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      }
    })
    .catch(error => console.log(error))
}
