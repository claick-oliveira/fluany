import { getInLocal, saveInLocal } from '../popup/store/LocalStore';
import { getIndexThingById } from '../popup/reducers/stateManipulate';
import { getRandomInt } from '../shared/helpers';
import { dec, insert, update, assoc, propEq, reject, find, head } from 'ramda';
import { drawElementAsk } from './ElementAsk.js';
import Task from 'data.task';
import Either from 'data.either';

export const getElementById = (id, state) => find(propEq('id', id), state);
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

	const packInTrainWithCards = future => future
        .chain(eitherPacks => load('packsInTraning')
        .chain(eitherTrain => Task.of(
          eitherPacks.chain(packState => {
            const eitherIndexOfThePack = getIndexOfThePack(packState, idPackInTraning);
            return eitherIndexOfThePack.chain(index => {
              const firstPackInTrain = [{id: idPackInTraning, cards: packState[index].cards}];
              return Either.Right(firstPackInTrain);
            });
            return Either.Right([]);
          }))
        ));

	const a = packInTrainWithCards(load('packState'));
	a.fork(console.error, (packs) => {
		console.log('index: ', packs);
	});
};
