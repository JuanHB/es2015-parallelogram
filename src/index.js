import actions from './actions';
import structure from './structure';
import interactions from './interactions';

import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

$('document').ready(() => {
    structure();
    actions();
    interactions();
});
