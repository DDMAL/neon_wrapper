import DisplayPanel from './Neon2/src/DisplayPanel/DisplayPanel.js';
import SingleView from './Neon2/src/SingleView/SingleView.js';
import SingleEditMode from './Neon2/src/SingleEdit/SingleEditMode.js';
import InfoModule from './Neon2/src/InfoModule.js';
import NeonView from './Neon2/src/NeonView.js';

fetch(new Request(meiFile)).then(response => {
  if (response.ok) {
    let map = new Map();
    response.text().then(data => {
      map.set(0, data);
      var view = new NeonView({
          mode: 'single',
          options: {
            image: bgImg,
            name: 'Rodan Correction',
            meiMap: map
          },
          View: SingleView,
          Display: DisplayPanel,
          Info: InfoModule,
          Edit: SingleEditMode
      });
      view.start();
    });
  }
});
