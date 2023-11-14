const makeImage = (node, document) => {
  const imageTags = node.querySelectorAll('img');
  let imgLink = null;
  let imgSrc = null;
  imageTags.forEach((image) => {
    if (imgSrc) {
      return;
    }
    const alt = image.getAttribute('alt');
    const src = image.getAttribute('src');
    if (src || alt) {
      if (src && src.indexOf('https') === -1) {
        imgSrc = `https://www.adobe.com/${image.getAttribute('src')}`;
      } else {
        imgSrc = image.getAttribute('src');
      }

      if (imgSrc.includes('.svg')) {
        imgLink = document.createElement('a');
        imgLink.innerHTML = imgSrc;
        imgLink.setAttribute('href', imgSrc);
      } else {
        imgLink = document.createElement('img');
        imgLink.setAttribute('src', imgSrc);
        imgLink.setAttribute('alt', alt);
      }
    }
  });
  return imgLink;
};

// const makeText = (node, document) => {
//   const textDiv = document.createElement('div');
//   const headingText = node.querySelector('.cmp-title');
//   textDiv.appendChild(headingText.cloneNode(true));
//   const mediaContent = node.querySelectorAll('.text .cmp-text');
//   mediaContent.forEach((content) => {
//     textDiv.appendChild(content.cloneNode(true));
//   });

//   const cta = node.querySelector('.cta > .dexter-Cta > a');

//   const href = cta.getAttribute('href');

//   const ctaText = cta?.querySelector(
//     ':scope > .spectrum-Button-label',
//   )?.textContent;
//   if (ctaText) {
//     const ctaAnchor = document.createElement('a');
//     ctaAnchor.setAttribute('href', href);
//     const iCta = document.createElement('i');
//     iCta.textContent = ctaText;
//     ctaAnchor.appendChild(iCta);
//     textDiv.appendChild(ctaAnchor);
//   }
//   return textDiv;
// };

const makeText = (node, document, textDiv) => {
  if (node.classList.contains('cta')) {
    const oldCta = node.querySelector('a');
    const ctaText = oldCta.textContent;
    if (ctaText) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.setAttribute('href', oldCta.href);
      const ctaWrapper = oldCta.classList.contains('doccloud-Button--blue') ? document.createElement('b') : document.createElement('i');
      if (oldCta.classList.contains('spectrum-Button')) {
        ctaWrapper.textContent = ctaText;
        ctaAnchor.appendChild(ctaWrapper);
        textDiv.appendChild(ctaAnchor);

        return;
      }
      ctaAnchor.textContent = ctaText;
      textDiv.appendChild(ctaAnchor);
    }

    return;
  }
  textDiv.appendChild(node.cloneNode(true));
};

export default function mediaBlock(block, document) {
  const cells = [['Media(xl spacing)']];
  const textDiv = document.createElement('div');
  let image = null;
  [...block.querySelectorAll('.cmp-title, .cmp-text, .cta, .image')].forEach((node) => {
    if (node.classList.contains('image')) {
      image = makeImage(node, document);
      return;
    }

    makeText(node, document, textDiv);
    return;
  });

  // const elements = [...block.querySelector('.dexter-FlexContainer-Items').children].map((node) => {
  //   if (node.className === 'image parbase') {
  //     const image = makeImage(node, document);
  //     return image;
  //   }
  //   const textElement = makeText(node, document);
  //   return textElement;
  // });
  // if (elements.length > 0) {
  //   cells.push(elements);
  // }

  cells.push([textDiv, image]);
  const table = window.WebImporter.DOMUtils.createTable(cells, document);
  table.classList.add('import-table');

  const sectionMetaDataCells = [['Section Metadata']];
  const sectionTable = window.WebImporter.DOMUtils.createTable(
    sectionMetaDataCells,
    document,
  );
  sectionTable.classList.add('import-table');
  block.before(document.createElement('hr'));
  block.replaceWith(table);
}
