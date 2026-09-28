export function createCard(
  cardData,
  handleDeleteCard,
  handleLikeCard,
  handleImageClick,
  userId
) {

  const cardElement = document
    .querySelector('#card-template')
    .content
    .querySelector('.places__item')
    .cloneNode(true);


  const image = cardElement.querySelector('.card__image');


  cardElement.querySelector('.card__title').textContent = cardData.name;

  image.src = cardData.link;
  image.alt = cardData.name;


  const deleteButton = cardElement.querySelector('.card__delete-button');


  if (cardData.owner._id === userId) {

    deleteButton.addEventListener('click', () => {
      handleDeleteCard(cardData._id, cardElement);
    });

  } else {

    deleteButton.remove();

  }


const likeButton = cardElement.querySelector('.card__like-button');

if (
  cardData.likes.some((like) => like._id === userId)
) {
  likeButton.classList.add(
    'card__like-button_is-active'
  );
}

likeButton.addEventListener('click', () => {
  handleLikeCard(
    cardData._id,
    likeButton
  );
});
  image.addEventListener('click', handleImageClick);


  return cardElement;
}


