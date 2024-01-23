const BASE_URL = 'https://www.adobe.com';

export default function createIconBlockGroup(block, document){
  const iconBlocks = block.querySelector('.dexter-FlexContainer-Items') ? block.querySelector('.dexter-FlexContainer-Items') : block.querySelector('.doccloud-Position-center .aem-Grid');
  const tables = [];
  let text = null;
  let cta = null;

  const links = block.querySelectorAll('a');
  links.forEach((link) => {
    if(!link.href.includes('https')){
      link.href = BASE_URL + link.href;
    }
  });

  Array.from(iconBlocks.children).forEach((iconBlock) => {
    if(iconBlock.classList.contains('title')){
      text = iconBlock.cloneNode(true);
      return;
    }
    if(iconBlock.classList.contains('cta')){
      cta = iconBlock.cloneNode(true);
      return;
    }
    if(iconBlock.classList.contains('flex') || iconBlock.classList.contains('position')){
      const iconCta = iconBlock.querySelector('.cta');
      if(iconCta) {
        const newCta = document.createElement('a');
        newCta.href = iconCta.querySelector('a')?.href;
        newCta.textContent = iconCta.textContent.replace(/[^\w\s]/gi, "");;
        const wrapper = document.createElement('i');
        wrapper.appendChild(newCta);
        iconCta.replaceWith(wrapper);
      }
      const cells = [['icon-block (vertical, center, medium, xs spacing)']];
      const iconBlockImage = iconBlock.querySelector('img');
      if (iconBlockImage && iconBlockImage.parentElement?.tagName === 'a') {
        let imageSrc = imageElement?.getAttribute('src');
        if (imageSrc && imageSrc.indexOf('https') === -1) {
          imageSrc = `https://www.adobe.com${imageSrc}`;
        }
        const newLink = document.createElement('a');
        newLink.innerHTML = imageSrc;
        newLink.setAttribute('href', imageSrc);
        // newLink.appendChild(iconBlockImage);
        iconBlockImage.replaceWith(newLink);
      }
      cells.push([iconBlock]);
      const table = WebImporter.DOMUtils.createTable(cells, document);
      table.classList.add('import-table');
      tables.push(table);
    }
  });

  let style = `three-up, xxl spacing, grid width 10`;
  const sectionMetadataCells = [['Section Metadata'], ['style', style]];
  const bgColor = block.querySelector('div[data-bgcolor]')?.getAttribute('data-bgcolor');
  if(bgColor){
    sectionMetadataCells.push(['background', bgColor]);
  }


  if(tables.length === 2){
    style = 'two up, grid width 8';
  }


  const sectionMetaDataTable = WebImporter.DOMUtils.createTable(
    sectionMetadataCells,
    document,
  );
  sectionMetaDataTable.classList.add('import-table');

  if(text){
    const cells = [['text (center, m-spacing)']];
    cells.push([text]);
    const table = WebImporter.DOMUtils.createTable(cells, document);
    table.classList.add('import-table');

    block.before(document.createElement('hr'));
    block.before(table);
  }

  if(cta){
    const cells = [['text (center, m-spacing)']];
    cells.push([cta]);
    const table = WebImporter.DOMUtils.createTable(cells, document);
    table.classList.add('import-table');

    if(!text) block.before(document.createElement('hr'));
    block.before(table);
  }

  if(text || cta) block.before(document.createElement('hr'));
  block.before(document.createElement('hr'));
  block.after(sectionMetaDataTable);
  block.replaceWith(...tables);

};
