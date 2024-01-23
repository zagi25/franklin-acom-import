import { formatLinks } from '../utils.js';
const BASE_URL = 'https://www.adobe.com';

/* global WebImporter */
const createCardBlock = (document, cardContainer) => {
  const cardCells = [['Merch-card(plans, secure)']];
  const cardText = cardContainer.querySelector('.position');
  const cardFooter = cardContainer.querySelector('.flex');
  const cardDiv = document.createElement('div');

  const cardTextContent = cardText.querySelectorAll('.position');
  if (cardTextContent.length > 1 && cardTextContent[0].textContent.includes('Best Value')) {
    const bestValue = cardTextContent[0]?.querySelector('.cmp-text');
    const text = cardTextContent[1];

    cardCells.push(['#EDCC2D, #000000', bestValue.textContent.trim()]);
    cardDiv.appendChild(text.cloneNode(true));
  } else {
    cardDiv.appendChild(cardText);
  }

  const footerBtns = cardFooter.querySelectorAll('.cta');
  const buttons = [];
  footerBtns.forEach((btn) => {
    const button = btn.querySelector('.spectrum-Button');
    let btnContent = null;
    const btnWrapper = document.createElement('a');
    btnWrapper.href = button.href;
    if(button?.classList.contains('doccloud-Button--blue') ||
      button?.classList.contains('spectrum-Button--cta') ||
      button?.classList.contains('spectrum-Button--accent')){
      btnContent = document.createElement('b');
    }
    if(button?.classList.contains('doccloud-Button--white') ||
      button?.classList.contains('spectrum-Button--overBackground') ||
      button?.classList.contains('doccloud-Button--grey') ||
      button?.classList.contains('spectrum-Button--outline')){
      btnContent = document.createElement('i');
    }
    btnContent.textContent = button.textContent;
    btnWrapper.appendChild(btnContent);

    buttons.push(btnWrapper);
  });
  if (buttons.length) {
    cardDiv.append(...buttons);
  }

  cardCells.push([cardDiv]);
  const cardTable = WebImporter.DOMUtils.createTable(cardCells, document);
  cardTable.classList.add('import-table');

  return cardTable;
}

const createCardFooter = (document, footerContainer) => {
  const footerCells = [['Text (center, medium, xl-spacing-bottom)']];
  const footerDiv = document.createElement('div');
  const footerElements = [...footerContainer.querySelector('.dexter-FlexContainer-Items')?.children];
  footerElements.forEach((el) => {
    footerDiv.appendChild(el.cloneNode(true));
  });
  footerCells.push([footerDiv]);

  const footerTable = WebImporter.DOMUtils.createTable(footerCells, document);
  footerTable.classList.add('import-table');
  return footerTable;
};

export default function createMerchBlock(block, document) {
  formatLinks(BASE_URL, block);
  const titleTables = [];
  const cardTables = [];
  const footerTables = [];
  let title = block.querySelector('.title');
  let cardContainer = block.querySelector('.experiencefragment');
  const bgColor = block.querySelector('div[data-bgcolor]')?.getAttribute('data-bgcolor') ?? null

  if (cardContainer) {
    const titleCells = [['Text (center, xl-spacing-top, l-spacing-bottom)'], [title.cloneNode(true)]];
    const titleTable = WebImporter.DOMUtils.createTable(titleCells, document);
    titleTable.classList.add('import-table');
    titleTables.push(titleTable);
    const titleSectionCells = [['Section-metadata'], ['style', 'dark, center']];
    if (bgColor) {
      titleSectionCells.push(['background', bgColor]);
      const titleSectionTable = WebImporter.DOMUtils.createTable(titleSectionCells, document);
      titleSectionTable.classList.add('import-table');
      titleTables.push(titleSectionTable);
    }

    const cardContainerItems = [...cardContainer.querySelector('.dexter-FlexContainer-Items').children];
    cardContainerItems.forEach((card) => {
      if (card.classList.contains('experiencefragment')) {
        cardTables.push(createCardBlock(document, card));
      } else if (card.classList.contains('flex')) {
        footerTables.push(createCardFooter(document, card));
      }
    });

    if (footerTables.length) {
      const footerSectionCells = [['Section-metadata'], ['style', 'dark, center']];
      if (bgColor) {
        footerSectionCells.push(['background', bgColor]);
      }
      const footerSectionTable = WebImporter.DOMUtils.createTable(footerSectionCells, document);
      footerSectionTable.classList.add('import-table');
      footerTables.push(footerSectionTable);
    }
  } else {
    const titleDiv = document.createElement('div');
    titleDiv.appendChild(title.cloneNode(true));
    title.remove();

    cardContainer = block.querySelector('.dexter-FlexContainer-Items .position');
    const cardContainerElements = cardContainer.querySelector('.aem-Grid');

    const cards = [...cardContainerElements.lastElementChild.querySelector('.dexter-FlexContainer-Items').children];

    cards.forEach((card) => {
      cardTables.push(createCardBlock(document, card));
    });

    const titleCells = [['Text (xxl-spacing-top)'], [titleDiv]];
    const titleTable = WebImporter.DOMUtils.createTable(titleCells, document);
    titleTable.classList.add('import-table');
    titleTables.push(titleTable);
  }

  if (cardTables.length) {
    const style = cardTables.length === 3 ? ['style', 'dark, center, three up, s spacing'] : ['style', 'four up, l spacing'];
    const cardSectionCells = [['Section-metadata'], style];
    if (bgColor) {
      cardSectionCells.push(['background', bgColor]);
    }
    const cardSectionTable = WebImporter.DOMUtils.createTable(cardSectionCells, document);
    cardSectionTable.classList.add('import-table');
    cardTables.push(cardSectionTable);
  }

  block.before(document.createElement('hr'));
  block.replaceWith(...titleTables, document.createElement('hr'), ...cardTables, document.createElement('hr'), ...footerTables);
}

  // const containers = [
  //   ...block.querySelectorAll('.dexter-FlexContainer-Items'),
  // ].filter((c) => {
  //   if (c.childElementCount < 2) return false;
  //   let ancestor = c;
  //   let keep;
  //   do {
  //     ancestor = ancestor.parentElement.closest('.dexter-FlexContainer-Items');
  //     keep = !ancestor || ancestor.childElementCount < 2;
  //   } while (ancestor && keep);
  //   return keep;
  // });

  // const textBlock = (column) => {
  //   const cells = [['text(full-width)']];
  //   const paraFragment = document.createDocumentFragment();
  //   [...column.querySelectorAll('.cmp-text p,h2,h3')].forEach((element) => {
  //     paraFragment.append(element);
  //   });
  //   cells.push([paraFragment]);
  //   const table = WebImporter.DOMUtils.createTable(cells, document);
  //   table.classList.add('import-table');
  //   column.replaceWith(table);
  // };

  // const titleBlock = (column) => {
  //   const cells = [['text(full-width)']];
  //   const paraFragment = document.createDocumentFragment();
  //   [...column.querySelectorAll('.cmp-title p,h2')].forEach((element) => {
  //     paraFragment.append(element);
  //   });
  //   cells.push([paraFragment]);
  //   const table = WebImporter.DOMUtils.createTable(cells, document);
  //   table.classList.add('import-table');
  //   column.replaceWith(table);
  // };

  // const flexBlock = (column) => {
  //   const items = [
  //     ...column.querySelector('.dexter-FlexContainer-Items').children,
  //   ];
  //   items.forEach((item) => {
  //     const cardCells = [['Card (Product Card, border)']];
  //     cardCells.push([item.innerHTML]);
  //     const table = WebImporter.DOMUtils.createTable(cardCells, document);
  //     table.classList.add('import-table');
  //     item.replaceWith(table);
  //   });
  // };

  // containers.forEach((container) => {
  //   const columns = [...container.children];
  //   columns.forEach((column) => {
  //     if (column.classList.contains('text') || column.classList.contains('xfreference')) {
  //       textBlock(column);
  //     }

  //     if (column.classList.contains('title')) {
  //       titleBlock(column);
  //     }

  //     if (column.classList.contains('flex')) {
  //       flexBlock(column);
  //     }
  //   });
  // });
  // const sectionCells = [['Section metadata'], ['style', 'dark, xl spacing, 4-up']];
  // const sectionTable = WebImporter.DOMUtils.createTable(sectionCells, document);
  // sectionTable.classList.add('import-table');
  // block.before(document.createElement('hr'));
  // block.replaceWith(...block.querySelectorAll('.import-table'), sectionTable);
// }
