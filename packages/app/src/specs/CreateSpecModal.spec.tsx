import CreateSpecModal from './CreateSpecModal.vue'
import { ImportFromComponentGenerator } from './generators'
import { ref } from 'vue'

const modalCloseSelector = '[aria-label=Close]'
const triggerButtonSelector = '[data-testid=trigger]'
const modalSelector = '[data-testid=create-spec-modal]'
const descriptionSelector = '[data-testid=create-generator-description]'
const titleSelector = '[data-testid=create-generator-title]'
const overlaySelector = '[data-testid=create-spec-modal-overlay]'

describe('<CreateSpecModal />', () => {
  beforeEach(() => {
    const show = ref(true)
    cy.mount(() => <div>
      <CreateSpecModal
        show={ show }
        onClose={() => show.value = false }
        currentGenerator={ ImportFromComponentGenerator }/>
    </div>)
  })

  it('renders a modal', () => {
    cy.get(modalSelector).should('be.visible')
  })

  describe('dismissing', () => {
    it('is not dismissed when you press escape or click outside', () => {
      cy.get(modalSelector)
        .click(0, 0)
        .get(modalSelector)
        .should('be.visible')
        .type('{esc}')
        .get(modalSelector)
        .should('be.visible')
    })

    it('is dismissed when the X button is clicked', () => {
      cy.get(modalSelector)
        .get(modalCloseSelector)
        .click()
        .get(modalSelector)
        .should('not.be.visible')
    })
  })
  
})

it('can be opened and closed via the show prop', () => {
  const show = ref(false)
  cy.mount(() => <>
    <button data-testid="trigger" onClick={ () => show.value = true }>Open Modal</button>
    <br/>
    <CreateSpecModal
      show={ show }
      onClose={() => show.value = false }
      currentGenerator={ ImportFromComponentGenerator }/>
  </>).get(triggerButtonSelector)
    .click()
    .get(modalSelector)
    .should('be.visible')
    .get(modalCloseSelector)
})

it('renders the currently active generator', () => {
  const show = ref(false)
  cy.mount(() => <>
    <button onClick={ () => show.value = true }>Open Modal</button>
    <br/>
    <CreateSpecModal
      show={ show }
      onClose={() => show.value = false }
      currentGenerator={ ImportFromComponentGenerator }/>
  </>)
})