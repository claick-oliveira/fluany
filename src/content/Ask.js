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
		.then(data => resolve(data))
		.catch(e => reject(`Non-existing ${name} in local`));
});

const makeNice = either =>
			either.isRight ?
      Task.of(either.value) :
      Task.rejected(either.value);

export const ask = (idPackInTraning, alarmName, periodInMinutes) => {
	const getIndexOfThePack = (packs) => {
		return getIndexThingById(packs, idPackInTraning) === -1
			? Either.Left(`Non-existing pack with id:${idPackInTraning}`)
			: Either.Right(getIndexThingById(packs, idPackInTraning));
	};

	const mappedTraning = future => future.map(packs => {
		const elementOfTheAlarm = getElementById(idPackInTraning, packs);
		if(elementOfTheAlarm){
			return Either.Right({ packOnAlarm: elementOfTheAlarm, packsInTraning: packs});
		}
	});

	const loadTraning = mappedTraning(load('packsInTraning'));

	const mappedPack = future => future.map(packs => {
		const eitherIndex = getIndexOfThePack(packs);
		if(eitherIndex.isRight){
			const firstPackInTrain = [{id: idPackInTraning, cards: packs[eitherIndex.value].cards}];
			const traning = loadTraning.chain(makeNice);
			traning.fork(
				() => {
					return Either.Left('>: ');
				},
				(traning) => {
					return Either.Right(traning);
				});
		}
		return eitherIndex;
	});

	const a = mappedPack(load('packState'));
	const concatenad = a.chain(makeNice);
	concatenad.fork(console.error, (packs) => {
		console.log('index: ', packs);
	});
																	 };
