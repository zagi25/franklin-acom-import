/* global WebImporter */
export default function createTextBlock(block, document, type) {
  const bgImage = block
    .querySelector('div[style]')
    ?.getAttribute('style')
    .split('"')[1];
  let bgImageElement = null;
  if (bgImage) {
    bgImageElement = document.createElement('img');
    bgImageElement.src = bgImage;
  }
  const bgcolor = block
    .querySelector('div[data-bgcolor]')
    ?.getAttribute('data-bgcolor');

  const background = bgImageElement || bgcolor || '';

  let cells = [['text (center, xxl spacing top)']];

  if (type === 'legal') {
    cells = [['text (legal)']];
    cells.push([block.cloneNode(true)]);
  } else if (type === 'intro') {
    cells = [['text (intro)']];
    const textDiv = document.createElement('div');
    let allText = [...block.querySelector('.dexter-FlexContainer-Items').children]?.filter((el) => !el.classList.contains('dx-parlite--default--hide') && !el.classList.contains('cta'));
    const cta = block.querySelector('.cta');
    const append = [...allText];

    if (cta && !cta.querySelector('.view-sdk-target')) {
      const oldCta = cta.querySelector('a');
      const newCta = document.createElement('a');
      let ctaWrapper = document.createElement('b');
      newCta.href = oldCta.href;
      newCta.textContent = oldCta.textContent;
      ctaWrapper.appendChild(newCta);
      oldCta.replaceWith(ctaWrapper);
    } else if (cta && cta.querySelector('.view-sdk-target')) {
      const sdkLink = document.createElement('a');
      sdkLink.href = 'https://main--dc--adobecom.hlx.page/dc-shared/assets/pdf/acrobat/business/reports/sdk/acrobat-microsoft-365-sb-ue.pdf';
      sdkLink.textContent = 'https://main--dc--adobecom.hlx.page/dc-shared/assets/pdf/acrobat/business/reports/sdk/acrobat-microsoft-365-sb-ue.pdf';
      append.push(sdkLink);
    }
    textDiv.append(...append);

    if (background) {
      cells.push([background]);
    }

    cells.push([textDiv]);
  } else {
    if (block.querySelector('h1')) {
      cells[0][0] = 'text (full-width)';
    }
    const text = [...block.querySelector('.dexter-FlexContainer-Items').children]?.find((el) => !el.classList.contains('dx-parlite--default--hide'));
    cells.push([text.cloneNode(true)]);
    //cells.push([block.cloneNode(true)]);
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);
  table.classList.add('import-table');

  // section metadata
  const sectionMetadataCells = [['Section Metadata']];

  // block.before(document.createElement('hr'));

  if (background && type !== 'intro') {
    sectionMetadataCells.push(['background', background]);
    const sectionMetaDataTable = WebImporter.DOMUtils.createTable(
      sectionMetadataCells,
      document,
    );
    sectionMetaDataTable.classList.add('import-table');
    block.after(sectionMetaDataTable);
  }
  block.replaceWith(table);
}
