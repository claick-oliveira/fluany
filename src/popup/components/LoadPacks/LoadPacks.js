import React from 'react';
import 'babel-polyfill';
import { loadPackLocal, createCard } from '../../actions/pack';
import { getIndexThingById } from '../../reducers/stateManipulate';
import { isEditPackage } from '../../actions/flags';
import { getInLocal } from '../../store/LocalStore';

const LoadPacks = ({
    dispatch
}) => {
    (async function contextMenusWindow(){
        const packState = await getInLocal('packState');
        dispatch(loadPackLocal(packState));
        const id = await getInLocal('openInPackage');
        if(id){
            dispatch(isEditPackage({newPackage: false, packageid: id}));
            const indexOfThePack = getIndexThingById(packState, id);
            const cardsOfThePack = packState[indexOfThePack].cards;
            const idNewCard = cardsOfThePack.length;
            const selected = await getInLocal('openNewCard');
            if(selected){
                const newCard = {id: idNewCard, isEditing: false, front: selected, back: ''}
                dispatch(createCard(id, packState.length, newCard));
                //Effect to open card created
                setTimeout(()=>{
                    document.querySelector('ul.card-content li:nth-child(2) .card-item-block').click();
                }, 100);
            }
        }
    })();

    return null;
};

const {
    func
} = React.PropTypes;

LoadPacks.propTypes = {
    dispatch: func.isRequired
}

export default LoadPacks;
