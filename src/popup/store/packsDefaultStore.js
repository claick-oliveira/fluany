import uuid from 'uuid/v4';
console.log(uuid());
console.log(uuid());

export default [
{
    id: uuid(),
    title: 'Falsos cognatos | Português-Inglês',
    description: 'Flashcards diversos com pares de palavras contendo falsos cognatos existentes entre o português e o inglês.',
    colorID: 4,
		isChangingColor: false,
    isSetting: false,
		timeMinutes: 1,
		playing: false,
    cards: [
        {
            id: uuid(),
            colorID: 1,
            front: "How are u?",
            back: "Como vai vc?",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 2,
            front: "Where are you from?",
            back: "De onde voce é?",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 3,
            front: "Thanks a lot",
            back: "Muito obrigado",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 4,
            front: "I am studying english",
            back: "Eu estou estudando ingles",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 1,
            front: "Hello",
            back: "Olá",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 2,
            front: "Hi",
            back: "Olá",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 3,
            front: "Hello",
            back: "Olá",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 4,
            front: "Hello",
            back: "Olá",
            isEditing: false
        }
    ]
},
{
    id: uuid(),
    title: 'English Irregular Verbs',
    description: 'This is a deck of the 157 most common irregular English verbs.',
    colorID: 2,
		isChangingColor: false,
    isSetting: false,
		timeMinutes: 3,
		playing: false,
    cards: [
        {
            id: uuid(),
            colorID: 1,
            front: "Hello",
            back: "Olá",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 2,
            front: "Hi",
            back: "Olá",
            isEditing: false
        }
    ]
},

{
    id: uuid(),
    title: 'English Vocabulary Profile British',
    description: 'This is a deck of the 100 most common english vocabulary profile British.',
    colorID: 1,
		isChangingColor: false,
    isSetting: false,
		timeMinutes: 3,
		playing: false,
    cards: [
        {
            id: uuid(),
            colorID: 1,
            front: "tete",
            back: "Olá",
            isEditing: false
        }
    ]
},
{
    id: uuid(),
    title: 'Pack 3',
    description: 'Donec pretium posuere tellus.',
    colorID: 3,
		isChangingColor: false,
    isSetting: false,
		timeMinutes: 3,
		playing: false,
    cards: [
        {
            id: uuid(),
            colorID: 1,
            front: "Hello",
            back: "Olá",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 2,
            front: "isso é impressionante",
            back: "it is awesome",
            isEditing: false
        }
    ]
},
{
    id: uuid(),
    title: 'Pack teste numero 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sithendrerit ultrices',
    colorID: 1,
		isChangingColor: false,
    isSetting: false,
		timeMinutes: 3,
		playing: false,
    cards: [
        {
            id: uuid(),
            colorID: 1,
            front: "Hello",
            back: "Olá",
            isEditing: false
        }
    ]
},
{
    id: uuid(),
    title: 'Pack teste numero 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sithendrerit ultrices',
    colorID: 4,
		isChangingColor: false,
    isSetting: false,
		timeMinutes: 3,
		playing: false,
    cards: [
        {
            id: uuid(),
            colorID: 1,
            front: "Hello",
            back: "Olá",
            isEditing: false
        },
        {
            id: uuid(),
            colorID: 2,
            front: "isso é impressionante",
            back: "it is awesome",
            isEditing: false
        }
    ]
}
];
