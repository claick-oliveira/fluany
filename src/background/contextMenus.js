import { getInLocal, saveInLocal } from '../popup/store/LocalStore';
import 'babel-polyfill';

const handleShowFluany = (info, tab) => {
	console.log('info: ', info);
	let props = {
    url: chrome.extension.getURL('popup/index.html'),
    height: 450,
    width: 715,
    type: "popup",
		focused: true
	};

	chrome.windows.create(props);
};

const contextShowFluany = () => {
	let id = chrome.contextMenus.create(
		{ "title": 'Abrir fluany',
		  "contexts": ["page"],
		  "onclick": handleShowFluany });

	chrome.windows.onRemoved.addListener(() => {
		saveInLocal('openInPackage', null);
	});
};


const handleContextsToGetText = (info, tab) => {
	console.log('info: ', info);
  const idPack = info.menuItemId.trim();
  saveInLocal('openNewCard', info.selectionText);
	saveInLocal('openInPackage', info.menuItemId.trim());
  handleClickPackEdit(info, tab);
};

const contextsToGetText = async () => {
	const parent = chrome.contextMenus.create({"title": 'Adicionar em um pacote', "contexts": ['selection']});
	const packs = await getInLocal('packState');
	packs.forEach((pack) => {
		chrome.contextMenus.create(
			{ "title": pack.title,
				"id": pack.id+' ',
				"parentId": parent,
        "contexts": ['selection'],
				"onclick": handleContextsToGetText });
	});
};

const handleClickPackEdit = (info, tab) => {
	console.log('info: ', info.menuItemId);
	let props = {
    url: chrome.extension.getURL('popup/index.html'),
    height: 450,
    width: 715,
    type: "popup",
		focused: true
	};

	chrome.windows.create(props);
};

const contextEditPacks = async () => {
	const parent = chrome.contextMenus.create({"title": "Editar pacote"});
  try{
    const packs = await getInLocal('packState');
    console.log('packs:::', packs)
    packs.forEach((pack) => {
      chrome.contextMenus.create(
        { "title": pack.title,
          "id": pack.id,
          "parentId": parent,
          "onclick": handleClickPackEdit });
    });
  }catch(e){
  }
};

contextShowFluany();
contextsToGetText();
contextEditPacks();


