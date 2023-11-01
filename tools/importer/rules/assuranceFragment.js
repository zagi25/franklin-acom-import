export default function createAssuranceFragment(block, document) {
  const assuranceFragment = document.createElement('a');
  assuranceFragment.href = 'https://main--dc--adobecom.hlx.page/dc-shared/fragments/resources/assurance-you-need';
  assuranceFragment.textContent = 'https://main--dc--adobecom.hlx.page/dc-shared/fragments/resources/assurance-you-need';

  // block.before(document.createElement('hr'));
  block.replaceWith(assuranceFragment);
};
