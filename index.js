var SlackBot = require('slackbots');
var request = require("request")    

// create a bot
var bot = new SlackBot({
    token: 'xoxb-686414431892-689030465814-NzRUX5PiDUlrVZTvcJgIRK3h', // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: 'monty_bot'
});

// bot.on('start', function() {
//     // more information about additional params https://api.slack.com/methods/chat.postMessage
    // var params = {
    //     icon_emoji: ':cat:'
    // };
    
//     // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
//     bot.postMessageToChannel('general', 'meow!', params);
    
//     // define existing username instead of 'user_name'
//     bot.postMessageToUser('user_name', 'meow!', params); 
    
//     // If you add a 'slackbot' property, 
//     // you will post to another user's slackbot channel instead of a direct message
//     bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
//     // define private group instead of 'private_group', where bot exist
//     bot.postMessageToGroup('private_group', 'meow!', params); 
// });

bot.on("message", msg => {


    switch (msg.type) {
    case "message":
      if (msg.channel[0] === "D" && msg.bot_id === undefined) {
        // bot.postMessage(msg.user, "hi", { as_user: true })
        getRandomJoke(msg.user)

      }
      break
    }

   

  })

  const getRandomJoke =  (user) => {
    return request("http://quotes.stormconsultancy.co.uk/quotes.json", (error, response) => {
      if (error) {
        console.log("Error: ", error)
      } else {
        let codeJSON = JSON.parse(response.body)
        let min = 0;
        let max = 42;
        var random =Math.floor(Math.random() * (+max - +min)) + +min; 
        let code = codeJSON[random].quote
        postMessage(code, user)
      }
    })
  }

  const postMessage = (message, user) => {
    bot.postMessage(user, message, {icon_emoji: ':cat:' })
  }

  