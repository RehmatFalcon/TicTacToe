const app = new Vue({
	el: "#app",
  data: {
  	rooms : [
    	[0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    playerMoves : [

    ],
    turn: 1,
    winner : null,
    gameOver : false
  },
  methods: {
  	select: function(row, col) {
    	if(this.gameOver) return;
    	if(this.rooms[row][col] != 0) return;
      this.playerMoves.push({
      	player: this.turn,
        row : row,
        col: col
      });
      const rowR = this.rooms[row];
      rowR[col] = this.turn;
      this.$set(this.rooms,row, rowR);
      this.verifyGame(this.turn, row,col);
      if(this.turn == 1) this.turn = 2;
      else this.turn = 1;
    },
    verifyGame: function(player, row, col) {
    	const wholeRow = this.rooms[row].every(i => i == player);
      if(wholeRow) this.winner = player;
      const wholeCol = this.rooms.every(i => i[col] == player);
      if(wholeCol) this.winner = player;
      if(row == col)
      {
      	const diagonal = this.rooms.every((i, index) => this.rooms[index][index] == player);
        if(diagonal) this.winner = player;
      }
      if(this.winner) {
      	this.gameOver = true;
      	return;
      }
      this.verifyMoreMoves();
    },
    verifyMoreMoves: function() {
    	for(var row of this.rooms)
      {
      	for(var col of row)
        {
        	if(col == 0) return;
        }
      }
      alert("No more moves left.");
      this.gameOver = true;
    },
    restart: function() {
    	if(!this.gameOver) return;
      this.rooms = [
      	[0,0,0],
        [0,0,0],
        [0,0,0]
      ];
      this.winner = null;
      this.gameOver = false;
      this.turn = 1;
      this.playerMoves = [];
    }
  }
});