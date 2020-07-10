import * as utils from './utils.js';
import { computerQuestions } from './computerQuestions.js';

let questionIndex = 0;

function addComputerBubble(text) {
  const computerBubble = $("<div>").addClass("speech-bubble computer");

  if (!utils.isSameSpeaker("computer", utils.previousSpeaker)) {
    computerBubble.addClass("different-speaker");
    const leftArrow = $("<div>").addClass("arrow left").appendTo(computerBubble);
  } else {
    computerBubble.addClass("same-speaker");
  }
  
  const compBubbleP = $("<p>").addClass("computer-speak").text(text).appendTo(computerBubble);
  const time = $("<p>").text(utils.getTimestamp()).addClass("timestamp").appendTo(computerBubble);
  $("main").prepend(computerBubble);
  // computerBubble.appendTo("main");

  return utils.setCurrentSpeaker("computer");
}

function addUserBubble(text) {
  const userBubble = $("<div>").addClass("speech-bubble user");

  if (!utils.isSameSpeaker("user", utils.previousSpeaker)) {
    userBubble.addClass("different-speaker");
    const rightArrow = $("<div>").addClass("arrow right").appendTo(userBubble);
  } else {
    userBubble.addClass("same-speaker");
  }

  const userBubbleP = $("<p>").addClass("user-speak").text(text).appendTo(userBubble);
  const time = $("<p>").text(utils.getTimestamp()).addClass("timestamp").appendTo(userBubble);
  $("main").prepend(userBubble);
  // userBubble.appendTo("main");

  if (questionIndex < computerQuestions.length - 1) {
    questionIndex++;
    setTimeout(() => addComputerBubble(computerQuestions[questionIndex]), 1000);
  }

  $("#user-input").trigger("reset");

  return utils.setCurrentSpeaker("user");
}
  
addComputerBubble(computerQuestions[questionIndex]);

$("#user-input").submit(function (event) {
  event.preventDefault();
  let inputText = $(this).find("[name=input-text]").val();
  addUserBubble(inputText);
});
