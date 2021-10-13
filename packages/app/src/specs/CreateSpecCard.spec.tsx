import CreateSpecCard from './CreateSpecCard.vue'
import DocumentCode from '~icons/cy/document-code_x48'

const iconSelector = '[data-testid=create-spec-card-icon]'
const specCardSelector = '[data-testid=create-spec-card]'
const header = 'My header text here'
const shortDescription = `We'll walk you through generating your first spec from a component.`

describe('<CreateSpecCard />', { viewportWidth: 400, viewportHeight: 400 }, () => {
  it('renders with long text', () => {
    const longHeader = 'Create from very long header content alsowhenwordshaveno-linebreaks'
    const longDescription = `This is some description text to explain how we import stuff using this button. Specifically, we're going to create specs from your user input. Also, this is a vary long description to test how our CreateSpecCard resizes.`

    cy.mount(() => (
      <div class="m-12">
        <CreateSpecCard icon={DocumentCode} header={longHeader} description={longDescription} />
      </div>
    )).get(specCardSelector)
    .should('contain.text', longHeader)
    .and('contain.text', longDescription)
  })

  it('renders with normal length text', () => {
    cy.mount(() => (
      <div class="m-12">
        <CreateSpecCard icon={DocumentCode} header={header} description={shortDescription} />
      </div>
    )).get(specCardSelector)
    .should('contain.text', header)
    .and('contain.text', shortDescription)
  })

  it('renders the icon passed in', () => {
    cy.mount(() => (
      <div class="m-12">
        <CreateSpecCard icon={DocumentCode} header={header} description={shortDescription} />
      </div>
    )).get(iconSelector)
    .should('be.visible')
  })

  it('emits click events bound to it', () => {
    const onClickSpy = cy.spy().as('onClickSpy')
    cy.mount(() => (<div class="m-12">
      <CreateSpecCard icon={ DocumentCode } header={ header } description={ shortDescription } onClick={ onClickSpy }/>
    </div>))
      .get(specCardSelector)
      .focus()
      .click()
      .type('{enter}')
      .type(' ')
      // .get('@onClickSpy').should('have.been.calledThrice')
  })
})
