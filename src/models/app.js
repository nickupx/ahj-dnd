import Card from './Card'
import Form from './Form'

const card1 = new Card(1,'Апогей, в первом приближении, меняет керн.', 'column-todo')
const card2 = new Card(2,'Апогей, в первом приближении.', 'column-inprogress')

const elements = document.getElementsByClassName('add-link')
for (const element of elements) {
  element.addEventListener('click', (e) => {
    displayForm(e.target.dataset.link)
    }
  )
}

function countCards() {
  const number = document.getElementsByClassName('card')
  return number.length
}

function displayForm(column) {
  hideLink(column)
  const form = document.createElement('div')
  form.dataset.id = `form-${column}`
  form.className= 'form-add'
  form.innerHTML = `
    <form name="form-${column}">
      <textarea class="input-add" id="input-${column}" placeholder="Enter title..."></textarea>
      <button type="submit" class="button-add" id="button-${column}">Add card</button>
    </form>
  `
  document.getElementById(`add-${column}`).append(form)
  const button = document.getElementById(`button-${column}`)
  button.addEventListener('click', (e) => {
    e.preventDefault()
    const input = form.querySelector('.input-add')
    if (input.value) {
      const columnId = 'column-' + column 
      new Card(countCards() + 1, input.value, columnId)
      input.value = ''
    }
    
  })
}

function hideLink(column) {
  const link = document.getElementById(`link-${column}`)
  link.style.display = 'none'
}
