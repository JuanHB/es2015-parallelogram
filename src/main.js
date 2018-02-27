import structure from './structure';
import actions from './actions';
import interactions from './interactions';

import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

$('document').ready(() => {
    structure();
    actions();
    interactions();
});
