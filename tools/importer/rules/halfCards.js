export default function createHalfCardsBlock(block, document) {
  const textCells = [['text (center, xxl spacing top)']];
  const bgcolor = block
    .querySelector('div[data-bgcolor]')
    ?.getAttribute('data-bgcolor');

  const wrappers = block.classList.contains('position') ? [...block.querySelector('.aem-Grid').children] : null;
  let cardWrapper = block;
  let textTable = null;

  if (wrappers) {
    const textWrapper = wrappers[0];
    cardWrapper = wrappers.pop();

    const text = textWrapper.querySelector('.text');
    if (bgcolor) {
      textCells.push([bgcolor]);
    }
    textCells.push([text]);
    textTable = WebImporter.DOMUtils.createTable(textCells, document);
    textTable.classList.add('import-table');
  }

  //const allCards = [...cardWrapper.querySelector('.dexter-FlexContainer-Items')?.querySelector('.dexter-FlexContainer-Items').children];
  const allCards = [...cardWrapper.querySelector('.dexter-FlexContainer-Items')?.children];

  const cardTables = [];
  allCards.forEach((card) => {
    const cardCells = [['card (half card, border)']];
    const cardDiv = document.createElement('div');
    cardDiv.appendChild(card.querySelector('img'));
    
    const textWrapper = card.querySelector('.flex') ?? card.querySelector('.position');
    const newLink = document.createElement('a');
    const sub = textWrapper.querySelector('sub');
    const oldLink = sub?.querySelector('a') ?? textWrapper.querySelector('a');
    newLink.href = oldLink.href;
    newLink.textContent = oldLink.textContent;
    sub?.replaceWith(newLink);

    cardDiv.appendChild(textWrapper);
    cardCells.push([cardDiv]);
    const cardTable = WebImporter.DOMUtils.createTable(cardCells, document);
    cardTable.classList.add('import-table');
    cardTables.push(cardTable);
  });

  const sectionMetadataCells = [['Section Metadata'], ['style', 'three up, xl spacing']];
  if (bgcolor) {
    sectionMetadataCells.push(['background', bgcolor]);
  }
  const sectionMetaDataTable = WebImporter.DOMUtils.createTable(
    sectionMetadataCells,
    document,
  );
  sectionMetaDataTable.classList.add('import-table');

  block.before(document.createElement('hr'));
  block.after(sectionMetaDataTable);
  const replace = [];
  if (textTable) {
    replace.push(textTable, document.createElement('hr'));
  }

  replace.push(...cardTables);

  block.replaceWith(...replace);
}
