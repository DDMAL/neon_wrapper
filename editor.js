import NeonView from './Neon/src/NeonView.js';
import DisplayPanel from './Neon/src/DisplayPanel/DisplayPanel.js';
import DivaView from './Neon/src/DivaView.js';
import DivaEdit from './Neon/src/SquareEdit/DivaEditMode.js';
import SingleView from './Neon/src/SingleView/SingleView.js';
import SingleEditMode from './Neon/src/SquareEdit/SingleEditMode.js';
import InfoModule from './Neon/src/InfoModule.js';
import TextView from './Neon/src/TextView.js';
import TextEditMode from './Neon/src/TextEditMode.js';

let data;

if (rawData === "true") {
  data = Promise.resolve(meiFile);
} else {
  data = fetch(meiFile).then(response => response.text());
}

let map = new Map();
console.log(SingleEditMode);
data.then(content => {
  map.set(0, content);
  let params = {
    mode: 'single',
    options: {
      image: bgImg,
      meiMap: map,
      name: 'Rodan MEI File'
    },
    View: SingleView,
    Display: DisplayPanel,
    Info: InfoModule,
    NeumeEdit: SingleEditMode,
    TextView: TextView
  }

  var view = new NeonView(params);
  view.start();
})
