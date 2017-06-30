import { getInLocal, saveInLocal } from '../popup/store/LocalStore';
import { getIndexThingById, getElementById } from '../popup/reducers/stateManipulate';
import { getRandomInt } from '../shared/helpers';
import { dec, insert, update, assoc, propEq, reject } from 'ramda';
import { drawElementAsk } from './ElementAsk.js';
import Task from 'data.task';
import Either from 'data.either';

// saveInLocal('packsInTraning', [{ id: "0b1d", cards: [{ front: 'teste', back: 'teste' }] }, { id: "0b1d7938-5eff-44c8-9177-aec32230add9", cards: [{ front: 'oi', back: 'hello' }] }]);

export const getRandomCard = (cards) => {
	const indexCardBeingUsed = getRandomInt(0, dec(cards.length));
	return cards[indexCardBeingUsed];
};

const load = (name) => new Task((reject, resolve) => {
	getInLocal(name)
		.then(data => resolve(Either.Right(data)))
		.catch(e => resolve(Either.Left(`Non-existing ${name} in local`)));
});

const getIndexOfThePack = (packs, idPackInTraning) => {
	return getIndexThingById(packs, idPackInTraning) === -1
		? Either.Left(`Non-existing pack with id: ${idPackInTraning}`)
		: Either.Right(getIndexThingById(packs, idPackInTraning));
};
export const ask = (idPackInTraning, alarmName, periodInMinutes) => {

  const payloadFirstPackInTrain = (packState, index) => [{id: idPackInTraning, cards: packState[index].cards}];
	const packInTrainWithCards = future => future
        .chain(eitherPacks => load('packsInTraning')
        .chain(eitherTrain => Task.of(
          eitherPacks.chain(packState => {
            const eitherIndexOfThePack = getIndexOfThePack(packState, idPackInTraning);
            return eitherIndexOfThePack
              .chain(index => eitherTrain
              .chain((packsInTraning) => {
                const elementOfTheAlarm = getElementById(idPackInTraning, packsInTraning);
                const firstPackInTrain = payloadFirstPackInTrain(packState, index);
                if(elementOfTheAlarm){
                  return Either.Right({ packOnAlarm: elementOfTheAlarm, packsInTraning });
                }
                //not found element, so insert
                const packsInTraningWithNewPack = insert(0, firstPackInTrain, packsInTraning);
                return Either.Right({ packOnAlarm: firstPackInTrain, packsInTraning });
              })
              .orElse(Either.Right({packOnAlarm: payloadFirstPackInTrain(packState, index), packsInTraning: payloadFirstPackInTrain(packState, index)})));
          }))
        ));

	const a = packInTrainWithCards(load('packState'));
	a.fork(console.error, (packs) => {
    console.log('packs:', packs);
    packs.chain(data => {
      console.log(data);
      if(data.packOnAlarm.cards.length > 0){
        const card = getRandomCard(data.packOnAlarm.cards);
        const doSuccess = () => {
          const newCards = reject(propEq('id', card.id), data.packOnAlarm.cards);
          const index = getIndexThingById(data.packsInTraning, idPackInTraning);
          const packsWithoutCardThatHit = update(index, assoc('cards', newCards, data.packsInTraning[index]), data.packsInTraning);
          saveInLocal('packsInTraning', packsWithoutCardThatHit);
        };
        drawElementAsk(card.front, card.back, doSuccess, alarmName, periodInMinutes);
      }
    });
	});
};
