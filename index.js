const cards = ['10H', '9H', '8H', '7H', '6H', '5H', '4H', '3H', '2H', 'AH', 'KH', 'QH', 'JH', '10D', '9D', '8D', '7D', '6D', '5D', '4D', '3D', '2D', 'AD', 'KD', 'QD', 'JD', '10C', '9C', '8C', '7C', '6C', '5C', '4C', '3C', '2C', 'AC', 'KC', 'QC', 'JC', '10S', '9S', '8S', '7S', '6S', '5S', '4S', '3S', '2S', 'AS', 'KS', 'QS', 'JS'];

const values = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10, 10, 10];

let player_list = [];
let player_value = 0;
let dealer_list = [];
let dealer_value = 0;

function getCards(num,player,time) {

  switch (player) {

    case "Player":
      for (i = 0; i < num; i++) {
        let num = Math.floor(Math.random() * cards.length);
        let chosen = cards[num];
        player_list.push(chosen);
        $(".p-image").append(`<img src="images/${chosen}.jpg">`);
        player_value += values[num];
        cards.splice(num,1);
        values.splice(num,1);
      }

      $(".player-value").html(`Value: ${player_value}`);

      if (player_value > 21) {
        $(".outcome").html(`Bust! ${player} loses.`);
        $(".d-outcome").html("Dealer wins!!!");
        $("#hs").hide();
        $("#reload").show()
      } else if (player_value === 21) {
        $(".outcome").html(`BLACKJACK! ${player} wins!`);
        $(".d-outcome").html("Dealer loses.");
        $("#hs").hide();
        $("#reload").show()
      }

      break;

      case "Dealer":
        for (i = 0; i < num; i++) {
          let num = Math.floor(Math.random() * cards.length);
          let chosen = cards[num];
          dealer_list.push(chosen);
          $(".d-image").append(`<img src="images/${chosen}.jpg">`);
          dealer_value += values[num];
          cards.splice(num,1);
          values.splice(num,1);

          $(".dealer-value").html(`Value: ${dealer_value}`);

          if (dealer_value > 21) {
            $(".d-outcome").html(`Bust! ${player} loses.`);
            $(".outcome").html("Player wins!!!");
            $("#hs").hide();
            $("#reload").show()
          } else if (dealer_value === 21) {
            $(".d-outcome").html(`BLACKJACK! ${player} wins!`);
            $(".outcome").html("Player loses.");
            $("#hs").hide();
            $("#reload").show();
          } else if (time !== "no" && dealer_value > player_value) {
            $(".d-outcome").html(`${player} has more points! ${player} wins.`);
            $(".outcome").html("Player loses.");
            $("#hs").hide();
            $("#reload").show()
          }
        }

        break;
  }

  }

$(".start-btn").on("click", function() {
  $(this).hide();
  $('#game, #hs, #back').show("slow");
  $('#back').show("slow");
  getCards(2,"Player");
  getCards(1,"Dealer","no");
});

$(".hit-btn").on("click", function() {
  getCards(1,"Player");
})

$(".stand-btn").on("click", function() {
  $('#back').hide();
  while ($(".d-outcome").html() === "") {
    getCards(1,"Dealer");
  }

})
