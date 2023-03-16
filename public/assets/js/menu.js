const _menu = {
  listsDiv: document.querySelector('.navigation__list'),
  lists: [
    {title: 'Home', href: '/'},
    {title: 'Gallery', href: '/gallery'},
    {title: 'About Us', href: '/'},
    {title: 'Contacts', href: '/wufoo'},
    {title: 'Register', href: '/register'}
  ],
  init() {
    if(this.listsDiv === null) return
    let html = ''
    
    this.lists.forEach(el => {
      html += `<li class="navigation__item"><a href="${el.href}">${el.title.toUpperCase()}</a></li>`
    })
    this.listsDiv.innerHTML = html
  },
}

export default {..._menu};