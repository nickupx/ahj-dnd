import cards from './cards.json'

export default class Board {
  constructor() { 
    this.cards = cards
  }

  renderColumns() {
    const container = document.getElementById('columns-container')
    for (const column of this.cards) {
      const element = document.createElement('div')
      element.className = 'column'
      element.id = `column-${column.id}`
      element.dataset.title = column.title
      element.innerHTML = `
        <h3 class="column-header">${column.title}</h3>
        <div class="cards-container" id="cards-${column.id}"></div>
        <div class="add-link" id="link-${column.id}">+&nbsp;&nbsp;Add another card</div>
        <div class="add-form" id="form-${column.id}">
          <form name="form-${column.id}">
            <textarea placeholder="Enter text..." class="add-input" id="input-${column.id}"></textarea>
            <button type="submit" class="add-button" id="button-${column.id}">Add card</button>
          </form>
        </div>
      `
      container.append(element)

      const link = element.querySelector('.add-link')
      const input = element.querySelector('.add-input')
      const button = element.querySelector('.add-button')

      link.addEventListener('click', () => {
        const forms = document.getElementsByClassName('add-form')
        const links = document.getElementsByClassName('add-link')
        for (const form of forms) {
          form.style.display = 'none'
        }
        for (const link of links) {
          link.style.display = 'block'
        }
        element.querySelector('.add-link').style.display = 'none'
        element.querySelector('.add-form').style.display = 'block'
        element.querySelector('.add-input').focus()
      })

      input.addEventListener('keyup', (e) => {
        if (input.value && e.keyCode === 13) {
          this.addCard(column.id, input.value)
          input.value = ''
        }
      })
      
      button.addEventListener('click', (e) => {
        e.preventDefault()
        if (input.value) {
          this.addCard(column.id, input.value)
          input.value = ''
        }
      })
    }
  }

  updatePositions(column) {
    let position = 1
    for (const cards of this.cards[column - 1].cards) {
      cards.position = position
      position++
    }
  }

renderCardsInColumn(id) {
    this.updatePositions(id)
    const container = document.getElementById(`cards-${id}`)
    container.innerHTML = ''
    const cards = this.cards.filter(column => column.id === id)[0].cards
    cards.sort((a, b) => a.position - b.position)
    for (const card of cards) {
      const element = document.createElement('div')
      element.className = 'card'
      element.innerHTML = `
        <div class="card-content">${card.content}</div>
        <div class="card-closer" data-closer="${card.id}" data-column="${id}">&times;</div>
      `
      const closer = element.querySelector('.card-closer')
      closer.addEventListener('click', (e) => {
        this.removeCard(+e.target.dataset.closer, id)
        }
      )

      element.addEventListener('mouseover', () => closer.style.visibility = 'visible')
      element.addEventListener('mouseout', () => closer.style.visibility = 'hidden')

      element.addEventListener('mousedown', (e) => {
        e.target.classList.add('dragged')
      })
      element.addEventListener('mousemove', (e) => {
        e.preventDefault()
        e.target.style.left = `${e.pageX - e.target.offsetWidth / 2}px`
        e.target.style.top = `${e.pageY - e.target.offsetHeight / 2}px`
      })
      element.addEventListener('mouseup', (e) => {
        e.preventDefault()
        console.log(e.target)
        e.target.classList.remove('dragged')
      })
      container.append(element)
    }
  }

  renderAllCards() {
    for (const column of this.cards) {
      this.renderCardsInColumn(column.position)
    }
  }

  addCard(column, content) {
    const card = {
      id: this.countAllCards() + 1,
      column,
      content
    }
    this.cards[column - 1].cards.push(card)
    this.renderCardsInColumn(column)
  }

  countCardsInColumn(column) {
    const arr = this.cards[column - 1].cards
    if (arr) {
      return arr.length
      }
    return 0
  }
    
  countAllCards() {
    let count = 0
    for (const column of this.cards) {
      if (column.cards.length) {
        count += column.cards.length
      }
    }
    return count
  }

  removeCard(id, column) {
    // криво, но работает
    const arr = this.cards.filter(item => item.id === column)[0].cards
    const newArr = arr.filter(item => item.id != id)
    this.cards[column - 1].cards = newArr
    this.renderCardsInColumn(column)
    console.log(this.cards)
  }
}