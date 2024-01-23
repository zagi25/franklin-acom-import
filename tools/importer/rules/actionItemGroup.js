import { formatLinks } from '../utils.js';
const BASE_URL = 'https://www.adobe.com';
const ICON_URL = 'https://main--dc--adobecom.hlx.page/dc-shared/assets/images/features/';

const imagesLookUp = {
  '11_OrganizePages.svg' : 'explore-icon-organize-pages.svg',
  '11_PDFSecurity.svg' : 'explore-icon-pdf-security.svg',
  '11_ShareReview.svg' : 'explore-icon-share-review.svg',
  '11_ExportPDF.svg' : 'explore-icon-export-pdf.svg',
  '11_PrintPDF.svg' : 'explore-icon-print-pdf.svg',
  '11_EditPDF.svg' : 'explore-icon-edit-pdf.svg',
};

export default function createActionItemGroupBlocks(block, document) {
  formatLinks(BASE_URL, block);
  const title = block.querySelector('.position');
  const groupContainer = block.querySelector('.flex');
  const itemTables = [];

  const titleCells = [['Text (center, xl-spacing-top, l-spacing-bottom)'], [title]];
  const titleTable = WebImporter.DOMUtils.createTable(titleCells, document);
  titleTable.classList.add('import-table');

  const actionItems = groupContainer.querySelectorAll('.flex');
  actionItems.forEach((item) => {
    const actionCells = [['action-item (small, center)']];
    const imgDiv = document.createElement('div');
    const linkDiv = document.createElement('div');

    const icon = item.querySelector('img');
    const itemLink = item.querySelector('.cta a');

    const newIcon = document.createElement('img');
    const iconPath = icon.src.split('/').pop();
    const newIconPath = imagesLookUp[iconPath] ? imagesLookUp[iconPath] : iconPath;
    newIcon.src = ICON_URL + newIconPath;
    imgDiv.appendChild(newIcon);
    const text = document.createElement('p');
    text.textContent = itemLink.textContent;
    imgDiv.appendChild(text);
    actionCells.push([imgDiv]);

    const newLink = document.createElement('a');
    newLink.href = itemLink.href;
    newLink.textContent = itemLink.href;
    linkDiv.appendChild(newLink);
    actionCells.push([linkDiv]);

    const actionItemTable = WebImporter.DOMUtils.createTable(actionCells, document);
    actionItemTable.classList.add('import-table');

    itemTables.push(actionItemTable);
  });

  const sectionCells = [['Section metadata'], ['style', 'four up, center, xxxlspacing']];
  const sectionTable = WebImporter.DOMUtils.createTable(sectionCells, document);
  sectionTable.classList.add('import-table');

  block.before(document.createElement('hr'));
  block.replaceWith(titleTable, document.createElement('hr'), ...itemTables, sectionTable);
}
