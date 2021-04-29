window.onload = () => {
  //burger
  const burger = document.querySelector('.menuicon')
  const navbar = document.querySelector('.navbar')
  burger.addEventListener('click', () => {
    showMenu(!burger.classList.contains('menuicon-active'))
  })

  function showMenu(flag) {
    if (flag) {
      burger.classList.add('menuicon-active')
      navbar.style.visibility = 'visible'
      navbar.style.opacity = '1.0'
    } else {
      burger.classList.remove('menuicon-active')
      navbar.style.visibility = 'hidden'
      navbar.style.opacity = '0.0'
    }
  }


  // slider
  new Splide('.splide', {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    focus: 0,
    clones: 6,
    autoplay: true,
    interval: 4000,
    gap: '10px',
    breakpoints: {
      1024: { perPage: 2 },
      767: { perPage: 1 },
    }
  }).mount()

  // scroll
  const navDots = document.querySelectorAll('.nav-side > *')

  const heights = []
  document.querySelectorAll('.marker').forEach(el => heights.push(el.getBoundingClientRect().top + pageYOffset))
  heights[heights.length - 1] += 1000

  //[0, 800, 2400, 4192, 5546, 7154.5]
  //[0, 800, 2400, 4192, 5546, 7154.5]


  document.addEventListener('scroll', e => {
    const scroll = window.scrollY
    const gap = document.documentElement.clientHeight / 2
    for (let i = 0; i < heights.length; i++) {
      (i == 2 || i == 4 || i == 5)
        ? navDots.forEach(el => el.classList.add('nav__btn_dark'))
        : navDots.forEach(el => el.classList.remove('nav__btn_dark'))


      navDots.forEach(el => el.classList.remove('nav__btn_active'))

      if (scroll <= heights[i] - gap) {
        navDots[i - 1].classList.add('nav__btn_active')
        break
      }
    }
  })

  navDots.forEach((el, i) => {
    el.addEventListener('click', () => {
      smoothScrollTo(heights[i])
      // smoothScroll(heights[i], 500)
    })
  })

  document.querySelector('#btnDown').addEventListener('click', () => smoothScrollTo(heights[1]))
  document.querySelector('#btnAbout').addEventListener('click', () => {
    smoothScrollTo(heights[0])
    if (burger.classList.contains('menuicon-active')) showMenu(false)
  })
  document.querySelector('#btnProjects').addEventListener('click', () => {
    smoothScrollTo(heights[1])
    if (burger.classList.contains('menuicon-active')) showMenu(false)
  })
  document.querySelector('#btnNews').addEventListener('click', () => {
    smoothScrollTo(heights[2])
    if (burger.classList.contains('menuicon-active')) showMenu(false)
  })
  document.querySelector('#btnContact').addEventListener('click', () => {
    smoothScrollTo(heights[4])
    if (burger.classList.contains('menuicon-active')) showMenu(false)
  })


  // native
  function smoothScrollTo(to) {
    window.scrollTo({
      top: to,
      behavior: 'smooth'
    })
  }

  // @depracated =)
  function smoothScroll(to, delay) {
    const dist = to - window.scrollY
    const tick = 20
    const iterations = delay / tick
    const step = dist / iterations

    const interval = window.setInterval(() => {
      window.scroll(0, window.scrollY + step)

      delay -= tick
      if (delay <= 0) window.clearInterval(interval)
    }, tick)
  }


  // map
  const position = [40.668535, -73.887843]
  const map = L.map('map', {
    center: position,
    zoom: 13,
    scrollWheelZoom: false,
  })
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamJ1cnlhbm92IiwiYSI6ImNrbmo1MWxteDA2bW8yb3BmMHBlbG5nOWgifQ.JQn190wTmluVopcOg7RIog'
  }).addTo(map);

  const marker = L.icon({
    iconUrl: './img/marker.svg',
    iconSize: [106, 106],
  })

  L.marker([40.682238, -73.901661], { icon: marker }).addTo(map)

}