
const computerQuestions = [
  "Hello there, I'm Blorg. What is your name?",
  "It's really nice to meet you",
  "How old are you?",
  "Where do you live?"
]

let question = 0;

addComputerBubble(computerQuestions[question]);

$("#user-input").submit(function (event) {
  event.preventDefault();
  let inputText = $(this).find("[name=input-text]").val();
  addUserBubble(inputText);
});

function addComputerBubble(text) {
  const computerBubble = $("<div>").addClass("speech-bubble computer");
  const leftArrow = $("<div>").addClass("arrow left").appendTo(computerBubble);
  const compBubbleP = $("<p>").text(text).appendTo(computerBubble);
  computerBubble.appendTo("main");
}

function addUserBubble(text) {
  const userBubble = $("<div>").addClass("speech-bubble user");
  const rightArrow = $("<div>").addClass("arrow right").appendTo(userBubble);
  const userBubbleP = $("<p>").text(text).appendTo(userBubble);
  userBubble.appendTo("main");
  if (question < computerQuestions.length - 1) {
    question++;
    setTimeout(() => addComputerBubble(computerQuestions[question]), 1000);
  }
}