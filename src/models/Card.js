export default class Card {
  constructor(id, content, columnId) {
    this.id = id
    this.content = content
    this.columnId = columnId

    this.element = document.createElement('div')
    this.element.id = `card-${this.id}`
    this.element.dataset.id = this.id

    this.element.className = 'card'
    this.element.innerHTML = `
      <div class="card-content">${this.content}</div>
      <div class="card-closer" data-closer="${this.id}">&times;</div>
    `
    const column = document.getElementById(`${this.columnId}`)
    const container = column.querySelector('.cards-container')
    container.append(this.element)
    
    const closer = this.element.querySelector('.card-closer')
    closer.addEventListener('click', (e) => this.remove(e.target.dataset.closer))
    this.element.addEventListener('mouseover', () => closer.style.visibility = 'visible')
    this.element.addEventListener('mouseout', () => closer.style.visibility = 'hidden')
  }

  remove(id) {
    document.getElementById(`card-${id}`).remove()
  }
}