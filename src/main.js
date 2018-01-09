import structure from './structure';
import actions from './actions';
import interactions from './interactions';

import './styles/main.scss'

$('document').ready(() => {
    structure();
    actions();
    interactions();
});
