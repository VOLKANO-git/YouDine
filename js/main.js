import { getRecipes } from './api.js';
import { showLoading, renderRecipes } from './display.js';

showLoading();
getRecipes().then(renderRecipes).catch(console.error);