import * as utils from './utils.js';
import { computerQuestions, inviteForChat } from './botMessageProvider.js';

let questionIndex = 0;

function addComputerBubble(text) {
  const computerBubble = $("<div>").addClass("speech-bubble computer");

  if (!utils.isSameSpeaker("computer", utils.previousSpeaker)) {
    computerBubble.addClass("different-speaker");
    $("<div>").addClass("arrow left").appendTo(computerBubble);
  } else {
    computerBubble.addClass("same-speaker");
  }
  
  $("<p>").addClass("computer-speak").text(text).appendTo(computerBubble);
  $("<p>").text(utils.getTimestamp()).addClass("timestamp").appendTo(computerBubble);
  $("main").prepend(computerBubble);

  return utils.setCurrentSpeaker("computer");
}

function finishChat() {
  $("#user-input").hide();
  $(".btn").hide();
  $(".speech-bubble").hide();
  $("main").css("height", "calc(100 % - 80px)");
  $(".robot-greeting").text("See you next time. Refresh page to chat again.");
  $(".robot-container").show();
}

function addUserBubble(text) {
  const userBubble = $("<div>").addClass("speech-bubble user");

  if (!utils.isSameSpeaker("user", utils.previousSpeaker)) {
    userBubble.addClass("different-speaker");
    $("<div>").addClass("arrow right").appendTo(userBubble);
  } else {
    userBubble.addClass("same-speaker");
  }

  $("<p>").addClass("user-speak").text(text).appendTo(userBubble);
  $("<p>").text(utils.getTimestamp()).addClass("timestamp").appendTo(userBubble);
  $("main").prepend(userBubble);

  if (questionIndex < computerQuestions.length - 1) {
    questionIndex++;
    setTimeout(() => addComputerBubble(computerQuestions[questionIndex]), 800);
  } else {
    finishChat();
  }

  $("#user-input").trigger("reset");

  return utils.setCurrentSpeaker("user");
}
  
function chatInit() {
  $(".robot-container").hide();
  $("main").css("height", "calc(100 % - 160px)");
  
  $('<form id="user-input">').append('<input type="text" name="input-text" id="input-text" required>').append('<input type="submit" value="Send" id="submit-button">').appendTo("body");
  
  $("#user-input").submit(function (event) {
    event.preventDefault();
    let inputText = $(this).find("[name=input-text]").val();
    addUserBubble(inputText);
  });

  addComputerBubble(computerQuestions[questionIndex]);
}

$("#yes").on("click", function (e) {
  e.preventDefault();
  chatInit();
})

let refuseNum = 0;

$("#no").on("click", function (e) {
  e.preventDefault();

  if (refuseNum <= 5) {
    $(".robot-greeting").text(inviteForChat[refuseNum]);
    refuseNum++;
  } 

  if (refuseNum > 5) {
    refuseNum = 0;
  }
})
