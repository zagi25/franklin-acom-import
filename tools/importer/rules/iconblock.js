/* global WebImporter */

export const createIconBlockFragment = (block, document, type) => {
  const iconBlock = document.createElement('a');

  if (type === 'red') {
    iconBlock.href = 'https://main--dc--adobecom.hlx.page/dc-shared/fragments/shared-fragments/acrobat-icon-blocks/red-acrobat-pro-iconblock-agi';
    iconBlock.textContent = 'https://main--dc--adobecom.hlx.page/dc-shared/fragments/shared-fragments/acrobat-icon-blocks/red-acrobat-pro-iconblock-agi';
  } else if (type === 'purple') {
    iconBlock.href = 'https://main--dc--adobecom.hlx.page/dc-shared/fragments/shared-fragments/acrobat-icon-blocks/purple-acrobat-iconblock-know-more';
    iconBlock.textContent = 'https://main--dc--adobecom.hlx.page/dc-shared/fragments/shared-fragments/acrobat-icon-blocks/purple-acrobat-iconblock-know-more';
  } else {
    iconBlock.href = 'https://main--dc--adobecom.hlx.page/dc-shared/fragments/resources/want-to-know-more';
    iconBlock.textContent = 'https://main--dc--adobecom.hlx.page/dc-shared/fragments/resources/want-to-know-more';
  }

  block.before(document.createElement('hr'));
  block.replaceWith(iconBlock);
};

const creativityForAllIconBlock = (block, document) => {
  // background color or background image
  const bgImage = block
    .querySelector('div[style]')
    ?.getAttribute('style')
    .split('"')[1];
  const bgcolor = block
    .querySelector('div[data-bgcolor]')
    ?.getAttribute('data-bgcolor');
  let bgImageElement = null;
  if (bgImage) {
    bgImageElement = document.createElement('img');
    bgImageElement.src = bgImage;
  }

  //icon block button
  const spectrumButton = block.querySelector('.spectrum-Button');
  if(spectrumButton?.classList.contains('doccloud-Button--blue')){
    const btnWrapper = document.createElement('b');
    btnWrapper.appendChild(spectrumButton.cloneNode(true));
    spectrumButton.replaceWith(btnWrapper);
  }

  if(spectrumButton?.classList.contains('doccloud-Button--white')){
    const btnWrapper = document.createElement('i');
    btnWrapper.appendChild(spectrumButton.cloneNode(true));
    spectrumButton.replaceWith(btnWrapper);
  }
  const cells = [['icon-block (fullwidth, medium, xl-spacing)'], [block.cloneNode(true)]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  table.classList.add('import-table');
  block.after(document.createElement('hr'));
  const sectionMetadataCells = [
    ['Section Metadata'],
    ['style', 'xxxl spacing, center'],
  ];
  if (bgImageElement || bgcolor) {
    sectionMetadataCells.push(['background', bgImageElement || bgcolor]);
  }
  // section metadata Table
  const sectionMetaDataTable = WebImporter.DOMUtils.createTable(
    sectionMetadataCells,
    document,
  );
  sectionMetaDataTable.classList.add('import-table');
  block.replaceWith(table);
};

const expressIconBlock = (block, document) => {
  // all different blocks
  const bgImage = block.querySelector('div[style]').getAttribute('style').split('"')[1];
  const metaData = block.querySelectorAll('.position');

  // icon block selectors
  const textImageMetaData = metaData[0];

  // find image
  const imageElement = textImageMetaData.querySelector('.image img');
  // const imageElement = textImageMetaData.querySelector('img');
  let imageSrc = imageElement?.getAttribute('src');
  if (imageSrc && imageSrc.indexOf('https') === -1) {
    imageSrc = `https://www.adobe.com${imageSrc}`;
  }
  const imageLink = document.createElement('a');
  imageLink.innerHTML = imageSrc;
  imageLink.setAttribute('href', imageSrc);

  // find title content
  let titleElement = textImageMetaData.querySelector('.cmp-title');
  // if (!titleElement) {
  //   titleElement = textImageMetaData.querySelector('.title h2');
  // }
  const titleContent = titleElement.textContent;

  // find description content
  const allText = textImageMetaData.querySelectorAll('.cmp-text');
  const descriptionContent = allText.length > 1 ? allText[allText.length - 1] : allText[0];
  const iconBlockCta = textImageMetaData.querySelector('.cta');

  // icon block cell creation
  const title = document.createElement('h2');
  title.innerHTML = titleContent;
  const description = document.createElement('p');
  description.textContent = descriptionContent.textContent;
  const contentCell = document.createElement('div');

  const ctaWrapper = iconBlockCta.querySelector('.doccloud-Button--blue') ? document.createElement('b') : document.createElement('i');
  ctaWrapper.appendChild(iconBlockCta.querySelector('a'));
  contentCell.appendChild(imageLink);
  contentCell.appendChild(title);
  contentCell.appendChild(description);
  contentCell.appendChild(ctaWrapper);

  const cells = [['icon-block (fullwidth, medium, xl-spacing)'], [contentCell]];

  // icon block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  table.classList.add('import-table');

  // coloumns selectors
  const columnsMetaData = metaData[1];

  // find flex elements
  const columns = [];
  const flexItems = columnsMetaData.querySelectorAll('.flex');
  flexItems.forEach((flex) => {
    if (flex.className.indexOf('aem-GridColumn') === -1) {
      const imageElementColumn = columnsMetaData.querySelector('.image img');
      let imageSrcColumn = imageElementColumn?.getAttribute('src');
      if (imageSrcColumn && imageSrcColumn.indexOf('https') === -1) {
        imageSrcColumn = `https://www.adobe.com${imageSrcColumn}`;
      }
      const imageLinkColumn = document.createElement('a');
      imageLinkColumn.innerHTML = imageSrcColumn;
      imageLinkColumn.setAttribute('href', imageSrcColumn);
      const titleContentColumn = flex.querySelector('.text p').textContent;
      const linkElement = flex.querySelector('.dexter-Cta a');

      // column creation
      const column = document.createElement('div');
      column.appendChild(imageLinkColumn);
      const titleParent = document.createElement('p');
      linkElement.innerHTML = titleContentColumn;
      titleParent.appendChild(linkElement);
      column.appendChild(titleParent);
      columns.push(column);
    }
  });

  // columns cell creation
  // const columnCells = [['Columns(contained, middle)'], columns];

  // // columns Table
  // const columnTable = WebImporter.DOMUtils.createTable(columnCells, document);
  // columnTable.classList.add('import-table');

  // section metadata cell creation
  // const sectionMetadataCells = [
  //   ['Section Metadata'],
  //   ['style', 'xxxl spacing, center'],
  // ];

  // if (bgImage) {
  //   sectionMetadataCells.push(['background', bgImage]);
  // }

  // // section metadata Table
  // const sectionMetaDataTable = WebImporter.DOMUtils.createTable(
  //   sectionMetadataCells,
  //   document,
  // );
  // sectionMetaDataTable.classList.add('import-table');
  block.before(document.createElement('hr'));
  block.replaceWith(table);
};

export default function createIconBlock(block, document) {
  if (block.querySelectorAll('.position').length > 1) {
    expressIconBlock(block, document);
  } else {
    creativityForAllIconBlock(block, document);
  }
}
