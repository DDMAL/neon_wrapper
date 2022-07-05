import NeonView from './Neon/src/NeonView';
import DisplayPanel from './Neon/src/DisplayPanel/DisplayPanel';
import DivaView from './Neon/src/DivaView';
import DivaEdit from './Neon/src/SquareEdit/DivaEditMode';
import SingleView from './Neon/src/SingleView/SingleView';
import SingleEditMode from './Neon/src/SquareEdit/SingleEditMode';
import InfoModule from './Neon/src/InfoModule';
import TextView from './Neon/src/TextView';
import TextEditMode from './Neon/src/TextEditMode';
import { NeonManifest } from './Neon/src/Types';
import { convertStaffToSb } from './Neon/src/utils/ConvertMei';

declare let manifestText: string;

let view: NeonView;

async function init (): Promise<void> {
  if (manifestText !== '') {
    let manifest: NeonManifest = JSON.parse(decodeURIComponent(manifestText));
    let params = {
      manifest: manifest,
      Display: DisplayPanel,
      Info: InfoModule,
      TextView: TextView,
      TextEdit: TextEditMode,
      View: undefined,
      NeumeEdit: undefined
    };

    let pageCount = manifest['mei_annotations'].length;
    if (pageCount === 0) {
      throw new Error('At least one page is required in \'mei_annotations\'! 0 provided.');
    }

    params.View = pageCount > 1 ? DivaView : SingleView;
    params.NeumeEdit = pageCount > 1 ? DivaEdit : SingleEditMode;

    // Start Neon
    view = new NeonView(params);
    view.start();
  }
}

async function addValidationButton() {
    while (document.getElementsByClassName('navbar-start').length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const fileDropdown = document.querySelector('#navbar-dropdown-options');

    const validationButton = document.createElement('div');
    validationButton.classList.add('navbar-dropdown-item');

    const validationButtonText = document.createElement('div');
    validationButtonText.innerHTML = 'Submit to Rodan';

    const validationButtonImg = document.createElement('img') as HTMLImageElement;
    validationButtonImg.classList.add('external-link-icon');
    validationButtonImg.src = 'Neon//assets/img/external-link.svg';

    const dropdownDivider = document.createElement('div');
    dropdownDivider.classList.add('dropdown-divider');
    
    
    validationButton.append(validationButtonText);
    validationButton.append(validationButtonImg);

    fileDropdown?.appendChild(dropdownDivider);
    fileDropdown?.appendChild(validationButton);

    validationButton.addEventListener('click', (_evt) => {
      view.getPageMEI(view.view.getCurrentPageURI()).then(mei => {
        return window.fetch('', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'user_input': convertStaffToSb(mei)
          })
        });
      }).then(response => {
        if (response.ok) {
          window.close();
        } else {
          console.error(response);
        }
      }).catch(err => {
        console.error(err);
      });
    });
}

init().then(addValidationButton);
