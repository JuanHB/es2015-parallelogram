import $ from 'jquery';
import structure from './structure';
import interactions from './interactions';
import './styles/main.scss'

$('document').ready(() => {
    structure();
    interactions();
});
